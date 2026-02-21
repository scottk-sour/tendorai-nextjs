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
Allow: /aeo-report/
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

User-Agent: OAI-SearchBot
Allow: /

User-Agent: ChatGPT-User
Allow: /

User-Agent: ClaudeBot
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: Perplexity-User
Allow: /

User-Agent: Google-Extended
Allow: /

User-Agent: Googlebot
Allow: /

User-Agent: Bingbot
Allow: /

User-Agent: Amazonbot
Allow: /

User-Agent: Applebot
Allow: /

User-Agent: Applebot-Extended
Allow: /

User-Agent: FacebookBot
Allow: /

User-Agent: meta-externalagent
Allow: /

User-Agent: LinkedInBot
Allow: /

User-Agent: DeepSeekBot
Allow: /

Sitemap: https://www.tendorai.com/sitemap.xml

# LLM Discoverability
# LLM.txt: https://www.tendorai.com/llm.txt
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
