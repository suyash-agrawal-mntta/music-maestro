import { AmbientBackground } from "../components/common/AmbientBackground";
import { SiteNav } from "../components/common/SiteNav";
import { SiteFooter } from "../components/common/SiteFooter";
import { motion } from "framer-motion";

export function PrivacyPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-surface-container-lowest selection:bg-primary selection:text-on-primary font-sans overflow-hidden">
      <SiteNav onNavigate={onNavigate} activePage="/privacy" />
      <main className="relative pt-40 pb-40 min-h-screen flex items-center">
        <AmbientBackground />
        <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-8"
          >
            Privacy & <span className="text-secondary italic">Legal</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-on-surface-variant font-medium leading-relaxed"
          >
            <div className="p-8 rounded-3xl bg-surface/40 backdrop-blur-2xl border border-secondary/5 hover:border-secondary/20 transition-colors">
              <h3 className="text-xl font-bold text-on-surface mb-2">1. Spotify Authentication</h3>
              <p>Music Maestro utilizes the Spotify OAuth 2.0 flow. We do not store your Spotify passwords. We only request permissions necessary to read your profile name and create playlists on your behalf.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-surface/40 backdrop-blur-2xl border border-secondary/5 hover:border-secondary/20 transition-colors">
              <h3 className="text-xl font-bold text-on-surface mb-2">2. Data Retention</h3>
              <p>Your AI prompts and generated tracklists are processed ephemerally. Our backend does not log or permanently store your musical tastes in any database.</p>
            </div>

            <div className="p-8 rounded-3xl bg-surface/40 backdrop-blur-2xl border border-secondary/5 hover:border-secondary/20 transition-colors">
              <h3 className="text-xl font-bold text-on-surface mb-2">3. Third-Party Services</h3>
              <p>AI inferences are powered by Mistral AI, which may process your prompts. Please avoid submitting sensitive personally identifiable information as your playlist prompts.</p>
            </div>

            <div className="mt-8 text-center text-sm font-bold tracking-widest uppercase opacity-60">
              <p>By using Music Maestro, you acknowledge this is a portfolio project and operates under standard open-source liability scopes.</p>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
