'use client';

import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import type { WeeklyReport } from './types';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

interface Props {
  report: WeeklyReport;
  firmName: string;
  vendorId: string;
}

export default function DownloadPdfButton({
  report,
  firmName,
  vendorId,
}: Props) {
  const { getCurrentToken } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setGenerating(true);
    setError(null);
    try {
      // @react-pdf/renderer is heavy — load it (and the PDF doc) on demand.
      const [{ pdf }, { default: ReportPDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./ReportPDF'),
      ]);

      const logoUrl = `${window.location.origin}/logo.png`;
      const blob = await pdf(
        <ReportPDF report={report} firmName={firmName} logoUrl={logoUrl} />,
      ).toBlob();

      // Trigger the browser download.
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `TendorAI-Report-${report.reportNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // Tell the backend the PDF was generated (best-effort — a logging call).
      try {
        const token = getCurrentToken();
        if (token) {
          await fetch(
            `${API_URL}/api/vendors/${vendorId}/reports/${report._id}/pdf-generated`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
      } catch {
        // Non-fatal — the user already has their PDF.
      }
    } catch (err) {
      console.error('PDF generation failed:', err);
      setError('Could not generate the PDF. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        data-testid="download-pdf"
        onClick={handleDownload}
        disabled={generating}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
          />
        </svg>
        {generating ? 'Generating…' : 'Download PDF'}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
