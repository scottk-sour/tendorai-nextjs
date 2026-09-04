'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

const CATEGORY_GROUPS = [
  {
    label: 'Legal Services',
    options: [
      { value: 'conveyancing', label: 'Conveyancing' },
      { value: 'family-law', label: 'Family Law' },
      { value: 'criminal-law', label: 'Criminal Law' },
      { value: 'commercial-law', label: 'Commercial Law' },
      { value: 'employment-law', label: 'Employment Law' },
      { value: 'wills-and-probate', label: 'Wills & Probate' },
      { value: 'immigration', label: 'Immigration' },
      { value: 'personal-injury', label: 'Personal Injury' },
    ],
  },
  {
    label: 'Accountants',
    options: [
      { value: 'tax-advisory', label: 'Tax Advisory' },
      { value: 'audit-assurance', label: 'Audit & Assurance' },
      { value: 'bookkeeping', label: 'Bookkeeping' },
      { value: 'payroll', label: 'Payroll' },
      { value: 'corporate-finance', label: 'Corporate Finance' },
      { value: 'business-advisory', label: 'Business Advisory' },
      { value: 'vat-services', label: 'VAT Services' },
      { value: 'financial-planning', label: 'Financial Planning' },
    ],
  },
  {
    label: 'Mortgage Advisors',
    options: [
      { value: 'residential-mortgages', label: 'Residential Mortgages' },
      { value: 'buy-to-let', label: 'Buy-to-Let' },
      { value: 'remortgage', label: 'Remortgage' },
      { value: 'first-time-buyer', label: 'First-Time Buyer' },
      { value: 'equity-release', label: 'Equity Release' },
      { value: 'commercial-mortgages', label: 'Commercial Mortgages' },
      { value: 'protection-insurance', label: 'Protection Insurance' },
    ],
  },
  {
    label: 'Estate Agents',
    options: [
      { value: 'sales', label: 'Property Sales' },
      { value: 'lettings', label: 'Lettings' },
      { value: 'property-management', label: 'Property Management' },
      { value: 'block-management', label: 'Block Management' },
      { value: 'auctions', label: 'Auctions' },
      { value: 'commercial-property', label: 'Commercial Property' },
      { value: 'inventory', label: 'Inventory' },
    ],
  },
  {
    label: 'Office Equipment',
    options: [
      { value: 'copiers', label: 'Copiers & Managed Print' },
      { value: 'telecoms', label: 'Telecoms & VoIP' },
      { value: 'cctv', label: 'CCTV & Security' },
      { value: 'it', label: 'IT Support' },
    ],
  },
  {
    label: 'Other',
    options: [
      { value: 'other', label: 'Other (not listed above)' },
    ],
  },
];

const LOADING_STEPS = [
  'Searching for your company online...',
  'Analysing your AI visibility...',
  'Researching competitors in your area...',
  'Identifying visibility gaps...',
  'Generating your personalised report...',
];

const REQUEST_TIMEOUT_MS = 90_000;
const RETRY_DELAY_MS = 2_000;

async function postWithTimeout<T>(url: string, body: unknown, timeoutMs: number): Promise<{ res: Response; data: T }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = (await res.json()) as T;
    return { res, data };
  } finally {
    clearTimeout(timer);
  }
}

export default function AeoReportClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [category, setCategory] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [source, setSource] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Checking your AI visibility...');
  const [error, setError] = useState('');

  const isLegacyReturn = searchParams.get('legacy') === 'true';

  useEffect(() => {
    const qCompany = searchParams.get('company');
    const qCategory = searchParams.get('category');
    const qCity = searchParams.get('city');
    const qEmail = searchParams.get('email');
    if (qCompany) setCompanyName(qCompany);
    if (qCategory) setCategory(qCategory);
    if (qCity) setCity(qCity);
    if (qEmail) setEmail(qEmail);
  }, [searchParams]);

  const normaliseWebsiteUrl = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return '';
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const submitReport = async () => {
    const normalisedUrl = normaliseWebsiteUrl(websiteUrl);
    const payload = {
      companyName,
      category,
      city,
      email,
      websiteUrl: normalisedUrl,
      name: name || undefined,
      source: source || undefined,
      customIndustry: category === 'other' ? customIndustry.trim() : undefined,
    };

    const attempt = async () =>
      postWithTimeout<{ success?: boolean; reportId?: string; existing?: boolean; error?: string }>(
        `${API_URL}/api/public/ai-visibility-report`,
        payload,
        REQUEST_TIMEOUT_MS,
      );

    let lastErr: unknown = null;
    for (let i = 0; i < 2; i++) {
      try {
        return await attempt();
      } catch (err) {
        lastErr = err;
        if (i === 0) {
          // Likely a Render cold-start. Wait and retry once — the instance is usually warm by now.
          await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        }
      }
    }
    throw lastErr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!consent) {
      setError('Please confirm you have read the Privacy Policy.');
      return;
    }
    if (category === 'other' && !customIndustry.trim()) {
      setError('Please describe your industry.');
      return;
    }
    if (!normaliseWebsiteUrl(websiteUrl)) {
      setError('Please enter your website URL.');
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setLoadingMessage('Checking your AI visibility...');

    const startedAt = Date.now();

    // Animate through loading steps (report takes 30-60s)
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 8000);

    // Progressive status message — reassures users during Render cold-starts.
    const messageInterval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      if (elapsed >= 30_000) {
        setLoadingMessage(
          'Still working — our backend is warming up, this can take up to a minute on the first request of the day.',
        );
      } else if (elapsed >= 10_000) {
        setLoadingMessage('Running live AI analysis...');
      }
    }, 1000);

    try {
      const { res, data } = await submitReport();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      // Redirect to full results page (same URL whether existing or freshly generated).
      router.push(`/ai-visibility-report/results/${data.reportId}`);
    } catch {
      setError(
        "We couldn't reach the report service after two attempts. This usually clears up within a minute — please try again.",
      );
    } finally {
      clearInterval(stepInterval);
      clearInterval(messageInterval);
      setLoading(false);
    }
  };

  // LOADING STATE — sits inside the server-rendered form area. No <main> or
  // hero wrapper here; the shell is provided by page.tsx.
  if (loading) {
    return (
      <div className="py-16 sm:py-24 text-center">
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
                className={`text-base sm:text-lg font-medium transition-all duration-500 ${
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

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Generating your full AI visibility report for{' '}
              <strong>{companyName}</strong> in {city}...
            </p>
            <p className="text-xs text-gray-400">{loadingMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  // FORM STATE — the client island. Hero, factual overview, and info cards
  // live in the server component (page.tsx). We only render the legacy
  // banner (needs useSearchParams) + the form itself.
  return (
    <>
      {isLegacyReturn && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-900 px-4 py-3 rounded-lg text-sm">
          Your previous report used an older scoring method. Generate a fresh report using our
          updated AI visibility analysis.
        </div>
      )}
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
                placeholder="e.g. Smith & Jones Solicitors"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Website URL *
              </label>
              <input
                id="websiteUrl"
                type="url"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://www.yourfirm.co.uk"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              />
              <p className="mt-1 text-xs text-gray-400">
                We scan your site for structured data, schema, and AI visibility signals.
              </p>
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
                {CATEGORY_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {category === 'other' && (
              <div>
                <label htmlFor="customIndustry" className="block text-sm font-medium text-gray-700 mb-1">
                  Describe your industry *
                </label>
                <input
                  id="customIndustry"
                  type="text"
                  required
                  maxLength={100}
                  value={customIndustry}
                  onChange={(e) => setCustomIndustry(e.target.value)}
                  placeholder="e.g. Recruitment, IT Support, Dental Practice"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                />
              </div>
            )}

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
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              />
              <p className="mt-1 text-xs text-gray-400">We&apos;ll send your report to this address</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                What prompted you to check your AI visibility? <span className="text-gray-400">(optional)</span>
              </label>
              <select
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
              >
                <option value="">Select one (optional)</option>
                <option value="competitor-in-ai">A competitor appears in AI results</option>
                <option value="traffic-drop">Saw a drop in website traffic</option>
                <option value="heard-about-geo">Heard about AI search / GEO</option>
                <option value="recommendation">Someone recommended TendorAI</option>
                <option value="curious">Just curious</option>
                <option value="other">Other</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm space-y-2">
                <p>{error}</p>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                I have read and understood the{' '}
                <Link href="/privacy" className="text-purple-600 underline hover:text-purple-700">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

        <button
          type="submit"
          disabled={!consent}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold py-4 px-6 rounded-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          Run My Free AI Visibility Report
        </button>
      </form>
    </>
  );
}
