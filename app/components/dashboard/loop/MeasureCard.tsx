'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { LoopCardProps } from './types';
import { isProTier } from './types';
import { nextMondayLabel } from '@/lib/loop/weekStarting';

function MagnifierIcon() {
  return (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-3.5 h-3.5 inline-block ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function MeasureCard({
  vendorTier,
  agentRuns,
  existingScoreData,
  agentRunsError,
  onRetry,
  mode = 'live',
}: LoopCardProps) {
  const router = useRouter();
  const isHistorical = mode === 'historical';
  const isPro = isProTier(vendorTier);

  const reconRun = agentRuns.find((r) => r.agentName === 'reconnaissance');
  const artifacts = (reconRun?.artifacts ?? {}) as {
    queriesRun?: number;
    platforms?: Record<string, unknown>;
  };

  const queriesRun = typeof artifacts.queriesRun === 'number' ? artifacts.queriesRun : null;
  const platformsCount =
    artifacts.platforms && typeof artifacts.platforms === 'object'
      ? Object.keys(artifacts.platforms).length
      : null;

  const scoreBefore = reconRun?.metricsBefore?.visibilityScore;
  const scoreAfter = reconRun?.metricsAfter?.visibilityScore;
  const hasDelta = typeof scoreBefore === 'number' && typeof scoreAfter === 'number';
  const delta = hasDelta ? (scoreAfter as number) - (scoreBefore as number) : null;

  const handleClick = () => router.push('/vendor-dashboard/analytics');

  return (
    <div
      className={`card p-5 flex flex-col h-full ${
        isHistorical ? '' : 'cursor-pointer hover:shadow-md transition-shadow'
      }`}
      onClick={isHistorical ? undefined : handleClick}
      role={isHistorical ? undefined : 'button'}
      tabIndex={isHistorical ? undefined : 0}
      onKeyDown={
        isHistorical
          ? undefined
          : (e) => {
              if (e.key === 'Enter' || e.key === ' ') handleClick();
            }
      }
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <MagnifierIcon />
      </div>
      <h3 className="font-serif font-bold uppercase tracking-wide text-sm text-gray-900">Measure</h3>
      <p className="text-sm text-gray-600 mb-4">Where you appear in AI</p>
      <div className="border-t border-gray-100 mb-3" />

      {/* This week */}
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">This week</p>

      {agentRunsError ? (
        <div className="flex-1 flex flex-col gap-2 text-sm">
          <p className="text-red-600">Couldn&apos;t load this week&apos;s data.</p>
          {onRetry && !isHistorical && (
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
      ) : !isPro && !isHistorical ? (
        <div className="flex-1 flex flex-col gap-2 text-sm">
          {typeof existingScoreData?.score === 'number' ? (
            <p className="text-gray-700">
              Last visibility score: <span className="font-semibold text-gray-900">{existingScoreData.score}</span>
              <LockIcon />
            </p>
          ) : (
            <p className="text-gray-500">Run your first AI Visibility Report to see a score.</p>
          )}
          <Link
            href="/vendor-dashboard/analytics#ai-visibility-score"
            className="inline-flex items-center justify-center w-full px-3 py-2 mt-1 text-xs font-semibold rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Run your free scan
          </Link>
          <Link
            href="/pricing"
            className="text-xs font-medium text-purple-700 hover:underline mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            Upgrade to Pro for weekly automated measurement →
          </Link>
        </div>
      ) : !reconRun ? (
        <div className="flex-1 flex flex-col text-sm text-gray-500">
          {isHistorical ? (
            <p>Reconnaissance didn&apos;t run this week.</p>
          ) : (
            <>
              <p>Measurement runs every Monday morning.</p>
              <p className="mt-1">Next run: {nextMondayLabel()}</p>
            </>
          )}
        </div>
      ) : (
        <ul className="flex-1 space-y-1.5 text-sm">
          {queriesRun !== null && (
            <li className="text-gray-700">
              <span className="text-green-600 font-semibold">✓</span> {queriesRun} {queriesRun === 1 ? 'query' : 'queries'} run
            </li>
          )}
          {platformsCount !== null && (
            <li className="text-gray-700">
              <span className="text-green-600 font-semibold">✓</span> {platformsCount} {platformsCount === 1 ? 'platform' : 'platforms'} checked
            </li>
          )}
          {delta !== null && (
            <li className="text-gray-700">
              {delta > 0 && (
                <>
                  <span className="text-green-600 font-semibold">↑</span> +{delta} {Math.abs(delta) === 1 ? 'point' : 'points'}
                </>
              )}
              {delta < 0 && (
                <>
                  <span className="text-red-600 font-semibold">↓</span> {delta} {Math.abs(delta) === 1 ? 'point' : 'points'}
                </>
              )}
              {delta === 0 && (
                <>
                  <span className="text-gray-400 font-semibold">—</span> same as last week
                </>
              )}
            </li>
          )}
          {queriesRun === null && platformsCount === null && delta === null && (
            <li className="text-gray-500">Run completed — detailed metrics not available.</li>
          )}
        </ul>
      )}
    </div>
  );
}
