'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';
import { PLANS } from '@/lib/constants/plans';
import { getDisplayTier } from '@/lib/constants/tiers';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

// ── Types ──────────────────────────────────────────────────────────
interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  href: string;
}

// ── FAQ data ───────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'What is AI procurement search?',
    a: 'When businesses ask AI assistants like ChatGPT, Gemini, or Copilot to recommend suppliers, those AI tools search structured data sources to generate answers. TendorAI makes sure your business shows up in those results.',
  },
  {
    q: 'How is this different from Google SEO?',
    a: "Traditional SEO helps you rank in Google's link-based results. AI search doesn't use links — it reads structured data, reviews, mentions, and authority signals to decide which vendors to recommend. TendorAI optimises your presence for this new AI-driven discovery channel.",
  },
  {
    q: 'Will I get leads immediately?',
    a: "AI visibility is a long-term strategy, not an instant results tool. Think of it like SEO in 2005 — the vendors who start building their AI presence now will dominate when AI-driven procurement becomes mainstream. You'll start seeing improvements in your visibility score within weeks.",
  },
  {
    q: 'What does the AI Visibility Score measure?',
    a: 'Your score (0–100) reflects how likely AI assistants are to recommend your business. It considers your profile completeness, product listings, GEO audit results, AI mentions, and reviews. Higher scores mean better chances of being recommended.',
  },
  {
    q: 'How do AI Mentions work?',
    a: 'We run weekly scans across major AI platforms (ChatGPT, Gemini, Perplexity, Claude) using procurement-related prompts relevant to your services. We track when and where your business is mentioned, your position in results, and competitor comparisons.',
  },
  {
    q: 'What is a GEO Audit?',
    a: "GEO stands for Generative Engine Optimisation. Our audit checks your website for the specific signals that AI systems look for — structured data, meta tags, content quality, schema markup, and more. It's like an SEO audit, but for AI discovery.",
  },
  {
    q: 'Do I need a paid plan?',
    a: 'The free Listed plan gives you a basic profile and visibility score. Paid plans (Visible at £99/mo, Verified at £149/mo) unlock AI mention tracking, detailed analytics, GEO audits, and higher visibility through tier-based score boosts.',
  },
  {
    q: 'How often should I check my dashboard?',
    a: "We recommend checking weekly. Your AI mentions are scanned weekly, and your visibility score updates as you make profile improvements. You'll also receive a weekly email summary so you can stay informed without logging in.",
  },
  {
    q: 'Can I cancel my plan anytime?',
    a: 'Yes, you can downgrade or cancel anytime from Settings → Subscription. Your data is retained so you can upgrade again later without losing history.',
  },
];

// ── Feature cards data ─────────────────────────────────────────────
const FEATURES = [
  {
    name: 'AI Visibility Score',
    description:
      'Your overall score (0–100) showing how likely AI assistants are to recommend your business. Track improvements over time.',
    icon: 'score',
  },
  {
    name: 'AI Mentions',
    description:
      'Weekly scans across ChatGPT, Gemini, Perplexity & Claude to see when your business gets recommended.',
    icon: 'mentions',
  },
  {
    name: 'Live AI Search Test',
    description:
      'Run real-time queries against AI platforms and instantly see if your business appears in the results.',
    icon: 'search',
  },
  {
    name: 'GEO Audit',
    description:
      'Generative Engine Optimisation audit — checks your website for the signals AI systems look for.',
    icon: 'audit',
  },
  {
    name: 'Reviews',
    description:
      'Collect and display customer reviews. AI systems use review signals as trust indicators when recommending vendors.',
    icon: 'reviews',
  },
  {
    name: 'Products & Pricing',
    description:
      'List your products and services with pricing. Structured product data helps AI assistants match you to buyer queries.',
    icon: 'products',
  },
  {
    name: 'Analytics',
    description:
      'Track profile views, quote requests, AI mention trends, and visibility score changes over time.',
    icon: 'analytics',
  },
  {
    name: 'Weekly Email Report',
    description:
      'Receive a weekly summary of your AI visibility metrics, new mentions, and actionable tips.',
    icon: 'email',
  },
  {
    name: 'Blog Posts',
    description:
      'Publish content that boosts your authority signals. AI systems favour vendors with fresh, relevant content.',
    icon: 'blog',
  },
];

// ── Feature icon component ─────────────────────────────────────────
function FeatureIcon({ icon, className }: { icon: string; className?: string }) {
  const c = className || 'w-6 h-6';
  const map: Record<string, React.ReactNode> = {
    score: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    mentions: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    search: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    audit: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    reviews: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    products: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    analytics: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    email: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    blog: (
      <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  };
  return <>{map[icon] || null}</>;
}

// ── How-it-works steps ─────────────────────────────────────────────
const STEPS = [
  {
    num: 1,
    title: 'Complete Your Profile',
    desc: 'Add your company details, services, coverage areas, and a compelling description. This is the foundation AI systems read.',
  },
  {
    num: 2,
    title: 'List Your Products',
    desc: 'Add structured product/service listings with descriptions and pricing. AI assistants use this data to match you to buyer queries.',
  },
  {
    num: 3,
    title: 'Run a GEO Audit',
    desc: 'Check how your website scores on the signals AI systems care about — schema, meta tags, content quality, and more.',
  },
  {
    num: 4,
    title: 'Track Your AI Mentions',
    desc: 'See which AI platforms mention your business, how often, and where you rank vs competitors.',
  },
  {
    num: 5,
    title: 'Improve & Repeat',
    desc: 'Use your visibility score tips and GEO recommendations to make targeted improvements. Watch your score climb week by week.',
  },
];

// ════════════════════════════════════════════════════════════════════
// Main Page Component
// ════════════════════════════════════════════════════════════════════
export default function GettingStartedPage() {
  const { getCurrentToken, auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<string>('free');
  const [vendorId, setVendorId] = useState<string>('');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Parallel fetches
      const [profileRes, geoRes, searchTestRes] = await Promise.all([
        fetch(`${API_URL}/api/vendors/profile`, { headers }),
        fetch(`${API_URL}/api/geo-audit/latest`, { headers }).catch(() => null),
        fetch(`${API_URL}/api/ai-search-test/history`, { headers }).catch(() => null),
      ]);

      let profileComplete = false;
      let hasProducts = false;
      let hasGeoAudit = false;
      let hasSearchTest = false;
      let hasReviews = false;
      let viewedScore = false;
      let currentTier = 'free';
      let vId = '';

      // Profile data
      if (profileRes.ok) {
        const data = await profileRes.json();
        const v = data.vendor || data;
        vId = v._id || v.id || '';
        currentTier = v.tier || v.account?.tier || 'free';
        setTier(currentTier);
        setVendorId(vId);

        // Profile completeness: has company + description + coverage areas
        profileComplete = !!(
          v.company &&
          (v.businessProfile?.description || v.description) &&
          ((v.coverageAreas && v.coverageAreas.length > 0) ||
            (v.location?.coverage && v.location.coverage.length > 0))
        );

        // Products
        const productCount =
          v.productCount ?? v.products?.length ?? 0;
        hasProducts = productCount > 0;

        // Reviews
        const reviewCount = v.reviewCount ?? v.reviews?.length ?? 0;
        hasReviews = reviewCount > 0;
      }

      // GEO audit
      if (geoRes && geoRes.ok) {
        try {
          const geoData = await geoRes.json();
          hasGeoAudit = !!(geoData && (geoData.overallScore !== undefined || geoData.audit));
        } catch {
          // ignore
        }
      }

      // Search test
      if (searchTestRes && searchTestRes.ok) {
        try {
          const searchData = await searchTestRes.json();
          const tests = searchData.tests || searchData.history || searchData;
          hasSearchTest = Array.isArray(tests) ? tests.length > 0 : !!tests;
        } catch {
          // ignore
        }
      }

      // Visibility score viewed (localStorage)
      if (vId) {
        viewedScore = !!localStorage.getItem(`viewed_visibility_score_${vId}`);
      }

      setChecklist([
        {
          id: 'profile',
          label: 'Complete your company profile',
          done: profileComplete,
          href: '/vendor-dashboard/settings',
        },
        {
          id: 'products',
          label: 'Add at least one product or service',
          done: hasProducts,
          href: '/vendor-dashboard/products',
        },
        {
          id: 'score',
          label: 'Check your AI Visibility Score',
          done: viewedScore,
          href: '/vendor-dashboard/analytics',
        },
        {
          id: 'geo',
          label: 'Run your first GEO Audit',
          done: hasGeoAudit,
          href: '/vendor-dashboard/analytics',
        },
        {
          id: 'search',
          label: 'Try a Live AI Search Test',
          done: hasSearchTest,
          href: '/vendor-dashboard/analytics',
        },
        {
          id: 'reviews',
          label: 'Get your first customer review',
          done: hasReviews,
          href: '/vendor-dashboard/reviews',
        },
      ]);
    } catch (err) {
      console.error('Failed to fetch getting-started data:', err);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const completedCount = checklist.filter((c) => c.done).length;
  const totalCount = checklist.length || 6;
  const progressPct = Math.round((completedCount / totalCount) * 100);
  const displayTier = getDisplayTier(tier);

  // ── Loading state ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* ═══ SECTION 1: Hero ═══ */}
      <section className="rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 p-8 sm:p-10 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Welcome to TendorAI
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 mb-6 leading-relaxed">
            You&apos;re one of the first vendors building an AI-visible procurement
            presence. Businesses are already using ChatGPT, Gemini, and Copilot to
            find suppliers &mdash; the vendors who show up in those results win.
          </p>
          <p className="text-purple-200">
            This guide walks you through everything TendorAI does for you and how
            to get the most out of your dashboard.
          </p>
        </div>
      </section>

      {/* ═══ SECTION 2: Not Instant Sales ═══ */}
      <section className="card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          This is Not an Instant-Sales Tool
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl">
          TendorAI is building your future pipeline. Think of it like SEO was in
          2005 &mdash; the businesses that invested early dominated for years.
          Here&apos;s how AI search compares:
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Traditional SEO */}
          <div className="rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-bold">
                G
              </span>
              Traditional SEO
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">&#8226;</span>
                Optimise for Google&apos;s link-based algorithm
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">&#8226;</span>
                Users click through 10 blue links
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">&#8226;</span>
                Rankings based on backlinks &amp; keywords
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">&#8226;</span>
                Decades of established competition
              </li>
            </ul>
          </div>

          {/* AI Search (AEO) */}
          <div className="rounded-xl border-2 border-purple-200 bg-purple-50/50 p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold">
                AI
              </span>
              AI Search (AEO)
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">&#8226;</span>
                Optimise for AI recommendation engines
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">&#8226;</span>
                AI gives a direct answer with 2&ndash;3 vendors
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">&#8226;</span>
                Rankings based on structured data &amp; authority
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">&#8226;</span>
                <strong>Early mover advantage &mdash; act now</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: How It Works ═══ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How It Works &mdash; 5 Steps
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-purple-200 hidden sm:block" />

          <div className="space-y-6">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-4 sm:gap-6">
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                  {step.num}
                </div>

                {/* Card */}
                <div className="card p-5 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: Dashboard Features ═══ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Dashboard Features
        </h2>
        <p className="text-gray-600 mb-6">
          Every tool is designed to improve how AI assistants see and recommend
          your business.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.name}
              className="card p-5 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <FeatureIcon icon={f.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.name}</h3>
              <p className="text-sm text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 5: Choose Your Plan ═══ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 mb-6">
          Higher tiers unlock more features and give your listing an AI
          visibility boost.
        </p>

        <div className="grid sm:grid-cols-3 gap-5">
          {PLANS.map((plan) => {
            const isCurrentPlan = displayTier === plan.id;
            const isVerified = plan.id === 'verified';

            return (
              <div
                key={plan.id}
                className={`card p-6 flex flex-col relative ${
                  isVerified
                    ? 'border-2 border-purple-500 shadow-lg'
                    : ''
                }`}
              >
                {isVerified && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}

                <h3 className="text-lg font-bold text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {plan.description}
                </p>

                <div className="mb-4">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-gray-900">
                      Free
                    </span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-gray-900">
                        &pound;{plan.price}
                      </span>
                      <span className="text-gray-500 text-sm">/mo</span>
                    </>
                  )}
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feat) => (
                    <li
                      key={feat.text}
                      className="flex items-start gap-2 text-sm"
                    >
                      {feat.included ? (
                        <svg
                          className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span
                        className={
                          feat.included ? 'text-gray-700' : 'text-gray-400'
                        }
                      >
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <Link
                    href="/vendor-dashboard/settings?tab=subscription"
                    className={`w-full py-2.5 rounded-lg text-sm font-medium text-center block ${
                      isVerified
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    } transition-colors`}
                  >
                    Upgrade to {plan.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Blog add-on note */}
        <div className="card p-5 mt-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <FeatureIcon icon="blog" className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Blog Posts Add-on</h4>
            <p className="text-sm text-gray-600">
              Available on Visible and Verified plans. Publish articles to
              build authority signals that AI systems recognise. Manage your posts
              from the Posts section in the sidebar.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: Quick Start Checklist ═══ */}
      <section className="card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Quick Start Checklist
        </h2>
        <p className="text-gray-600 mb-5">
          Complete these steps to maximise your AI visibility from day one.
        </p>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">
              {completedCount} of {totalCount} completed
            </span>
            <span className="font-semibold text-purple-600">{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Checklist items */}
        <div className="space-y-3">
          {checklist.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                item.done
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.done
                    ? 'bg-green-500'
                    : 'border-2 border-gray-300'
                }`}
              >
                {item.done && (
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              <span
                className={`text-sm font-medium ${
                  item.done ? 'text-green-700 line-through' : 'text-gray-700'
                }`}
              >
                {item.label}
              </span>

              {/* Arrow */}
              {!item.done && (
                <svg
                  className="w-4 h-4 text-gray-400 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </Link>
          ))}
        </div>

        {completedCount === totalCount && (
          <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 text-center">
            <p className="text-green-700 font-semibold">
              All done! You&apos;re set up for maximum AI visibility.
            </p>
          </div>
        )}
      </section>

      {/* ═══ SECTION 7: FAQ ═══ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {item.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
