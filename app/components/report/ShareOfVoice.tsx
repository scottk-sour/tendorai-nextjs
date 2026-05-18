'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import SectionShell from './SectionShell';
import {
  type ShareOfVoiceEntry,
  SLICE_COLOURS,
  PLATFORM_QUARTER_LABEL,
} from './types';

function pct(v: number | undefined): string {
  return typeof v === 'number' && Number.isFinite(v) ? `${v}%` : '—';
}

export default function ShareOfVoice({ data }: { data?: ShareOfVoiceEntry[] }) {
  const entries = data ?? [];
  const live = entries.filter((e) => e.platformStatus === 'live');
  const comingSoon = entries.filter((e) => e.platformStatus !== 'live');

  const donutData = live.map((e) => ({
    name: e.platform,
    value: typeof e.yourSharePercent === 'number' ? e.yourSharePercent : 0,
  }));
  const hasDonut = donutData.some((d) => d.value > 0);

  return (
    <SectionShell
      index={3}
      title="Share of Voice"
      subtitle="Your slice of AI answers across the platforms we track live today."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Donut — 3 live platforms only */}
        <div className="h-64" data-testid="sov-donut">
          {hasDonut ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={2}
                  isAnimationActive={false}
                >
                  {donutData.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={SLICE_COLOURS[i % SLICE_COLOURS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm italic text-[var(--text3)]">
              No live share-of-voice data this week.
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left text-[var(--text3)]">
                <th className="py-2 pr-3 font-semibold">Platform</th>
                <th className="py-2 px-3 font-semibold text-right">You</th>
                <th className="py-2 px-3 font-semibold text-right">Competitor avg</th>
                <th className="py-2 pl-3 font-semibold text-right">Gap</th>
              </tr>
            </thead>
            <tbody>
              {live.map((e, i) => (
                <tr key={e.platform} className="border-b border-[var(--border)]">
                  <td className="py-2.5 pr-3">
                    <span className="inline-flex items-center gap-2 font-medium text-[var(--text)]">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            SLICE_COLOURS[i % SLICE_COLOURS.length],
                        }}
                      />
                      {e.platform}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-semibold text-[var(--text)]">
                    {pct(e.yourSharePercent)}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-[var(--text2)]">
                    {pct(e.competitorAvgPercent)}
                  </td>
                  <td
                    className={`py-2.5 pl-3 text-right tabular-nums font-semibold ${
                      typeof e.gap === 'number' && e.gap < 0
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {typeof e.gap === 'number'
                      ? `${e.gap > 0 ? '+' : ''}${e.gap}%`
                      : '—'}
                  </td>
                </tr>
              ))}
              {live.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center italic text-[var(--text3)]">
                    No live platforms reported.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coming-soon platforms */}
      {comingSoon.length > 0 && (
        <div className="mt-6 pt-5 border-t border-[var(--border)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
            Coming soon
          </p>
          <div className="flex flex-wrap gap-2">
            {comingSoon.map((e) => (
              <span
                key={e.platform}
                className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500"
              >
                {e.platform}
                <span className="text-[10px] uppercase tracking-wide text-gray-400">
                  {PLATFORM_QUARTER_LABEL[e.platformStatus]}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
