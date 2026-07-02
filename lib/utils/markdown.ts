// Strip markdown syntax to plain text for excerpts, meta descriptions, and
// JSON-LD articleBody previews. NOT for rendering markdown on-screen — use
// ReactMarkdown for that.
//
// Handles: fenced code, images, links, ATX headings (# … ######), unordered
// bullets (-, *, +), ordered lists (1.), blockquotes, bold (** / __),
// italic (* / _), inline code, horizontal rules. Collapses whitespace so
// truncated snippets don't leak newline gaps.
export function stripMarkdown(md: string | null | undefined): string {
  if (!md) return '';
  return md
    // fenced code blocks — drop entirely
    .replace(/```[\s\S]*?```/g, ' ')
    // images -> alt text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    // links -> visible text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // ATX headings — drop the leading marker
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    // unordered bullets at line start
    .replace(/^\s*[-*+]\s+/gm, '')
    // ordered list markers at line start
    .replace(/^\s*\d+\.\s+/gm, '')
    // blockquote markers
    .replace(/^\s*>+\s?/gm, '')
    // bold
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // italic
    .replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1$2')
    .replace(/(^|[^_])_([^_]+)_(?!_)/g, '$1$2')
    // inline code
    .replace(/`([^`]+)`/g, '$1')
    // horizontal rules
    .replace(/^\s*[-*_]{3,}\s*$/gm, ' ')
    // collapse any run of whitespace/newlines to a single space
    .replace(/\s+/g, ' ')
    .trim();
}

// Take a plain-text preview of a markdown body: strip first, then truncate.
// Adds an ellipsis if the original exceeded the limit.
export function markdownExcerpt(md: string | null | undefined, limit = 160): string {
  const plain = stripMarkdown(md);
  if (plain.length <= limit) return plain;
  return plain.slice(0, limit).replace(/\s+\S*$/, '') + '…';
}
