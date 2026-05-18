'use client';

import SectionShell from './SectionShell';
import type { WhatsNextEntry } from './types';

export default function WhatsNext({ data }: { data?: WhatsNextEntry[] }) {
  const items = data ?? [];

  return (
    <SectionShell
      index={12}
      title="What's Next"
      subtitle="The week ahead — what your agents will do, and why it matters."
    >
      {items.length > 0 ? (
        <ol className="relative border-l-2 border-purple-200 ml-3 space-y-6">
          {items.map((item, i) => (
            <li key={`${item.dayLabel}-${i}`} className="ml-6">
              <span
                aria-hidden
                className="absolute -left-[9px] w-4 h-4 rounded-full bg-purple-600 border-2 border-white"
              />
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                {item.dayLabel}
              </p>
              <p className="mt-0.5 font-semibold text-[var(--text)]">
                {item.eventLabel}
              </p>
              {item.vendorImpact && (
                <p className="mt-1 text-sm text-[var(--text2)] leading-relaxed">
                  {item.vendorImpact}
                </p>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm italic text-[var(--text3)]">
          Nothing scheduled for the week ahead yet.
        </p>
      )}
    </SectionShell>
  );
}
