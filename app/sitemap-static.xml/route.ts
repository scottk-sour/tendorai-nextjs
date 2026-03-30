const baseUrl = 'https://www.tendorai.com';

const staticPages = [
  { url: '', changeFrequency: 'weekly', priority: 1.0 },
  { url: '/suppliers', changeFrequency: 'daily', priority: 0.9 },
  { url: '/aeo-report', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/for-vendors', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/ai-visibility-platform', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/ai-visibility-tool', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/ai-visibility-uk', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/resources', changeFrequency: 'weekly', priority: 0.7 },
  { url: '/posts', changeFrequency: 'weekly', priority: 0.6 },
  { url: '/how-it-works', changeFrequency: 'monthly', priority: 0.6 },
  { url: '/about', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/faq', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/terms', changeFrequency: 'yearly', priority: 0.3 },
];

const verticalSlugs = [
  'ai-visibility-for-solicitors',
  'ai-visibility-for-accountants',
  'ai-visibility-for-mortgage-advisors',
  'ai-visibility-for-estate-agents',
];

const supplierCitySlugs = [
  'suppliers/solicitors',
  'suppliers/accountants',
  'suppliers/mortgage-advisors',
  'suppliers/estate-agents',
];

const citySlugs = [
  'cardiff', 'bristol', 'swansea', 'newport', 'london', 'manchester',
  'birmingham', 'leeds', 'liverpool', 'sheffield', 'newcastle', 'nottingham',
  'leicester', 'edinburgh', 'glasgow', 'brighton', 'oxford', 'cambridge',
  'reading', 'southampton', 'plymouth', 'exeter', 'bath', 'york',
  'chester', 'cheltenham', 'gloucester',
];

const blogSlugs = [
  'how-to-get-recommended-by-ai',
  'why-wont-chatgpt-recommend-my-law-firm',
  'why-business-not-showing-up-chatgpt-recommendations',
  'how-to-get-your-law-firm-visible-to-ai-assistants',
  'how-to-get-solicitor-profile-into-ai-search-results',
  'best-ai-visibility-tools-uk-professional-services',
  'ai-visibility-mortgage-advisors-uk',
  'how-to-check-if-business-appears-in-ai-recommendations',
  'how-much-conveyancing-cost-cardiff-2026',
  'ai-visibility-report-uk-solicitors-2025',
  'tendorai-vs-otterly-vs-profound-uk-professional-services',
  'schema-markup-why-ai-recommends-your-competitor',
  'how-to-get-your-accountancy-firm-found-on-chatgpt',
  'how-to-get-found-on-chatgpt-as-a-solicitor',
  'tendorai-is-not-a-monitoring-tool',
  'ai-visibility-crucial-solicitors-uk',
  'ai-visibility-for-solicitors-uk',
  'how-to-get-mortgage-adviser-recommended-by-chatgpt',
  'ai-recommends-solicitors-uk-cities',
  'ai-recommends-accountants-uk-cities',
  'ai-recommends-mortgage-advisors-uk-cities',
  'ai-recommends-estate-agents-uk-cities',
  'geo-marketing-uk-businesses',
  'geo-for-uk-solicitors',
  '8600-solicitors-analysed',
  'ai-visibility-vs-seo-agencies',
  'photocopier-costs-uk-2026',
  'copier-lease-vs-buy-uk',
  'voip-vs-traditional-phone-systems',
  'average-cpc-rates-uk-2026',
  'business-cctv-guide-uk',
  'switching-office-equipment-suppliers',
  // City-specific AI visibility reports
  'ai-visibility-report-solicitors-london',
  'ai-visibility-report-solicitors-manchester',
  'ai-visibility-report-solicitors-birmingham',
  'ai-visibility-report-solicitors-leeds',
  'ai-visibility-report-solicitors-liverpool',
  'ai-visibility-report-solicitors-nottingham',
  'ai-visibility-report-solicitors-bristol',
  'ai-visibility-report-solicitors-leicester',
  'ai-visibility-report-solicitors-bradford',
  'ai-visibility-report-solicitors-ilford',
  'ai-visibility-report-solicitors-cardiff',
  'ai-visibility-report-solicitors-bolton',
  'ai-visibility-report-solicitors-newcastle',
  'ai-visibility-report-solicitors-sheffield',
  'ai-visibility-report-solicitors-stockport',
  'ai-visibility-report-solicitors-luton',
  'ai-visibility-report-solicitors-preston',
  'ai-visibility-report-solicitors-york',
  'ai-visibility-report-solicitors-norwich',
  'ai-visibility-report-solicitors-cheltenham',
  'ai-visibility-report-solicitors-blackburn',
];

const serviceSlugs = [
  'photocopiers', 'telecoms', 'cctv', 'it', 'security', 'software',
  'conveyancing', 'family-law', 'criminal-law', 'commercial-law',
  'employment-law', 'wills-and-probate', 'immigration', 'personal-injury',
  'tax-advisory', 'audit-assurance', 'bookkeeping', 'payroll',
  'corporate-finance', 'business-advisory', 'vat-services', 'financial-planning',
  'residential-mortgages', 'buy-to-let', 'remortgage', 'first-time-buyer',
  'equity-release', 'commercial-mortgages', 'protection-insurance',
  'sales', 'lettings', 'property-management', 'block-management',
  'auctions', 'commercial-property', 'inventory',
];

function entry(loc: string, changefreq: string, priority: number) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
  const cityVerticalUrls = verticalSlugs.flatMap((v) =>
    citySlugs.map((c) => entry(`${baseUrl}/${v}/${c}`, 'monthly', 0.7))
  );

  const supplierCityUrls = supplierCitySlugs.flatMap((v) =>
    citySlugs.map((c) => entry(`${baseUrl}/${v}/${c}`, 'weekly', 0.7))
  );

  const urls = [
    ...staticPages.map((p) => entry(`${baseUrl}${p.url}`, p.changeFrequency, p.priority)),
    ...verticalSlugs.map((s) => entry(`${baseUrl}/${s}`, 'monthly', 0.8)),
    ...cityVerticalUrls,
    ...supplierCityUrls,
    ...blogSlugs.map((s) => entry(`${baseUrl}/blog/${s}`, 'monthly', 0.7)),
    ...serviceSlugs.map((s) => entry(`${baseUrl}/suppliers/${s}`, 'weekly', 0.7)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
