'use client';

import { useCallback, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Approval } from '@/lib/loop/types';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

// Matches [FIRM_DATA: key | label] — same syntax as backend parsePlaceholders.
const PLACEHOLDER_RE = /\[FIRM_DATA:\s*([^|]+?)\s*\|\s*([^\]]+?)\s*\]/g;

export interface ParsedPlaceholder {
  key: string;
  label: string;
}

// Parse and dedupe by key. The first label wins for duplicate keys.
export function parseUniquePlaceholders(text: string): ParsedPlaceholder[] {
  const seen = new Map<string, string>();
  for (const match of text.matchAll(PLACEHOLDER_RE)) {
    const key = match[1].trim();
    const label = match[2].trim();
    if (!seen.has(key)) seen.set(key, label);
  }
  return [...seen].map(([key, label]) => ({ key, label }));
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replace every [FIRM_DATA: key | <anyLabel>] for a given key with `value`.
function fillLocalDraft(text: string, key: string, value: string): string {
  const re = new RegExp(
    `\\[FIRM_DATA:\\s*${escapeRegex(key)}\\s*\\|\\s*[^\\]]+?\\s*\\]`,
    'g',
  );
  return text.replace(re, value);
}

// Wrap each remaining placeholder so the preview can highlight it via the
// ReactMarkdown `code` component override below.
const PREVIEW_OPEN = '⟦'; // ⟦
const PREVIEW_CLOSE = '⟧'; // ⟧
function highlightForPreview(text: string): string {
  return text.replace(PLACEHOLDER_RE, (_match, _key, label) => {
    return `\`${PREVIEW_OPEN}${String(label).trim()}${PREVIEW_CLOSE}\``;
  });
}

// Custom markdown renderer: inline-code that looks like ⟦label⟧ renders as
// an amber <mark>; real code spans pass through unchanged.
const previewComponents: Components = {
  code({ children, className, ...rest }) {
    const text = Array.isArray(children) ? children.join('') : String(children ?? '');
    if (
      text.length > 2 &&
      text.startsWith(PREVIEW_OPEN) &&
      text.endsWith(PREVIEW_CLOSE)
    ) {
      return (
        <mark className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-sm font-semibold">
          {text.slice(1, -1)} — needed
        </mark>
      );
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
};

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface Props {
  approval: Approval;
  initialDraftText: string;
  initialPlaceholders: ParsedPlaceholder[];
  // Widened so callers can pick up the liveUrl returned by firm-approve
  // under the sequential workflow.
  onApproved: (result?: { liveUrl?: string }) => void;
}

export default function PlaceholderEditor({
  approval,
  initialDraftText,
  initialPlaceholders,
  onApproved,
}: Props) {
  const { getCurrentToken } = useAuth();

  const [draftText, setDraftText] = useState(initialDraftText);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [remaining, setRemaining] = useState<number>(initialPlaceholders.length);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totalFields = initialPlaceholders.length;
  const completed = Math.max(0, totalFields - remaining);
  const progressPercent =
    totalFields > 0 ? Math.round((completed / totalFields) * 100) : 100;
  const canApprove = remaining === 0 && totalFields > 0 && !submitting;

  const previewMarkdown = useMemo(
    () => highlightForPreview(draftText),
    [draftText],
  );

  const saveField = useCallback(
    async (key: string) => {
      const raw = values[key];
      const value = (raw ?? '').trim();
      if (!value) {
        // Don't fire saves on empty — but don't error either; let them retry.
        return;
      }

      const token = getCurrentToken();
      if (!token) {
        setFieldErrors((e) => ({ ...e, [key]: 'Not authenticated.' }));
        setSaveStates((s) => ({ ...s, [key]: 'error' }));
        return;
      }

      setSaveStates((s) => ({ ...s, [key]: 'saving' }));
      setFieldErrors((e) => ({ ...e, [key]: '' }));

      try {
        const res = await fetch(
          `${API_URL}/api/vendor/approvals/${approval._id}/firm-data`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
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
          return;
        }

        const body = await res.json().catch(() => ({}));
        const backendRemaining =
          typeof body?.remainingPlaceholders === 'number'
            ? body.remainingPlaceholders
            : null;

        // Mirror the backend's substitution locally so the preview updates
        // immediately, without an extra round-trip to refetch the approval.
        setDraftText((current) => fillLocalDraft(current, key, value));
        if (backendRemaining !== null) setRemaining(backendRemaining);
        setSaveStates((s) => ({ ...s, [key]: 'saved' }));
      } catch {
        setSaveStates((s) => ({ ...s, [key]: 'error' }));
        setFieldErrors((e) => ({ ...e, [key]: 'Network error — please retry.' }));
      }
    },
    [approval._id, getCurrentToken, values],
  );

  const handleApprove = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) {
      setSubmitError('Not authenticated.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch(
        `${API_URL}/api/vendor/approvals/${approval._id}/firm-approve`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        let msg = `Couldn't submit (${res.status})`;
        if (body?.error) msg = String(body.error);
        setSubmitError(msg);
        return;
      }
      const liveUrl = typeof body?.liveUrl === 'string' ? body.liveUrl : undefined;
      onApproved(liveUrl ? { liveUrl } : undefined);
    } catch {
      setSubmitError('Network error — please retry.');
    } finally {
      setSubmitting(false);
    }
  }, [approval._id, getCurrentToken, onApproved]);

  return (
    <div className="space-y-6">
      {/* Live preview with unfilled placeholders highlighted */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
          Live preview
        </p>
        <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-gray-900">
          <ReactMarkdown components={previewComponents}>
            {previewMarkdown}
          </ReactMarkdown>
        </div>
      </div>

      {/* Editor panel */}
      <div className="rounded-lg border border-purple-200 bg-purple-50/50 p-5 sm:p-6 space-y-5">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Your details
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Fill these in and the draft updates as you go. Each field saves
            automatically when you tab away.
          </p>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span>
              {completed} of {totalFields} detail{totalFields === 1 ? '' : 's'}{' '}
              completed
            </span>
            <span className="text-gray-500">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-purple-100 overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {initialPlaceholders.map((p) => {
            const state = saveStates[p.key] ?? 'idle';
            const error = fieldErrors[p.key];
            return (
              <div key={p.key}>
                <label
                  htmlFor={`firm-data-${p.key}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  {p.label}
                </label>
                <div className="mt-1 flex items-stretch gap-2">
                  <input
                    id={`firm-data-${p.key}`}
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
                    <span className="text-red-600 font-medium">{error || 'Error — retry'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Approve */}
        <div className="pt-4 border-t border-purple-200 space-y-2">
          <button
            type="button"
            onClick={handleApprove}
            disabled={!canApprove}
            className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {submitting
              ? 'Submitting…'
              : remaining === 0
                ? 'Approve and submit'
                : `Fill ${remaining} remaining detail${remaining === 1 ? '' : 's'} to publish`}
          </button>
          {submitError && (
            <p className="text-sm text-red-600 font-medium">{submitError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
