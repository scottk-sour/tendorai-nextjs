'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';

interface Lead {
  _id: string;
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  service?: string;
  requirements?: string;
  status: string;
  createdAt: string;
}

interface Stats {
  totalLeads: number;
  pendingLeads: number;
  viewedLeads: number;
  contactedLeads: number;
  wonLeads: number;
  thisMonthLeads: number;
  responseRate: number;
}

interface ProfileData {
  company: string;
  tier: string;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function VendorDashboardOverview() {
  const { getCurrentToken } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      // Fetch leads and profile in parallel
      const [leadsRes, profileRes] = await Promise.all([
        fetch(`${API_URL}/api/vendor-leads/vendor/me`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/vendors/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.data?.leads || leadsData.leads || []);
      }

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        if (profileData.vendor) {
          setProfile({
            company: profileData.vendor.company || '',
            tier: profileData.vendor.tier || 'free',
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate stats
  const stats: Stats = {
    totalLeads: leads.length,
    pendingLeads: leads.filter((l) => l.status === 'pending').length,
    viewedLeads: leads.filter((l) => l.status === 'viewed').length,
    contactedLeads: leads.filter((l) => l.status === 'contacted').length,
    wonLeads: leads.filter((l) => l.status === 'won').length,
    thisMonthLeads: leads.filter((l) => {
      const date = new Date(l.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    responseRate: leads.length > 0
      ? Math.round((leads.filter((l) => l.status !== 'pending').length / leads.length) * 100)
      : 0,
  };

  // Get recent leads (last 5)
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Normalize tier
  const getTierLabel = (tier: string) => {
    const mapping: Record<string, string> = {
      free: 'Listed',
      listed: 'Listed',
      basic: 'Visible',
      visible: 'Visible',
      managed: 'Verified',
      verified: 'Verified',
    };
    return mapping[tier?.toLowerCase()] || 'Listed';
  };

  const getTierBadgeClass = (tier: string) => {
    const label = getTierLabel(tier);
    if (label === 'Verified') return 'badge-verified';
    if (label === 'Visible') return 'badge-visible';
    return 'badge-free';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          {profile?.company && (
            <p className="text-gray-600 mt-1">{profile.company}</p>
          )}
        </div>
        {profile?.tier && (
          <span className={`badge ${getTierBadgeClass(profile.tier)}`}>
            {getTierLabel(profile.tier)} Tier
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-gray-900">{stats.totalLeads}</div>
          <div className="text-sm text-gray-600">Total Leads</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-yellow-600">{stats.pendingLeads}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600">{stats.wonLeads}</div>
          <div className="text-sm text-gray-600">Won</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-purple-600">{stats.responseRate}%</div>
          <div className="text-sm text-gray-600">Response Rate</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/vendor-dashboard/quotes"
          className="card-hover p-4 flex items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900">View Quote Requests</div>
            <div className="text-sm text-gray-500">{stats.pendingLeads} pending</div>
          </div>
        </Link>

        <Link
          href="/vendor-dashboard/products"
          className="card-hover p-4 flex items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900">Manage Products</div>
            <div className="text-sm text-gray-500">Update your catalog</div>
          </div>
        </Link>

        <Link
          href="/vendor-dashboard/settings"
          className="card-hover p-4 flex items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900">Profile Settings</div>
            <div className="text-sm text-gray-500">Edit your details</div>
          </div>
        </Link>
      </div>

      {/* Recent Leads */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Quote Requests</h2>
          <Link href="/vendor-dashboard/quotes" className="text-sm link">
            View all
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p>No quote requests yet</p>
            <p className="text-sm mt-1">Requests from businesses will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentLeads.map((lead) => (
              <div key={lead._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {lead.businessName || lead.contactName || 'Business Inquiry'}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {lead.service && <span className="mr-3">{lead.service}</span>}
                      {lead.postcode && <span className="text-gray-500">{lead.postcode}</span>}
                    </div>
                    {lead.requirements && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{lead.requirements}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        lead.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : lead.status === 'won'
                            ? 'bg-green-100 text-green-700'
                            : lead.status === 'contacted'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {lead.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(lead.createdAt).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade CTA for free tier */}
      {profile?.tier && getTierLabel(profile.tier) === 'Listed' && (
        <div className="card bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">Upgrade Your Visibility</h3>
              <p className="text-purple-100 mt-1">
                Get more leads with enhanced AI recommendations and priority placement
              </p>
            </div>
            <Link
              href="/for-vendors"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
