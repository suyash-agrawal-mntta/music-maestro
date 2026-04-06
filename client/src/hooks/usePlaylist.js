import { useMemo, useState, useEffect } from "react";
import { api } from "../services/api";

export function usePlaylist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState(null);
  const [lastParams, setLastParams] = useState({ prompt: "", length: 15, mood: "Balanced" });
  
  // 🔍 URL Listener: Did we just come back from a successful Spotify trip?
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const [success, setSuccess] = useState(searchParams.get("success") === "true" ? { 
    isNew: true, 
    playlistUrl: "https://open.spotify.com/collection/playlists" 
  } : null);

  const [isSaving, setIsSaving] = useState(searchParams.get("processing") === "true");

  // 🔍 Check for persistence on mount & poll for background job
  useEffect(() => {
    let intervalId;

    async function checkStatus() {
      try {
        const data = await api.checkAuthStatus();
        if (data.isConnected && data.user) {
          setUser(data.user);
        }
        
        if (isSaving && data.job) {
          if (data.job.status === "done") {
            setSuccess({ isNew: true, playlistUrl: data.job.playlistUrl });
            setIsSaving(false);
          } else if (data.job.status === "error") {
            setError(data.job.error || "Playlist creation failed");
            setIsSaving(false);
          }
        }
      } catch (err) {
        console.warn("Could not fetch auth status on boot.");
      }
    }

    checkStatus();

    if (isSaving) {
      intervalId = setInterval(checkStatus, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSaving]);

  const hasSongs = songs.length > 0;

  const canCreate = useMemo(() => hasSongs && !loading, [hasSongs, loading]);

  async function generateSongs(prompt, length, mood) {
    setLoading(true);
    setError("");
    setSuccess(null);

    try {
      setLastParams({ prompt, length, mood });
      const data = await api.generatePreview({ prompt, length, mood });
      const nextSongs = Array.isArray(data?.songs) ? data.songs : [];
      setSongs(nextSongs);

      if (nextSongs.length === 0) {
        setError("No songs found. Try a different prompt.");
      }
    } catch (err) {
      setSongs([]);
      setError(err.message || "Could not generate songs.");
    } finally {
      setLoading(false);
    }
  }

  async function createPlaylist(prompt, length) {
    if (!songs.length) return;

    setLoading(true);
    setError("");

    try {
      const data = await api.createPlaylist({ prompt, length, songs });
      setSuccess({
        totalTracks: data?.totalTracks ?? songs.length,
        playlistUrl: data?.playlistUrl || "",
      });
    } catch (err) {
      setError(err.message || "Could not create playlist.");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    songs,
    success,
    user,
    isSaving,
    canCreate,
    generateSongs,
    createPlaylist,
    lastParams,
    setSuccess,
    setIsSaving,
    setSongs,
  };
}

