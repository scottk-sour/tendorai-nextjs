'use client';

import { use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { type WeeklyReport, formatWeekRange } from '@/app/components/report/types';
import ScoreHeader from '@/app/components/report/ScoreHeader';
import BoardSummary from '@/app/components/report/BoardSummary';
import ShareOfVoice from '@/app/components/report/ShareOfVoice';
import CompetitorPositioning from '@/app/components/report/CompetitorPositioning';
import RevenueExposure from '@/app/components/report/RevenueExposure';
import CitationIntelligence from '@/app/components/report/CitationIntelligence';
import AuthorityGraph from '@/app/components/report/AuthorityGraph';
import PerceptionAnalysis from '@/app/components/report/PerceptionAnalysis';
import Projections from '@/app/components/report/Projections';
import OpportunityFeed from '@/app/components/report/OpportunityFeed';
import RecommendedActions from '@/app/components/report/RecommendedActions';
import WhatsNext from '@/app/components/report/WhatsNext';
import DownloadPdfButton from '@/app/components/report/DownloadPdfButton';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

interface PageProps {
  params: Promise<{ reportId: string }>;
}

type LoadStatus = 'loading' | 'ready' | 'not-found' | 'error';

export default function ReportDetailPage({ params }: PageProps) {
  const { reportId } = use(params);
  const router = useRouter();
  const { auth, getCurrentToken } = useAuth();

  const [report, setReport] = useState<WeeklyReport | null>(null);
  const [firmName, setFirmName] = useState<string>('Your firm');
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginRedirect = `/vendor-login?redirect=${encodeURIComponent(
    `/vendor-dashboard/reports/${reportId}`,
  )}`;

  const load = useCallback(async () => {
    const token = getCurrentToken();
    const vendorId = auth.user?.userId;
    if (!token || !vendorId) {
      router.replace(loginRedirect);
      return;
    }

    setStatus('loading');
    setErrorMessage(null);
    const headers = { Authorization: `Bearer ${token}` };

    const [reportRes, profileRes] = await Promise.allSettled([
      fetch(
        `${API_URL}/api/vendors/${vendorId}/reports/${encodeURIComponent(reportId)}`,
        { headers },
      ),
      fetch(`${API_URL}/api/vendors/profile`, { headers }),
    ]);

    // Firm name — best-effort, never blocks the report.
    if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
      try {
        const profile = await profileRes.value.json();
        const company = profile.vendor?.company || profile.company;
        if (typeof company === 'string' && company.trim()) {
          setFirmName(company.trim());
        }
      } catch {
        /* keep the default */
      }
    }

    if (reportRes.status !== 'fulfilled') {
      setStatus('error');
      setErrorMessage('Unable to reach the report service.');
      return;
    }

    const res = reportRes.value;
    if (res.status === 401) {
      router.replace(loginRedirect);
      return;
    }
    if (res.status === 404) {
      setStatus('not-found');
      return;
    }
    if (!res.ok) {
      setStatus('error');
      setErrorMessage(`The report could not be loaded (${res.status}).`);
      return;
    }

    try {
      const json = await res.json();
      const doc = (json.report ?? json.data ?? json) as WeeklyReport | null;
      if (!doc || !doc._id) {
        setStatus('not-found');
        return;
      }
      setReport(doc);
      setStatus('ready');
    } catch {
      setStatus('error');
      setErrorMessage('The report response could not be read.');
    }
  }, [auth.user?.userId, getCurrentToken, reportId, router, loginRedirect]);

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      router.replace(loginRedirect);
      return;
    }
    load();
  }, [auth.isAuthenticated, auth.isLoading, load, router, loginRedirect]);

  if (auth.isLoading || status === 'loading') {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'not-found') {
    return (
      <div className="card p-8 text-center max-w-xl mx-auto">
        <h1
          className="text-2xl font-bold text-[var(--text)] mb-2"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Report not found
        </h1>
        <p className="text-[var(--text2)] mb-5">
          We couldn&apos;t find that report. It may belong to another account
          or no longer exist.
        </p>
        <Link
          href="/vendor-dashboard/reports"
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          ← All reports
        </Link>
      </div>
    );
  }

  if (status === 'error' || !report) {
    return (
      <div className="card p-8 text-center max-w-xl mx-auto">
        <h1
          className="text-2xl font-bold text-[var(--text)] mb-2"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Something went wrong
        </h1>
        <p className="text-[var(--text2)] mb-5">
          {errorMessage || 'The report could not be loaded.'}
        </p>
        <button
          type="button"
          onClick={() => load()}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div data-testid="report-page">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-white/95 backdrop-blur border-b border-[var(--border)] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/vendor-dashboard/reports"
              className="text-xs font-semibold text-purple-700 hover:text-purple-900"
            >
              ← All reports
            </Link>
            <h1
              className="text-xl sm:text-2xl font-bold text-[var(--text)] leading-tight mt-0.5"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {firmName}
            </h1>
            <p className="text-sm text-[var(--text2)]">
              {formatWeekRange(report.weekStartDate, report.weekEndDate)} ·{' '}
              <span className="font-medium">{report.reportNumber}</span>
            </p>
          </div>
          <DownloadPdfButton
            report={report}
            firmName={firmName}
            vendorId={report.vendorId}
          />
        </div>
      </header>

      {/* 12 sections */}
      <div className="space-y-6">
        <ScoreHeader data={report.scoreHeader} />
        <BoardSummary text={report.boardSummary} />
        <ShareOfVoice data={report.shareOfVoice} />
        <CompetitorPositioning
          competitors={report.competitors}
          headline={report.competitorHeadline}
        />
        <RevenueExposure data={report.revenueExposure} />
        <CitationIntelligence data={report.promptAnalysis} />
        <AuthorityGraph data={report.authorityGraph} />
        <PerceptionAnalysis data={report.perceptionAnalysis} />
        <Projections data={report.projections} />
        <OpportunityFeed data={report.opportunityFeed} />
        <RecommendedActions data={report.recommendedActions} />
        <WhatsNext data={report.whatsNext} />
      </div>
    </div>
  );
}
