'use client';

import { useCallback, useMemo, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Approval } from '@/lib/loop/types';
import {
  parseUniquePlaceholders,
  type ParsedPlaceholder,
} from './PlaceholderEditor';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export type RepublishResult =
  | { ok: true; liveUrl?: string }
  | { ok: false; error: string };

interface Props {
  approval: Approval;
  // Raw draft body text — used to parse the [FIRM_DATA: key | label]
  // markers and to gate approve on all keys having values.
  bodyText: string;
  // 'approve' — pre-publish flow used while status is 'approved' or
  // 'failed'. POSTs firm-approve, exposes the reject-with-comment
  // control. Default.
  // 'republish' — post-publish edit flow used while status is
  // 'executed'. POSTs firm-republish, hides reject (the post is
  // already live), and hands both success and failure back to the
  // parent so the "Live post updated" banner or the returned reason
  // can render above this section rather than inside it.
  mode?: 'approve' | 'republish';
  // Fires when firm-approve succeeds. Widened to carry the liveUrl the
  // sequential workflow returns so the parent can render a Published
  // banner without a refetch. Required for 'approve' mode.
  onApproved?: (result?: { liveUrl?: string }) => void;
  // Fires when firm-reject succeeds. The reason is passed through so
  // the parent can patch local state to show the rejection immediately.
  // Required for 'approve' mode.
  onRejected?: (reason: string) => void;
  // Fires for both success and failure of firm-republish. Required for
  // 'republish' mode. The parent shows the resulting banner above this
  // section.
  onRepublished?: (result: RepublishResult) => void;
}

/**
 * Persistent firm-details section for the vendor approval detail page.
 *
 * Renders at the bottom of the page whenever a content_draft is
 * actionable by the firm (status 'approved' or 'failed'). Every
 * placeholder key from the body is listed with the current saved value
 * pre-filled from approval.firmData, each field savable individually
 * or as a batch. Approve & Publish is gated on all keys having values.
 * On a failed publish the parent renders a failure banner above; this
 * component keeps its inputs editable so the firm can update the
 * offending values and click Approve & Publish again.
 */
export default function FirmDetailsSection({
  approval,
  bodyText,
  mode = 'approve',
  onApproved,
  onRejected,
  onRepublished,
}: Props) {
  const { getCurrentToken } = useAuth();
  const isRepublish = mode === 'republish';

  // Placeholders parsed from the body — order matches first-appearance
  // in the body, so the section reads left-to-right the same way the
  // article does.
  const placeholders: ParsedPlaceholder[] = useMemo(
    () => parseUniquePlaceholders(bodyText),
    [bodyText],
  );

  // Seed local values from approval.firmData (what the backend has
  // persisted so far). Missing keys default to empty strings so every
  // placeholder has a controlled input.
  const [values, setValues] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {};
    for (const p of placeholders) {
      const existing = approval.firmData?.[p.key];
      seed[p.key] = typeof existing === 'string' ? existing : '';
    }
    return seed;
  });

  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [savingAll, setSavingAll] = useState(false);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [approveError, setApproveError] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState('');

  const totalFields = placeholders.length;
  const filledCount = placeholders.filter(
    (p) => (values[p.key] ?? '').trim().length > 0,
  ).length;
  const remaining = Math.max(0, totalFields - filledCount);
  const allFilled = totalFields > 0 && remaining === 0;

  // POST a single field. Backend endpoint is the same one PlaceholderEditor
  // has always used — it writes to vendor.firmData[key] and echoes any
  // updated remainingPlaceholders count back.
  const saveField = useCallback(
    async (key: string): Promise<boolean> => {
      const value = (values[key] ?? '').trim();
      if (!value) return false;
      const token = getCurrentToken();
      if (!token) {
        setFieldErrors((e) => ({ ...e, [key]: 'Not authenticated.' }));
        setSaveStates((s) => ({ ...s, [key]: 'error' }));
        return false;
      }
      setSaveStates((s) => ({ ...s, [key]: 'saving' }));
      setFieldErrors((e) => ({ ...e, [key]: '' }));
      try {
        const res = await fetch(
          `${API_URL}/api/vendor/approvals/${approval._id}/firm-data`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key, value }),
          },
        );
        if (!res.ok) {
          let msg = `Save failed (${res.status})`;
          try {
            const body = await res.json();
            if (body?.error) msg = String(body.error);
          } catch {
            /* keep default */
          }
          setSaveStates((s) => ({ ...s, [key]: 'error' }));
          setFieldErrors((e) => ({ ...e, [key]: msg }));
          return false;
        }
        setSaveStates((s) => ({ ...s, [key]: 'saved' }));
        return true;
      } catch {
        setSaveStates((s) => ({ ...s, [key]: 'error' }));
        setFieldErrors((e) => ({
          ...e,
          [key]: 'Network error — please retry.',
        }));
        return false;
      }
    },
    [approval._id, getCurrentToken, values],
  );

  // Save every field that has a non-empty value the firm hasn't yet
  // successfully persisted. Simpler and safer than a bulk endpoint
  // (which the backend doesn't expose here) — just fans out to the
  // same per-field POST and collects the results.
  const saveAllPending = useCallback(async (): Promise<boolean> => {
    setSavingAll(true);
    try {
      const results = await Promise.all(
        placeholders.map((p) => {
          const v = (values[p.key] ?? '').trim();
          if (!v) return Promise.resolve(false);
          // Skip fields already marked saved to avoid redundant writes.
          if (saveStates[p.key] === 'saved') return Promise.resolve(true);
          return saveField(p.key);
        }),
      );
      return results.every(Boolean);
    } finally {
      setSavingAll(false);
    }
  }, [placeholders, saveField, saveStates, values]);

  const handleApprove = useCallback(async () => {
    if (!allFilled) return;
    setApproving(true);
    setApproveError('');
    // The reject-with-comment control fires firm-approve's sibling
    // endpoint; both use the same handler so failures are routed to
    // approveError (approve mode) or up through onRepublished (republish
    // mode) in one place.
    const reportError = (msg: string) => {
      if (isRepublish) {
        onRepublished?.({ ok: false, error: msg });
      } else {
        setApproveError(msg);
      }
    };
    try {
      // Save any pending edits before firing firm-approve/firm-republish
      // so the published post reflects the latest values.
      const ok = await saveAllPending();
      if (!ok) {
        reportError('Some details failed to save. Fix the errors above and retry.');
        return;
      }
      const token = getCurrentToken();
      if (!token) {
        reportError('Not authenticated.');
        return;
      }
      const endpoint = isRepublish ? 'firm-republish' : 'firm-approve';
      const res = await fetch(
        `${API_URL}/api/vendor/approvals/${approval._id}/${endpoint}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        let msg = `Couldn't submit (${res.status})`;
        if (body?.error) msg = String(body.error);
        reportError(msg);
        return;
      }
      const liveUrl = typeof body?.liveUrl === 'string' ? body.liveUrl : undefined;
      if (isRepublish) {
        onRepublished?.({ ok: true, liveUrl });
      } else {
        onApproved?.(liveUrl ? { liveUrl } : undefined);
      }
    } catch {
      reportError('Network error — please retry.');
    } finally {
      setApproving(false);
    }
  }, [
    allFilled,
    approval._id,
    getCurrentToken,
    isRepublish,
    onApproved,
    onRepublished,
    saveAllPending,
  ]);

  const handleReject = useCallback(async () => {
    const trimmed = rejectReason.trim();
    if (!trimmed) {
      setRejectError('Please add a comment so the team knows what to change.');
      return;
    }
    const token = getCurrentToken();
    if (!token) {
      setRejectError('Not authenticated.');
      return;
    }
    setRejecting(true);
    setRejectError('');
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
        setRejectError(msg);
        return;
      }
      onRejected?.(trimmed);
    } catch {
      setRejectError('Network error — please retry.');
    } finally {
      setRejecting(false);
    }
  }, [approval._id, getCurrentToken, onRejected, rejectReason]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Your details</h2>
        <p className="text-sm text-gray-600 mt-1">
          {isRepublish
            ? 'Change any value and click Update & republish to update the live post. Each field saves automatically when you tab away, or use Save all.'
            : 'Fill in the details below and click Approve & Publish. Each field saves automatically when you tab away, or use Save all.'}
        </p>
      </div>

      {/* Progress */}
      {totalFields > 0 && (
        <div>
          <div className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span>
              {filledCount} of {totalFields} detail
              {totalFields === 1 ? '' : 's'} filled
            </span>
            <span className="text-gray-500">
              {Math.round((filledCount / totalFields) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-purple-100 overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${(filledCount / totalFields) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Empty state — no placeholders in body */}
      {totalFields === 0 && (
        <p className="text-sm text-gray-600">
          {isRepublish
            ? "This draft doesn't have any firm-specific details to update."
            : "This draft doesn't need any firm-specific details. Click Approve & Publish to send it live."}
        </p>
      )}

      {/* Inputs */}
      {totalFields > 0 && (
        <div className="space-y-4">
          {placeholders.map((p) => {
            const state = saveStates[p.key] ?? 'idle';
            const err = fieldErrors[p.key];
            return (
              <div key={p.key}>
                <label
                  htmlFor={`firm-detail-${p.key}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  {p.label}
                </label>
                <div className="mt-1 flex items-stretch gap-2">
                  <input
                    id={`firm-detail-${p.key}`}
                    type="text"
                    value={values[p.key] ?? ''}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [p.key]: e.target.value }))
                    }
                    onBlur={() => {
                      const v = (values[p.key] ?? '').trim();
                      if (v && state !== 'saving') saveField(p.key);
                    }}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      state === 'error'
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    disabled={state === 'saving'}
                  />
                  <button
                    type="button"
                    onClick={() => saveField(p.key)}
                    disabled={state === 'saving' || !(values[p.key] ?? '').trim()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {state === 'saving' ? 'Saving…' : 'Save'}
                  </button>
                </div>
                <div className="mt-1 min-h-[1rem] text-xs">
                  {state === 'saved' && (
                    <span className="text-green-600 font-medium">Saved ✓</span>
                  )}
                  {state === 'error' && (
                    <span className="text-red-600 font-medium">
                      {err || 'Error — retry'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Approve / Republish */}
      <div className="pt-4 border-t border-gray-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            onClick={handleApprove}
            disabled={approving || savingAll || (totalFields > 0 && !allFilled)}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {approving
              ? isRepublish
                ? 'Republishing…'
                : 'Publishing…'
              : totalFields > 0 && !allFilled
                ? `Fill ${remaining} remaining detail${remaining === 1 ? '' : 's'} to ${isRepublish ? 'republish' : 'publish'}`
                : isRepublish
                  ? 'Update & republish'
                  : 'Approve & Publish'}
          </button>
          {totalFields > 0 && (
            <button
              type="button"
              onClick={saveAllPending}
              disabled={savingAll || approving}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
              {savingAll ? 'Saving…' : 'Save all'}
            </button>
          )}
        </div>
        {/* Approve-mode errors render inline. Republish-mode errors are
            reported to the parent (onRepublished) and shown in the
            banner above this section per the workflow spec. */}
        {!isRepublish && approveError && (
          <p className="text-sm text-red-600 font-medium">{approveError}</p>
        )}
      </div>

      {/* Reject with required comment — approve mode only. A published
          post can't be un-published from here; edits go through
          Update & republish instead. */}
      {!isRepublish && (
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Or reject this draft
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              A comment is required so the team knows what needs to change.
            </p>
          </div>
          <textarea
            value={rejectReason}
            onChange={(e) => {
              setRejectReason(e.target.value);
              if (rejectError) setRejectError('');
            }}
            rows={3}
            placeholder="What needs to change?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
          />
          {rejectError && (
            <p className="text-sm text-red-600 font-medium">{rejectError}</p>
          )}
          <button
            type="button"
            onClick={handleReject}
            disabled={rejecting || approving || !rejectReason.trim()}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {rejecting ? 'Submitting…' : 'Reject with comment'}
          </button>
        </div>
      )}
    </div>
  );
}
