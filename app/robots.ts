import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tendorai.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/vendor-dashboard/',
          '/admin/',
          '/admin-dashboard',
          '/admin-login',
          '/_next/',
          '/private/',
        ],
      },
      {
        // Explicitly allow AI crawlers — maximum crawlability
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'anthropic-ai',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'Bingbot',
          'Bytespider',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/vendor-dashboard/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
