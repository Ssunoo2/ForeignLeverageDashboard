import { getFreshnessStatus } from "../lib/scoring";

interface DataFreshnessBadgeProps {
  date: string;
}

export function DataFreshnessBadge({ date }: DataFreshnessBadgeProps) {
  const status = getFreshnessStatus(date);
  return <span className={`badge freshness freshness-${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>;
}
