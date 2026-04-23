'use client';

import { extractMissingSignals, humaniseSignalKey } from '@/lib/vendorServices/aeoSignalLabels';

export default function CompletenessPanel({
  score,
  aeoSignals,
}: {
  score: number;
  aeoSignals?: Record<string, unknown> | null;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(score)));
  const missing = extractMissingSignals(aeoSignals);

  const colour = pct >= 80 ? '#16A34A' : pct >= 50 ? '#D97706' : pct >= 25 ? '#EA580C' : '#DC2626';
  const band = pct >= 80 ? 'Strong' : pct >= 50 ? 'Good' : pct >= 25 ? 'Needs work' : 'Getting started';

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            Completeness score
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tabular-nums" style={{ color: colour }}>{pct}</span>
            <span className="text-sm text-gray-400 font-medium">/ 100</span>
          </div>
          <span
            className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${colour}15`, color: colour }}
          >
            {band}
          </span>
        </div>
        <div className="w-32">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, backgroundColor: colour }}
            />
          </div>
        </div>
      </div>

      {missing.length === 0 ? (
        <p className="text-sm text-gray-600 mt-2">
          Every signal we check for is present. Nice work.
        </p>
      ) : (
        <div className="mt-2">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Missing signals ({missing.length}){' '}
            <span className="font-normal text-gray-500">— adding these improves your score and AI visibility.</span>
          </p>
          <ul className="space-y-1.5">
            {missing.map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm text-gray-700">
                <span
                  className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold"
                  aria-hidden
                >
                  !
                </span>
                <span>{humaniseSignalKey(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
