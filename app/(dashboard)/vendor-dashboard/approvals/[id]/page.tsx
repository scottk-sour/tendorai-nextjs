'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Approval } from '@/lib/loop/types';
import { ITEM_TYPE_LABELS, ITEM_TYPE_DESCRIPTIONS } from '@/lib/loop/types';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const AGENT_DISPLAY: Record<string, string> = {
  reconnaissance: 'Reconnaissance Agent',
  detective: 'Detective Agent',
  writer: 'Writer Agent',
  builder: 'Builder Agent',
  listings: 'Listings Agent',
  reviews: 'Reviews Agent',
  reporter: 'Reporter Agent',
  manual: 'Admin team',
};

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  executed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
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

function PayloadView({ itemType, payload }: { itemType: string; payload: unknown }) {
  if (payload === null || payload === undefined || payload === '') {
    return <p className="text-sm text-gray-500 italic">No draft content was attached to this item.</p>;
  }

  if (itemType === 'content_draft' || itemType === 'press_release') {
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

  return (
    <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap font-mono">
      {jsonString(payload)}
    </pre>
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

      {/* What it says */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">What it says</h2>
        <PayloadView itemType={approval.itemType} payload={approval.draftPayload} />
      </div>

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
          {approval.decisionReason && (
            <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <span className="font-medium text-gray-700 sm:w-32">Reason</span>
              <span className="text-gray-900 whitespace-pre-wrap break-words">{approval.decisionReason}</span>
            </li>
          )}
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
