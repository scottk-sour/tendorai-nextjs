'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { type ReportListItem, formatWeekRange } from '@/app/components/report/types';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

type LoadStatus = 'loading' | 'ready' | 'error';

function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, string> = {
    viewed: 'bg-green-100 text-green-700',
    sent: 'bg-blue-100 text-blue-700',
    generated: 'bg-slate-100 text-slate-600',
  };
  const cls = map[status ?? 'generated'] ?? 'bg-slate-100 text-slate-600';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}
    >
      {status ?? 'generated'}
    </span>
  );
}

function TrendArrow({ change }: { change?: number }) {
  if (typeof change !== 'number' || !Number.isFinite(change) || change === 0) {
    return <span className="text-gray-400">→</span>;
  }
  return change > 0 ? (
    <span className="text-green-600">↑</span>
  ) : (
    <span className="text-red-600">↓</span>
  );
}

export default function ReportsListPage() {
  const router = useRouter();
  const { auth, getCurrentToken } = useAuth();
  const [reports, setReports] = useState<ReportListItem[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [tier, setTier] = useState<string>('free');

  const load = useCallback(async () => {
    const token = getCurrentToken();
    const vendorId = auth.user?.userId;
    if (!token || !vendorId) {
      router.replace('/vendor-login?redirect=/vendor-dashboard/reports');
      return;
    }
    setStatus('loading');
    try {
      // Profile fetch in parallel — we need tier to pick the right empty-state copy.
      fetch(`${API_URL}/api/vendors/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data?.vendor?.tier) setTier(data.vendor.tier);
        })
        .catch(() => { /* silent — defaults to 'free' */ });

      const res = await fetch(`${API_URL}/api/vendors/${vendorId}/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        router.replace('/vendor-login?redirect=/vendor-dashboard/reports');
        return;
      }
      if (!res.ok) {
        setStatus('error');
        return;
      }
      const json = await res.json();
      const list = json.reports ?? json.data ?? json;
      const rows: ReportListItem[] = Array.isArray(list)
        ? list.filter((r) => r && r._id)
        : [];
      // Newest first by week start.
      rows.sort(
        (a, b) =>
          new Date(b.weekStartDate).getTime() -
          new Date(a.weekStartDate).getTime(),
      );
      setReports(rows);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [auth.user?.userId, getCurrentToken, router]);

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      router.replace('/vendor-login?redirect=/vendor-dashboard/reports');
      return;
    }
    load();
  }, [auth.isAuthenticated, auth.isLoading, load, router]);

  return (
    <div data-testid="reports-list-page">
      <header className="mb-6">
        <h1
          className="text-2xl sm:text-3xl font-bold text-[var(--text)]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          AI Visibility Intelligence Reports
        </h1>
        <p className="text-sm text-[var(--text2)] mt-1">
          Your weekly intelligence reports — newest first.
        </p>
      </header>

      {(auth.isLoading || status === 'loading') && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {status === 'error' && (
        <div className="card p-8 text-center">
          <p className="text-[var(--text2)] mb-4">
            We couldn&apos;t load your reports.
          </p>
          <button
            type="button"
            onClick={() => load()}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Try again
          </button>
        </div>
      )}

      {status === 'ready' && reports.length === 0 && (
        <div data-testid="reports-empty" className="card p-10 text-center">
          <h2
            className="text-xl font-bold text-[var(--text)] mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            No reports yet
          </h2>
          {tier === 'pro' || tier === 'managed' || tier === 'enterprise' ? (
            <p className="text-[var(--text2)] max-w-md mx-auto">
              Your first AI Visibility Intelligence Report will be generated Monday morning UK
              time. We&apos;ll email you when it&apos;s ready.
            </p>
          ) : (
            <div className="max-w-md mx-auto">
              <p className="text-[var(--text2)] mb-4">
                AI Visibility Intelligence Reports are generated weekly on Pro. Upgrade to get
                yours every Monday.
              </p>
              <Link
                href="/vendor-dashboard/settings?tab=subscription"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Upgrade to Pro
              </Link>
            </div>
          )}
        </div>
      )}

      {status === 'ready' && reports.length > 0 && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-[var(--text3)] bg-gray-50">
                  <th className="py-3 px-4 font-semibold">Week</th>
                  <th className="py-3 px-4 font-semibold">Report</th>
                  <th className="py-3 px-4 font-semibold text-right">Score</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">View</th>
                </tr>
              </thead>
              <tbody data-testid="reports-rows">
                {reports.map((r) => (
                  <tr
                    key={r._id}
                    data-testid="report-row"
                    className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-[var(--text)]">
                      {formatWeekRange(r.weekStartDate, r.weekEndDate)}
                    </td>
                    <td className="py-3 px-4 text-[var(--text2)]">
                      {r.reportNumber}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums font-semibold text-[var(--text)]">
                      <span className="inline-flex items-center gap-1.5">
                        <TrendArrow change={r.scoreHeader?.weeklyChange} />
                        {typeof r.scoreHeader?.currentScore === 'number'
                          ? r.scoreHeader.currentScore
                          : '—'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/vendor-dashboard/reports/${r._id}`}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
