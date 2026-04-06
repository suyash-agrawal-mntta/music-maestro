import { PromptPanel } from "./PromptPanel/PromptPanel";

/**
 * LandingPromptTeaser is the entry point for the AI generation tool.
 * It uses the modular PromptPanel to handle calculations, styling, and user interaction.
 */
export function LandingPromptTeaser({ loading, onGenerate }) {
  return (
    <div id="ai-entry">
      <PromptPanel loading={loading} onGenerate={onGenerate} />
    </div>
  );
}