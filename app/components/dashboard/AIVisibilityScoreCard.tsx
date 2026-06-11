'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface ScoreBreakdown {
  websiteOptimisation?: number | null;
  contentAuthority?: number | null;
  directoryPresence?: number | null;
  reviewSignals?: number | null;
  structuredData?: number | null;
  competitivePosition?: number | null;
}

interface AeoScoreData {
  reportId: string;
  score: number;
  scoreBreakdown?: ScoreBreakdown;
  searchedCompany?: {
    website?: string | null;
    hasReviews?: boolean | null;
    hasPricing?: boolean | null;
    hasStructuredData?: boolean | null;
    hasDetailedServices?: boolean | null;
    hasSocialMedia?: boolean | null;
    hasGoogleBusiness?: boolean | null;
    summary?: string | null;
  };
  gaps?: Array<{ title: string; explanation: string }>;
  aiMentioned?: boolean;
  aiPosition?: number | null;
  reportType?: string;
  createdAt: string;
}

interface AIVisibilityScoreCardProps {
  token: string;
  tier: string;
  compact?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const BREAKDOWN_LABELS: Record<string, { label: string; colour: string }> = {
  websiteOptimisation: { label: 'Website', colour: 'bg-blue-500' },
  contentAuthority: { label: 'Content', colour: 'bg-emerald-500' },
  directoryPresence: { label: 'Directories', colour: 'bg-yellow-500' },
  reviewSignals: { label: 'Reviews', colour: 'bg-purple-500' },
  structuredData: { label: 'Structured Data', colour: 'bg-cyan-500' },
  competitivePosition: { label: 'Competitive', colour: 'bg-indigo-500' },
};

function getScoreColour(score: number): string {
  if (score >= 60) return '#22c55e';
  if (score >= 35) return '#f59e0b';
  return '#f87171';
}

function getScoreLabel(score: number): string {
  if (score >= 70) return 'Strong';
  if (score >= 50) return 'Moderate';
  if (score >= 30) return 'Weak';
  return 'Very Low';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AIVisibilityScoreCard({ token, tier, compact = true }: AIVisibilityScoreCardProps) {
  const [data, setData] = useState<AeoScoreData | null>(null);
  const [hasReport, setHasReport] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/vendors/aeo-score`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch AI visibility score');

      const result = await res.json();
      if (result.success) {
        setHasReport(result.hasReport);
        setData(result.data);
      } else {
        throw new Error(result.error || 'Failed to load score');
      }
      setError(null);
    } catch (err) {
      console.error('AEO score error:', err);
      setError('Unable to load AI visibility score');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleRescan = async () => {
    if (scanning) return;
    if (!token) {
      setError('You need to be signed in to run a scan. Try refreshing the page.');
      return;
    }

    setScanning(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/vendors/aeo-rescan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      let result: { success?: boolean; data?: AeoScoreData; error?: string };
      try {
        result = await res.json();
      } catch {
        throw new Error(`Scan failed (status ${res.status}). Please try again in a moment.`);
      }

      if (!res.ok || !result.success || !result.data) {
        throw new Error(result.error || `Scan failed (status ${res.status})`);
      }

      setHasReport(true);
      setData(result.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Scan failed. Please try again later.';
      setError(message);
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  // Score ring component
  const ScoreRing = ({ score, colour }: { score: number; colour: string }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={colour}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{score}%</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse flex items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="card p-6">
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  // No report yet
  if (!hasReport || !data) {
    return (
      <div className="card p-6">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">AI Visibility Score</h3>
          <p className="text-sm text-gray-500 mb-4">
            Your AI visibility hasn&apos;t been scored yet. Run your first scan to see how AI platforms like ChatGPT see your business.
          </p>
          <button
            onClick={handleRescan}
            disabled={scanning}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {scanning ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Scanning (this may take a minute)...
              </span>
            ) : (
              'Run First Scan'
            )}
          </button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  // Has report — show real data
  const colour = getScoreColour(data.score);
  const label = getScoreLabel(data.score);
  const breakdown = data.scoreBreakdown;

  return (
    <div className="card p-6">
      <div className="flex items-start gap-6">
        <ScoreRing score={data.score} colour={colour} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">AI Visibility Score</h3>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: colour }}>
            {label}
          </p>
          <p className="text-sm text-gray-600">
            {data.score <= 20
              ? 'AI tools can\'t find your business yet.'
              : data.score <= 40
                ? 'Limited visibility. AI rarely recommends you.'
                : data.score <= 60
                  ? 'Moderate visibility. Room for improvement.'
                  : data.score <= 80
                    ? 'Strong visibility across AI platforms.'
                    : 'Excellent! AI tools actively recommend you.'
            }
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Last scanned: {formatDate(data.createdAt)}
          </p>
          {data.score < 50 && (
            <p className="text-xs text-amber-600 mt-1">
              Most businesses in your category score 20-40. Paid firms average 55+.
            </p>
          )}
        </div>
      </div>

      {/* Score breakdown bars */}
      {breakdown && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {Object.entries(BREAKDOWN_LABELS).map(([key, { label: lbl, colour: bg }]) => {
            const val = breakdown[key as keyof ScoreBreakdown];
            if (val == null) return null;
            const pct = (val / 20) * 100; // Each sub-score is 0-20
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">{lbl}</span>
                  <span className="text-xs font-semibold text-gray-700">{Math.round((val / 20) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${bg}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Gaps (non-compact only) */}
      {!compact && data.gaps && data.gaps.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Areas to Improve</h4>
          <div className="space-y-2">
            {data.gaps.map((gap, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{gap.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{gap.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI mentioned status (non-compact only) */}
      {!compact && (
        <div className="mt-4 p-3 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-700">
            {data.aiMentioned
              ? `AI mentions your business${data.aiPosition ? ` at position ${data.aiPosition}` : ''}.`
              : 'AI does not currently mention your business when asked about your category.'}
          </p>
        </div>
      )}

      {/* View full report link + Rescan button */}
      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/aeo-report/results/${data.reportId}`}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View full report &rarr;
        </Link>
        <button
          onClick={handleRescan}
          disabled={scanning}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {scanning ? (
            <span className="flex items-center gap-1.5">
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Scanning...
            </span>
          ) : (
            'Rescan'
          )}
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
