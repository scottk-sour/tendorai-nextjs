'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { LoopCardProps } from './types';
import { isProTier } from './types';

function StethoscopeIcon() {
  return (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a4 4 0 008 0V7a2 2 0 00-2-2h-2M7 11v3a4 4 0 008 0v-3m-4 7v3a3 3 0 003 3h0a3 3 0 003-3v-1.5m-3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
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

export default function DiagnoseCard({
  vendorTier,
  agentRuns,
  existingAuditData,
  agentRunsError,
  onRetry,
  mode = 'live',
}: LoopCardProps) {
  const router = useRouter();
  const isHistorical = mode === 'historical';
  const isPro = isProTier(vendorTier);

  const detectiveRun = agentRuns.find((r) => r.agentName === 'detective');
  const artifacts = (detectiveRun?.artifacts ?? {}) as {
    gapsIdentified?: number;
    gaps?: string[];
    competitorsAbove?: string[];
  };

  const gapsCount = typeof artifacts.gapsIdentified === 'number' ? artifacts.gapsIdentified : null;
  const gapsList = Array.isArray(artifacts.gaps) ? artifacts.gaps.filter((g) => typeof g === 'string') : [];
  const competitorsCount = Array.isArray(artifacts.competitorsAbove) ? artifacts.competitorsAbove.length : null;

  // Free-tier fallback: derive top 3 gaps from latest audit's failed checks.
  const auditFailedGaps =
    existingAuditData?.checks
      ?.filter((c) => !c.passed)
      .map((c) => c.recommendation || c.name)
      .slice(0, 3) ?? [];

  const handleClick = () => router.push('/vendor-dashboard/analytics#audit');

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
      <div className="flex items-start justify-between mb-2">
        <StethoscopeIcon />
      </div>
      <h3 className="font-serif font-bold uppercase tracking-wide text-sm text-gray-900">Diagnose</h3>
      <p className="text-sm text-gray-600 mb-4">Why you&apos;re being missed</p>
      <div className="border-t border-gray-100 mb-3" />

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
          {auditFailedGaps.length > 0 ? (
            <>
              <p className="text-gray-700">
                Top issues from your last audit
                <LockIcon />
              </p>
              <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                {auditFailedGaps.map((g, i) => (
                  <li key={i} className="line-clamp-2">{g}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500">Run your free AI visibility audit to see what&apos;s missing.</p>
          )}
          <Link
            href="/vendor-dashboard/analytics#audit"
            className="inline-flex items-center justify-center w-full px-3 py-2 mt-1 text-xs font-semibold rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Run free AI visibility audit
          </Link>
          <Link
            href="/pricing"
            className="text-xs font-medium text-purple-700 hover:underline mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            Upgrade to Pro for weekly diagnosis →
          </Link>
        </div>
      ) : !detectiveRun ? (
        <div className="flex-1 flex flex-col text-sm text-gray-500">
          {isHistorical ? (
            <>
              <p>Detective didn&apos;t run this week.</p>
              <p className="mt-1">No diagnosis to report.</p>
            </>
          ) : (
            <>
              <p>Diagnosis runs after each measurement.</p>
              <p className="mt-1">Once measurement completes, gaps will appear here.</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex-1 space-y-2 text-sm">
          {gapsCount !== null && (
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">{gapsCount}</span>{' '}
              {gapsCount === 1 ? 'gap' : 'gaps'} identified
            </p>
          )}
          {gapsList.length > 0 && (
            <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
              {gapsList.slice(0, 3).map((g, i) => (
                <li key={i} className="line-clamp-2">{g}</li>
              ))}
            </ul>
          )}
          {competitorsCount !== null && competitorsCount > 0 && (
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">{competitorsCount}</span>{' '}
              {competitorsCount === 1 ? 'competitor' : 'competitors'} ranking higher
            </p>
          )}
          {gapsCount === null && gapsList.length === 0 && competitorsCount === null && (
            <p className="text-gray-500">Run completed — detailed gaps not available.</p>
          )}
        </div>
      )}
    </div>
  );
}
