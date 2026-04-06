import { Router } from "express";
import { 
  callback, 
  login, 
  getSessionStatus, 
  logout 
} from "../controllers/playlistController.js";

const router = Router();

// 🔐 Status Check (Persistence!)
router.get("/status", getSessionStatus);

// 🔐 Login route (Spotify OAuth)
router.get("/login", login);

// 🔁 Callback route
router.get("/callback", callback);

// 🧹 Logout
router.get("/logout", logout);

export default router;

