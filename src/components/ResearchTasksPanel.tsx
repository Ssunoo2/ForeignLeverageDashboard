import { ClipboardList } from "lucide-react";
import type { CountryEvaluation } from "../types/country";
import { getResearchTasksForCountry, summarizeResearchQueue } from "../lib/research";

interface ResearchTasksPanelProps {
  country: CountryEvaluation;
}

export function ResearchTasksPanel({ country }: ResearchTasksPanelProps) {
  const tasks = getResearchTasksForCountry(country);
  const summary = summarizeResearchQueue(tasks);
  const topTasks = tasks.slice(0, 5);

  return (
    <section className="research-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <ClipboardList aria-hidden="true" size={14} />
            Research queue
          </p>
          <h2>Next evidence tasks</h2>
          <p>These tasks are derived from missing categories, source gaps, stale dates, missing metrics, and Low confidence fields.</p>
        </div>
      </div>

      <div className="research-summary-grid">
        <div>
          <strong>{tasks.length}</strong>
          <span>open tasks</span>
        </div>
        <div>
          <strong>{summary.high}</strong>
          <span>high priority</span>
        </div>
        <div>
          <strong>{summary.sourceGaps}</strong>
          <span>source gaps</span>
        </div>
        <div>
          <strong>{summary.missingMetrics}</strong>
          <span>missing metrics</span>
        </div>
      </div>

      {topTasks.length > 0 ? (
        <div className="task-list">
          {topTasks.map((task) => (
            <article className="task-row" key={task.id}>
              <div>
                <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                <strong>{task.title}</strong>
                <p>{task.detail}</p>
              </div>
              <span className="badge freshness">{task.group}</span>
            </article>
          ))}
        </div>
      ) : (
        <p>No open research tasks detected for this country.</p>
      )}
    </section>
  );
}
