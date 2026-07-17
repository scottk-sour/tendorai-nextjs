'use client';

import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import {
  markPlaceholdersForHighlight,
  isPlaceholderMark,
  extractPlaceholderLabel,
} from '@/lib/loop/placeholders';

/**
 * ReactMarkdown wrapper that highlights unresolved placeholder tokens
 * (see lib/loop/placeholders.ts) with an amber pill so they stand out
 * from body prose. Any real inline-code span (a genuine `code` block in
 * the source) passes through unchanged.
 *
 * Used everywhere a draft body is rendered read-only: admin approval
 * detail, vendor approval detail, and the vendor approvals list preview.
 * The vendor placeholder editor renders its own live preview and can
 * either use this component or its private highlighter — both apply the
 * same sentinel scheme.
 */

const highlightComponents: Components = {
  code({ children, className, ...rest }) {
    const text = Array.isArray(children) ? children.join('') : String(children ?? '');
    if (isPlaceholderMark(text)) {
      return (
        <mark className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-sm font-semibold">
          {extractPlaceholderLabel(text)} — needed
        </mark>
      );
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
};

interface Props {
  children: string;
}

export default function HighlightedMarkdown({ children }: Props) {
  const processed = markPlaceholdersForHighlight(children);
  return (
    <ReactMarkdown components={highlightComponents}>{processed}</ReactMarkdown>
  );
}
