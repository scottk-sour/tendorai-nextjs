'use client';

import type { AgentRun, Approval, LoopStatus } from '@/lib/loop/types';
import { formatWeekLabel } from '@/lib/loop/weekStarting';

interface WelcomeStripProps {
  firstName: string;
  weekStarting: Date;
  agentRuns: AgentRun[];
  pendingApprovals: Approval[];
}

interface PillSpec {
  status: LoopStatus;
  label: string;
}

/**
 * Status precedence (per build brief): RED > AMBER > GRAY > GREEN.
 * - RED: any agent run this week has status 'failed' or 'partial'
 * - AMBER: pendingApprovals.length > 0
 * - GRAY: no agent runs exist yet (first week)
 * - GREEN: at least one run, no failures, no pending approvals
 */
function deriveStatus(agentRuns: AgentRun[], pendingApprovals: Approval[]): PillSpec {
  const hasFailure = agentRuns.some((r) => r.status === 'failed' || r.status === 'partial');
  if (hasFailure) {
    return { status: 'red', label: 'Issue detected' };
  }

  if (pendingApprovals.length > 0) {
    const n = pendingApprovals.length;
    return {
      status: 'amber',
      label: `${n} ${n === 1 ? 'item' : 'items'} awaiting your approval`,
    };
  }

  if (agentRuns.length === 0) {
    return { status: 'gray', label: 'First week' };
  }

  return { status: 'green', label: 'All systems running' };
}

const PILL_CLASSES: Record<LoopStatus, string> = {
  green: 'bg-green-100 text-green-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-700',
};

const PILL_DOT: Record<LoopStatus, string> = {
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  gray: 'bg-gray-400',
};

export default function WelcomeStrip({ firstName, weekStarting, agentRuns, pendingApprovals }: WelcomeStripProps) {
  const pill = deriveStatus(agentRuns, pendingApprovals);
  const greetingName = firstName.trim() || 'there';

  return (
    <div
      className="rounded-2xl border border-purple-100 px-6 py-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.06) 0%, rgba(118,75,162,0.06) 100%)' }}
    >
      <div className="min-w-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Hi {greetingName}
        </h2>
        <p className="text-sm text-gray-600 mt-0.5">{formatWeekLabel(weekStarting)}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${PILL_CLASSES[pill.status]}`}
        >
          <span className={`w-2 h-2 rounded-full ${PILL_DOT[pill.status]}`} aria-hidden />
          {pill.label}
        </span>
      </div>
    </div>
  );
}
