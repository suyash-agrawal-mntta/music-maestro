import { useState, useEffect } from "react";
import { usePlaylist } from "./hooks/usePlaylist";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { CelebrationOverlay } from "./components/playlist/CelebrationOverlay";
import { CursorTrail } from "./components/common/CursorTrail";

export default function App() {
  // 🧭 Native URL Router
  const [currentPath, setCurrentPath] = useState(typeof window !== "undefined" ? window.location.pathname : "/");

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [prompt, setPrompt] = useState("late night drive");
  const [length, setLength] = useState(10);

  const { 
    loading, 
    error, 
    songs, 
    success, 
    user,
    isSaving,
    generateSongs, 
    createPlaylist, 
    lastParams,
    setSuccess,
    setIsSaving,
    setSongs
  } = usePlaylist();

  /**
   * 🧹 Clean up logic: Resets the state and wipes the URL query string.
   */
  const handleDismissSuccess = () => {
    setSuccess(null);
    setSongs([]); // Clear old songs list
    setIsSaving(false); // Reset saving status
    
    // 🧬 Clean up URL state (Hard Purge)
    if (typeof window !== "undefined") {
      // Smooth scroll back to top of the generator
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      const url = new URL(window.location);
      url.searchParams.delete("success");
      url.searchParams.delete("processing");
      
      // Rebuild the URL without the '?' if it's empty
      const cleanUrl = url.searchParams.toString() 
        ? `${window.location.origin}${window.location.pathname}?${url.searchParams.toString()}`
        : `${window.location.origin}${window.location.pathname}`;

      window.history.replaceState({}, "", cleanUrl);
    }
  };

  // Determine the active page
  let ActiveComponent;
  if (currentPath === "/" || currentPath === "/landing") {
    ActiveComponent = (
      <LandingPage
        loading={loading}
        error={error}
        onGenerate={(prompt, length, mood) => generateSongs(prompt, length, mood)}
        songs={songs}
        lastParams={lastParams || {}}
        success={success}
        user={user}
        isSaving={isSaving}
        setIsSaving={setIsSaving}
        onNavigate={navigate}
      />
    );
  } else if (currentPath === "/how-it-works") {
    ActiveComponent = <HowItWorksPage onNavigate={navigate} />;
  } else if (currentPath === "/about") {
    ActiveComponent = <AboutPage onNavigate={navigate} />;
  } else if (currentPath === "/privacy") {
    ActiveComponent = <PrivacyPage onNavigate={navigate} />;
  } else {
    ActiveComponent = (
      <DashboardPage
        prompt={prompt}
        length={length}
        loading={loading}
        error={error}
        songs={songs}
        success={success}
        user={user}
        onPromptChange={setPrompt}
        onLengthChange={setLength}
        onGenerate={() => generateSongs(prompt, length)}
        onCreatePlaylist={() => createPlaylist(prompt, length)}
        onBack={() => navigate("/")}
      />
    );
  }

  return (
    <>
      <CursorTrail />
      <CelebrationOverlay success={success} onDismiss={handleDismissSuccess} />
      {ActiveComponent}
    </>
  );
}

