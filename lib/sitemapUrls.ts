// Shared URL enumeration for the sitemap routes and the IndexNow postbuild
// script. One source of truth — when an article is added to
// `lib/content/articles.ts`, both surfaces pick it up automatically.

import { articles } from './content/articles';

export const BASE_URL = 'https://www.tendorai.com';

export interface SitemapEntry {
  loc: string;          // absolute URL
  lastmod: string;      // ISO datetime
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;     // 0.0 – 1.0
}

// ── Static, hand-curated route lists ────────────────────────────────────────
// These mirror routes that exist on disk under app/ but can't be auto-
// enumerated without an fs walk. Keep in sync if new top-level routes ship.

const STATIC_PAGES: Array<{
  path: string;
  changefreq: SitemapEntry['changefreq'];
  priority: number;
}> = [
  { path: '', changefreq: 'weekly', priority: 1.0 },
  { path: '/suppliers', changefreq: 'daily', priority: 0.9 },
  { path: '/ai-visibility-report', changefreq: 'monthly', priority: 0.9 },
  { path: '/for-vendors', changefreq: 'monthly', priority: 0.8 },
  { path: '/pricing', changefreq: 'monthly', priority: 0.8 },
  { path: '/ai-visibility-platform', changefreq: 'monthly', priority: 0.9 },
  { path: '/best-ai-visibility-tools-uk-solicitors', changefreq: 'monthly', priority: 0.8 },
  { path: '/ai-visibility-tool', changefreq: 'monthly', priority: 0.7 },
  { path: '/ai-visibility-uk', changefreq: 'monthly', priority: 0.7 },
  { path: '/resources', changefreq: 'daily', priority: 0.8 },
  { path: '/posts', changefreq: 'weekly', priority: 0.6 },
  { path: '/how-it-works', changefreq: 'monthly', priority: 0.6 },
  { path: '/about', changefreq: 'monthly', priority: 0.5 },
  { path: '/contact', changefreq: 'monthly', priority: 0.5 },
  { path: '/faq', changefreq: 'monthly', priority: 0.5 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { path: '/terms', changefreq: 'yearly', priority: 0.3 },
];

const VERTICAL_SLUGS = [
  'ai-visibility-for-solicitors',
  'ai-visibility-for-accountants',
  'ai-visibility-for-mortgage-advisors',
  'ai-visibility-for-estate-agents',
];

const SUPPLIER_CATEGORY_SLUGS = [
  'suppliers/solicitors',
  'suppliers/accountants',
  'suppliers/mortgage-advisors',
  'suppliers/estate-agents',
];

const CITY_SLUGS = [
  'cardiff', 'bristol', 'swansea', 'newport', 'london', 'manchester',
  'birmingham', 'leeds', 'liverpool', 'sheffield', 'newcastle', 'nottingham',
  'leicester', 'edinburgh', 'glasgow', 'brighton', 'oxford', 'cambridge',
  'reading', 'southampton', 'plymouth', 'exeter', 'bath', 'york',
  'chester', 'cheltenham', 'gloucester',
];

const TOOL_SLUGS = [
  'schema-checker',
  'ai-visibility-checklist',
  'robots-checker',
  'savings-calculator',
];

const SERVICE_SLUGS = [
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

// ── Build the full entry list ───────────────────────────────────────────────

function nowIso() {
  return new Date().toISOString();
}

/**
 * Article URL: respects the `href` field when set (some articles redirect
 * to a dedicated route, others use the /resources/[slug] renderer). When
 * `href` is unset the article is rendered at /resources/<slug>.
 */
function articleUrl(article: { slug: string; href?: string }): string {
  if (article.href && article.href.trim().length > 0) {
    return article.href.startsWith('http')
      ? article.href
      : `${BASE_URL}${article.href.startsWith('/') ? article.href : `/${article.href}`}`;
  }
  return `${BASE_URL}/resources/${article.slug}`;
}

/**
 * All non-vendor sitemap entries — static pages, vertical hubs, vertical x
 * city combos, supplier category x city combos, articles, tools, service
 * category pages.
 *
 * Vendor profile URLs are emitted by the separate sitemap-vendors*.xml
 * route handlers (MongoDB-paged) and are excluded here so we don't blow up
 * the IndexNow batch with 8000+ vendor URLs on every build.
 */
export function getAllStaticEntries(): SitemapEntry[] {
  const ts = nowIso();
  const entries: SitemapEntry[] = [];

  for (const p of STATIC_PAGES) {
    entries.push({
      loc: `${BASE_URL}${p.path}`,
      lastmod: ts,
      changefreq: p.changefreq,
      priority: p.priority,
    });
  }

  for (const v of VERTICAL_SLUGS) {
    entries.push({
      loc: `${BASE_URL}/${v}`,
      lastmod: ts,
      changefreq: 'monthly',
      priority: 0.8,
    });
    for (const c of CITY_SLUGS) {
      entries.push({
        loc: `${BASE_URL}/${v}/${c}`,
        lastmod: ts,
        changefreq: 'monthly',
        priority: 0.7,
      });
    }
  }

  for (const s of SUPPLIER_CATEGORY_SLUGS) {
    for (const c of CITY_SLUGS) {
      entries.push({
        loc: `${BASE_URL}/${s}/${c}`,
        lastmod: ts,
        changefreq: 'weekly',
        priority: 0.7,
      });
    }
  }

  for (const article of articles) {
    const lastmod = article.updatedDate || article.publishedDate || ts;
    // Convert YYYY-MM-DD → ISO datetime for sitemap consumers.
    const lastmodIso =
      /^\d{4}-\d{2}-\d{2}$/.test(lastmod)
        ? new Date(`${lastmod}T00:00:00.000Z`).toISOString()
        : lastmod;
    entries.push({
      loc: articleUrl(article),
      lastmod: lastmodIso,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  for (const t of TOOL_SLUGS) {
    entries.push({
      loc: `${BASE_URL}/tools/${t}`,
      lastmod: ts,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  for (const s of SERVICE_SLUGS) {
    entries.push({
      loc: `${BASE_URL}/suppliers/${s}`,
      lastmod: ts,
      changefreq: 'weekly',
      priority: 0.7,
    });
  }

  // Dedupe by URL — articles with href pointing to /blog/<slug> can collide
  // with hand-curated entries.
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });
}

/**
 * Flat URL list for IndexNow submission. Vendor URLs are intentionally
 * excluded — see getAllStaticEntries.
 */
export function getAllStaticUrls(): string[] {
  return getAllStaticEntries().map((e) => e.loc);
}
