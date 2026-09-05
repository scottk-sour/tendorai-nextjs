'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BotResult {
  name: string;
  userAgent: string;
  purpose: string;
  status: 'allowed' | 'blocked' | 'error';
  reason?: 'robots.txt' | 'edge' | 'network';
  httpStatus?: number;
  detail: string;
}

interface CheckResponse {
  url: string;
  origin: string;
  path: string;
  robots: { fetched: boolean; status: number; error?: string };
  results: BotResult[];
  summary: { total: number; allowed: number; blocked: number; errors: number };
}

const faqs = [
  {
    q: 'Why does AI crawler access matter?',
    a: 'ChatGPT, Claude, Perplexity and Gemini can only recommend websites they have been allowed to fetch. If your robots.txt or Cloudflare firewall blocks their crawlers, your firm cannot be cited in AI answers &mdash; no matter how strong your content is.',
  },
  {
    q: 'What is the difference between a robots.txt block and an edge block?',
    a: 'A robots.txt block is a polite instruction in the /robots.txt file asking crawlers not to visit. An edge block is enforced at the server or CDN layer (e.g. Cloudflare, WAF rules) and returns HTTP 401, 403 or 429 to the crawler. Both stop AI platforms from reading your site.',
  },
  {
    q: 'What is the difference between GPTBot, OAI-SearchBot and ChatGPT-User?',
    a: 'GPTBot crawls pages to train future OpenAI models. OAI-SearchBot indexes pages for ChatGPT Search results. ChatGPT-User is the agent that fetches a page live when a user or GPT clicks a link. You generally want all three allowed.',
  },
  {
    q: 'Should I allow Google-Extended?',
    a: 'If you want to appear in Gemini and Google AI Overviews, yes. Google-Extended is an opt-out control that only affects AI training and generative answers &mdash; it does not change your normal Google Search ranking.',
  },
  {
    q: 'What if my site has no robots.txt at all?',
    a: 'That is fine. In the absence of a robots.txt file, all crawlers are allowed by default. This tool will report each bot as allowed unless an edge-level block returns a 401, 403 or 429.',
  },
];

function StatusBadge({ status }: { status: BotResult['status'] }) {
  if (status === 'allowed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        Allowed
      </span>
    );
  }
  if (status === 'blocked') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Blocked
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
      </svg>
      Error
    </span>
  );
}

export default function RobotsCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch('/api/tools/robots-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to check URL');
      } else {
        setResult(data as CheckResponse);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const blockedCount = result?.summary.blocked ?? 0;

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            AI Crawler Access Checker
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl">
            See whether ChatGPT, Claude, Perplexity, Gemini and other AI crawlers can actually
            reach your website. If AI platforms can&apos;t crawl you, they can&apos;t cite you.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a website URL (e.g. www.example.co.uk)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {loading ? 'Checking...' : 'Check AI Crawler Access'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mb-8">
          Checks twelve AI crawlers against your robots.txt and runs live fetches to detect
          edge-level blocks. Takes up to 15 seconds.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-6 mb-12">
            {/* Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Checked URL
                  </p>
                  <p className="text-sm font-medium text-gray-900 break-all">{result.url}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {result.summary.allowed} allowed
                  </span>
                  <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    {result.summary.blocked} blocked
                  </span>
                  {result.summary.errors > 0 && (
                    <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                      {result.summary.errors} errors
                    </span>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">
                {result.robots.fetched ? (
                  <>robots.txt fetched (HTTP {result.robots.status})</>
                ) : result.robots.status === 404 ? (
                  <>No robots.txt found at {result.origin}/robots.txt (HTTP 404 &mdash; all bots allowed by default)</>
                ) : result.robots.error ? (
                  <>{result.robots.error}</>
                ) : (
                  <>robots.txt not fetched</>
                )}
              </div>
            </div>

            {/* Per-bot results */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">AI Crawler Results</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {result.results.map((bot) => (
                  <div key={bot.name} className="px-6 py-4">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{bot.name}</span>
                          <code className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            {bot.userAgent}
                          </code>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{bot.purpose}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <StatusBadge status={bot.status} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{bot.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA when blocked > 0 */}
            {blockedCount > 0 && (
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-3">
                  {blockedCount} AI crawler{blockedCount === 1 ? '' : 's'} can&apos;t reach your site
                </h3>
                <p className="text-purple-100 mb-6 max-w-lg mx-auto">
                  Your free TendorAI AI visibility report shows exactly which blocks to remove, what schema
                  to add, and how your firm ranks in AI answers right now.
                </p>
                <Link
                  href="/vendor-signup"
                  className="inline-flex items-center px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Get the full AI visibility report
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            )}

            {blockedCount === 0 && result.summary.errors === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-lg font-semibold text-green-800 mb-1">
                  Every AI crawler can reach this URL.
                </p>
                <p className="text-sm text-green-700">
                  No robots.txt or edge-level blocks detected across the twelve bots checked.
                </p>
              </div>
            )}
          </div>
        )}

        {/* FAQ */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
                  <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div
                  className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 text-sm"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </details>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3">Get cited by AI &mdash; automatically</h3>
          <p className="text-purple-100 mb-6 max-w-lg mx-auto">
            The TendorAI programme installs the correct Schema.org markup, clears AI crawler access, and
            tracks your AI visibility weekly &mdash; no developer required.
          </p>
          <Link
            href="/ai-visibility-platform"
            className="inline-flex items-center px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
          >
            See how the TendorAI programme works
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">Powered by TendorAI</p>
      </section>
    </main>
  );
}
