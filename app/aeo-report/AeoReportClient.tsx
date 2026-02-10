'use client';

import { useState } from 'react';
import Link from 'next/link';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

const CATEGORIES = [
  { value: 'copiers', label: 'Copiers & Managed Print' },
  { value: 'telecoms', label: 'Telecoms & VoIP' },
  { value: 'cctv', label: 'CCTV & Security' },
  { value: 'it', label: 'IT Support' },
];

const CATEGORY_LABELS: Record<string, string> = {
  copiers: 'copier and managed print',
  telecoms: 'telecoms and VoIP',
  cctv: 'CCTV and security',
  it: 'IT support',
};

interface AiCompany {
  name: string;
  description: string;
  reason: string;
}

interface AeoResult {
  companyName: string;
  category: string;
  city: string;
  aiMentioned: boolean;
  aiPosition: number | null;
  aiRecommendations: AiCompany[];
  competitorsOnTendorAI: number;
  timestamp: string;
}

const LOADING_STEPS = [
  'Querying AI systems...',
  'Analysing local market data...',
  'Checking your visibility...',
];

export default function AeoReportClient() {
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AeoResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    setLoadingStep(0);

    // Animate through loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);

    try {
      const res = await fetch(`${API_URL}/api/public/aeo-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, category, city, email: email || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setResult(data);
    } catch {
      setError('Failed to connect to the AI service. Please try again.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <div className="space-y-8">
            {/* Animated rings */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200 animate-ping opacity-20" />
              <div className="absolute inset-2 rounded-full border-4 border-purple-300 animate-ping opacity-30 animation-delay-300" />
              <div className="absolute inset-4 rounded-full border-4 border-purple-500 animate-spin border-t-transparent" />
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {LOADING_STEPS.map((step, i) => (
                <div
                  key={step}
                  className={`text-lg font-medium transition-all duration-500 ${
                    i <= loadingStep ? 'text-gray-900 opacity-100' : 'text-gray-300 opacity-50'
                  }`}
                >
                  {i < loadingStep && <span className="text-green-500 mr-2">&#10003;</span>}
                  {i === loadingStep && (
                    <span className="inline-block w-2 h-2 bg-purple-600 rounded-full animate-pulse mr-2" />
                  )}
                  {step}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              Checking what AI recommends for {CATEGORY_LABELS[category] || category} in {city}...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // RESULTS STATE
  if (result) {
    return result.aiMentioned ? (
      <MentionedResult result={result} onReset={() => setResult(null)} />
    ) : (
      <NotMentionedResult result={result} onReset={() => setResult(null)} />
    );
  }

  // FORM STATE
  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Is AI Recommending Your Business?
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Find out if ChatGPT, Perplexity, and Claude mention you when customers search for
            suppliers in your area.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-5">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. ABC Copiers"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
              >
                <option value="">Select your category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City / Town *
              </label>
              <input
                id="city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Cardiff"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-gray-400">(optional — get a copy of your report)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors text-lg"
            >
              Run My Free AEO Report
            </button>
          </form>

          {/* Context box */}
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-2">What is AEO?</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Answer Engine Optimisation</strong> is the new SEO. As more people use AI
              assistants instead of Google, businesses that aren&apos;t in AI&apos;s training data become
              invisible. 200M+ people use ChatGPT monthly. 100M+ use Perplexity. Is your business
              showing up?
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================================
// NOT MENTIONED — Red/alarming result
// ============================================================

function NotMentionedResult({
  result,
  onReset,
}: {
  result: AeoResult;
  onReset: () => void;
}) {
  const catLabel = CATEGORY_LABELS[result.category] || result.category;

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Red banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/30 mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            AI Does NOT Recommend {result.companyName}
          </h1>
          <p className="text-red-100 text-lg">
            When customers ask AI for {catLabel} companies in {result.city}, you&apos;re not on the list.
          </p>
        </div>
      </section>

      {/* What AI recommended instead */}
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            What AI recommended instead
          </h2>
          <p className="text-gray-600 mb-6">
            When we asked AI: &ldquo;Who are the best {catLabel} companies in {result.city}?&rdquo;
            &mdash; these companies were recommended instead of you:
          </p>

          <div className="space-y-3">
            {result.aiRecommendations.map((company, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                  #{i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">{company.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{company.reason}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-blue-700 leading-relaxed">
              This report uses one AI model (Claude) to check your visibility. Different AI tools (ChatGPT, Perplexity, Google AI) use different data and may give different results. Your weekly AI Mention Tracking on the dashboard scans multiple AI models for a complete picture.
            </p>
          </div>
        </div>
      </section>

      {/* Fear section */}
      <section className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-6">
            Your competitors are being recommended. You&apos;re not.
          </h2>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              This is Google SEO all over again. In the early days, any website could rank on Google.
              Then businesses started investing in SEO, and those who didn&apos;t got pushed to page 10.
              The same thing is happening with AI right now.
            </p>
            <p>
              Right now, AI recommends companies based on whatever it finds online. But as suppliers
              start investing in AEO &mdash; optimising their profiles on platforms like TendorAI &mdash;
              they&apos;ll push you further down. Early movers win.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <StatCard value="200M+" label="people use ChatGPT monthly" />
            <StatCard value="100M+" label="people use Perplexity monthly" />
            <StatCard value="67%" label="of users trust AI over Google results" />
            <StatCard
              value={`${result.competitorsOnTendorAI}`}
              label={`${catLabel} suppliers already on TendorAI`}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Fix this now &mdash; before your competitors lock you out
          </h2>
          <p className="text-gray-600 mb-8">
            List your business on TendorAI for free. Get structured data that AI tools prioritise,
            a verified profile, and start showing up in AI recommendations.
          </p>
          <Link
            href="/vendor-signup"
            className="inline-block bg-purple-600 text-white font-semibold py-4 px-10 rounded-lg hover:bg-purple-700 transition-colors text-lg"
          >
            List Your Business Free &mdash; Fix This Now
          </Link>
          <div className="mt-4">
            <button
              onClick={onReset}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Run another report
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================================
// MENTIONED — Amber/urgent result
// ============================================================

function MentionedResult({
  result,
  onReset,
}: {
  result: AeoResult;
  onReset: () => void;
}) {
  const catLabel = CATEGORY_LABELS[result.category] || result.category;

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Amber banner */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/30 mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            AI Mentions {result.companyName} &mdash; But For How Long?
          </h1>
          <p className="text-amber-100 text-lg">
            You&apos;re at position #{result.aiPosition} for {catLabel} in {result.city}. But this won&apos;t last without action.
          </p>
        </div>
      </section>

      {/* Full list with position highlighted */}
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your current AI ranking
          </h2>
          <p className="text-gray-600 mb-6">
            When we asked AI: &ldquo;Who are the best {catLabel} companies in {result.city}?&rdquo;
          </p>

          <div className="space-y-3">
            {result.aiRecommendations.map((company, i) => {
              const isVendor = i + 1 === result.aiPosition;
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-5 flex items-start gap-4 ${
                    isVendor
                      ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isVendor
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    #{i + 1}
                  </span>
                  <div>
                    <h3 className={`font-semibold ${isVendor ? 'text-amber-800' : 'text-gray-900'}`}>
                      {company.name}
                      {isVendor && (
                        <span className="ml-2 text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                          That&apos;s you
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">{company.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{company.reason}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-blue-700 leading-relaxed">
              This report uses one AI model (Claude) to check your visibility. Different AI tools (ChatGPT, Perplexity, Google AI) use different data and may give different results. Your weekly AI Mention Tracking on the dashboard scans multiple AI models for a complete picture.
            </p>
          </div>
        </div>
      </section>

      {/* Urgency section */}
      <section className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-6">
            You&apos;re showing up today &mdash; by accident, not strategy.
          </h2>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Your competitors are starting to invest in AEO. When they optimise their profiles on
              platforms like TendorAI with structured data, verified reviews, and detailed service
              information &mdash; they&apos;ll push you down.
            </p>
            <p>
              Remember what happened with Google? In 2005, your website ranked just by existing.
              By 2015, if you weren&apos;t actively doing SEO, you were invisible. The same shift is
              happening with AI right now. The window to secure your position is closing.
            </p>
          </div>

          <div className="mt-8 bg-white/10 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">Vendors on TendorAI get:</h3>
            <ul className="space-y-2">
              {[
                'Structured data that AI tools prioritise',
                'Verified profile that outranks random web scrapes',
                'AI Visibility Score tracking your mentions',
                'Direct quote requests from businesses',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Protect your AI visibility &mdash; before it slips away
          </h2>
          <p className="text-gray-600 mb-8">
            You&apos;re visible now. Make sure you stay visible. List on TendorAI to lock in your position
            with structured data, verified reviews, and ongoing monitoring.
          </p>
          <Link
            href="/vendor-signup"
            className="inline-block bg-purple-600 text-white font-semibold py-4 px-10 rounded-lg hover:bg-purple-700 transition-colors text-lg"
          >
            Protect Your AI Visibility &mdash; List Free
          </Link>
          <div className="mt-4">
            <button
              onClick={onReset}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Run another report
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================================
// Shared components
// ============================================================

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/10 rounded-lg p-4 text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
      <div className="text-xs sm:text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
}
