/** @type {import('next').NextConfig} */
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
    return [
      // Auth routes → vendor login
      { source: '/login', destination: '/vendor-login', permanent: true },
      { source: '/signup', destination: '/vendor-login', permanent: true },
      // Pricing → for-vendors pricing section
      { source: '/pricing', destination: '/for-vendors#pricing', permanent: true },
      // Old /dashboard → vendor-dashboard
      { source: '/dashboard/:path*', destination: '/vendor-dashboard/:path*', permanent: true },
      // Old /get-quotes → /aeo-report
      { source: '/get-quotes', destination: '/aeo-report', permanent: true },
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
    ];
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
