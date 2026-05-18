'use client';

import SectionShell from './SectionShell';
import type { PromptAnalysisEntry } from './types';

function Badges({ items, tone }: { items?: string[]; tone: 'engine' | 'firm' }) {
  if (!items || items.length === 0) {
    return <span className="text-[var(--text3)]">—</span>;
  }
  return (
    <span className="flex flex-wrap gap-1">
      {items.map((item) => (
        <span
          key={item}
          className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium ${
            tone === 'engine'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {item}
        </span>
      ))}
    </span>
  );
}

export default function CitationIntelligence({
  data,
}: {
  data?: PromptAnalysisEntry[];
}) {
  const rows = data ?? [];

  return (
    <SectionShell
      index={6}
      title="Citation Intelligence"
      subtitle="Every tracked prompt — which engines answered it, and who they named."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[var(--text3)]">
              <th className="py-2 pr-3 font-semibold">Prompt</th>
              <th className="py-2 px-3 font-semibold">Engines cited</th>
              <th className="py-2 px-3 font-semibold">Firms named</th>
              <th className="py-2 pl-3 font-semibold text-center">You</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row.prompt}-${i}`}
                className="border-b border-[var(--border)] align-top"
              >
                <td className="py-3 pr-3 max-w-xs">
                  <p className="font-medium text-[var(--text)]">{row.prompt}</p>
                  {row.reasoning && (
                    <p className="mt-1 text-xs text-[var(--text3)] leading-relaxed">
                      {row.reasoning}
                    </p>
                  )}
                  {row.citedSources && row.citedSources.length > 0 && (
                    <p className="mt-1 text-[11px] text-[var(--text3)]">
                      Sources: {row.citedSources.join(', ')}
                    </p>
                  )}
                </td>
                <td className="py-3 px-3">
                  <Badges items={row.enginesCited} tone="engine" />
                </td>
                <td className="py-3 px-3">
                  <Badges items={row.citedFirms} tone="firm" />
                </td>
                <td className="py-3 pl-3 text-center">
                  {row.youCited ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">
                      Cited
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700">
                      Missed
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center italic text-[var(--text3)]">
                  No prompts were analysed this week.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
