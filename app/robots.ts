import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/_next/static/',
          '/suppliers/conveyancing/',
          '/suppliers/family-law/',
          '/suppliers/criminal-law/',
          '/suppliers/commercial-law/',
          '/suppliers/employment-law/',
          '/suppliers/wills-and-probate/',
          '/suppliers/immigration/',
          '/suppliers/personal-injury/',
          '/suppliers/profile/',
          '/aeo-report/',
          '/for-vendors/',
        ],
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
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
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
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        userAgent: 'meta-externalagent',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'DeepSeekBot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.tendorai.com/sitemap.xml',
  };
}
