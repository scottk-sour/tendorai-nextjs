'use client';

import { useState } from 'react';
import {
  type ByPlatform,
  type EngineKey,
  ENGINE_ORDER,
  ENGINE_LABELS,
  BRAND_PURPLE,
} from './types';

interface Props {
  byPlatform: ByPlatform | null | undefined;
}

const VIEW_W = 720;
const VIEW_H = 320;
const PADDING = { top: 32, right: 24, bottom: 56, left: 44 };

export default function PlatformBreakdownSection({ byPlatform }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const empty =
    !byPlatform ||
    ENGINE_ORDER.every((engine) => {
      const p = byPlatform?.[engine];
      return !p || (p.target ?? 0) === 0;
    });

  return (
    <section aria-label="Per-engine breakdown" className="mb-10">
      <h2
        className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-6"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Where AI mentioned you this week
      </h2>

      <div className="card p-6">
        {empty ? (
          <div
            className="relative w-full flex items-center justify-center"
            style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
          >
            <p className="text-sm text-[var(--text3)] font-medium text-center max-w-md px-4">
              Reconnaissance hasn’t completed this week’s scan yet. First results
              appear Tuesday morning.
            </p>
          </div>
        ) : (
          <PlatformChart
            byPlatform={byPlatform!}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
          />
        )}
      </div>

      {/* Editorial copy block — Section 16 single-CTA discipline: no CTA here. */}
      <p className="mt-4 text-sm text-[var(--text2)] max-w-[600px] leading-relaxed">
        AI engines don’t share a single index. ChatGPT and Claude reach different
        audiences than Perplexity. Your visibility on each engine is tracked
        separately because each represents different prospect behaviour.
      </p>
    </section>
  );
}

function PlatformChart({
  byPlatform,
  hoverIndex,
  setHoverIndex,
}: {
  byPlatform: ByPlatform;
  hoverIndex: number | null;
  setHoverIndex: (i: number | null) => void;
}) {
  const usableW = VIEW_W - PADDING.left - PADDING.right;
  const usableH = VIEW_H - PADDING.top - PADDING.bottom;
  const slot = usableW / ENGINE_ORDER.length;
  const barWidth = Math.min(48, slot * 0.55);

  const data = ENGINE_ORDER.map((engine) => {
    const p = byPlatform[engine];
    const mentioned = p?.mentioned ?? 0;
    const target = p?.target ?? 0;
    const change = p?.change ?? 0;
    const lastWeek = mentioned - change;
    const pct = target > 0 ? Math.max(0, Math.min(100, (mentioned / target) * 100)) : 0;
    const lastPct =
      target > 0 ? Math.max(0, Math.min(100, (lastWeek / target) * 100)) : 0;
    return { engine, mentioned, target, change, lastWeek, pct, lastPct };
  });

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="Per-engine citation rate vs target"
        preserveAspectRatio="none"
      >
        {/* Y-axis gridlines + labels */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = PADDING.top + (1 - tick / 100) * usableH;
          return (
            <g key={tick}>
              <line
                x1={PADDING.left}
                x2={VIEW_W - PADDING.right}
                y1={y}
                y2={y}
                stroke="#e5e7eb"
                strokeDasharray={tick === 0 ? '0' : '2 4'}
              />
              <text
                x={PADDING.left - 8}
                y={y}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize="11"
                fill="#6b7280"
                fontFamily="var(--font-sans)"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const slotCenter = PADDING.left + i * slot + slot / 2;
          const barX = slotCenter - barWidth / 2;
          const thisH = (d.pct / 100) * usableH;
          const thisY = PADDING.top + usableH - thisH;
          const ghostH = (d.lastPct / 100) * usableH;
          const ghostY = PADDING.top + usableH - ghostH;
          const indicator = d.change > 0 ? '↑' : d.change < 0 ? '↓' : '—';
          const indicatorFill =
            d.change > 0 ? '#16a34a' : d.change < 0 ? '#dc2626' : '#6b7280';

          return (
            <g
              key={d.engine}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(i)}
              onBlur={() => setHoverIndex(null)}
              tabIndex={0}
              role="button"
              aria-label={`${ENGINE_LABELS[d.engine]}: ${d.mentioned} of ${d.target} queries cited this week, was ${d.lastWeek} last week`}
              style={{ cursor: 'pointer', outline: 'none' }}
            >
              {/* Hover hit area */}
              <rect
                x={PADDING.left + i * slot}
                y={PADDING.top}
                width={slot}
                height={usableH}
                fill="transparent"
              />

              {/* Last-week ghost outline */}
              {d.lastPct > 0 && (
                <rect
                  x={barX}
                  y={ghostY}
                  width={barWidth}
                  height={ghostH}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  rx={4}
                />
              )}

              {/* This-week bar */}
              {d.pct > 0 && (
                <rect
                  x={barX}
                  y={thisY}
                  width={barWidth}
                  height={thisH}
                  fill={BRAND_PURPLE}
                  rx={4}
                />
              )}

              {/* Indicator above bar */}
              <text
                x={slotCenter}
                y={Math.max(PADDING.top - 8, thisY - 8)}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={indicatorFill}
              >
                {indicator}
              </text>

              {/* X-axis label */}
              <text
                x={slotCenter}
                y={VIEW_H - PADDING.bottom + 20}
                textAnchor="middle"
                fontSize="11"
                fill="#374151"
                fontFamily="var(--font-sans)"
                fontWeight="500"
              >
                {ENGINE_LABELS[d.engine]}
              </text>
              <text
                x={slotCenter}
                y={VIEW_H - PADDING.bottom + 36}
                textAnchor="middle"
                fontSize="10"
                fill="#6b7280"
                fontFamily="var(--font-sans)"
              >
                {d.mentioned}/{d.target}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoverIndex !== null && data[hoverIndex] && (
        <div
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{
            left: `${
              ((PADDING.left + hoverIndex * slot + slot / 2) / VIEW_W) * 100
            }%`,
            top: `${(PADDING.top / VIEW_H) * 100}%`,
            marginTop: '-4px',
          }}
        >
          <div className="bg-gray-900 text-white text-xs rounded-md px-3 py-2 shadow-lg whitespace-nowrap">
            <div className="font-semibold">
              {ENGINE_LABELS[data[hoverIndex].engine as EngineKey]} — {data[hoverIndex].mentioned}/
              {data[hoverIndex].target} queries cited
            </div>
            <div className="text-gray-300">
              was {data[hoverIndex].lastWeek}/{data[hoverIndex].target} last week
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
