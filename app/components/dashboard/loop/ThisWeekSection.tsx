'use client';

import Link from 'next/link';
import type { AgentRun, Approval } from '@/lib/loop/types';
import { ITEM_TYPE_LABELS } from '@/lib/loop/types';
import { relativeDayLabel, timeOfDayLabel } from '@/lib/loop/weekStarting';

interface ThisWeekSectionProps {
  agentRuns: AgentRun[];
  pendingApprovals: Approval[];
}

const AGENT_DISPLAY: Record<string, string> = {
  reconnaissance: 'Reconnaissance Agent',
  detective: 'Detective Agent',
  writer: 'Writer Agent',
  builder: 'Builder Agent',
  listings: 'Listings Agent',
  reviews: 'Reviews Agent',
  reporter: 'Reporter Agent',
  manual: 'Admin team',
};

function humaniseAgent(name: string): string {
  return AGENT_DISPLAY[name] || name;
}

export default function ThisWeekSection({ agentRuns, pendingApprovals }: ThisWeekSectionProps) {
  // Subsection 1: items needing input
  const showApprovals = pendingApprovals.length > 0;

  // Subsection 2: TendorAI's ask of you — strictly conditional on a real artifact flag.
  const reviewsRun = agentRuns.find((r) => r.agentName === 'reviews');
  const reviewsArtifacts = (reviewsRun?.artifacts ?? {}) as { needsClientEmails?: boolean };
  const showAsk = Boolean(reviewsArtifacts.needsClientEmails);

  // Subsection 3: latest completed agent run
  const completedRuns = agentRuns
    .filter((r) => r.status === 'completed' && r.completedAt)
    .sort((a, b) => new Date(b.completedAt as string).getTime() - new Date(a.completedAt as string).getTime());
  const latestCompleted = completedRuns[0];
  const showLatest = Boolean(latestCompleted);

  const allHidden = !showApprovals && !showAsk && !showLatest;

  return (
    <section className="card p-5">
      <h2 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-4">This week on your account</h2>

      {allHidden && (
        <p className="text-sm text-gray-500">Everything&apos;s running smoothly. Next update Monday.</p>
      )}

      {showApprovals && (
        <div className={`${showAsk || showLatest ? 'mb-5' : ''}`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Items needing your input</h3>
          <ul className="divide-y divide-gray-100">
            {pendingApprovals.map((approval) => (
              <li key={approval._id} className="py-3 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{approval.title || '(untitled)'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {ITEM_TYPE_LABELS[approval.itemType] || approval.itemType} · drafted by {humaniseAgent(approval.agentName)}
                  </p>
                </div>
                <Link
                  href={`/vendor-dashboard/approvals/${approval._id}`}
                  className="text-sm font-medium text-purple-700 hover:underline shrink-0"
                >
                  View →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showAsk && (
        <div className={`${showLatest ? 'mb-5' : ''}`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">TendorAI&apos;s ask of you</h3>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-amber-900">
              Send us 3 client email addresses for this week&apos;s review requests.
            </p>
            <Link
              href="/vendor-dashboard/settings"
              className="shrink-0 text-sm font-medium text-purple-700 hover:underline"
            >
              Send client list →
            </Link>
          </div>
        </div>
      )}

      {showLatest && latestCompleted && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Latest completed action</h3>
          <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-900">{humaniseAgent(latestCompleted.agentName)}</span>{' '}
            completed at{' '}
            <span className="text-gray-700">
              {timeOfDayLabel(latestCompleted.completedAt as string)}{' '}
              {relativeDayLabel(latestCompleted.completedAt as string)}
            </span>
            {latestCompleted.summary && (
              <>
                {' '}— <span className="text-gray-600">{latestCompleted.summary}</span>
              </>
            )}
          </p>
        </div>
      )}
    </section>
  );
}
