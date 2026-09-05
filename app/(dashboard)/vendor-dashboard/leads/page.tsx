'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import TierGate, { hasTierAccess } from '@/app/components/dashboard/TierGate';

interface Lead {
  _id: string;
  service?: string;
  customer?: {
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
  status: string;
  createdAt: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  viewed: 'bg-blue-100 text-blue-700',
  contacted: 'bg-purple-100 text-purple-700',
  quoted: 'bg-indigo-100 text-indigo-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-gray-100 text-gray-500',
};

export default function LeadsPage() {
  const { getCurrentToken } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [vendorTier, setVendorTier] = useState<string>('free');
  const [loading, setLoading] = useState(true);

  const isPro = hasTierAccess(vendorTier, 'pro');

  const fetchLeads = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;
    try {
      const [leadsRes, profileRes] = await Promise.all([
        fetch(`${API_URL}/api/vendor-leads/vendor/me`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/vendors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.data?.leads || data.leads || (Array.isArray(data) ? data : []));
      }
      if (profileRes.ok) {
        const profile = await profileRes.json();
        setVendorTier(profile.tier || profile.vendor?.tier || 'free');
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const markContacted = async (leadId: string) => {
    const token = getCurrentToken();
    if (!token) return;
    try {
      await fetch(`${API_URL}/api/vendor-leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'contacted' }),
      });
      fetchLeads();
    } catch {
      // silently fail
    }
  };

  const now = new Date();
  const thisMonth = leads.filter(
    (l) => new Date(l.createdAt).getMonth() === now.getMonth() &&
           new Date(l.createdAt).getFullYear() === now.getFullYear()
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Enquiries</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-3xl font-bold text-purple-600">{thisMonth.length}</div>
          <div className="text-sm text-gray-500 mt-1">This month</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-3xl font-bold text-gray-900">{leads.length}</div>
          <div className="text-sm text-gray-500 mt-1">All time</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-3xl font-bold text-green-600">
            {leads.filter((l) => l.status === 'won').length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Won</div>
        </div>
      </div>

      {/* Lead list */}
      {leads.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-gray-400 text-5xl mb-4">📭</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No enquiries yet</h2>
          <p className="text-gray-500">
            When someone contacts you through your TendorAI profile, their enquiry will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {isPro
                        ? lead.customer?.contactName || 'Unknown'
                        : (lead.customer?.contactName || 'Unknown').charAt(0) + '•••••'}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusStyles[lead.status] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {lead.status}
                    </span>
                    <span className="text-xs text-gray-400">{timeAgo(lead.createdAt)}</span>
                  </div>

                  {lead.service && (
                    <p className="text-sm text-gray-500 mb-1">
                      Service: <span className="font-medium text-gray-700">{lead.service}</span>
                    </p>
                  )}

                  {lead.customer?.message && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {isPro
                        ? lead.customer.message.slice(0, 120) + (lead.customer.message.length > 120 ? '...' : '')
                        : lead.customer.message.slice(0, 40) + '...'}
                    </p>
                  )}

                  {isPro && (
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      {lead.customer?.email && <span>{lead.customer.email}</span>}
                      {lead.customer?.phone && <span>{lead.customer.phone}</span>}
                    </div>
                  )}

                  {!isPro && (
                    <p className="text-xs text-purple-600 mt-2 font-medium">
                      Full contact details are available on the managed programme
                    </p>
                  )}
                </div>

                {isPro && lead.status === 'pending' && (
                  <button
                    onClick={() => markContacted(lead._id)}
                    className="shrink-0 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    Mark Contacted
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
