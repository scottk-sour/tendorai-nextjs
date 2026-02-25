export * from './services';
export * from './locations';
export * from './tiers';

// Site configuration
export const SITE_CONFIG = {
  name: 'TendorAI',
  tagline: "The UK's AI Visibility Platform",
  description: "Get your business recommended by ChatGPT, Perplexity, and Claude. AI visibility profiles and reports for UK solicitors, accountants, and suppliers.",
  url: 'https://www.tendorai.com',
  apiUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tendorai.com',

  // Contact
  email: 'scott.davies@tendorai.com',

  // Social
  twitter: '@AiTendor95471',
  linkedIn: 'https://www.linkedin.com/company/tendorai',

  // Geographic focus
  primaryRegion: 'United Kingdom',
  country: 'United Kingdom',
  countryCode: 'GB',
  currency: 'GBP',
  currencySymbol: '£',

  // Business stats (update periodically)
  stats: {
    suppliers: 11000,
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
