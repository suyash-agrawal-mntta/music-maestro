import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.json({
    message: "API is working",
  });
});

app.get("/login", (req, res) => {
  const scope =
    "user-read-private playlist-modify-public playlist-modify-private";
  const authURL =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    process.env.SPOTIFY_CLIENT_ID +
    "&scope=" +
    encodeURIComponent(scope) +
    "&redirect_uri=" +
    encodeURIComponent(process.env.REDIRECT_URI);
  res.redirect(authURL);

  console.log("REDIRECT_URI:", process.env.REDIRECT_URI);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
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

    const access_token = response.data.access_token;

    // ✅ SEARCH CODE MUST BE HERE
    const searchResponse = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        params: {
          q: "blinding lights",
          type: "track",
          limit: 1,
        },
      },
    );

    console.log("SONG RESULT:", searchResponse.data.tracks.items[0]);

    res.send("Search done. Check terminal.");
  } catch (error) {
    console.error(error.response?.data || error);
    res.send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
