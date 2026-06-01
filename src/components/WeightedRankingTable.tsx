import { ArrowUpRight } from "lucide-react";
import type { CountryEvaluation } from "../types/country";
import type { WeightingProfile } from "../types/scoring";
import { categoryDefinitions } from "../data/categoryDefinitions";
import { formatScore, getAverageConfidence, rankCountries } from "../lib/scoring";
import { slugifyCountry } from "../lib/countryUtils";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { DataFreshnessBadge } from "./DataFreshnessBadge";
import { RiskBadge } from "./RiskBadge";
import { ScoreBar } from "./ScoreBar";

interface WeightedRankingTableProps {
  countries: CountryEvaluation[];
  profile: WeightingProfile;
  onNavigate: (path: string) => void;
}

export function WeightedRankingTable({ countries, profile, onNavigate }: WeightedRankingTableProps) {
  const ranked = rankCountries(countries, profile);

  return (
    <div className="table-shell">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>Score</th>
            <th>Completion</th>
            <th>Best For</th>
            <th>Risks</th>
            <th>Confidence</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((result, index) => (
            <tr key={result.country.iso_code}>
              <td className="rank-cell">{index + 1}</td>
              <td>
                <button className="link-button" onClick={() => onNavigate(`/countries/${slugifyCountry(result.country.country)}`)}>
                  {result.country.country}
                  <ArrowUpRight aria-hidden="true" size={14} />
                </button>
                {result.missingCategoryIds.length > 0 ? (
                  <p className="cell-note">
                    Missing:{" "}
                    {result.missingCategoryIds
                      .slice(0, 3)
                      .map((id) => categoryDefinitions.find((category) => category.id === id)?.label ?? id)
                      .join(", ")}
                    {result.missingCategoryIds.length > 3 ? "..." : ""}
                  </p>
                ) : null}
              </td>
              <td className="score-cell">
                <strong>{formatScore(result.score)}</strong>
                <ScoreBar value={result.score} compact />
              </td>
              <td>{Math.round(result.completionRate * 100)}%</td>
              <td>{result.country.best_for.slice(0, 2).join(", ")}</td>
              <td>
                <div className="tag-row table-tags">
                  {result.country.major_risks.slice(0, 2).map((risk) => (
                    <RiskBadge key={risk} label={risk} />
                  ))}
                </div>
              </td>
              <td>
                <ConfidenceBadge confidence={getAverageConfidence(result.country)} />
              </td>
              <td>
                <DataFreshnessBadge date={result.country.evaluation_date} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
