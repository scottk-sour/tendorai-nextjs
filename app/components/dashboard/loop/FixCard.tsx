'use client';

import { useRouter } from 'next/navigation';
import type { LoopCardProps } from './types';

function WrenchIcon() {
  return (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a4 4 0 105.656 5.656l-1.06 1.06-7.071 7.072a2 2 0 01-2.829 0l-1.414-1.414a2 2 0 010-2.829l7.071-7.071-1.06-1.06z M14.7 6.3l-3.535 3.536" />
    </svg>
  );
}

/**
 * "Fixes completed this week" sums artifacts.completed across writer/builder/listings runs.
 * "Queued for next week" sums artifacts.queuedForNextWeek across the same runs.
 * Both fields are documented in the AGENT ARTIFACT SHAPES section of the build brief.
 */
export default function FixCard({
  agentRuns,
  pendingApprovals,
  agentRunsError,
  approvalsError,
  onRetry,
  mode = 'live',
}: LoopCardProps) {
  const router = useRouter();
  const isHistorical = mode === 'historical';

  const fixAgentRuns = agentRuns.filter((r) =>
    r.agentName === 'writer' || r.agentName === 'builder' || r.agentName === 'listings',
  );

  const completedThisWeek = fixAgentRuns.reduce((sum, r) => {
    const a = (r.artifacts ?? {}) as { completed?: number };
    return sum + (typeof a.completed === 'number' ? a.completed : 0);
  }, 0);

  const queuedNextWeek = fixAgentRuns.reduce((sum, r) => {
    const a = (r.artifacts ?? {}) as { queuedForNextWeek?: number };
    return sum + (typeof a.queuedForNextWeek === 'number' ? a.queuedForNextWeek : 0);
  }, 0);

  const awaitingCount = pendingApprovals.length;
  // Amber "Action needed" pill + border are live-only — historical view is
  // read-only, snapshot approvals may already be decided.
  const needsAction = !isHistorical && awaitingCount > 0;

  const handleClick = () => router.push('/vendor-dashboard/approvals');

  const cardClasses = [
    'card',
    'p-5',
    'flex',
    'flex-col',
    'h-full',
    isHistorical ? '' : 'cursor-pointer hover:shadow-md transition-shadow',
    'relative',
    needsAction ? 'border-2 border-amber-500' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
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
      <div className="flex items-start justify-between mb-2">
        <WrenchIcon />
        {needsAction && (
          <span className="inline-flex text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            Action needed
          </span>
        )}
      </div>
      <h3 className="font-serif font-bold uppercase tracking-wide text-sm text-gray-900">Fix</h3>
      <p className="text-sm text-gray-600 mb-4">What we&apos;re sorting</p>
      <div className="border-t border-gray-100 mb-3" />

      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">This week</p>

      {agentRunsError && approvalsError ? (
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
      ) : fixAgentRuns.length === 0 && awaitingCount === 0 && !approvalsError ? (
        <div className="flex-1 flex flex-col text-sm text-gray-500">
          {isHistorical ? (
            <p>No fixes deployed this week.</p>
          ) : (
            <>
              <p>No fixes queued this week.</p>
              <p className="mt-1">Next diagnosis runs Monday.</p>
            </>
          )}
        </div>
      ) : (
        <ul className="flex-1 space-y-1.5 text-sm">
          <li className="text-gray-700">
            {agentRunsError ? (
              <>
                <span className="text-gray-400 font-semibold">—</span> fixes completed this week
              </>
            ) : (
              <>
                <span className="text-green-600 font-semibold">✓</span>{' '}
                <span className="font-semibold text-gray-900">{completedThisWeek}</span>{' '}
                {completedThisWeek === 1 ? 'fix' : 'fixes'} completed
              </>
            )}
          </li>
          <li className={awaitingCount > 0 ? 'text-amber-700' : 'text-gray-700'}>
            {approvalsError ? (
              <>
                <span className="text-gray-400 font-semibold">—</span> awaiting your approval
              </>
            ) : (
              <>
                <span className={awaitingCount > 0 ? 'text-amber-600 font-semibold' : 'text-gray-400 font-semibold'}>
                  {awaitingCount > 0 ? '!' : '·'}
                </span>{' '}
                <span className={`font-semibold ${awaitingCount > 0 ? 'text-amber-800' : 'text-gray-900'}`}>{awaitingCount}</span>{' '}
                awaiting your approval
              </>
            )}
          </li>
          {!agentRunsError && queuedNextWeek > 0 && (
            <li className="text-gray-700">
              <span className="text-gray-400 font-semibold">·</span>{' '}
              <span className="font-semibold text-gray-900">{queuedNextWeek}</span>{' '}
              queued for next week
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
