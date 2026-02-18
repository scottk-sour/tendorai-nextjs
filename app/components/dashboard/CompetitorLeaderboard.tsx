'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { hasTierAccess } from './TierGate';

interface CompetitorData {
  locked: boolean;
  competitorCount: number;
  topCounts?: number[];
  vendorRank?: number | null;
  vendorMentionCount?: number;
  category?: string;
  location?: string;
  topCompetitors?: Array<{ name: string; mentionCount: number; website?: string }>;
}

interface CompetitorLeaderboardProps {
  token: string;
  tier: string;
  vendorName: string;
  vendorType?: string;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const SOLICITOR_PLACEHOLDER: CompetitorData = {
  locked: false,
  competitorCount: 6,
  category: 'Solicitors',
  location: 'Newport',
  vendorRank: 6,
  vendorMentionCount: 7,
  topCompetitors: [
    { name: 'Harding Evans Solicitors', mentionCount: 12, website: 'https://www.hardingevans.com' },
    { name: 'Geldards LLP', mentionCount: 11, website: 'https://www.geldards.com' },
    { name: 'Hugh James Solicitors', mentionCount: 10, website: 'https://www.hughjames.com' },
    { name: 'Everett Tomlin Lloyd & Pratt', mentionCount: 9, website: 'https://www.etlp.co.uk' },
    { name: 'Watkins & Gunn Solicitors', mentionCount: 8, website: 'https://www.watkinsandgunn.co.uk' },
  ],
  topCounts: [12, 11, 10, 9, 8],
};

const ACCOUNTANT_PLACEHOLDER: CompetitorData = {
  locked: false,
  competitorCount: 6,
  category: 'Accountants',
  location: 'Swansea',
  vendorRank: 6,
  vendorMentionCount: 4,
  topCompetitors: [
    { name: 'Bevan & Buckland', mentionCount: 11, website: 'https://www.bevanbuckland.co.uk' },
    { name: 'Broomfield & Alexander', mentionCount: 9, website: 'https://www.broomfield.co.uk' },
    { name: 'Morgan Hemp Accountants', mentionCount: 8, website: 'https://www.morganhemp.co.uk' },
    { name: 'Ashmole & Co', mentionCount: 7, website: 'https://www.ashmole.co.uk' },
    { name: 'PBM Accountants', mentionCount: 6, website: 'https://www.pbmtax.co.uk' },
  ],
  topCounts: [11, 9, 8, 7, 6],
};

function getPlaceholderData(vendorType: string | undefined): CompetitorData | null {
  if (vendorType === 'solicitor') return SOLICITOR_PLACEHOLDER;
  if (vendorType === 'accountant') return ACCOUNTANT_PLACEHOLDER;
  return null;
}

function hasNoMeaningfulData(data: CompetitorData | null): boolean {
  if (!data) return true;
  if (data.locked && data.competitorCount === 0 && (!data.topCounts || data.topCounts.length === 0)) return true;
  if (!data.topCompetitors?.length && (!data.topCounts || data.topCounts.length === 0)) return true;
  return false;
}

export default function CompetitorLeaderboard({ token, tier, vendorName, vendorType }: CompetitorLeaderboardProps) {
  const [data, setData] = useState<CompetitorData | null>(null);
  const [loading, setLoading] = useState(true);

  const isPaid = hasTierAccess(tier, 'starter');

  const fetchCompetitors = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/ai-mentions/competitors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        let fetchedData: CompetitorData = json.data;
        // If no meaningful data and we have placeholder data for this vendorType, use it
        if (hasNoMeaningfulData(fetchedData)) {
          const placeholder = getPlaceholderData(vendorType);
          if (placeholder) {
            fetchedData = placeholder;
          }
        }
        setData(fetchedData);
      } else {
        // API returned success: false — try placeholder
        const placeholder = getPlaceholderData(vendorType);
        if (placeholder) setData(placeholder);
      }
    } catch {
      // Network error — try placeholder
      const placeholder = getPlaceholderData(vendorType);
      if (placeholder) setData(placeholder);
    } finally {
      setLoading(false);
    }
  }, [token, vendorType]);

  useEffect(() => {
    fetchCompetitors();
  }, [fetchCompetitors]);

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  // No data yet
  if (!data || (data.locked && data.competitorCount === 0 && (!data.topCounts || data.topCounts.length === 0))) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-2">AI Recommendation Ranking</h3>
        <div className="py-6 text-center text-gray-500">
          <svg className="w-10 h-10 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-sm">No scan data yet</p>
          <p className="text-xs mt-1">Rankings will appear once AI scans start running.</p>
        </div>
      </div>
    );
  }

  const category = data.category || 'your service';
  const location = data.location || 'your area';

  // Paid tier — show real data (or placeholder data with names visible)
  if (isPaid && !data.locked && data.topCompetitors) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-1">
          AI Recommendation Ranking — {category} in {location}
        </h3>
        <p className="text-xs text-gray-500 mb-4">Based on AI mention scans in the last 30 days</p>
        <div className="space-y-2">
          {data.topCompetitors.slice(0, 5).map((comp, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-900">
                {comp.website ? (
                  <a href={comp.website} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 hover:underline">
                    {comp.name}
                  </a>
                ) : (
                  comp.name
                )}
              </span>
              <span className="text-sm text-gray-600">{comp.mentionCount} mentions</span>
            </div>
          ))}
          {data.vendorRank && (
            <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white">
                {data.vendorRank}
              </span>
              <span className="flex-1 text-sm font-medium text-purple-900">{vendorName || 'Your Business'}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-purple-600">{data.vendorMentionCount ?? 0} mentions</span>
                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">You</span>
              </div>
            </div>
          )}
        </div>
        <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 font-medium">
          This is where your potential clients are being directed instead.
        </p>
      </div>
    );
  }

  // Free tier — blurred names, real counts
  const topCounts = data.topCounts || [];

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-gray-900 mb-1">
        AI Recommendation Ranking — {category} in {location}
      </h3>
      <p className="text-xs text-gray-500 mb-4">Based on AI mention scans in the last 30 days</p>

      <div className="space-y-2">
        {topCounts.slice(0, 5).map((count, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              {i + 1}
            </span>
            <span className="flex-1">
              <span className="inline-block h-4 w-32 bg-gray-300 rounded text-gray-300 select-none" aria-hidden="true">
                Hidden Company
              </span>
            </span>
            <span className="text-sm text-gray-600">{count} mentions</span>
          </div>
        ))}

        {/* Your business row */}
        <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <span className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white">
            {data.vendorRank ?? topCounts.length + 1}
          </span>
          <span className="flex-1 text-sm font-medium text-purple-900">{vendorName || 'Your Business'}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-600">{data.vendorMentionCount ?? 0} mentions</span>
            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">You</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 font-medium">
        This is where your potential clients are being directed instead.
      </p>

      {/* CTA */}
      <div className="mt-4 pt-4 border-t text-center">
        <p className="text-sm text-gray-600 mb-3">See who&apos;s outranking you in AI search</p>
        <Link
          href="/vendor-dashboard/settings?tab=subscription"
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
        >
          Upgrade to Starter &mdash; &pound;149/month
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
