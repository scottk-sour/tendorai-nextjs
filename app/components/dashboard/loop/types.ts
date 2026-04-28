import type { AgentRun, Approval } from '@/lib/loop/types';

/**
 * Shared shape passed from the dashboard page down to each Loop card.
 * Cards filter `agentRuns` and `pendingApprovals` themselves to find the
 * data relevant to them — keeps the page-level wiring simple.
 */
export interface LoopCardProps {
  vendorId: string;
  vendorTier: string;
  weekStarting: Date;
  agentRuns: AgentRun[];
  pendingApprovals: Approval[];
  /**
   * Latest aeo-score response (data field) — used as a free-tier fallback when
   * the vendor has no reconnaissance run yet.
   */
  existingScoreData?: { score?: number; reportId?: string } | null;
  /**
   * Latest aeo-audit response (data field) — used as a free-tier fallback so
   * we can show real "gaps" for free users from their last audit.
   */
  existingAuditData?:
    | {
        checks?: Array<{
          name: string;
          key: string;
          score: number;
          maxScore: number;
          passed: boolean;
          details: string;
          recommendation: string;
        }>;
      }
    | null;
  /** Per-card error message if its source endpoint failed at the page level. */
  errorMessage?: string | null;
  /** Specific source errors so each card can degrade only the affected metric. */
  agentRunsError?: string | null;
  approvalsError?: string | null;
  /** Force a per-card retry (re-runs the page-level fetch). */
  onRetry?: () => void;
}

export const PRO_TIER_KEYS = ['pro', 'managed', 'verified'] as const;

export function isProTier(tier: string | undefined | null): boolean {
  if (!tier) return false;
  return (PRO_TIER_KEYS as readonly string[]).includes(tier.toLowerCase());
}
