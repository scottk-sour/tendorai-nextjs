export const TIER_PRIORITY: Record<string, number> = {
  // Verified tiers (highest priority) - £149/mo
  enterprise: 100,
  managed: 100,
  verified: 100,

  // Visible tiers (medium priority) - £99/mo
  basic: 50,
  visible: 50,
  standard: 50,

  // Legacy tiers (mapped to verified)
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
  verified: {
    name: 'Verified',
    price: 149,
    color: 'green',
    badge: 'Verified',
    features: [
      'Priority listing in search results',
      'Full profile with contact details',
      'Product catalogue display',
      'Quote request form',
      'Analytics dashboard',
      'Verified badge',
    ],
  },
  visible: {
    name: 'Visible',
    price: 99,
    color: 'blue',
    badge: 'Listed',
    features: [
      'Enhanced listing visibility',
      'Full profile with contact details',
      'Quote request form',
      'Basic analytics',
    ],
  },
  free: {
    name: 'Free',
    price: 0,
    color: 'gray',
    badge: null,
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

  if (['enterprise', 'managed', 'verified', 'gold', 'platinum'].includes(normalised)) {
    return 'verified';
  }

  if (['basic', 'visible', 'standard', 'silver', 'bronze'].includes(normalised)) {
    return 'visible';
  }

  return 'free';
}

// Check if tier can show pricing/contact details
export function canShowPricing(tier?: string): boolean {
  const displayTier = getDisplayTier(tier);
  return displayTier === 'verified' || displayTier === 'visible';
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
