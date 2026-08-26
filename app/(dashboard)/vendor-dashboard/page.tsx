'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import LeadTeaser from '@/app/components/dashboard/LeadTeaser';
import UpgradeBanner from '@/app/components/dashboard/UpgradeBanner';
import { hasTierAccess } from '@/app/components/dashboard/TierGate';
import WelcomeStrip from '@/app/components/dashboard/loop/WelcomeStrip';
import Loop from '@/app/components/dashboard/loop/Loop';
import ThisWeekSection from '@/app/components/dashboard/loop/ThisWeekSection';
import type { LoopCardProps } from '@/app/components/dashboard/loop/types';
import type { AgentRun, Approval } from '@/lib/loop/types';
import { normaliseWeekStarting } from '@/lib/loop/weekStarting';

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

interface ProfileViewStats {
  thisMonth: number;
  lastMonth: number;
  bySource: {
    google: number;
    bing: number;
    direct: number;
    ai_referral: number;
    tendorai_search: number;
    unknown: number;
  };
}

interface ProfileData {
  company: string;
  tier: string;
  vendorId: string;
  services: string[];
  locationCity: string;
  vendorType: string;
}

interface ScoreData {
  reportId?: string;
  score?: number;
}

interface AuditCheck {
  name: string;
  key: string;
  score: number;
  maxScore: number;
  passed: boolean;
  details: string;
  recommendation: string;
}

interface AuditData {
  checks?: AuditCheck[];
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function VendorDashboardOverview() {
  const router = useRouter();
  const { auth, getCurrentToken } = useAuth();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileViews, setProfileViews] = useState<ProfileViewStats | null>(null);

  const [agentRuns, setAgentRuns] = useState<AgentRun[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<Approval[]>([]);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [weekStarting, setWeekStarting] = useState<Date>(() => normaliseWeekStarting(new Date()));

  const [loading, setLoading] = useState(true);
  const [agentRunsError, setAgentRunsError] = useState<string | null>(null);
  const [approvalsError, setApprovalsError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    setAgentRunsError(null);
    setApprovalsError(null);

    const headers = { Authorization: `Bearer ${token}` };

    let saw401 = false;
    const guard = (res: Response) => {
      if (res.status === 401) saw401 = true;
      return res;
    };

    const settled = await Promise.allSettled([
      fetch(`${API_URL}/api/vendor-leads/vendor/me`, { headers }).then(guard),
      fetch(`${API_URL}/api/vendors/profile`, { headers }).then(guard),
      fetch(`${API_URL}/api/analytics/profile-views/me`, { headers }).then(guard),
      fetch(`${API_URL}/api/vendor/agent-runs/current-week`, { headers }).then(guard),
      fetch(`${API_URL}/api/vendor/approvals?status=pending&limit=50`, { headers }).then(guard),
      fetch(`${API_URL}/api/vendors/aeo-score`, { headers }).then(guard),
      fetch(`${API_URL}/api/aeo-audit/latest`, { headers }).then(guard),
    ]);

    if (saw401) {
      router.replace('/vendor-login?redirect=/vendor-dashboard');
      return;
    }

    const [leadsR, profileR, viewsR, runsR, approvalsR, scoreR, auditR] = settled;

    // Leads
    if (leadsR.status === 'fulfilled' && leadsR.value.ok) {
      try {
        const json = await leadsR.value.json();
        setLeads(json.data?.leads || json.leads || []);
      } catch { /* keep prior */ }
    }

    // Profile
    if (profileR.status === 'fulfilled' && profileR.value.ok) {
      try {
        const json = await profileR.value.json();
        if (json.vendor) {
          setProfile({
            company: json.vendor.company || '',
            tier: json.vendor.tier || 'free',
            vendorId: json.vendor.vendorId || json.vendor._id || '',
            services: json.vendor.services || [],
            locationCity: json.vendor.location?.city || '',
            vendorType: json.vendor.vendorType || 'office-equipment',
          });
        }
      } catch { /* keep prior */ }
    }

    // Profile views
    if (viewsR.status === 'fulfilled' && viewsR.value.ok) {
      try {
        const json = await viewsR.value.json();
        if (json.success) setProfileViews(json);
      } catch { /* keep prior */ }
    }

    // Agent runs (current week)
    if (runsR.status === 'fulfilled' && runsR.value.ok) {
      try {
        const json = await runsR.value.json();
        if (json.success) {
          setAgentRuns(Array.isArray(json.runs) ? json.runs : []);
          if (json.weekStarting) setWeekStarting(normaliseWeekStarting(new Date(json.weekStarting)));
        } else {
          setAgentRunsError(json.error || 'Failed to load this week\'s activity.');
        }
      } catch {
        setAgentRunsError('Failed to parse agent run data.');
      }
    } else {
      setAgentRunsError('Couldn\'t load this week\'s activity.');
    }

    // Pending approvals
    if (approvalsR.status === 'fulfilled' && approvalsR.value.ok) {
      try {
        const json = await approvalsR.value.json();
        if (json.success) {
          setPendingApprovals(Array.isArray(json.items) ? json.items : []);
        } else {
          setApprovalsError(json.error || 'Failed to load approvals.');
        }
      } catch {
        setApprovalsError('Failed to parse approvals data.');
      }
    } else {
      setApprovalsError('Couldn\'t load approvals.');
    }

    // Score (free-tier fallback for Measure)
    if (scoreR.status === 'fulfilled' && scoreR.value.ok) {
      try {
        const json = await scoreR.value.json();
        if (json.success && json.data) setScoreData(json.data);
      } catch { /* silent — fallback only */ }
    }

    // Audit (free-tier fallback for Diagnose)
    if (auditR.status === 'fulfilled' && auditR.value.ok) {
      try {
        const json = await auditR.value.json();
        if (json.success && json.data) setAuditData(json.data);
      } catch { /* silent — fallback only */ }
    }

    setLoading(false);
  }, [getCurrentToken, router]);

  useEffect(() => {
    if (!auth.isAuthenticated) return;
    fetchData();
  }, [auth.isAuthenticated, fetchData]);

  // Stats derived from leads (kept identical to prior behaviour)
  const stats = {
    totalLeads: leads.length,
    pendingLeads: leads.filter((l) => l.status === 'pending').length,
    wonLeads: leads.filter((l) => l.status === 'won').length,
    responseRate:
      leads.length > 0
        ? Math.round((leads.filter((l) => l.status !== 'pending').length / leads.length) * 100)
        : 0,
  };

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-purple-100 px-6 py-4 animate-pulse" style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.06) 0%, rgba(118,75,162,0.06) 100%)' }}>
          <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-56 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="w-6 h-6 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-32 bg-gray-200 rounded mb-4" />
              <div className="h-3 w-full bg-gray-100 rounded mb-2" />
              <div className="h-3 w-3/4 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-1/2 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentTier = profile?.tier || 'free';
  const firstName = (auth.user?.name || '').split(' ')[0] || '';

  const loopProps: LoopCardProps = {
    vendorId: profile?.vendorId || '',
    vendorTier: currentTier,
    weekStarting,
    agentRuns,
    pendingApprovals,
    existingScoreData: scoreData,
    existingAuditData: auditData,
    agentRunsError,
    approvalsError,
    onRetry: fetchData,
  };

  return (
    <div className="space-y-6">
      <UpgradeBanner tier={currentTier} />

      <WelcomeStrip
        firstName={firstName}
        companyName={profile?.company}
        weekStarting={weekStarting}
        agentRuns={agentRuns}
        pendingApprovals={pendingApprovals}
      />

      <Loop {...loopProps} />

      <ThisWeekSection agentRuns={agentRuns} pendingApprovals={pendingApprovals} />

      {/* Existing supporting content — lifted unchanged from prior page */}
      {!hasTierAccess(currentTier, 'starter') && (
        <LeadTeaser token={getCurrentToken() || ''} />
      )}

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

      {profileViews && (
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Profile Views</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">{profileViews.thisMonth}</div>
              <div className="text-sm text-gray-600">This month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-500">{profileViews.lastMonth}</div>
              <div className="text-sm text-gray-600">Last month</div>
            </div>
            {hasTierAccess(currentTier, 'pro') ? (
              <>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{profileViews.bySource.google + profileViews.bySource.bing}</div>
                  <div className="text-sm text-gray-600">From search engines</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{profileViews.bySource.ai_referral}</div>
                  <div className="text-sm text-gray-600">From AI platforms</div>
                </div>
              </>
            ) : (
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-gray-500">
                  <Link href="/pricing" className="text-purple-600 font-medium hover:underline">Upgrade to Pro</Link> to see where your views come from.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/vendor-dashboard/quotes" className="card-hover p-4 flex items-center space-x-3">
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

        <Link href="/vendor-dashboard/products" className="card-hover p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {profile?.vendorType === 'office-equipment' ? 'Manage Products' : 'Manage Services'}
            </div>
            <div className="text-sm text-gray-500">
              {profile?.vendorType === 'office-equipment' ? 'Update your catalog' : 'Update your service listings'}
            </div>
          </div>
        </Link>

        <Link href="/vendor-dashboard/analytics" className="card-hover p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900">View Analytics</div>
            <div className="text-sm text-gray-500">Track your performance</div>
          </div>
        </Link>
      </div>

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
    </div>
  );
}
