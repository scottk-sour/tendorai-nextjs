// Shared types for the Pro weekly report.
//
// Backend response shapes (verified against PR #45 route code):
//
//   GET /api/vendor/weekly-report/:weekStarting
//     200 → { report: WeeklyReportDigest }
//     404 → no report exists for that week
//
//   GET /api/vendor/weekly-report/list
//     200 → { reports: WeekHeader[] }   (newest-first by convention)
//
//   GET /api/vendor/weekly-report/:weekStarting/score-history
//     200 → { history: ScoreHistoryEntry[], joinedScore: number|null,
//             joinedAt: string|null }   (flat — no wrapper)
//
// Permissive on optional fields inside the digest — backend may add
// fields without a UI break — but wrapper keys are exact.

export type EngineKey =
  | 'chatgpt'
  | 'perplexity'
  | 'claude'
  | 'gemini'
  | 'grok'
  | 'meta_ai';

export const ENGINE_ORDER: EngineKey[] = [
  'chatgpt',
  'perplexity',
  'claude',
  'gemini',
  'grok',
  'meta_ai',
];

export const ENGINE_LABELS: Record<EngineKey, string> = {
  chatgpt: 'ChatGPT',
  perplexity: 'Perplexity',
  claude: 'Claude',
  gemini: 'Gemini',
  grok: 'Grok',
  meta_ai: 'Meta AI',
};

export interface PlatformCount {
  mentioned: number;
  target: number;
  change: number;
}

export type ByPlatform = Partial<Record<EngineKey, PlatformCount>>;

export interface ScoreBlock {
  current: number | null;
  delta: number | null;
}

export interface CitationsBlock {
  total: number;
  byPlatform?: ByPlatform | null;
}

export interface AgentActivityBlock {
  // Reconnaissance — backend writes per PR #44.
  reconnaissance?: {
    ran?: boolean;
    queriesScanned?: number;
    platformsScanned?: number;
  } | null;
  // Detective — backend writes per PR #44.
  detective?: {
    ran?: boolean;
    findingsCount?: number;
    topFinding?: {
      type?: string;
      severity?: string;
      title?: string;
      detail?: string;
      recommendation?: string;
    } | null;
  } | null;
  // Writer — backend writes per PR #44.
  writer?: {
    ran?: boolean;
    draftsProduced?: number;
    draftTitles?: string[];
    pendingApproval?: number;
  } | null;
  // Listings — backend writes per PR #44.
  listings?: {
    ran?: boolean;
    submitted?: number;
    live?: number;
    pending?: number;
    directories?: Array<{ directory: string; status: string }>;
  } | null;
  // Reviews — backend writes per PR #44.
  reviews?: {
    ran?: boolean;
    sent?: number;
    skipped?: {
      optedOut?: number;
      cooldown?: number;
      alreadyReviewed?: number;
    };
  } | null;
  // Builder — backend may write later (forward-compat).
  builder?: {
    schemasDeployed?: number;
    schemasLive?: number;
  } | null;
}

export interface NeedsAttentionItem {
  id?: string;
  itemType?: string;
  title?: string;
}

export interface WeeklyReportDigest {
  firmName: string;
  weekStarting: string; // ISO YYYY-MM-DD
  weekEnding: string; // ISO YYYY-MM-DD
  generatedAt: string; // ISO datetime
  score: ScoreBlock;
  citations: CitationsBlock;
  agentActivity?: AgentActivityBlock | null;
  needsAttention?: NeedsAttentionItem[] | null;
  // Sections 3-9 fields are present on the backend response but not yet
  // consumed in this PR.
}

export interface WeekHeader {
  weekStarting: string;
  weekEnding: string;
}

export interface ScoreHistoryEntry {
  weekStarting: string;
  weekEnding: string;
  score: number;
}

export interface ScoreHistoryResponse {
  history: ScoreHistoryEntry[];
  joinedScore: number | null;
  joinedAt: string | null;
}

// Brand purple — matches existing Loop / dashboard components.
// globals.css declares --color-brand-purple: #667eea but most existing
// dashboard components use the Tailwind purple-600 hex; we follow that.
export const BRAND_PURPLE = '#7c3aed'; // tailwind purple-600
export const BRAND_PURPLE_LIGHT = '#a78bfa'; // tailwind purple-400
export const BRAND_PURPLE_FAINT = '#ede9fe'; // tailwind purple-100

// Format a YYYY-MM-DD or ISO date as "5 May 2026" (UK English).
export function formatLongDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// "5 May" — short month, day only. Includes year for January (where the
// chart x-axis would otherwise lose context).
export function formatShortDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const month = d.toLocaleDateString('en-GB', { month: 'short' });
  const day = d.getDate();
  if (d.getMonth() === 0 && d.getDate() <= 7) {
    return `${day} ${month} ${d.getFullYear().toString().slice(-2)}`;
  }
  return `${day} ${month}`;
}

// "5 May 2026 at 08:01" for the "Generated" footer line.
export function formatGeneratedAt(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const date = d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const time = d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${date} at ${time}`;
}

// "5 May – 11 May 2026" — week range.
export function formatWeekRange(weekStarting: string, weekEnding: string): string {
  if (!weekStarting || !weekEnding) return '';
  const start = new Date(weekStarting);
  const end = new Date(weekEnding);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${weekStarting} – ${weekEnding}`;
  }
  const startMonth = start.toLocaleDateString('en-GB', { month: 'long' });
  const endMonth = end.toLocaleDateString('en-GB', { month: 'long' });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const endYear = end.getFullYear();
  if (startMonth === endMonth) {
    return `${startDay} – ${endDay} ${endMonth} ${endYear}`;
  }
  return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${endYear}`;
}

// Sum the count of fixes deployed this week.
// Counts: writer.draftsProduced + listings.live + reviews.sent + builder
// schemas (live or deployed, whichever the backend uses). Defensive — any
// missing field treated as 0.
export function countFixesDeployed(
  activity: AgentActivityBlock | null | undefined,
): number {
  if (!activity) return 0;
  const writer = activity.writer?.draftsProduced ?? 0;
  const listings = activity.listings?.live ?? 0;
  const reviews = activity.reviews?.sent ?? 0;
  const schemas = activity.builder?.schemasLive ?? activity.builder?.schemasDeployed ?? 0;
  return Number(writer) + Number(listings) + Number(reviews) + Number(schemas);
}
