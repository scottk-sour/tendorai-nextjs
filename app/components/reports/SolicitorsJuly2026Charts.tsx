'use client';

/**
 * SolicitorsJuly2026Charts — 3 fixed charts embedded in
 * "The UK AI Visibility Report for Solicitors — July 2026".
 *
 * Data is hardcoded (no fetching) and must stay identical to the figures
 * cited in the article body. Brand colours: #667eea (primary) and
 * #764ba2 (secondary), plus neutral greys for lesser series.
 *
 * Bridged into the article body from the shared /resources/[slug] and
 * /blog/[slug] renderers when they encounter a `<!--CHART:N-->` marker.
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const BRAND_PRIMARY = '#667eea';
const BRAND_SECONDARY = '#764ba2';
const NEUTRAL_1 = '#94a3b8';
const NEUTRAL_2 = '#cbd5e1';
const NEUTRAL_3 = '#e2e8f0';

const AXIS_STYLE = { fontSize: 12, fill: '#475569' };
const TOOLTIP_STYLE: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '13px',
};

// ─── CHART 1: Perplexity top-10 domains (horizontal bar) ──────────
const chart1Data = [
  { domain: 'reviewsolicitors.co.uk', citations: 682 },
  { domain: 'reddit.com', citations: 359 },
  { domain: 'solicitors.com', citations: 226 },
  { domain: 'duncanlewis.co.uk', citations: 194 },
  { domain: 'gardnerchampion.co.uk', citations: 178 },
  { domain: 'solicitorsup.co.uk', citations: 168 },
  { domain: 'solicitor.info', citations: 149 },
  { domain: 'lawyersolicitor.co.uk', citations: 124 },
  { domain: 'legalrank.uk', citations: 113 },
  { domain: 'samconveyancing.co.uk', citations: 101 },
];

function Chart1() {
  return (
    <ChartFrame
      title="Where Perplexity's citations came from"
      subtitle="Top 10 domains, July 2026"
    >
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chart1Data}
          layout="vertical"
          margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis type="number" tick={AXIS_STYLE} stroke="#cbd5e1" />
          <YAxis
            type="category"
            dataKey="domain"
            tick={AXIS_STYLE}
            width={170}
            stroke="#cbd5e1"
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(v) => [
              `${typeof v === 'number' ? v.toLocaleString() : v} citations`,
              'Perplexity',
            ]}
          />
          <Bar dataKey="citations" fill={BRAND_PRIMARY} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ─── CHART 2: Overall citation share (donut) ──────────────────────
const chart2Data = [
  { name: 'Individual firm websites', value: 74.1, color: BRAND_PRIMARY },
  { name: 'Legal directories & review platforms', value: 17.2, color: BRAND_SECONDARY },
  { name: 'Forums & social', value: 4.6, color: NEUTRAL_1 },
  { name: 'Search (google.com)', value: 4.1, color: NEUTRAL_2 },
  { name: 'Media & reference', value: 0.02, color: NEUTRAL_3 },
];

function Chart2() {
  return (
    <ChartFrame
      title="Who AI cites overall"
      subtitle="Both engines combined — 12,279 citations, July 2026"
    >
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={chart2Data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={130}
            paddingAngle={1}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {chart2Data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(v, name) => [`${v}%`, String(name)]}
          />
          <Legend
            verticalAlign="bottom"
            height={72}
            wrapperStyle={{ fontSize: 12, lineHeight: '18px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ─── CHART 3: Two engines, two philosophies (grouped bars) ────────
const chart3Data = [
  { category: 'Firm websites', Perplexity: 68.3, ChatGPT: 86.8 },
  { category: 'Legal directories', Perplexity: 25.0, ChatGPT: 0.0 },
  { category: 'Forums & social', Perplexity: 6.6, ChatGPT: 0.0 },
  { category: 'Search', Perplexity: 0.0, ChatGPT: 13.2 },
  { category: 'Media', Perplexity: 0.0, ChatGPT: 0.0 },
];

function Chart3() {
  return (
    <ChartFrame
      title="Two engines, two philosophies"
      subtitle="% share of citations per engine, July 2026"
    >
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={chart3Data}
          margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="category" tick={AXIS_STYLE} stroke="#cbd5e1" />
          <YAxis
            tick={AXIS_STYLE}
            stroke="#cbd5e1"
            tickFormatter={(v: number) => `${v}%`}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(v, name) => [`${v}%`, String(name)]}
          />
          <Legend wrapperStyle={{ fontSize: 13 }} iconType="circle" />
          <Bar dataKey="Perplexity" fill={BRAND_PRIMARY} radius={[4, 4, 0, 0]} />
          <Bar dataKey="ChatGPT" fill={BRAND_SECONDARY} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

// ─── Wrapper for consistent framing across all three charts ───────
function ChartFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-10 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
      <figcaption className="mb-4">
        <div className="text-base font-semibold text-gray-900">{title}</div>
        <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
      </figcaption>
      {children}
    </figure>
  );
}

interface Props {
  index: 1 | 2 | 3;
}

export default function SolicitorsJuly2026Charts({ index }: Props) {
  if (index === 1) return <Chart1 />;
  if (index === 2) return <Chart2 />;
  if (index === 3) return <Chart3 />;
  return null;
}
