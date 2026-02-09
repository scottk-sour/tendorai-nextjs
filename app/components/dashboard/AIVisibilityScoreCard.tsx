'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import TierGate, { hasTierAccess } from './TierGate';

interface ScoreTip {
  message: string;
  impact: string;
  points: number;
  priority: number;
  category: string;
  action: string;
}

interface BreakdownSection {
  earned: number;
  max: number;
  label?: string;
  subtitle?: string;
  items?: Array<{
    name: string;
    points: number;
    completed: boolean;
    upgrade?: boolean;
    price?: string;
  }>;
}

interface VisibilityScoreData {
  score: number;
  maxScore: number;
  maxPossible: number;
  maxPossibleForTier: number;
  maxOverall: number;
  label: string;
  colour: string;
  tier: string;
  tierDisplayName: string;
  breakdown: {
    profile: BreakdownSection;
    products: BreakdownSection;
    geo: BreakdownSection;
    mentions: BreakdownSection;
  };
  tips: ScoreTip[];
  recommendations: Array<{
    action: string;
    points: number;
    section: string;
    price?: string;
  }>;
  nextTier?: {
    name: string;
    price: string;
    additionalPoints: number;
  } | null;
  nextMilestone?: {
    target: number;
    label: string;
    pointsNeeded: number;
  } | null;
}

interface AIVisibilityScoreCardProps {
  token: string;
  tier: string;
  compact?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const BREAKDOWN_KEYS = ['profile', 'products', 'geo', 'mentions'] as const;

export default function AIVisibilityScoreCard({ token, tier, compact = true }: AIVisibilityScoreCardProps) {
  const [data, setData] = useState<VisibilityScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasAccess = hasTierAccess(tier, 'visible');

  const fetchScore = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/visibility/score`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch visibility score');

      const result = await res.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'Failed to load score');
      }
      setError(null);
    } catch (err) {
      console.error('Visibility score error:', err);
      setError('Unable to load visibility score');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (hasAccess) {
      fetchScore();
    } else {
      setLoading(false);
    }
  }, [fetchScore, hasAccess]);

  // Score ring component
  const ScoreRing = ({ score, maxScore, colour }: { score: number; maxScore: number; colour: string }) => {
    const percentage = (score / maxScore) * 100;
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={colour}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{score}</span>
          <span className="text-xs text-gray-500">/{maxScore}</span>
        </div>
      </div>
    );
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse flex items-center gap-6">
      <div className="w-28 h-28 rounded-full bg-gray-200" />
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );

  // Card content (real data)
  const CardContent = () => {
    if (loading) return <LoadingSkeleton />;
    if (error) return <p className="text-gray-500">{error}</p>;
    if (!data) return null;

    const { score, maxScore, maxPossible, label, colour, tips, nextMilestone, tierDisplayName, breakdown } = data;

    return (
      <>
        <div className="flex items-start gap-6">
          <ScoreRing score={score} maxScore={maxScore} colour={colour} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">AI Visibility Score</h3>
              <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                {tierDisplayName || 'Listed'}
              </span>
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: colour }}>
              {label}
            </p>
            <p className="text-sm text-gray-600">
              {score <= 20
                ? 'AI tools can\'t find your business yet.'
                : score <= 40
                  ? 'Basic visibility. Complete your profile and add products.'
                  : score <= 60
                    ? 'Good visibility! Run a GEO Audit to go further.'
                    : score <= 80
                      ? 'Strong visibility across AI platforms.'
                      : 'Excellent! Maximum AI visibility achieved.'
              }
            </p>
          </div>
        </div>

        {/* Breakdown mini bars (always shown) */}
        {breakdown && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {BREAKDOWN_KEYS.map((key) => {
              const section = breakdown[key];
              if (!section) return null;
              const pct = section.max > 0 ? (section.earned / section.max) * 100 : 0;
              const barColours: Record<string, string> = {
                profile: 'bg-blue-500',
                products: 'bg-emerald-500',
                geo: 'bg-amber-500',
                mentions: 'bg-purple-500',
              };
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">{section.label}</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {section.earned}/{section.max}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${barColours[key] || 'bg-purple-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full breakdown items (non-compact) */}
        {!compact && breakdown && (
          <div className="mt-4 space-y-3">
            {BREAKDOWN_KEYS.map((key) => {
              const section = breakdown[key];
              if (!section?.items?.length) return null;
              return (
                <div key={key} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">{section.label}</p>
                  <div className="space-y-1">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className={item.completed ? 'text-gray-700' : 'text-gray-400'}>
                          {item.completed ? '\u2713' : '\u25CB'} {item.name}
                        </span>
                        <span className={item.completed ? 'text-green-600 font-medium' : 'text-gray-400'}>
                          {item.completed ? `+${item.points}` : `0/${item.points}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Next milestone */}
        {nextMilestone && nextMilestone.pointsNeeded > 0 && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700">
              <span className="font-medium">{nextMilestone.pointsNeeded}</span> more points to reach &quot;{nextMilestone.label}&quot;
            </p>
          </div>
        )}

        {/* Quick Wins - show tips */}
        {compact && tips && tips.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Quick Wins</h4>
            <div className="space-y-2">
              {tips.slice(0, 2).map((tip, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{tip.message}</span>
                  <span className="text-purple-600 font-medium whitespace-nowrap ml-2">+{tip.points} pts</span>
                </div>
              ))}
            </div>
            <Link
              href="/vendor-dashboard/analytics"
              className="inline-block mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View full breakdown
            </Link>
          </div>
        )}

        {/* Full tips list (non-compact) */}
        {!compact && tips && tips.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Tips to Improve</h4>
            <div className="space-y-3">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white border rounded-lg">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    tip.impact === 'high' ? 'bg-purple-600' : tip.impact === 'medium' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {tip.points}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{tip.message}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{tip.action}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    tip.impact === 'high' ? 'bg-purple-100 text-purple-700' :
                    tip.impact === 'medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {tip.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  // Mock content for locked preview
  const MockContent = () => (
    <>
      <div className="flex items-start gap-6">
        <ScoreRing score={65} maxScore={100} colour="#8b5cf6" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">AI Visibility Score</h3>
            <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
              Listed
            </span>
          </div>
          <p className="text-sm font-medium text-purple-600 mb-1">Good Visibility</p>
          <p className="text-sm text-gray-600">
            Your profile completeness and tier affect how often AI assistants recommend you.
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700">
          <span className="font-medium">5</span> more points to reach &quot;Strong&quot;
        </p>
      </div>
    </>
  );

  return (
    <div className="card p-6">
      {hasAccess ? (
        <CardContent />
      ) : (
        <TierGate
          currentTier={tier}
          requiredTier="visible"
          featureName="AI Visibility Score"
          featureDescription="See exactly what's boosting and hurting your AI ranking, with actionable tips to improve."
        >
          <MockContent />
        </TierGate>
      )}
    </div>
  );
}
