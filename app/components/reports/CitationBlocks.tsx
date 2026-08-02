'use client';

/**
 * CitationBlocks — three copyable citation blocks (APA, Chicago, Plain
 * text) with a per-block copy-to-clipboard button. Content is fixed to
 * the study "The UK AI Visibility Report for Solicitors — July 2026".
 *
 * Bridged into the article body from renderWithCharts.tsx when it
 * encounters the `<!--CITATIONS-->` marker.
 */

import { useState } from 'react';

interface Citation {
  label: string;
  text: string;
}

const CITATIONS: Citation[] = [
  {
    label: 'APA',
    text: 'TendorAI. (2026). The UK AI Visibility Report for Solicitors — July 2026. https://www.tendorai.com/resources/ai-visibility-report-solicitors-july-2026',
  },
  {
    label: 'Chicago',
    text: 'TendorAI. "The UK AI Visibility Report for Solicitors — July 2026." 22 July 2026. https://www.tendorai.com/resources/ai-visibility-report-solicitors-july-2026',
  },
  {
    label: 'Plain text',
    text: 'The UK AI Visibility Report for Solicitors — July 2026, published by TendorAI, 22 July 2026. Available at tendorai.com/resources/ai-visibility-report-solicitors-july-2026',
  },
];

function CopyableCitation({ citation }: { citation: Citation }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — fallback to a hidden textarea + execCommand.
      const ta = document.createElement('textarea');
      ta.value = citation.text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // silent — nothing more we can do
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  return (
    <div className="my-4 rounded-lg border border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {citation.label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
          aria-label={`Copy ${citation.label} citation`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h4a2 2 0 002-2M8 5a2 2 0 012-2h4a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm text-gray-800 leading-relaxed break-words">
          {citation.text}
        </p>
      </div>
    </div>
  );
}

export default function CitationBlocks() {
  return (
    <div className="my-6 not-prose">
      {CITATIONS.map((c) => (
        <CopyableCitation key={c.label} citation={c} />
      ))}
    </div>
  );
}
