'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import type { Approval, ApprovalItemType } from '@/lib/loop/types';
import { ITEM_TYPE_LABELS } from '@/lib/loop/types';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const STATUS_TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'executed', label: 'Executed' },
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
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  executed: 'bg-green-100 text-green-700',
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

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function VendorApprovalsListPage() {
  const router = useRouter();
  const { getCurrentToken } = useAuth();

  const [items, setItems] = useState<Approval[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: PAGE_LIMIT, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<StatusKey>('pending');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [page, setPage] = useState(1);

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

  const emptyMessage =
    activeTab === 'pending'
      ? "Nothing waiting for approval right now. We'll let you know when there's something to look at."
      : 'No items in this status yet.';

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
      ) : (
        <>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Agent</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Created</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 truncate max-w-[320px]">{item.title || '(untitled)'}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{ITEM_TYPE_LABELS[item.itemType] || item.itemType}</td>
                      <td className="px-4 py-3 text-gray-600">{AGENT_DISPLAY[item.agentName] || item.agentName}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_BADGE[item.status] || 'bg-gray-100 text-gray-700'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs" title={new Date(item.createdAt).toLocaleString('en-GB')}>
                        {relativeTime(item.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/vendor-dashboard/approvals/${item._id}`}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                        {emptyMessage}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
    </div>
  );
}
