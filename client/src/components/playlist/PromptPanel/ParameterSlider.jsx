export function ParameterSlider({ 
  label, 
  value, 
  min = 5, 
  max = 50, 
  onChange, 
  unit = "Tracks", 
  accentColor = "primary",
  minLabel,
  maxLabel
}) {
  return (
    <div className="space-y-4 group">
      {/* Label and Value Header */}
      <div className="flex justify-between items-center px-4">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 group-hover:text-on-surface-variant transition-colors duration-300">
          {label}
        </label>
        <span className={`text-sm font-mono font-bold text-primary`}>
          {value} <span className="opacity-40">{unit}</span>
        </span>
      </div>

      {/* The Actual Slider Track */}
      <div className="relative px-4 py-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-surface-container-highest/20 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary-container transition-all duration-300"
        />
        
        {/* Helper Guide Texts: Slow / Fast */}
        {(minLabel || maxLabel) && (
          <div className="flex justify-between mt-3 px-1 text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant/30">
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
