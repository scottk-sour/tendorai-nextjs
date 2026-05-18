// Types for the AI Visibility Intelligence Report.
//
// Mirrors the WeeklyReport model shipped in ai-procurement-backend PR #58.
// The API GET /api/vendors/:vendorId/reports/:reportId returns the document
// with syntheticDataFlags stripped, ObjectIds serialised as strings and
// Dates as ISO 8601 strings.
//
// All section fields are optional — the backend may omit a section and the
// UI degrades gracefully rather than crashing.

export type Severity = 'high' | 'medium' | 'low';
export type ReportStatus = 'generated' | 'sent' | 'viewed';
export type TrendDirection = 'up' | 'down' | 'flat';
export type PlatformStatus = 'live' | 'coming_q3_2026' | 'coming_q4_2026';

export interface ScoreHeader {
  currentScore?: number;
  previousScore?: number;
  weeklyChange?: number;
  rankInCity?: number;
  totalFirmsInCity?: number;
  competitorsAhead?: number;
  monthlyOpportunityLoss?: { min?: number; max?: number };
  trendSparkline?: number[];
}

export interface ShareOfVoiceEntry {
  platform: string;
  platformStatus: PlatformStatus;
  yourSharePercent?: number;
  competitorAvgPercent?: number;
  gap?: number;
}

export interface Competitor {
  firmName: string;
  visibilityScore?: number;
  weeklyChange?: number;
  trendDirection?: TrendDirection;
  isYou?: boolean;
  citationCount?: number;
  notableMention?: string;
}

export interface RevenueExposure {
  monthlyMin?: number;
  monthlyMax?: number;
  methodology?: {
    estimatedMonthlyAIQueries?: number;
    citationRateGap?: number;
    averageTransactionValue?: number;
  };
}

export interface PromptAnalysisEntry {
  prompt: string;
  enginesCited?: string[];
  citedFirms?: string[];
  citedSources?: string[];
  youCited?: boolean;
  reasoning?: string;
}

export interface AuthorityGraph {
  directoriesConnected?: string[];
  directoriesMissing?: string[];
  schemaCoverage?: { connected?: number; total?: number };
  reviewPlatformsConnected?: string[];
  reviewPlatformsMissing?: string[];
  contentFootprintPages?: number;
  authorityScore?: number;
}

export interface InaccurateClaim {
  claim: string;
  sourceEngine: string;
  truth: string;
  severity: Severity;
}

export interface PerceptionAnalysis {
  positiveAssociations?: string[];
  missingAssociations?: string[];
  competitorAssociations?: string[];
  inaccurateClaimsDetected?: InaccurateClaim[];
}

export interface Projections {
  historicalScores?: number[];
  projectedScores?: number[];
  projectionMethod?: string;
}

export interface OpportunityFeedEntry {
  detectedQuery: string;
  competitorsCited?: string[];
  youCited?: boolean;
  suggestedAction?: string;
  estimatedImpact?: number;
  relatedApprovalId?: string;
}

export interface RecommendedAction {
  title: string;
  description?: string;
  estimatedImpact?: number;
  severity: Severity;
  approvalId?: string;
}

export interface WhatsNextEntry {
  dayLabel: string;
  eventLabel: string;
  vendorImpact?: string;
}

export interface WeeklyReport {
  _id: string;
  vendorId: string;
  weekStartDate: string;
  weekEndDate: string;
  reportNumber: string;
  generatedAt: string;
  scoreHeader?: ScoreHeader;
  boardSummary?: string;
  shareOfVoice?: ShareOfVoiceEntry[];
  competitors?: Competitor[];
  competitorHeadline?: string;
  revenueExposure?: RevenueExposure;
  promptAnalysis?: PromptAnalysisEntry[];
  authorityGraph?: AuthorityGraph;
  perceptionAnalysis?: PerceptionAnalysis;
  projections?: Projections;
  opportunityFeed?: OpportunityFeedEntry[];
  recommendedActions?: RecommendedAction[];
  whatsNext?: WhatsNextEntry[];
  status?: ReportStatus;
  sentAt?: string;
  firstViewedAt?: string;
  pdfGeneratedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Row shape for the reports list page. The list endpoint returns the same
// documents (or a summary subset) — kept loose so a slim payload still works.
export type ReportListItem = Partial<WeeklyReport> &
  Pick<WeeklyReport, '_id' | 'reportNumber' | 'weekStartDate' | 'weekEndDate'>;

// ─── Brand + status palette ───────────────────────────────────────────
export const BRAND_PURPLE = '#7c3aed';
export const BRAND_PURPLE_LIGHT = '#a78bfa';
export const BRAND_PURPLE_FAINT = '#ede9fe';
export const POSITIVE_GREEN = '#16a34a';
export const NEGATIVE_RED = '#dc2626';
export const NEUTRAL_GREY = '#94a3b8';

// Donut slice colours — three live platforms, brand-led.
export const SLICE_COLOURS = ['#7c3aed', '#a78bfa', '#c4b5fd'];

export const PLATFORM_QUARTER_LABEL: Record<PlatformStatus, string> = {
  live: 'Live',
  coming_q3_2026: 'Coming Q3 2026',
  coming_q4_2026: 'Coming Q4 2026',
};

// ─── Formatting helpers (UK English, £GBP, DD/MM/YYYY) ────────────────
export function formatDate(iso: string | undefined | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export function formatWeekRange(
  start: string | undefined | null,
  end: string | undefined | null,
): string {
  const s = formatDate(start);
  const e = formatDate(end);
  if (!s && !e) return '';
  return `${s} – ${e}`;
}

export function formatGBP(value: number | undefined | null): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '£0';
  return `£${Math.round(value).toLocaleString('en-GB')}`;
}

export function formatGBPRange(
  min: number | undefined | null,
  max: number | undefined | null,
): string {
  const lo = typeof min === 'number' && Number.isFinite(min) ? min : 0;
  const hi = typeof max === 'number' && Number.isFinite(max) ? max : 0;
  if (lo === hi) return formatGBP(lo);
  return `${formatGBP(lo)} – ${formatGBP(hi)}`;
}

export const SEVERITY_BADGE: Record<Severity, string> = {
  high: 'bg-red-100 text-red-700 border border-red-200',
  medium: 'bg-amber-100 text-amber-700 border border-amber-200',
  low: 'bg-slate-100 text-slate-600 border border-slate-200',
};
