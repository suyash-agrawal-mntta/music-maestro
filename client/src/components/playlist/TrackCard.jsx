import { motion } from "framer-motion";
import { MaterialIcon } from "../common/MaterialIcon";

export function TrackCard({ track, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative"
    >
      {/* 🔮 The Glass Background */}
      <div className="absolute inset-0 bg-surface-container/30 backdrop-blur-xl rounded-xl border border-white/5 transition-all duration-500 group-hover:bg-surface-container/50 group-hover:border-primary/20" />
      
      {/* 🎵 Card Content */}
      <div className="relative p-6 flex items-center gap-6 overflow-hidden">
        
        {/* Track Number / Index */}
        <span className="text-[10px] font-black font-mono text-primary/40 group-hover:text-primary transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Fake Album Art Placeholder (with a neon glow) */}
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shadow-lg group-hover:shadow-primary/10 transition-shadow duration-500">
           <MaterialIcon name="music_note" className="text-on-surface-variant/20 group-hover:text-primary/40 transition-colors duration-500" />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-on-surface font-bold text-lg truncate mb-1">
            {track.title}
          </h4>
          <p className="text-on-surface-variant/60 text-xs font-semibold uppercase tracking-widest truncate">
            {track.artist}
          </p>
        </div>

        {/* Play Icon (Purely Visual for now) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
          <MaterialIcon name="play_arrow" filled className="text-primary text-3xl" />
        </div>
        
      </div>
    </motion.div>
  );
}
