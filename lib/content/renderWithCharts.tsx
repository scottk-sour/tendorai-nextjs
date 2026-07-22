/**
 * Render an article body that may contain `<!--CHART:N-->` markers,
 * interleaving raw-HTML segments (fed through the article route's own
 * parseMarkdown) with the appropriate client-side chart component.
 *
 * Chart markers currently resolve only to SolicitorsJuly2026Charts. Add
 * new report components below and extend the switch when future
 * research posts need charts. Bodies with no markers are rendered as a
 * single dangerouslySetInnerHTML block, so the branch is inert for
 * every other article.
 */

import type { ReactNode } from 'react';
import SolicitorsJuly2026Charts from '@/app/components/reports/SolicitorsJuly2026Charts';

const CHART_MARKER_RE = /<!--CHART:(\d+)-->/g;

function renderChart(index: number, key: string): ReactNode {
  if (index === 1 || index === 2 || index === 3) {
    return <SolicitorsJuly2026Charts key={key} index={index} />;
  }
  return null;
}

export function renderArticleBodyWithCharts(
  content: string,
  parseMarkdown: (source: string) => string,
  proseClassName: string,
): ReactNode {
  // Fast path: no markers → single HTML block (byte-identical to the
  // pre-existing render for every other article).
  if (!CHART_MARKER_RE.test(content)) {
    CHART_MARKER_RE.lastIndex = 0;
    return (
      <div
        className={proseClassName}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      />
    );
  }
  CHART_MARKER_RE.lastIndex = 0;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = CHART_MARKER_RE.exec(content)) !== null) {
    const before = content.slice(lastIndex, match.index).trim();
    if (before) {
      parts.push(
        <div
          key={`md-${key++}`}
          className={proseClassName}
          dangerouslySetInnerHTML={{ __html: parseMarkdown(before) }}
        />,
      );
    }
    const chart = renderChart(parseInt(match[1], 10), `chart-${key++}`);
    if (chart) parts.push(chart);
    lastIndex = match.index + match[0].length;
  }

  const tail = content.slice(lastIndex).trim();
  if (tail) {
    parts.push(
      <div
        key={`md-${key++}`}
        className={proseClassName}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(tail) }}
      />,
    );
  }

  return <>{parts}</>;
}
