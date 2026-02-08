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
          '/admin-dashboard',
          '/admin-login',
          '/_next/',
          '/private/',
        ],
      },
      {
        // Allow AI crawlers full access to public pages and AI discovery files
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Claude-Web',
          'ClaudeBot',
          'Anthropic-AI',
          'anthropic-ai',
          'PerplexityBot',
          'Amazonbot',
          'Google-Extended',
          'Bytespider',
          'Bingbot',
        ],
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
          '/.well-known/',
          '/suppliers/',
          '/posts/',
        ],
        disallow: ['/vendor-dashboard/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
