'use client';

import { useState } from 'react';

interface IndexingActionPanelProps {
  liveUrl: string;
  indexNowOk: boolean;
}

export default function IndexingActionPanel({ liveUrl, indexNowOk }: IndexingActionPanelProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const gscUrl = `https://search.google.com/search-console/inspect?resource_id=sc-domain%3Atendorai.com&id=${encodeURIComponent(liveUrl)}`;
  const bingUrl = `https://www.bing.com/webmasters/submiturl?siteUrl=https%3A%2F%2Ftendorai.com&url=${encodeURIComponent(liveUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context); silently no-op.
    }
  };

  return (
    <div className="border border-purple-200 bg-purple-50 rounded-lg p-6 mb-6">
      <h2 className="font-serif text-2xl text-slate-900 mb-2">Post approved and live</h2>
      <p className="text-slate-600 mb-4">
        Submit to Google to get indexed in 24–72 hours instead of 1–2 weeks. Bing has been pinged automatically.
      </p>

      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block max-w-full bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded font-mono text-sm break-all text-purple-700 mb-4 transition"
      >
        {liveUrl}
      </a>

      <div className="flex items-center gap-2 text-sm mb-4">
        {indexNowOk ? (
          <>
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-700">Bing auto-pinged ✓</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-amber-700">Bing auto-ping failed — use the manual button below</span>
          </>
        )}
      </div>

      <div className="flex gap-3 flex-wrap mb-3">
        <a
          href={gscUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 rounded-lg transition"
        >
          Submit to Google Search Console →
        </a>
        <a
          href={bingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-5 py-3 rounded-lg transition"
        >
          Submit to Bing (manual fallback) →
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-semibold px-5 py-3 rounded-lg transition"
        >
          {copied ? '✓ Copied' : 'Copy URL'}
        </button>
      </div>

      <p className="text-sm text-slate-600">
        After clicking Google, paste the URL into the search bar at the top of the page that opens, then click Request Indexing. Done in 20 seconds.
      </p>
    </div>
  );
}
