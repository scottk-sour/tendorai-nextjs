'use client';

import {
  type CitationsBlock,
  ENGINE_ORDER,
  ENGINE_LABELS,
  displayPlatform,
  formatLongDate,
} from './types';

interface Props {
  citations: CitationsBlock | undefined;
}

interface CapturedItem {
  platform: string;
  query: string;
  position?: string;
  snippet?: string | null;
  capturedAt: string;
}

function PlatformPill({ platform }: { platform: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
      {displayPlatform(platform)}
    </span>
  );
}

function CitationCard({ item }: { item: CapturedItem }) {
  const hasSnippet =
    typeof item.snippet === 'string' && item.snippet.trim().length > 0;
  return (
    <article className="card p-5 md:p-6 flex flex-col gap-3 h-full">
      <PlatformPill platform={item.platform} />

      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--text3)] mb-1">
          When users asked
        </p>
        <p
          className="text-base italic text-[var(--text2)] leading-snug"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          &ldquo;{item.query}&rdquo;
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--text3)] mb-1">
          {displayPlatform(item.platform)} responded
        </p>
        {hasSnippet ? (
          <p className="text-base text-[var(--text)] leading-relaxed">
            &ldquo;{item.snippet}&rdquo;
          </p>
        ) : item.position ? (
          <p className="text-sm text-[var(--text2)]">
            Position: <span className="font-medium text-[var(--text)]">{item.position}</span>
          </p>
        ) : (
          <p className="text-sm text-[var(--text3)] italic">
            Snippet not captured by this platform.
          </p>
        )}
      </div>

      <p className="mt-auto text-xs text-[var(--text3)]">
        Captured {formatLongDate(item.capturedAt)}
      </p>
    </article>
  );
}

export default function CitationsGallerySection({ citations }: Props) {
  const total = typeof citations?.total === 'number' ? citations.total : 0;
  const captured: CapturedItem[] = Array.isArray(citations?.captured)
    ? (citations!.captured as CapturedItem[]).filter(
        (c) =>
          c &&
          typeof c.platform === 'string' &&
          typeof c.query === 'string' &&
          typeof c.capturedAt === 'string',
      )
    : [];

  // Per-engine target counts surfaced in the empty state — sells the
  // monitoring work even when no citations were captured.
  const targetRows = ENGINE_ORDER.map((engine) => ({
    engine,
    label: ENGINE_LABELS[engine],
    target: citations?.byPlatform?.[engine]?.target ?? 0,
  })).filter((r) => r.target > 0);

  const totalQueries = targetRows.reduce((sum, r) => sum + r.target, 0);

  return (
    <section
      aria-labelledby="citations-section-heading"
      className="mt-10 md:mt-14"
    >
      <h2
        id="citations-section-heading"
        className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-2"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Where AI cited you this week
      </h2>
      {total > 0 && (
        <p className="text-sm text-[var(--text2)] mb-5">
          {total} citation{total === 1 ? '' : 's'} captured across AI platforms
        </p>
      )}

      {/* Populated state — show captured citations as gallery cards */}
      {captured.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {captured.map((item, i) => (
            <CitationCard key={`${item.platform}-${item.capturedAt}-${i}`} item={item} />
          ))}
        </div>
      ) : (
        // Empty state — frame the target universe so the work feels real
        <div className="card p-6 md:p-8">
          <p className="text-base text-[var(--text2)] leading-relaxed max-w-2xl">
            AI visibility is built one citation at a time. We&apos;re tracking{' '}
            <span className="font-semibold text-[var(--text)]">{totalQueries}</span>{' '}
            quer{totalQueries === 1 ? 'y' : 'ies'} across{' '}
            <span className="font-semibold text-[var(--text)]">{targetRows.length}</span>{' '}
            platform{targetRows.length === 1 ? '' : 's'}.{' '}
            {total === 0
              ? 'None resulted in a citation this week — that’s normal early in the journey, especially for newer firms or specialised queries.'
              : 'Citation snippets aren’t yet captured for this week — counts above are accurate.'}
          </p>

          {targetRows.length > 0 && (
            <ul className="mt-5 space-y-1.5 text-sm">
              {targetRows.map((r) => (
                <li
                  key={r.engine}
                  className="flex items-baseline gap-2 text-[var(--text2)]"
                >
                  <span className="font-medium text-[var(--text)] min-w-[5rem]">
                    {r.label}
                  </span>
                  <span className="text-[var(--text3)]">—</span>
                  <span>
                    {r.target} quer{r.target === 1 ? 'y' : 'ies'} tracked
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
