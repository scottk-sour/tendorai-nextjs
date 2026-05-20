/**
 * Canonical types for the Pro Loop. Field names match the backend AgentRun
 * and ApprovalQueue Mongoose models exactly — see the AGENT ARTIFACT SHAPES
 * section of the build brief for what lives inside `artifacts` per agent.
 */

export type AgentName =
  | 'reconnaissance'
  | 'detective'
  | 'writer'
  | 'listings'
  | 'reviews'
  | 'builder'
  | 'reporter';

export type AgentRunStatus = 'pending' | 'running' | 'completed' | 'failed' | 'partial';

export interface AgentRun {
  _id: string;
  vendorId: string;
  agentName: AgentName;
  weekStarting: string;
  status: AgentRunStatus;
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
  summary?: string;
  artifacts?: Record<string, unknown>;
  metricsBefore?: Record<string, number>;
  metricsAfter?: Record<string, number>;
  failureReason?: string;
  relatedApprovalIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ApprovalItemType =
  | 'schema_change'
  | 'content_draft'
  | 'directory_submission'
  | 'review_request_batch'
  | 'press_release'
  | 'outreach_pitch'
  | 'other';

export type ApprovalStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'executed'
  | 'failed'
  | 'firm_completed';

export interface Approval {
  _id: string;
  vendorId: string;
  agentName: string;
  itemType: ApprovalItemType;
  title: string;
  status: ApprovalStatus;
  draftPayload?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  createdAt: string;
  decidedAt?: string;
  decisionReason?: string;
  executedAt?: string;
  source?: string;
}

export type LoopStatus = 'green' | 'amber' | 'red' | 'gray';

export const ITEM_TYPE_LABELS: Record<ApprovalItemType, string> = {
  schema_change: 'Schema change',
  content_draft: 'Content draft',
  directory_submission: 'Directory submission',
  review_request_batch: 'Review request batch',
  press_release: 'Press release',
  outreach_pitch: 'Outreach pitch',
  other: 'Other',
};

export const ITEM_TYPE_DESCRIPTIONS: Record<ApprovalItemType, string> = {
  schema_change: 'A change to the structured data on your website that helps AI assistants understand your firm.',
  content_draft: 'A draft article or page written for your website by one of our agents.',
  directory_submission: 'A submission to a third-party directory or listing service on your behalf.',
  review_request_batch: 'A batch of review request emails ready to send to your clients.',
  press_release: 'A draft press release written for distribution to trade press and AI training sources.',
  outreach_pitch: 'An outreach pitch to a journalist, publication, or partner site.',
  other: 'A miscellaneous item drafted by one of our agents.',
};
