'use client';

import { useState, useEffect, useCallback } from 'react';
import TierGate, { hasTierAccess } from './TierGate';

interface AIMentionsData {
  aiMentions: number;
  aiMentionsBySource: {
    chatgpt: number;
    claude: number;
    perplexity: number;
    other: number;
  };
  recentAiQueries: Array<{
    timestamp: string;
    query?: string;
    position?: number;
    source?: string;
  }>;
}

interface AIMentionsCardProps {
  vendorId: string;
  token: string;
  tier: string;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function AIMentionsCard({ vendorId, token, tier }: AIMentionsCardProps) {
  const [data, setData] = useState<AIMentionsData | null>(null);
  const [period, setPeriod] = useState<'7d' | '30d'>('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasAccess = hasTierAccess(tier, 'visible');

  const fetchAnalytics = useCallback(async () => {
    if (!vendorId || !token) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/analytics/vendor/${vendorId}?period=${period}`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error('Failed to fetch analytics');

      const result = await res.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError('Unable to load AI mentions');
    } finally {
      setLoading(false);
    }
  }, [vendorId, token, period]);

  useEffect(() => {
    if (hasAccess) {
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, [fetchAnalytics, hasAccess]);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-white/20 rounded w-1/3 mb-4" />
      <div className="h-12 bg-white/20 rounded w-1/4 mb-4" />
      <div className="h-4 bg-white/20 rounded w-2/3" />
    </div>
  );

  // Content for both locked and unlocked states
  const CardContent = () => {
    if (loading) return <LoadingSkeleton />;
    if (error) return <p className="text-white/70">{error}</p>;

    const aiMentions = data?.aiMentions || 0;
    const bySource = data?.aiMentionsBySource || { chatgpt: 0, claude: 0, perplexity: 0, other: 0 };

    return (
      <>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <h3 className="text-lg font-semibold text-white">AI Mentions</h3>
          </div>
          <div className="flex gap-1 bg-white/20 rounded-lg p-1">
            <button
              onClick={() => setPeriod('7d')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                period === '7d'
                  ? 'bg-white text-purple-700 font-medium'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              7d
            </button>
            <button
              onClick={() => setPeriod('30d')}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                period === '30d'
                  ? 'bg-white text-purple-700 font-medium'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              30d
            </button>
          </div>
        </div>

        {/* Main metric */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-white">{aiMentions}</span>
            {aiMentions > 0 && (
              <span className="text-green-300 text-sm font-medium">AI recommendations</span>
            )}
          </div>
          <p className="text-white/60 text-sm mt-1">
            Times AI assistants mentioned your company
          </p>
        </div>

        {/* Source breakdown */}
        {aiMentions > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{bySource.chatgpt}</div>
              <div className="text-xs text-white/60">ChatGPT</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{bySource.claude}</div>
              <div className="text-xs text-white/60">Claude</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{bySource.perplexity}</div>
              <div className="text-xs text-white/60">Perplexity</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{bySource.other}</div>
              <div className="text-xs text-white/60">Other</div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {aiMentions === 0 && (
          <div className="text-center py-2">
            <p className="text-white/60 text-sm mb-2">No AI mentions yet. Improve your visibility:</p>
            <ul className="text-white/50 text-xs space-y-1">
              <li>• Add more products with pricing</li>
              <li>• Complete your company description</li>
              <li>• Upgrade to increase AI visibility</li>
            </ul>
          </div>
        )}
      </>
    );
  };

  // Mock data for locked preview
  const MockContent = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h3 className="text-lg font-semibold text-white">AI Mentions</h3>
        </div>
        <div className="flex gap-1 bg-white/20 rounded-lg p-1">
          <span className="px-3 py-1 text-sm bg-white text-purple-700 rounded-md font-medium">7d</span>
          <span className="px-3 py-1 text-sm text-white/80">30d</span>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-bold text-white">12</span>
          <span className="text-green-300 text-sm font-medium">AI recommendations</span>
        </div>
        <p className="text-white/60 text-sm mt-1">Times AI assistants mentioned your company</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-white">5</div>
          <div className="text-xs text-white/60">ChatGPT</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-white">4</div>
          <div className="text-xs text-white/60">Claude</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-white">2</div>
          <div className="text-xs text-white/60">Perplexity</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-white">1</div>
          <div className="text-xs text-white/60">Other</div>
        </div>
      </div>
    </>
  );

  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 shadow-lg">
      {hasAccess ? (
        <CardContent />
      ) : (
        <TierGate
          currentTier={tier}
          requiredTier="visible"
          featureName="AI Mentions"
          featureDescription="See which AI assistants recommend you and how often. Track trends over time."
        >
          <MockContent />
        </TierGate>
      )}
    </div>
  );
}
