'use client';

import { useState, useEffect, useCallback } from 'react';
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
  monthlyVolume?: number;
  status: string;
  createdAt: string;
  // Review fields
  reviewRequested?: boolean;
  reviewRequestedAt?: string;
  reviewSubmitted?: boolean;
  // Customer object (from VendorLead model)
  customer?: {
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    postcode?: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const STATUS_OPTIONS = ['pending', 'viewed', 'contacted', 'quoted', 'won', 'lost'];

export default function QuotesPage() {
  const { getCurrentToken } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [requestingReview, setRequestingReview] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/vendor-leads/vendor/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data.data?.leads || data.leads || []);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    const token = getCurrentToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/vendor-leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead._id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
        if (selectedLead?._id === leadId) {
          setSelectedLead((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const requestReview = async (leadId: string) => {
    const token = getCurrentToken();
    if (!token) return;

    setRequestingReview(leadId);
    try {
      const response = await fetch(`${API_URL}/api/reviews/request-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ leadId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the lead in state
        setLeads((prev) =>
          prev.map((lead) =>
            lead._id === leadId
              ? { ...lead, reviewRequested: true, reviewRequestedAt: new Date().toISOString() }
              : lead
          )
        );
        if (selectedLead?._id === leadId) {
          setSelectedLead((prev) =>
            prev ? { ...prev, reviewRequested: true, reviewRequestedAt: new Date().toISOString() } : null
          );
        }
        alert(`Review request sent to ${data.sentTo || 'customer'}`);
      } else {
        alert(data.error || data.message || 'Failed to send review request');
      }
    } catch (error) {
      console.error('Failed to request review:', error);
      alert('Failed to send review request. Please try again.');
    } finally {
      setRequestingReview(null);
    }
  };

  // Filter and search
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      lead.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.postcode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort by date descending
  const sortedLeads = [...filteredLeads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      viewed: 'bg-blue-100 text-blue-700',
      contacted: 'bg-purple-100 text-purple-700',
      quoted: 'bg-indigo-100 text-indigo-700',
      won: 'bg-green-100 text-green-700',
      lost: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
        <p className="text-gray-600 mt-1">Manage leads from businesses looking for your services</p>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, postcode, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input w-full sm:w-40"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATUS_OPTIONS.map((status) => {
          const count = leads.filter((l) => l.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(filterStatus === status ? 'all' : status)}
              className={`card p-3 text-center transition-all ${
                filterStatus === status ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="text-lg font-bold text-gray-900">{count}</div>
              <div className="text-xs text-gray-500 capitalize">{status}</div>
            </button>
          );
        })}
      </div>

      {/* Leads List */}
      <div className="card">
        {sortedLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {searchTerm || filterStatus !== 'all' ? (
              <p>No leads match your filters</p>
            ) : (
              <>
                <p>No quote requests yet</p>
                <p className="text-sm mt-1">Requests from businesses will appear here</p>
              </>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedLeads.map((lead) => (
              <div
                key={lead._id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedLead(lead)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 truncate">
                        {lead.businessName || lead.contactName || 'Business Inquiry'}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-600">
                      {lead.service && <span>{lead.service}</span>}
                      {lead.postcode && (
                        <span className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {lead.postcode}
                        </span>
                      )}
                      {lead.monthlyVolume && (
                        <span>{lead.monthlyVolume.toLocaleString()} pages/month</span>
                      )}
                    </div>
                    {lead.requirements && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{lead.requirements}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString('en-GB')}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {new Date(lead.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Quote Request Details</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {selectedLead.businessName || selectedLead.contactName || 'Business Inquiry'}
                </h4>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(selectedLead.status)}`}>
                  {selectedLead.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedLead.contactName && (
                  <div>
                    <div className="text-gray-500">Contact</div>
                    <div className="font-medium">{selectedLead.contactName}</div>
                  </div>
                )}
                {selectedLead.email && (
                  <div>
                    <div className="text-gray-500">Email</div>
                    <a href={`mailto:${selectedLead.email}`} className="font-medium link">
                      {selectedLead.email}
                    </a>
                  </div>
                )}
                {selectedLead.phone && (
                  <div>
                    <div className="text-gray-500">Phone</div>
                    <a href={`tel:${selectedLead.phone}`} className="font-medium link">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
                {selectedLead.postcode && (
                  <div>
                    <div className="text-gray-500">Postcode</div>
                    <div className="font-medium">{selectedLead.postcode}</div>
                  </div>
                )}
                {selectedLead.service && (
                  <div>
                    <div className="text-gray-500">Service</div>
                    <div className="font-medium">{selectedLead.service}</div>
                  </div>
                )}
                {selectedLead.monthlyVolume && (
                  <div>
                    <div className="text-gray-500">Monthly Volume</div>
                    <div className="font-medium">{selectedLead.monthlyVolume.toLocaleString()} pages</div>
                  </div>
                )}
                <div>
                  <div className="text-gray-500">Received</div>
                  <div className="font-medium">
                    {new Date(selectedLead.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              {selectedLead.requirements && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Requirements</div>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedLead.requirements}</p>
                </div>
              )}

              {/* Status Update */}
              <div>
                <div className="text-sm text-gray-500 mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateLeadStatus(selectedLead._id, status)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        selectedLead.status === status
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex gap-3 pt-2">
                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex-1 btn-primary py-2 text-center"
                  >
                    Send Email
                  </a>
                )}
                {selectedLead.phone && (
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="flex-1 btn-secondary py-2 text-center"
                  >
                    Call
                  </a>
                )}
              </div>

              {/* Request Review Button */}
              {(selectedLead.email || selectedLead.customer?.email) && (
                <div className="border-t border-gray-200 pt-4 mt-4">
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
                        <span>Review Requested</span>
                      </div>
                      {selectedLead.reviewRequestedAt && (
                        <span className="text-sm text-gray-500">
                          {new Date(selectedLead.reviewRequestedAt).toLocaleDateString('en-GB')}
                        </span>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => requestReview(selectedLead._id)}
                      disabled={requestingReview === selectedLead._id}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {requestingReview === selectedLead._id ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Request Review
                        </>
                      )}
                    </button>
                  )}
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Customer will receive an email with a link to leave a verified review.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
