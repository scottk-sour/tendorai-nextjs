'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

// ── Types ──────────────────────────────────────────────────────────
type OnboardingChecklist = {
  profileComplete: boolean;
  firstProductAdded: boolean;
  firstAuditRun: boolean;
  schemaCallScheduled: boolean;
  firstPillarPostGenerated: boolean;
  firstPrimaryDataAdded: boolean;
  firstLiveAITestRun: boolean;
  firmFactsComplete: boolean;
};

const DEFAULT_ONBOARDING: OnboardingChecklist = {
  profileComplete: false,
  firstProductAdded: false,
  firstAuditRun: false,
  schemaCallScheduled: false,
  firstPillarPostGenerated: false,
  firstPrimaryDataAdded: false,
  firstLiveAITestRun: false,
  firmFactsComplete: false,
};

const TICKABLE_ITEMS = ['firstAuditRun', 'schemaCallScheduled', 'firstLiveAITestRun'] as const;
type TickableItem = (typeof TICKABLE_ITEMS)[number];

const SCHEMA_CALL_MAILTO = `mailto:scott.davies@tendorai.com?subject=${encodeURIComponent(
  'Pro schema installation call'
)}&body=${encodeURIComponent(
  `Hi Scott,

I'm ready to schedule my 15-minute schema installation call.
My availability is:

[tell us your time zone and a few options]

Thanks,
[Vendor name]`
)}`;

interface ChecklistItem {
  key: keyof OnboardingChecklist;
  label: string;
  caption: string;
  href: string | null;
  tickable: boolean;
}

interface LoopGroup {
  verb: string;
  tagline: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

// Icons lifted from app/components/dashboard/loop/{Measure,Diagnose,Deploy}Card.tsx
const MEASURE_ICON = (
  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DIAGNOSE_ICON = (
  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a4 4 0 008 0V7a2 2 0 00-2-2h-2M7 11v3a4 4 0 008 0v-3m-4 7v3a3 3 0 003 3h0a3 3 0 003-3v-1.5m-3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
);

const DEPLOY_ICON = (
  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-6.233 0c-1.296 1.296-1.296 3.441.011 5.751 1.308-1.308 3.453-1.308 5.751.011a4.493 4.493 0 000-6.233" />
  </svg>
);

const LOOP_GROUPS: LoopGroup[] = [
  {
    verb: 'Measure',
    tagline: 'first run scheduled',
    icon: MEASURE_ICON,
    items: [
      {
        key: 'profileComplete',
        label: 'Complete your company profile',
        caption: 'Auto-completes when you save your profile with company name, city, description (50+ chars), vendor type, and at least one specialism.',
        href: '/vendor-dashboard/settings',
        tickable: false,
      },
      {
        key: 'firstProductAdded',
        label: 'Add at least one product or service',
        caption: 'Auto-completes when you add your first product or service.',
        href: '/vendor-dashboard/products',
        tickable: false,
      },
      {
        key: 'firstAuditRun',
        label: 'Run your first AI Visibility Audit',
        caption: 'Run your AI Visibility Audit from the dashboard, then mark as done.',
        href: '/vendor-dashboard/analytics',
        tickable: true,
      },
    ],
  },
  {
    verb: 'Diagnose',
    tagline: 'happens after first measurement',
    icon: DIAGNOSE_ICON,
    items: [
      {
        key: 'firstLiveAITestRun',
        label: 'Try a Live AI Search Test',
        caption: 'Try the Live AI Search Test from the dashboard, then mark as done.',
        href: '/vendor-dashboard/analytics',
        tickable: true,
      },
    ],
  },
  {
    verb: 'Deploy',
    tagline: 'your site preparation',
    icon: DEPLOY_ICON,
    items: [
      {
        key: 'schemaCallScheduled',
        label: 'Schedule your schema installation call (Pro)',
        caption: 'Book your 15-minute pair-install call with the TendorAI team, then mark as done.',
        href: SCHEMA_CALL_MAILTO,
        tickable: true,
      },
      {
        key: 'firstPillarPostGenerated',
        label: 'Generate your first pillar blog post',
        caption: 'Auto-completes when you generate a blog post from the pillar library.',
        href: '/vendor-dashboard/posts',
        tickable: false,
      },
      {
        key: 'firstPrimaryDataAdded',
        label: 'Add your first primary data point to a blog',
        caption: 'Auto-completes when you add primary data to a blog post.',
        href: '/vendor-dashboard/posts',
        tickable: false,
      },
      {
        key: 'firmFactsComplete',
        label: 'Complete firm facts',
        caption:
          'Auto-completes when your firm facts include at least 3 brand keywords and 1 unique selling point.',
        href: '/vendor-dashboard/settings?tab=firm-facts',
        tickable: false,
      },
    ],
  },
];

const ALL_ITEMS: ChecklistItem[] = LOOP_GROUPS.flatMap((g) => g.items);

// ════════════════════════════════════════════════════════════════════
// Main Page Component
// ════════════════════════════════════════════════════════════════════
export default function GettingStartedPage() {
  const { getCurrentToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [vendorId, setVendorId] = useState<string>('');
  const [onboarding, setOnboarding] = useState<OnboardingChecklist>(DEFAULT_ONBOARDING);
  const [tickingItem, setTickingItem] = useState<TickableItem | null>(null);
  const [tickError, setTickError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const profileRes = await fetch(`${API_URL}/api/vendors/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (profileRes.ok) {
        const data = await profileRes.json();
        const v = data.vendor || data;
        setVendorId(v._id || v.id || '');
        // Auto-derive firmFactsComplete client-side from firmFacts data — backend
        // doesn't manage this checklist key.
        const firmFactsComplete =
          (v.firmFacts?.brandKeywords?.length || 0) >= 3 &&
          (v.firmFacts?.uniqueSellingPoints?.filter((p: string) => p && p.trim()).length || 0) >= 1;
        setOnboarding({
          ...DEFAULT_ONBOARDING,
          ...(v.onboardingChecklist || {}),
          firmFactsComplete,
        });
      }
    } catch (err) {
      console.error('Failed to fetch getting-started data:', err);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTick = useCallback(
    async (item: TickableItem) => {
      const token = getCurrentToken();
      if (!token || !vendorId || tickingItem) return;
      setTickingItem(item);
      setTickError(null);
      try {
        const res = await fetch(
          `${API_URL}/api/vendors/${vendorId}/onboarding-checklist`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item }),
          }
        );
        if (!res.ok) {
          throw new Error("Couldn't mark as done. Please try again.");
        }
        const data = await res.json();
        if (data?.onboardingChecklist) {
          setOnboarding((prev) => ({
            ...DEFAULT_ONBOARDING,
            ...data.onboardingChecklist,
            // Preserve client-derived flag (backend doesn't compute it).
            firmFactsComplete: prev.firmFactsComplete,
          }));
        }
      } catch (err) {
        setTickError(err instanceof Error ? err.message : "Couldn't mark as done.");
      } finally {
        setTickingItem(null);
      }
    },
    [getCurrentToken, vendorId, tickingItem]
  );

  const completedCount = ALL_ITEMS.filter((c) => onboarding[c.key]).length;
  const totalCount = ALL_ITEMS.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);
  const allDone = completedCount === totalCount;

  // ── Loading state ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Setting up your account</h1>
        <p className="text-gray-600 mt-2 text-base">
          Your AI Visibility Loop runs every Monday. Here&rsquo;s what we&rsquo;re setting up first.
        </p>
      </header>

      {/* Progress bar */}
      <div className="card p-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">
            {completedCount} of {totalCount} steps complete
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

      {/* Tick error toast */}
      {tickError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {tickError}
        </div>
      )}

      {/* Loop-verb groups */}
      {LOOP_GROUPS.map((group) => (
        <section key={group.verb} className="card p-6">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="flex-shrink-0">{group.icon}</span>
            <h2 className="font-serif font-bold uppercase tracking-wide text-sm text-gray-900">
              {group.verb}
            </h2>
            <span className="text-xs text-gray-500">— {group.tagline}</span>
          </div>

          <div className="mt-4 space-y-3">
            {group.items.map((cfg) => {
              const done = onboarding[cfg.key];
              const isTicking = cfg.tickable && tickingItem === cfg.key;
              const isExternalHref = cfg.href?.startsWith('mailto:') || cfg.href?.startsWith('http');

              const labelEl = (
                <span
                  className={`text-sm font-medium ${
                    done ? 'text-green-700 line-through' : 'text-gray-800'
                  }`}
                >
                  {cfg.label}
                </span>
              );

              const labelWithLink =
                !done && cfg.href ? (
                  isExternalHref ? (
                    <a href={cfg.href} className="hover:text-purple-700 transition-colors">
                      {labelEl}
                    </a>
                  ) : (
                    <Link href={cfg.href} className="hover:text-purple-700 transition-colors">
                      {labelEl}
                    </Link>
                  )
                ) : (
                  labelEl
                );

              return (
                <div
                  key={cfg.key}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                    done
                      ? 'border-green-200 bg-green-50/50'
                      : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'
                  }`}
                >
                  {/* Status indicator */}
                  <div
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      done ? 'bg-green-500' : 'border-2 border-gray-300'
                    }`}
                    aria-hidden="true"
                  >
                    {done && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Label + caption */}
                  <div className="flex-1 min-w-0">
                    {labelWithLink}
                    {!done && <p className="mt-0.5 text-xs text-gray-500">{cfg.caption}</p>}
                  </div>

                  {/* Right-hand action */}
                  {done ? (
                    <span className="ml-auto text-xs font-semibold text-green-600 mt-0.5">Done</span>
                  ) : cfg.tickable ? (
                    <button
                      type="button"
                      onClick={() => handleTick(cfg.key as TickableItem)}
                      disabled={!!tickingItem}
                      className="ml-auto text-xs font-medium px-3 py-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 flex-shrink-0"
                    >
                      {isTicking ? (
                        <>
                          <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Saving
                        </>
                      ) : (
                        'Mark as done'
                      )}
                    </button>
                  ) : cfg.href ? (
                    isExternalHref ? (
                      <a
                        href={cfg.href}
                        className="ml-auto text-gray-400 hover:text-purple-600 mt-0.5 flex-shrink-0"
                        aria-label={`Go to ${cfg.label}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={cfg.href}
                        className="ml-auto text-gray-400 hover:text-purple-600 mt-0.5 flex-shrink-0"
                        aria-label={`Go to ${cfg.label}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Footer note + CTA */}
      <footer className="space-y-5 pt-2">
        <p className="text-sm text-gray-600 max-w-2xl">
          Once these are complete, your Loop will run automatically every Monday morning.
          You won&rsquo;t need to come back to this page.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Link
            href="/vendor-dashboard"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            {allDone ? 'Open your Loop dashboard' : 'Next: View your Loop dashboard'} <span aria-hidden>&rarr;</span>
          </Link>
          {allDone && (
            <span className="text-sm text-green-700 font-medium">All set. Welcome to the Loop.</span>
          )}
        </div>
      </footer>
    </div>
  );
}
