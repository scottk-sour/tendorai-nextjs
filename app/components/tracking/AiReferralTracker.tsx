'use client';

import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function AiReferralTracker({ vendorId }: { vendorId: string }) {
  useEffect(() => {
    const referrer = document.referrer;
    const aiSources = [
      { domain: 'chat.openai.com', source: 'chatgpt' },
      { domain: 'chatgpt.com', source: 'chatgpt' },
      { domain: 'perplexity.ai', source: 'perplexity' },
      { domain: 'gemini.google.com', source: 'gemini' },
      { domain: 'claude.ai', source: 'claude' },
      { domain: 'grok.com', source: 'grok' },
      { domain: 'bing.com', source: 'copilot' },
    ];

    const matched = aiSources.find(s => referrer.includes(s.domain));

    if (matched) {
      fetch(`${API_URL}/api/analytics/ai-referral`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: matched.source,
          vendorId,
          page: window.location.pathname,
          action: 'profile_view',
        }),
      }).catch(() => {});
    }
  }, [vendorId]);

  return null;
}
