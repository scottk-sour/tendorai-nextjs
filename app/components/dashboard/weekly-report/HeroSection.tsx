'use client';

import Link from 'next/link';
import {
  type WeeklyReportDigest,
  type ScoreHistoryEntry,
  type EngineKey,
  ENGINE_ORDER,
  ENGINE_LABELS,
  countFixesDeployed,
} from './types';
import ScoreHistoryChart from './ScoreHistoryChart';

interface Props {
  digest: WeeklyReportDigest;
  scoreHistory: ScoreHistoryEntry[];
  joinedScore: number | null;
  joinedAt: string | null;
}

// Read a finite number from one of the shapes the backend may have shipped
// across versions: { current }, { value }, { latest }, or score as a bare
// number. Returns null for anything else — including NaN — so the caller
// can render "—" only when there is genuinely no score, not when the score
// is 0.
function readFiniteNumber(raw: unknown, ...keys: string[]): number | null {
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    for (const k of keys) {
      const v = obj[k];
      if (typeof v === 'number' && Number.isFinite(v)) return v;
    }
  }
  return null;
}

export default function HeroSection({
  digest,
  scoreHistory,
  joinedScore,
  joinedAt,
}: Props) {
  const score = readFiniteNumber(digest.score, 'current', 'value', 'latest');
  const delta = readFiniteNumber(digest.score, 'delta', 'change');
  const fixesCount = countFixesDeployed(digest.agentActivity);
  const awaitingCount = digest.needsAttention?.length ?? 0;
  const sinceJoiningDelta =
    score !== null && typeof joinedScore === 'number'
      ? score - joinedScore
      : null;

  return (
    <section aria-label="Weekly headline" className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Box 1 — AI Visibility Score */}
        <div className="card p-6 flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
            AI Visibility Score
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-[var(--text)] tabular-nums">
              {score !== null ? score : '—'}
            </span>
            <span className="text-base text-[var(--text3)] font-medium">/100</span>
          </div>
          <div className="mt-3">
            <DeltaPill value={delta} />
          </div>
          {sinceJoiningDelta !== null && (
            <p className="mt-2 text-xs text-[var(--text3)]">
              {sinceJoiningDelta >= 0 ? '+' : ''}
              {sinceJoiningDelta} since joining
            </p>
          )}
        </div>

        {/* Box 2 — Citations captured */}
        <div className="card p-6 flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
            Citations captured
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-[var(--text)] tabular-nums">
              {digest.citations?.total ?? 0}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {ENGINE_ORDER.map((engine) => {
              const platform = digest.citations?.byPlatform?.[engine];
              const mentioned = platform?.mentioned ?? 0;
              const active = mentioned > 0;
              return (
                <span
                  key={engine}
                  title={`${ENGINE_LABELS[engine]} — ${mentioned} mention${mentioned === 1 ? '' : 's'}`}
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-opacity ${
                    active
                      ? 'bg-purple-100 text-purple-700 opacity-100'
                      : 'bg-gray-100 text-gray-400 opacity-60'
                  }`}
                  aria-label={`${ENGINE_LABELS[engine]}: ${mentioned} mentions`}
                >
                  <EngineGlyph engine={engine} />
                </span>
              );
            })}
          </div>
        </div>

        {/* Box 3 — Fixes deployed */}
        <div className="card p-6 flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
            Fixes deployed
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-[var(--text)] tabular-nums">
              {fixesCount}
            </span>
          </div>
          {awaitingCount > 0 && (
            <Link
              href="/vendor-dashboard/approvals"
              className="mt-3 inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors"
            >
              {awaitingCount} awaiting your approval →
            </Link>
          )}
        </div>
      </div>

      {/* Score history chart */}
      <ScoreHistoryChart
        history={scoreHistory}
        joinedScore={joinedScore}
        joinedAt={joinedAt}
        currentWeekStarting={digest.weekStarting}
      />
    </section>
  );
}

function DeltaPill({ value }: { value: number | null | undefined }) {
  // null/undefined/NaN → "—" (no measurement). A literal 0 is a real value
  // meaning "no change this week" — render it explicitly, not as missing.
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
        —
      </span>
    );
  }
  if (value > 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        +{value} ↑
      </span>
    );
  }
  if (value < 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        {value} ↓
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
      no change
    </span>
  );
}

// Tiny inline glyph per engine — first letter, monospace-ish. Avoids
// adding logo SVGs that would each need their own provenance.
function EngineGlyph({ engine }: { engine: EngineKey }) {
  const glyph: Record<EngineKey, string> = {
    chatgpt: 'C',
    perplexity: 'P',
    claude: 'Cl',
    gemini: 'G',
    grok: 'Gr',
    meta_ai: 'M',
  };
  return <span className="text-[10px]">{glyph[engine]}</span>;
}
