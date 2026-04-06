import { Router } from "express";
import { generatePreview, createPlaylistFinal } from "../controllers/playlistController.js";

const router = Router();

// Root route
router.get("/", (req, res) => {
  res.send("Server is running");
});

// 🔮 AI Preview Generation
router.post("/generate-playlist/preview", generatePreview);

// 📀 Create Playlist Submission
router.post("/generate-playlist", createPlaylistFinal);

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "API is working",
  });
});

export default router;

