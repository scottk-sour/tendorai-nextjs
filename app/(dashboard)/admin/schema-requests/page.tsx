'use client';

import { useEffect, useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface SchemaRequest {
  id: string;
  vendor: {
    id: string;
    company: string;
    email: string;
    website?: string;
    tier: string;
  } | null;
  websiteUrl: string;
  cmsPlatform: string;
  status: string;
  adminNotes: string;
  completedAt: string | null;
  completedBy: string | null;
  createdAt: string;
}

interface Credentials {
  cmsLoginUrl: string;
  cmsUsername: string;
  cmsPassword: string;
  cmsPlatform: string;
}

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

const statusTabs = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'failed', label: 'Failed' },
];

const statusBadgeColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  failed: 'Failed',
};

const cmsLabels: Record<string, string> = {
  wordpress: 'WordPress',
  wix: 'Wix',
  squarespace: 'Squarespace',
  shopify: 'Shopify',
  custom: 'Custom',
  other: 'Other',
};

export default function AdminSchemaRequestsPage() {
  const [requests, setRequests] = useState<SchemaRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Credentials modal state
  const [credentialsModal, setCredentialsModal] = useState<{ requestId: string; credentials: Credentials } | null>(null);
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const [credentialsTimer, setCredentialsTimer] = useState<number>(30);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Notes editing state
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState('');

  const fetchRequests = useCallback(async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/schema-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setError('Failed to fetch schema requests');
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) setRequests(data.data);
    } catch {
      setError('Network error loading schema requests');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Auto-close credentials modal after 30 seconds
  useEffect(() => {
    if (!credentialsModal) return;
    setCredentialsTimer(30);

    const interval = setInterval(() => {
      setCredentialsTimer(prev => {
        if (prev <= 1) {
          setCredentialsModal(null);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [credentialsModal]);

  const handleViewCredentials = async (requestId: string) => {
    setCredentialsLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/schema-requests/${requestId}/credentials`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCredentialsModal({ requestId, credentials: data.data });
      }
    } catch {
      // silently fail
    } finally {
      setCredentialsLoading(false);
    }
  };

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/schema-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests(prev =>
          prev.map(r =>
            r.id === requestId
              ? { ...r, status: data.data.status, completedAt: data.data.completedAt, completedBy: data.data.completedBy }
              : r
          )
        );
      }
    } catch {
      // silently fail
    }
  };

  const handleSaveNotes = async (requestId: string) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/schema-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adminNotes: notesValue }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests(prev =>
          prev.map(r => (r.id === requestId ? { ...r, adminNotes: data.data.adminNotes } : r))
        );
        setEditingNotes(null);
      }
    } catch {
      // silently fail
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch { /* clipboard not available */ }
  };

  const filtered = requests.filter(r => activeTab === 'all' || r.status === activeTab);

  const counts = statusTabs.reduce((acc, tab) => {
    if (tab.key === 'all') {
      acc[tab.key] = requests.length;
    } else {
      acc[tab.key] = requests.filter(r => r.status === tab.key).length;
    }
    return acc;
  }, {} as Record<string, number>);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schema Install Requests</h1>
        <p className="text-gray-500 mt-1">Manage vendor schema installation requests</p>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === tab.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label} ({counts[tab.key] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Vendor</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Website</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">CMS</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Requested</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{req.vendor?.company || 'Unknown'}</div>
                    <div className="text-xs text-gray-500">{req.vendor?.email || '-'}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">
                    {req.websiteUrl}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {cmsLabels[req.cmsPlatform] || req.cmsPlatform}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${statusBadgeColors[req.status] || 'bg-gray-100 text-gray-700'}`}>
                      {statusLabels[req.status] || req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(req.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleViewCredentials(req.id)}
                        disabled={credentialsLoading}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
                      >
                        Credentials
                      </button>

                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className="px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                      </select>

                      <button
                        onClick={() => {
                          setEditingNotes(editingNotes === req.id ? null : req.id);
                          setNotesValue(req.adminNotes || '');
                        }}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                      >
                        Notes
                      </button>
                    </div>

                    {/* Inline notes editor */}
                    {editingNotes === req.id && (
                      <div className="mt-2 space-y-2">
                        <textarea
                          value={notesValue}
                          onChange={(e) => setNotesValue(e.target.value)}
                          placeholder="Admin notes..."
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveNotes(req.id)}
                            className="px-3 py-1 text-xs font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNotes(null)}
                            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Show saved notes */}
                    {req.adminNotes && editingNotes !== req.id && (
                      <p className="mt-1 text-xs text-gray-500 italic">{req.adminNotes}</p>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No schema install requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credentials Modal */}
      {credentialsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setCredentialsModal(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">CMS Credentials</h3>
              <span className="text-xs text-gray-500">Auto-closes in {credentialsTimer}s</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Platform</label>
                <p className="text-sm text-gray-900">{cmsLabels[credentialsModal.credentials.cmsPlatform] || credentialsModal.credentials.cmsPlatform}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Login URL</label>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900 flex-1 break-all">{credentialsModal.credentials.cmsLoginUrl || '-'}</p>
                  {credentialsModal.credentials.cmsLoginUrl && (
                    <button
                      onClick={() => copyToClipboard(credentialsModal.credentials.cmsLoginUrl, 'url')}
                      className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 transition shrink-0"
                    >
                      {copiedField === 'url' ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Username</label>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900 flex-1 font-mono">{credentialsModal.credentials.cmsUsername}</p>
                  <button
                    onClick={() => copyToClipboard(credentialsModal.credentials.cmsUsername, 'username')}
                    className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 transition shrink-0"
                  >
                    {copiedField === 'username' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900 flex-1 font-mono">{credentialsModal.credentials.cmsPassword}</p>
                  <button
                    onClick={() => copyToClipboard(credentialsModal.credentials.cmsPassword, 'password')}
                    className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 transition shrink-0"
                  >
                    {copiedField === 'password' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCredentialsModal(null)}
              className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
