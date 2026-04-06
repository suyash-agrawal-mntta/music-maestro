import { motion } from "framer-motion";
import { AmbientBackground } from "../components/common/AmbientBackground";
import { SiteFooter } from "../components/common/SiteFooter";
import { SiteNav } from "../components/common/SiteNav";
import { MaterialIcon } from "../components/common/MaterialIcon";

const steps = [
  {
    number: "01",
    title: "Prompt Encoding",
    description: "You provide a vibe, mood, or scenario. Maestro's natural language engine decodes the acoustic parameters and emotional weight of your request.",
    icon: "psychology",
    color: "from-blue-500 to-indigo-500",
  },
  {
    number: "02",
    title: "Sonic Synthesis",
    description: "Powered by Mistral AI, Maestro sweeps through millions of potential tracks to curate a sequence that perfectly aligns with the decoded energy.",
    icon: "graphic_eq",
    color: "from-primary to-secondary",
  },
  {
    number: "03",
    title: "Spotify Synchronization",
    description: "Once the blueprint is verified, Maestro establishes a secure tunnel to your Spotify account and physically constructs the playlist in real-time.",
    icon: "auto_awesome",
    color: "from-[#1DB954] to-emerald-400",
  }
];

export function HowItWorksPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-surface-container-lowest selection:bg-primary selection:text-on-primary font-sans overflow-hidden">
      <SiteNav onNavigate={onNavigate} activePage="/how-it-works" />
      
      <main className="relative pt-32 pb-40 min-h-screen flex flex-col justify-center">
        <AmbientBackground />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6"
            >
              <MaterialIcon name="architecture" className="text-sm" />
              The Architecture
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-6"
            >
              Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">Curtain</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface-variant/80 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Music Maestro isn't just a search engine. It's an intelligent acoustic curator that builds personalized sonic journeys in three distinct phases.
            </motion.p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 gap-12 md:gap-8 max-w-5xl mx-auto relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-[120px] left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative group h-full"
                >
                  <div className="h-full p-8 md:p-10 rounded-[2rem] bg-surface/40 backdrop-blur-3xl border border-primary/5 hover:border-primary/20 transition-all duration-500 flex flex-col justify-between">
                    
                    <div>
                      {/* Step Number & Icon */}
                      <div className="flex items-start justify-between mb-8">
                        <span className="text-5xl font-black text-on-surface/5 group-hover:text-primary/10 transition-colors duration-500 select-none">
                          {step.number}
                        </span>
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr ${step.color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                          <MaterialIcon name={step.icon} className="text-black text-2xl" filled />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-black text-on-surface tracking-tight mb-4 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-on-surface-variant/60 leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>

                    {/* Subtle bottom glow effect purely for aesthetics */}
                    <div className="absolute -bottom-4 -left-4 -right-4 h-32 bg-gradient-to-t from-primary/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-32 text-center"
          >
            <button 
              onClick={() => onNavigate("landing")}
              className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/20 group-hover:ring-primary/40 rounded-full transition-all duration-500" />
              
              <MaterialIcon name="play_arrow" className="text-primary text-xl group-hover:translate-x-1 transition-transform" />
              <span className="font-black text-sm uppercase tracking-[0.3em] text-on-surface group-hover:text-primary transition-colors">
                Initialize Sequence
              </span>
            </button>
          </motion.div>

        </div>
      </main>
      
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
