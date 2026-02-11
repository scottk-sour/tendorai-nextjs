'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface BreakdownSection {
  earned: number;
  max: number;
  label?: string;
}

interface ScoreData {
  score: number;
  maxScore: number;
  breakdown: {
    profile: BreakdownSection;
    products: BreakdownSection;
    geo: BreakdownSection;
    mentions: BreakdownSection;
  };
}

interface FreeScoreBreakdownProps {
  token: string;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const SECTIONS: Array<{
  key: 'profile' | 'products' | 'geo' | 'mentions';
  label: string;
  colour: string;
  bgColour: string;
  emptyTip: string;
  emptyAction?: string;
}> = [
  {
    key: 'profile',
    label: 'Profile',
    colour: 'text-blue-600',
    bgColour: 'bg-blue-500',
    emptyTip: 'Complete your profile to earn points',
    emptyAction: '/vendor-dashboard/settings',
  },
  {
    key: 'products',
    label: 'Products',
    colour: 'text-emerald-600',
    bgColour: 'bg-emerald-500',
    emptyTip: 'Add products to gain 20 points',
    emptyAction: '/vendor-dashboard/products',
  },
  {
    key: 'geo',
    label: 'GEO Audit',
    colour: 'text-amber-600',
    bgColour: 'bg-amber-500',
    emptyTip: 'Run a GEO audit to gain 25 points',
    emptyAction: '/vendor-dashboard/analytics',
  },
  {
    key: 'mentions',
    label: 'AI Mentions',
    colour: 'text-purple-600',
    bgColour: 'bg-purple-500',
    emptyTip: "You're not being found by AI yet",
  },
];

export default function FreeScoreBreakdown({ token }: FreeScoreBreakdownProps) {
  const [data, setData] = useState<ScoreData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchScore = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/visibility/score`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { score, maxScore, breakdown } = data;
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div className="card p-6">
      {/* Header with overall score */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">AI Visibility Score</h3>
          <p className="text-xs text-gray-500">How visible is your business to AI assistants?</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">{score}</span>
          <span className="text-sm text-gray-500">/{maxScore}</span>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Score breakdown */}
      <div className="space-y-4">
        {SECTIONS.map((section) => {
          const bd = breakdown[section.key];
          if (!bd) return null;
          const pct = bd.max > 0 ? Math.round((bd.earned / bd.max) * 100) : 0;
          const isEmpty = bd.earned === 0;

          return (
            <div key={section.key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {isEmpty ? (
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    </svg>
                  ) : (
                    <svg className={`w-4 h-4 ${section.colour}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className="text-sm font-medium text-gray-700">{section.label}</span>
                </div>
                <span className={`text-sm font-semibold ${isEmpty ? 'text-gray-400' : section.colour}`}>
                  {bd.earned}/{bd.max}
                </span>
              </div>

              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full transition-all ${section.bgColour}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {isEmpty && (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{section.emptyTip}</p>
                  {section.emptyAction && (
                    <Link href={section.emptyAction} className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                      Fix &rarr;
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Locked improvement plan */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-sm text-gray-600">Upgrade to see your improvement plan</span>
        </div>
        <Link
          href="/vendor-dashboard/settings?tab=subscription"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Upgrade to Visible &mdash; &pound;99/mo
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
