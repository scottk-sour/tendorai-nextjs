/**
 * AI Crawler Detection Utility
 * Detects when AI assistants/bots visit pages for analytics tracking
 */

export type AISource = 'chatgpt' | 'claude' | 'perplexity' | 'gemini' | 'copilot' | 'other';

/**
 * Detect AI source from User-Agent string
 * Returns null if not an AI crawler
 */
export function detectAISource(userAgent: string): AISource | null {
  if (!userAgent) return null;

  const ua = userAgent.toLowerCase();

  // OpenAI / ChatGPT
  if (ua.includes('gptbot') || ua.includes('chatgpt') || ua.includes('openai')) {
    return 'chatgpt';
  }

  // Anthropic / Claude
  if (ua.includes('claude') || ua.includes('anthropic')) {
    return 'claude';
  }

  // Perplexity
  if (ua.includes('perplexitybot') || ua.includes('perplexity')) {
    return 'perplexity';
  }

  // Google / Gemini
  if (ua.includes('google-extended') || ua.includes('gemini')) {
    return 'gemini';
  }

  // Microsoft / Copilot / Bing
  if (ua.includes('bingbot') && ua.includes('copilot')) {
    return 'copilot';
  }

  // Generic AI bot detection
  if (ua.includes('ai-bot') || ua.includes('llm') || ua.includes('bytespider')) {
    return 'other';
  }

  return null;
}

/**
 * Check if User-Agent is any kind of bot (AI or regular)
 */
export function isBot(userAgent: string): boolean {
  if (!userAgent) return false;

  const ua = userAgent.toLowerCase();
  const botPatterns = [
    'bot', 'crawler', 'spider', 'scraper',
    'gptbot', 'chatgpt', 'claude', 'anthropic',
    'perplexity', 'google-extended', 'bingbot',
    'bytespider', 'slurp', 'duckduckbot',
  ];

  return botPatterns.some(pattern => ua.includes(pattern));
}

/**
 * Log AI visit to analytics endpoint
 * Fire and forget - doesn't block page render
 */
export async function logAIVisit(
  vendorId: string,
  aiSource: AISource,
  page: string,
  backendUrl: string
): Promise<void> {
  try {
    await fetch(`${backendUrl}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendorId,
        eventType: 'profile_view',
        source: {
          page,
          referrer: aiSource,
          isAI: true,
        },
      }),
    });
  } catch {
    // Silently fail - don't impact page load
  }
}
