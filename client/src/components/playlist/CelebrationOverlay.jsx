import { motion, AnimatePresence } from "framer-motion";
import { MaterialIcon } from "../common/MaterialIcon";
import { GradientButton } from "../common/GradientButton";

/**
 * CelebrationOverlay is the grand finale of the generator.
 * It triggers when a playlist is successfully saved to Spotify.
 */
export function CelebrationOverlay({ success, onDismiss }) {
  if (!success) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-surface-container-lowest/80 backdrop-blur-3xl selection:bg-primary selection:text-on-primary">
        
        {/* 🎉 The Background Confetti (Simple glowing dots) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/40"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 100,
                opacity: 1 
              }}
              animate={{ 
                y: -100, 
                opacity: 0,
                rotate: 360
              }}
              transition={{ 
                duration: Math.random() * 3 + 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-lg w-full p-12 bg-surface text-center rounded-[3rem] shadow-2xl ring-1 ring-primary/5"
        >
          {/* The Icon Badge */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
              <MaterialIcon name="auto_awesome" className="text-4xl" filled />
            </div>
          </div>

          <h2 className="text-4xl font-black text-on-surface tracking-tighter mb-4">
            Sonic Blueprint <span className="text-primary italic">Manifested</span>
          </h2>
          
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed mb-12">
            Your vibe has been transmuted into a playlist. Maestro gold is now sitting in your Spotify collection.
          </p>

          <div className="flex flex-col gap-4">
            <GradientButton 
              as="a" 
              href={success.playlistUrl || "https://open.spotify.com/collection/playlists"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-6 rounded-2xl"
            >
              <MaterialIcon name="play_circle" className="text-xl" />
              Open on Spotify
            </GradientButton>

            <button 
              onClick={onDismiss}
              className="w-full py-6 text-on-surface-variant font-black text-sm uppercase tracking-[0.3em] hover:text-primary transition-colors"
            >
              Build Another
            </button>
          </div>

          {/* Absolute Background Glow */}
          <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-full" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
