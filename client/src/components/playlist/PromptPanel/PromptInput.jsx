import { motion } from "framer-motion";
import { MaterialIcon } from "../../common/MaterialIcon";

export function PromptInput({ value, onChange }) {
  return (
    <div className="group space-y-4">
      {/* Label with specific letter-spacing for that "editorial" look */}
      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-6">
        The Maestro&apos;s Prompt
      </label>

      <div className="relative group/input">
        {/* The Input Portal */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Late night rainy drive through neon streets..."
          className="w-full bg-surface-container/40 text-on-surface placeholder:text-on-surface-variant/20 rounded-xl px-10 py-8 text-xl md:text-2xl outline-none transition-all duration-500 hover:bg-surface-container/60 focus:bg-surface-container-highest/80 focus:ring-2 focus:ring-primary/20"
        />

        {/* Floating Voice Icon */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-4 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors duration-300">
           <div className="h-8 w-px bg-white/5 mx-2 hidden sm:block" />
           <MaterialIcon name="keyboard_voice" className="text-3xl" />
        </div>
      </div>
    </div>
  );
}
