import { motion } from "framer-motion";

export function SystemStatusOrb({ success, user, isSaving }) {
  const isConnected = Boolean(success || user);

  // 📝 Intelligent Labels & Colors
  let headerText = isConnected ? "Synchronized" : "System Status";
  let detailText = isConnected 
    ? `Connected to Spotify | User: ${user?.name || "Member #9964"}` 
    : "User not detected. Please brew songs and add them to Spotify to authorize.";
  
  let glowColor = isConnected ? "border-green-500/20" : "border-primary/20";
  let textColor = isConnected ? "text-green-500" : "text-primary";
  let bgGradient = isConnected ? "from-green-500/10 to-primary/10" : "from-primary/10 to-secondary/10";

  // 🔄 Processing Override State
  if (isSaving) {
    headerText = "Processing...";
    detailText = "Please wait while Maestro is creating your playlist on Spotify... ✨";
    glowColor = "border-secondary/50";
    textColor = "text-secondary";
    bgGradient = "from-secondary/20 to-primary/20";
  }

  return (
    <motion.div
      drag
      dragMomentum={1}
      dragElastic={0.1}
      dragConstraints={{ 
        left: -window.innerWidth + 260, 
        right: 0, 
        top: -window.innerHeight + 260, 
        bottom: 0 
      }}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      style={{
        position: "fixed",
        bottom: 40,
        right: 40,
        x: 0,
        y: 0,
        zIndex: 50,
      }}
      className={`aura-glow w-64 h-64 rounded-full flex items-center justify-center border ${glowColor} bg-surface/80 backdrop-blur-3xl cursor-grab active:cursor-grabbing shadow-2xl overflow-hidden`}
    >
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${bgGradient}`}
        animate={isSaving ? { opacity: [0.2, 0.9, 0.2] } : { opacity: [0.45, 1, 0.45] }}
        transition={{ duration: isSaving ? 1.5 : 2.8, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="relative text-center px-8 pointer-events-none select-none">
        <p className={`text-xs font-black tracking-[0.4em] uppercase mb-2 ${textColor}`}>
          {headerText}
        </p>
        <p className="text-sm text-on-surface-variant leading-relaxed font-semibold">
          {detailText}
        </p>
      </div>
    </motion.div>
  );
}