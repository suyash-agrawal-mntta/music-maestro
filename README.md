<div align="center">
  <img src="https://img.icons8.com/color/150/000000/spotify--v1.png" alt="Spotify Logo" width="80" />
  <h1>🎧 Music Maestro</h1>
  <p><strong>AI-Powered Sonic Architecture & Playlist Generator</strong></p>

  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" /></a>
    <a href="https://huggingface.co/"><img src="https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face" /></a>
    <a href="https://developer.spotify.com/documentation/web-api/"><img src="https://img.shields.io/badge/Spotify_API-1ED760?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify" /></a>
  </p>
</div>

---

## 🎵 The Project

**Music Maestro** is an intelligent, high-fidelity web application that translates abstract emotional prompts, vibes, and situational contexts into highly curated, physical Spotify playlists. 

Originally built as a portfolio thesis on third-party API integration and Large Language Model (LLM) processing, Maestro acts as a bridge between **Natural Language Context** and **Literal Audio Endpoints**.

## ✨ Key Features

- **🧠 Hugging Face Language Decoding**: Integrates directly with the Hugging Face Inference API (utilizing Mistral 7B) to convert abstract human text ("Late night desert drive") into a precisely formulated JSON array of real-world artists and tracks.
- **⚡ Asynchronous Polling Pipeline**: Playlist creation is completely decoupled from the UI. Authorization triggers a background processing orchestrator on the Express server, while the React client seamlessly polls a `/status` heartbeat, rendering a zero-blocking, frictionless user experience.
- **🔒 Spotify OAuth 2.0 Flow**: Establishes secure authorization tunnels via the Spotify Web API. Maestro searches the Spotify catalog, extracts precise Track URIs, and permanently builds the generated playlist into the user's personal account.
- **🧭 Zero-Dependency Native Router**: Ripped out generic routing libraries to build a custom `window.history.pushState` DOM-router for instant, lightweight Single Page Application (SPA) navigation.
- **⚛️ Premium UI/UX & Physics Engine**: Features a modern "glassmorphism" aesthetic built with Tailwind CSS. Includes custom Framer Motion DOM animations and a highly optimized localized particle physics engine (`CursorTrail`) that spawns radial-gradient light particles tracking mouse velocity.

## 🛠️ Technology Stack

### **Frontend Pipeline**
- **React 18** (Functional hooks, conditional component architecture)
- **Vite** (Next-generation lightning-fast HMR and bundling)
- **Tailwind CSS** (Utility-first styling, custom glassmorphic overrides)
- **Framer Motion** (Spring-physics based component and layout animations)

### **Backend Orchestrator**
- **Node.js & Express** (Dual-purpose API gateway and static file server)
- **In-Memory State Management** (Global session and asynchronous job tracking)

### **External APIs & ML**
- **Hugging Face Serverless Inference API** (LLM JSON Generation)
- **Spotify Web API** (OAuth, Catalog Search, Playlist Mutator)

---

## 🏗️ Architecture System Flow

1. **Prompt Ingestion**: User inputs a situation ("Coding at 3 AM").
2. **AI Transmutation**: The Express server hits the Hugging Face API, forcing the LLM to reply strictly with a curated `[ { "songName", "artist" } ]` grid.
3. **Session Authentication**: The user approves Music Maestro on Spotify's native auth gateway.
4. **Background Orchestration**: The backend asynchronously searches the Spotify Sandbox for the AI's exact tracks, pulling unique IDs.
5. **Collection Assembly**: Maestro physically writes the assembled list into the user's Spotify database, and updates the global polling state to "Success", triggering frontend Celebration arrays.

---

## 🚀 Local Installation & Setup

### 1. Repository Initialization
```bash
git clone https://github.com/suyash-agrawal-mntta/MusicMaestro.git
cd MusicMaestro

# Install dependencies for both server and client
npm install
npm install --prefix client
```

### 2. Environment Configuration
Create a `.env` file in the root directory and configure your developer API keys:

```ini
# Spotify Developer Dashboard
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback

# Hugging Face Inference API
HUGGINGFACE_API_KEY=your_hugging_face_access_token
```

### 3. Ignition
Run the incredibly seamless concurrent script to launch both the Express Backend and Vite Frontend simultaneously:

```bash
npm run dev
```
The application will instantly compile and orchestrate on `http://localhost:5173`.

---

<div align="center">
  <p><i>Concept, Architecture, and Engineering by <b><a href="https://github.com/suyash-agrawal-mntta">Suyash Agrawal</a></b></i></p>
  <p>Built with AI + Spotify API 🎧</p>
</div>
