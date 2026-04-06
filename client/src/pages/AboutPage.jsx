import { AmbientBackground } from "../components/common/AmbientBackground";
import { SiteNav } from "../components/common/SiteNav";
import { SiteFooter } from "../components/common/SiteFooter";
import { motion } from "framer-motion";

export function AboutPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-surface-container-lowest selection:bg-primary selection:text-on-primary font-sans overflow-hidden">
      <SiteNav onNavigate={onNavigate} activePage="/about" />
      <main className="relative pt-40 pb-40 min-h-screen flex items-center">
        <AmbientBackground />
        <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-8"
          >
            About <span className="text-primary italic">Maestro</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8 text-on-surface-variant font-medium leading-relaxed text-lg"
          >
            <p className="p-8 rounded-3xl bg-surface/40 backdrop-blur-2xl border border-primary/5">
              Music Maestro is an AI-powered sonic architect designed to translate your abstract moods, vibes, and specific prompts into highly curated Spotify playlists.
            </p>
            <p className="p-8 rounded-3xl bg-surface/40 backdrop-blur-2xl border border-primary/5">
              Developed closely with Mistral AI's powerful large language models and integrated directly into the Spotify Web API, Maestro closes the gap between what you want to hear and what you actually discover.
            </p>
            <p className="p-8 rounded-3xl bg-surface/40 backdrop-blur-2xl border border-primary/5">
              This project serves as a demonstration of complex state mapping, third-party authentication logic, and dynamic prompting engines.
            </p>
          </motion.div>
        </div>
      </main>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
