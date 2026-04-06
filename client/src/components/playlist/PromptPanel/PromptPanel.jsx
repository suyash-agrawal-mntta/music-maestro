import { useState } from "react";
import { GlassPanel } from "../../common/GlassPanel";
import { TiltHover } from "../../common/TiltHover";
import { PromptInput } from "./PromptInput";
import { SuggestionChips } from "./SuggestionChips";
import { ParameterSlider } from "./ParameterSlider";
import { GenerateButton } from "./GenerateButton";
import { LANDING_TRY_SUGGESTIONS } from "../../../utils/landingTracks";

export function PromptPanel({ loading, onGenerate }) {
  const [prompt, setPrompt] = useState("");
  const [playlistLength, setPlaylistLength] = useState(25);
  const [moodIntensity, setMoodIntensity] = useState(80);

  // 💡 Logic Helper: Translating the 0-100 slider into BPM categories for the AI
  const moodLabel = 
    moodIntensity > 80 ? "Fast BPM / Aggressive" :
    moodIntensity > 60 ? "Upbeat Tempo" :
    moodIntensity > 40 ? "Medium / Mid-Tempo" :
    moodIntensity > 20 ? "Slow / Mellow BPM" : "Very Slow / Ambient";

  // Logic: Triggers the generation process in the parent component
  const handleGenerate = () => {
    if (!prompt.trim() || loading) return;
    onGenerate(prompt, playlistLength, moodLabel);
  };

  return (
    <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto" id="input-section">
      <TiltHover className="rounded-xl">
        <GlassPanel className="p-12 md:p-16">
          <div className="space-y-12">
            
            {/* 1. The Prompt Input & Chips */}
            <div className="space-y-6">
              <PromptInput value={prompt} onChange={setPrompt} />
              <SuggestionChips 
                suggestions={LANDING_TRY_SUGGESTIONS} 
                activeSuggestion={prompt}
                onSelect={setPrompt} 
              />
            </div>

            {/* 2. Parameters Grid - Using a basic CSS Grid for layout */}
            <div className="grid md:grid-cols-2 gap-12 pt-4">
              <ParameterSlider
                label="Playlist Length"
                value={playlistLength}
                min={5}
                max={50}
                onChange={setPlaylistLength}
                unit="Tracks"
                accentColor="primary"
              />
              <ParameterSlider
                label="Atmospheric Mood"
                value={moodIntensity}
                min={0}
                max={100}
                onChange={setMoodIntensity}
                unit={moodLabel}
                accentColor="secondary"
                minLabel="Slow"
                maxLabel="Fast (BPM)"
              />
            </div>

            {/* 3. The Grand CTA */}
            <GenerateButton 
              onClick={handleGenerate} 
              isLoading={loading} 
            />

          </div>
        </GlassPanel>
      </TiltHover>
    </section>
  );
}
