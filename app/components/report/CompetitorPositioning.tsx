'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import SectionShell from './SectionShell';
import {
  type Competitor,
  BRAND_PURPLE,
  NEUTRAL_GREY,
} from './types';

function TrendArrow({ direction }: { direction?: string }) {
  if (direction === 'up') return <span className="text-green-600">↑</span>;
  if (direction === 'down') return <span className="text-red-600">↓</span>;
  return <span className="text-gray-400">→</span>;
}

export default function CompetitorPositioning({
  competitors,
  headline,
}: {
  competitors?: Competitor[];
  headline?: string;
}) {
  const rows = competitors ?? [];
  const chartData = rows.map((c) => ({
    name: c.firmName,
    score: typeof c.visibilityScore === 'number' ? c.visibilityScore : 0,
    isYou: Boolean(c.isYou),
  }));

  return (
    <SectionShell index={4} title="Competitor Positioning">
      {headline && headline.trim().length > 0 && (
        <p
          data-testid="competitor-headline"
          className="text-lg font-bold text-[var(--text)] leading-snug mb-5"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {headline}
        </p>
      )}

      {chartData.length > 0 && (
        <div
          className="mb-6"
          style={{ height: Math.max(160, chartData.length * 56) }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 8, right: 24, top: 4, bottom: 4 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="name"
                width={130}
                tick={{ fontSize: 12 }}
              />
              <Tooltip formatter={(v) => [`${v}/100`, 'Visibility']} />
              <Bar dataKey="score" radius={[0, 6, 6, 0]} isAnimationActive={false}>
                {chartData.map((d) => (
                  <Cell
                    key={d.name}
                    fill={d.isYou ? BRAND_PURPLE : NEUTRAL_GREY}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[var(--text3)]">
              <th className="py-2 pr-3 font-semibold">Firm</th>
              <th className="py-2 px-3 font-semibold text-right">Score</th>
              <th className="py-2 px-3 font-semibold text-right">Weekly change</th>
              <th className="py-2 px-3 font-semibold text-right">Citations</th>
              <th className="py-2 pl-3 font-semibold">Notable mention</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.firmName}
                className={`border-b border-[var(--border)] ${
                  c.isYou ? 'bg-purple-50' : ''
                }`}
              >
                <td className="py-2.5 pr-3 font-medium text-[var(--text)]">
                  {c.firmName}
                  {c.isYou && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-purple-600 text-white">
                      You
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums font-semibold text-[var(--text)]">
                  {typeof c.visibilityScore === 'number'
                    ? c.visibilityScore
                    : '—'}
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums text-[var(--text2)]">
                  <TrendArrow direction={c.trendDirection} />{' '}
                  {typeof c.weeklyChange === 'number'
                    ? `${c.weeklyChange > 0 ? '+' : ''}${c.weeklyChange}`
                    : '—'}
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums text-[var(--text2)]">
                  {typeof c.citationCount === 'number' ? c.citationCount : '—'}
                </td>
                <td className="py-2.5 pl-3 text-[var(--text2)]">
                  {c.notableMention || '—'}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center italic text-[var(--text3)]">
                  No competitor data this week.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
