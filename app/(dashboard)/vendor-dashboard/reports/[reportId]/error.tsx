'use client';

import Link from 'next/link';

export default function ReportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="card p-8 text-center max-w-xl mx-auto">
      <h1
        className="text-2xl font-bold text-[var(--text)] mb-2"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        This report couldn&apos;t be displayed
      </h1>
      <p className="text-[var(--text2)] mb-5">
        {error.message || 'An unexpected error occurred while rendering the report.'}
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Try again
        </button>
        <Link
          href="/vendor-dashboard/reports"
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-[var(--text)] bg-white border border-[var(--border)] rounded-lg hover:border-purple-300"
        >
          All reports
        </Link>
      </div>
    </div>
  );
}
