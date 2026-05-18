'use client';

import SectionShell from './SectionShell';
import { type RevenueExposure as RevenueExposureData, formatGBPRange, formatGBP } from './types';

export default function RevenueExposure({ data }: { data?: RevenueExposureData }) {
  const m = data?.methodology;

  return (
    <SectionShell
      index={5}
      title="Revenue Exposure"
      subtitle="Estimated monthly revenue at risk while competitors out-cite you."
    >
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Estimated monthly exposure
        </p>
        <p className="mt-2 text-4xl sm:text-5xl font-bold text-[var(--text)] tabular-nums">
          {formatGBPRange(data?.monthlyMin, data?.monthlyMax)}
        </p>

        {/* Methodology — focus/hover tooltip */}
        <div className="group relative mt-4 inline-block">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-800 underline decoration-dotted underline-offset-4"
            aria-describedby="revenue-methodology"
          >
            <span aria-hidden>ⓘ</span> How this is calculated
          </button>
          <div
            id="revenue-methodology"
            role="tooltip"
            className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-0 top-full mt-2 z-10 w-72 rounded-lg border border-[var(--border)] bg-white p-4 text-sm shadow-lg"
          >
            <p className="font-semibold text-[var(--text)] mb-2">Methodology</p>
            <dl className="space-y-1.5 text-[var(--text2)]">
              <div className="flex justify-between gap-3">
                <dt>Estimated monthly AI queries</dt>
                <dd className="tabular-nums font-medium text-[var(--text)]">
                  {typeof m?.estimatedMonthlyAIQueries === 'number'
                    ? m.estimatedMonthlyAIQueries.toLocaleString('en-GB')
                    : '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Citation rate gap</dt>
                <dd className="tabular-nums font-medium text-[var(--text)]">
                  {typeof m?.citationRateGap === 'number'
                    ? `${m.citationRateGap}%`
                    : '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Average transaction value</dt>
                <dd className="tabular-nums font-medium text-[var(--text)]">
                  {formatGBP(m?.averageTransactionValue)}
                </dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-[var(--text3)]">
              Queries × citation rate gap × average transaction value.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
