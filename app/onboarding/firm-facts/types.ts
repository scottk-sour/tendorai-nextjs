export type VendorType =
  | 'solicitor'
  | 'accountant'
  | 'mortgage-advisor'
  | 'estate-agent';

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

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

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

export interface FirmFactsBrandIdentity {
  uniqueSellingPoints?: string[];
  toneOfVoice?: string;
  brandKeywords?: string[];
  competitors?: string[];
}

export interface FirmFactsOperational {
  feeEarnerCount?: number;
  averageCompletionTimeWeeks?: number;
  formalComplaintsThisYear?: number;
  complaintResolutionDays?: number;
  averageDisbursements?: string;
  fixedFeeSavingVsHourly?: string;
  specialismCaseCount?: number;
  teamCombinedYears?: number;
}

export type FirmFacts = FirmFactsIdentity & {
  brandIdentity?: FirmFactsBrandIdentity;
  operational?: FirmFactsOperational;
};

export interface CompletionState {
  percentage: number;
  stage1Complete: boolean;
  missingFields: string[];
}
