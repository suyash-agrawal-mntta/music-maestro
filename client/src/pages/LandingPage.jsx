import { AmbientBackground } from "../components/common/AmbientBackground";
import { SiteFooter } from "../components/common/SiteFooter";
import { SiteNav } from "../components/common/SiteNav";
import { MaterialIcon } from "../components/common/MaterialIcon";
import { LandingHero } from "../components/playlist/LandingHero";
import { LandingPromptTeaser } from "../components/playlist/LandingPromptTeaser";
import { LandingTrackPreview } from "../components/playlist/LandingTrackPreview";
import { SystemStatusOrb } from "../components/playlist/SystemStatusOrb";

export function LandingPage({ loading, error, onGenerate, songs, lastParams, success, user, isSaving, setIsSaving, onNavigate }) {
  return (
    <div className="min-h-screen bg-surface-container-lowest selection:bg-primary selection:text-on-primary">
      <SiteNav onNavigate={onNavigate} activePage="/" />
      <main className="relative pt-20">
        <AmbientBackground />
        
        {/* 🔥 The Error Banner: High-end notification for AI glitches */}
        {error && (
          <div className="max-w-xl mx-auto mt-8 px-6 py-4 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <MaterialIcon name="error_outline" className="text-error text-2xl" />
            <p className="text-error text-xs font-bold uppercase tracking-widest leading-loose">
              {error}
            </p>
          </div>
        )}

        <LandingHero />
        <LandingPromptTeaser loading={loading} onGenerate={onGenerate} />
        <LandingTrackPreview songs={songs} lastParams={lastParams} onSave={() => setIsSaving(true)} />
      </main>
      <SiteFooter onNavigate={onNavigate} />
      <SystemStatusOrb success={success} user={user} isSaving={isSaving} />
    </div>
  );
}

