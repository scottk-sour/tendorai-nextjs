'use client';

import type { LoopCardProps } from './types';

function RocketIcon() {
  return (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-6.233 0c-1.296 1.296-1.296 3.441.011 5.751 1.308-1.308 3.453-1.308 5.751.011a4.493 4.493 0 000-6.233" />
    </svg>
  );
}

interface DeployedItem {
  title?: unknown;
  type?: unknown;
  url?: unknown;
}

/**
 * Reads from artifacts.itemsCompleted across writer / builder / listings runs.
 * Each item may have { title, type, url? } — url is rendered as an external
 * link with rel="noopener noreferrer" when present.
 */
export default function DeployCard({
  agentRuns,
  agentRunsError,
  onRetry,
  mode = 'live',
}: LoopCardProps) {
  const isHistorical = mode === 'historical';
  const deployAgentRuns = agentRuns.filter((r) =>
    r.agentName === 'writer' || r.agentName === 'builder' || r.agentName === 'listings',
  );

  const allItems: { title: string; url?: string }[] = [];
  for (const run of deployAgentRuns) {
    const items = (run.artifacts as { itemsCompleted?: DeployedItem[] } | undefined)?.itemsCompleted;
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      if (typeof item?.title !== 'string' || !item.title.trim()) continue;
      const url = typeof item.url === 'string' && item.url.trim() ? item.url : undefined;
      allItems.push({ title: item.title, url });
    }
  }

  return (
    <div className="card p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-2">
        <RocketIcon />
      </div>
      <h3 className="font-serif font-bold uppercase tracking-wide text-sm text-gray-900">Deploy</h3>
      <p className="text-sm text-gray-600 mb-4">What we put live</p>
      <div className="border-t border-gray-100 mb-3" />

      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">This week</p>

      {agentRunsError ? (
        <div className="flex-1 flex flex-col gap-2 text-sm">
          <p className="text-red-600">Couldn&apos;t load this week&apos;s data.</p>
          {onRetry && !isHistorical && (
            <button
              type="button"
              onClick={onRetry}
              className="self-start text-xs font-medium text-purple-700 hover:underline"
            >
              Retry
            </button>
          )}
        </div>
      ) : allItems.length === 0 ? (
        <div className="flex-1 flex flex-col text-sm text-gray-500">
          {isHistorical ? (
            <p>Nothing was deployed this week.</p>
          ) : (
            <>
              <p>Deployments happen after approvals.</p>
              <p className="mt-1">Approved items will appear here once live.</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex-1 space-y-2 text-sm">
          <p className="text-gray-700">
            <span className="text-green-600 font-semibold">✓</span>{' '}
            <span className="font-semibold text-gray-900">{allItems.length}</span>{' '}
            {allItems.length === 1 ? 'item' : 'items'} deployed
          </p>
          <ul className="space-y-1">
            {allItems.slice(0, 3).map((item, i) => (
              <li key={i} className="text-sm">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:underline line-clamp-2"
                  >
                    {item.title} ↗
                  </a>
                ) : (
                  <span className="text-gray-700 line-clamp-2">{item.title}</span>
                )}
              </li>
            ))}
            {allItems.length > 3 && (
              <li className="text-xs text-gray-500">+{allItems.length - 3} more</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
