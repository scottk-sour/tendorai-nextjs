'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface Competitor {
  name: string;
  description: string;
  reason: string;
  website?: string | null;
  strengths: string[];
}

interface Gap {
  title: string;
  explanation: string;
}

interface PlatformResult {
  platform: string;
  platformLabel: string;
  mentioned: boolean;
  position: number | null;
  snippet: string | null;
  competitors: string[];
  error: string | null;
}

interface Report {
  _id: string;
  companyName: string;
  category: string;
  customIndustry?: string | null;
  city: string;
  score: number;
  aiMentioned: boolean;
  aiPosition?: number | null;
  scoreBreakdown?: {
    websiteOptimisation?: number | null;
    contentAuthority?: number | null;
    directoryPresence?: number | null;
    reviewSignals?: number | null;
    structuredData?: number | null;
    competitivePosition?: number | null;
  };
  searchedCompany?: {
    website?: string | null;
    hasReviews?: boolean | null;
    hasPricing?: boolean | null;
    hasBrands?: boolean | null;
    hasStructuredData?: boolean | null;
    hasDetailedServices?: boolean | null;
    hasSocialMedia?: boolean | null;
    hasGoogleBusiness?: boolean | null;
    summary?: string | null;
  };
  competitors: Competitor[];
  gaps: Gap[];
  competitorsOnTendorAI: number;
  createdAt: string;
  platformResults?: PlatformResult[];
  tier?: string | null;
}

interface Props {
  report: Report;
  pdfUrl: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  copiers: 'Photocopiers & Managed Print',
  telecoms: 'Business Telecoms & VoIP',
  cctv: 'CCTV & Security Systems',
  it: 'IT Support & Managed Services',
};

function getScoreColor(score: number): string {
  if (score <= 30) return '#C0392B';
  if (score <= 60) return '#D4880F';
  return '#1B4F72';
}

function getScoreLabel(score: number): string {
  if (score <= 20) return 'Critical';
  if (score <= 35) return 'Poor';
  if (score <= 50) return 'Below Average';
  if (score <= 65) return 'Average';
  if (score <= 80) return 'Good';
  return 'Excellent';
}

function ScoreGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [score]);

  const color = getScoreColor(score);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} width="200" height="200" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none" stroke="#E5E7EB" strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none" stroke={color} strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
        {/* Score text */}
        <text x="100" y="95" textAnchor="middle" fontSize="48" fontWeight="bold" fill={color}>
          {animatedScore}
        </text>
        <text x="100" y="118" textAnchor="middle" fontSize="14" fill="#6B7280">
          out of 100
        </text>
      </svg>
      <span className="mt-2 text-lg font-bold" style={{ color }}>
        {getScoreLabel(score)}
      </span>
    </div>
  );
}

function CheckItem({ label, checked, detail }: { label: string; checked: boolean; detail: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span
        className={`flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${
          checked ? 'bg-green-600' : 'bg-red-500'
        }`}
      >
        {checked ? '\u2713' : '\u2717'}
      </span>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{label}</p>
        <p className="text-gray-500 text-xs mt-0.5">{detail}</p>
      </div>
    </div>
  );
}

function BreakdownBar({ label, score, max = 17 }: { label: string; score: number; max?: number }) {
  const pct = Math.round((score / max) * 100);
  const color = score <= 5 ? '#C0392B' : score <= 10 ? '#D4880F' : '#1B4F72';

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="font-bold" style={{ color }}>{score}/{max}</span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function getRegulatoryBody(category: string): string {
  const legal = ['conveyancing', 'family-law', 'criminal-law', 'commercial-law', 'employment-law', 'wills-and-probate', 'immigration', 'personal-injury'];
  const accountants = ['tax-advisory', 'audit-assurance', 'bookkeeping', 'payroll', 'corporate-finance', 'business-advisory', 'vat-services', 'financial-planning'];
  const mortgage = ['residential-mortgages', 'buy-to-let', 'remortgage', 'first-time-buyer', 'equity-release', 'commercial-mortgages', 'protection-insurance'];
  const estate = ['sales', 'lettings', 'property-management', 'block-management', 'auctions', 'commercial-property', 'inventory'];

  if (legal.includes(category)) return 'the SRA Solicitors Register';
  if (accountants.includes(category)) return 'the ICAEW directory';
  if (mortgage.includes(category)) return 'the FCA Financial Services Register';
  if (estate.includes(category)) return 'public property directories';
  return 'publicly available business data';
}

const TIER_UNLOCKED_PLATFORMS: Record<string, string[]> = {
  free: ['perplexity'],
  starter: ['perplexity', 'chatgpt', 'claude', 'gemini', 'grok', 'meta'],
  pro: ['perplexity', 'chatgpt', 'claude', 'gemini', 'grok', 'meta'],
};

// Which tier unlocks each platform (for upsell labels on locked cards)
const PLATFORM_UNLOCK_TIER: Record<string, { tier: string; label: string; price: string }> = {
  chatgpt: { tier: 'pro', label: 'Pro', price: '\u00A3299/month' },
  claude:  { tier: 'pro', label: 'Pro', price: '\u00A3299/month' },
  gemini:  { tier: 'pro', label: 'Pro', price: '\u00A3299/month' },
  grok:    { tier: 'pro', label: 'Pro', price: '\u00A3299/month' },
  meta:    { tier: 'pro', label: 'Pro', price: '\u00A3299/month' },
};

const PLATFORM_META: Record<string, { color: string; icon: string }> = {
  perplexity: { color: '#20B8CD', icon: '\uD83D\uDD0D' },
  chatgpt: { color: '#10A37F', icon: '\uD83D\uDCAC' },
  claude: { color: '#D97706', icon: '\uD83E\uDD16' },
  gemini: { color: '#4285F4', icon: '\u2728' },
  grok: { color: '#1D9BF0', icon: '\u26A1' },
  meta: { color: '#0668E1', icon: '\uD83E\uDD99' },
};

function PlatformCard({ result, locked }: { result: PlatformResult; locked: boolean }) {
  const meta = PLATFORM_META[result.platform] || { color: '#6B7280', icon: '\uD83E\uDD16' };

  if (locked) {
    const unlock = PLATFORM_UNLOCK_TIER[result.platform] || { tier: 'pro', label: 'Pro', price: '\u00A3299/month' };
    return (
      <div className="relative rounded-xl border border-gray-200 bg-white p-5 overflow-hidden">
        {/* Blurred fake content */}
        <div className="filter blur-[6px] pointer-events-none select-none">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{meta.icon}</span>
            <span className="font-bold text-gray-900">{result.platformLabel}</span>
          </div>
          <p className="text-sm text-gray-500">AI platform analysis result placeholder text that is blurred out for this tier.</p>
        </div>
        {/* Lock overlay */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <p className="text-sm font-semibold text-gray-600 mb-1">
            Unlock with {unlock.label} &mdash; {unlock.price}
          </p>
          <a
            href={`/for-vendors?tier=${unlock.tier}#pricing`}
            className="text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline"
          >
            View {unlock.label} plan &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{meta.icon}</span>
          <span className="font-bold text-gray-900">{result.platformLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          {result.mentioned ? (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm font-bold">
              &#10003;
            </span>
          ) : (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 text-sm font-bold">
              &#10007;
            </span>
          )}
        </div>
      </div>

      {result.error ? (
        <p className="text-xs text-gray-400 italic">Unable to query this platform</p>
      ) : result.mentioned ? (
        <>
          {result.snippet && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-3">{result.snippet}</p>
          )}
          {result.competitors.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-1">Also mentioned:</p>
              <div className="flex flex-wrap gap-1">
                {result.competitors.slice(0, 4).map((c) => (
                  <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-red-600 font-medium mb-2">Not mentioned by {result.platformLabel}</p>
          {result.competitors.length > 0 && (
            <div className="mt-1">
              <p className="text-xs text-gray-400 mb-1">Recommended instead:</p>
              <div className="flex flex-wrap gap-1">
                {result.competitors.slice(0, 4).map((c) => (
                  <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

export default function AeoReportDisplay({ report, pdfUrl }: Props) {
  const sc = report.searchedCompany || {};
  const breakdown = report.scoreBreakdown || {};

  const [industryAvg, setIndustryAvg] = useState<{ average: number | null; sampleSize: number; category: string } | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/public/aeo-report/average?category=${encodeURIComponent(report.category)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setIndustryAvg({ average: data.average, sampleSize: data.sampleSize, category: data.category });
      })
      .catch(() => {});
  }, [report.category]);

  return (
    <main className="min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Hero / Score Section */}
      <section className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">AI Visibility Report</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{report.companyName}</h1>
          <p className="text-gray-500 mb-8">
            {report.category === 'other' ? (report.customIndustry || 'Other') : (CATEGORY_LABELS[report.category] || report.category)} &mdash; {report.city}
          </p>

          <ScoreGauge score={report.score} />

          {industryAvg && (
            <p className="text-sm text-gray-500 mt-2">
              {industryAvg.average !== null
                ? `The average score in your category is ${industryAvg.average}/100 (based on ${industryAvg.sampleSize} reports). Top-performing businesses score 70+.`
                : 'Insufficient data for your category — average not yet available.'}
            </p>
          )}

          <p className="mt-6 text-lg font-semibold" style={{ color: getScoreColor(report.score) }}>
            {report.aiMentioned
              ? `AI mentions you at position ${report.aiPosition || '?'} — but competitors rank higher.`
              : 'AI is NOT recommending your business.'}
          </p>
          <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto">
            {report.aiMentioned
              ? `${report.competitors.length} competitors were found ranking alongside or ahead of you.`
              : `When buyers ask AI for ${(report.category === 'other' ? (report.customIndustry || 'your industry') : (CATEGORY_LABELS[report.category] || report.category)).toLowerCase()} in ${report.city}, you don't appear.`}
          </p>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Your Score', value: `${report.score}/100` },
              { label: 'Competitors Found', value: String(report.competitors.length) },
              { label: 'On TendorAI', value: String(report.competitorsOnTendorAI) },
              { label: 'Gaps Identified', value: String(report.gaps.length) },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xl font-bold text-[#1B4F72]">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4">
        {/* Platform Results */}
        {report.platformResults && report.platformResults.length > 0 && (() => {
          const tier = report.tier || 'free';
          const unlocked = TIER_UNLOCKED_PLATFORMS[tier] || TIER_UNLOCKED_PLATFORMS.free;
          const unlockedResults = report.platformResults.filter(r => unlocked.includes(r.platform));

          // Order results: show all 6 platforms (fill missing ones)
          const ALL_PLATFORMS = ['perplexity', 'chatgpt', 'claude', 'gemini', 'grok', 'meta'];
          const ALL_LABELS: Record<string, string> = {
            perplexity: 'Perplexity', chatgpt: 'ChatGPT', claude: 'Claude',
            gemini: 'Gemini', grok: 'Grok', meta: 'Meta AI',
          };
          const resultMap = new Map(report.platformResults.map(r => [r.platform, r]));
          const orderedResults = ALL_PLATFORMS.map(p => resultMap.get(p) || {
            platform: p, platformLabel: ALL_LABELS[p], mentioned: false,
            position: null, snippet: null, competitors: [], error: 'Not queried',
          });

          // Count mentions across ALL platforms (same source as the bar chart)
          const mentionedCount = orderedResults.filter(r => r.mentioned && !r.error).length;

          return (
            <section className="mt-10 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">AI Platform Results</h2>
              <p className="text-sm text-gray-500 mb-4">
                We asked 6 major AI platforms to recommend a business like yours in {report.city}.
              </p>

              {/* Summary bar */}
              <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-gray-50">
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900">
                    Mentioned by {mentionedCount} of 6 AI platforms
                  </p>
                  <p className="text-sm text-gray-500">
                    {mentionedCount === 0
                      ? 'No AI platform currently recommends your business.'
                      : mentionedCount <= 2
                        ? 'Your AI visibility is limited. Most platforms don\'t recommend you yet.'
                        : mentionedCount <= 4
                          ? 'Good progress. Some platforms recommend you but there\'s room to grow.'
                          : 'Strong AI visibility across most platforms.'}
                  </p>
                </div>
                <div className="flex gap-1">
                  {orderedResults.map((r, i) => (
                    <div
                      key={i}
                      className={`w-3 h-8 rounded-full ${
                        r.mentioned ? 'bg-green-500' : 'bg-red-300'
                      }`}
                      title={r.platformLabel}
                    />
                  ))}
                </div>
              </div>

              {/* Platform cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orderedResults.map((result) => (
                  <PlatformCard
                    key={result.platform}
                    result={result as PlatformResult}
                    locked={!unlocked.includes(result.platform)}
                  />
                ))}
              </div>

              {/* Upgrade nudge when not on Pro */}
              {tier !== 'pro' && (
                <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                  <p className="text-sm text-purple-800 font-medium mb-2">
                    You&apos;re seeing {unlocked.length} of 6 platform results. Upgrade to unlock all AI platform data.
                  </p>
                  <a
                    href="/for-vendors#pricing"
                    className="inline-block px-5 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    See Plans
                  </a>
                </div>
              )}
            </section>
          );
        })()}

        {/* What AI Knows */}
        <section className="mt-10 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">What AI Knows About You</h2>
          <p className="text-sm text-gray-500 mb-6">
            {sc.summary || 'Limited information was found about your company online.'}
          </p>

          <div className="space-y-0">
            <CheckItem
              label="Company Website Found"
              checked={!!sc.website}
              detail={sc.website || 'No website found'}
            />
            <CheckItem
              label="Customer Reviews Visible"
              checked={!!sc.hasReviews}
              detail={sc.hasReviews ? 'Reviews found online' : 'No reviews found on Google, Trustpilot, etc.'}
            />
            <CheckItem
              label="Pricing Information"
              checked={!!sc.hasPricing}
              detail={sc.hasPricing ? 'Pricing visible on website' : 'No pricing information found'}
            />
            <CheckItem
              label="Brand Partnerships Listed"
              checked={!!sc.hasBrands}
              detail={sc.hasBrands ? 'Manufacturer partnerships visible' : 'No brand partnerships listed'}
            />
            <CheckItem
              label="Structured Data (Schema.org)"
              checked={!!sc.hasStructuredData}
              detail={sc.hasStructuredData ? 'Schema markup detected' : 'No structured data — AI cannot easily parse your site'}
            />
            <CheckItem
              label="Detailed Service Pages"
              checked={!!sc.hasDetailedServices}
              detail={sc.hasDetailedServices ? 'Service pages with detail' : 'Vague or missing service descriptions'}
            />
            <CheckItem
              label="Social Media Presence"
              checked={!!sc.hasSocialMedia}
              detail={sc.hasSocialMedia ? 'Active social profiles found' : 'No active social media found'}
            />
            <CheckItem
              label="Google Business Profile"
              checked={!!sc.hasGoogleBusiness}
              detail={sc.hasGoogleBusiness ? 'Google Business listing found' : 'No Google Business Profile detected'}
            />
          </div>
        </section>

        {/* SEO vs AEO Education */}
        <section className="mt-8 bg-blue-50 rounded-xl border border-blue-100 p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-3">
            <svg className="w-6 h-6 text-[#1B4F72] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            <h2 className="text-lg font-bold text-[#1B4F72]">Why Your SEO Score Doesn&apos;t Tell the Full Story</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              Your website may perform well on traditional SEO audits &mdash; but that no longer guarantees
              visibility. SEO measures how Google indexes your site. AI Visibility (AEO) measures
              whether AI actually recommends you.
            </p>
            <p>
              AI recommendation engines like ChatGPT, Perplexity, and Claude don&apos;t just crawl your
              site &mdash; they evaluate structured data, authority signals, verified profiles, and review
              sentiment to decide who to recommend.
            </p>
            <p>
              A business can score 70+ on a website SEO audit and still score under 20 on AI visibility,
              because the signals AI uses are fundamentally different from what traditional SEO tools measure.
            </p>
            <p className="font-medium text-[#1B4F72]">
              This report measures what matters now: whether AI recommends you.
            </p>
          </div>
        </section>

        {/* Score Breakdown */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Score Breakdown</h3>
          <BreakdownBar label="Website Optimisation" score={breakdown.websiteOptimisation || 0} />
          <BreakdownBar label="Content Authority" score={breakdown.contentAuthority || 0} />
          <BreakdownBar label="Directory Presence" score={breakdown.directoryPresence || 0} />
          <BreakdownBar label="Review Signals" score={breakdown.reviewSignals || 0} />
          <BreakdownBar label="Structured Data" score={breakdown.structuredData || 0} />
          <BreakdownBar label="Competitive Position" score={breakdown.competitivePosition || 0} />
        </section>

        {/* Who AI Recommends Instead */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Who AI Recommends Instead</h2>
          <p className="text-sm text-gray-500 mb-6">
            {report.aiMentioned
              ? `These companies appear alongside or ahead of you when buyers ask AI for ${report.category} suppliers in ${report.city}.`
              : `These are the companies AI recommends instead of you in ${report.city}.`}
          </p>

          <div className="space-y-6">
            {report.competitors.map((comp, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{comp.name}</p>
                  {comp.website && (
                    <a
                      href={comp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#1B4F72] hover:underline break-all"
                    >
                      {comp.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  )}
                  <p className="text-sm text-gray-600 mt-1">{comp.description}</p>
                  {comp.strengths.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {comp.strengths.map((s, j) => (
                        <li key={j} className="text-xs text-gray-500 flex items-start gap-1.5">
                          <span className="text-[#1B4F72] mt-0.5">&#8226;</span> {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Your Gaps */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Your Visibility Gaps</h2>
          <p className="text-sm text-gray-500 mb-6">
            These are the specific reasons AI tools are not recommending your business.
          </p>

          <div className="space-y-4">
            {report.gaps.map((gap, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4880F] flex items-center justify-center text-white font-bold text-xs">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{gap.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{gap.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* What this means box */}
          <div className="mt-6 bg-[#1B4F72] rounded-lg p-5 text-white">
            <h3 className="font-bold mb-2">What This Means</h3>
            <p className="text-sm text-blue-100">
              With a score of {report.score}/100, your business is largely invisible to AI recommendation engines.
              When potential buyers use ChatGPT, Perplexity, or Claude to find{' '}
              {(report.category === 'other' ? (report.customIndustry || 'your industry') : (CATEGORY_LABELS[report.category] || report.category)).toLowerCase()} in {report.city},
              they are being directed to your competitors.
            </p>
          </div>
        </section>

        {/* The Shift */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">The Shift: SEO &rarr; AI Visibility (AEO)</h2>
          <div className="mt-4 space-y-6 text-sm text-gray-600">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Buyers Are Changing How They Search</h3>
              <p>
                According to Gartner, by 2026, traditional search engine volume will drop 25% as consumers
                shift to AI assistants. Forrester reports that 60% of B2B buyers now use AI tools to research
                suppliers before making contact. If your business isn&apos;t visible to AI, you&apos;re losing
                leads you&apos;ll never know about.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">What is AI Visibility (AEO)?</h3>
              <p>
                AI Visibility (AEO — Answer Engine Optimisation) is the process of making your business visible to AI
                recommendation engines like ChatGPT, Perplexity, Claude, and Google AI Overviews. Unlike
                SEO which optimises for search engine rankings, AI Visibility (AEO) focuses on structured data, authority
                signals, and verified profiles that AI tools use to make recommendations.
              </p>
            </div>

            {/* SEO vs AEO table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 font-semibold"></th>
                    <th className="p-3 font-semibold">Traditional SEO</th>
                    <th className="p-3 font-semibold">AI Visibility (AEO)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Goal', 'Rank on Google page 1', 'Be recommended by AI'],
                    ['Format', 'Blue links & snippets', 'Conversational answers'],
                    ['Key Factor', 'Backlinks & keywords', 'Structured data & authority'],
                    ['Visibility', 'Search results page', 'AI chat responses'],
                    ['User Intent', 'Browse multiple results', 'Trust single AI answer'],
                    ['Timeline', 'Established since 1990s', 'Emerging since 2023'],
                  ].map(([label, seo, aeo], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-semibold text-gray-900">{label}</td>
                      <td className="p-3 text-gray-500">{seo}</td>
                      <td className="p-3 font-semibold text-[#1B4F72]">{aeo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pro Callout / Waitlist */}
        {report.category === 'other' ? (
          <section className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Your industry isn&apos;t on TendorAI yet</h3>
                <p className="text-gray-600">
                  TendorAI doesn&apos;t yet have a dedicated directory for your industry.
                  Join the waitlist and we&apos;ll notify you when we launch.
                </p>
              </div>
              <Link
                href="/vendor-signup"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                Join the Waitlist
              </Link>
            </div>
          </section>
        ) : (
          <section className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Want to improve this score?</h3>
                <p className="text-gray-600">
                  TendorAI Pro includes AI-optimised data installed directly on your website. We handle everything &mdash; you just provide your login. Agencies charge &pound;1,500+/month for this.
                </p>
              </div>
              <a
                href="/for-vendors#pricing"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                Learn about Pro
              </a>
            </div>
          </section>
        )}

        {/* Trust note */}
        <p className="mt-8 text-sm text-gray-500 text-center flex items-center justify-center gap-1.5">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          This report was generated using data from {getRegulatoryBody(report.category)} and AI analysis of your online presence across ChatGPT, Claude, Perplexity, and Google AI Overviews.
        </p>

        {/* CTA */}
        <section className="mt-8 bg-[#1B4F72] rounded-xl shadow-sm p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Fix Your AI Visibility</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            TendorAI is the UK&apos;s first AI-optimised supplier directory. Claim your free profile and
            start appearing in AI recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/vendor-signup"
              className="inline-flex items-center px-6 py-3 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              {report.category === 'other' ? 'Join the Waitlist' : 'Claim Your Free Profile'}
            </Link>
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Download PDF Report
            </a>
          </div>

          {report.category === 'other' && (
            <p className="mt-4 text-sm text-blue-200">
              TendorAI doesn&apos;t yet have a dedicated directory for your industry. Join the waitlist and we&apos;ll notify you when we launch.
            </p>
          )}

          {/* Pricing summary */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <div className="rounded-xl p-6 bg-white/10 flex flex-col">
              <p className="font-bold text-lg">Free</p>
              <p className="text-2xl font-bold my-1">&pound;0<span className="text-sm font-normal text-blue-200">/forever</span></p>
              <p className="text-xs text-blue-200 mt-2 flex-1">
                Claim your profile. Get listed in the TendorAI directory and visible to AI crawlers with your basic SRA/FCA details.
              </p>
              <a
                href="https://www.tendorai.com/vendor-signup?tier=free"
                className="mt-4 block text-center px-4 py-2 rounded-lg border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Claim Your Free Profile
              </a>
            </div>

            {/* Pro — Most Popular */}
            <div className="rounded-xl p-6 bg-white text-[#1B4F72] ring-2 ring-white flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-[#1B4F72] text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wide">
                Most Popular
              </span>
              <p className="font-bold text-lg text-[#1B4F72]">Pro</p>
              <p className="text-2xl font-bold my-1 text-[#1B4F72]">&pound;299<span className="text-sm font-normal text-gray-400">/month</span></p>
              <p className="text-[10px] text-gray-400">Early adopter price (was &pound;499)</p>
              <p className="text-xs text-gray-500 mt-2 flex-1">
                We install AI-optimised data on your website, track your AI mentions weekly, and give you a Verified badge. Agencies charge &pound;1,500+/month for this.
              </p>
              <a
                href="https://www.tendorai.com/vendor-signup?tier=pro"
                className="mt-4 block text-center px-4 py-2 rounded-lg bg-[#1B4F72] text-white text-sm font-semibold hover:bg-[#163d5a] transition-colors"
              >
                Start Pro
              </a>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Report generated {new Date(report.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by TendorAI.
          This report analyses your company&apos;s visibility to AI recommendation engines.
        </p>
      </div>
    </main>
  );
}
