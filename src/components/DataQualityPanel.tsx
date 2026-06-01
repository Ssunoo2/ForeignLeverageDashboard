import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { CountryEvaluation } from "../types/country";
import { assessCountryDataQuality } from "../lib/dataQuality";
import { ScoreBar } from "./ScoreBar";

interface DataQualityPanelProps {
  country: CountryEvaluation;
  compact?: boolean;
}

export function DataQualityPanel({ country, compact = false }: DataQualityPanelProps) {
  const quality = assessCountryDataQuality(country);
  const Icon = quality.blockers.length > 0 ? AlertTriangle : CheckCircle2;

  return (
    <article className={compact ? "data-quality-panel compact" : "data-quality-panel"}>
      <div className="data-quality-header">
        <div>
          <span className="section-label">Data quality</span>
          <h3>{quality.status}</h3>
        </div>
        <div className={`quality-score quality-${quality.status.toLowerCase().replace(/\s+/g, "-")}`}>
          <strong>{quality.score}</strong>
          <span>/100</span>
        </div>
      </div>

      <ScoreBar value={quality.score} />

      <div className="quality-count-grid">
        <div>
          <strong>{Math.round(quality.completionRate * 100)}%</strong>
          <span>coverage</span>
        </div>
        <div>
          <strong>{quality.issueCounts.lowConfidence}</strong>
          <span>low confidence</span>
        </div>
        <div>
          <strong>{quality.issueCounts.sourceGapCategories}</strong>
          <span>source gaps</span>
        </div>
        <div>
          <strong>{quality.issueCounts.staleCategories}</strong>
          <span>stale</span>
        </div>
      </div>

      {!compact ? (
        <div className="quality-guidance">
          <Icon aria-hidden="true" size={18} />
          <div>
            <span className="section-label">{quality.blockers.length > 0 ? "Blockers" : "Next review step"}</span>
            <ul>
              {(quality.blockers.length > 0 ? quality.blockers : quality.recommendations.slice(0, 2)).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </article>
  );
}
