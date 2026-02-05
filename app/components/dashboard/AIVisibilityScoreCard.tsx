'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import TierGate, { hasTierAccess } from './TierGate';

interface VisibilityScoreData {
  score: number;
  maxScore: number;
  maxPossibleForTier: number;
  label: string;
  colour: string;
  tier: string;
  tierDisplayName: string;
  breakdown: Record<string, {
    earned: number;
    max: number;
    items?: Array<{
      name: string;
      points: number;
      completed: boolean;
      upgrade?: boolean;
      price?: string;
    }>;
  }>;
  recommendations: Array<{
    action: string;
    points: number;
    section: string;
    price?: string;
  }>;
  nextMilestone?: {
    label: string;
    pointsNeeded: number;
  };
}

interface AIVisibilityScoreCardProps {
  token: string;
  tier: string;
  compact?: boolean; // For dashboard overview vs full analytics
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

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

    const { score, maxScore, maxPossibleForTier, label, colour, recommendations, nextMilestone, tierDisplayName } = data;

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
            {tier !== 'verified' && maxPossibleForTier && (
              <p className="text-xs text-gray-500 mb-2">
                Your tier max: {maxPossibleForTier}/100
              </p>
            )}
            <p className="text-sm text-gray-600">
              {score <= 30
                ? 'AI assistants struggle to find your business.'
                : score <= 50
                  ? 'Basic visibility. Add more details to improve.'
                  : score <= 70
                    ? 'Good visibility! Upgrade to unlock higher scores.'
                    : score <= 85
                      ? 'Strong visibility! Upgrade to Verified for max score.'
                      : 'Excellent! Maximum AI visibility achieved.'
              }
            </p>
          </div>
        </div>

        {/* Next milestone */}
        {nextMilestone && nextMilestone.pointsNeeded > 0 && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700">
              <span className="font-medium">{nextMilestone.pointsNeeded}</span> more points to reach &quot;{nextMilestone.label}&quot;
            </p>
          </div>
        )}

        {/* Quick recommendations (compact mode) */}
        {compact && recommendations && recommendations.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Quick Wins</h4>
            <div className="space-y-2">
              {recommendations.slice(0, 2).map((rec, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{rec.action}</span>
                  <span className="text-purple-600 font-medium">+{rec.points} pts</span>
                </div>
              ))}
            </div>
            <Link
              href="/vendor-dashboard/analytics"
              className="inline-block mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View full breakdown →
            </Link>
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
          featureDescription="See how discoverable you are to AI assistants"
        >
          <MockContent />
        </TierGate>
      )}
    </div>
  );
}
