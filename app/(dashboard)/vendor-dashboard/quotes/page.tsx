'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';
import TierGate, { hasTierAccess, TierBadge } from '@/app/components/dashboard/TierGate';

// ─── Types ────────────────────────────────────────────────────────────

interface LeadCustomer {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  message?: string;
}

interface CurrentProvider {
  name?: string;
  contractEndDate?: string;
  satisfactionLevel?: 'very-happy' | 'happy' | 'neutral' | 'unhappy' | 'very-unhappy';
}

interface VendorNote {
  note: string;
  addedAt: string;
}

interface QuoteValue {
  amount?: number;
  currency?: string;
}

interface Lead {
  _id: string;
  vendor: string;
  service?: string;
  equipmentType?: string;
  monthlyVolume?: string;
  specificVolume?: number;
  colour?: boolean | null;
  a3?: boolean | null;
  currentSetup?: string;
  currentProvider?: CurrentProvider;
  currentMonthlyCost?: number;
  features?: string[];
  timeline?: 'urgent' | 'soon' | 'planning' | 'future';
  contractPreference?: string;
  budgetRange?: string;
  customer?: LeadCustomer;
  status: string;
  viewedAt?: string;
  contactedAt?: string;
  quotedAt?: string;
  closedAt?: string;
  vendorNotes?: VendorNote[];
  quoteValue?: QuoteValue;
  reviewToken?: string;
  reviewRequested?: boolean;
  reviewRequestedAt?: string;
  reviewSubmitted?: boolean;
  createdAt: string;
  updatedAt?: string;
  // Backward-compat flat fields
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  requirements?: string;
}

interface LeadCounts {
  pending: number;
  viewed: number;
  contacted: number;
  quoted: number;
  won: number;
  lost: number;
}

// ─── Constants ────────────────────────────────────────────────────────

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

const STATUS_PIPELINE: string[] = ['pending', 'viewed', 'contacted', 'quoted'];
const STATUS_TERMINAL: string[] = ['won', 'lost'];

const LOST_REASONS = [
  { value: 'too-expensive', label: 'Too expensive' },
  { value: 'competitor', label: 'Went with competitor' },
  { value: 'no-response', label: 'No response from buyer' },
  { value: 'other', label: 'Other' },
];

// ─── Helpers ──────────────────────────────────────────────────────────

function timeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    viewed: 'bg-blue-100 text-blue-700',
    contacted: 'bg-purple-100 text-purple-700',
    quoted: 'bg-indigo-100 text-indigo-700',
    won: 'bg-green-100 text-green-700',
    lost: 'bg-gray-100 text-gray-500',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

function getServiceColor(service?: string): string {
  const colors: Record<string, string> = {
    Photocopiers: 'bg-cyan-100 text-cyan-700',
    Telecoms: 'bg-violet-100 text-violet-700',
    CCTV: 'bg-rose-100 text-rose-700',
    IT: 'bg-emerald-100 text-emerald-700',
    Security: 'bg-orange-100 text-orange-700',
    Software: 'bg-sky-100 text-sky-700',
  };
  return colors[service || ''] || 'bg-gray-100 text-gray-600';
}

function getTimelineLabel(timeline?: string): string {
  const labels: Record<string, string> = {
    urgent: 'ASAP',
    soon: '1-3 months',
    planning: '3-6 months',
    future: '6+ months',
  };
  return labels[timeline || ''] || '';
}

function getBudgetLabel(budget?: string): string {
  const labels: Record<string, string> = {
    'under-100': 'Under £100/mo',
    '100-250': '£100–£250/mo',
    '250-500': '£250–£500/mo',
    '500-1000': '£500–£1,000/mo',
    'over-1000': 'Over £1,000/mo',
    discuss: 'Prefer to discuss',
  };
  return labels[budget || ''] || '';
}

function getSatisfactionLabel(level?: string): string {
  const labels: Record<string, string> = {
    'very-happy': 'Very happy',
    happy: 'Happy',
    neutral: 'Neutral',
    unhappy: 'Unhappy',
    'very-unhappy': 'Very unhappy',
  };
  return labels[level || ''] || '';
}

function getLeadName(lead: Lead, tier: string): string {
  if (hasTierAccess(tier, 'visible')) {
    return lead.customer?.companyName || lead.businessName || lead.contactName || 'Business Inquiry';
  }
  return 'Anonymous Business';
}

function getLeadPostcode(lead: Lead, tier: string): string {
  const pc = lead.customer?.postcode || lead.postcode || '';
  if (!pc) return '';
  if (hasTierAccess(tier, 'visible')) return pc;
  // Free tier: outward code only (e.g. "CF10" from "CF10 3AT")
  return pc.split(' ')[0];
}

function getLeadEmail(lead: Lead): string {
  return lead.customer?.email || lead.email || '';
}

function getLeadPhone(lead: Lead): string {
  return lead.customer?.phone || lead.phone || '';
}

function getLeadContact(lead: Lead): string {
  return lead.customer?.contactName || lead.contactName || '';
}

function getLeadMessage(lead: Lead): string {
  return lead.customer?.message || lead.requirements || '';
}

// ─── Sub-components ───────────────────────────────────────────────────

function SkeletonCards() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card p-5 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-5 bg-gray-200 rounded w-48" />
                <div className="h-5 bg-gray-200 rounded-full w-20" />
                <div className="h-5 bg-gray-200 rounded-full w-16" />
              </div>
              <div className="h-4 bg-gray-100 rounded w-72" />
              <div className="h-4 bg-gray-100 rounded w-56" />
            </div>
            <div className="h-4 bg-gray-100 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
  active,
  onClick,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`card p-4 text-left transition-all w-full ${
        active ? 'ring-2 ring-purple-500 shadow-md' : 'hover:shadow-md'
      }`}
    >
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs font-medium text-gray-500 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </button>
  );
}

function StatusPipeline({
  lead,
  tier,
  onStatusChange,
}: {
  lead: Lead;
  tier: string;
  onStatusChange: (status: string) => void;
}) {
  const steps = STATUS_PIPELINE;
  const currentIdx = steps.indexOf(lead.status);
  const isTerminal = STATUS_TERMINAL.includes(lead.status);
  const isFree = !hasTierAccess(tier, 'visible');

  const getStepDate = (step: string): string | undefined => {
    const dateMap: Record<string, string | undefined> = {
      pending: lead.createdAt,
      viewed: lead.viewedAt,
      contacted: lead.contactedAt,
      quoted: lead.quotedAt,
    };
    return dateMap[step];
  };

  return (
    <div className="space-y-1">
      {steps.map((step, idx) => {
        const isActive = step === lead.status && !isTerminal;
        const isComplete = isTerminal || idx < currentIdx;
        const isFuture = !isTerminal && idx > currentIdx;
        const stepDate = getStepDate(step);
        const canClick = !isFree || step === 'viewed';

        return (
          <button
            key={step}
            onClick={() => canClick && onStatusChange(step)}
            disabled={!canClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              isActive
                ? 'bg-purple-50 border border-purple-200'
                : isComplete
                ? 'bg-gray-50 hover:bg-gray-100'
                : 'opacity-50'
            } ${canClick ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {/* Circle indicator */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : isComplete
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isComplete && !isActive ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-xs font-bold">{idx + 1}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium capitalize ${isActive ? 'text-purple-700' : isComplete ? 'text-gray-700' : 'text-gray-400'}`}>
                {step}
              </div>
              {stepDate && (
                <div className="text-xs text-gray-400">{timeAgo(stepDate)}</div>
              )}
            </div>

            {!canClick && isFree && (
              <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            )}
          </button>
        );
      })}

      {/* Won / Lost buttons */}
      <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
        <button
          onClick={() => onStatusChange('won')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            lead.status === 'won'
              ? 'bg-green-600 text-white'
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          Won
          {lead.closedAt && lead.status === 'won' && (
            <span className="block text-xs opacity-75">{timeAgo(lead.closedAt)}</span>
          )}
        </button>
        <button
          onClick={() => onStatusChange('lost')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            lead.status === 'lost'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          Lost
          {lead.closedAt && lead.status === 'lost' && (
            <span className="block text-xs opacity-75">{timeAgo(lead.closedAt)}</span>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────

export default function QuotesPage() {
  const { getCurrentToken } = useAuth();

  // State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<LeadCounts>({ pending: 0, viewed: 0, contacted: 0, quoted: 0, won: 0, lost: 0 });
  const [vendorTier, setVendorTier] = useState<string>('free');
  const [loading, setLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'status'>('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Detail view state
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [wonAmount, setWonAmount] = useState('');
  const [showWonInput, setShowWonInput] = useState(false);
  const [showLostReason, setShowLostReason] = useState(false);
  const [requestingReview, setRequestingReview] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const selectedLead = useMemo(
    () => leads.find((l) => l._id === selectedLeadId) || null,
    [leads, selectedLeadId]
  );

  // ─── Data Fetching ──────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const [leadsRes, profileRes] = await Promise.all([
        fetch(`${API_URL}/api/vendor-leads/vendor/me?limit=100`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/vendors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.data?.leads || data.leads || []);
        if (data.data?.counts) setCounts(data.data.counts);
      }

      if (profileRes.ok) {
        const profile = await profileRes.json();
        const vendor = profile.data || profile.vendor || profile;
        setVendorTier(vendor.tier || vendor.account?.tier || 'free');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ─── Actions ────────────────────────────────────────────────────

  const updateLeadStatus = useCallback(
    async (leadId: string, newStatus: string, extra?: { note?: string; quoteValue?: { amount: number; currency: string } }) => {
      const token = getCurrentToken();
      if (!token) return;

      setUpdatingStatus(true);
      try {
        const body: Record<string, unknown> = { status: newStatus };
        if (extra?.note) body.note = extra.note;
        if (extra?.quoteValue) body.quoteValue = extra.quoteValue;

        const response = await fetch(`${API_URL}/api/vendor-leads/${leadId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const result = await response.json();
          const updatedLead = result.data || result.lead;

          setLeads((prev) =>
            prev.map((lead) => {
              if (lead._id !== leadId) return lead;
              // If server returned the full lead, use it; otherwise patch locally
              if (updatedLead) return updatedLead;
              const patch: Partial<Lead> = { status: newStatus };
              if (newStatus === 'viewed' && !lead.viewedAt) patch.viewedAt = new Date().toISOString();
              if (newStatus === 'contacted' && !lead.contactedAt) patch.contactedAt = new Date().toISOString();
              if (newStatus === 'quoted' && !lead.quotedAt) patch.quotedAt = new Date().toISOString();
              if (newStatus === 'won' || newStatus === 'lost') patch.closedAt = new Date().toISOString();
              if (extra?.quoteValue) patch.quoteValue = extra.quoteValue;
              if (extra?.note) {
                patch.vendorNotes = [...(lead.vendorNotes || []), { note: extra.note, addedAt: new Date().toISOString() }];
              }
              return { ...lead, ...patch };
            })
          );

          // Re-fetch counts
          const countsRes = await fetch(`${API_URL}/api/vendor-leads/vendor/me?limit=1`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (countsRes.ok) {
            const d = await countsRes.json();
            if (d.data?.counts) setCounts(d.data.counts);
          }
        }
      } catch (error) {
        console.error('Failed to update status:', error);
      } finally {
        setUpdatingStatus(false);
      }
    },
    [getCurrentToken]
  );

  const addNote = useCallback(async () => {
    if (!selectedLead || !newNote.trim()) return;
    setAddingNote(true);
    await updateLeadStatus(selectedLead._id, selectedLead.status, { note: newNote.trim() });
    setNewNote('');
    setAddingNote(false);
  }, [selectedLead, newNote, updateLeadStatus]);

  const handleWon = useCallback(async () => {
    if (!selectedLead) return;
    const amount = parseFloat(wonAmount);
    const extra: { quoteValue?: { amount: number; currency: string } } = {};
    if (!isNaN(amount) && amount > 0) {
      extra.quoteValue = { amount, currency: 'GBP' };
    }
    await updateLeadStatus(selectedLead._id, 'won', extra);
    setShowWonInput(false);
    setWonAmount('');
  }, [selectedLead, wonAmount, updateLeadStatus]);

  const handleLost = useCallback(
    async (reason: string) => {
      if (!selectedLead) return;
      await updateLeadStatus(selectedLead._id, 'lost', { note: `Lost reason: ${reason}` });
      setShowLostReason(false);
    },
    [selectedLead, updateLeadStatus]
  );

  const requestReview = useCallback(async () => {
    if (!selectedLead) return;
    const token = getCurrentToken();
    if (!token) return;

    setRequestingReview(true);
    try {
      const response = await fetch(`${API_URL}/api/reviews/request-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ leadId: selectedLead._id }),
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead._id === selectedLead._id
              ? { ...lead, reviewRequested: true, reviewRequestedAt: new Date().toISOString() }
              : lead
          )
        );
      }
    } catch (error) {
      console.error('Failed to request review:', error);
    } finally {
      setRequestingReview(false);
    }
  }, [selectedLead, getCurrentToken]);

  // ─── Derived Data ───────────────────────────────────────────────

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      let matchesStatus = false;
      if (filterStatus === 'all') matchesStatus = true;
      else if (filterStatus === 'in-progress') matchesStatus = ['viewed', 'contacted', 'quoted'].includes(lead.status);
      else matchesStatus = lead.status === filterStatus;
      if (!matchesStatus) return false;
      if (!searchTerm) return true;

      const q = searchTerm.toLowerCase();
      const name = (lead.customer?.companyName || lead.businessName || '').toLowerCase();
      const contact = (lead.customer?.contactName || lead.contactName || '').toLowerCase();
      const pc = (lead.customer?.postcode || lead.postcode || '').toLowerCase();
      const svc = (lead.service || '').toLowerCase();
      return name.includes(q) || contact.includes(q) || pc.includes(q) || svc.includes(q);
    });
  }, [leads, filterStatus, searchTerm]);

  const sortedLeads = useMemo(() => {
    const sorted = [...filteredLeads];
    if (sortBy === 'newest') sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sortBy === 'oldest') sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    else if (sortBy === 'status') {
      const order = ['pending', 'viewed', 'contacted', 'quoted', 'won', 'lost'];
      sorted.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
    }
    return sorted;
  }, [filteredLeads, sortBy]);

  const wonRevenue = useMemo(() => {
    return leads
      .filter((l) => l.status === 'won' && l.quoteValue?.amount)
      .reduce((sum, l) => sum + (l.quoteValue?.amount || 0), 0);
  }, [leads]);

  const responseRate = useMemo(() => {
    if (leads.length === 0) return 0;
    const within24h = leads.filter((l) => {
      if (!l.viewedAt) return false;
      const diff = new Date(l.viewedAt).getTime() - new Date(l.createdAt).getTime();
      return diff <= 86400000; // 24 hours
    }).length;
    return Math.round((within24h / leads.length) * 100);
  }, [leads]);

  const avgResponseHours = useMemo(() => {
    const viewed = leads.filter((l) => l.viewedAt);
    if (viewed.length === 0) return 0;
    const totalHrs = viewed.reduce((sum, l) => {
      const diff = new Date(l.viewedAt!).getTime() - new Date(l.createdAt).getTime();
      return sum + diff / 3600000;
    }, 0);
    return Math.round((totalHrs / viewed.length) * 10) / 10;
  }, [leads]);

  const isFree = !hasTierAccess(vendorTier, 'visible');

  // ─── Loading State ──────────────────────────────────────────────

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-7 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-72 mt-2 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-12 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-16" />
            </div>
          ))}
        </div>
        <SkeletonCards />
      </div>
    );
  }

  // ─── Empty State ────────────────────────────────────────────────

  if (leads.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
          <p className="text-gray-600 mt-1">Manage leads from businesses looking for your services</p>
        </div>
        <div className="card p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">No quote requests yet</h2>
          <p className="text-gray-500 mb-1">Leads will appear here when businesses in your area search for your services.</p>
          <p className="text-sm text-gray-400 mb-6">Tip: Complete your profile to appear in more searches.</p>
          <Link href="/vendor-dashboard/analytics" className="btn-primary py-2 px-5 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            View Analytics
          </Link>
        </div>
      </div>
    );
  }

  // ─── Detail View ────────────────────────────────────────────────

  if (selectedLead) {
    const email = getLeadEmail(selectedLead);
    const phone = getLeadPhone(selectedLead);
    const contact = getLeadContact(selectedLead);
    const message = getLeadMessage(selectedLead);
    const postcode = getLeadPostcode(selectedLead, vendorTier);

    return (
      <div className="space-y-6">
        {/* Back button + header */}
        <div>
          <button
            onClick={() => {
              setSelectedLeadId(null);
              setShowWonInput(false);
              setShowLostReason(false);
              setNewNote('');
            }}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to leads
          </button>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">
              {getLeadName(selectedLead, vendorTier)}
            </h1>
            {selectedLead.service && (
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getServiceColor(selectedLead.service)}`}>
                {selectedLead.service}
              </span>
            )}
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${getStatusColor(selectedLead.status)}`}>
              {selectedLead.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Received {timeAgo(selectedLead.createdAt)}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* ─── Left Column ─── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Buyer Details */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Buyer Details</h3>
              {isFree ? (
                <TierGate
                  currentTier={vendorTier}
                  requiredTier="visible"
                  featureName="See who this buyer is"
                  featureDescription="Upgrade to view company name, contact details, and respond to this lead."
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Company</div>
                      <div className="font-medium">Acme Corp Ltd</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Contact</div>
                      <div className="font-medium">John Smith</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Email</div>
                      <div className="font-medium">john@example.com</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Phone</div>
                      <div className="font-medium">07700 900000</div>
                    </div>
                  </div>
                </TierGate>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {(selectedLead.customer?.companyName || selectedLead.businessName) && (
                    <div>
                      <div className="text-gray-500">Company</div>
                      <div className="font-medium">{selectedLead.customer?.companyName || selectedLead.businessName}</div>
                    </div>
                  )}
                  {contact && (
                    <div>
                      <div className="text-gray-500">Contact</div>
                      <div className="font-medium">{contact}</div>
                    </div>
                  )}
                  {email && (
                    <div>
                      <div className="text-gray-500">Email</div>
                      <a href={`mailto:${email}`} className="font-medium text-purple-600 hover:underline">{email}</a>
                    </div>
                  )}
                  {phone && (
                    <div>
                      <div className="text-gray-500">Phone</div>
                      <a href={`tel:${phone}`} className="font-medium text-purple-600 hover:underline">{phone}</a>
                    </div>
                  )}
                  {postcode && (
                    <div>
                      <div className="text-gray-500">Location</div>
                      <div className="font-medium">{postcode}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-4">
                {/* Service + Equipment */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedLead.service && (
                    <div>
                      <div className="text-gray-500">Service Category</div>
                      <div className="font-medium">{selectedLead.service}</div>
                    </div>
                  )}
                  {selectedLead.equipmentType && (
                    <div>
                      <div className="text-gray-500">Equipment Type</div>
                      <div className="font-medium">{selectedLead.equipmentType}</div>
                    </div>
                  )}
                </div>

                {/* Volume */}
                {(selectedLead.specificVolume || selectedLead.monthlyVolume) && (
                  <div className="text-sm">
                    <div className="text-gray-500">Monthly Volume</div>
                    <div className="font-medium">
                      {selectedLead.specificVolume
                        ? `${selectedLead.specificVolume.toLocaleString()} pages/mo`
                        : selectedLead.monthlyVolume}
                    </div>
                  </div>
                )}

                {/* Colour / A3 (photocopiers) */}
                {(selectedLead.colour !== null && selectedLead.colour !== undefined) || (selectedLead.a3 !== null && selectedLead.a3 !== undefined) ? (
                  <div className="flex gap-3">
                    {selectedLead.colour !== null && selectedLead.colour !== undefined && (
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${selectedLead.colour ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-600'}`}>
                        {selectedLead.colour ? 'Colour required' : 'Mono only'}
                      </span>
                    )}
                    {selectedLead.a3 !== null && selectedLead.a3 !== undefined && (
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${selectedLead.a3 ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-600'}`}>
                        {selectedLead.a3 ? 'A3 required' : 'A4 only'}
                      </span>
                    )}
                  </div>
                ) : null}

                {/* Features */}
                {selectedLead.features && selectedLead.features.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1.5">Features Required</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLead.features.map((f) => (
                        <span key={f} className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline + Budget */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedLead.timeline && (
                    <div>
                      <div className="text-gray-500">Timeline</div>
                      <div className="font-medium">
                        {selectedLead.timeline === 'urgent' && (
                          <span className="text-red-600">{getTimelineLabel(selectedLead.timeline)}</span>
                        )}
                        {selectedLead.timeline !== 'urgent' && getTimelineLabel(selectedLead.timeline)}
                      </div>
                    </div>
                  )}
                  {selectedLead.budgetRange && (
                    <div>
                      <div className="text-gray-500">Budget Range</div>
                      <div className="font-medium">{getBudgetLabel(selectedLead.budgetRange)}</div>
                    </div>
                  )}
                </div>

                {/* Current Provider */}
                {selectedLead.currentProvider?.name && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
                    <div className="text-gray-500 font-medium">Current Provider</div>
                    <div>{selectedLead.currentProvider.name}</div>
                    {selectedLead.currentProvider.contractEndDate && (
                      <div className="text-gray-500">
                        Contract ends: {new Date(selectedLead.currentProvider.contractEndDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                      </div>
                    )}
                    {selectedLead.currentProvider.satisfactionLevel && (
                      <div className="text-gray-500">
                        Satisfaction: {getSatisfactionLabel(selectedLead.currentProvider.satisfactionLevel)}
                      </div>
                    )}
                  </div>
                )}

                {/* Current monthly cost */}
                {selectedLead.currentMonthlyCost !== undefined && selectedLead.currentMonthlyCost !== null && (
                  <div className="text-sm">
                    <div className="text-gray-500">Current Monthly Cost</div>
                    <div className="font-medium">£{selectedLead.currentMonthlyCost.toLocaleString()}/mo</div>
                  </div>
                )}

                {/* Customer message */}
                {message && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Message</div>
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{message}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Notes</h3>
              <p className="text-xs text-gray-400 mb-3">Only visible to you</p>

              {/* Existing notes */}
              {selectedLead.vendorNotes && selectedLead.vendorNotes.length > 0 && (
                <div className="space-y-2 mb-4">
                  {selectedLead.vendorNotes.map((n, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm">
                      <p className="text-gray-700">{n.note}</p>
                      <p className="text-xs text-gray-400 mt-1">{timeAgo(n.addedAt)}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add note */}
              <div className="flex gap-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  rows={2}
                  className="input flex-1 resize-none"
                />
                <button
                  onClick={addNote}
                  disabled={!newNote.trim() || addingNote}
                  className="btn-primary px-4 self-end disabled:opacity-50"
                >
                  {addingNote ? '...' : 'Add'}
                </button>
              </div>
            </div>
          </div>

          {/* ─── Right Column ─── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Pipeline */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Status Pipeline</h3>
              <StatusPipeline
                lead={selectedLead}
                tier={vendorTier}
                onStatusChange={(status) => {
                  if (status === 'won') {
                    setShowWonInput(true);
                    setShowLostReason(false);
                  } else if (status === 'lost') {
                    setShowLostReason(true);
                    setShowWonInput(false);
                  } else {
                    setShowWonInput(false);
                    setShowLostReason(false);
                    updateLeadStatus(selectedLead._id, status);
                  }
                }}
              />

              {/* Won amount input */}
              {showWonInput && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg space-y-2">
                  <label className="text-sm font-medium text-green-800">Quote value (optional)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                      <input
                        type="number"
                        value={wonAmount}
                        onChange={(e) => setWonAmount(e.target.value)}
                        placeholder="0.00"
                        className="input pl-7 w-full"
                      />
                    </div>
                    <button onClick={handleWon} disabled={updatingStatus} className="btn-primary px-4 disabled:opacity-50">
                      {updatingStatus ? '...' : 'Mark Won'}
                    </button>
                  </div>
                </div>
              )}

              {/* Lost reason */}
              {showLostReason && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg space-y-2">
                  <label className="text-sm font-medium text-gray-700">Reason for losing</label>
                  <div className="space-y-1">
                    {LOST_REASONS.map((r) => (
                      <button
                        key={r.value}
                        onClick={() => handleLost(r.label)}
                        disabled={updatingStatus}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {hasTierAccess(vendorTier, 'visible') ? (
                  <>
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="flex items-center gap-3 w-full px-4 py-2.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Email
                      </a>
                    )}
                    {phone && (
                      <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-3 w-full px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 w-full px-4 py-2.5 bg-gray-50 text-gray-400 rounded-lg text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Send Email</span>
                      <TierBadge requiredTier="visible" />
                    </div>
                    <div className="flex items-center gap-3 w-full px-4 py-2.5 bg-gray-50 text-gray-400 rounded-lg text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Call</span>
                      <TierBadge requiredTier="visible" />
                    </div>
                  </>
                )}

                {selectedLead.status !== 'won' && selectedLead.status !== 'lost' && (
                  <>
                    <button
                      onClick={() => { setShowWonInput(true); setShowLostReason(false); }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mark as Won
                    </button>
                    <button
                      onClick={() => { setShowLostReason(true); setShowWonInput(false); }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mark as Lost
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* AI Insight (Verified only) */}
            <TierGate
              currentTier={vendorTier}
              requiredTier="verified"
              featureName="AI Lead Insights"
              featureDescription="Get AI-powered insights and tips for each lead."
            >
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI Insight
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>This buyer searched for <span className="font-medium text-gray-900">{selectedLead.service || 'your services'}</span> in <span className="font-medium text-gray-900">{postcode || 'your area'}</span>.</p>
                  <p>Average response time for {selectedLead.service || 'similar'} leads: <span className="font-medium text-gray-900">{avgResponseHours || '4.2'} hours</span>.</p>
                  <p className="text-purple-600 font-medium">Tip: Leads responded to within 2 hours are 3x more likely to convert.</p>
                </div>
              </div>
            </TierGate>

            {/* Review Request (won leads only) */}
            {selectedLead.status === 'won' && (email || selectedLead.customer?.email) && (
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Request a Review</h3>
                {selectedLead.reviewSubmitted ? (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-3 rounded-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Review Received</span>
                  </div>
                ) : selectedLead.reviewRequested ? (
                  <div className="flex items-center justify-between text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Review Requested</span>
                    </div>
                    {selectedLead.reviewRequestedAt && (
                      <span className="text-xs text-gray-400">{timeAgo(selectedLead.reviewRequestedAt)}</span>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={requestReview}
                      disabled={requestingReview}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
                    >
                      {requestingReview ? (
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )}
                      {requestingReview ? 'Sending...' : 'Request Review'}
                    </button>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      Customer will receive an email with a link to leave a verified review.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── List View (default) ────────────────────────────────────────

  const inProgress = counts.viewed + counts.contacted + counts.quoted;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
        <p className="text-gray-600 mt-1">Manage leads from businesses looking for your services</p>
      </div>

      {/* Free Tier Upgrade Banner */}
      {isFree && counts.pending > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">
                You have {counts.pending} new lead{counts.pending !== 1 ? 's' : ''} waiting
              </h3>
              <p className="text-purple-100 text-sm mt-0.5">
                Upgrade to Visible (£99/month) to see who they are and respond.
              </p>
            </div>
            <Link
              href="/vendor-dashboard/settings?tab=subscription"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-sm shrink-0"
            >
              Upgrade Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          label="New Leads"
          value={counts.pending}
          color="text-amber-500"
          active={filterStatus === 'pending'}
          onClick={() => setFilterStatus(filterStatus === 'pending' ? 'all' : 'pending')}
        />
        <StatCard
          label="In Progress"
          value={inProgress}
          color="text-blue-500"
          active={filterStatus === 'in-progress'}
          onClick={() => {
            // Toggle a virtual "in-progress" filter
            if (filterStatus === 'in-progress') {
              setFilterStatus('all');
            } else {
              setFilterStatus('in-progress');
            }
          }}
        />
        <StatCard
          label="Won"
          value={counts.won}
          sub={wonRevenue > 0 ? `£${wonRevenue.toLocaleString()}` : undefined}
          color="text-green-500"
          active={filterStatus === 'won'}
          onClick={() => setFilterStatus(filterStatus === 'won' ? 'all' : 'won')}
        />
        <StatCard
          label="Lost"
          value={counts.lost}
          color="text-gray-400"
          active={filterStatus === 'lost'}
          onClick={() => setFilterStatus(filterStatus === 'lost' ? 'all' : 'lost')}
        />
        <StatCard
          label="Response Rate"
          value={`${responseRate}%`}
          color="text-purple-500"
          active={false}
          onClick={() => {}}
        />
        <StatCard
          label="Avg Response"
          value={avgResponseHours > 0 ? `${avgResponseHours}h` : '—'}
          color="text-indigo-500"
          active={false}
          onClick={() => {}}
        />
      </div>

      {/* Search + Sort */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, postcode, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'status')}
            className="input w-full sm:w-40"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="status">By status</option>
          </select>
        </div>
      </div>

      {/* Lead Cards */}
      {sortedLeads.length === 0 ? (
        <div className="card p-8 text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="font-medium">No leads match your filters</p>
          <button onClick={() => { setFilterStatus('all'); setSearchTerm(''); }} className="text-sm text-purple-600 hover:underline mt-1">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedLeads.map((lead) => {
            const isNew = Date.now() - new Date(lead.createdAt).getTime() < 86400000;
            const isUrgent = Date.now() - new Date(lead.createdAt).getTime() < 7200000;
            const leadMessage = getLeadMessage(lead);
            const leadPostcode = getLeadPostcode(lead, vendorTier);

            return (
              <button
                key={lead._id}
                onClick={() => setSelectedLeadId(lead._id)}
                className="card card-hover p-5 w-full text-left transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Row 1: Name + badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 truncate">
                        {getLeadName(lead, vendorTier)}
                      </span>
                      {lead.service && (
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getServiceColor(lead.service)}`}>
                          {lead.service}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      {isUrgent && lead.status === 'pending' && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-600 animate-pulse">
                          Urgent
                        </span>
                      )}
                      {isNew && !isUrgent && lead.status === 'pending' && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                          New
                        </span>
                      )}
                    </div>

                    {/* Row 2: Meta info */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-gray-500">
                      {leadPostcode && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {leadPostcode}
                        </span>
                      )}
                      {lead.specificVolume && (
                        <span>{lead.specificVolume.toLocaleString()} pages/mo</span>
                      )}
                      {lead.timeline && (
                        <span className={lead.timeline === 'urgent' ? 'text-red-500 font-medium' : ''}>
                          {getTimelineLabel(lead.timeline)}
                        </span>
                      )}
                    </div>

                    {/* Row 3: Message preview */}
                    {leadMessage && (
                      <p className="text-sm text-gray-400 mt-1.5 line-clamp-1">
                        {leadMessage.length > 100 ? leadMessage.slice(0, 100) + '...' : leadMessage}
                      </p>
                    )}
                  </div>

                  {/* Right: time ago */}
                  <div className="text-right shrink-0">
                    <div className="text-xs text-gray-400">{timeAgo(lead.createdAt)}</div>
                    {lead.quoteValue?.amount && lead.status === 'won' && (
                      <div className="text-sm font-semibold text-green-600 mt-1">
                        £{lead.quoteValue.amount.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
