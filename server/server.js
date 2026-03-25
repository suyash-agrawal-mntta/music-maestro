import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Test route
app.get("/test", (req, res) => {
  res.json({
    message: "API is working",
  });
});

// 🔐 Login route (Spotify OAuth)
app.get("/login", (req, res) => {
  const scope =
    "user-read-private user-read-email playlist-modify-public playlist-modify-private";

  const authURL =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    process.env.SPOTIFY_CLIENT_ID +
    "&scope=" +
    encodeURIComponent(scope) +
    "&redirect_uri=" +
    encodeURIComponent(process.env.REDIRECT_URI);

  console.log("REDIRECT_URI:", process.env.REDIRECT_URI);

  res.redirect(authURL);
});

// 🔁 Callback route
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // 1️⃣ Exchange code → access token
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET,
            ).toString("base64"),
        },
      },
    );

    const access_token = tokenResponse.data.access_token;

    console.log("ACCESS TOKEN ✅");

    // 2️⃣ Get user profile
    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    console.log("USER:", userResponse.data.display_name);

    // 3️⃣ Create playlist (UPDATED endpoint ✅)
    const playlistResponse = await axios.post(
      "https://api.spotify.com/v1/me/playlists",
      {
        name: "My AI Playlist 🎧",
        description: "Created using AI",
        public: false,
        collaborative: false,
      },
      {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const playlistId = playlistResponse.data.id;
    const playlistUrl = playlistResponse.data.href;

    console.log("PLAYLIST URL:", playlistUrl);

    console.log("PLAYLIST CREATED ✅", playlistResponse.data.name);

    // 4️⃣ Search for a song
    const searchResponse = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        params: {
          q: "The Weeknd Starboy",
          type: "track",
          limit: 1,
        },
      },
    );

    const track = searchResponse.data.tracks.items[0];

    if (!track) {
      throw new Error("No track found");
    }
    const trackUri = track.uri;

    console.log("FOUND SONG ✅", track.name, "-", track.artists[0].name);

    // 5️⃣ Add song to playlist
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: [trackUri],
      },
      {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    console.log("SONG ADDED TO PLAYLIST ✅");

    // Final response
    res.send("🎧 Playlist created and song added successfully!");
  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.send(error.response?.data || error.message);
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://127.0.0.1:3000");
});
