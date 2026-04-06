import { MaterialIcon } from "./MaterialIcon";

export function SiteFooter({ onNavigate }) {
  return (
    <footer className="bg-surface-container-lowest w-full pt-24 pb-12 border-t border-primary/5 mt-20 relative z-10 overflow-hidden">
      {/* Absolute Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start mb-16">
          
          {/* Identity Section */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-on-surface tracking-tighter uppercase uppercase">
              Suyash Agrawal
            </h3>
            <p className="text-primary font-black tracking-[0.2em] uppercase text-xs">
              AI/ML Engineer <span className="text-on-surface-variant/40 mx-2">|</span> Full-Stack Developer
            </p>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col md:flex-row items-center md:justify-end gap-8 md:gap-12">
            
            <a 
              href="https://github.com/suyash-agrawal-mntta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex gap-3 items-center"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-on-surface/5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                <MaterialIcon name="code" className="text-on-surface-variant group-hover:text-primary transition-colors text-lg" />
              </div>
              <span className="font-bold text-sm tracking-widest uppercase text-on-surface-variant group-hover:text-primary transition-colors">
                GitHub
              </span>
            </a>

            <a 
              href="https://www.linkedin.com/in/suyash-agrawal-mntta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex gap-3 items-center"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-on-surface/5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                <MaterialIcon name="work" className="text-on-surface-variant group-hover:text-primary transition-colors text-lg" />
              </div>
              <span className="font-bold text-sm tracking-widest uppercase text-on-surface-variant group-hover:text-primary transition-colors">
                LinkedIn
              </span>
            </a>

            <a 
              href="mailto:suyash.mntta@gmail.com" 
              className="group flex gap-3 items-center"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-on-surface/5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                <MaterialIcon name="mail" className="text-on-surface-variant group-hover:text-primary transition-colors text-lg" />
              </div>
              <span className="font-bold text-sm tracking-widest uppercase text-on-surface-variant group-hover:text-primary transition-colors">
                Email
              </span>
            </a>

          </div>
        </div>

        {/* Lower Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-primary/10 gap-8 lg:gap-6 text-center lg:text-left">
          <div className="flex gap-8">
            <button
              onClick={() => onNavigate?.("/about")} 
              className="font-bold text-xs tracking-[0.2em] uppercase text-on-surface-variant/60 hover:text-primary transition-colors"
            >
              About Music Maestro
            </button>
            <button 
              onClick={() => onNavigate?.("/privacy")}
              className="font-bold text-xs tracking-[0.2em] uppercase text-on-surface-variant/60 hover:text-primary transition-colors"
            >
              Privacy & Legal
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 font-bold text-xs tracking-[0.2em] uppercase text-on-surface-variant/40">
            <div>
              Built with <span className="text-primary mx-1">AI</span> + <span className="text-[#1DB954] mx-1">Spotify API</span> 🎧
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-on-surface-variant/20" />
            <div>
              © 2026 Music Maestro
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
