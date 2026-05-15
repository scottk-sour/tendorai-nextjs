'use client';

import { useEffect, useRef } from 'react';
import { TextField } from './fields/TextField';
import { NumericField } from './fields/NumericField';
import { MoneyField } from './fields/MoneyField';
import { DropdownField } from './fields/DropdownField';
import type {
  FirmFacts,
  SaveState,
  Stage1Field,
  VendorType,
} from '../types';
import { STAGE_1_FIELDS } from '../types';

const VENDOR_TYPE_OPTIONS = [
  { value: 'solicitor', label: 'Solicitor' },
  { value: 'accountant', label: 'Accountant' },
  { value: 'mortgage-advisor', label: 'Mortgage adviser' },
  { value: 'estate-agent', label: 'Estate agent' },
];

const REGULATOR_BY_VENDOR_TYPE: Record<VendorType, { label: string; helper: string }> = {
  solicitor: {
    label: 'SRA number',
    helper: 'Your Solicitors Regulation Authority firm number.',
  },
  accountant: {
    label: 'ICAEW / ACCA number',
    helper: 'Your ICAEW or ACCA firm registration number.',
  },
  'mortgage-advisor': {
    label: 'FCA number',
    helper: 'Your Financial Conduct Authority firm reference number.',
  },
  'estate-agent': {
    label: 'Propertymark number',
    helper: 'Your Propertymark (NAEA / ARLA) firm registration number.',
  },
};

const SPECIALISM_HINT_BY_VENDOR_TYPE: Record<VendorType, string> = {
  solicitor: 'e.g. Conveyancing, Family Law, Wills & Probate.',
  accountant: 'e.g. Tax, Bookkeeping, R&D Tax Credits.',
  'mortgage-advisor': 'e.g. First-time buyer, Buy-to-let, Remortgage.',
  'estate-agent': 'e.g. Residential sales, Lettings, Block management.',
};

function isStage1Complete(facts: FirmFacts | null): boolean {
  if (!facts) return false;
  return STAGE_1_FIELDS.every((field) => {
    const v = (facts as Record<string, unknown>)[field];
    if (typeof v === 'number') return v > 0;
    if (typeof v === 'string') return v.trim().length > 0;
    return Boolean(v);
  });
}

interface Stage1FormProps {
  firmFacts: FirmFacts | null;
  loading: boolean;
  error: string | null;
  saveStates: Partial<Record<Stage1Field, SaveState>>;
  backendStage1Complete: boolean;
  updateField: (field: Stage1Field, value: unknown) => void;
  onStageComplete: () => void;
}

export function Stage1Form({
  firmFacts,
  loading,
  error,
  saveStates,
  backendStage1Complete,
  updateField,
  onStageComplete,
}: Stage1FormProps) {
  const lastCompleteRef = useRef(false);
  const stage1Done = backendStage1Complete || isStage1Complete(firmFacts);

  useEffect(() => {
    if (stage1Done && !lastCompleteRef.current) {
      lastCompleteRef.current = true;
      onStageComplete();
    }
    if (!stage1Done) {
      lastCompleteRef.current = false;
    }
  }, [stage1Done, onStageComplete]);

  if (loading) {
    return (
      <div className="text-sm text-gray-600">Loading your firm facts…</div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  const facts = firmFacts || {};
  const vendorType = (facts.vendorType || '') as VendorType | '';
  const regulator =
    vendorType && REGULATOR_BY_VENDOR_TYPE[vendorType as VendorType];
  const specialismHint =
    vendorType && SPECIALISM_HINT_BY_VENDOR_TYPE[vendorType as VendorType];

  const get = (field: Stage1Field): SaveState | undefined => saveStates[field];

  return (
    <div className="space-y-6">
      <TextField
        id="firmName"
        label="Firm name"
        helperText="Confirm the name we should use for your firm across the platform."
        required
        value={(facts.firmName as string) || ''}
        onChange={(v) => updateField('firmName', v)}
        saveState={get('firmName')}
      />

      <TextField
        id="city"
        label="City"
        helperText="The primary city your firm operates from."
        required
        value={(facts.city as string) || ''}
        onChange={(v) => updateField('city', v)}
        saveState={get('city')}
      />

      <DropdownField
        id="vendorType"
        label="Vendor type"
        helperText="Which regulated profession does your firm sit in?"
        required
        value={vendorType}
        onChange={(v) => updateField('vendorType', v)}
        options={VENDOR_TYPE_OPTIONS}
        saveState={get('vendorType')}
      />

      <TextField
        id="primarySpecialism"
        label="Primary specialism"
        helperText={specialismHint || 'Select a vendor type first.'}
        required
        value={(facts.primarySpecialism as string) || ''}
        onChange={(v) => updateField('primarySpecialism', v)}
        saveState={get('primarySpecialism')}
        placeholder={specialismHint ? specialismHint.replace(/^e\.g\. /, '') : ''}
      />

      <NumericField
        id="yearEstablished"
        label="Year established"
        helperText="The year your firm was founded."
        required
        min={1700}
        max={new Date().getFullYear()}
        value={facts.yearEstablished as number | undefined}
        onChange={(v) => updateField('yearEstablished', v)}
        saveState={get('yearEstablished')}
        placeholder="e.g. 1998"
      />

      <TextField
        id="regulatoryNumber"
        label={regulator ? regulator.label : 'Regulatory number'}
        helperText={
          regulator
            ? regulator.helper
            : 'Select a vendor type to see which regulator applies.'
        }
        required
        value={(facts.regulatoryNumber as string) || ''}
        onChange={(v) => updateField('regulatoryNumber', v)}
        saveState={get('regulatoryNumber')}
      />

      <NumericField
        id="transactionCountLastYear"
        label="Transactions last year"
        helperText="How many client transactions, cases, or files did you complete last year?"
        required
        min={0}
        value={facts.transactionCountLastYear as number | undefined}
        onChange={(v) => updateField('transactionCountLastYear', v)}
        saveState={get('transactionCountLastYear')}
        placeholder="e.g. 247"
      />

      <MoneyField
        id="typicalAllInCost"
        label="Typical all-in cost"
        helperText="Your typical fee range for a standard client engagement (£GBP)."
        required
        value={(facts.typicalAllInCost as string) || ''}
        onChange={(v) => updateField('typicalAllInCost', v)}
        saveState={get('typicalAllInCost')}
      />

      <div
        className={`rounded-md border p-4 text-sm ${
          stage1Done
            ? 'border-green-200 bg-green-50 text-green-800'
            : 'border-gray-200 bg-gray-50 text-gray-600'
        }`}
      >
        {stage1Done
          ? 'Stage 1 complete ✓ — your articles will now use your real numbers.'
          : 'Fill all 8 fields above to complete Stage 1. Each field saves automatically when you tab away.'}
      </div>
    </div>
  );
}
