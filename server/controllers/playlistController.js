import {
  createPromptState,
  decodeState,
  sanitizePrompt,
} from "../utils/stateUtils.js";
import { env } from "../config/env.js";
import { appState } from "../utils/appState.js";
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

  // 📥 Extract parameters from Frontend URL
  const prompt = typeof req.query.prompt === "string" ? req.query.prompt.trim() : "";
  const length = Number(req.query.length) || 15;
  const mood = typeof req.query.mood === "string" ? req.query.mood : "Balanced";

  const safePrompt = sanitizePrompt(prompt, DEFAULT_PROMPT, 200);

  // 🔒 Encode EVERYTHING into the 'state' tunnel
  const state = createPromptState(safePrompt, length, mood);

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

  res.redirect(authURL);
}

// 🔁 Callback route
export async function callback(req, res) {
  const code = req.query.code;
  const state = req.query.state;

  // 🔓 Decode our 'Shopping List' (Prompt, Length, Mood) from the state tunnel
  const { prompt, length, mood } = decodeState(state, { 
    prompt: DEFAULT_PROMPT, 
    length: 15, 
    mood: "Balanced" 
  });

  console.log(`📡 Resuming session: "${prompt}" | Tracks: ${length} | Mood: ${mood}`);

  let step = "exchange_token";

  try {
    // 1️⃣ Exchange code → access token
    const { accessToken, scope } = await getAccessToken(code);
    const access_token = accessToken;
    console.log("ACCESS TOKEN ✅");

    // 2️⃣ Get user profile
    step = "profile";
    const userResponse = await getUserProfile(access_token);
    console.log("USER:", userResponse.display_name);
    
    // 💾 Persist session for reloads
    appState.setSession({ 
      name: userResponse.display_name, 
      id: userResponse.id,
      imageUrl: userResponse.images?.[0]?.url || ""
    });

    // 🚀 Start Background Job
    appState.setJob({ status: "processing" });
    createPlaylistBackground(access_token, prompt, length, mood).catch(console.error);

    // 🪄 Instant Return to Frontend with processing flag
    res.redirect(`${env.FRONTEND_URL}/?processing=true`);
  } catch (error) {
    console.error("FAILED AT STEP:", step, error.message);
    res.status(500).send("Playlist creation failed. Please check the server logs.");
  }
}

async function createPlaylistBackground(access_token, prompt, length, mood) {
  try {
    // 3️⃣ Create playlist
    const playlistResponse = await createPlaylist(access_token);
    const playlistId = playlistResponse.id;

    // 4️⃣ Generate songs from AI prompt (Dynamic Count & Mood!)
    const songs = await generateSongsFromPrompt(prompt, length, mood);

    // 5️⃣ Search Spotify for each AI song
    const uris = [];
    
    for (const song of songs) {
      if (uris.length >= length) break;
      try {
        const { trackUri } = await searchTrack(access_token, song);
        if (trackUri) uris.push(trackUri);
      } catch (err) {
        console.warn(`Skip: "${song}" not found on Spotify.`);
      }
    }

    if (uris.length > 0) {
      await addTracksToPlaylist(access_token, playlistId, uris);
      console.log(`Successfully added ${uris.length} tracks to your new playlist! 🥂`);
    }

    appState.setJob({ 
      status: "done", 
      playlistUrl: playlistResponse.external_urls?.spotify || "https://open.spotify.com/collection/playlists" 
    });
  } catch (error) {
    console.error("Background Job Error:", error);
    appState.setJob({ status: "error", error: error.message });
  }
}

// 🔮 AI Preview Route (Generate songs without triggering Spotify yet)
export async function generatePreview(req, res) {
  const { prompt, length = 10, mood = "energetic" } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log(`🔮 Generating preview for: "${prompt}" | Tracks: ${length} | Mood: ${mood}`);
    
    // We pass both parameters to our updated AI service
    const songsList = await generateSongsFromPrompt(prompt, length, mood);
    
    const songs = songsList.map((s, i) => {
      const [artist, title] = s.split(" - ");
      return { id: i, artist: artist || "Unknown", title: title || "Unknown" };
    });

    res.json({ songs });
  } catch (error) {
    console.error("AI GENERATION ERROR:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
}

// 📀 Create Playlist Route (The final step after Preview)
export async function createPlaylistFinal(req, res) {
  const { prompt, length, songs } = req.body;
  
  // For now, we'll return a success message safely. 
  // Later, we can integrate this into the Spotify OAuth flow!
  res.json({
    message: "Songs generated for manual Spotify creation!",
    totalTracks: songs.length,
    playlistUrl: "https://open.spotify.com" 
  });
}// 📡 Session Status Endpoint (Heartbeat for persistence)
export async function getSessionStatus(req, res) {
  const currentSession = appState.getSession();
  res.json({
    isConnected: currentSession.isConnected,
    user: currentSession.user,
    job: appState.getJob()
  });
}

// 🧹 Clear Session Endpoint (Logout)
export async function logout(req, res) {
  appState.clearSession();
  res.json({ message: "Sesssion cleared successfully." });
}

