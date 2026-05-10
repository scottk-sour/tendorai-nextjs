'use client';

import {
  type CitationsBlock,
  type CompetitorMove,
  ENGINE_ORDER,
  displayPlatform,
  formatLongDate,
} from './types';

interface Props {
  competitorMoves: CompetitorMove[] | undefined | null;
  // Same byPlatform block Section 5 consumes — used to frame the monitoring
  // universe in the empty state. Passing it in (rather than recomputing)
  // keeps the two sections phrased consistently.
  citations: CitationsBlock | undefined;
}

const MAX_VISIBLE = 10;

function PlatformPill({ platform }: { platform: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
      {displayPlatform(platform)}
    </span>
  );
}

function MoveCard({ move }: { move: CompetitorMove }) {
  return (
    <article className="card p-5 md:p-6 flex flex-col gap-3">
      <PlatformPill platform={move.platform} />

      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--text3)] mb-1">
          When users asked
        </p>
        <p
          className="text-base italic text-[var(--text2)] leading-snug"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          &ldquo;{move.query}&rdquo;
        </p>
      </div>

      <div className="flex flex-col gap-1.5 text-sm">
        <p className="flex items-center gap-2 text-[var(--text)]">
          <span className="text-green-600 font-semibold">✓</span>
          <span>
            <span className="font-semibold">{move.competitor}</span> appeared
          </span>
        </p>
        <p className="flex items-center gap-2 text-red-700">
          <span className="font-semibold">✗</span>
          <span>You did not appear</span>
        </p>
      </div>

      <p className="mt-1 text-xs text-[var(--text3)]">
        Captured {formatLongDate(move.capturedAt)}
      </p>
    </article>
  );
}

export default function CompetitorMovesSection({
  competitorMoves,
  citations,
}: Props) {
  const moves: CompetitorMove[] = Array.isArray(competitorMoves)
    ? competitorMoves.filter(
        (m) =>
          m &&
          typeof m.platform === 'string' &&
          typeof m.query === 'string' &&
          typeof m.competitor === 'string' &&
          m.competitor.trim().length > 0 &&
          typeof m.capturedAt === 'string',
      )
    : [];

  const visible = moves.slice(0, MAX_VISIBLE);
  const remaining = moves.length - visible.length;

  // Monitoring framing for the empty state. Mirrors Section 5's totals so
  // the two read as a single narrative.
  const targetRows = ENGINE_ORDER.map((engine) => ({
    engine,
    target: citations?.byPlatform?.[engine]?.target ?? 0,
  })).filter((r) => r.target > 0);
  const totalQueries = targetRows.reduce((sum, r) => sum + r.target, 0);

  const subhead =
    moves.length > 0
      ? `${moves.length} time${
          moves.length === 1 ? '' : 's'
        } a competitor appeared in queries where you didn’t`
      : 'No competitor activity detected in queries we tracked';

  return (
    <section
      aria-labelledby="competitor-section-heading"
      className="mt-10 md:mt-14"
    >
      <h2
        id="competitor-section-heading"
        className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-2"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        What competitors did this week
      </h2>
      <p className="text-sm text-[var(--text2)] mb-5">{subhead}</p>

      {moves.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visible.map((move, i) => (
              <MoveCard
                key={`${move.platform}-${move.capturedAt}-${i}`}
                move={move}
              />
            ))}
          </div>
          {remaining > 0 && (
            <p className="mt-3 text-sm text-[var(--text3)]">
              + {remaining} additional move{remaining === 1 ? '' : 's'}{' '}
              available in your full diagnosis.
            </p>
          )}
        </>
      ) : (
        <div className="card p-6 md:p-8">
          <p className="text-base text-[var(--text2)] leading-relaxed max-w-2xl">
            We&apos;re monitoring{' '}
            <span className="font-semibold text-[var(--text)]">{totalQueries}</span>{' '}
            quer{totalQueries === 1 ? 'y' : 'ies'} across{' '}
            <span className="font-semibold text-[var(--text)]">{targetRows.length}</span>{' '}
            platform{targetRows.length === 1 ? '' : 's'} — when competitors
            appear in any of them, you&apos;ll see them surfaced here.
          </p>
        </div>
      )}
    </section>
  );
}
