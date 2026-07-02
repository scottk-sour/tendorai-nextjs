import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import connectDB from '@/lib/db/connection';
import { AeoReport, Vendor } from '@/lib/db/models';
import AeoReportDisplay from './AeoReportDisplay';
import { computeProfileGaps } from './profileGaps';

interface Props {
  params: Promise<{ reportId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { reportId } = await params;
  await connectDB();

  const report = await AeoReport.findById(reportId)
    .select('companyName category city score')
    .lean();

  if (!report) {
    return { title: 'Report Not Found — TendorAI' };
  }

  const title = `AI Visibility Report: ${report.companyName} — Score ${report.score}/100`;
  const description = `${report.companyName} scored ${report.score}/100 for AI visibility in ${report.category} (${report.city}). See who AI recommends instead and how to fix it.`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'TendorAI',
      locale: 'en_GB',
      images: [{ url: '/logo.png', width: 873, height: 873 }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: { index: false, follow: false },
  };
}

export default async function AeoReportResultPage({ params }: Props) {
  const { reportId } = await params;
  await connectDB();

  const report = await AeoReport.findById(reportId)
    .select('-pdfBuffer -ipAddress')
    .lean();

  if (!report || report.reportType !== 'full') {
    notFound();
  }

  // Legacy methodology: reports scored before the Technical Health + AI Visibility
  // rewrite have neither of the new score fields populated. Rendering them shows
  // "null/100" + a deprecated-banner — kill that UX. Redirect to the form prefilled
  // with what we know so the user re-runs in one click.
  const isLegacyScoring =
    (report.technicalHealthScore === null || report.technicalHealthScore === undefined) &&
    (report.aiVisibilityScore === null || report.aiVisibilityScore === undefined);

  if (isLegacyScoring) {
    const qs = new URLSearchParams({ legacy: 'true' });
    if (report.companyName) qs.set('company', report.companyName);
    if (report.category) qs.set('category', report.category);
    if (report.city) qs.set('city', report.city);
    if (report.email) qs.set('email', report.email);
    redirect(`/ai-visibility-report?${qs.toString()}`);
  }

  // Compute profile gaps if a matching vendor exists
  let profileGaps: ReturnType<typeof computeProfileGaps> = { gaps: [], totalGaps: 0, totalFields: 0, completeFields: 0, hasProfile: false, vendorType: '', isClaimed: false };
  try {
    const vendor = await Vendor.findOne({
      $or: [
        ...(report.email ? [{ 'contactInfo.email': report.email }] : []),
        { company: { $regex: new RegExp(`^${report.companyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
      ],
    }).lean();
    if (vendor) {
      profileGaps = computeProfileGaps(vendor);
    }
  } catch {
    // Profile gap lookup failed silently
  }

  // Serialize for client component
  const serialized = JSON.parse(JSON.stringify({ ...report, profileGaps }));

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend.onrender.com';
  const pdfUrl = `${apiBaseUrl}/api/public/ai-visibility-report/${reportId}/pdf`;

  return <AeoReportDisplay report={serialized} pdfUrl={pdfUrl} />;
}
