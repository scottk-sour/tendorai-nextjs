'use client';

import { useState } from 'react';
import {
  type ScoreHistoryEntry,
  BRAND_PURPLE,
  BRAND_PURPLE_LIGHT,
  formatLongDate,
  formatShortDate,
} from './types';

interface Props {
  history: ScoreHistoryEntry[];
  joinedScore: number | null;
  joinedAt: string | null;
  currentWeekStarting: string;
}

// SVG dimensions are fixed in the viewBox; the chart scales via CSS.
const VIEW_W = 720;
const VIEW_H = 280;
const PADDING = { top: 24, right: 24, bottom: 44, left: 44 };

export default function ScoreHistoryChart({
  history,
  joinedScore,
  joinedAt,
  currentWeekStarting,
}: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Defensive: filter for entries with both a numeric score and a parseable
  // date. Anything missing either is silently dropped — the source endpoint
  // already validates, but a sibling change could shift the shape.
  const validPoints = (history ?? [])
    .filter(
      (h) =>
        h &&
        typeof h.score === 'number' &&
        Number.isFinite(h.score) &&
        typeof h.weekStarting === 'string',
    )
    .map((h) => ({
      ...h,
      timestamp: new Date(h.weekStarting).getTime(),
    }))
    .filter((h) => Number.isFinite(h.timestamp))
    .sort((a, b) => a.timestamp - b.timestamp);

  // Empty state — nothing to plot at all.
  if (validPoints.length === 0) {
    return (
      <div className="card p-6">
        <h3 className="text-base font-semibold text-[var(--text)] mb-4">
          AI Visibility Score history
        </h3>
        <div
          className="relative w-full"
          style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 w-full h-full"
            role="img"
            aria-label="Score history (empty)"
          >
            {[0, 25, 50, 75, 100].map((tick) => {
              const y = mapY(tick);
              return (
                <line
                  key={tick}
                  x1={PADDING.left}
                  x2={VIEW_W - PADDING.right}
                  y1={y}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeDasharray="2 4"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-[var(--text3)] font-medium">
              Score history starts next week
            </p>
          </div>
        </div>
      </div>
    );
  }

  // X-axis range covers the full span of history points, AND includes the
  // snapshot week if it lies outside that span — so e.g. viewing a historic
  // /2026-05-04 snapshot whose history runs Mar 30–May 6 still places the
  // current week in view. With a single point we synthesise a tiny padding
  // around it so the dot doesn't sit at x=0.
  const currentTs = (() => {
    const t = new Date(currentWeekStarting).getTime();
    return Number.isFinite(t) ? t : null;
  })();

  let xMin = validPoints[0].timestamp;
  let xMax = validPoints[validPoints.length - 1].timestamp;
  if (currentTs !== null) {
    if (currentTs < xMin) xMin = currentTs;
    if (currentTs > xMax) xMax = currentTs;
  }
  if (xMin === xMax) {
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
    xMin -= ONE_WEEK;
    xMax += ONE_WEEK;
  }

  const usableW = VIEW_W - PADDING.left - PADDING.right;
  const mapX = (ts: number) =>
    PADDING.left + ((ts - xMin) / (xMax - xMin)) * usableW;

  const pointCoords = validPoints.map((p) => ({
    x: mapX(p.timestamp),
    y: mapY(p.score),
    score: p.score,
    weekStarting: p.weekStarting,
    weekEnding: p.weekEnding,
    isCurrent: currentTs !== null && p.timestamp === currentTs,
  }));

  const polyline = pointCoords.map((p) => `${p.x},${p.y}`).join(' ');

  const joinedY =
    typeof joinedScore === 'number' && Number.isFinite(joinedScore)
      ? mapY(joinedScore)
      : null;

  const hovered = hoverIndex !== null ? pointCoords[hoverIndex] : null;

  return (
    <div className="card p-6">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
        <h3 className="text-base font-semibold text-[var(--text)]">
          AI Visibility Score history
        </h3>
        {joinedAt && (
          <p className="text-xs text-[var(--text3)]">
            Joined Pro {formatLongDate(joinedAt)}
          </p>
        )}
      </div>

      <div
        className="relative w-full"
        style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label="Score history line chart"
          preserveAspectRatio="none"
        >
          {/* Y-axis gridlines + labels at 0 / 25 / 50 / 75 / 100 */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = mapY(tick);
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
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Joined Pro reference line */}
          {joinedY !== null && (
            <g>
              <line
                x1={PADDING.left}
                x2={VIEW_W - PADDING.right}
                y1={joinedY}
                y2={joinedY}
                stroke={BRAND_PURPLE_LIGHT}
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              <text
                x={VIEW_W - PADDING.right - 4}
                y={joinedY - 6}
                textAnchor="end"
                fontSize="10"
                fill={BRAND_PURPLE}
                fontWeight="600"
                fontFamily="var(--font-sans)"
              >
                Joined Pro
              </text>
            </g>
          )}

          {/* Score line */}
          {pointCoords.length > 1 && (
            <polyline
              fill="none"
              stroke={BRAND_PURPLE}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              points={polyline}
            />
          )}

          {/* Dots — current week is bigger and filled */}
          {pointCoords.map((p, i) => (
            <g key={p.weekStarting}>
              <circle
                cx={p.x}
                cy={p.y}
                r={p.isCurrent ? 6 : 4}
                fill={BRAND_PURPLE}
                stroke="#ffffff"
                strokeWidth={2}
              />
              {/* Hover hit area — larger transparent circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r={14}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onFocus={() => setHoverIndex(i)}
                onBlur={() => setHoverIndex(null)}
                tabIndex={0}
                role="button"
                aria-label={`Week of ${formatLongDate(p.weekStarting)} score ${p.score}`}
                style={{ cursor: 'pointer' }}
              />
            </g>
          ))}

          {/* X-axis labels — every point, but hide overlapping if tight */}
          {pointCoords.map((p, i) => {
            // Show every label up to 6 points; thin out beyond that.
            const showLabel =
              pointCoords.length <= 6 || i % Math.ceil(pointCoords.length / 6) === 0;
            if (!showLabel) return null;
            return (
              <text
                key={`xlabel-${p.weekStarting}`}
                x={p.x}
                y={VIEW_H - PADDING.bottom + 18}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
                fontFamily="var(--font-sans)"
              >
                {formatShortDate(p.weekStarting)}
              </text>
            );
          })}
        </svg>

        {/* Tooltip — positioned in % so it tracks the responsive SVG */}
        {hovered && (
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hovered.x / VIEW_W) * 100}%`,
              top: `${(hovered.y / VIEW_H) * 100}%`,
              marginTop: '-12px',
            }}
          >
            <div className="bg-gray-900 text-white text-xs rounded-md px-3 py-2 shadow-lg whitespace-nowrap">
              <div className="font-semibold">Week of {formatLongDate(hovered.weekStarting)}</div>
              <div className="text-gray-300">Score {hovered.score}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function mapY(score: number): number {
  const clamped = Math.max(0, Math.min(100, score));
  const usable = VIEW_H - PADDING.top - PADDING.bottom;
  return PADDING.top + (1 - clamped / 100) * usable;
}
