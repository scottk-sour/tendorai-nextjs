'use client';

import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function ProfileViewTracker({ vendorId }: { vendorId: string }) {
  useEffect(() => {
    const referrer = document.referrer;

    let source = 'direct';
    if (referrer.includes('google.com')) source = 'google';
    else if (referrer.includes('bing.com')) source = 'bing';
    else if (referrer.includes('tendorai.com')) source = 'tendorai_search';
    else if (
      ['chat.openai.com', 'chatgpt.com', 'perplexity.ai', 'gemini.google.com', 'claude.ai', 'grok.com']
        .some(d => referrer.includes(d))
    ) source = 'ai_referral';

    fetch(`${API_URL}/api/analytics/profile-view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vendorId, source }),
    })
      .then((res) => {
        if (!res.ok) console.error('ProfileView tracking failed:', res.status, res.statusText);
      })
      .catch((err) => console.error('ProfileView tracking failed:', err));
  }, [vendorId]);

  return null;
}
