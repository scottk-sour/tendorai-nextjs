import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tendorai.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/suppliers`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/aeo-report`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/for-vendors`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const verticalPages: MetadataRoute.Sitemap = [
    'ai-visibility-for-solicitors',
    'ai-visibility-for-accountants',
    'ai-visibility-for-mortgage-advisors',
    'ai-visibility-for-estate-agents',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = [
    'photocopiers', 'telecoms', 'cctv', 'it', 'security', 'software',
    'conveyancing', 'family-law', 'criminal-law', 'commercial-law',
    'employment-law', 'wills-and-probate', 'immigration', 'personal-injury',
    'tax-advisory', 'audit-assurance', 'bookkeeping', 'payroll',
    'corporate-finance', 'business-advisory', 'vat-services', 'financial-planning',
    'residential-mortgages', 'buy-to-let', 'remortgage', 'first-time-buyer',
    'equity-release', 'commercial-mortgages', 'protection-insurance',
    'sales', 'lettings', 'property-management', 'block-management',
    'auctions', 'commercial-property', 'inventory',
  ].map((slug) => ({
    url: `${baseUrl}/suppliers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...verticalPages, ...servicePages];
}
