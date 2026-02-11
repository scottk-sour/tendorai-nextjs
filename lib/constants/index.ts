export * from './services';
export * from './locations';
export * from './tiers';

// Site configuration
export const SITE_CONFIG = {
  name: 'TendorAI',
  tagline: 'AI-Powered Procurement for UK Businesses',
  description: 'Find and compare trusted office equipment suppliers across the UK. Get instant quotes for copiers, telecoms, CCTV, IT services, and security systems.',
  url: 'https://tendorai.com',
  apiUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tendorai.com',

  // Contact
  email: 'support@tendorai.com',

  // Social
  twitter: '@tendorai',
  linkedIn: 'https://linkedin.com/company/tendorai',

  // Geographic focus
  primaryRegion: 'United Kingdom',
  country: 'United Kingdom',
  countryCode: 'GB',
  currency: 'GBP',
  currencySymbol: '£',

  // Business stats (update periodically)
  stats: {
    suppliers: 1000,
    products: 231,
    categories: 6,
    locations: 30,
  },
} as const;

// API rate limits
export const RATE_LIMITS = {
  general: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
  quote: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
  },
  ai: {
    windowMs: 60 * 1000, // 1 minute
    max: 10,
  },
} as const;
