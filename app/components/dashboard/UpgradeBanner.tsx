'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { hasTierAccess } from './TierGate';

interface UpgradeBannerProps {
  tier: string;
}

export default function UpgradeBanner({ tier }: UpgradeBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  // Check if user has dismissed banner this session
  useEffect(() => {
    const dismissedKey = 'upgrade-banner-dismissed';
    const wasDismissed = sessionStorage.getItem(dismissedKey);
    if (wasDismissed) {
      setDismissed(true);
    }
  }, []);

  // Don't show if user has visible or verified tier
  if (hasTierAccess(tier, 'visible')) {
    return null;
  }

  // Don't show if dismissed this session
  if (dismissed) {
    return null;
  }

  const handleDismiss = () => {
    sessionStorage.setItem('upgrade-banner-dismissed', 'true');
    setDismissed(true);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-5 shadow-lg">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✨</span>
            <h3 className="font-semibold text-lg">You&apos;re on the Free Plan</h3>
          </div>
          <p className="text-blue-100 text-sm max-w-xl">
            Upgrade to get AI visibility insights, unlimited products, and priority ranking in search results.
            Verified vendors get <span className="font-medium text-white">3x more leads</span> on average.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/vendor-dashboard/settings?tab=subscription"
            className="inline-flex items-center px-5 py-2.5 bg-white text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors shadow-sm"
          >
            See Plans
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Smaller inline upgrade nudge for specific features
export function UpgradeNudge({
  message,
  tier
}: {
  message: string;
  tier: string;
}) {
  if (hasTierAccess(tier, 'visible')) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-purple-50 border border-purple-100 rounded-lg text-sm">
      <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span className="text-purple-700">{message}</span>
      <Link
        href="/vendor-dashboard/settings?tab=subscription"
        className="ml-auto text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap"
      >
        Upgrade →
      </Link>
    </div>
  );
}
