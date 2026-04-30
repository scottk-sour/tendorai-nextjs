'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

interface ClaimedBy {
  name: string;
  email: string;
  role: string;
  date: string;
}

interface Vendor {
  id: string;
  company: string;
  name: string;
  email: string;
  tier: string;
  status: string;
  city: string;
  region: string;
  productCount: number;
  rating: number;
  isClaimed: boolean;
  listingStatus: string;
  claimedBy: ClaimedBy | null;
  claimedAt: string | null;
  createdAt: string;
}

const tierBadgeColors: Record<string, string> = {
  free: 'bg-gray-100 text-gray-700',
  basic: 'bg-slate-100 text-slate-700',
  starter: 'bg-cyan-100 text-cyan-700',
  pro: 'bg-purple-100 text-purple-700',
  visible: 'bg-blue-100 text-blue-700',
  verified: 'bg-green-100 text-green-700',
  listed: 'bg-amber-100 text-amber-700',
  managed: 'bg-teal-100 text-teal-700',
  enterprise: 'bg-indigo-100 text-indigo-700',
};

const statusBadgeColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  suspended: 'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-600',
  unclaimed: 'bg-orange-100 text-orange-700',
};

type WriterAgentResult =
  | {
      kind: 'success';
      approvalId: string;
      agentRunId?: string;
      draftTitle: string;
      pillarId: string;
      topicIndex: number;
      costEstimateUSD: number;
      dryRun: boolean;
    }
  | { kind: 'skipped'; reason: string }
  | { kind: 'failed'; error: string };

const writerAgentReasonLabels: Record<string, string> = {
  not_pro_tier: 'Vendor is not on Pro tier',
  no_pillar_library_for_vertical: 'No pillar library for vertical',
  monthly_per_vendor_cap_reached: 'Monthly per-vendor cap reached (4/4)',
  monthly_cost_cap_would_be_exceeded: 'Monthly platform cost cap would be exceeded',
};

function humaniseSkipReason(reason: string): string {
  return writerAgentReasonLabels[reason] || reason;
}

function formatCost(usd: number): string {
  if (!Number.isFinite(usd)) return '—';
  return `$${usd.toFixed(usd < 0.01 ? 4 : 2)}`;
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

function formatDate(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminVendorDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [agentModal, setAgentModal] = useState<'dry' | 'real' | null>(null);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentResult, setAgentResult] = useState<WriterAgentResult | null>(null);

  const runWriterAgent = useCallback(
    async (vendorId: string, dryRun: boolean) => {
      setAgentRunning(true);
      setAgentResult(null);

      const controller = new AbortController();
      const timeoutHandle = setTimeout(() => controller.abort(), 90000);

      try {
        const token = getToken();
        const res = await fetch(
          `${API_URL}/api/admin/writer-agent/run-for-vendor/${vendorId}?dryRun=${dryRun ? 'true' : 'false'}`,
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          },
        );

        if (res.status === 401) {
          router.replace('/admin/login');
          return;
        }

        if (res.status === 403) {
          setAgentResult({ kind: 'failed', error: 'Admin access required.' });
          return;
        }

        const data = await res.json().catch(() => null);

        if (data && data.skipped) {
          setAgentResult({ kind: 'skipped', reason: String(data.reason || 'unknown') });
          return;
        }

        if (data && data.success === true) {
          setAgentResult({
            kind: 'success',
            approvalId: String(data.approvalId || ''),
            agentRunId: data.agentRunId ? String(data.agentRunId) : undefined,
            draftTitle: String(data.draftTitle || '(untitled)'),
            pillarId: String(data.pillarId || '—'),
            topicIndex: typeof data.topicIndex === 'number' ? data.topicIndex : Number(data.topicIndex) || 0,
            costEstimateUSD: typeof data.costEstimateUSD === 'number' ? data.costEstimateUSD : Number(data.costEstimateUSD) || 0,
            dryRun: Boolean(data.dryRun),
          });
          return;
        }

        const errMsg = (data && typeof data.error === 'string' && data.error) || `Failed (${res.status})`;
        setAgentResult({ kind: 'failed', error: errMsg });
      } catch (err) {
        const isAbort = err instanceof DOMException && err.name === 'AbortError';
        setAgentResult({
          kind: 'failed',
          error: isAbort
            ? 'Writer Agent took too long. Check Render logs for status.'
            : 'Failed to reach backend. Check your connection.',
        });
      } finally {
        clearTimeout(timeoutHandle);
        setAgentRunning(false);
      }
    },
    [router],
  );

  const onConfirmAgent = () => {
    const mode = agentModal;
    setAgentModal(null);
    if (mode && vendor) {
      void runWriterAgent(vendor.id, mode === 'dry');
    }
  };

  const fetchVendor = useCallback(async () => {
    if (!id) {
      setError('Missing vendor id.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/vendors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        setError(`Failed to load vendors (${res.status}).`);
        return;
      }

      const data = await res.json();
      const list: Vendor[] = data?.success && Array.isArray(data?.data) ? data.data : [];
      const match = list.find((v) => v.id === id) || null;

      if (!match) {
        setError('Vendor not found.');
        return;
      }

      setVendor(match);
    } catch {
      setError('Network error loading vendor.');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="space-y-4">
        <Link href="/admin/vendors" className="text-sm text-purple-700 hover:underline">
          ← Back to Vendors
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center justify-between gap-4">
          <span>{error || 'Vendor not found.'}</span>
          <button
            type="button"
            onClick={fetchVendor}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const showListingStatus =
    vendor.listingStatus &&
    vendor.listingStatus !== (vendor.isClaimed ? 'claimed' : 'unclaimed');

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Link href="/admin/vendors" className="text-sm text-purple-700 hover:underline">
          ← Back to Vendors
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 break-words">{vendor.company}</h1>
            <p className="text-xs text-gray-400 mt-1 font-mono break-all">{vendor.id}</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <span
              className={`inline-flex text-xs font-medium px-3 py-1 rounded-full ${
                tierBadgeColors[vendor.tier] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {vendor.tier}
            </span>
            <span
              className={`inline-flex text-xs font-medium px-3 py-1 rounded-full ${
                statusBadgeColors[vendor.status] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {vendor.status}
            </span>
          </div>
        </div>
      </div>

      {/* Basics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Basics</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div>
            <dt className="text-xs font-medium text-gray-500">Contact name</dt>
            <dd className="text-gray-900">{vendor.name || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Email</dt>
            <dd className="text-gray-900 break-all">{vendor.email || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Location</dt>
            <dd className="text-gray-900">
              {[vendor.city, vendor.region].filter(Boolean).join(', ') || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Claim status</dt>
            <dd className="text-gray-900">
              {vendor.isClaimed ? 'Claimed' : 'Unclaimed'}
              {showListingStatus && (
                <span className="text-gray-500"> · {vendor.listingStatus}</span>
              )}
            </dd>
          </div>
          {vendor.claimedAt && (
            <div>
              <dt className="text-xs font-medium text-gray-500">Claimed date</dt>
              <dd className="text-gray-900">{formatDateTime(vendor.claimedAt)}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-medium text-gray-500">Created</dt>
            <dd className="text-gray-900">{formatDate(vendor.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Products</dt>
            <dd className="text-gray-900">{vendor.productCount}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-500">Rating</dt>
            <dd className="text-gray-900">{vendor.rating > 0 ? vendor.rating.toFixed(1) : '—'}</dd>
          </div>
        </dl>
      </div>

      {/* Claim record */}
      {vendor.isClaimed && vendor.claimedBy && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Claim record</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium text-gray-500">Name</dt>
              <dd className="text-gray-900">{vendor.claimedBy.name || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Role</dt>
              <dd className="text-gray-900">{vendor.claimedBy.role || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Email</dt>
              <dd className="text-gray-900 break-all">{vendor.claimedBy.email || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Claimed at</dt>
              <dd className="text-gray-900">
                {formatDateTime(vendor.claimedBy.date || vendor.claimedAt)}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* Writer Agent */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Writer Agent</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Manually trigger Writer Agent for this vendor. Dry-run mode is recommended for testing — the
            draft will appear in{' '}
            <Link href="/admin/approvals" className="text-purple-700 hover:underline">
              /admin/approvals
            </Link>{' '}
            tagged as dryRun and won&apos;t affect normal scheduling.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setAgentModal('dry')}
            disabled={agentRunning}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition"
          >
            Run dry-run
          </button>
          <button
            type="button"
            onClick={() => setAgentModal('real')}
            disabled={agentRunning}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-700 text-white hover:bg-slate-800 disabled:opacity-50 transition"
          >
            Run real
          </button>
        </div>

        {agentRunning && (
          <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin shrink-0" />
            <span>Generating draft… (15-30 seconds)</span>
          </div>
        )}

        {!agentRunning && agentResult?.kind === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <p className="font-medium text-green-900 break-words">
              ✓ Drafted &ldquo;{agentResult.draftTitle}&rdquo;
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-green-900">
              <div>
                <dt className="inline text-green-700">Pillar:</dt>{' '}
                <dd className="inline font-medium">{agentResult.pillarId}</dd>
              </div>
              <div>
                <dt className="inline text-green-700">Topic:</dt>{' '}
                <dd className="inline font-medium">index {agentResult.topicIndex}</dd>
              </div>
              <div>
                <dt className="inline text-green-700">Cost:</dt>{' '}
                <dd className="inline font-medium">{formatCost(agentResult.costEstimateUSD)}</dd>
              </div>
              <div>
                <dt className="inline text-green-700">Mode:</dt>{' '}
                <dd className="inline font-bold">{agentResult.dryRun ? 'DRY RUN' : 'REAL'}</dd>
              </div>
            </dl>
            {agentResult.approvalId && (
              <Link
                href={`/admin/approvals/${agentResult.approvalId}`}
                className="inline-flex items-center text-sm font-medium text-green-800 hover:text-green-900 underline"
              >
                View in Approvals →
              </Link>
            )}
          </div>
        )}

        {!agentRunning && agentResult?.kind === 'skipped' && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-medium text-amber-900">
              ⚠ Skipped — {humaniseSkipReason(agentResult.reason)}
            </p>
          </div>
        )}

        {!agentRunning && agentResult?.kind === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-medium text-red-900 break-words">✗ Failed — {agentResult.error}</p>
          </div>
        )}
      </div>

      {/* Confirm modal */}
      {agentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-bold text-gray-900">
              {agentModal === 'dry' ? 'Trigger Writer Agent (dry-run)?' : 'Trigger Writer Agent (REAL)?'}
            </h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              {agentModal === 'dry'
                ? `Trigger Writer Agent in dry-run mode for ${vendor.company}? This will spend approximately $0.07 in API cost and create a dryRun-tagged ApprovalQueue item.`
                : `Trigger Writer Agent in REAL mode for ${vendor.company}? This creates a real ApprovalQueue item that will appear in the production queue. The draft will be reviewed and approved like any other agent draft. Approximately $0.07 in API cost.`}
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setAgentModal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmAgent}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition ${
                  agentModal === 'dry'
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-slate-700 hover:bg-slate-800'
                }`}
              >
                {agentModal === 'dry' ? 'Run dry-run' : 'Run real'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
