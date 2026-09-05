/** @type {import('next').NextConfig} */

/**
 * Articles carrying an `href` are homed at /blog/<slug> or a dedicated route,
 * but /resources/[slug] used to serve them too — as thin 200s with an empty
 * body and a self-canonical. dynamicParams = false on that route now 404s
 * them; these 301s send the URLs to the article's real home instead, so any
 * inbound link or stale index entry is preserved rather than discarded.
 *
 * Generated from lib/content/articles.ts so the list cannot drift from the
 * content. Parsed textually because next.config.js is CommonJS and cannot
 * import the TypeScript module.
 */
function hrefArticleRedirects(alreadyDeclared) {
  const fs = require('fs');
  const path = require('path');
  const src = fs.readFileSync(
    path.join(__dirname, 'lib', 'content', 'articles.ts'),
    'utf8',
  );

  const seen = new Set();
  const out = [];

  for (const block of src.split('\n  {\n').slice(1)) {
    const end = block.indexOf('\n  },\n');
    const obj = end === -1 ? block : block.slice(0, end);

    const slug = /slug: '([^']+)'/.exec(obj);
    const href = /^\s*href: '([^']+)'/m.exec(obj);
    if (!slug || !href || seen.has(slug[1])) continue;
    seen.add(slug[1]);

    const source = `/resources/${slug[1]}`;
    if (alreadyDeclared.has(source)) continue;
    out.push({ source, destination: href[1], permanent: true });
  }

  if (out.length === 0) {
    throw new Error(
      'next.config.js: parsed zero href-bearing articles from lib/content/articles.ts. ' +
        'The file shape changed — fix the parser rather than shipping without the redirects.',
    );
  }

  return out;
}

const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tendorai.com',
      },
    ],
  },

  // Redirects for old URLs and removed pages
  async redirects() {
    const handWritten = [
      // /for-vendors retired — it sold the discontinued self-serve tier.
      // permanent: true emits a 308, which preserves the request method and
      // lets the browser carry any #pricing fragment onto /pricing, where the
      // <Pricing /> component still renders section id="pricing".
      { source: '/for-vendors', destination: '/pricing', permanent: true },

      // Auth routes → vendor login
      { source: '/login', destination: '/vendor-login', permanent: true },
      { source: '/signup', destination: '/vendor-login', permanent: true },
      // (Historic redirect /pricing → /pricing removed —
      // /pricing is now a canonical route in its own right; see
      // app/pricing/page.tsx.)
      // AI visibility checker → AI visibility report
      { source: '/ai-visibility-checker', destination: '/ai-visibility-report', permanent: true },
      // Old /dashboard → vendor-dashboard
      { source: '/dashboard/:path*', destination: '/vendor-dashboard/:path*', permanent: true },
      // Old /get-quotes → /ai-visibility-report
      { source: '/get-quotes', destination: '/ai-visibility-report', permanent: true },
      // === AEO copy retirement: solicitors read "AEO" as Attachment of Earnings Orders ===
      // Free report route rename — preserves the /results/:reportId sub-path via wildcard.
      { source: '/aeo-report', destination: '/ai-visibility-report', permanent: true },
      { source: '/aeo-report/:path*', destination: '/ai-visibility-report/:path*', permanent: true },
      // Checklist tool rename.
      { source: '/tools/aeo-checklist', destination: '/tools/ai-visibility-checklist', permanent: true },
      // Old /services/ routes → supplier directory
      { source: '/services/:path*', destination: '/suppliers', permanent: true },
      // Hyphenated admin login → actual route
      { source: '/admin-login', destination: '/admin/login', permanent: true },
      // British spelling → American spelling redirect
      { source: '/suppliers/mortgage-advisers', destination: '/suppliers/mortgage-advisors', permanent: true },

      // === Office equipment pages → /suppliers ===
      // Category pages
      { source: '/photocopiers', destination: '/suppliers', permanent: true },
      { source: '/suppliers/photocopiers', destination: '/suppliers', permanent: true },
      { source: '/suppliers/photocopiers/:city', destination: '/suppliers', permanent: true },
      { source: '/suppliers/telecoms', destination: '/suppliers', permanent: true },
      { source: '/suppliers/telecoms/:city', destination: '/suppliers', permanent: true },
      { source: '/suppliers/cctv', destination: '/suppliers', permanent: true },
      { source: '/suppliers/cctv/:city', destination: '/suppliers', permanent: true },
      { source: '/suppliers/it', destination: '/suppliers', permanent: true },
      { source: '/suppliers/it/:city', destination: '/suppliers', permanent: true },
      { source: '/suppliers/it-services/:path*', destination: '/suppliers', permanent: true },
      // Office equipment vendor profiles
      { source: '/suppliers/vendor/1-radio-structures-ltd', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/4d-interactive-ltd', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/a-solo-fire-and-security-ltd', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/a2b-technology-uk-ltd', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/able-security-concepts-ltd', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/absolute-security-systems-ltd', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/aepic-partners', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/alphabyte-it', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/apogee-corporation', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/ascari-office-limited-2', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/aurora-cymru-blue-sky-digital', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/digital-direct-tec', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/extrascope-ltd', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/flotek-group', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/itopsec', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/kick-ict-group', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/lima', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/pc-express', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/pisys-net', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/premier-copier-solutions-ltd', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/print-logic-cardiff', destination: '/suppliers', permanent: true },
      { source: '/suppliers/vendor/team-metalogic', destination: '/suppliers', permanent: true },

      // === Blog consolidation (claude/blog-consolidation) ===
      // Cluster 1: How to Get Recommended by ChatGPT (UK Firms 2026) — keeper /blog/how-to-get-recommended-by-chatgpt
      { source: '/blog/how-to-get-recommended-by-chatgpt-uk', destination: '/blog/how-to-get-recommended-by-chatgpt', permanent: true },
      { source: '/blog/how-to-enhance-ai-visibility-professional-services-firm', destination: '/blog/how-to-get-recommended-by-chatgpt', permanent: true },
      { source: '/blog/how-to-get-recommended-by-ai', destination: '/blog/how-to-get-recommended-by-chatgpt', permanent: true },
      // Cluster 2: Solicitor firm recommended by ChatGPT — keeper /blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt
      { source: '/blog/how-to-get-found-on-chatgpt-as-a-solicitor', destination: '/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt', permanent: true },
      { source: '/blog/ai-visibility-for-solicitors-uk', destination: '/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt', permanent: true },
      { source: '/blog/how-to-get-your-law-firm-visible-to-ai-assistants', destination: '/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt', permanent: true },
      { source: '/blog/how-to-get-solicitor-profile-into-ai-search-results', destination: '/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt', permanent: true },
      { source: '/blog/why-wont-chatgpt-recommend-my-law-firm', destination: '/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt', permanent: true },
      // Cluster 3: Accountancy on ChatGPT — keeper /blog/how-to-get-accountancy-firm-found-chatgpt-uk-2026
      { source: '/blog/how-to-get-your-accountancy-practice-into-ai-search-results', destination: '/blog/how-to-get-accountancy-firm-found-chatgpt-uk-2026', permanent: true },
      { source: '/blog/how-to-get-your-accountancy-firm-found-on-chatgpt', destination: '/blog/how-to-get-accountancy-firm-found-chatgpt-uk-2026', permanent: true },
      // Cluster 4: Mortgage adviser recommended — keeper /blog/how-to-get-mortgage-adviser-recommended-by-chatgpt
      { source: '/blog/ai-visibility-mortgage-advisors-uk', destination: '/blog/how-to-get-mortgage-adviser-recommended-by-chatgpt', permanent: true },
      // Cluster 5: Why isn't my business showing up — keeper /blog/why-isnt-my-business-showing-up-in-chatgpt-recommendations
      { source: '/blog/why-isnt-my-business-appearing-in-chatgpt-recommendations', destination: '/blog/why-isnt-my-business-showing-up-in-chatgpt-recommendations', permanent: true },
      { source: '/blog/why-business-not-showing-up-chatgpt-recommendations', destination: '/blog/why-isnt-my-business-showing-up-in-chatgpt-recommendations', permanent: true },
      // Cluster 6: Estate agents complete guide — keeper /ai-visibility-for-estate-agents (NOT under /blog)
      { source: '/blog/how-to-get-estate-agency-recommended-by-chatgpt', destination: '/ai-visibility-for-estate-agents', permanent: true },
      // Cluster 7: Best AI Visibility Tools UK — keeper /blog/best-ai-visibility-tools-uk-professional-services
      { source: '/blog/best-ai-visibility-tool-uk', destination: '/blog/best-ai-visibility-tools-uk-professional-services', permanent: true },
      { source: '/best-ai-visibility-tool-uk', destination: '/blog/best-ai-visibility-tools-uk-professional-services', permanent: true },
      { source: '/blog/ai-visibility-tools-professional-services-firms-uk', destination: '/blog/best-ai-visibility-tools-uk-professional-services', permanent: true },
      { source: '/blog/tendorai-vs-otterly-vs-profound-uk-professional-services', destination: '/blog/best-ai-visibility-tools-uk-professional-services', permanent: true },
      // Cluster 8: Structured data — keeper /blog/does-structured-data-help-ai-visibility
      { source: '/blog/schema-markup-why-ai-recommends-your-competitor', destination: '/blog/does-structured-data-help-ai-visibility', permanent: true },
      // Cluster 9: GEO for UK businesses — keeper /blog/geo-marketing-uk-businesses
      { source: '/blog/will-ai-make-seo-obsolete-what-uk-professional-services-firms-need-to-know', destination: '/blog/geo-marketing-uk-businesses', permanent: true },
      { source: '/blog/geo-for-uk-solicitors', destination: '/blog/geo-marketing-uk-businesses', permanent: true },
      { source: '/blog/ai-visibility-vs-seo-agencies', destination: '/blog/geo-marketing-uk-businesses', permanent: true },
      // Cluster 10: AI Visibility Report UK Solicitors — keeper /blog/ai-visibility-report-uk-solicitors-2026
      { source: '/blog/8600-solicitors-analysed', destination: '/blog/ai-visibility-report-uk-solicitors-2026', permanent: true },
      { source: '/blog/why-ai-isnt-recommending-you', destination: '/blog/ai-visibility-report-uk-solicitors-2026', permanent: true },
      // Slug year-rename: 2025 → 2026 (post title always said 2026; slug was stale).
      { source: '/blog/ai-visibility-report-uk-solicitors-2025', destination: '/blog/ai-visibility-report-uk-solicitors-2026', permanent: true },
      // Cluster 11: 216 UK Solicitors study — keeper /blog/ai-recommends-uk-solicitors-study
      { source: '/blog/ai-recommends-solicitors-uk-cities', destination: '/blog/ai-recommends-uk-solicitors-study', permanent: true },
      // Cluster 12: Why AI visibility is critical for UK solicitors — keeper /blog/ai-visibility-crucial-solicitors-uk
      { source: '/blog/are-clients-finding-you-on-chatgpt', destination: '/blog/ai-visibility-crucial-solicitors-uk', permanent: true },
      { source: '/are-clients-finding-you-on-chatgpt', destination: '/blog/ai-visibility-crucial-solicitors-uk', permanent: true },
      // Cluster 13: TendorAI Review — keeper /blog/tendorai-review-what-uk-professional-services-firms-get
      { source: '/blog/tendorai-is-not-a-monitoring-tool', destination: '/blog/tendorai-review-what-uk-professional-services-firms-get', permanent: true },
      // Cluster 14: Cardiff Solicitors AI Visibility — keeper /blog/cardiff-solicitors-ai-visibility-may-2026
      { source: '/blog/ai-visibility-report-solicitors-cardiff', destination: '/blog/cardiff-solicitors-ai-visibility-may-2026', permanent: true },
      // Cluster 15: Manchester Solicitors — keeper /blog/manchester-solicitors-chatgpt-recommendations
      { source: '/blog/ai-visibility-report-solicitors-manchester', destination: '/blog/manchester-solicitors-chatgpt-recommendations', permanent: true },

      // === Office equipment blog prune (no keeper — back to blog index) ===
      { source: '/blog/photocopier-costs-uk-2026', destination: '/blog', permanent: true },
      { source: '/blog/copier-lease-vs-buy-uk', destination: '/blog', permanent: true },
      { source: '/blog/voip-vs-traditional-phone-systems', destination: '/blog', permanent: true },
      { source: '/blog/average-cpc-rates-uk-2026', destination: '/blog', permanent: true },
      { source: '/blog/business-cctv-guide-uk', destination: '/blog', permanent: true },
      { source: '/blog/switching-office-equipment-suppliers', destination: '/blog', permanent: true },

      // === Mirror /resources/<slug> for entries that had no href (rendered at both URLs) ===
      { source: '/resources/how-to-get-recommended-by-chatgpt-uk', destination: '/blog/how-to-get-recommended-by-chatgpt', permanent: true },
      { source: '/resources/ai-visibility-for-solicitors-uk', destination: '/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt', permanent: true },
      { source: '/resources/geo-for-uk-solicitors', destination: '/blog/geo-marketing-uk-businesses', permanent: true },
      { source: '/resources/ai-visibility-vs-seo-agencies', destination: '/blog/geo-marketing-uk-businesses', permanent: true },
      { source: '/resources/8600-solicitors-analysed', destination: '/blog/ai-visibility-report-uk-solicitors-2026', permanent: true },
      { source: '/resources/why-ai-isnt-recommending-you', destination: '/blog/ai-visibility-report-uk-solicitors-2026', permanent: true },
      { source: '/resources/ai-recommends-solicitors-uk-cities', destination: '/blog/ai-recommends-uk-solicitors-study', permanent: true },
      { source: '/resources/tendorai-is-not-a-monitoring-tool', destination: '/blog/tendorai-review-what-uk-professional-services-firms-get', permanent: true },
      { source: '/resources/photocopier-costs-uk-2026', destination: '/blog', permanent: true },
      { source: '/resources/copier-lease-vs-buy-uk', destination: '/blog', permanent: true },
      { source: '/resources/voip-vs-traditional-phone-systems', destination: '/blog', permanent: true },
      { source: '/resources/average-cpc-rates-uk-2026', destination: '/blog', permanent: true },
      { source: '/resources/business-cctv-guide-uk', destination: '/blog', permanent: true },
      { source: '/resources/switching-office-equipment-suppliers', destination: '/blog', permanent: true },
    ];

    // Generated 301s must not shadow a hand-written entry for the same source.
    const declared = new Set(handWritten.map((r) => r.source));
    return [...handWritten, ...hrefArticleRedirects(declared)];
  },

  // Rewrites for gradual migration - forward some API routes to Express backend
  async rewrites() {
    const expressBackend = process.env.EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

    return [
      // OpenAPI spec for AI discovery
      {
        source: '/.well-known/openapi.json',
        destination: `${expressBackend}/openapi.json`,
      },
      // Stripe webhooks and payments - keep on Express
      {
        source: '/api/stripe/:path*',
        destination: `${expressBackend}/api/stripe/:path*`,
      },
      // Vendor file uploads - keep on Express (needs multer)
      {
        source: '/api/vendors/upload/:path*',
        destination: `${expressBackend}/api/vendors/upload/:path*`,
      },
      // Legacy copier suggestion endpoint
      {
        source: '/api/suggest-copiers',
        destination: `${expressBackend}/api/suggest-copiers`,
      },
      // Admin login — proxy to avoid CORS issues in dev
      {
        source: '/api/admin/login',
        destination: `${expressBackend}/api/admin/login`,
      },
    ];
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Prevent stale HTML on Vercel CDN edge
        source: '/((?!_next/static|_next/image|static/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
