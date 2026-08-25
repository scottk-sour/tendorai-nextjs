/**
 * Deviation / Row — the shared building blocks of a study deviations log.
 *
 * Extracted from app/research/solicitors-july-2026/deviations so each study's
 * log renders identically. Markup is unchanged from the July original.
 *
 * `Deviation` is one dated entry; `Row` is a bold-labelled paragraph within it
 * ("What happened.", "What we did.", "Effect on published figures.").
 */

import type { ReactNode } from 'react';

export function Deviation({
  date,
  title,
  children,
}: {
  date: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        <span className="text-gray-500">{date} — </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p className="mb-3 leading-relaxed">
      <strong>{label}</strong> {children}
    </p>
  );
}
