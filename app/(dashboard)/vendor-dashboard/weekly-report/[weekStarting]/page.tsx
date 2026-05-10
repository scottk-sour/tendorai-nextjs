'use client';

import { useCallback, useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import WeeklyReportHeader from '@/app/components/dashboard/weekly-report/WeeklyReportHeader';
import HeroSection from '@/app/components/dashboard/weekly-report/HeroSection';
import PlatformBreakdownSection from '@/app/components/dashboard/weekly-report/PlatformBreakdownSection';
import LoopSection from '@/app/components/dashboard/weekly-report/LoopSection';
import {
  type WeeklyReportDigest,
  type WeekHeader,
  type ScoreHistoryEntry,
  formatLongDate,
} from '@/app/components/dashboard/weekly-report/types';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

interface PageProps {
  params: Promise<{ weekStarting: string }>;
}

interface FetchState {
  digest: WeeklyReportDigest | null;
  weeksList: WeekHeader[];
  scoreHistory: ScoreHistoryEntry[];
  joinedScore: number | null;
  joinedAt: string | null;
}

type LoadStatus = 'loading' | 'ready' | 'snapshot-not-found' | 'no-history';

export default function WeeklyReportPage({ params }: PageProps) {
  // Next.js 15 — params is a Promise. Unwrap with React `use`.
  const { weekStarting } = use(params);

  const router = useRouter();
  const { auth, getCurrentToken } = useAuth();

  const [data, setData] = useState<FetchState>({
    digest: null,
    weeksList: [],
    scoreHistory: [],
    joinedScore: null,
    joinedAt: null,
  });
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setStatus('loading');
    setErrorMessage(null);

    const headers = { Authorization: `Bearer ${token}` };

    let saw401 = false;
    const guard = (res: Response): Response => {
      if (res.status === 401) saw401 = true;
      return res;
    };

    const [snapshotR, listR, historyR] = await Promise.allSettled([
      fetch(`${API_URL}/api/vendor/weekly-report/${encodeURIComponent(weekStarting)}`, {
        headers,
      }).then(guard),
      fetch(`${API_URL}/api/vendor/weekly-report/list`, { headers }).then(guard),
      fetch(
        `${API_URL}/api/vendor/weekly-report/${encodeURIComponent(weekStarting)}/score-history`,
        { headers },
      ).then(guard),
    ]);

    if (saw401) {
      router.replace(
        `/vendor-login?redirect=/vendor-dashboard/weekly-report/${encodeURIComponent(weekStarting)}`,
      );
      return;
    }

    // Weeks list — always attempted (needed for both ready and 404 states).
    // Wrapper key: { reports: WeekHeader[] }
    let weeksList: WeekHeader[] = [];
    if (listR.status === 'fulfilled' && listR.value.ok) {
      try {
        const listJson = await listR.value.json();
        const reports = listJson.reports;
        if (Array.isArray(reports)) {
          weeksList = (reports as WeekHeader[]).filter(
            (w) => w && typeof w.weekStarting === 'string' && typeof w.weekEnding === 'string',
          );
        }
        // Non-array response → treat as empty list. Defensive against backend
        // returning an error envelope where the 200 status was misleading.
      } catch {
        // ignore — weeksList stays []
      }
    }

    // Score history — flat shape: { history, joinedScore, joinedAt }
    let scoreHistory: ScoreHistoryEntry[] = [];
    let joinedScore: number | null = null;
    let joinedAt: string | null = null;
    if (historyR.status === 'fulfilled' && historyR.value.ok) {
      try {
        const historyJson = await historyR.value.json();
        if (Array.isArray(historyJson.history)) {
          scoreHistory = (historyJson.history as ScoreHistoryEntry[]).filter(
            (h) =>
              h && typeof h.weekStarting === 'string' && typeof h.score === 'number',
          );
        }
        if (typeof historyJson.joinedScore === 'number') joinedScore = historyJson.joinedScore;
        if (typeof historyJson.joinedAt === 'string') joinedAt = historyJson.joinedAt;
      } catch {
        // ignore
      }
    }

    // Snapshot — wrapper key: { report: WeeklyReportDigest }.
    // 404 → no report for this week.
    if (snapshotR.status === 'fulfilled') {
      if (snapshotR.value.status === 404) {
        setData({
          digest: null,
          weeksList,
          scoreHistory,
          joinedScore,
          joinedAt,
        });
        setStatus(weeksList.length === 0 ? 'no-history' : 'snapshot-not-found');
        return;
      }
      if (!snapshotR.value.ok) {
        throw new Error(`Snapshot request failed (${snapshotR.value.status})`);
      }
      try {
        const snapshotJson = await snapshotR.value.json();
        const digest = snapshotJson.report?.digest as WeeklyReportDigest | null | undefined;
        // Defensive: backend returned 200 but report is null/undefined →
        // treat as snapshot-not-found (same UX as a true 404).
        if (!digest) {
          setData({
            digest: null,
            weeksList,
            scoreHistory,
            joinedScore,
            joinedAt,
          });
          setStatus(weeksList.length === 0 ? 'no-history' : 'snapshot-not-found');
          return;
        }
        setData({
          digest,
          weeksList,
          scoreHistory,
          joinedScore,
          joinedAt,
        });
        setStatus('ready');
        return;
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : 'Failed to parse snapshot response',
        );
      }
    } else {
      throw snapshotR.reason instanceof Error
        ? snapshotR.reason
        : new Error('Snapshot request failed');
    }
  }, [getCurrentToken, weekStarting, router]);

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      router.replace(
        `/vendor-login?redirect=/vendor-dashboard/weekly-report/${encodeURIComponent(weekStarting)}`,
      );
      return;
    }
    loadAll().catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : 'Unable to load report';
      setErrorMessage(msg);
      setStatus('ready'); // surfaces error UI below; error.tsx is for thrown errors
    });
  }, [auth.isAuthenticated, auth.isLoading, loadAll, router, weekStarting]);

  // Auth still resolving — render nothing (loading.tsx covers initial nav).
  if (auth.isLoading || status === 'loading') {
    return null;
  }

  // No-history state — vendor has zero reports yet (just upgraded).
  if (status === 'no-history') {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8 text-center">
            <h1
              className="text-2xl font-bold text-[var(--text)] mb-3"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Welcome to Pro
            </h1>
            <p className="text-[var(--text2)] max-w-xl mx-auto">
              Your first weekly report will be generated next Monday morning at 8am
              UK time. We’ll email you when it’s ready.
            </p>
            <Link
              href="/vendor-dashboard"
              className="inline-flex items-center mt-6 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Snapshot 404 — there's no report for this specific week, but other
  // weeks exist.
  if (status === 'snapshot-not-found') {
    const sorted = [...data.weeksList].sort(
      (a, b) => new Date(a.weekStarting).getTime() - new Date(b.weekStarting).getTime(),
    );
    const firstReport = sorted[0]?.weekStarting ?? null;
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8">
            <h1
              className="text-2xl font-bold text-[var(--text)] mb-3"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              No report for the week of {formatLongDate(weekStarting)}
            </h1>
            {firstReport && (
              <p className="text-[var(--text2)] mb-6">
                Reports begin from {formatLongDate(firstReport)}.
              </p>
            )}
            {data.weeksList.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-[var(--text)] mb-3">
                  Available weeks
                </p>
                <ul className="space-y-2">
                  {data.weeksList.map((w) => {
                    // Backend may serialise weekStarting as full ISO datetime
                    // — strip to YYYY-MM-DD so the link matches the route.
                    const datePart = w.weekStarting.includes('T')
                      ? new Date(w.weekStarting).toISOString().split('T')[0]
                      : w.weekStarting;
                    return (
                      <li key={w.weekStarting}>
                        <Link
                          href={`/vendor-dashboard/weekly-report/${datePart}`}
                          className="text-sm text-purple-700 hover:text-purple-900 font-medium"
                        >
                          Week of {formatLongDate(w.weekStarting)} →
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Soft-error fallback (network blip etc.) — error.tsx handles thrown.
  if (errorMessage || !data.digest) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8">
            <h1 className="text-xl font-bold text-[var(--text)] mb-2">
              Couldn’t load this report
            </h1>
            <p className="text-[var(--text2)] mb-6">
              {errorMessage || 'No data returned for this week.'}
            </p>
            <button
              type="button"
              onClick={() => loadAll().catch(() => undefined)}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  const digest = data.digest;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <WeeklyReportHeader
          firmName={digest.firmName}
          weekStarting={digest.weekStarting}
          weekEnding={digest.weekEnding}
          generatedAt={digest.generatedAt}
          weeksList={data.weeksList}
          currentWeekStarting={weekStarting}
        />

        <HeroSection
          digest={digest}
          scoreHistory={data.scoreHistory}
          joinedScore={data.joinedScore}
          joinedAt={data.joinedAt}
        />

        <PlatformBreakdownSection byPlatform={digest.citations?.byPlatform} />

        <LoopSection digest={digest} vendorId={auth.user?.userId ?? ''} />

        {/* TODO Section 4 — Detective reasoning */}
        {/* TODO Section 5 — Citations gallery */}
        {/* TODO Section 6 — Competitor moves */}
        {/* TODO Section 7 — Next-week plan */}
        {/* TODO Section 8 — Items needing input */}
        {/* TODO Section 9 — Footer */}
      </div>
    </main>
  );
}
