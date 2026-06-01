import type { CountryEvaluation } from "../types/country";
import { getCategoryDefinition } from "../data/categoryDefinitions";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { ScoreBar } from "./ScoreBar";

interface CountryScoreTableProps {
  country: CountryEvaluation;
}

export function CountryScoreTable({ country }: CountryScoreTableProps) {
  const scores = [...country.category_scores].sort((a, b) => {
    const groupA = getCategoryDefinition(a.category_id)?.group ?? "Fit";
    const groupB = getCategoryDefinition(b.category_id)?.group ?? "Fit";
    return `${groupA}-${a.category_name}`.localeCompare(`${groupB}-${b.category_name}`);
  });

  return (
    <div className="score-table-list">
      {scores.map((category) => (
        <article className="score-row" key={category.category_id}>
          <div className="score-row-main">
            <div>
              <p className="eyebrow">{getCategoryDefinition(category.category_id)?.group ?? "Category"}</p>
              <h3>{category.category_name}</h3>
            </div>
            <div className="category-score">
              <strong>{category.score}</strong>
              <span>/10</span>
            </div>
          </div>

          <ScoreBar value={category.score} max={10} />
          <div className="badge-row">
            <ConfidenceBadge confidence={category.confidence} />
            <span className="badge freshness">Updated {category.last_updated}</span>
          </div>

          <p>{category.rationale}</p>

          <div className="two-column">
            <div>
              <span className="section-label">Strengths</span>
              <ul>
                {category.strengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="section-label">Weaknesses</span>
              <ul>
                {category.weaknesses.map((weakness) => (
                  <li key={weakness}>{weakness}</li>
                ))}
              </ul>
            </div>
          </div>

          {category.regional_caveats.length > 0 ? (
            <div className="callout muted">
              <span className="section-label">Regional Caveats</span>
              <p>{category.regional_caveats.join(" ")}</p>
            </div>
          ) : null}

          {category.key_metrics.length > 0 ? (
            <div className="metric-evidence">
              <span className="section-label">Key Metrics and Sources</span>
              <div className="metric-evidence-grid">
                {category.key_metrics.map((metric) => (
                  <article className="metric-evidence-card" key={`${metric.label}-${metric.source}`}>
                    <div>
                      <strong>{metric.label}</strong>
                      <span className="badge freshness">{metric.source_tier}</span>
                    </div>
                    <p>{metric.value}</p>
                    <a href={metric.source} target="_blank" rel="noreferrer">
                      {metric.source}
                    </a>
                    <small>
                      Accessed {metric.date_accessed}. {metric.notes}
                    </small>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="source-box">
            <span className="section-label">Source Notes and Gaps</span>
            <ul>
              {[...category.source_notes, ...category.data_gaps].map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
