'use client';

import { useMemo } from 'react';
import Loop from '@/app/components/dashboard/loop/Loop';
import type { AgentRun } from '@/lib/loop/types';
import type { WeeklyReportDigest } from './types';

interface LoopSectionProps {
  digest: WeeklyReportDigest;
  vendorId: string;
}

interface SynthesisedDeployedItem {
  title: string;
  type?: string;
  url?: string;
}

/**
 * Section 3 — Loop pinned to a historical week.
 *
 * The live dashboard's Loop reads a fat AgentRun[] queried from the backend.
 * The weekly snapshot stores a thinner `digest.agentActivity` block. To avoid
 * forking the card components, this wrapper synthesises pseudo-AgentRuns from
 * the snapshot so the existing cards render unchanged in `mode="historical"`.
 *
 * The synthesis is read-only and per-render; nothing is persisted. Field
 * mappings follow the Session 3 build brief (Decision 2).
 */
export default function LoopSection({ digest, vendorId }: LoopSectionProps) {
  const agentRuns = useMemo<AgentRun[]>(
    () => synthesisePseudoAgentRuns(digest, vendorId),
    [digest, vendorId],
  );

  // Loop's existing prop type uses Date — convert from the ISO string the
  // snapshot stores. UTC midnight is fine: the Loop only uses this for the
  // historical loop-back marker copy (formatted via formatLongDate).
  const weekStartingDate = useMemo(() => {
    const d = new Date(digest.weekStarting);
    return Number.isNaN(d.getTime()) ? new Date() : d;
  }, [digest.weekStarting]);

  return (
    <section aria-labelledby="loop-section-heading" className="mt-10 md:mt-14">
      <h2
        id="loop-section-heading"
        className="text-xl md:text-2xl font-bold text-[var(--text)] mb-4"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        The loop, this week
      </h2>
      <Loop
        vendorId={vendorId}
        vendorTier="pro"
        weekStarting={weekStartingDate}
        agentRuns={agentRuns}
        pendingApprovals={[]}
        mode="historical"
      />
    </section>
  );
}

/**
 * Decision 2 mapping — snapshot.agentActivity → AgentRun[]:
 *   reconnaissance.ran        → recon run with artifacts.queriesRun
 *                               + artifacts.platforms (placeholder map sized
 *                               to platformsScanned so Object.keys().length
 *                               matches) + metricsBefore/After.visibilityScore
 *                               derived from digest.score.{current,delta}
 *   detective.ran             → detective run with artifacts.gapsIdentified
 *                               + artifacts.gaps = [topFinding.title?]
 *   writer.ran                → writer run with artifacts.completed =
 *                               draftsProduced, queuedForNextWeek =
 *                               pendingApproval, itemsCompleted from
 *                               draftTitles
 *   listings.ran              → listings run with artifacts.completed = live,
 *                               queuedForNextWeek = pending, itemsCompleted
 *                               from directories with status === 'live'
 *   builder (any non-zero)    → builder run with artifacts.completed =
 *                               schemasLive ?? schemasDeployed
 *
 * Reviews are not surfaced in the Loop cards (the live Loop ignores them
 * too), so no pseudo-run is emitted for activity.reviews.
 */
function synthesisePseudoAgentRuns(
  digest: WeeklyReportDigest,
  vendorId: string,
): AgentRun[] {
  const activity = digest.agentActivity;
  if (!activity) return [];

  const weekStarting = digest.weekStarting;
  const stamp = digest.generatedAt || digest.weekStarting;

  const baseRun = {
    vendorId,
    weekStarting,
    status: 'completed' as const,
    startedAt: stamp,
    completedAt: stamp,
    createdAt: stamp,
    updatedAt: stamp,
  };

  const runs: AgentRun[] = [];

  // ── reconnaissance ──────────────────────────────────────────────────────
  const recon = activity.reconnaissance;
  if (recon?.ran) {
    const queriesRun =
      typeof recon.queriesScanned === 'number' ? recon.queriesScanned : 0;
    const platformsScanned =
      typeof recon.platformsScanned === 'number' ? recon.platformsScanned : 0;

    // MeasureCard reads Object.keys(platforms).length — generate a placeholder
    // map sized to match.
    const platforms: Record<string, unknown> = {};
    for (let i = 0; i < platformsScanned; i++) {
      platforms[`platform_${i}`] = {};
    }

    const scoreCurrent = digest.score?.current;
    const scoreDelta = digest.score?.delta;
    const metricsBefore: Record<string, number> = {};
    const metricsAfter: Record<string, number> = {};
    if (typeof scoreCurrent === 'number') {
      metricsAfter.visibilityScore = scoreCurrent;
      if (typeof scoreDelta === 'number') {
        metricsBefore.visibilityScore = scoreCurrent - scoreDelta;
      }
    }

    runs.push({
      ...baseRun,
      _id: `pseudo-recon-${weekStarting}`,
      agentName: 'reconnaissance',
      artifacts: {
        queriesRun,
        platforms,
      },
      metricsBefore,
      metricsAfter,
    });
  }

  // ── detective ───────────────────────────────────────────────────────────
  const detective = activity.detective;
  if (detective?.ran) {
    const gapsIdentified =
      typeof detective.findingsCount === 'number' ? detective.findingsCount : 0;
    const topTitle = detective.topFinding?.title;
    const gaps: string[] =
      typeof topTitle === 'string' && topTitle.trim() ? [topTitle.trim()] : [];

    runs.push({
      ...baseRun,
      _id: `pseudo-detective-${weekStarting}`,
      agentName: 'detective',
      artifacts: {
        gapsIdentified,
        gaps,
      },
    });
  }

  // ── writer ──────────────────────────────────────────────────────────────
  const writer = activity.writer;
  if (writer?.ran) {
    const completed =
      typeof writer.draftsProduced === 'number' ? writer.draftsProduced : 0;
    const queuedForNextWeek =
      typeof writer.pendingApproval === 'number' ? writer.pendingApproval : 0;
    const draftTitles = Array.isArray(writer.draftTitles) ? writer.draftTitles : [];
    const itemsCompleted: SynthesisedDeployedItem[] = draftTitles
      .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
      .map((title) => ({ title: title.trim(), type: 'content_draft' }));

    runs.push({
      ...baseRun,
      _id: `pseudo-writer-${weekStarting}`,
      agentName: 'writer',
      artifacts: {
        completed,
        queuedForNextWeek,
        itemsCompleted,
      },
    });
  }

  // ── listings ────────────────────────────────────────────────────────────
  const listings = activity.listings;
  if (listings?.ran) {
    const completed = typeof listings.live === 'number' ? listings.live : 0;
    const queuedForNextWeek =
      typeof listings.pending === 'number' ? listings.pending : 0;
    const directories = Array.isArray(listings.directories)
      ? listings.directories
      : [];
    const itemsCompleted: SynthesisedDeployedItem[] = directories
      .filter(
        (d): d is { directory: string; status: string } =>
          !!d &&
          typeof d.directory === 'string' &&
          d.directory.trim().length > 0 &&
          d.status === 'live',
      )
      .map((d) => ({ title: d.directory.trim(), type: 'directory_submission' }));

    runs.push({
      ...baseRun,
      _id: `pseudo-listings-${weekStarting}`,
      agentName: 'listings',
      artifacts: {
        completed,
        queuedForNextWeek,
        itemsCompleted,
      },
    });
  }

  // ── builder ─────────────────────────────────────────────────────────────
  // No `ran` flag on builder — emit a run if either schemas count is present.
  const builder = activity.builder;
  if (builder) {
    const live = typeof builder.schemasLive === 'number' ? builder.schemasLive : null;
    const deployed =
      typeof builder.schemasDeployed === 'number' ? builder.schemasDeployed : null;
    const completed = live ?? deployed;
    if (completed !== null && completed > 0) {
      runs.push({
        ...baseRun,
        _id: `pseudo-builder-${weekStarting}`,
        agentName: 'builder',
        artifacts: {
          completed,
          queuedForNextWeek: 0,
          itemsCompleted: [],
        },
      });
    }
  }

  return runs;
}
