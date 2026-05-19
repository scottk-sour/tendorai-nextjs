'use client';

import { use, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import type { ReportListItem } from '@/app/components/report/types';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

interface PageProps {
  params: Promise<{ weekStarting: string }>;
}

// Normalise any ISO date/datetime to a YYYY-MM-DD string for comparison.
function toDateOnly(iso: string | undefined | null): string {
  if (!iso) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().split('T')[0];
}

/**
 * Backwards-compatibility redirect.
 *
 * The old PR #45 weekly-report system was replaced by the AI Visibility
 * Intelligence Report (PR #74). Existing email links and bookmarks to
 * /vendor-dashboard/weekly-report/YYYY-MM-DD still arrive here — we look up
 * the matching report by its week start date and forward to the new page.
 */
export default function WeeklyReportRedirectPage({ params }: PageProps) {
  const { weekStarting } = use(params);
  const router = useRouter();
  const { auth, getCurrentToken } = useAuth();
  const [message] = useState('Looking up your report…');

  const loginRedirect = `/vendor-login?redirect=${encodeURIComponent(
    `/vendor-dashboard/weekly-report/${weekStarting}`,
  )}`;

  const resolve = useCallback(async () => {
    const token = getCurrentToken();
    const vendorId = auth.user?.userId;
    if (!token || !vendorId) {
      router.replace(loginRedirect);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/vendors/${vendorId}/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        router.replace(loginRedirect);
        return;
      }
      if (!res.ok) {
        // Can't resolve the specific week — fall back to the reports list.
        router.replace('/vendor-dashboard/reports');
        return;
      }
      const json = await res.json();
      const list = json.reports ?? json.data ?? json;
      const rows: ReportListItem[] = Array.isArray(list)
        ? list.filter((r) => r && r._id)
        : [];
      const target = toDateOnly(weekStarting);
      const match = rows.find((r) => toDateOnly(r.weekStartDate) === target);
      router.replace(
        match
          ? `/vendor-dashboard/reports/${match._id}`
          : '/vendor-dashboard/reports',
      );
    } catch {
      router.replace('/vendor-dashboard/reports');
    }
  }, [auth.user?.userId, getCurrentToken, router, weekStarting, loginRedirect]);

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      router.replace(loginRedirect);
      return;
    }
    resolve();
  }, [auth.isAuthenticated, auth.isLoading, resolve, router, loginRedirect]);

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-[var(--text2)]">{message}</p>
    </div>
  );
}
