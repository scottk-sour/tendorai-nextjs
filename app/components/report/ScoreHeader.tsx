'use client';

import { ResponsiveContainer, LineChart, Line } from 'recharts';
import SectionShell from './SectionShell';
import {
  type ScoreHeader as ScoreHeaderData,
  BRAND_PURPLE,
  formatGBPRange,
} from './types';

function ChangePill({ value }: { value: number | undefined }) {
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
      No change
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)]">
        {label}
      </p>
      <p className="text-lg font-bold text-[var(--text)] tabular-nums mt-1">
        {value}
      </p>
    </div>
  );
}

export default function ScoreHeader({ data }: { data?: ScoreHeaderData }) {
  const score = data?.currentScore;
  const sparkline = (data?.trendSparkline ?? []).map((v, i) => ({ i, v }));

  return (
    <SectionShell index={1} title="AI Visibility Score">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large score card */}
        <div className="lg:col-span-1 rounded-xl bg-purple-50 border border-purple-200 p-6 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-700 mb-2">
            This week
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold text-[var(--text)] tabular-nums">
              {typeof score === 'number' ? score : '—'}
            </span>
            <span className="text-lg text-[var(--text3)] font-medium">/100</span>
          </div>
          <div className="mt-3">
            <ChangePill value={data?.weeklyChange} />
          </div>
          {sparkline.length > 0 && (
            <div className="h-14 mt-4" aria-hidden>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkline}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={BRAND_PURPLE}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Supporting stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3 content-start">
          <Stat
            label="Rank in city"
            value={
              typeof data?.rankInCity === 'number'
                ? `#${data.rankInCity}${
                    typeof data?.totalFirmsInCity === 'number'
                      ? ` of ${data.totalFirmsInCity}`
                      : ''
                  }`
                : '—'
            }
          />
          <Stat
            label="Competitors ahead"
            value={
              typeof data?.competitorsAhead === 'number'
                ? String(data.competitorsAhead)
                : '—'
            }
          />
          <Stat
            label="Previous score"
            value={
              typeof data?.previousScore === 'number'
                ? `${data.previousScore}/100`
                : '—'
            }
          />
          <Stat
            label="Monthly opportunity loss"
            value={formatGBPRange(
              data?.monthlyOpportunityLoss?.min,
              data?.monthlyOpportunityLoss?.max,
            )}
          />
        </div>
      </div>
    </SectionShell>
  );
}
