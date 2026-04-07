import dotenv from "dotenv";

// Load environment variables once for the whole app.
dotenv.config();

export const env = {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,

  HF_API_KEY: process.env.HF_API_KEY,
  HF_MODEL: process.env.HF_MODEL || "mistralai/Mistral-7B-Instruct-v0.2",

  // Used only when creating the playlist.
  PLAYLIST_NAME: process.env.PLAYLIST_NAME || "My AI Playlist 🎧",
  PLAYLIST_DESCRIPTION: process.env.PLAYLIST_DESCRIPTION || "Created using AI",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};

