'use client';

import type { AgentActivityBlock } from './types';

interface Props {
  detective: AgentActivityBlock['detective'] | undefined;
  vendorId: string;
}

type Severity = 'high' | 'medium' | 'low' | 'unknown';

function classifySeverity(raw: unknown): Severity {
  if (typeof raw !== 'string') return 'unknown';
  const v = raw.toLowerCase().trim();
  if (v === 'high' || v === 'critical') return 'high';
  if (v === 'medium' || v === 'med' || v === 'warning') return 'medium';
  if (v === 'low' || v === 'info' || v === 'note') return 'low';
  return 'unknown';
}

function formatType(raw: string | null | undefined): string {
  if (!raw) return 'Finding';
  return raw
    .replace(/[_-]+/g, ' ')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}

function SeverityPill({ severity }: { severity: Severity }) {
  if (severity === 'high') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-red-50 text-red-700 border border-red-200">
        High severity
      </span>
    );
  }
  if (severity === 'medium') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200">
        Medium severity
      </span>
    );
  }
  if (severity === 'low') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-gray-50 text-gray-700 border border-gray-200">
        Low severity
      </span>
    );
  }
  return null;
}

function TypePill({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
      {type}
    </span>
  );
}

function SectionHeading() {
  return (
    <h2
      id="detective-section-heading"
      className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-2"
      style={{ fontFamily: 'var(--font-serif)' }}
    >
      What we found this week
    </h2>
  );
}

export default function DetectiveReasoningSection({ detective }: Props) {
  // ── Empty state 1 — detective didn't run ────────────────────────────────
  if (!detective || detective.ran === false) {
    return (
      <section
        aria-labelledby="detective-section-heading"
        className="mt-10 md:mt-14"
      >
        <SectionHeading />
        <div className="card p-8 text-center mt-4">
          <p className="text-[var(--text2)] max-w-xl mx-auto">
            Diagnosis hasn&apos;t run for this week yet. The Detective agent
            runs daily and findings will appear in your next weekly report.
          </p>
        </div>
      </section>
    );
  }

  const findingsCount =
    typeof detective.findingsCount === 'number' ? detective.findingsCount : 0;
  const topFinding = detective.topFinding ?? null;

  // ── Empty state 2 — ran but no findings ─────────────────────────────────
  if (findingsCount === 0 && !topFinding) {
    return (
      <section
        aria-labelledby="detective-section-heading"
        className="mt-10 md:mt-14"
      >
        <SectionHeading />
        <div className="card p-8 text-center mt-4">
          <p className="text-[var(--text2)] max-w-xl mx-auto">
            No diagnosis findings this week — your AI visibility looks healthy
            in the queries we tracked. Explore the full dashboard for deeper
            analysis.
          </p>
        </div>
      </section>
    );
  }

  // ── Populated state ─────────────────────────────────────────────────────
  const severity = classifySeverity(topFinding?.severity);
  const typeLabel = formatType(topFinding?.type);
  const title = typeof topFinding?.title === 'string' ? topFinding.title.trim() : '';
  const detail = typeof topFinding?.detail === 'string' ? topFinding.detail.trim() : '';
  const recommendation =
    typeof topFinding?.recommendation === 'string'
      ? topFinding.recommendation.trim()
      : '';

  const subhead =
    findingsCount === 0
      ? 'no gaps detected by our diagnosis agent'
      : findingsCount === 1
      ? '1 specific gap detected by our diagnosis agent'
      : `${findingsCount} specific gaps detected by our diagnosis agent`;

  const additionalCount = findingsCount > 1 ? findingsCount - 1 : 0;

  return (
    <section
      aria-labelledby="detective-section-heading"
      className="mt-10 md:mt-14"
    >
      <SectionHeading />
      <p className="text-sm text-[var(--text2)] mb-5">{subhead}</p>

      <article className="card p-6 md:p-8">
        {/* Row 1 — severity + type pills */}
        {(severity !== 'unknown' || typeLabel) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <SeverityPill severity={severity} />
            {typeLabel && <TypePill type={typeLabel} />}
          </div>
        )}

        {/* Row 2 — title */}
        {title && (
          <h3
            className="text-xl md:text-2xl font-bold text-[var(--text)] leading-snug mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {title}
          </h3>
        )}

        {/* Row 3 — detail (left-border blockquote). Suppressed when detail
            duplicates title — Detective's first-sentence extraction returns
            the full string for single-sentence findings, which renders as
            visually-duplicated text below the Fraunces title. */}
        {detail && detail !== title && (
          <div className="border-l-4 border-gray-200 pl-4 py-1 mb-5">
            <p className="text-base text-[var(--text2)] leading-relaxed">
              {detail}
            </p>
          </div>
        )}

        {/* Row 4 — recommendation panel */}
        {recommendation && (
          <div
            className="rounded-md border-l-4 p-4"
            style={{
              backgroundColor: 'var(--color-purple-50)',
              borderLeftColor: 'var(--color-purple-600)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-1.5">
              Recommended action
            </p>
            <p className="text-base text-[var(--text)] leading-relaxed">
              {recommendation}
            </p>
          </div>
        )}
      </article>

      {additionalCount > 0 && (
        <p className="mt-3 text-sm text-[var(--text3)]">
          + {additionalCount} additional finding{additionalCount === 1 ? '' : 's'}{' '}
          available in your full diagnosis.
        </p>
      )}
    </section>
  );
}
