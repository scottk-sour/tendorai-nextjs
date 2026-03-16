export const TIER_PRIORITY: Record<string, number> = {
  // Pro tiers (highest priority) - £299/mo
  enterprise: 100,
  managed: 100,
  verified: 100,
  pro: 100,

  // Mid tiers (mapped to pro for display)
  basic: 50,
  visible: 50,
  standard: 50,

  // Legacy tiers (mapped to pro)
  gold: 100,
  platinum: 100,
  silver: 50,
  bronze: 50,

  // Free tiers (lowest priority)
  free: 0,
  listed: 0,
} as const;

export type TierKey = keyof typeof TIER_PRIORITY;

// Tier display configuration
export const TIER_CONFIG = {
  pro: {
    name: 'Pro',
    price: 299,
    color: 'green',
    badge: 'Verified',
    description: 'Get recommended first. Full structured data, weekly AI Visibility (AEO) reports, AI mention tracking, TendorAI Verified badge, and priority ranking in AI results.',
    features: [
      'Priority ranking in AI results',
      'Full structured data to AI',
      'AI mention tracking',
      'Weekly AI Visibility (AEO) report',
      'TendorAI Verified badge',
      'Unlimited product/service listings',
      'Full analytics dashboard',
      'Priority support',
    ],
  },
  free: {
    name: 'Free',
    price: 0,
    color: 'gray',
    badge: null,
    description: 'Claim your profile. Get listed in the TendorAI directory and visible to AI crawlers with your basic SRA/FCA details.',
    features: [
      'Basic directory listing',
      'Company name and services',
      'Coverage area display',
    ],
  },
} as const;

export type DisplayTier = keyof typeof TIER_CONFIG;

// Map raw tier to display tier
export function getDisplayTier(tier?: string): DisplayTier {
  if (!tier) return 'free';

  const normalised = tier.toLowerCase();

  if (['enterprise', 'managed', 'verified', 'gold', 'platinum', 'pro', 'basic', 'visible', 'standard', 'silver', 'bronze', 'starter'].includes(normalised)) {
    return 'pro';
  }

  return 'free';
}

// Check if tier can show pricing/contact details
export function canShowPricing(tier?: string): boolean {
  const displayTier = getDisplayTier(tier);
  return displayTier === 'pro';
}

// Check if tier can receive quotes
export function canReceiveQuotes(tier?: string): boolean {
  return canShowPricing(tier);
}

// Get tier priority score for sorting
export function getTierPriority(tier?: string): number {
  if (!tier) return 0;
  return TIER_PRIORITY[tier.toLowerCase()] || 0;
}

// Calculate full priority score (tier + profile completeness)
export function calculatePriorityScore(vendor: {
  tier?: string;
  company?: string;
  contactInfo?: { phone?: string; website?: string };
  email?: string;
  businessProfile?: { description?: string; yearsInBusiness?: number };
  brands?: string[];
  location?: { coverage?: string[] };
  hasProducts?: boolean;
}): number {
  // Tier score (0-100)
  const tierScore = getTierPriority(vendor.tier);

  // Visibility/completeness score (0-70)
  let visibilityScore = 0;

  if (vendor.company) visibilityScore += 3;
  if (vendor.contactInfo?.phone) visibilityScore += 4;
  if (vendor.email) visibilityScore += 3;
  if (vendor.contactInfo?.website) visibilityScore += 5;
  if (vendor.businessProfile?.yearsInBusiness) visibilityScore += 3;
  if (vendor.businessProfile?.description && vendor.businessProfile.description.length > 20) visibilityScore += 4;
  if (vendor.hasProducts) visibilityScore += 15;
  if (vendor.brands && vendor.brands.length > 0) visibilityScore += 5;
  if (vendor.location?.coverage && vendor.location.coverage.length > 0) visibilityScore += 5;

  // Combined: tier dominates, then visibility
  return tierScore * 1000 + visibilityScore * 10;
}
