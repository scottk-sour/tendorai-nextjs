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

  // Redirects for admin routes to React SPA at app.tendorai.com
  // Vendor auth and dashboard now handled by Next.js
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: 'https://app.tendorai.com/admin/:path*',
        permanent: false,
      },
      {
        source: '/login',
        destination: 'https://app.tendorai.com/login',
        permanent: false,
      },
      {
        source: '/signup',
        destination: 'https://app.tendorai.com/signup',
        permanent: false,
      },
      {
        source: '/dashboard/:path*',
        destination: 'https://app.tendorai.com/dashboard/:path*',
        permanent: false,
      },
    ];
  },

  // Rewrites for gradual migration - forward some API routes to Express backend
  async rewrites() {
    const expressBackend = process.env.EXPRESS_BACKEND_URL || 'https://ai-procurement-backend-q35u.onrender.com';

    return [
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
