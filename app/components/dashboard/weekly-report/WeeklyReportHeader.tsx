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
  const latestWeek = sorted[0]?.weekStarting ?? null;
  const currentIndex = sorted.findIndex((w) => w.weekStarting === currentWeekStarting);
  const previousWeek =
    currentIndex !== -1 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1].weekStarting
      : null;
  const isLatest = latestWeek !== null && currentWeekStarting === latestWeek;

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
