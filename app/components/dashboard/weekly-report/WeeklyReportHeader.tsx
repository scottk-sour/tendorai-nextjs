'use client';

import Link from 'next/link';
import {
  type WeekHeader,
  formatGeneratedAt,
  formatWeekRange,
} from './types';

interface Props {
  firmName: string;
  weekStarting: string;
  weekEnding: string;
  generatedAt: string;
  weeksList: WeekHeader[];
  currentWeekStarting: string;
}

// Backend serialises weekStarting as a full ISO datetime
// ("2026-05-04T00:00:00.000Z"). The URL segment must be YYYY-MM-DD only —
// otherwise the link points at /vendor-dashboard/weekly-report/<full-iso>
// (URL-encoded by Next.js to a 404).
function toDateOnly(iso: string): string {
  if (!iso) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().split('T')[0];
}

export default function WeeklyReportHeader({
  firmName,
  weekStarting,
  weekEnding,
  generatedAt,
  weeksList,
  currentWeekStarting,
}: Props) {
  // weeksList is expected newest-first. Defensive: also tolerate empty.
  const sorted = [...weeksList].sort(
    (a, b) => new Date(b.weekStarting).getTime() - new Date(a.weekStarting).getTime(),
  );
  // Normalise both sides of the equality so date-only and full-ISO compare
  // correctly — otherwise the "Latest report" detection always says false
  // when weeksList items are ISO datetimes but currentWeekStarting is the
  // URL segment.
  const currentKey = toDateOnly(currentWeekStarting);
  const latestWeekRaw = sorted[0]?.weekStarting ?? null;
  const latestWeek = latestWeekRaw ? toDateOnly(latestWeekRaw) : null;
  const currentIndex = sorted.findIndex(
    (w) => toDateOnly(w.weekStarting) === currentKey,
  );
  const previousWeek =
    currentIndex !== -1 && currentIndex < sorted.length - 1
      ? toDateOnly(sorted[currentIndex + 1].weekStarting)
      : null;
  const isLatest = latestWeek !== null && currentKey === latestWeek;

  return (
    <header className="mb-8">
      <h1
        className="text-3xl md:text-4xl font-bold text-[var(--text)] leading-tight"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {firmName}
      </h1>
      <p className="text-base md:text-lg text-[var(--text2)] font-medium mt-2">
        {formatWeekRange(weekStarting, weekEnding)}
      </p>

      {/* Week navigation */}
      <nav
        aria-label="Week navigation"
        className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
      >
        {previousWeek ? (
          <Link
            href={`/vendor-dashboard/weekly-report/${previousWeek}`}
            className="inline-flex items-center justify-center sm:justify-start px-4 py-2 text-sm font-semibold text-[var(--text)] bg-white border border-[var(--border)] rounded-lg hover:border-purple-300 hover:text-purple-700 transition-colors w-full sm:w-auto"
          >
            ← Previous week
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center justify-center sm:justify-start px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-50 border border-[var(--border)] rounded-lg cursor-not-allowed w-full sm:w-auto"
          >
            ← Previous week
          </span>
        )}

        <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-lg w-full sm:w-auto">
          {isLatest ? 'Current week' : formatWeekRange(weekStarting, weekEnding)}
        </span>

        {isLatest || !latestWeek ? (
          <span
            aria-disabled="true"
            className="inline-flex items-center justify-center sm:justify-end px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-50 border border-[var(--border)] rounded-lg cursor-not-allowed w-full sm:w-auto sm:ml-auto"
          >
            Current week
          </span>
        ) : (
          <Link
            href={`/vendor-dashboard/weekly-report/${latestWeek}`}
            className="inline-flex items-center justify-center sm:justify-end px-4 py-2 text-sm font-semibold text-[var(--text)] bg-white border border-[var(--border)] rounded-lg hover:border-purple-300 hover:text-purple-700 transition-colors w-full sm:w-auto sm:ml-auto"
          >
            Latest report →
          </Link>
        )}
      </nav>

      <p className="mt-4 text-xs text-[var(--text3)]">
        Generated {formatGeneratedAt(generatedAt)}
      </p>
    </header>
  );
}
