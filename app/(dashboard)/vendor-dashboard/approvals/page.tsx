'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Approval, ApprovalItemType } from '@/lib/loop/types';
import { ITEM_TYPE_LABELS } from '@/lib/loop/types';
import { countPlaceholders } from '@/lib/loop/placeholders';
import { markdownExcerpt } from '@/lib/utils/markdown';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

// Sequential workflow default: firms first see drafts the admin has
// already approved — those are the ones awaiting firm approval.
const STATUS_TABS = [
  { key: 'approved', label: 'Awaiting your approval' },
  { key: 'executed', label: 'Published' },
  { key: 'rejected', label: 'Rejected' },
] as const;

type StatusKey = typeof STATUS_TABS[number]['key'];

const ITEM_TYPE_OPTIONS: ApprovalItemType[] = [
  'schema_change',
  'content_draft',
  'directory_submission',
  'review_request_batch',
  'press_release',
  'outreach_pitch',
  'other',
];

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  needs_review: 'bg-orange-100 text-orange-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  executed: 'bg-green-100 text-green-700',
  firm_completed: 'bg-teal-100 text-teal-700',
  failed: 'bg-red-100 text-red-700',
};

const PAGE_LIMIT = 20;

const AGENT_DISPLAY: Record<string, string> = {
  reconnaissance: 'TendorAI Reconnaissance',
  detective: 'TendorAI Diagnosis',
  writer: 'TendorAI Writer',
  builder: 'TendorAI Builder',
  listings: 'TendorAI Listings',
  reviews: 'TendorAI Reviews',
  reporter: 'TendorAI Reporter',
  manual: 'Admin team',
};

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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function extractMarkdownBody(payload: unknown): string {
  if (typeof payload === 'string') return payload;
  if (!isPlainObject(payload)) return '';
  for (const key of ['markdown', 'body', 'content', 'text']) {
    const v = payload[key];
    if (typeof v === 'string' && v.trim()) return v;
  }
  return '';
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface RejectModalState {
  approval: Approval;
  reason: string;
  submitting: boolean;
  error: string;
}

export default function VendorApprovalsListPage() {
  const router = useRouter();
  const { getCurrentToken } = useAuth();

  const [items, setItems] = useState<Approval[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: PAGE_LIMIT, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sequential workflow default: 'approved' drafts are the ones the firm
  // needs to act on. Previously hardcoded to 'pending', which under the new
  // workflow is admin-side only and the firm never sees.
  const [activeTab, setActiveTab] = useState<StatusKey>('approved');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [page, setPage] = useState(1);

  const [actioningId, setActioningId] = useState<string | null>(null);
  const [publishedUrls, setPublishedUrls] = useState<Record<string, string>>({});
  const [routedBackIds, setRoutedBackIds] = useState<Record<string, true>>({});
  const [rowError, setRowError] = useState<Record<string, string>>({});
  const [rejectModal, setRejectModal] = useState<RejectModalState | null>(null);

  const fetchApprovals = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.set('status', activeTab);
      params.set('page', String(page));
      params.set('limit', String(PAGE_LIMIT));
      if (typeFilter) params.set('itemType', typeFilter);

      const res = await fetch(`${API_URL}/api/vendor/approvals?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.replace('/vendor-login?redirect=/vendor-dashboard/approvals');
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

      setItems(Array.isArray(data?.items) ? data.items : []);
      setPagination(data?.pagination ?? { page, limit: PAGE_LIMIT, total: 0, pages: 0 });
    } catch {
      setError('Network error loading approvals.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, typeFilter, page, router, getCurrentToken]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  // Reset to page 1 when filters or tab change
  useEffect(() => {
    setPage(1);
  }, [activeTab, typeFilter]);

  const goPrev = () => {
    if (pagination.page > 1) setPage(pagination.page - 1);
  };

  const goNext = () => {
    if (pagination.page < pagination.pages) setPage(pagination.page + 1);
  };

  const clearRowError = (id: string) => {
    setRowError((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleApproveAndPublish = async (item: Approval) => {
    const token = getCurrentToken();
    if (!token) return;

    setActioningId(item._id);
    clearRowError(item._id);
    setRoutedBackIds((prev) => {
      if (!prev[item._id]) return prev;
      const next = { ...prev };
      delete next[item._id];
      return next;
    });
    try {
      const res = await fetch(
        `${API_URL}/api/vendor/approvals/${item._id}/firm-approve`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const body = await res.json().catch(() => null);

      if (res.status === 401) {
        router.replace('/vendor-login?redirect=/vendor-dashboard/approvals');
        return;
      }

      if (!res.ok) {
        // Backend signals a mid-flight verification failure that routed the
        // draft back to needs_review with `routedToReview: true`. Distinct
        // from a plain error — the firm needs to know their approval was
        // heard but produced a downstream review.
        if (body?.routedToReview) {
          setRoutedBackIds((prev) => ({ ...prev, [item._id]: true }));
          fetchApprovals();
          return;
        }
        setRowError((prev) => ({
          ...prev,
          [item._id]: body?.error || `Couldn't publish (${res.status})`,
        }));
        return;
      }

      const liveUrl = typeof body?.liveUrl === 'string' ? body.liveUrl : '';
      if (liveUrl) {
        setPublishedUrls((prev) => ({ ...prev, [item._id]: liveUrl }));
      }
      fetchApprovals();
    } catch {
      setRowError((prev) => ({
        ...prev,
        [item._id]: 'Network error — please retry.',
      }));
    } finally {
      setActioningId(null);
    }
  };

  const openRejectModal = (item: Approval) => {
    setRejectModal({ approval: item, reason: '', submitting: false, error: '' });
  };

  const closeRejectModal = () => {
    if (rejectModal?.submitting) return;
    setRejectModal(null);
  };

  const submitReject = async () => {
    if (!rejectModal) return;
    const reason = rejectModal.reason.trim();
    if (!reason) {
      setRejectModal({ ...rejectModal, error: 'Please add a comment so the team knows what to change.' });
      return;
    }

    const token = getCurrentToken();
    if (!token) return;

    setRejectModal({ ...rejectModal, submitting: true, error: '' });
    try {
      const res = await fetch(
        `${API_URL}/api/vendor/approvals/${rejectModal.approval._id}/firm-reject`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reason }),
        },
      );

      if (res.status === 401) {
        router.replace('/vendor-login?redirect=/vendor-dashboard/approvals');
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        setRejectModal({
          ...rejectModal,
          submitting: false,
          error: errData?.error || `Couldn't submit (${res.status})`,
        });
        return;
      }

      setRejectModal(null);
      fetchApprovals();
    } catch {
      setRejectModal({
        ...rejectModal,
        submitting: false,
        error: 'Network error — please retry.',
      });
    }
  };

  const emptyMessage =
    activeTab === 'approved'
      ? "Nothing waiting for your approval right now. We'll let you know when there's something to look at."
      : activeTab === 'executed'
        ? 'Nothing published yet.'
        : 'No rejected drafts.';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Items awaiting approval</h1>
        <p className="text-gray-500 mt-1">
          TendorAI drafts and integrity-checks work for your firm. Nothing goes live until you approve it here.
        </p>
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
        <label className="block text-xs font-medium text-gray-500 mb-1">Item type</label>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        >
          <option value="">All types</option>
          {ITEM_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {ITEM_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
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
      ) : items.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 px-6 py-16 text-center text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => {
              const draftBody = extractMarkdownBody(item.draftPayload);
              const placeholderCount = countPlaceholders(draftBody);
              const preview = draftBody ? markdownExcerpt(draftBody, 260) : '';
              const agentDisplay = AGENT_DISPLAY[item.agentName] || item.agentName;
              const showActions =
                activeTab === 'approved' && item.status === 'approved';
              const liveUrl = publishedUrls[item._id];
              const routedBack = routedBackIds[item._id];
              const rowErrorMsg = rowError[item._id];
              const busy = actioningId === item._id;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-lg border border-gray-200 p-5 sm:p-6 space-y-4"
                >
                  {/* Header row: title, badge, meta */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                        {item.title || '(untitled)'}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        {ITEM_TYPE_LABELS[item.itemType] || item.itemType}
                        {' · '}
                        drafted by <span className="font-medium">{agentDisplay}</span>
                        {' · '}
                        <span title={new Date(item.createdAt).toLocaleString('en-GB')}>
                          {relativeTime(item.createdAt)}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${
                        STATUS_BADGE[item.status] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Body preview */}
                  {preview && (
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                      {preview}
                    </p>
                  )}

                  {/* Placeholder count — only meaningful when > 0 */}
                  {placeholderCount > 0 && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      <span aria-hidden>⚠</span>
                      {placeholderCount} unfilled placeholder
                      {placeholderCount === 1 ? '' : 's'}
                    </div>
                  )}

                  {/* Row-level status feedback */}
                  {liveUrl && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-lg text-sm break-words">
                      Published.{' '}
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-2 hover:text-green-900"
                      >
                        View live post ↗
                      </a>
                    </div>
                  )}
                  {routedBack && (
                    <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-lg text-sm">
                      This draft has been sent back for review.
                    </div>
                  )}
                  {rowErrorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                      {rowErrorMsg}
                    </div>
                  )}

                  {/* Action row */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {showActions && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleApproveAndPublish(item)}
                          // Block publish while any unresolved placeholder
                          // remains in the body — the live post shouldn't
                          // ship with `[FIRM_DATA: ...]` visible.
                          disabled={busy || placeholderCount > 0}
                          className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          {busy
                            ? 'Publishing…'
                            : placeholderCount > 0
                              ? `Fill ${placeholderCount} remaining detail${placeholderCount === 1 ? '' : 's'} to publish`
                              : 'Approve & Publish'}
                        </button>
                        <button
                          type="button"
                          onClick={() => openRejectModal(item)}
                          disabled={busy}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <Link
                      href={`/vendor-dashboard/approvals/${item._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

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

      {/* Reject modal — comment is required so the admin has something to
          act on when the draft is routed back to needs_review. */}
      {rejectModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeRejectModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-semibold text-gray-900">Reject this draft</h3>
              <p className="text-sm text-gray-500 mt-1">
                Tell the team what needs to change. This is required — the
                draft will be sent back for review with your comment attached.
              </p>
            </div>
            <textarea
              value={rejectModal.reason}
              onChange={(e) =>
                setRejectModal({ ...rejectModal, reason: e.target.value, error: '' })
              }
              rows={5}
              placeholder="e.g. This mentions the wrong practice area — we don't do family law…"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              autoFocus
            />
            {rejectModal.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                {rejectModal.error}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeRejectModal}
                disabled={rejectModal.submitting}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitReject}
                disabled={rejectModal.submitting || !rejectModal.reason.trim()}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {rejectModal.submitting ? 'Sending…' : 'Send back for review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
