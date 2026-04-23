'use client';

import { useEffect, useState } from 'react';

export default function SchemaPreview({
  json,
  serviceName,
  onClose,
}: {
  json: unknown;
  serviceName?: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const pretty = (() => {
    try {
      return JSON.stringify(json, null, 2);
    } catch {
      return String(json);
    }
  })();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pretty);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — user can still select and copy manually.
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="schema-preview-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-3xl sm:rounded-xl shadow-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id="schema-preview-title" className="text-lg font-bold text-gray-900 truncate">
              Schema preview{serviceName ? ` — ${serviceName}` : ''}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              This is the schema.org markup your website should include to make this service visible to AI assistants.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close schema preview"
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 sm:p-5 bg-gray-900">
          <pre className="text-xs text-gray-100 font-mono whitespace-pre-wrap break-words">
            {pretty}
          </pre>
        </div>

        <div className="p-3 sm:p-4 border-t border-gray-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            {copied ? 'Copied ✓' : 'Copy to clipboard'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
