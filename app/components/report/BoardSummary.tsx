'use client';

import SectionShell from './SectionShell';

export default function BoardSummary({ text }: { text?: string }) {
  return (
    <SectionShell
      index={2}
      title="Board Summary"
      subtitle="The week in one paragraph — written for a partner, not an analyst."
    >
      <div className="rounded-xl border-l-4 border-purple-500 bg-purple-50/60 p-5">
        {text && text.trim().length > 0 ? (
          <p className="text-base leading-relaxed text-[var(--text)]">{text}</p>
        ) : (
          <p className="text-sm italic text-[var(--text3)]">
            No board summary was generated for this week.
          </p>
        )}
      </div>
    </SectionShell>
  );
}
