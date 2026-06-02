export type Confidence = "Low" | "Medium" | "High";
export type HumanReviewStatus = "unreviewed" | "in_review" | "reviewed";
export type SourceTier = "Tier 1" | "Tier 2" | "Tier 3" | "Tier 4" | "Unknown";

export interface KeyMetric {
  label: string;
  value: string;
  source: string;
  source_tier: SourceTier;
  date_accessed: string;
  notes: string;
}

export interface CategoryScore {
  category_id: string;
  category_name: string;
  score: number;
  confidence: Confidence;
  rationale: string;
  strengths: string[];
  weaknesses: string[];
  regional_caveats: string[];
  key_metrics: KeyMetric[];
  source_notes: string[];
  data_gaps: string[];
  last_updated: string;
}

export interface CountryEvaluation {
  country: string;
  iso_code: string;
  region: string;
  subregion: string;
  hero_image?: {
    url: string;
    alt: string;
    credit: string;
    license: string;
    source_url: string;
  };
  evaluation_date: string;
  evaluated_by: string;
  overall_summary: string;
  best_for: string[];
  bad_for: string[];
  major_strengths: string[];
  major_weaknesses: string[];
  major_risks: string[];
  open_questions: string[];
  data_gaps: string[];
  category_scores: CategoryScore[];
  source_notes: string[];
  human_review: {
    status: HumanReviewStatus;
    reviewer: string | null;
    review_date: string | null;
    notes: string | null;
  };
}
