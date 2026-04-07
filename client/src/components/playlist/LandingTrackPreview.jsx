import { TrackCard } from "./TrackCard";
import { MaterialIcon } from "../common/MaterialIcon";
import { api } from "../../services/api";

/**
 * LandingTrackPreview displays the result of the AI generation.
 * It remains hidden until the AI has successfully returned a list of songs.
 */
export function LandingTrackPreview({ songs = [], lastParams = {}, onSave }) {
  // If there are no songs, we don't show the section at all.
  if (songs.length === 0) return null;

  return (
    <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto" id="results">
      
      {/* Header with high-end editorial typography */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
            <MaterialIcon name="auto_awesome" className="text-sm" />
            AI Synthesis Complete
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface">
            Your Sonic <span className="text-primary italic">Blueprint</span>
          </h2>
        </div>

        {/* The Action Button: Now acts as the "Gate" to Spotify with real memory */}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onSave) onSave();
            window.location.href = api.getLoginUrl(lastParams);
          }}
          className="group flex items-center gap-4 px-10 py-5 bg-[#1DB954] text-black font-black text-sm uppercase tracking-widest rounded-full hover:scale-105 hover:shadow-xl hover:shadow-[#1DB954]/20 transition-all duration-500"
        >
          <MaterialIcon name="play_circle" filled className="text-2xl" />
          Save to Spotify
        </button>
      </div>

      {/* The Track Grid: We use 'grid-cols-1' for mobile and 'md:grid-cols-2' for desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {songs.map((track, index) => (
          <TrackCard 
            key={`${track.id}-${index}`} 
            track={track} 
            index={index} 
          />
        ))}
      </div>

      {/* Footer Hint */}
      <p className="text-center mt-20 text-on-surface-variant/40 text-sm font-bold uppercase tracking-[0.3em]">
        End of Transmission
      </p>
    </section>
  );
}

