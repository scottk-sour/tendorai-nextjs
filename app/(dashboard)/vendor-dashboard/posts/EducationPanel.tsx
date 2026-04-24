'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'tendorai-education-panel-collapsed';

interface EducationPanelProps {
  vendorTypeLabel: string;
  city: string;
}

export default function EducationPanel({ vendorTypeLabel, city }: EducationPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'true') setCollapsed(true);
    } catch {
      // localStorage unavailable (private mode, SSR) — default to expanded
    }
    setHydrated(true);
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'true' : 'false');
    } catch {
      // ignore storage failures
    }
  };

  const vendorLabel = vendorTypeLabel || 'firm';
  const cityLabel = city || 'your city';

  return (
    <div className="rounded-lg border border-purple-100 bg-purple-50/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-purple-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h2 className="text-base font-semibold text-gray-900">
            Why consistent posting earns AI citations
          </h2>
        </div>
        {hydrated && (
          <button
            onClick={toggle}
            className="flex-shrink-0 text-xs font-medium text-purple-700 hover:text-purple-900 transition-colors whitespace-nowrap"
          >
            {collapsed ? 'Show me more' : "Show me less - I've read this"}
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="mt-4 space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            When someone asks ChatGPT, Perplexity, or Google&apos;s AI &ldquo;who&apos;s the
            best {vendorLabel} in {cityLabel}?&rdquo;, AI assistants pull answers from
            websites they trust. They cite specific data, named firms, clear service
            descriptions, and firms that regularly publish useful content. Occasional
            generic posts don&apos;t move the needle. Consistent, specific,
            well-structured content does.
          </p>
          <p>
            The six pillars below are proven drivers of AI citation. Each one answers
            questions real clients ask AI. A firm that covers all six pillars - even
            briefly - signals to AI that it&apos;s a comprehensive source worth
            recommending. A firm that only writes about its services signals it&apos;s
            marketing, not helping. AI knows the difference.
          </p>
          <p>
            Your content plan rotates through all six pillars to build complete
            coverage. You don&apos;t have to follow it exactly - any pillar topic, any
            time, counts. Consistency matters more than perfection. One specific post
            per week will outperform five generic posts.
          </p>
        </div>
      )}
    </div>
  );
}
