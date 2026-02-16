import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/_next/static/'],
        disallow: [
          '/_next/data/',
          '/vendor-dashboard/',
          '/vendor-login',
          '/vendor-forgot-password',
          '/vendor-reset-password',
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.tendorai.com/sitemap.xml',
  };
}
