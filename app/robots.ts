import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.tendorai.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/vendor-dashboard/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      {
        // Allow AI crawlers full access to public pages
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Claude-Web',
          'Anthropic-AI',
          'PerplexityBot',
          'Bytespider',
        ],
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
