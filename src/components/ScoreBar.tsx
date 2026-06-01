interface ScoreBarProps {
  value: number | null;
  max?: number;
  compact?: boolean;
}

export function ScoreBar({ value, max = 100, compact = false }: ScoreBarProps) {
  const width = value === null ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`score-bar ${compact ? "score-bar-compact" : ""}`} aria-label={value === null ? "No score" : `${Math.round(value)} out of ${max}`}>
      <span style={{ width: `${width}%` }} />
    </div>
  );
}
