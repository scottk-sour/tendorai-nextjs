'use client';

import { useCallback, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Approval } from '@/lib/loop/types';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

interface Props {
  approval: Approval;
  // Widened so callers can pick up the liveUrl the sequential workflow
  // returns from firm-approve — the detail page uses it to render a
  // "Published" section without a round-trip refetch.
  onApproved: (result?: { liveUrl?: string }) => void;
}

/**
 * Plain approve action for pending drafts that have neither in-body
 * [FIRM_DATA] markers (legacy PlaceholderEditor surface) nor a dataGaps
 * array (StrengthenArticleSection surface). Hits the same firm-approve
 * endpoint both other surfaces use.
 */
export default function PlainApproveBar({ approval, onApproved }: Props) {
  const { getCurrentToken } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) {
      setError('Not authenticated.');
      return;
    }
    setSubmitting(true);
    setError('');
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
        setError(msg);
        return;
      }
      const liveUrl = typeof body?.liveUrl === 'string' ? body.liveUrl : undefined;
      onApproved(liveUrl ? { liveUrl } : undefined);
    } catch {
      setError('Network error — please retry.');
    } finally {
      setSubmitting(false);
    }
  }, [approval._id, getCurrentToken, onApproved]);

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-5 space-y-2">
      <button
        type="button"
        onClick={handleApprove}
        disabled={submitting}
        className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {submitting ? 'Submitting…' : 'Approve and submit'}
      </button>
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}
