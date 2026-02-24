'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function AeoReportClient() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (category === 'other' && !customIndustry.trim()) {
      setError('Please describe your industry.');
      return;
    }

    setLoading(true);
    setLoadingStep(0);

    // Animate through loading steps (report takes 30-60s)
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 8000);

    try {
      const res = await fetch(`${API_URL}/api/public/aeo-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, category, city, email: email || undefined, name: name || undefined, source: source || undefined, customIndustry: category === 'other' ? customIndustry.trim() : undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      // Redirect to full results page
      router.push(`/aeo-report/results/${data.reportId}`);
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
        <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center">
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
              <p className="text-xs text-gray-400">
                This takes 30&ndash;60 seconds while we research your company and competitors.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // FORM STATE
  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-white/15 backdrop-blur border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
            Free AI Visibility Check
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Is AI Recommending{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Get your free AI visibility score. See who AI recommends instead of you,
            what gaps are holding you back, and how to fix it.
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
                placeholder="e.g. Smith & Jones Solicitors"
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
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold py-4 px-6 rounded-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40 transition-all text-lg"
            >
              Run My Free AEO Report
            </button>
          </form>

          {/* What you get */}
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Your report includes:</h2>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">1.</span>
                <span><strong>AI Visibility Score</strong> &mdash; 0&ndash;100 rating with 6 sub-scores</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">2.</span>
                <span><strong>What AI Knows</strong> &mdash; checklist of what AI can find about you</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">3.</span>
                <span><strong>Who AI Recommends Instead</strong> &mdash; your competitors with website links</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">4.</span>
                <span><strong>Your Visibility Gaps</strong> &mdash; specific reasons you&apos;re not showing up</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">5.</span>
                <span><strong>Downloadable PDF</strong> &mdash; share with your team or management</span>
              </li>
            </ul>
          </div>

          {/* Context box */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
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
