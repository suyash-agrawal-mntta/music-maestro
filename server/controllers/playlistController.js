import {
  createPromptState,
  sanitizePrompt,
} from "../utils/stateUtils.js";
import { env } from "../config/env.js";
import {
  createPlaylist,
  getAccessToken,
  getUserProfile,
  addTracksToPlaylist,
  searchTrack,
} from "../services/spotifyService.js";
import { generateSongsFromPrompt } from "../services/aiService.js";

const DEFAULT_PROMPT = "The Weeknd Starboy";

// 🔐 Login route (Spotify OAuth)
export async function login(req, res) {
  const scope =
    "user-read-private user-read-email playlist-modify-public playlist-modify-private";

  const prompt = typeof req.query.prompt === "string" ? req.query.prompt.trim() : "";
  const safePrompt = sanitizePrompt(prompt, DEFAULT_PROMPT, 200);

  const state = createPromptState(safePrompt);

  const authURL =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    env.SPOTIFY_CLIENT_ID +
    "&scope=" +
    encodeURIComponent(scope) +
    "&redirect_uri=" +
    encodeURIComponent(env.REDIRECT_URI) +
    "&state=" +
    encodeURIComponent(state);

  console.log("REDIRECT_URI:", env.REDIRECT_URI);
  res.redirect(authURL);
}

// 🔁 Callback route
export async function callback(req, res) {
  const code = req.query.code;

  // TODO: keep this hardcoded for now; next step can re-enable prompt from `state`
  const prompt = "late night drive";

  // Tracks where failures happen (useful for debugging Spotify 403s)
  let step = "exchange_token";

  try {
    // 1️⃣ Exchange code → access token
    const { accessToken, scope } = await getAccessToken(code);
    const access_token = accessToken;
    console.log("TOKEN SCOPES (granted by Spotify):", scope);
    console.log("ACCESS TOKEN ✅");

    // 2️⃣ Get user profile
    step = "profile";
    const userResponse = await getUserProfile(access_token);
    console.log("USER:", userResponse.display_name);
    console.log("USER DETAILS:", {
      id: userResponse.id,
      email: userResponse.email,
    });

    // 3️⃣ Create playlist
    step = "create_playlist";
    const playlistResponse = await createPlaylist(access_token);
    const playlistId = playlistResponse.id;
    const playlistUrl = playlistResponse.href;

    console.log("PLAYLIST URL:", playlistUrl);
    console.log("PLAYLIST CREATED ✅", playlistResponse.name);
    console.log("PLAYLIST DETAILS:", {
      owner: playlistResponse.owner?.id,
      collaborative: playlistResponse.collaborative,
      isPublic: playlistResponse.public,
      playlistId: playlistId,
    });

    // 4️⃣ Generate songs from AI prompt (returns ["Artist - Song", ...])
    step = "ai_generate_songs";
    const songs = await generateSongsFromPrompt(prompt);

    // 5️⃣ Search Spotify for each AI song, collect unique track URIs
    step = "search_and_collect_uris";
    const uris = [];
    const uriSet = new Set();

    for (const song of songs) {
      if (uriSet.size >= 10) break;

      try {
        const { trackUri } = await searchTrack(access_token, song);
        if (!trackUri) continue;

        // Avoid duplicates (same track found more than once)
        if (uriSet.has(trackUri)) continue;

        uriSet.add(trackUri);
        uris.push(trackUri);
      } catch (err) {
        // Skip not found / failed searches, but log for visibility.
        console.warn(
          `AI->Spotify search failed for "${song}": ${
            err?.message || String(err)
          }`,
        );
      }
    }

    console.log(`Collected ${uris.length} valid track URIs.`);

    if (uris.length > 0) {
      // Add ALL tracks in one batch request.
      step = "add_tracks_to_playlist";
      console.log(`Adding ${uris.length} tracks to playlist...`);
      await addTracksToPlaylist(access_token, playlistId, uris);
      console.log("Tracks added to playlist ✅");
    } else {
      console.log("No valid tracks found; skipping playlist add.");
    }

    // Final response
    res.json({
      message: "Playlist created successfully",
      totalTracks: uris.length,
    });
  } catch (error) {
    const status = error.response?.status;
    const spotifyError = error.response?.data;

    console.error("SPOTIFY FAILED STEP:", step);
    console.error("FAILED REQUEST:", {
      method: error.config?.method,
      url: error.config?.url,
      status: status,
    });
    console.error("SPOTIFY RESPONSE HEADERS:", error.response?.headers);
    console.error("FULL ERROR:", spotifyError || error.message);
    if (spotifyError) {
      try {
        console.error("FULL ERROR (JSON):", JSON.stringify(spotifyError, null, 2));
      } catch {
        // ignore JSON stringify errors
      }
    }
    console.error("AXIOS ERROR MESSAGE:", error.message);

    res.status(status || 500).send(spotifyError || error.message);
  }
}

