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
        className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${
          copied
            ? 'bg-green-600/20 text-green-400 border border-green-600/30'
            : 'bg-purple-600/20 text-purple-300 border border-purple-600/30 hover:bg-purple-600/30 hover:text-purple-200'
        }`}
      >
        {copied ? '\u2713 Copied \u2014 paste into ChatGPT or Perplexity' : 'Copy prompt to clipboard'}
      </button>
    </div>
  );
}
