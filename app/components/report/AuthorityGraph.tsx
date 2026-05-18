'use client';

import SectionShell from './SectionShell';
import type { AuthorityGraph as AuthorityGraphData } from './types';

function StatusChip({ label, connected }: { label: string; connected: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        connected
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-500'
      }`}
    >
      <span
        aria-hidden
        className={`w-2 h-2 rounded-full ${
          connected ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
      {label}
    </span>
  );
}

function NodeGroup({
  title,
  connected,
  missing,
}: {
  title: string;
  connected?: string[];
  missing?: string[];
}) {
  const con = connected ?? [];
  const miss = missing ?? [];
  if (con.length === 0 && miss.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)] mb-2">
        {title}{' '}
        <span className="text-[var(--text3)] font-normal normal-case">
          ({con.length} connected, {miss.length} missing)
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {con.map((d) => (
          <StatusChip key={`c-${d}`} label={d} connected />
        ))}
        {miss.map((d) => (
          <StatusChip key={`m-${d}`} label={d} connected={false} />
        ))}
      </div>
    </div>
  );
}

export default function AuthorityGraph({ data }: { data?: AuthorityGraphData }) {
  const schema = data?.schemaCoverage;
  const schemaPct =
    schema && typeof schema.connected === 'number' && schema.total
      ? Math.round((schema.connected / schema.total) * 100)
      : null;

  return (
    <SectionShell
      index={7}
      title="Authority Graph"
      subtitle="Where AI engines look for proof your firm exists — and the gaps."
    >
      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="rounded-lg border border-[var(--border)] bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)]">
            Authority score
          </p>
          <p className="text-2xl font-bold text-[var(--text)] tabular-nums mt-1">
            {typeof data?.authorityScore === 'number'
              ? data.authorityScore
              : '—'}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)]">
            Schema coverage
          </p>
          <p className="text-2xl font-bold text-[var(--text)] tabular-nums mt-1">
            {schema && typeof schema.connected === 'number'
              ? `${schema.connected}/${schema.total ?? '—'}`
              : '—'}
            {schemaPct !== null && (
              <span className="text-sm text-[var(--text3)] ml-1">
                ({schemaPct}%)
              </span>
            )}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text3)]">
            Content footprint
          </p>
          <p className="text-2xl font-bold text-[var(--text)] tabular-nums mt-1">
            {typeof data?.contentFootprintPages === 'number'
              ? `${data.contentFootprintPages} pages`
              : '—'}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <NodeGroup
          title="Directories"
          connected={data?.directoriesConnected}
          missing={data?.directoriesMissing}
        />
        <NodeGroup
          title="Review platforms"
          connected={data?.reviewPlatformsConnected}
          missing={data?.reviewPlatformsMissing}
        />
      </div>
    </SectionShell>
  );
}
