import type { CountryEvaluation } from "../types/country";
import type { WeightedScoreResult, WeightingProfile } from "../types/scoring";
import { calculateProfileBreakdown, formatScore } from "../lib/scoring";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { ScoreBar } from "./ScoreBar";

interface ProfileScoreCardProps {
  country: CountryEvaluation;
  profile: WeightingProfile;
  result: WeightedScoreResult;
}

export function ProfileScoreCard({ country, profile, result }: ProfileScoreCardProps) {
  const breakdown = calculateProfileBreakdown(country, profile);
  const includedRows = breakdown.filter((row) => !row.missing);
  const missingRows = breakdown.filter((row) => row.missing);

  return (
    <details className="profile-score-card">
      <summary>
        <div>
          <span>{profile.label}</span>
          <strong>{formatScore(result.score)}</strong>
          <ScoreBar value={result.score} compact />
          <small>{Math.round(result.completionRate * 100)}% complete</small>
        </div>
        <span className="expand-indicator">Details</span>
      </summary>

      <div className="profile-breakdown">
        <div className="breakdown-header">
          <span>Category</span>
          <span>Weight</span>
          <span>Score</span>
          <span>Contribution</span>
        </div>

        {includedRows.map((row) => (
          <div className="breakdown-row" key={row.categoryId}>
            <div>
              <strong>{row.categoryLabel}</strong>
              {row.rationale ? <p>{row.rationale}</p> : null}
              {row.confidence ? <ConfidenceBadge confidence={row.confidence} /> : null}
            </div>
            <span>{Math.round(row.weight * 100)}%</span>
            <span>{row.score}/10</span>
            <span>{row.contribution === null ? "N/A" : `${Math.round(row.contribution)}`}</span>
          </div>
        ))}

        {missingRows.length > 0 ? (
          <div className="missing-breakdown">
            <span className="section-label">Missing from this profile</span>
            <div className="tag-row">
              {missingRows.map((row) => (
                <span className="badge completion" key={row.categoryId}>
                  {row.categoryLabel} ({Math.round(row.weight * 100)}%)
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </details>
  );
}
