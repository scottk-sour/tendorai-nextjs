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

interface Report {
  _id: string;
  companyName: string;
  category: string;
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

export default function AeoReportDisplay({ report, pdfUrl }: Props) {
  const sc = report.searchedCompany || {};
  const breakdown = report.scoreBreakdown || {};

  return (
    <main className="min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Hero / Score Section */}
      <section className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">AI Visibility Report</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{report.companyName}</h1>
          <p className="text-gray-500 mb-8">
            {CATEGORY_LABELS[report.category] || report.category} &mdash; {report.city}
          </p>

          <ScoreGauge score={report.score} />

          <p className="mt-6 text-lg font-semibold" style={{ color: getScoreColor(report.score) }}>
            {report.aiMentioned
              ? `AI mentions you at position ${report.aiPosition || '?'} — but competitors rank higher.`
              : 'AI is NOT recommending your business.'}
          </p>
          <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto">
            {report.aiMentioned
              ? `${report.competitors.length} competitors were found ranking alongside or ahead of you.`
              : `When buyers ask AI for ${(CATEGORY_LABELS[report.category] || report.category).toLowerCase()} in ${report.city}, you don't appear.`}
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

          {/* Score Breakdown */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Score Breakdown</h3>
            <BreakdownBar label="Website Optimisation" score={breakdown.websiteOptimisation || 0} />
            <BreakdownBar label="Content Authority" score={breakdown.contentAuthority || 0} />
            <BreakdownBar label="Directory Presence" score={breakdown.directoryPresence || 0} />
            <BreakdownBar label="Review Signals" score={breakdown.reviewSignals || 0} />
            <BreakdownBar label="Structured Data" score={breakdown.structuredData || 0} />
            <BreakdownBar label="Competitive Position" score={breakdown.competitivePosition || 0} />
          </div>
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
              {(CATEGORY_LABELS[report.category] || report.category).toLowerCase()} in {report.city},
              they are being directed to your competitors.
            </p>
          </div>
        </section>

        {/* The Shift */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">The Shift: SEO &rarr; AEO</h2>
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
              <h3 className="font-bold text-gray-900 mb-2">What is AEO?</h3>
              <p>
                Answer Engine Optimisation (AEO) is the process of making your business visible to AI
                recommendation engines like ChatGPT, Perplexity, Claude, and Google AI Overviews. Unlike
                SEO which optimises for search engine rankings, AEO focuses on structured data, authority
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
                    <th className="p-3 font-semibold">AEO (AI Optimisation)</th>
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
              Claim Your Free Profile
            </Link>
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Download PDF Report
            </a>
          </div>

          {/* Pricing summary */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
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

            {/* Starter */}
            <div className="rounded-xl p-6 bg-white/10 flex flex-col">
              <p className="font-bold text-lg">Starter</p>
              <p className="text-2xl font-bold my-1">&pound;149<span className="text-sm font-normal text-blue-200">/month</span></p>
              <p className="text-[10px] text-blue-300">Early adopter price (was &pound;299)</p>
              <p className="text-xs text-blue-200 mt-2 flex-1">
                Stand out from unclaimed profiles. Add your pricing, specialisms, and services so AI can recommend you with detail. Includes monthly AEO visibility report.
              </p>
              <a
                href="https://www.tendorai.com/vendor-signup?tier=starter"
                className="mt-4 block text-center px-4 py-2 rounded-lg border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Start Starter
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
                Get recommended first. Full structured data, weekly AEO reports, AI mention tracking, TendorAI Verified badge, and priority ranking in AI results.
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
