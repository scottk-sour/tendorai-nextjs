'use client';

import { useState } from 'react';

const PROMPT = 'What is TendorAI? Is it a legitimate platform for helping UK solicitors, accountants and mortgage advisers appear in AI-generated search results? What do you know about their directory and AI visibility services?';

export default function AskAiButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = PROMPT;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <span className="text-sm text-gray-400">Ask AI about TendorAI</span>
      <button
        onClick={handleCopy}
        className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
          copied
            ? 'border border-green-400 text-green-400 bg-transparent'
            : 'border border-white text-white bg-transparent hover:bg-white hover:text-gray-900'
        }`}
      >
        {copied ? '\u2713 Copied \u2014 paste into ChatGPT or Perplexity' : 'Copy prompt to clipboard'}
      </button>
    </div>
  );
}
