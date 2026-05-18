'use client';

import Link from 'next/link';
import SectionShell from './SectionShell';
import { type RecommendedAction, SEVERITY_BADGE } from './types';

export default function RecommendedActions({
  data,
}: {
  data?: RecommendedAction[];
}) {
  const actions = data ?? [];

  return (
    <SectionShell
      index={11}
      title="Recommended Actions"
      subtitle="Ranked by impact — the fixes that move your score fastest."
    >
      {actions.length > 0 ? (
        <ol className="space-y-3">
          {actions.map((action, i) => (
            <li
              key={`${action.title}-${i}`}
              data-testid="recommended-action"
              className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-white p-4"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center tabular-nums">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <p className="font-semibold text-[var(--text)]">
                    {action.title}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        SEVERITY_BADGE[action.severity] ?? SEVERITY_BADGE.low
                      }`}
                    >
                      {action.severity}
                    </span>
                    {typeof action.estimatedImpact === 'number' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700">
                        +{action.estimatedImpact} impact
                      </span>
                    )}
                  </div>
                </div>
                {action.description && (
                  <p className="mt-1 text-sm text-[var(--text2)] leading-relaxed">
                    {action.description}
                  </p>
                )}
                {action.approvalId && (
                  <Link
                    href={`/vendor-dashboard/approvals/${action.approvalId}`}
                    className="mt-2 inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-900"
                  >
                    Review &amp; approve →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm italic text-[var(--text3)]">
          No actions recommended this week — you are on track.
        </p>
      )}
    </SectionShell>
  );
}
