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
            className={`font-black tracking-[0.3em] text-[10px] uppercase hover:scale-110 transition-all ${activePage === "/" ? "text-primary" : "text-on-surface-variant/40 hover:text-primary"}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate?.("/how-it-works")}
            className={`font-black tracking-[0.3em] text-[10px] uppercase hover:scale-110 transition-all whitespace-nowrap ${activePage === "/how-it-works" ? "text-primary" : "text-on-surface-variant/40 hover:text-primary"}`}
          >
            How it Works
          </button>
        </div>

        {/* 📐 Column 3: Spacer for Balancing the Center */}
        <div className="flex justify-end pr-4 opacity-5 pointer-events-none select-none">
          <div className="text-[10px] font-black uppercase tracking-[0.4em]">Active</div>
        </div>
      </div>
    </nav>
  );
}

