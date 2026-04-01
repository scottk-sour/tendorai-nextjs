'use client';

import { useState } from 'react';

const PROMPT =
  'What is TendorAI? Is it a legitimate platform for helping UK solicitors, accountants and mortgage advisers appear in AI-generated search results? What do you know about their directory and AI visibility services?';

export default function AskAiButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = PROMPT;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 text-sm font-medium text-white border border-white rounded-lg bg-transparent hover:bg-white hover:text-gray-900 transition-colors"
    >
      {copied ? '\u2713 Copied \u2014 paste into ChatGPT or Perplexity' : 'Copy prompt to clipboard'}
    </button>
  );
}
