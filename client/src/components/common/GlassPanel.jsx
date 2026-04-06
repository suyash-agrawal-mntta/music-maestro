import { cn } from "../../utils/cn";

export function GlassPanel({ className, children }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        "bg-surface-container/60 backdrop-blur-2xl",
        "shadow-lift",
        "before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-b before:from-white/10 before:to-transparent before:-z-10",
        "p-8 md:p-12",
        className
      )}
    >
      {/* Background Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

