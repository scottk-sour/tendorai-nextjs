'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Approval, DataGap } from '@/lib/loop/types';
import { ITEM_TYPE_LABELS, ITEM_TYPE_DESCRIPTIONS } from '@/lib/loop/types';
import {
  countPlaceholders,
  substituteFirmDataValues,
} from '@/lib/loop/placeholders';
import { sanitiseVendorDecisionReason } from '@/lib/loop/vendorDecisionReason';
import HighlightedMarkdown from '@/app/components/dashboard/approvals/HighlightedMarkdown';
import { parseUniquePlaceholders } from '@/app/components/dashboard/approvals/PlaceholderEditor';
import StrengthenArticleSection from '@/app/components/dashboard/approvals/StrengthenArticleSection';
import FirmDetailsSection from '@/app/components/dashboard/approvals/FirmDetailsSection';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

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

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  executed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  firm_completed: 'bg-green-100 text-green-700',
};

function formatDateTime(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-GB');
}

function jsonString(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

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

// Persisted execute output typically lives at approval.executionResult.
// Reading defensively means the Published banner survives a full page
// reload after the local liveUrl state has been lost.
function extractLiveUrl(approval: Approval): string | null {
  const result = approval.executionResult;
  if (typeof result === 'string' && /^https?:\/\//.test(result)) return result;
  if (isPlainObject(result)) {
    for (const key of ['liveUrl', 'url', 'publishedUrl', 'postUrl']) {
      const v = result[key];
      if (typeof v === 'string' && v.length > 0) return v;
    }
  }
  return null;
}

// Qualitative-mode dataGaps are persisted by the Writer at draftPayload.dataGaps
// (canonical) and mirrored at metadata.dataGaps. We previously read
// approval.dataGaps (top-level) which was always undefined — so the
// StrengthenArticleSection gate never fired even when the data was present.
// This helper checks all three locations in priority order.
function extractDataGaps(approval: Approval): DataGap[] {
  const candidates: unknown[] = [
    isPlainObject(approval.draftPayload) ? approval.draftPayload.dataGaps : undefined,
    isPlainObject(approval.metadata) ? approval.metadata.dataGaps : undefined,
    approval.dataGaps,
  ];
  for (const c of candidates) {
    if (Array.isArray(c) && c.length > 0) {
      // Trust runtime shape: each item should have at least key+label strings.
      return c.filter(
        (g): g is DataGap =>
          isPlainObject(g) &&
          typeof g.key === 'string' &&
          typeof g.label === 'string',
      );
    }
  }
  return [];
}

function PayloadView({
  itemType,
  payload,
  firmData,
}: {
  itemType: string;
  payload: unknown;
  // Optional saved firm-data values, keyed by placeholder key. When
  // present, [FIRM_DATA: key | label] markers whose key has a value
  // render inline as the value so the firm sees the finished article.
  // Markers without a value stay as-is and get amber-highlighted.
  firmData?: Record<string, string>;
}) {
  if (payload === null || payload === undefined || payload === '') {
    return <p className="text-sm text-gray-500 italic">No draft content was attached to this item.</p>;
  }

  if (itemType === 'content_draft' || itemType === 'press_release') {
    const md = extractMarkdown(payload);
    if (md) {
      const rendered = substituteFirmDataValues(md, firmData);
      const missing = countPlaceholders(rendered);
      return (
        <>
          {missing > 0 && (
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
              <span aria-hidden>⚠</span>
              {missing} detail{missing === 1 ? '' : 's'} still needed from the firm
            </div>
          )}
          <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-gray-900">
            <HighlightedMarkdown>{rendered}</HighlightedMarkdown>
          </div>
        </>
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

  return (
    <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap font-mono">
      {jsonString(payload)}
    </pre>
  );
}

// Inline reject bar. Mirrors the list page's modal-based flow but sits
// as a static card on the detail page — required-reason textarea plus a
// Reject button that hits firm-reject with the reason. The parent
// updates local state on success via onRejected so the surface can
// swap to a read-only view without a refetch.
interface RejectBarProps {
  approval: Approval;
  onRejected: (reason: string) => void;
}

function RejectBar({ approval, onRejected }: RejectBarProps) {
  const { getCurrentToken } = useAuth();
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleReject = useCallback(async () => {
    const trimmed = reason.trim();
    if (!trimmed) {
      setError('Please add a comment so the team knows what to change.');
      return;
    }
    const token = getCurrentToken();
    if (!token) {
      setError('Not authenticated.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(
        `${API_URL}/api/vendor/approvals/${approval._id}/firm-reject`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reason: trimmed }),
        },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        let msg = `Couldn't submit (${res.status})`;
        if (body?.error) msg = String(body.error);
        setError(msg);
        return;
      }
      onRejected(trimmed);
    } catch {
      setError('Network error — please retry.');
    } finally {
      setSubmitting(false);
    }
  }, [approval._id, getCurrentToken, onRejected, reason]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-5 space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Reject this draft</h3>
      <p className="text-xs text-gray-500">
        A comment is required so the team knows what needs to change.
      </p>
      <textarea
        value={reason}
        onChange={(e) => {
          setReason(e.target.value);
          if (error) setError('');
        }}
        rows={3}
        placeholder="What needs to change?"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
      />
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      <button
        type="button"
        onClick={handleReject}
        disabled={submitting || !reason.trim()}
        className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {submitting ? 'Submitting…' : 'Reject with comment'}
      </button>
    </div>
  );
}

export default function VendorApprovalDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getCurrentToken } = useAuth();

  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const [approval, setApproval] = useState<Approval | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  // The liveUrl returned by firm-approve is captured locally so the
  // Published section renders immediately. On subsequent visits the URL
  // is read from approval.executionResult via extractLiveUrl.
  const [localLiveUrl, setLocalLiveUrl] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback for browsers without clipboard API permission
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
      } catch {
        // Silent — clipboard unavailable
      } finally {
        document.body.removeChild(ta);
      }
    }
  }, []);

  const fetchApproval = useCallback(async () => {
    if (!id) {
      setError('Missing approval id.');
      setLoading(false);
      return;
    }

    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/vendor/approvals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.replace('/vendor-login?redirect=/vendor-dashboard/approvals');
        return;
      }

      if (res.status === 403) {
        setToastMessage('Approval not found');
        setTimeout(() => router.replace('/vendor-dashboard/approvals'), 800);
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
      if (data && data.success === false) {
        setError(data.error || 'Approval response was empty.');
        return;
      }
      const item: Approval | null =
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
  }, [id, router, getCurrentToken]);

  useEffect(() => {
    fetchApproval();
  }, [fetchApproval]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (toastMessage) {
    return (
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-lg">
          {toastMessage} — redirecting…
        </div>
      </div>
    );
  }

  if (error || !approval) {
    return (
      <div className="space-y-4">
        <Link href="/vendor-dashboard/approvals" className="text-sm text-purple-700 hover:underline">
          ← Back to approvals
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

  const typeLabel = ITEM_TYPE_LABELS[approval.itemType] || approval.itemType;
  const typeDescription = ITEM_TYPE_DESCRIPTIONS[approval.itemType] ||
    `A ${typeLabel.toLowerCase()} drafted for your firm.`;
  const agentDisplay = AGENT_DISPLAY[approval.agentName] || approval.agentName;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/vendor-dashboard/approvals" className="text-sm text-purple-700 hover:underline">
          ← Back to approvals
        </Link>
      </div>

      {/* Published banner — new sequential-workflow outcome. Reads liveUrl
          from local state (fresh firm-approve response) or the persisted
          approval.executionResult (survives page reload). */}
      {approval.status === 'executed' && (() => {
        const liveUrl = localLiveUrl || extractLiveUrl(approval);
        return (
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-start gap-3">
            <svg
              className="w-5 h-5 mt-0.5 text-green-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Published.</p>
              {liveUrl ? (
                <p className="text-sm mt-1">
                  Your approval has published this post to your firm profile.{' '}
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2 hover:text-green-900"
                  >
                    View live post ↗
                  </a>
                </p>
              ) : (
                <p className="text-sm mt-1">
                  Your approval has published this post to your firm profile.
                </p>
              )}
            </div>
          </div>
        );
      })()}

      {/* Legacy firm_completed banner — kept for approvals still in the
          old intermediate state on the backend. New records go straight
          from 'approved' → 'executed' when the firm approves. */}
      {approval.status === 'firm_completed' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg flex items-start gap-3">
          <svg
            className="w-5 h-5 mt-0.5 text-green-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-semibold">Submitted for final review.</p>
            <p className="text-sm mt-1">
              Your details are filled in and the draft is with our team. We&apos;ll be in
              touch when it&apos;s published.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 break-words">{approval.title || '(untitled)'}</h1>
          <span
            className={`shrink-0 inline-flex text-xs font-medium px-3 py-1 rounded-full ${
              STATUS_BADGE[approval.status] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {approval.status}
          </span>
        </div>
      </div>

      {/* What this is */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">What this is</h2>
        <p className="text-sm text-gray-700">
          {typeLabel} drafted by the <span className="font-medium">{agentDisplay}</span>.
        </p>
        <p className="text-sm text-gray-600">{typeDescription}</p>
      </div>

      {/* What it says + firm-details surfaces.
       *
       * Under the sequential workflow, admin approval flips the status
       * to 'approved' and hands the draft to the firm to finish. The
       * layout that follows is:
       *
       *   1. Top "What it says" card — always a read-only preview. If
       *      the body has [FIRM_DATA: key | label] markers, saved
       *      values from approval.firmData are substituted so the firm
       *      sees the finished article; markers without a saved value
       *      stay as-is and get amber-highlighted.
       *   2. Qualitative-mode dataGaps case — StrengthenArticleSection
       *      still owns the top-side approve/reject when the Writer
       *      produced structured dataGaps (a different data shape from
       *      body-embedded [FIRM_DATA:] markers).
       *   3. Publish failure banner — when status === 'failed' with an
       *      executionError, shown between the preview and the
       *      firm-details section so the firm sees why the last publish
       *      attempt failed before they edit.
       *   4. Bottom FirmDetailsSection — persistent while status is
       *      'approved' or 'failed', for every content_draft (except
       *      those in the dataGaps case). Lists every placeholder key
       *      with its current saved value pre-filled, per-field save,
       *      Approve & Publish gated on all keys having values, plus a
       *      reject-with-required-comment control.
       */}
      {(() => {
        const draftMarkdown =
          approval.itemType === 'content_draft'
            ? extractMarkdown(approval.draftPayload)
            : null;
        const dataGaps: DataGap[] = extractDataGaps(approval);

        const isFirmActionable =
          (approval.status === 'approved' || approval.status === 'failed') &&
          approval.itemType === 'content_draft';
        const showStrengthenSection =
          isFirmActionable && dataGaps.length > 0;
        const showFirmDetailsSection =
          isFirmActionable && !showStrengthenSection && draftMarkdown !== null;

        // Firm-approve success moves the draft to 'executed' (published)
        // under the sequential workflow — the earlier 'firm_completed'
        // optimistic value was stale. If the backend returned a liveUrl
        // in the response body it's captured here so the Published
        // section renders without a round-trip refetch.
        const onApproved = (result?: { liveUrl?: string }) => {
          if (result?.liveUrl) setLocalLiveUrl(result.liveUrl);
          setApproval((prev) =>
            prev ? { ...prev, status: 'executed' } : prev,
          );
        };

        // Firm-reject moves the draft to 'rejected' with a stored
        // firmRejectionReason. Local state is patched so the surface
        // switches to read-only immediately.
        const onRejected = (reason: string) =>
          setApproval((prev) =>
            prev
              ? {
                  ...prev,
                  status: 'rejected',
                  firmRejectionReason: reason,
                  firmRejectedAt: new Date().toISOString(),
                }
              : prev,
          );

        return (
          <>
            {/* 1. Read-only preview with value substitution */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">What it says</h2>
              <PayloadView
                itemType={approval.itemType}
                payload={approval.draftPayload}
                firmData={approval.firmData}
              />

              {/* 2. dataGaps case still uses its own top-side approve surface */}
              {showStrengthenSection && (
                <>
                  <StrengthenArticleSection
                    approval={approval}
                    initialGaps={dataGaps}
                    onApproved={onApproved}
                  />
                  <RejectBar approval={approval} onRejected={onRejected} />
                </>
              )}
            </div>

            {/* 3. Publish-failure banner, above the firm-details section */}
            {approval.status === 'failed' && approval.executionError && (
              <div className="bg-red-50 border border-red-200 text-red-900 rounded-lg p-5 flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-red-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.93 19h14.14a2 2 0 001.75-3l-7.07-12a2 2 0 00-3.5 0l-7.07 12A2 2 0 004.93 19z" />
                </svg>
                <div className="space-y-1">
                  <p className="font-semibold">Publish failed</p>
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {approval.executionError}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Update your details below and try again.
                  </p>
                </div>
              </div>
            )}

            {/* 4. Persistent firm-details section — always rendered while
                actionable and body-based (non-dataGaps). Handles
                per-key edit, save, approve, and reject. */}
            {showFirmDetailsSection && (
              <FirmDetailsSection
                approval={approval}
                bodyText={draftMarkdown as string}
                onApproved={onApproved}
                onRejected={onRejected}
              />
            )}
          </>
        );
      })()}

      {/* Social variants — only for approved/executed content drafts */}
      {(() => {
        if (approval.itemType !== 'content_draft') return null;
        if (approval.status !== 'approved' && approval.status !== 'executed') return null;

        const payload = (approval.draftPayload ?? {}) as Record<string, unknown>;
        const linkedInText =
          typeof payload.linkedInText === 'string' ? payload.linkedInText.trim() : '';
        const facebookText =
          typeof payload.facebookText === 'string' ? payload.facebookText.trim() : '';
        const tweetText =
          typeof payload.tweetText === 'string' ? payload.tweetText.trim() : '';

        const hasAny = linkedInText || facebookText || tweetText;
        if (!hasAny) return null;

        const variants: Array<{ key: string; title: string; helper: string; text: string }> = [];
        if (linkedInText) {
          variants.push({
            key: 'linkedin',
            title: 'LinkedIn Post',
            helper: 'Optimised for the LinkedIn feed. Copy and post from your firm’s account.',
            text: linkedInText,
          });
        }
        if (facebookText) {
          variants.push({
            key: 'facebook',
            title: 'Facebook Post',
            helper: 'Shaped for a Facebook business page. Copy and post when ready.',
            text: facebookText,
          });
        }
        if (tweetText) {
          variants.push({
            key: 'twitter',
            title: 'X / Twitter Post',
            helper: 'Concise version for X / Twitter. Copy and post from your firm’s account.',
            text: tweetText,
          });
        }

        return (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-900 px-1">Share this on social</h2>
            {variants.map((v) => (
              <details
                key={v.key}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 hover:bg-gray-50">
                  <span className="font-medium text-gray-900">{v.title}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500">{v.helper}</p>
                  <textarea
                    readOnly
                    value={v.text}
                    rows={Math.min(12, Math.max(4, v.text.split('\n').length + 1))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-900 font-sans resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(v.text, v.key)}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      {copied === v.key ? '✓ Copied' : 'Copy to clipboard'}
                    </button>
                    <span className="text-xs text-gray-400">
                      {v.text.length.toLocaleString()} character{v.text.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
              </details>
            ))}
          </div>
        );
      })()}

      {/* Status timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Status timeline</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span className="font-medium text-gray-700 sm:w-32">Created</span>
            <span className="text-gray-900">{formatDateTime(approval.createdAt)}</span>
          </li>
          {approval.status !== 'pending' && (
            <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="font-medium text-gray-700 sm:w-32">Decided</span>
              <span className="text-gray-900">{formatDateTime(approval.decidedAt)}</span>
            </li>
          )}
          {(() => {
            // Filter admin-diagnostic legal-review-failure strings out of the
            // vendor-facing timeline. See lib/loop/vendorDecisionReason.ts.
            const vendorReason = sanitiseVendorDecisionReason(approval);
            if (!vendorReason) return null;
            return (
              <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="font-medium text-gray-700 sm:w-32">Reason</span>
                <span className="text-gray-900 whitespace-pre-wrap break-words">{vendorReason}</span>
              </li>
            );
          })()}
          {approval.status === 'executed' && approval.executedAt && (
            <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="font-medium text-gray-700 sm:w-32">Executed</span>
              <span className="text-gray-900">{formatDateTime(approval.executedAt)}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
