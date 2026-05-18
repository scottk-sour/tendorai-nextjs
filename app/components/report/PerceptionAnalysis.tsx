'use client';

import SectionShell from './SectionShell';
import { type PerceptionAnalysis as PerceptionAnalysisData, SEVERITY_BADGE } from './types';

function AssociationColumn({
  title,
  items,
  dot,
}: {
  title: string;
  items?: string[];
  dot: string;
}) {
  const list = items ?? [];
  return (
    <div className="rounded-lg border border-[var(--border)] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
        {title}
      </p>
      {list.length > 0 ? (
        <ul className="space-y-2">
          {list.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-[var(--text)]"
            >
              <span
                aria-hidden
                className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dot}`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm italic text-[var(--text3)]">None detected.</p>
      )}
    </div>
  );
}

export default function PerceptionAnalysis({
  data,
}: {
  data?: PerceptionAnalysisData;
}) {
  const claims = data?.inaccurateClaimsDetected ?? [];

  return (
    <SectionShell
      index={8}
      title="Perception Analysis"
      subtitle="What AI engines associate with your firm — and what they get wrong."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <AssociationColumn
          title="Positive associations"
          items={data?.positiveAssociations}
          dot="bg-green-500"
        />
        <AssociationColumn
          title="Missing associations"
          items={data?.missingAssociations}
          dot="bg-gray-400"
        />
        <AssociationColumn
          title="Competitor associations"
          items={data?.competitorAssociations}
          dot="bg-amber-500"
        />

        {/* Inaccurate claims */}
        <div
          data-testid="inaccurate-claims"
          className={`rounded-lg border p-4 ${
            claims.length > 0
              ? 'border-red-200 bg-red-50'
              : 'border-[var(--border)] bg-white'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-3">
            Inaccurate claims detected
          </p>
          {claims.length > 0 ? (
            <ul className="space-y-3">
              {claims.map((c, i) => (
                <li
                  key={`${c.claim}-${i}`}
                  data-testid="inaccurate-claim-badge"
                  className="rounded-md border border-red-200 bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-red-700">
                      {c.claim}
                    </p>
                    <span
                      className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        SEVERITY_BADGE[c.severity] ?? SEVERITY_BADGE.low
                      }`}
                    >
                      {c.severity}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text3)]">
                    Seen on {c.sourceEngine}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text2)]">
                    <span className="font-semibold text-[var(--text)]">
                      Truth:
                    </span>{' '}
                    {c.truth}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-[var(--text3)]">
              No inaccurate claims detected this week.
            </p>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
