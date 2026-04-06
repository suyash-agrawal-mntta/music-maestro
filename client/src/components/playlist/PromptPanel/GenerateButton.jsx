import { motion } from "framer-motion";
import { MaterialIcon } from "../../common/MaterialIcon";

export function GenerateButton({ onClick, isLoading }) {
  return (
    <div className="relative group/btn pt-8">
      {/* Decorative Glow Layer */}
      <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
      
      <motion.button
        type="button"
        disabled={isLoading}
        whileTap={{ scale: 0.98, y: 2 }}
        onClick={onClick}
        className={`
          relative w-full py-8 
          bg-gradient-to-r from-primary via-primary-container to-secondary 
          text-on-primary font-black text-2xl tracking-[0.05em] uppercase 
          rounded-xl shadow-cta-soft hover:shadow-cta-strong 
          transition-all duration-500 overflow-hidden group/btn-inner
          ${isLoading ? "opacity-70 cursor-wait" : ""}
        `}
      >
        {/* Shimmer Effect Layer */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn-inner:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        
        <span className="relative z-10 flex items-center justify-center gap-4">
          <MaterialIcon name={isLoading ? "autorenew" : "bolt"} className={isLoading ? "animate-spin" : ""} filled />
          {isLoading ? "Brewing your Playlist..." : "Generate Masterpiece"}
        </span>
      </motion.button>
    </div>
  );
}
