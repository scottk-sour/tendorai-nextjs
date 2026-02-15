'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface Stats {
  totalVendors: number;
  totalProducts: number;
  totalLeads: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  recentVendors: number;
  tierBreakdown: Record<string, number>;
}

interface LeadCounts {
  newsletter: number;
  aeo: number;
  quote: number;
  'vendor-lead': number;
  total: number;
}

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leadCounts, setLeadCounts] = useState<LeadCounts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, leadsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/stats`, { headers }),
        fetch(`${API_URL}/api/admin/all-leads?counts=true`, { headers }),
      ]);

      if (!statsRes.ok || !leadsRes.ok) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        return;
      }

      const [statsData, leadsData] = await Promise.all([
        statsRes.json(),
        leadsRes.json(),
      ]);

      if (statsData.success) setStats(statsData.stats);
      if (leadsData.success) setLeadCounts(leadsData.counts);
    } catch {
      setError('Network error loading dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        {error}
      </div>
    );
  }

  const statCards = [
    { label: 'Total Vendors', value: stats?.totalVendors ?? 0, color: 'bg-blue-500' },
    { label: 'Active Subscriptions', value: stats?.activeSubscriptions ?? 0, color: 'bg-green-500' },
    { label: 'Monthly Revenue', value: `£${(stats?.monthlyRevenue ?? 0).toLocaleString()}`, color: 'bg-purple-500' },
    { label: 'Total Leads', value: leadCounts?.total ?? stats?.totalLeads ?? 0, color: 'bg-orange-500' },
    { label: 'Total Products', value: stats?.totalProducts ?? 0, color: 'bg-cyan-500' },
    { label: 'Recent Vendors (30d)', value: stats?.recentVendors ?? 0, color: 'bg-pink-500' },
  ];

  const tierColors: Record<string, string> = {
    free: 'bg-gray-100 text-gray-700',
    visible: 'bg-blue-100 text-blue-700',
    basic: 'bg-blue-100 text-blue-700',
    verified: 'bg-green-100 text-green-700',
    managed: 'bg-green-100 text-green-700',
    enterprise: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome to the TendorAI admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${card.color} opacity-20`} />
            </div>
          </div>
        ))}
      </div>

      {/* Tier Breakdown */}
      {stats?.tierBreakdown && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Vendor Tier Breakdown</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.tierBreakdown)
              .filter(([, count]) => count > 0)
              .map(([tier, count]) => (
                <span
                  key={tier}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    tierColors[tier] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}: {count}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Lead Source Breakdown */}
      {leadCounts && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">{leadCounts.newsletter}</p>
              <p className="text-sm text-green-600">Newsletter</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">{leadCounts.aeo}</p>
              <p className="text-sm text-purple-600">AEO Reports</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">{leadCounts.quote}</p>
              <p className="text-sm text-blue-600">Quote Requests</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-700">{leadCounts['vendor-lead']}</p>
              <p className="text-sm text-orange-600">Vendor Leads</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/vendors"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-purple-300 hover:shadow-md transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Vendors</h3>
              <p className="text-sm text-gray-500">View, edit tiers and manage vendor accounts</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/leads"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-purple-300 hover:shadow-md transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View All Leads</h3>
              <p className="text-sm text-gray-500">Browse leads from all sources and export data</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
