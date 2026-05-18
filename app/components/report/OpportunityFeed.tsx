'use client';

import Link from 'next/link';
import SectionShell from './SectionShell';
import type { OpportunityFeedEntry } from './types';

export default function OpportunityFeed({
  data,
}: {
  data?: OpportunityFeedEntry[];
}) {
  const items = data ?? [];

  return (
    <SectionShell
      index={10}
      title="Opportunity Feed"
      subtitle="Queries where competitors are cited and you are not — ready to act on."
    >
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <article
              key={`${item.detectedQuery}-${i}`}
              data-testid="opportunity-card"
              className="rounded-xl border border-[var(--border)] bg-white p-5 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-[var(--text)] leading-snug">
                  &ldquo;{item.detectedQuery}&rdquo;
                </p>
                {typeof item.estimatedImpact === 'number' && (
                  <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700">
                    +{item.estimatedImpact} impact
                  </span>
                )}
              </div>

              {item.competitorsCited && item.competitorsCited.length > 0 && (
                <p className="mt-2 text-xs text-[var(--text3)]">
                  Competitors cited:{' '}
                  <span className="text-[var(--text2)]">
                    {item.competitorsCited.join(', ')}
                  </span>
                </p>
              )}

              {item.suggestedAction && (
                <p className="mt-2 text-sm text-[var(--text2)] leading-relaxed flex-1">
                  {item.suggestedAction}
                </p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/vendor-dashboard/posts?topic=${encodeURIComponent(
                    item.detectedQuery,
                  )}`}
                  className="inline-flex items-center justify-center px-3.5 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Generate Draft
                </Link>
                {item.relatedApprovalId && (
                  <Link
                    href={`/vendor-dashboard/approvals/${item.relatedApprovalId}`}
                    className="text-sm font-semibold text-purple-700 hover:text-purple-900"
                  >
                    View related draft →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-[var(--text3)]">
          No new opportunities detected this week.
        </p>
      )}
    </SectionShell>
  );
}
