/**
 * Render an article body that may contain marker tokens, interleaving
 * raw-HTML segments (fed through the article route's own parseMarkdown)
 * with the appropriate client-side component for each marker.
 *
 * Markers currently supported:
 *   <!--CHART:N-->      N=1|2|3 → SolicitorsJuly2026Charts
 *   <!--CHART-AUG:N-->  N=1|2|3 → SolicitorsAugust2026Charts (server-
 *                       rendered inline SVG, so its figures are present
 *                       in the HTML source)
 *   <!--CITATIONS-->    → CitationBlocks (three copyable citation formats
 *                       for the July 2026 solicitors report)
 *
 * Add new report components below and extend the switch when future
 * research posts need embedded interactivity. Bodies with no markers
 * are rendered as a single dangerouslySetInnerHTML block, so the
 * branch is inert for every other article.
 */

import type { ReactNode } from 'react';
import SolicitorsJuly2026Charts from '@/app/components/reports/SolicitorsJuly2026Charts';
import SolicitorsAugust2026Charts from '@/app/components/reports/SolicitorsAugust2026Charts';
import CitationBlocks from '@/app/components/reports/CitationBlocks';

// One combined regex matching every marker style. Capture group 1 is the
// August chart index, group 2 the July chart index, group 3 the literal
// 'CITATIONS' text. CHART-AUG is listed first so it wins the alternation;
// CHART: cannot match it anyway, since it requires a colon after CHART.
const MARKER_RE = /<!--(?:CHART-AUG:(\d+)|CHART:(\d+)|(CITATIONS))-->/g;

function chartIndexOf(raw: string): 1 | 2 | 3 | null {
  const n = parseInt(raw, 10);
  return n === 1 || n === 2 || n === 3 ? n : null;
}

function renderMarker(
  augChartIndex: string | undefined,
  chartIndex: string | undefined,
  citationsToken: string | undefined,
  key: string,
): ReactNode {
  if (citationsToken) return <CitationBlocks key={key} />;
  if (augChartIndex) {
    const n = chartIndexOf(augChartIndex);
    if (n) return <SolicitorsAugust2026Charts key={key} index={n} />;
  }
  if (chartIndex) {
    const n = chartIndexOf(chartIndex);
    if (n) return <SolicitorsJuly2026Charts key={key} index={n} />;
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
  if (!MARKER_RE.test(content)) {
    MARKER_RE.lastIndex = 0;
    return (
      <div
        className={proseClassName}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      />
    );
  }
  MARKER_RE.lastIndex = 0;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = MARKER_RE.exec(content)) !== null) {
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
    const node = renderMarker(match[1], match[2], match[3], `marker-${key++}`);
    if (node) parts.push(node);
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
