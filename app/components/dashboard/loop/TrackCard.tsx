'use client';

import { useRouter } from 'next/navigation';
import type { LoopCardProps } from './types';

function TrendingUpIcon() {
  return (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

/**
 * Reads from the reconnaissance run's metricsBefore / metricsAfter to compute
 * the score and platform deltas. The reporter agent's `summary` could also be
 * surfaced here, but the brief specifies a metrics-driven view rather than a
 * narrative one.
 */
export default function TrackCard({ agentRuns, agentRunsError, onRetry }: LoopCardProps) {
  const router = useRouter();

  const reconRun = agentRuns.find((r) => r.agentName === 'reconnaissance');
  const before = reconRun?.metricsBefore;
  const after = reconRun?.metricsAfter;

  const scoreBefore = typeof before?.visibilityScore === 'number' ? before.visibilityScore : null;
  const scoreAfter = typeof after?.visibilityScore === 'number' ? after.visibilityScore : null;
  const hasScoreDelta = scoreBefore !== null && scoreAfter !== null;
  const scoreDelta = hasScoreDelta ? (scoreAfter as number) - (scoreBefore as number) : null;

  const platformsBefore = typeof before?.platformsPresent === 'number' ? before.platformsPresent : null;
  const platformsAfter = typeof after?.platformsPresent === 'number' ? after.platformsPresent : null;
  const platformDelta =
    platformsBefore !== null && platformsAfter !== null
      ? (platformsAfter as number) - (platformsBefore as number)
      : null;

  // Honest empty state: tracking needs at least two weeks of data, which
  // surfaces here as a non-null metricsBefore on this week's reconnaissance run.
  const hasComparison = before !== undefined && after !== undefined;

  const handleClick = () => router.push('/vendor-dashboard/analytics');

  return (
    <div
      className="card p-5 flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <TrendingUpIcon />
      </div>
      <h3 className="font-serif font-bold uppercase tracking-wide text-sm text-gray-900">Track</h3>
      <p className="text-sm text-gray-600 mb-4">Did it work?</p>
      <div className="border-t border-gray-100 mb-3" />

      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">This week vs last</p>

      {agentRunsError ? (
        <div className="flex-1 flex flex-col gap-2 text-sm">
          <p className="text-red-600">Couldn&apos;t load this week&apos;s data.</p>
          {onRetry && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRetry();
              }}
              className="self-start text-xs font-medium text-purple-700 hover:underline"
            >
              Retry
            </button>
          )}
        </div>
      ) : !hasComparison ? (
        <div className="flex-1 flex flex-col text-sm text-gray-500">
          <p>Tracking compares this week to last week.</p>
          <p className="mt-1">Two weeks of data needed before tracking starts.</p>
        </div>
      ) : (
        <ul className="flex-1 space-y-1.5 text-sm">
          {scoreDelta !== null && hasScoreDelta && (
            <li className="text-gray-700">
              {scoreDelta > 0 && (
                <>
                  <span className="text-green-600 font-semibold">↑</span> +{scoreDelta} {Math.abs(scoreDelta) === 1 ? 'point' : 'points'}{' '}
                  <span className="text-gray-500">({scoreBefore} → {scoreAfter})</span>
                </>
              )}
              {scoreDelta < 0 && (
                <>
                  <span className="text-red-600 font-semibold">↓</span> {scoreDelta} {Math.abs(scoreDelta) === 1 ? 'point' : 'points'}{' '}
                  <span className="text-gray-500">({scoreBefore} → {scoreAfter})</span>
                </>
              )}
              {scoreDelta === 0 && (
                <>
                  <span className="text-gray-400 font-semibold">—</span> score held at {scoreAfter}
                </>
              )}
            </li>
          )}
          {platformDelta !== null && (
            <li className="text-gray-700">
              {platformDelta > 0 && (
                <>
                  <span className="text-green-600 font-semibold">+</span> {platformDelta} new{' '}
                  {platformDelta === 1 ? 'platform' : 'platforms'} now mentioning you
                </>
              )}
              {platformDelta === 0 && (
                <>
                  <span className="text-gray-400 font-semibold">—</span> same platforms as last week
                </>
              )}
              {platformDelta < 0 && (
                <>
                  <span className="text-red-600 font-semibold">−</span> {Math.abs(platformDelta)} fewer{' '}
                  {Math.abs(platformDelta) === 1 ? 'platform' : 'platforms'} mentioning you
                </>
              )}
            </li>
          )}
          {scoreDelta !== null && (
            <li className="text-sm">
              {scoreDelta > 0 && (
                <span className="text-green-700">Last week&apos;s deployments produced measurable improvements.</span>
              )}
              {scoreDelta === 0 && (
                <span className="text-gray-600">Score held steady — fixes still working their way through AI indices.</span>
              )}
              {scoreDelta < 0 && (
                <span className="text-amber-700">Score dipped this week — see Diagnose for what changed.</span>
              )}
            </li>
          )}
          {scoreDelta === null && platformDelta === null && (
            <li className="text-gray-500">Comparison data not yet available for this week.</li>
          )}
        </ul>
      )}
    </div>
  );
}
