'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CheckResult {
  found: string[];
  missing: string[];
  allTypes: string[];
  raw: unknown[];
  totalBlocks: number;
}

const faqs = [
  {
    q: 'What is Schema.org structured data?',
    a: 'Schema.org is a shared vocabulary of structured data types used by Google, Bing, and AI assistants to understand web pages. When a firm adds schema markup to their website, it tells AI systems exactly what the business is, what services it offers, and where it operates \u2014 in a format machines can read reliably.',
  },
  {
    q: 'Why does schema matter for AI visibility?',
    a: 'AI assistants like ChatGPT, Perplexity, and Google\u2019s AI Overviews build their answers from sources they can understand and trust. Firms without schema markup are harder for AI to classify, which means they are less likely to appear when a potential client asks \u201cfind me a solicitor in Cardiff\u201d or \u201cbest accountant for a small business in Manchester.\u201d',
  },
  {
    q: 'Which schema types do UK professional services firms need?',
    a: 'The most important types are: LegalService (for solicitors), AccountingService (for accountants), FinancialService (for mortgage advisers), and LocalBusiness (for all firms). Supporting types include FAQPage, BreadcrumbList, and Organization. The TendorAI programme installs and maintains all of these automatically.',
  },
  {
    q: 'What does it mean if my site has no schema?',
    a: 'It means AI tools and search engines are guessing what your firm does based on your page text alone. This makes it significantly harder to appear in AI-generated recommendations, local search results, and Google AI Overviews.',
  },
  {
    q: 'How do I fix missing schema on my website?',
    a: 'You can add schema manually by inserting JSON-LD code into your website\u2019s header \u2014 or use the TendorAI programme, which installs and auto-syncs the correct schema for your firm type automatically. No developer needed.',
  },
];

export default function SchemaCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch('/api/tools/schema-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      console.log('Schema checker response:', data);

      if (!res.ok) {
        setError(data.error || 'Failed to check URL');
      } else {
        setResult({
          found: data.found || [],
          missing: data.missing || [],
          allTypes: data.allTypes || [],
          raw: data.raw || [],
          totalBlocks: data.totalBlocks ?? (data.raw?.length || 0),
        });
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Schema.org Checker for UK Professional Services Firms</h1>
          <p className="text-lg text-purple-100 max-w-2xl">
            Schema.org structured data tells AI assistants and search engines what a business does, where it is, and whether it can be trusted. Without it, AI tools cannot reliably recommend a firm when potential clients ask for a solicitor, accountant, or mortgage adviser.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleCheck} className="flex gap-3 mb-8">
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
            {loading ? 'Checking...' : 'Check Schema'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-6 mb-12">
            {result.totalBlocks === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                <p className="text-lg font-semibold text-amber-800 mb-2">No structured data found on this page.</p>
                <p className="text-sm text-amber-700">This website has no JSON-LD schema markup. AI tools cannot read structured information from it.</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Schema Types ({result.found.length} found, {result.missing.length} missing)
                  </h2>
                  <div className="space-y-2">
                    {result.found.map((type) => (
                      <div key={type} className="flex items-center gap-3 py-2 px-3 bg-green-50 rounded-lg">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium text-green-800">{type}</span>
                      </div>
                    ))}
                    {result.missing.map((type) => (
                      <div key={type} className="flex items-center gap-3 py-2 px-3 bg-red-50 rounded-lg">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-sm font-medium text-red-700">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {result.allTypes.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">All Detected Schema Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.allTypes.map((type) => (
                        <span key={type} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">{result.totalBlocks} JSON-LD block{result.totalBlocks !== 1 ? 's' : ''} found</p>
                  </div>
                )}
              </>
            )}

            <div className="bg-purple-50 rounded-xl border border-purple-100 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Want schema automatically installed on your site?</h3>
              <p className="text-sm text-gray-600 mb-4">
                The TendorAI programme installs AI-optimised Schema.org markup on your website within 48 hours. Auto-syncs when you update your dashboard.
              </p>
              <Link href="/pricing" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                Book a call about the TendorAI programme
              </Link>
            </div>
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
                  <svg className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3">Get schema installed automatically</h3>
          <p className="text-purple-100 mb-6 max-w-lg mx-auto">
            The TendorAI programme installs the correct Schema.org markup for your firm type and keeps it in sync with your profile &mdash; no developer required.
          </p>
          <Link href="/ai-visibility-platform" className="inline-flex items-center px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
            See how the TendorAI programme works
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
