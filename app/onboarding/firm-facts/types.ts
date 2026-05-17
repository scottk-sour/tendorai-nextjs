export type VendorType =
  | 'solicitor'
  | 'accountant'
  | 'mortgage-advisor'
  | 'estate-agent';

// ─── Stage 1 (identity) ───────────────────────────────────────────────
export type Stage1Field =
  | 'firmName'
  | 'city'
  | 'vendorType'
  | 'primarySpecialism'
  | 'yearEstablished'
  | 'regulatoryNumber'
  | 'transactionCountLastYear'
  | 'typicalAllInCost';

export const STAGE_1_FIELDS: Stage1Field[] = [
  'firmName',
  'city',
  'vendorType',
  'primarySpecialism',
  'yearEstablished',
  'regulatoryNumber',
  'transactionCountLastYear',
  'typicalAllInCost',
];

// ─── Stage 2 (operational + brand essentials) ─────────────────────────
export type Stage2Field =
  | 'averageCompletionTimeWeeks'
  | 'formalComplaintsThisYear'
  | 'complaintResolutionDays'
  | 'averageDisbursements'
  | 'fixedFeeSavingVsHourly'
  | 'specialismCaseCount'
  | 'teamCombinedYears'
  | 'totalSolicitorCount'
  | 'toneOfVoice'
  | 'clientTypes'
  | 'brandKeywords'
  | 'uniqueSellingPoints';

export const STAGE_2_FIELDS: Stage2Field[] = [
  'averageCompletionTimeWeeks',
  'formalComplaintsThisYear',
  'complaintResolutionDays',
  'averageDisbursements',
  'fixedFeeSavingVsHourly',
  'specialismCaseCount',
  'teamCombinedYears',
  'totalSolicitorCount',
  'toneOfVoice',
  'clientTypes',
  'brandKeywords',
  'uniqueSellingPoints',
];

export type FirmFactsField = Stage1Field | Stage2Field;

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export type ToneOfVoice = 'formal' | 'approachable' | 'plain-english' | 'expert';

export interface FirmFactsIdentity {
  firmName?: string;
  city?: string;
  vendorType?: VendorType | '';
  primarySpecialism?: string;
  yearEstablished?: number;
  regulatoryNumber?: string;
  transactionCountLastYear?: number;
  typicalAllInCost?: string;
}

export interface FirmFactsOperational {
  averageCompletionTimeWeeks?: number;
  formalComplaintsThisYear?: number;
  complaintResolutionDays?: number;
  averageDisbursements?: string;
  fixedFeeSavingVsHourly?: string;
  specialismCaseCount?: number;
  teamCombinedYears?: number;
  totalSolicitorCount?: number;
  // Defined for completeness — not collected in the Stage 2 form.
  specialistSolicitorCount?: number;
  feeEarnerCount?: number;
}

export interface FirmFactsBrandIdentity {
  clientTypes?: string[];
  toneOfVoice?: string;
  brandKeywords?: string[];
  uniqueSellingPoints?: string[];
  // Stage 3 (deferred to Block 3).
  competitors?: string[];
}

// Flat shape — the firmFacts API exposes every field at the top level.
export type FirmFacts = FirmFactsIdentity &
  FirmFactsOperational &
  FirmFactsBrandIdentity;

export interface CompletionState {
  percentage: number;
  stage1Complete: boolean;
  stage2Complete: boolean;
  missingFields: string[];
}
