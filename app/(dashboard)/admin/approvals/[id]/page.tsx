'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import IndexingActionPanel from '@/components/admin/IndexingActionPanel';

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
  needs_review: 'bg-orange-100 text-orange-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  executed: 'bg-green-100 text-green-700',
  firm_completed: 'bg-teal-100 text-teal-700',
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

interface AdminDataGap {
  key: string;
  label: string;
  prompt?: string;
  fieldType?: 'text' | 'number' | 'textarea' | 'select';
  suggestedValues?: string[];
}

interface Approval {
  _id?: string;
  id?: string;
  vendorId: string | VendorRef | null;
  agentName: string;
  itemType: string;
  title: string;
  draftPayload: unknown;
  metadata?: {
    placeholderCount?: number;
    topicSuitabilityFlag?: 'ok' | 'thin_data' | 'unsuitable';
    agentReportedPlaceholderCount?: number;
    [key: string]: unknown;
  } | null;
  /**
   * Qualitative-mode capture queue. Present on drafts produced by the new
   * Writer mode (instead of inline [FIRM_DATA] markers). The vendor surface
   * renders these via StrengthenArticleSection; the admin view surfaces
   * them in a diagnostic panel so we can verify the Writer is emitting
   * the right gaps.
   */
  dataGaps?: AdminDataGap[];
  status: string;
  createdAt: string;
  decidedAt?: string | null;
  decidedBy?: string | null;
  decisionReason?: string | null;
  executedAt?: string | null;
  executionResult?: unknown;
  executionError?: string | null;
  source?: string;
  // Sequential workflow — the firm rejected the draft and routed it
  // back to needs_review. Backend sets both fields together.
  firmRejectionReason?: string | null;
  firmRejectedAt?: string | null;
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

// Qualitative-mode dataGaps live at draftPayload.dataGaps (canonical) and
// metadata.dataGaps (mirror). The top-level Approval.dataGaps field exists
// for forward compatibility but the backend doesn't populate it. Read all
// three locations so we surface whichever the backend supplies.
function extractDataGaps(approval: Approval): AdminDataGap[] {
  const candidates: unknown[] = [
    isPlainObject(approval.draftPayload) ? (approval.draftPayload as Record<string, unknown>).dataGaps : undefined,
    isPlainObject(approval.metadata) ? approval.metadata.dataGaps : undefined,
    approval.dataGaps,
  ];
  for (const c of candidates) {
    if (Array.isArray(c) && c.length > 0) {
      return c.filter(
        (g): g is AdminDataGap =>
          isPlainObject(g) &&
          typeof g.key === 'string' &&
          typeof g.label === 'string',
      );
    }
  }
  return [];
}

// Persisted execute output usually lives at approval.executionResult. Read
// defensively so the Published banner survives a full page reload after the
// local `liveUrl` state has been lost.
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

const SUITABILITY_BADGE: Record<string, { className: string; label: string; description: string }> = {
  ok: {
    className: 'bg-green-100 text-green-700 border-green-200',
    label: 'Suitable',
    description: 'Topic suitable for this firm — clean output with manageable placeholder count.',
  },
  thin_data: {
    className: 'bg-amber-100 text-amber-700 border-amber-200',
    label: 'Thin data',
    description: 'Topic borderline — many placeholders required. Consider gathering firm data before publishing.',
  },
  unsuitable: {
    className: 'bg-red-100 text-red-700 border-red-200',
    label: 'Unsuitable',
    description: 'Agent flagged this topic as unsuitable for the firm. No content body generated.',
  },
};

function WriterAgentQualityPanel({ metadata, itemType }: {
  metadata: { placeholderCount?: number; topicSuitabilityFlag?: string; agentReportedPlaceholderCount?: number } | null | undefined;
  itemType: string;
}) {
  if (itemType !== 'content_draft') return null;
  if (!metadata) return null;
  const { placeholderCount, topicSuitabilityFlag, agentReportedPlaceholderCount } = metadata;
  if (placeholderCount === undefined && !topicSuitabilityFlag) return null;

  const badge = topicSuitabilityFlag ? SUITABILITY_BADGE[topicSuitabilityFlag] : null;
  const countMismatch = typeof placeholderCount === 'number'
    && typeof agentReportedPlaceholderCount === 'number'
    && placeholderCount !== agentReportedPlaceholderCount;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Writer Agent quality</h3>

      <div className="space-y-3">
        {badge && (
          <div className="flex items-start gap-3">
            <span className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded border ${badge.className}`}>
              {badge.label}
            </span>
            <p className="text-sm text-gray-600 flex-1">{badge.description}</p>
          </div>
        )}

        {typeof placeholderCount === 'number' && (
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-gray-500">Placeholder count (verified):</span>
            <span className="font-medium text-gray-900">{placeholderCount}</span>
            {placeholderCount > 8 && (
              <span className="text-xs text-amber-600">over soft cap of 8</span>
            )}
          </div>
        )}

        {typeof agentReportedPlaceholderCount === 'number' && (
          <div className="flex items-baseline gap-2 text-sm">
            <span className="text-gray-500">Agent self-reported count:</span>
            <span className="font-medium text-gray-900">{agentReportedPlaceholderCount}</span>
            {countMismatch && (
              <span className="text-xs text-red-600">mismatch with verified count</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Suggested corrections + editable body (content_draft only) ───────────

interface SuggestedFix {
  flaggedSentence?: string;
  sentence?: string;
  text?: string;
  original?: string;

  reason?: string;
  issue?: string;
  message?: string;

  suggestedRepair?: string;
  repair?: string;
  suggestion?: string;
  fix?: string;
  replacement?: string;
}

// Backend attaches findings at metadata.suggestedFixes (primary) or
// metadata.claimVerification.issues (fallback for older content-review runs).
function extractSuggestedFixes(approval: Approval): SuggestedFix[] {
  const meta = approval.metadata;
  if (!isPlainObject(meta)) return [];
  if (Array.isArray(meta.suggestedFixes)) {
    return meta.suggestedFixes.filter(isPlainObject) as SuggestedFix[];
  }
  const cv = meta.claimVerification;
  if (isPlainObject(cv) && Array.isArray(cv.issues)) {
    return cv.issues.filter(isPlainObject) as SuggestedFix[];
  }
  return [];
}

function getFlaggedText(fix: SuggestedFix): string {
  return (
    fix.flaggedSentence?.trim() ||
    fix.sentence?.trim() ||
    fix.original?.trim() ||
    fix.text?.trim() ||
    ''
  );
}

function getReasonText(fix: SuggestedFix): string {
  return fix.reason?.trim() || fix.issue?.trim() || fix.message?.trim() || '';
}

function getRepairText(fix: SuggestedFix): string {
  return (
    fix.suggestedRepair?.trim() ||
    fix.repair?.trim() ||
    fix.suggestion?.trim() ||
    fix.fix?.trim() ||
    fix.replacement?.trim() ||
    ''
  );
}

// Prefers draftPayload.body per spec; falls back to markdown/content/text so
// existing content shapes still render.
function extractBody(payload: unknown): string {
  if (typeof payload === 'string') return payload;
  if (!payload || typeof payload !== 'object') return '';
  const obj = payload as Record<string, unknown>;
  for (const key of ['body', 'markdown', 'content', 'text']) {
    const v = obj[key];
    if (typeof v === 'string') return v;
  }
  return '';
}

function SuggestedCorrectionsPanel({
  fixes,
  onApply,
  applyToast,
}: {
  fixes: SuggestedFix[];
  onApply: (fix: SuggestedFix, index: number) => void;
  applyToast: string;
}) {
  if (fixes.length === 0) return null;
  return (
    <div className="bg-white rounded-lg border border-amber-200 p-6 space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">Suggested corrections</h2>
        <p className="text-xs text-gray-500 mt-1">
          Flagged by the content-review pipeline. Apply a fix to replace the sentence in
          the editor, then Save changes.
        </p>
      </div>

      <ul className="space-y-4">
        {fixes.map((fix, i) => {
          const flagged = getFlaggedText(fix);
          const reason = getReasonText(fix);
          const repair = getRepairText(fix);
          const canApply = flagged.length > 0 && repair.length > 0;
          return (
            <li
              key={i}
              className="border border-amber-100 bg-amber-50/60 rounded-lg p-4 space-y-3"
            >
              {flagged && (
                <div>
                  <p className="text-xs font-medium text-amber-800 uppercase tracking-wide">
                    Flagged sentence
                  </p>
                  <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap break-words">
                    {flagged}
                  </p>
                </div>
              )}
              {reason && (
                <div>
                  <p className="text-xs font-medium text-amber-800 uppercase tracking-wide">
                    Reason
                  </p>
                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap break-words">
                    {reason}
                  </p>
                </div>
              )}
              {repair && (
                <div>
                  <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">
                    Suggested repair
                  </p>
                  <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap break-words">
                    {repair}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                <p className="text-xs text-gray-400">
                  {!flagged && 'No flagged text on this fix — cannot auto-apply.'}
                  {flagged && !repair && 'No repair provided — cannot auto-apply.'}
                </p>
                <button
                  type="button"
                  onClick={() => onApply(fix, i)}
                  disabled={!canApply}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Apply to draft
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {applyToast && (
        <p className="text-xs text-gray-600 border-t border-gray-100 pt-3">{applyToast}</p>
      )}
    </div>
  );
}

function EditableContentDraftPanel({
  approvalId,
  draftPayload,
  fixes,
  onSaved,
}: {
  approvalId: string;
  draftPayload: unknown;
  fixes: SuggestedFix[];
  onSaved: () => void;
}) {
  const router = useRouter();
  const initialBody = extractBody(draftPayload);

  const [body, setBody] = useState(initialBody);
  const [savedBody, setSavedBody] = useState(initialBody);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [applyToast, setApplyToast] = useState('');
  const isDirty = body !== savedBody;

  const handleApply = (fix: SuggestedFix) => {
    const flagged = getFlaggedText(fix);
    const repair = getRepairText(fix);
    if (!flagged || !repair) {
      setApplyToast('Fix has no flagged sentence or repair text.');
      return;
    }
    const idx = body.indexOf(flagged);
    if (idx < 0) {
      setApplyToast(
        'Flagged sentence not found in the current body — it may already be corrected or edited.',
      );
      return;
    }
    const newBody = body.slice(0, idx) + repair + body.slice(idx + flagged.length);
    setBody(newBody);
    setEditing(true);
    setApplyToast('Applied. Review the change, then Save changes.');
  };

  const handleDiscard = () => {
    setBody(savedBody);
    setEditing(false);
    setSaveError('');
    setApplyToast('');
  };

  const handleSave = async () => {
    if (!approvalId) return;
    setSaving(true);
    setSaveError('');
    try {
      const token = getToken();
      const basePayload = isPlainObject(draftPayload) ? draftPayload : {};
      const newPayload = { ...basePayload, body };

      const res = await fetch(`${API_URL}/api/admin/approvals/${approvalId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ draftPayload: newPayload }),
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        setSaveError(errData?.error || `Save failed (${res.status})`);
        return;
      }

      setSavedBody(body);
      setEditing(false);
      setApplyToast('');
      onSaved();
    } catch {
      setSaveError('Network error — please retry');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SuggestedCorrectionsPanel
        fixes={fixes}
        onApply={handleApply}
        applyToast={applyToast}
      />

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-gray-900">Draft payload</h2>
            {isDirty && (
              <p className="text-xs text-amber-600 mt-1">Unsaved changes</p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={handleDiscard}
                  disabled={saving || !isDirty}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !isDirty}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </>
            ) : (
              <>
                {isDirty && (
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition"
                  >
                    {saving ? 'Saving…' : 'Save changes'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

        {editing ? (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={20}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono leading-relaxed focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-y"
          />
        ) : body.trim() ? (
          <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-gray-900">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No draft body was attached to this item.
          </p>
        )}

        {saveError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {saveError}
          </div>
        )}
      </div>
    </>
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

  const [liveUrl, setLiveUrl] = useState<string | null>(null);
  const [indexNowOk, setIndexNowOk] = useState<boolean | null>(null);
  const [executing, setExecuting] = useState(false);
  const [executeError, setExecuteError] = useState('');
  const [reVerifying, setReVerifying] = useState(false);
  const [reVerifyError, setReVerifyError] = useState('');

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

      const data = await res.json().catch(() => null);
      if (
        data &&
        typeof data.liveUrl === 'string' &&
        data.liveUrl.length > 0 &&
        approval.itemType === 'content_draft'
      ) {
        setLiveUrl(data.liveUrl);
        setIndexNowOk(typeof data.indexNowOk === 'boolean' ? data.indexNowOk : false);
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

  const handleReVerify = async () => {
    if (!approval) return;
    setReVerifying(true);
    setReVerifyError('');
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/approvals/${id}/re-verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        setReVerifyError(errData?.error || `Legal check failed to run (${res.status})`);
        return;
      }

      showToast('Legal check complete');
      fetchApproval();
    } catch {
      setReVerifyError('Network error — please retry');
    } finally {
      setReVerifying(false);
    }
  };

  const handleExecute = async () => {
    if (!approval) return;
    setExecuting(true);
    setExecuteError('');
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/api/admin/approvals/${id}/execute`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        setExecuteError(errData?.error || `Publish failed (${res.status})`);
        return;
      }

      const data = await res.json().catch(() => null);
      if (
        data &&
        typeof data.liveUrl === 'string' &&
        data.liveUrl.length > 0
      ) {
        setLiveUrl(data.liveUrl);
        setIndexNowOk(typeof data.indexNowOk === 'boolean' ? data.indexNowOk : false);
      }

      showToast('Published');
      fetchApproval();
    } catch {
      setExecuteError('Network error — please retry');
    } finally {
      setExecuting(false);
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

      {/* Firm-rejection callout — sequential workflow only. Rendered
          prominently so the admin sees why the draft came back before
          reading the body. */}
      {approval.firmRejectionReason && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-2">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h2 className="text-sm font-semibold text-amber-900">
              Firm rejected this draft
            </h2>
            {approval.firmRejectedAt && (
              <p className="text-xs text-amber-800 shrink-0">
                {formatDateTime(approval.firmRejectedAt)}
              </p>
            )}
          </div>
          <p className="text-sm text-amber-900 whitespace-pre-wrap break-words">
            {approval.firmRejectionReason}
          </p>
        </div>
      )}

      {/* Re-run Legal Check — visible on needs_review + rejected drafts.
          POST /api/admin/approvals/:id/re-verify runs live legal
          verification (~1–2 min). On completion the approval is refetched
          so the new status and any fresh suggestedFixes render. */}
      {(approval.status === 'needs_review' || approval.status === 'rejected') && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Legal check</h2>
            <p className="text-xs text-gray-500 mt-1.5">
              Runs the live legal verification pipeline against the current
              draft body. Takes about 1&ndash;2 minutes end to end.
            </p>
          </div>
          {reVerifyError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              {reVerifyError}
            </div>
          )}
          <button
            type="button"
            onClick={handleReVerify}
            disabled={reVerifying}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-50 transition"
          >
            {reVerifying ? 'Running legal check… (1–2 min)' : 'Re-run Legal Check'}
          </button>
        </div>
      )}

      {/* Suggested corrections + editable draft payload (content_draft only);
          read-only PayloadView for every other item type so JSON/directory
          submissions/etc. render unchanged. */}
      {approval.itemType === 'content_draft' ? (
        <EditableContentDraftPanel
          approvalId={id}
          draftPayload={approval.draftPayload}
          fixes={extractSuggestedFixes(approval)}
          onSaved={fetchApproval}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Draft payload</h2>
          <PayloadView itemType={approval.itemType} payload={approval.draftPayload} />
        </div>
      )}

      {/* Writer Agent quality (content_draft only) */}
      <WriterAgentQualityPanel
        metadata={approval.metadata as { placeholderCount?: number; topicSuitabilityFlag?: string; agentReportedPlaceholderCount?: number } | null}
        itemType={approval.itemType}
      />

      {/* Data gaps — qualitative-mode capture queue (content_draft only).
          Read via extractDataGaps because the backend stores them at
          draftPayload.dataGaps / metadata.dataGaps, not the top level. */}
      {(() => {
        if (approval.itemType !== 'content_draft') return null;
        const gaps = extractDataGaps(approval);
        if (gaps.length === 0) return null;
        return (
          <div className="bg-white rounded-lg border border-purple-200 p-6 space-y-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Data gaps — qualitative-mode capture queue
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                The customer sees these as &ldquo;Strengthen this article&rdquo; on
                their approval page. Each gap writes to{' '}
                <code className="px-1 py-0.5 bg-gray-100 rounded">Vendor.firmFacts[key]</code>{' '}
                via{' '}
                <code className="px-1 py-0.5 bg-gray-100 rounded">
                  POST /api/vendors/{'{vid}'}/approvals/{'{aid}'}/firm-data
                </code>
                .
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-100 rounded">
                <thead className="bg-gray-50 text-left text-xs text-gray-600">
                  <tr>
                    <th className="px-3 py-2">Key</th>
                    <th className="px-3 py-2">Label</th>
                    <th className="px-3 py-2">Prompt</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Suggested</th>
                  </tr>
                </thead>
                <tbody>
                  {gaps.map((gap) => (
                    <tr key={gap.key} className="border-t border-gray-100">
                      <td className="px-3 py-2 font-mono text-xs text-gray-700">{gap.key}</td>
                      <td className="px-3 py-2 text-gray-900">{gap.label}</td>
                      <td className="px-3 py-2 text-gray-600">{gap.prompt ?? '—'}</td>
                      <td className="px-3 py-2 text-gray-600">{gap.fieldType ?? 'text'}</td>
                      <td className="px-3 py-2 text-gray-600">
                        {gap.suggestedValues?.length
                          ? gap.suggestedValues.join(', ')
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

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

      {/* Publish now (approved content_drafts only). Executes the approval:
          creates the VendorPost, returns liveUrl, moves status → executed. */}
      {approval.status === 'approved' && approval.itemType === 'content_draft' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Publish</h2>
          <p className="text-xs text-gray-500">
            This draft is approved. Publish now to create the live blog post on tendorai.com.
          </p>
          {executeError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              {executeError}
            </div>
          )}
          <button
            type="button"
            onClick={handleExecute}
            disabled={executing}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition"
          >
            {executing ? 'Publishing…' : 'Publish now'}
          </button>
        </div>
      )}

      {/* Published banner (executed content_drafts with a resolvable liveUrl).
          Sources from local state (fresh execute response) or the persisted
          approval.executionResult (survives page reload). */}
      {approval.status === 'executed' && approval.itemType === 'content_draft' && (() => {
        const url = liveUrl || extractLiveUrl(approval);
        if (!url) return null;
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-green-900">Published</h2>
              <p className="text-xs text-green-800 mt-1 break-all">{url}</p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              View live post ↗
            </a>
          </div>
        );
      })()}

      {/* Post-approval indexing actions (content_draft only) */}
      {liveUrl && approval.itemType === 'content_draft' && (
        <IndexingActionPanel liveUrl={liveUrl} indexNowOk={indexNowOk ?? false} />
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
