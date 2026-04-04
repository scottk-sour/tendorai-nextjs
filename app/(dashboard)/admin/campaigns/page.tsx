'use client';

import { useEffect, useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface Campaign {
  _id: string;
  name: string;
  sector: string;
  city: string;
  tierFilter: string;
  maxFirms: number;
  emailType: string;
  status: 'draft' | 'active' | 'paused' | 'complete';
  firmsMatched: number;
  firmsContacted: number;
  emailsSent: number;
  errorCount: number;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
}

interface PreviewResult {
  totalMatching: number;
  alreadyContacted: number;
  eligible: number;
}

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

function formatDate(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

const sectorOptions = [
  { value: 'all', label: 'All Sectors' },
  { value: 'solicitor', label: 'Solicitors' },
  { value: 'accountant', label: 'Accountants' },
  { value: 'mortgage-adviser', label: 'Mortgage Advisers' },
  { value: 'estate-agent', label: 'Estate Agents' },
];

const tierOptions = [
  { value: 'all', label: 'All Tiers' },
  { value: 'free', label: 'Free Only' },
  { value: 'pro', label: 'Pro Only' },
];

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  active: 'bg-blue-100 text-blue-700',
  paused: 'bg-amber-100 text-amber-700',
  complete: 'bg-green-100 text-green-700',
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [form, setForm] = useState({
    name: '',
    sector: 'all',
    city: '',
    tierFilter: 'all',
    maxFirms: '50',
  });

  // Preview
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [previewing, setPreviewing] = useState(false);

  // Execution
  const [running, setRunning] = useState(false);
  const [runProgress, setRunProgress] = useState<{
    campaignId: string;
    status: string;
    message: string;
  } | null>(null);

  // Confirmation modal
  const [confirmModal, setConfirmModal] = useState<{ campaignId: string; firmsToContact: number } | null>(null);
  const [confirmText, setConfirmText] = useState('');

  // Feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/campaigns`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { setError('Failed to load campaigns'); return; }
      const data = await res.json();
      if (data.success) setCampaigns(data.data);
    } catch {
      setError('Network error loading campaigns');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

  const handlePreview = async () => {
    setPreviewing(true);
    setPreview(null);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/campaigns/preview`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sector: form.sector,
          city: form.city,
          tierFilter: form.tierFilter,
        }),
      });
      const data = await res.json();
      if (data.success) setPreview(data);
    } catch {
      setFeedback({ type: 'error', message: 'Failed to preview campaign' });
    } finally {
      setPreviewing(false);
    }
  };

  const handleCreate = async () => {
    if (!form.name.trim()) {
      setFeedback({ type: 'error', message: 'Campaign name is required' });
      return;
    }
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/campaigns`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', message: data.message || 'Failed to create campaign' });
        return;
      }
      setFeedback({ type: 'success', message: 'Campaign created' });
      fetchCampaigns();
      return data.data as Campaign;
    } catch {
      setFeedback({ type: 'error', message: 'Network error' });
      return null;
    }
  };

  // Step 1: Request preview count from the run endpoint (without confirmed)
  const handleRunCampaign = async (campaignId?: string) => {
    let id = campaignId;

    if (!id) {
      const created = await handleCreate();
      if (!created) return;
      id = created._id;
    }

    setFeedback(null);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/campaigns/${id}/run`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (data.requiresConfirmation) {
        setConfirmModal({ campaignId: id, firmsToContact: data.firmsToContact });
        setConfirmText('');
        return;
      }

      if (!res.ok || !data.success) {
        setFeedback({ type: 'error', message: data.message || 'Campaign failed' });
        fetchCampaigns();
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error' });
    }
  };

  // Step 2: Execute with confirmed: true after typing CONFIRM
  const handleConfirmedRun = async () => {
    if (!confirmModal) return;
    const { campaignId } = confirmModal;

    setConfirmModal(null);
    setConfirmText('');
    setRunning(true);
    setRunProgress({ campaignId, status: 'active', message: `Sending emails to ${confirmModal.firmsToContact} firms...` });

    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/campaigns/${campaignId}/run`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmed: true }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setRunProgress(null);
        setFeedback({ type: 'error', message: data.message || 'Campaign failed' });
        fetchCampaigns();
        return;
      }

      const summary = data.summary;
      let message = `Campaign complete: ${summary.emailsSent} email${summary.emailsSent !== 1 ? 's' : ''} sent to ${summary.firmsContacted} firm${summary.firmsContacted !== 1 ? 's' : ''}`;
      if (summary.errors > 0) message += ` (${summary.errors} error${summary.errors !== 1 ? 's' : ''})`;
      if (data.paused) message += `\n${data.pauseReason}`;

      setRunProgress(null);
      setFeedback({ type: data.paused ? 'error' : 'success', message });
      setForm({ name: '', sector: 'all', city: '', tierFilter: 'all', maxFirms: '50' });
      setPreview(null);
      fetchCampaigns();
    } catch {
      setRunProgress(null);
      setFeedback({ type: 'error', message: 'Network error running campaign' });
      fetchCampaigns();
    } finally {
      setRunning(false);
    }
  };

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

  // Summary stats from campaigns
  const totalContacted = campaigns.reduce((s, c) => s + (c.firmsContacted || 0), 0);
  const totalEmails = campaigns.reduce((s, c) => s + (c.emailsSent || 0), 0);
  const completedCampaigns = campaigns.filter(c => c.status === 'complete').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <p className="text-sm text-gray-500 mt-1">Create and run automated email outreach campaigns</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{campaigns.length}</div>
          <div className="text-xs text-gray-500">Total Campaigns</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{completedCampaigns}</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">{totalContacted}</div>
          <div className="text-xs text-gray-500">Firms Contacted</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-sky-600">{totalEmails}</div>
          <div className="text-xs text-gray-500">Emails Sent</div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`px-4 py-3 rounded-lg text-sm whitespace-pre-line ${feedback.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {feedback.message}
        </div>
      )}

      {/* Running Progress */}
      {runProgress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-blue-700">{runProgress.message}</span>
          </div>
          <div className="mt-3 h-2 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}

      {/* Campaign Builder */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">New Campaign</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. London Solicitors — April 2026"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
              <select
                value={form.sector}
                onChange={(e) => { setForm({ ...form, sector: e.target.value }); setPreview(null); }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {sectorOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City (optional)</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => { setForm({ ...form, city: e.target.value }); setPreview(null); }}
                placeholder="Leave blank for all"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
              <select
                value={form.tierFilter}
                onChange={(e) => { setForm({ ...form, tierFilter: e.target.value }); setPreview(null); }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {tierOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Firms</label>
              <input
                type="number"
                min={1}
                max={200}
                value={form.maxFirms}
                onChange={(e) => setForm({ ...form, maxFirms: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Preview Result */}
          {preview && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900">{preview.totalMatching}</div>
                  <div className="text-xs text-gray-500">Total Matching</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-600">{preview.alreadyContacted}</div>
                  <div className="text-xs text-gray-500">Already Contacted</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">{preview.eligible}</div>
                  <div className="text-xs text-gray-500">Eligible to Contact</div>
                </div>
              </div>
              {preview.eligible > 0 && parseInt(form.maxFirms) < preview.eligible && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Campaign will contact {Math.min(parseInt(form.maxFirms) || 50, preview.eligible)} of {preview.eligible} eligible firms
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handlePreview}
              disabled={previewing}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {previewing ? 'Checking...' : 'Preview Campaign'}
            </button>
            <button
              onClick={() => handleCreate()}
              disabled={running || !form.name.trim()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleRunCampaign()}
              disabled={running || !form.name.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {running ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running...
                </span>
              ) : (
                'Create & Run Campaign'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Campaign History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Campaign History</h2>
        </div>
        {campaigns.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-500">No campaigns yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sector / City</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matched</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacted</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emails</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Errors</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {campaigns.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <span className="capitalize">{c.sector === 'all' ? 'All sectors' : c.sector.replace(/-/g, ' ')}</span>
                      {c.city && <span className="text-gray-400 ml-1">· {c.city}</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{c.firmsMatched}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.firmsContacted}</td>
                    <td className="px-4 py-3 text-sm text-green-600 font-medium">{c.emailsSent}</td>
                    <td className="px-4 py-3 text-sm">
                      {c.errorCount > 0 ? (
                        <span className="text-red-600 font-medium">{c.errorCount}</span>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status] || 'bg-gray-100 text-gray-700'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-xs">
                      {c.startedAt ? formatDateTime(c.startedAt) : formatDate(c.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {(c.status === 'draft' || c.status === 'paused') && (
                        <button
                          onClick={() => handleRunCampaign(c._id)}
                          disabled={running}
                          className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
                        >
                          {c.status === 'paused' ? 'Resume' : 'Run'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Campaign</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 font-medium">
                  You are about to email {confirmModal.firmsToContact} real firms.
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  This cannot be undone. Each firm will receive an outreach email from scott@tendorai.com.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type <span className="font-mono font-bold">CONFIRM</span> to proceed
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="CONFIRM"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => { setConfirmModal(null); setConfirmText(''); }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmedRun}
                  disabled={confirmText !== 'CONFIRM'}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send {confirmModal.firmsToContact} Emails
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
