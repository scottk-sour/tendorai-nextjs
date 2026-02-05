'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';

interface AnalyticsStats {
  views: number;
  clicks: number;
  leads: number;
  conversions: number;
}

interface DailyStats {
  date: string;
  views: number;
  clicks: number;
  leads: number;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function AnalyticsPage() {
  const { getCurrentToken } = useAuth();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [tier, setTier] = useState('free');
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  const fetchAnalytics = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      // Fetch profile to check tier
      const profileRes = await fetch(`${API_URL}/api/vendors/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        const vendorTier = profileData.vendor?.tier || 'free';
        setTier(vendorTier);

        // Only fetch analytics if tier allows
        if (['visible', 'basic', 'managed', 'verified'].includes(vendorTier.toLowerCase())) {
          const [statsRes, dailyRes] = await Promise.all([
            fetch(`${API_URL}/api/analytics/stats`, {
              headers: { 'Authorization': `Bearer ${token}` },
            }),
            fetch(`${API_URL}/api/analytics/daily?days=${dateRange}`, {
              headers: { 'Authorization': `Bearer ${token}` },
            }),
          ]);

          if (statsRes.ok) {
            const statsData = await statsRes.json();
            setStats(statsData.data || statsData);
          }

          if (dailyRes.ok) {
            const dailyData = await dailyRes.json();
            setDailyStats(dailyData.data?.stats || dailyData.stats || []);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken, dateRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const getTierLabel = (t: string) => {
    const mapping: Record<string, string> = {
      free: 'Listed', listed: 'Listed',
      basic: 'Visible', visible: 'Visible',
      managed: 'Verified', verified: 'Verified',
    };
    return mapping[t?.toLowerCase()] || 'Listed';
  };

  const isFreeTier = getTierLabel(tier) === 'Listed';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Free tier - show upgrade prompt
  if (isFreeTier) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your performance and visibility</p>
        </div>

        <div className="card p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unlock Analytics</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Upgrade to Visible or Verified tier to access detailed analytics including profile views,
            lead tracking, conversion rates, and performance trends.
          </p>
          <Link href="/for-vendors" className="btn-primary py-2.5 px-6">
            View Upgrade Options
          </Link>
        </div>

        {/* Preview of what analytics looks like */}
        <div className="card p-6 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Analytics Preview</h3>
            <span className="text-sm text-gray-500">Available on Visible tier+</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['Profile Views', 'Clicks', 'Leads', 'Conversion Rate'].map((label) => (
              <div key={label} className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-400">--</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Paid tier - show full analytics
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your performance and visibility</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="input w-full sm:w-40"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.views?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-500">Profile Views</div>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.clicks?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-500">Clicks</div>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.leads?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-500">Leads</div>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.views && stats.leads
                  ? ((stats.leads / stats.views) * 100).toFixed(1)
                  : 0}%
              </div>
              <div className="text-sm text-gray-500">Conversion Rate</div>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Daily Trends</h3>
        {dailyStats.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No data available for this period</p>
          </div>
        ) : (
          <div className="h-64 flex items-end justify-between gap-1">
            {dailyStats.slice(-30).map((day, index) => {
              const maxViews = Math.max(...dailyStats.map((d) => d.views || 0), 1);
              const height = ((day.views || 0) / maxViews) * 100;
              return (
                <div
                  key={day.date || index}
                  className="flex-1 bg-purple-500 rounded-t hover:bg-purple-600 transition-colors"
                  style={{ height: `${Math.max(height, 4)}%` }}
                  title={`${new Date(day.date).toLocaleDateString('en-GB')}: ${day.views} views`}
                />
              );
            })}
          </div>
        )}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>
            {dailyStats.length > 0
              ? new Date(dailyStats[0].date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
              : ''}
          </span>
          <span>
            {dailyStats.length > 0
              ? new Date(dailyStats[dailyStats.length - 1].date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
              : ''}
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
        <h3 className="font-semibold text-gray-900 mb-3">Tips to Improve Performance</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Complete your profile with a detailed description and all services offered
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Add certifications and brands to build trust with potential customers
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Respond quickly to quote requests - fast response times improve conversion
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Keep your product catalog up to date with competitive pricing
          </li>
        </ul>
      </div>
    </div>
  );
}
