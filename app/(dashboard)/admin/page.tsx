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
  pastDueSubscriptions?: number;
  revenueSource?: string;
  recentVendors: number;
  tierBreakdown: Record<string, number>;
}

interface Vendor {
  id: string;
  company: string;
  email: string;
  vendorType: string;
  tier: string;
  city: string;
  status: string;
  listingStatus: string;
  isClaimed: boolean;
  claimedAt: string | null;
  createdAt: string;
  lastLogin?: string;
}

interface SchemaRequest {
  id: string;
  vendor: { id: string; company: string; email: string; website?: string; tier: string } | null;
  websiteUrl: string;
  cmsPlatform: string;
  status: string;
  createdAt: string;
}

interface RecentSignup {
  id: string;
  company: string;
  email: string;
  vendorType: string;
  tier: string;
  city: string;
  createdAt: string;
}

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

function daysSince(dateStr: string | undefined | null): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [schemaRequests, setSchemaRequests] = useState<SchemaRequest[]>([]);
  const [recentSignups, setRecentSignups] = useState<RecentSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, vendorsRes, schemaRes, signupsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/stats`, { headers }),
        fetch(`${API_URL}/api/admin/vendors`, { headers }),
        fetch(`${API_URL}/api/admin/schema-requests`, { headers }),
        fetch(`${API_URL}/api/admin/recent-signups`, { headers }),
      ]);

      if (!statsRes.ok) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        return;
      }

      const [statsData, vendorsData, schemaData, signupsData] = await Promise.all([
        statsRes.json(),
        vendorsRes.ok ? vendorsRes.json() : { success: false },
        schemaRes.ok ? schemaRes.json() : { success: false },
        signupsRes.ok ? signupsRes.json() : { success: false },
      ]);

      if (statsData.success) setStats(statsData.stats);
      if (vendorsData.success) setVendors(vendorsData.data || []);
      if (schemaData.success) setSchemaRequests(schemaData.data || []);
      if (signupsData.success) setRecentSignups(signupsData.data?.slice(0, 10) || []);
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

  // Derived data
  const proCustomers = vendors
    .filter((v) => v.tier === 'pro' && v.status === 'active')
    .sort((a, b) => {
      const aLogin = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
      const bLogin = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
      return aLogin - bLogin;
    });

  const claimedCount = vendors.filter((v) => v.isClaimed || v.listingStatus === 'claimed').length;

  const pendingSchemaRequests = schemaRequests.filter((r) => r.status === 'pending');

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newThisWeek = vendors.filter((v) => new Date(v.createdAt) >= oneWeekAgo).length;

  const recentClaims = vendors
    .filter((v) => (v.isClaimed || v.listingStatus === 'claimed') && v.claimedAt && new Date(v.claimedAt) >= oneWeekAgo)
    .sort((a, b) => new Date(b.claimedAt!).getTime() - new Date(a.claimedAt!).getTime())
    .slice(0, 10);

  // Schema install status lookup for pro customers
  const completedSchemaVendorIds = new Set(
    schemaRequests
      .filter((r) => r.status === 'completed' && r.vendor?.id)
      .map((r) => r.vendor!.id)
  );

  const tierColors: Record<string, string> = {
    free: 'bg-gray-100 text-gray-700',
    pro: 'bg-purple-100 text-purple-700',
    visible: 'bg-blue-100 text-blue-700',
    verified: 'bg-green-100 text-green-700',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* SECTION 1 — Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Pro Customers</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">{proCustomers.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Claimed Profiles</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{claimedCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Schema Installs Pending</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{pendingSchemaRequests.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">New This Week</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{newThisWeek}</p>
        </div>
      </div>

      {/* SECTION 2 — Action Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Schema Installs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending Schema Installs</h2>
            <Link href="/admin/schema-requests" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All &rarr;
            </Link>
          </div>
          {pendingSchemaRequests.length === 0 ? (
            <p className="text-sm text-gray-400">No pending requests</p>
          ) : (
            <div className="space-y-3">
              {pendingSchemaRequests.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{r.vendor?.company || 'Unknown'}</p>
                    <p className="text-xs text-gray-500 truncate">{r.websiteUrl} &middot; {r.cmsPlatform}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-3">{formatDate(r.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Claims */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Claims (7d)</h2>
            <Link href="/admin/vendors" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All &rarr;
            </Link>
          </div>
          {recentClaims.length === 0 ? (
            <p className="text-sm text-gray-400">No claims this week</p>
          ) : (
            <div className="space-y-3">
              {recentClaims.slice(0, 5).map((v) => (
                <div key={v.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{v.company}</p>
                    <p className="text-xs text-gray-500 truncate">{v.email} &middot; {v.city}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-3">{v.claimedAt ? formatDate(v.claimedAt) : ''}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3 — Pro Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pro Customers</h2>
        {proCustomers.length === 0 ? (
          <p className="text-sm text-gray-400">No Pro customers yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-600">Company</th>
                  <th className="text-left py-2 font-medium text-gray-600">City</th>
                  <th className="text-left py-2 font-medium text-gray-600">Email</th>
                  <th className="text-left py-2 font-medium text-gray-600">Schema</th>
                  <th className="text-left py-2 font-medium text-gray-600">Last Login</th>
                  <th className="text-left py-2 font-medium text-gray-600">Days Inactive</th>
                  <th className="text-left py-2 font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {proCustomers.map((v) => {
                  const days = daysSince(v.lastLogin);
                  const hasSchema = completedSchemaVendorIds.has(v.id);
                  return (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="py-2.5 font-medium text-gray-900">{v.company}</td>
                      <td className="py-2.5 text-gray-600">{v.city}</td>
                      <td className="py-2.5 text-gray-600">{v.email}</td>
                      <td className="py-2.5">
                        {hasSchema ? (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">Installed</span>
                        ) : (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Pending</span>
                        )}
                      </td>
                      <td className="py-2.5 text-gray-500 text-xs">
                        {v.lastLogin ? formatDate(v.lastLogin) : 'Never'}
                      </td>
                      <td className="py-2.5">
                        {days !== null ? (
                          <span className={`text-xs font-medium ${days > 14 ? 'text-red-600' : days > 7 ? 'text-amber-600' : 'text-gray-500'}`}>
                            {days}d
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">&mdash;</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        <Link href="/admin/vendors" className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 4 — Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {recentSignups.length === 0 ? (
          <p className="text-sm text-gray-400">No recent activity</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-600">Company</th>
                  <th className="text-left py-2 font-medium text-gray-600">Type</th>
                  <th className="text-left py-2 font-medium text-gray-600">City</th>
                  <th className="text-left py-2 font-medium text-gray-600">Tier</th>
                  <th className="text-left py-2 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentSignups.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-gray-900">{v.company}</td>
                    <td className="py-2.5 text-gray-600 capitalize">{(v.vendorType || '').replace('-', ' ')}</td>
                    <td className="py-2.5 text-gray-600">{v.city}</td>
                    <td className="py-2.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tierColors[v.tier] || 'bg-gray-100 text-gray-700'}`}>
                        {v.tier}
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-500 text-xs">{formatDate(v.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
