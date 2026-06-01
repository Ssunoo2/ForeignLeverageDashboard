import type { Confidence } from "../types/country";

interface ConfidenceBadgeProps {
  confidence: Confidence;
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  return <span className={`badge confidence confidence-${confidence.toLowerCase()}`}>{confidence}</span>;
}
