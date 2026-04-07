export function SiteNav({ onNavigate, activePage = "/" }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-3xl border-b border-primary/5">
      <div className="grid grid-cols-3 items-center px-10 h-24 w-full max-w-7xl mx-auto">
        
        {/* 🪄 Column 1: Fancy Title (Pushed Left) */}
        <div className="flex justify-start">
          <div 
            onClick={() => onNavigate?.("/")}
            className="text-3xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary pr-4 hover:opacity-80 transition-opacity whitespace-nowrap cursor-pointer"
          >
            Music Maestro
          </div>
        </div>

        {/* 🧭 Column 2: Exact Page Center Links */}
        <div className="flex justify-center gap-16">
          <button 
            onClick={() => onNavigate?.("/")}
            className={`font-bold tracking-[0.2em] text-xs uppercase hover:scale-105 transition-all py-4 px-2 ${activePage === "/" ? "text-primary" : "text-on-surface-variant/60 hover:text-primary"}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate?.("/how-it-works")}
            className={`font-bold tracking-[0.2em] text-xs uppercase hover:scale-105 transition-all whitespace-nowrap py-4 px-2 ${activePage === "/how-it-works" ? "text-primary" : "text-on-surface-variant/60 hover:text-primary"}`}
          >
            How it Works
          </button>
        </div>

        {/* 📐 Column 3: Spacer for Balancing the Center */}
        <div className="flex justify-end pr-4 opacity-5 pointer-events-none select-none">
          <div className="text-xs font-bold uppercase tracking-[0.2em]">Active</div>
        </div>
      </div>
    </nav>
  );
}

