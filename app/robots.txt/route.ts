export function GET() {
  const body = `User-Agent: *
Allow: /_next/static/
Allow: /suppliers/conveyancing/
Allow: /suppliers/family-law/
Allow: /suppliers/criminal-law/
Allow: /suppliers/commercial-law/
Allow: /suppliers/employment-law/
Allow: /suppliers/wills-and-probate/
Allow: /suppliers/immigration/
Allow: /suppliers/personal-injury/
Allow: /suppliers/mortgage-advisors/
Allow: /suppliers/residential-mortgages/
Allow: /suppliers/buy-to-let/
Allow: /suppliers/remortgage/
Allow: /suppliers/first-time-buyer/
Allow: /suppliers/equity-release/
Allow: /suppliers/commercial-mortgages/
Allow: /suppliers/protection-insurance/
Allow: /suppliers/estate-agents/
Allow: /suppliers/sales/
Allow: /suppliers/lettings/
Allow: /suppliers/property-management/
Allow: /suppliers/block-management/
Allow: /suppliers/auctions/
Allow: /suppliers/commercial-property/
Allow: /suppliers/inventory/
Allow: /suppliers/profile/
Allow: /posts/
Allow: /ai-visibility-report/
Allow: /for-vendors/
Disallow: /_next/data/
Disallow: /vendor-dashboard/
Disallow: /vendor-login
Disallow: /vendor-forgot-password
Disallow: /vendor-reset-password
Disallow: /admin/
Disallow: /api/

User-Agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: OAI-SearchBot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: ChatGPT-User
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: ClaudeBot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Claude-User
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Claude-SearchBot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: PerplexityBot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Perplexity-User
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Google-Extended
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Amazonbot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Applebot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: Applebot-Extended
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: FacebookBot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: meta-externalagent
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: LinkedInBot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

User-Agent: DeepSeekBot
Allow: /
Disallow: /admin/
Disallow: /vendor-dashboard/

Sitemap: https://www.tendorai.com/sitemap.xml

# LLM Discoverability
# LLMs.txt: https://www.tendorai.com/llms-full.txt
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
