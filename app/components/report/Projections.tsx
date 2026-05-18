'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import SectionShell from './SectionShell';
import { type Projections as ProjectionsData, BRAND_PURPLE, BRAND_PURPLE_LIGHT } from './types';

interface Point {
  label: string;
  historical: number | null;
  projected: number | null;
}

function buildSeries(data?: ProjectionsData): Point[] {
  const hist = data?.historicalScores ?? [];
  const proj = data?.projectedScores ?? [];
  const points: Point[] = hist.map((v, i) => ({
    label: `W${i + 1}`,
    historical: v,
    projected: null,
  }));
  // Bridge the dashed projection onto the last solid point.
  if (hist.length > 0 && proj.length > 0) {
    points[points.length - 1].projected = hist[hist.length - 1];
  }
  proj.forEach((v, i) => {
    points.push({
      label: `W${hist.length + i + 1}`,
      historical: null,
      projected: v,
    });
  });
  return points;
}

export default function Projections({ data }: { data?: ProjectionsData }) {
  const series = buildSeries(data);
  const method = data?.projectionMethod ?? 'linear_regression_8week';

  return (
    <SectionShell
      index={9}
      title="Projections"
      subtitle={`8 weeks of history, 4 weeks projected (${method.replace(/_/g, ' ')}).`}
    >
      {series.length > 0 ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ top: 8, right: 16, bottom: 4, left: -8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                name="Historical"
                type="monotone"
                dataKey="historical"
                stroke={BRAND_PURPLE}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                connectNulls={false}
                isAnimationActive={false}
              />
              <Line
                name="Projected"
                type="monotone"
                dataKey="projected"
                stroke={BRAND_PURPLE_LIGHT}
                strokeWidth={2.5}
                strokeDasharray="6 5"
                dot={{ r: 3 }}
                connectNulls
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm italic text-[var(--text3)]">
          Not enough history to project yet.
        </p>
      )}
    </SectionShell>
  );
}
