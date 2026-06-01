interface RiskBadgeProps {
  label: string;
}

export function RiskBadge({ label }: RiskBadgeProps) {
  return <span className="badge risk">{label}</span>;
}
