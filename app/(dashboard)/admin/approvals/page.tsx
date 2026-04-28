'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

const STATUS_TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'executed', label: 'Executed' },
  { key: 'failed', label: 'Failed' },
] as const;

type StatusKey = typeof STATUS_TABS[number]['key'];

const AGENT_OPTIONS = [
  'reconnaissance',
  'detective',
  'writer',
  'listings',
  'reviews',
  'builder',
  'reporter',
  'manual',
] as const;

const ITEM_TYPE_OPTIONS = [
  'schema_change',
  'content_draft',
  'directory_submission',
  'review_request_batch',
  'press_release',
  'outreach_pitch',
  'other',
] as const;

const ITEM_TYPE_LABELS: Record<string, string> = {
  schema_change: 'Schema change',
  content_draft: 'Content draft',
  directory_submission: 'Directory submission',
  review_request_batch: 'Review request batch',
  press_release: 'Press release',
  outreach_pitch: 'Outreach pitch',
  other: 'Other',
};

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  executed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

const PAGE_LIMIT = 20;

interface ApprovalListItem {
  _id?: string;
  id?: string;
  vendorId?: string | { _id: string; company?: string };
  agentName: string;
  itemType: string;
  title: string;
  status: string;
  createdAt: string;
  source?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

function getToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('admin_token') || '';
}

function getId(item: ApprovalListItem): string {
  return item._id || item.id || '';
}

function getVendorLabel(vendorId: ApprovalListItem['vendorId']): string {
  if (!vendorId) return '—';
  if (typeof vendorId === 'string') return vendorId;
  return vendorId.company || vendorId._id || '—';
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '—';
  const diffSec = Math.round((Date.now() - then) / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString('en-GB');
}

export default function AdminApprovalsPage() {
  const router = useRouter();

  const [items, setItems] = useState<ApprovalListItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: PAGE_LIMIT, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<StatusKey>('pending');
  const [agentFilter, setAgentFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [vendorFilter, setVendorFilter] = useState<string>('');
  const [vendorFilterDraft, setVendorFilterDraft] = useState<string>('');
  const [page, setPage] = useState(1);

  const [actionId, setActionId] = useState<string | null>(null);
  const [reasonModal, setReasonModal] = useState<{ id: string; mode: 'approve' | 'reject' } | null>(null);
  const [reasonText, setReasonText] = useState('');
  const [submittingReason, setSubmittingReason] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchApprovals = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = getToken();
      const params = new URLSearchParams();
      params.set('status', activeTab);
      params.set('page', String(page));
      params.set('limit', String(PAGE_LIMIT));
      if (agentFilter) params.set('agentName', agentFilter);
      if (typeFilter) params.set('itemType', typeFilter);
      if (vendorFilter) params.set('vendorId', vendorFilter);

      const res = await fetch(`${API_URL}/api/admin/approvals?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        setError(`Failed to fetch approvals (${res.status})`);
        return;
      }

      const data = await res.json();
      if (data && data.success === false) {
        setError(data.error || 'Failed to fetch approvals');
        return;
      }

      const fetchedItems: ApprovalListItem[] = Array.isArray(data?.items) ? data.items : [];
      const fetchedPagination: PaginationInfo = data?.pagination ?? { page, limit: PAGE_LIMIT, total: fetchedItems.length, pages: 1 };

      setItems(fetchedItems);
      setPagination(fetchedPagination);
    } catch {
      setError('Network error loading approvals.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, agentFilter, typeFilter, vendorFilter, page, router]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  // Reset to page 1 when filters or tab change
  useEffect(() => {
    setPage(1);
  }, [activeTab, agentFilter, typeFilter, vendorFilter]);

  const submitVendorFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setVendorFilter(vendorFilterDraft.trim());
  };

  const clearVendorFilter = () => {
    setVendorFilterDraft('');
    setVendorFilter('');
  };

  const openApprove = (id: string) => {
    setReasonText('');
    setReasonModal({ id, mode: 'approve' });
  };

  const openReject = (id: string) => {
    setReasonText('');
    setReasonModal({ id, mode: 'reject' });
  };

  const closeReasonModal = () => {
    if (submittingReason) return;
    setReasonModal(null);
    setReasonText('');
  };

  const submitReason = async () => {
    if (!reasonModal) return;
    const trimmed = reasonText.trim();
    if (reasonModal.mode === 'reject' && !trimmed) return;

    setSubmittingReason(true);
    setActionId(reasonModal.id);
    try {
      const token = getToken();
      const endpoint = reasonModal.mode === 'approve' ? 'approve' : 'reject';
      const body: Record<string, string> = {};
      if (trimmed) body.reason = trimmed;

      const res = await fetch(`${API_URL}/api/admin/approvals/${reasonModal.id}/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        showToast(errData?.error || `Failed to ${reasonModal.mode} (${res.status})`);
        return;
      }

      showToast(reasonModal.mode === 'approve' ? 'Approval recorded' : 'Rejection recorded');
      setReasonModal(null);
      setReasonText('');
      fetchApprovals();
    } catch {
      showToast('Network error — please retry');
    } finally {
      setSubmittingReason(false);
      setActionId(null);
    }
  };

  const goPrev = () => {
    if (pagination.page > 1) setPage(pagination.page - 1);
  };

  const goNext = () => {
    if (pagination.page < pagination.pages) setPage(pagination.page + 1);
  };

  const emptyMessage =
    activeTab === 'pending'
      ? 'No items waiting for approval. Items will appear here when agents draft work that needs your sign-off.'
      : 'No items in this status yet.';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approval Queue</h1>
        <p className="text-gray-500 mt-1">Review and decide on agent-drafted work before it ships.</p>
      </div>

      {/* Status tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === tab.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && pagination.total > 0 ? ` (${pagination.total})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Agent</label>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
              <option value="">All agents</option>
              {AGENT_OPTIONS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
              <option value="">All types</option>
              {ITEM_TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {ITEM_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Vendor ID</label>
            <form onSubmit={submitVendorFilter} className="flex gap-2">
              <input
                type="text"
                value={vendorFilterDraft}
                onChange={(e) => setVendorFilterDraft(e.target.value)}
                placeholder="Paste vendor ID"
                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              {vendorFilter ? (
                <button
                  type="button"
                  onClick={clearVendorFilter}
                  className="px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Clear
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-3 py-2 text-sm font-medium rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
                >
                  Apply
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center justify-between gap-4">
          <span>{error}</span>
          <button
            type="button"
            onClick={fetchApprovals}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Vendor</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Agent</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Created</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => {
                    const id = getId(item);
                    return (
                      <tr key={id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900 truncate max-w-[320px]">{item.title || '(untitled)'}</p>
                          <p className="text-xs text-gray-400">
                            <span className={`inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full mr-2 ${STATUS_BADGE[item.status] || 'bg-gray-100 text-gray-700'}`}>
                              {item.status}
                            </span>
                            {item.source ? <span>via {item.source}</span> : null}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{getVendorLabel(item.vendorId)}</td>
                        <td className="px-4 py-3 text-gray-600">{item.agentName}</td>
                        <td className="px-4 py-3 text-gray-600">{ITEM_TYPE_LABELS[item.itemType] || item.itemType}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs" title={new Date(item.createdAt).toLocaleString('en-GB')}>
                          {relativeTime(item.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              href={`/admin/approvals/${id}`}
                              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                            >
                              View
                            </Link>
                            {activeTab === 'pending' && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => openApprove(id)}
                                  disabled={actionId === id}
                                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition"
                                >
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openReject(id)}
                                  disabled={actionId === id}
                                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                        {emptyMessage}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.pages}
                {pagination.total > 0 ? ` · ${pagination.total} total` : ''}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={pagination.page >= pagination.pages}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Reason modal */}
      {reasonModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeReasonModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-gray-900">
              {reasonModal.mode === 'approve' ? 'Approve item' : 'Reject item'}
            </h3>
            <p className="text-sm text-gray-500">
              {reasonModal.mode === 'approve'
                ? 'Reason is optional. The item will be marked approved and queued for execution.'
                : 'Reason is required. It will be saved on the audit trail and visible to the drafting agent.'}
            </p>
            <textarea
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              rows={4}
              placeholder={reasonModal.mode === 'approve' ? 'Optional context…' : 'Why is this being rejected?'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeReasonModal}
                disabled={submittingReason}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitReason}
                disabled={
                  submittingReason ||
                  (reasonModal.mode === 'reject' && !reasonText.trim())
                }
                className={`px-4 py-2 text-sm font-medium rounded-lg text-white disabled:opacity-50 transition ${
                  reasonModal.mode === 'approve'
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {submittingReason
                  ? 'Working…'
                  : reasonModal.mode === 'approve'
                    ? 'Approve'
                    : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
