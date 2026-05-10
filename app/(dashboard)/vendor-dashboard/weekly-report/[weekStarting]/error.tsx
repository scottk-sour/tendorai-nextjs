'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function WeeklyReportError({ error, reset }: Props) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Weekly report page error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card p-8 text-center">
          <h1
            className="text-2xl font-bold text-[var(--text)] mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Something went wrong loading this report
          </h1>
          <p className="text-[var(--text2)] mb-8 max-w-xl mx-auto">
            We’ve logged the issue. Try refreshing in a moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Reload
            </button>
            <Link
              href="/vendor-dashboard"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-[var(--text)] text-sm font-semibold border border-[var(--border)] rounded-lg hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
