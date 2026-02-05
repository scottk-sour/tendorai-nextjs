'use client';

import Link from 'next/link';

export type VendorTier = 'free' | 'listed' | 'basic' | 'visible' | 'managed' | 'verified';

interface TierGateProps {
  currentTier: string;
  requiredTier: 'visible' | 'verified';
  featureName: string;
  featureDescription?: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean; // For smaller cards
}

// Normalize tier names to internal format
function normalizeTier(tier: string): VendorTier {
  const t = tier?.toLowerCase() || 'free';
  const mapping: Record<string, VendorTier> = {
    free: 'free',
    listed: 'free',
    basic: 'visible',
    visible: 'visible',
    managed: 'verified',
    verified: 'verified',
  };
  return mapping[t] || 'free';
}

// Get tier display name
export function getTierLabel(tier: string): string {
  const normalized = normalizeTier(tier);
  const labels: Record<VendorTier, string> = {
    free: 'Listed (Free)',
    listed: 'Listed (Free)',
    basic: 'Visible',
    visible: 'Visible',
    managed: 'Verified',
    verified: 'Verified',
  };
  return labels[normalized] || 'Listed (Free)';
}

// Tier hierarchy for comparison
const tierHierarchy: Record<VendorTier, number> = {
  free: 0,
  listed: 0,
  basic: 1,
  visible: 1,
  managed: 2,
  verified: 2,
};

// Check if user has access
export function hasTierAccess(currentTier: string, requiredTier: 'visible' | 'verified'): boolean {
  const normalized = normalizeTier(currentTier);
  const requiredNormalized = normalizeTier(requiredTier);
  return tierHierarchy[normalized] >= tierHierarchy[requiredNormalized];
}

// Pricing for upgrade CTAs
const tierPricing: Record<string, string> = {
  visible: '£99/mo',
  verified: '£149/mo',
};

export default function TierGate({
  currentTier,
  requiredTier,
  featureName,
  featureDescription,
  children,
  className = '',
  compact = false,
}: TierGateProps) {
  const hasAccess = hasTierAccess(currentTier, requiredTier);

  // If user has access, render children normally
  if (hasAccess) {
    return <>{children}</>;
  }

  // Otherwise, show blurred content with upgrade CTA
  return (
    <div className={`relative ${className}`}>
      {/* Blurred content */}
      <div className="filter blur-[6px] pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[2px] rounded-xl">
        <div className={`text-center ${compact ? 'px-4 py-3' : 'px-6 py-6'} max-w-sm`}>
          {/* Lock icon */}
          <div className={`mx-auto ${compact ? 'w-10 h-10 mb-2' : 'w-14 h-14 mb-4'} rounded-full bg-purple-100 flex items-center justify-center`}>
            <svg
              className={`${compact ? 'w-5 h-5' : 'w-7 h-7'} text-purple-600`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Feature name */}
          <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold text-gray-900 mb-1`}>
            {featureName}
          </h3>

          {/* Description */}
          {featureDescription && (
            <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600 mb-3`}>
              {featureDescription}
            </p>
          )}

          {/* Upgrade info */}
          <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500 mb-3`}>
            Upgrade to{' '}
            <span className="font-medium text-purple-600">
              {requiredTier === 'visible' ? 'Visible' : 'Verified'}
            </span>{' '}
            to unlock
          </p>

          {/* CTA Button */}
          <Link
            href="/vendor-dashboard/settings?tab=subscription"
            className={`inline-flex items-center justify-center ${
              compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
            } bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm`}
          >
            Upgrade — From {tierPricing[requiredTier]}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Smaller inline lock for feature hints
export function TierBadge({ requiredTier }: { requiredTier: 'visible' | 'verified' }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
      {requiredTier === 'visible' ? 'Visible+' : 'Verified'}
    </span>
  );
}
