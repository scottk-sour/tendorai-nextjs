'use client';

import type { ReactNode } from 'react';

interface Props {
  index: number;
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  children: ReactNode;
}

// Shared chrome for each of the 12 report sections — numbered eyebrow,
// serif heading, optional right-aligned slot, inside the dashboard `card`.
export default function SectionShell({
  index,
  title,
  subtitle,
  headerRight,
  children,
}: Props) {
  return (
    <section
      aria-label={title}
      id={`report-section-${index}`}
      data-report-section={index}
      className="card p-6 sm:p-8 scroll-mt-28"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 mb-1">
            Section {index}
          </p>
          <h2
            className="text-xl font-bold text-[var(--text)] leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-[var(--text3)] mt-1">{subtitle}</p>
          )}
        </div>
        {headerRight && <div className="shrink-0">{headerRight}</div>}
      </div>
      {children}
    </section>
  );
}
