import type { CountryEvaluation } from "../types/country";
import { categoryDefinitions } from "../data/categoryDefinitions";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { ScoreBar } from "./ScoreBar";

interface CategoryBarChartProps {
  country: CountryEvaluation;
  groupFilter?: string;
}

export function CategoryBarChart({ country, groupFilter = "All" }: CategoryBarChartProps) {
  const rows = categoryDefinitions
    .filter((category) => groupFilter === "All" || category.group === groupFilter)
    .map((category) => ({
      category,
      score: country.category_scores.find((item) => item.category_id === category.id)
    }));

  return (
    <div className="category-bars">
      {rows.map(({ category, score }) => (
        <div className={score ? "category-bar-row" : "category-bar-row category-bar-missing"} key={category.id}>
          <div>
            <span className="section-label">{category.group}</span>
            <strong>{category.label}</strong>
          </div>
          <div className="category-bar-score">
            {score ? (
              <>
                <span>{score.score}/10</span>
                <ScoreBar value={score.score} max={10} compact />
                <ConfidenceBadge confidence={score.confidence} />
              </>
            ) : (
              <span className="missing">Missing</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
