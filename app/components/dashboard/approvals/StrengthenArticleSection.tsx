'use client';

import { useCallback, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Approval, DataGap } from '@/lib/loop/types';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface Props {
  approval: Approval;
  initialGaps: DataGap[];
  onApproved: () => void;
}

export default function StrengthenArticleSection({
  approval,
  initialGaps,
  onApproved,
}: Props) {
  const { getCurrentToken } = useAuth();

  // Gaps the user hasn't yet filled. We optimistically remove each row on
  // successful save instead of refetching the approval.
  const [gaps, setGaps] = useState<DataGap[]>(initialGaps);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totalFields = initialGaps.length;
  const completed = Math.max(0, totalFields - gaps.length);
  const progressPercent =
    totalFields > 0 ? Math.round((completed / totalFields) * 100) : 100;
  const allDone = gaps.length === 0 && totalFields > 0;

  const saveField = useCallback(
    async (gap: DataGap) => {
      const key = gap.key;
      const raw = values[key];
      const value = (raw ?? '').trim();
      if (!value) return;

      const token = getCurrentToken();
      if (!token) {
        setFieldErrors((e) => ({ ...e, [key]: 'Not authenticated.' }));
        setSaveStates((s) => ({ ...s, [key]: 'error' }));
        return;
      }

      setSaveStates((s) => ({ ...s, [key]: 'saving' }));
      setFieldErrors((e) => ({ ...e, [key]: '' }));

      try {
        // Same endpoint PlaceholderEditor has always used. The backend writes
        // the value to Vendor.firmFacts[key] and removes the gap from the
        // approval's dataGaps array server-side.
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

        setSaveStates((s) => ({ ...s, [key]: 'saved' }));
        // Optimistically remove the row. Backend has stored the value;
        // the next time the approval is fetched the gap will be absent too.
        setGaps((current) => current.filter((g) => g.key !== key));
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
      if (!res.ok) {
        let msg = `Couldn't submit (${res.status})`;
        try {
          const body = await res.json();
          if (body?.error) msg = String(body.error);
        } catch {
          /* keep default */
        }
        setSubmitError(msg);
        return;
      }
      onApproved();
    } catch {
      setSubmitError('Network error — please retry.');
    } finally {
      setSubmitting(false);
    }
  }, [approval._id, getCurrentToken, onApproved]);

  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50/50 p-5 sm:p-6 space-y-5">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Strengthen this article
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Add your firm&apos;s real figures — they&apos;re stored and reused in
          future content, and make this article something AI assistants will cite.
        </p>
      </div>

      {/* Progress */}
      {totalFields > 0 && (
        <div>
          <div className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span>
              {completed} of {totalFields} field{totalFields === 1 ? '' : 's'}{' '}
              added
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
      )}

      {/* Inputs */}
      {gaps.length > 0 && (
        <div className="space-y-4">
          {gaps.map((gap) => (
            <GapRow
              key={gap.key}
              gap={gap}
              value={values[gap.key] ?? ''}
              onChange={(v) =>
                setValues((curr) => ({ ...curr, [gap.key]: v }))
              }
              onSave={() => saveField(gap)}
              state={saveStates[gap.key] ?? 'idle'}
              error={fieldErrors[gap.key]}
            />
          ))}
        </div>
      )}

      {allDone && (
        <p className="text-sm text-green-700 font-medium">
          All set. Submit when you&apos;re ready.
        </p>
      )}

      {/* Approve / submit */}
      <div className="pt-4 border-t border-purple-200 space-y-2">
        <button
          type="button"
          onClick={handleApprove}
          disabled={submitting}
          className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {submitting
            ? 'Submitting…'
            : gaps.length === 0
              ? 'Approve and submit'
              : `Approve as-is (${gaps.length} field${gaps.length === 1 ? '' : 's'} unfilled)`}
        </button>
        {gaps.length > 0 && (
          <p className="text-xs text-gray-500">
            You can submit without filling every field — but each one you add
            strengthens this and every future article.
          </p>
        )}
        {submitError && (
          <p className="text-sm text-red-600 font-medium">{submitError}</p>
        )}
      </div>
    </div>
  );
}

// ─── GapRow ──────────────────────────────────────────────────────────
// Module-scope component (stable identity) so the input doesn't lose focus
// across re-renders of the parent — same lesson learned in
// SettingsContent's TagInput fix.

interface GapRowProps {
  gap: DataGap;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  state: SaveState;
  error?: string;
}

function GapRow({ gap, value, onChange, onSave, state, error }: GapRowProps) {
  const inputId = `gap-${gap.key}`;
  const fieldType = gap.fieldType ?? 'text';
  const isSelect = fieldType === 'select' && (gap.suggestedValues?.length ?? 0) > 0;
  const isTextarea = fieldType === 'textarea';

  const baseInputClass = `flex-1 rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
    state === 'error'
      ? 'border-red-300 bg-red-50'
      : 'border-gray-300 bg-white'
  }`;

  const trimmed = value.trim();
  const saveDisabled = state === 'saving' || !trimmed;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {gap.label}
      </label>
      {gap.prompt && (
        <p className="text-xs text-gray-500 mt-0.5">{gap.prompt}</p>
      )}
      <div className={`mt-1 ${isTextarea ? 'space-y-2' : 'flex items-stretch gap-2'}`}>
        {isTextarea ? (
          <textarea
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className={baseInputClass}
            disabled={state === 'saving'}
          />
        ) : isSelect ? (
          <select
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClass}
            disabled={state === 'saving'}
          >
            <option value="">Select…</option>
            {gap.suggestedValues?.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            type={fieldType === 'number' ? 'number' : 'text'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            list={
              (gap.suggestedValues?.length ?? 0) > 0
                ? `${inputId}-suggestions`
                : undefined
            }
            className={baseInputClass}
            disabled={state === 'saving'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && trimmed && state !== 'saving') {
                e.preventDefault();
                onSave();
              }
            }}
          />
        )}
        {!isTextarea && (gap.suggestedValues?.length ?? 0) > 0 && fieldType !== 'select' && (
          <datalist id={`${inputId}-suggestions`}>
            {gap.suggestedValues?.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        )}
        <button
          type="button"
          onClick={onSave}
          disabled={saveDisabled}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition ${
            isTextarea
              ? 'self-end bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
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
}
