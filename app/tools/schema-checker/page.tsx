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

      if (!res.ok) {
        setError(data.error || 'Failed to check URL');
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Schema.org Checker</h1>
          <p className="text-lg text-purple-200 max-w-2xl">
            Check if a website has the structured data AI needs to recommend it. Enter any URL to see which Schema.org types are present and which are missing.
          </p>
        </div>
      </section>

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
          <div className="space-y-6">
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

            {/* CTA */}
            <div className="bg-purple-50 rounded-xl border border-purple-100 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Want schema automatically installed on your site?</h3>
              <p className="text-sm text-gray-600 mb-4">
                TendorAI Pro installs AI-optimised Schema.org markup on your website within 48 hours. Auto-syncs when you update your dashboard.
              </p>
              <Link href="/for-vendors#pricing" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                Upgrade to TendorAI Pro
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
