'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

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

interface VendorRef {
  _id?: string;
  id?: string;
  company?: string;
  tier?: string;
  email?: string;
  website?: string;
}

interface Approval {
  _id?: string;
  id?: string;
  vendorId: string | VendorRef | null;
  agentName: string;
  itemType: string;
  title: string;
  draftPayload: unknown;
  metadata?: Record<string, unknown> | null;
  status: string;
  createdAt: string;
  decidedAt?: string | null;
  decidedBy?: string | null;
  decisionReason?: string | null;
  executedAt?: string | null;
  executionResult?: unknown;
  executionError?: string | null;
  source?: string;
}

function getToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('admin_token') || '';
}

function formatDateTime(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-GB');
}

function getVendorRef(approval: Approval): VendorRef | null {
  const v = approval.vendorId;
  if (!v) return null;
  if (typeof v === 'string') return { _id: v };
  return v;
}

function getVendorIdString(approval: Approval): string {
  const v = approval.vendorId;
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v._id || v.id || '';
}

/**
 * Pretty-print arbitrary JSON for code-block display.
 */
function jsonString(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

/**
 * Pull the markdown body out of a content_draft payload.
 * Falls back to JSON if no string field is present.
 */
function extractMarkdown(payload: unknown): string | null {
  if (typeof payload === 'string') return payload;
  if (!payload || typeof payload !== 'object') return null;
  const obj = payload as Record<string, unknown>;
  for (const key of ['markdown', 'body', 'content', 'text']) {
    const v = obj[key];
    if (typeof v === 'string' && v.trim()) return v;
  }
  return null;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function PayloadView({ itemType, payload }: { itemType: string; payload: unknown }) {
  if (payload === null || payload === undefined || payload === '') {
    return <p className="text-sm text-gray-500 italic">No draft payload was attached to this item.</p>;
  }

  if (itemType === 'content_draft') {
    const md = extractMarkdown(payload);
    if (md) {
      return (
        <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-gray-900">
          <ReactMarkdown>{md}</ReactMarkdown>
        </div>
      );
    }
  }

  if (itemType === 'directory_submission' && isPlainObject(payload)) {
    const entries = Object.entries(payload);
    if (entries.length > 0) {
      return (
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm">
          {entries.map(([key, value]) => (
            <div key={key} className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-2 border-b border-gray-100 pb-2 last:border-0">
              <dt className="font-medium text-gray-600 sm:col-span-1 break-all">{key}</dt>
              <dd className="text-gray-900 sm:col-span-2 break-words">
                {typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? (
                  String(value)
                ) : (
                  <pre className="bg-gray-50 border border-gray-200 rounded p-2 text-xs overflow-x-auto whitespace-pre-wrap">
                    {jsonString(value)}
                  </pre>
                )}
              </dd>
            </div>
          ))}
        </dl>
      );
    }
  }

  // schema_change and default fallthrough → JSON code block
  return (
    <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap font-mono">
      {jsonString(payload)}
    </pre>
  );
}

function ExecutionResultView({ result }: { result: unknown }) {
  if (result === null || result === undefined) return null;
  if (typeof result === 'string') {
    return <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{result}</p>;
  }
  return (
    <pre className="bg-gray-50 border border-gray-200 rounded p-3 text-xs overflow-x-auto whitespace-pre-wrap">
      {jsonString(result)}
    </pre>
  );
}

export default function ApprovalDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const [approval, setApproval] = useState<Approval | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [approveReason, setApproveReason] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [metadataOpen, setMetadataOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fetchApproval = useCallback(async () => {
    if (!id) {
      setError('Missing approval id.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/approvals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (res.status === 404) {
        setError('Approval not found. It may have been deleted.');
        return;
      }

      if (!res.ok) {
        setError(`Failed to load approval (${res.status}).`);
        return;
      }

      const data = await res.json();
      const item: Approval | null =
        (data && data.success === false && null) ||
        (data?.item as Approval) ||
        (data?.data as Approval) ||
        (data?.approval as Approval) ||
        (data && '_id' in data ? (data as Approval) : null);

      if (!item) {
        setError(data?.error || 'Approval response was empty.');
        return;
      }

      setApproval(item);
    } catch {
      setError('Network error loading approval.');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchApproval();
  }, [fetchApproval]);

  const handleApprove = async () => {
    if (!approval) return;
    setApproving(true);
    try {
      const token = getToken();
      const trimmed = approveReason.trim();
      const body: Record<string, string> = {};
      if (trimmed) body.reason = trimmed;

      const res = await fetch(`${API_URL}/api/admin/approvals/${id}/approve`, {
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
        showToast(errData?.error || `Approve failed (${res.status})`);
        return;
      }

      showToast('Approval recorded');
      setApproveReason('');
      fetchApproval();
    } catch {
      showToast('Network error — please retry');
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async () => {
    if (!approval) return;
    const trimmed = rejectReason.trim();
    if (!trimmed) return;

    setRejecting(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/approvals/${id}/reject`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: trimmed }),
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        showToast(errData?.error || `Reject failed (${res.status})`);
        return;
      }

      showToast('Rejection recorded');
      setRejectReason('');
      fetchApproval();
    } catch {
      showToast('Network error — please retry');
    } finally {
      setRejecting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !approval) {
    return (
      <div className="space-y-4">
        <Link href="/admin/approvals" className="text-sm text-purple-700 hover:underline">
          ← Back to Approval Queue
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center justify-between gap-4">
          <span>{error || 'Unknown error.'}</span>
          <button
            type="button"
            onClick={fetchApproval}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const vendorRef = getVendorRef(approval);
  const vendorIdString = getVendorIdString(approval);
  const isPending = approval.status === 'pending';
  const hasMetadata = approval.metadata && Object.keys(approval.metadata).length > 0;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Link href="/admin/approvals" className="text-sm text-purple-700 hover:underline">
          ← Back to Approval Queue
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 break-words">{approval.title || '(untitled)'}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {ITEM_TYPE_LABELS[approval.itemType] || approval.itemType} · drafted by{' '}
              <span className="font-medium text-gray-700">{approval.agentName}</span>
              {approval.source ? <> · via {approval.source}</> : null}
            </p>
          </div>
          <span
            className={`shrink-0 inline-flex text-xs font-medium px-3 py-1 rounded-full ${
              STATUS_BADGE[approval.status] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {approval.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          {/* Vendor context */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Vendor</h2>
            {vendorRef ? (
              <div className="space-y-1 text-sm">
                <p className="font-medium text-gray-900">{vendorRef.company || '(name unavailable)'}</p>
                {vendorRef.tier && (
                  <p className="text-xs text-gray-500">
                    Tier: <span className="font-medium text-gray-700">{vendorRef.tier}</span>
                  </p>
                )}
                {vendorIdString && (
                  <p className="text-xs text-gray-400 font-mono break-all">{vendorIdString}</p>
                )}
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href="/admin/vendors" className="text-xs text-purple-700 hover:underline">
                    Open admin vendors
                  </Link>
                  {vendorIdString && (
                    <Link
                      href={`/suppliers/profile/${vendorIdString}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-700 hover:underline"
                    >
                      View public profile ↗
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No vendor attached.</p>
            )}
          </div>

          {/* Agent context */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Agent context</h2>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">
                Agent: <span className="font-medium text-gray-900">{approval.agentName}</span>
              </p>
              <p className="text-gray-700">
                Type:{' '}
                <span className="font-medium text-gray-900">
                  {ITEM_TYPE_LABELS[approval.itemType] || approval.itemType}
                </span>
              </p>
              {approval.source && (
                <p className="text-gray-700">
                  Source: <span className="font-medium text-gray-900">{approval.source}</span>
                </p>
              )}
              <p className="text-gray-500 text-xs">Created {formatDateTime(approval.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Draft payload */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Draft payload</h2>
        <PayloadView itemType={approval.itemType} payload={approval.draftPayload} />
      </div>

      {/* Metadata (collapsible) */}
      {hasMetadata && (
        <div className="bg-white rounded-lg border border-gray-200">
          <button
            type="button"
            onClick={() => setMetadataOpen((open) => !open)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition rounded-lg"
            aria-expanded={metadataOpen}
          >
            <span className="text-sm font-semibold text-gray-900">Metadata</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${metadataOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {metadataOpen && (
            <div className="px-6 pb-6">
              <pre className="bg-gray-50 border border-gray-200 rounded p-3 text-xs overflow-x-auto whitespace-pre-wrap">
                {jsonString(approval.metadata)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Approve / Reject (pending only) */}
      {isPending && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
            <h2 className="text-sm font-semibold text-gray-900">Approve</h2>
            <p className="text-xs text-gray-500">
              Reason is optional. The item will be marked approved and queued for execution.
            </p>
            <textarea
              value={approveReason}
              onChange={(e) => setApproveReason(e.target.value)}
              rows={3}
              placeholder="Optional context…"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
            />
            <button
              type="button"
              onClick={handleApprove}
              disabled={approving || rejecting}
              className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition"
            >
              {approving ? 'Working…' : 'Approve item'}
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
            <h2 className="text-sm font-semibold text-gray-900">Reject</h2>
            <p className="text-xs text-gray-500">
              Reason is required. It will be saved on the audit trail and visible to the drafting agent.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Why is this being rejected?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
            />
            <button
              type="button"
              onClick={handleReject}
              disabled={rejecting || approving || !rejectReason.trim()}
              className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
            >
              {rejecting ? 'Working…' : 'Reject item'}
            </button>
          </div>
        </div>
      )}

      {/* Audit trail */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Audit trail</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <dt className="text-xs font-medium text-gray-500">Created</dt>
            <dd className="text-gray-900">{formatDateTime(approval.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Decided by</dt>
            <dd className="text-gray-900">{approval.decidedBy || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Decided at</dt>
            <dd className="text-gray-900">{formatDateTime(approval.decidedAt)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Executed at</dt>
            <dd className="text-gray-900">{formatDateTime(approval.executedAt)}</dd>
          </div>
          {approval.decisionReason && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-gray-500">Decision reason</dt>
              <dd className="text-gray-900 whitespace-pre-wrap break-words">{approval.decisionReason}</dd>
            </div>
          )}
          {approval.executionResult !== undefined && approval.executionResult !== null && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-gray-500 mb-1">Execution result</dt>
              <dd>
                <ExecutionResultView result={approval.executionResult} />
              </dd>
            </div>
          )}
          {approval.executionError && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-gray-500">Execution error</dt>
              <dd className="text-red-700 whitespace-pre-wrap break-words">{approval.executionError}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
