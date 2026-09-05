'use client';

import { useState } from 'react';

interface Result {
  found: string[];
  missing: string[];
  raw: object[];
  allTypes: string[];
  error?: string;
}

export default function SchemaCheckerClient() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/tools/schema-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to check schema');
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
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL, e.g. example.co.uk"
          required
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check Schema'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Found types */}
          {result.found.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Found Schema Types</h3>
              <div className="space-y-2">
                {result.found.map((t) => (
                  <div key={t} className="flex items-center gap-2 text-green-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing types */}
          {result.missing.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Missing Schema Types</h3>
              <div className="space-y-2">
                {result.missing.map((t) => (
                  <div key={t} className="flex items-center gap-2 text-red-600">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All detected types */}
          {result.allTypes.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">All Detected Schema Types</h3>
              <div className="flex flex-wrap gap-2">
                {result.allTypes.map((t) => (
                  <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* No JSON-LD */}
          {result.found.length === 0 && result.allTypes.length === 0 && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg">
              No structured data found on this page.
            </div>
          )}

          {/* Inline CTA */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mt-6">
            <p className="text-gray-700 mb-4">
              <strong>The TendorAI programme</strong> installs the correct schema for your firm type via a single script tag. It auto-syncs whenever your profile is updated &mdash; no developer needed, no manual updates.
            </p>
            <a
              href="/ai-visibility-platform"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              See how the TendorAI programme works
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
