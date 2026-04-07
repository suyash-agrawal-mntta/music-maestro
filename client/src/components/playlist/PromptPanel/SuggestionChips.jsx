import { motion } from "framer-motion";

export function SuggestionChips({ suggestions, activeSuggestion, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 px-4 pt-4">
      <span className="text-sm font-bold text-on-surface-variant/50 uppercase tracking-widest mt-2">
        Try:
      </span>
      
      {suggestions.map((label) => {
        const isActive = activeSuggestion === label;
        
        return (
          <motion.button
            key={label}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ y: 2, scale: 0.95 }}
            onClick={() => onSelect(label)}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-300
              ${isActive 
                ? "bg-secondary-container text-on-secondary shadow-lg shadow-secondary/20 scale-105" 
                : "bg-surface-container-highest/40 text-on-surface-variant hover:bg-surface-container-highest/80 hover:text-on-surface"
              }
            `}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}
