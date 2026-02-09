'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

interface GeoCheck {
  name: string;
  key: string;
  score: number;
  maxScore: number;
  passed: boolean;
  details: string;
  recommendation: string;
}

interface AuditResult {
  id: string;
  websiteUrl: string;
  overallScore: number;
  checks: GeoCheck[];
  recommendations: string[];
  createdAt: string;
}

interface GeoAuditCardProps {
  token: string;
  tier: string;
  vendorWebsite: string;
}

export default function GeoAuditCard({ token, tier, vendorWebsite }: GeoAuditCardProps) {
  const [url, setUrl] = useState(vendorWebsite || '');
  const [loading, setLoading] = useState(false);
  const [fetchingLatest, setFetchingLatest] = useState(true);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [canRunAgain, setCanRunAgain] = useState(true);
  const [nextAvailable, setNextAvailable] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);

  const isPaid = tier === 'visible' || tier === 'verified';

  // Fetch latest audit on mount
  const fetchLatest = useCallback(async () => {
    if (!token) return;
    setFetchingLatest(true);
    try {
      const res = await fetch(`${API_URL}/api/geo-audit/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
        setCanRunAgain(json.canRunAgain);
        setNextAvailable(json.nextAvailable || null);
        if (!url && json.data.websiteUrl) setUrl(json.data.websiteUrl);
      }
    } catch {
      // Silently ignore — first-time users won't have an audit
    } finally {
      setFetchingLatest(false);
    }
  }, [token, url]);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  useEffect(() => {
    if (vendorWebsite && !url) setUrl(vendorWebsite);
  }, [vendorWebsite, url]);

  const runAudit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setRateLimitMsg(null);

    try {
      const res = await fetch(`${API_URL}/api/geo-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ websiteUrl: url.trim() }),
      });

      const json = await res.json();

      if (res.status === 429) {
        setRateLimitMsg(json.message || 'Rate limit reached.');
        setCanRunAgain(false);
        if (json.nextAvailable) setNextAvailable(json.nextAvailable);
        return;
      }

      if (!res.ok) {
        setError(json.error || 'Something went wrong.');
        return;
      }

      if (json.success) {
        setResult(json.data);
        setCanRunAgain(false);
        // Re-fetch to get accurate canRunAgain flag
        setTimeout(() => fetchLatest(), 500);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColour = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-green-50 border-green-200';
    if (score >= 40) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreRingColour = (score: number) => {
    if (score >= 70) return 'stroke-green-500';
    if (score >= 40) return 'stroke-amber-500';
    return 'stroke-red-500';
  };

  const getCheckIcon = (passed: boolean) => {
    if (passed) {
      return (
        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  if (fetchingLatest) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Loading GEO Audit...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">GEO Audit</h3>
          <p className="text-sm text-gray-600 mt-1">
            Check how AI-ready your website is. AI assistants crawl your site for structured data, content, and trust signals.
          </p>
        </div>
      </div>

      {/* URL input + run button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          disabled={loading}
        />
        <button
          onClick={runAudit}
          disabled={loading || !url.trim() || (!canRunAgain && !error)}
          className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
        >
          {loading ? 'Analysing...' : 'Run GEO Audit'}
        </button>
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="flex flex-col items-center py-8 gap-4">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-gray-600">Analysing your website for AI readiness...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Rate limit message */}
      {rateLimitMsg && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
          <p className="text-sm text-amber-700">{rateLimitMsg}</p>
          {!isPaid && (
            <Link
              href="/vendor-dashboard/settings?tab=subscription"
              className="inline-flex items-center mt-2 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Upgrade for weekly audits
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
          {isPaid && nextAvailable && (
            <p className="text-xs text-amber-600 mt-1">
              Next audit available: {new Date(nextAvailable).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Score summary */}
          <div className={`flex items-center gap-6 p-5 rounded-xl border ${getScoreBg(result.overallScore)}`}>
            {/* Circular score */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  className={getScoreRingColour(result.overallScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(result.overallScore / 100) * 264} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getScoreColour(result.overallScore)}`}>
                  {result.overallScore}
                </span>
              </div>
            </div>

            <div>
              <p className={`text-xl font-bold ${getScoreColour(result.overallScore)}`}>
                {result.overallScore >= 70 ? 'Good' : result.overallScore >= 40 ? 'Needs Work' : 'Poor'} AI Readiness
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {result.overallScore >= 70
                  ? 'Your website is well-optimised for AI discovery.'
                  : result.overallScore >= 40
                    ? 'Some improvements could boost how AI assistants see your site.'
                    : 'Significant improvements needed for AI visibility.'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Audited {new Date(result.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} &middot; {result.websiteUrl}
              </p>
            </div>
          </div>

          {/* Check list */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Audit Checklist</h4>
            <div className="space-y-2">
              {result.checks.map((check) => (
                <div
                  key={check.key}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCheck(expandedCheck === check.key ? null : check.key)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    {getCheckIcon(check.passed)}
                    <span className="flex-1 text-sm font-medium text-gray-900">{check.name}</span>
                    <span className={`text-sm font-semibold ${check.score >= 7 ? 'text-green-600' : check.score >= 4 ? 'text-amber-500' : 'text-red-500'}`}>
                      {check.score}/{check.maxScore}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedCheck === check.key ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCheck === check.key && (
                    <div className="px-3 pb-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mt-2">{check.details}</p>
                      {check.recommendation && (
                        <p className="text-sm text-purple-700 mt-2 bg-purple-50 rounded p-2">
                          {check.recommendation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top recommendations */}
          {result.recommendations.length > 0 && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Top Recommendations</h4>
              <ul className="space-y-1.5">
                {result.recommendations.slice(0, 5).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-purple-800">
                    <span className="text-purple-400 mt-0.5">&#8226;</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* No result yet — show explanation */}
      {!result && !loading && !error && (
        <div className="text-center py-6 text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="font-medium text-gray-700">No GEO audit yet</p>
          <p className="text-sm mt-1">Enter your website URL above and run your first audit.</p>
        </div>
      )}
    </div>
  );
}
