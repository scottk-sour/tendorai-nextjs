'use client';

import { useEffect, useRef } from 'react';
import { NumericField } from './fields/NumericField';
import { MoneyField } from './fields/MoneyField';
import { DropdownField } from './fields/DropdownField';
import { CommaListField } from './fields/CommaListField';
import { MultiTextField } from './fields/MultiTextField';
import type { FirmFacts, SaveState, Stage2Field, VendorType } from '../types';

const TONE_OPTIONS = [
  { value: 'formal', label: 'Formal' },
  { value: 'approachable', label: 'Approachable' },
  { value: 'plain-english', label: 'Plain English' },
  { value: 'expert', label: 'Expert' },
];

// vendorTypes that collect a headcount of qualified professionals.
const HEADCOUNT_VENDOR_TYPES: VendorType[] = ['solicitor', 'accountant'];

const HEADCOUNT_LABEL: Record<'solicitor' | 'accountant', string> = {
  solicitor: 'Total solicitor count',
  accountant: 'Total accountant count',
};

function showsHeadcount(vendorType: VendorType | ''): boolean {
  return HEADCOUNT_VENDOR_TYPES.includes(vendorType as VendorType);
}

function isStage2Complete(
  facts: FirmFacts | null,
  vendorType: VendorType | '',
): boolean {
  if (!facts) return false;

  const numeric: Array<keyof FirmFacts> = [
    'averageCompletionTimeWeeks',
    'formalComplaintsThisYear',
    'complaintResolutionDays',
    'specialismCaseCount',
    'teamCombinedYears',
  ];
  // formalComplaintsThisYear can legitimately be 0, so it is checked as "set".
  const numericOk = numeric.every((key) => {
    const v = facts[key];
    if (key === 'formalComplaintsThisYear') {
      return typeof v === 'number';
    }
    return typeof v === 'number' && v > 0;
  });
  if (!numericOk) return false;

  if (showsHeadcount(vendorType)) {
    const headcount = facts.totalSolicitorCount;
    if (typeof headcount !== 'number' || headcount <= 0) return false;
  }

  const moneyOk = ['averageDisbursements', 'fixedFeeSavingVsHourly'].every(
    (key) => {
      const v = (facts as Record<string, unknown>)[key];
      return typeof v === 'string' && v.trim().length > 0;
    },
  );
  if (!moneyOk) return false;

  if (!facts.toneOfVoice || facts.toneOfVoice.trim().length === 0) return false;
  if (!facts.clientTypes || facts.clientTypes.length === 0) return false;
  if (!facts.brandKeywords || facts.brandKeywords.length === 0) return false;
  if (
    !facts.uniqueSellingPoints ||
    facts.uniqueSellingPoints.filter((s) => s.trim().length > 0).length === 0
  ) {
    return false;
  }

  return true;
}

interface Stage2FormProps {
  firmFacts: FirmFacts | null;
  loading: boolean;
  error: string | null;
  saveStates: Partial<Record<Stage2Field, SaveState>>;
  backendStage2Complete: boolean;
  updateField: (field: Stage2Field, value: unknown) => void;
  onStageComplete: () => void;
}

export function Stage2Form({
  firmFacts,
  loading,
  error,
  saveStates,
  backendStage2Complete,
  updateField,
  onStageComplete,
}: Stage2FormProps) {
  const lastCompleteRef = useRef(false);
  const facts = firmFacts || {};
  const vendorType = (facts.vendorType || '') as VendorType | '';
  const stage2Done =
    backendStage2Complete || isStage2Complete(firmFacts, vendorType);

  useEffect(() => {
    if (stage2Done && !lastCompleteRef.current) {
      lastCompleteRef.current = true;
      onStageComplete();
    }
    if (!stage2Done) {
      lastCompleteRef.current = false;
    }
  }, [stage2Done, onStageComplete]);

  if (loading) {
    return <div className="text-sm text-gray-600">Loading your firm facts…</div>;
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  const get = (field: Stage2Field): SaveState | undefined => saveStates[field];

  return (
    <div className="space-y-8">
      {/* ─── Operational ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Operational facts
          </h2>
          <p className="text-sm text-gray-600">
            Real numbers our agents use to write evidence-backed content.
          </p>
        </div>

        <NumericField
          id="averageCompletionTimeWeeks"
          label="Average case completion time (weeks)"
          helperText="How long a typical client matter takes from instruction to completion."
          min={0}
          value={facts.averageCompletionTimeWeeks as number | undefined}
          onChange={(v) => updateField('averageCompletionTimeWeeks', v)}
          saveState={get('averageCompletionTimeWeeks')}
          placeholder="e.g. 8"
        />

        <NumericField
          id="formalComplaintsThisYear"
          label="Formal complaints this year"
          helperText="The number of formal complaints recorded so far this year."
          min={0}
          value={facts.formalComplaintsThisYear as number | undefined}
          onChange={(v) => updateField('formalComplaintsThisYear', v)}
          saveState={get('formalComplaintsThisYear')}
          placeholder="e.g. 0"
        />

        <NumericField
          id="complaintResolutionDays"
          label="Average complaint resolution time (days)"
          helperText="How long, on average, it takes to resolve a formal complaint."
          min={0}
          value={facts.complaintResolutionDays as number | undefined}
          onChange={(v) => updateField('complaintResolutionDays', v)}
          saveState={get('complaintResolutionDays')}
          placeholder="e.g. 14"
        />

        <MoneyField
          id="averageDisbursements"
          label="Average disbursements per case (£)"
          helperText="Typical third-party costs passed on to clients per matter (£GBP)."
          value={(facts.averageDisbursements as string) || ''}
          onChange={(v) => updateField('averageDisbursements', v)}
          saveState={get('averageDisbursements')}
          placeholder="£300–£600"
        />

        <MoneyField
          id="fixedFeeSavingVsHourly"
          label="Average client saving on fixed vs hourly (£)"
          helperText="Typical amount a client saves choosing your fixed fee over hourly billing (£GBP)."
          value={(facts.fixedFeeSavingVsHourly as string) || ''}
          onChange={(v) => updateField('fixedFeeSavingVsHourly', v)}
          saveState={get('fixedFeeSavingVsHourly')}
          placeholder="£400–£900"
        />

        <NumericField
          id="specialismCaseCount"
          label="Total specialism cases since founding"
          helperText="How many matters in your primary specialism your firm has handled in total."
          min={0}
          value={facts.specialismCaseCount as number | undefined}
          onChange={(v) => updateField('specialismCaseCount', v)}
          saveState={get('specialismCaseCount')}
          placeholder="e.g. 1200"
        />

        <NumericField
          id="teamCombinedYears"
          label="Combined years of team experience"
          helperText="The total years of professional experience across your whole team."
          min={0}
          value={facts.teamCombinedYears as number | undefined}
          onChange={(v) => updateField('teamCombinedYears', v)}
          saveState={get('teamCombinedYears')}
          placeholder="e.g. 85"
        />

        {showsHeadcount(vendorType) && (
          <NumericField
            id="totalSolicitorCount"
            label={
              HEADCOUNT_LABEL[vendorType as 'solicitor' | 'accountant']
            }
            helperText="How many qualified professionals work at your firm."
            min={0}
            value={facts.totalSolicitorCount as number | undefined}
            onChange={(v) => updateField('totalSolicitorCount', v)}
            saveState={get('totalSolicitorCount')}
            placeholder="e.g. 12"
          />
        )}
      </section>

      {/* ─── Brand essentials ────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Brand essentials
          </h2>
          <p className="text-sm text-gray-600">
            How your firm sounds and who it serves, so content reads like you.
          </p>
        </div>

        <DropdownField
          id="toneOfVoice"
          label="Tone of voice"
          helperText="How our agents should write content for your firm."
          value={(facts.toneOfVoice as string) || ''}
          onChange={(v) => updateField('toneOfVoice', v)}
          options={TONE_OPTIONS}
          saveState={get('toneOfVoice')}
        />

        <CommaListField
          id="clientTypes"
          label="Client types"
          helperText="Comma-separated — who do you typically serve? e.g. SMEs, family offices, contractors"
          value={(facts.clientTypes as string[]) || []}
          onChange={(v) => updateField('clientTypes', v)}
          saveState={get('clientTypes')}
        />

        <CommaListField
          id="brandKeywords"
          label="Brand keywords"
          helperText="Comma-separated — words your firm should be associated with"
          value={(facts.brandKeywords as string[]) || []}
          onChange={(v) => updateField('brandKeywords', v)}
          saveState={get('brandKeywords')}
        />

        <MultiTextField
          id="uniqueSellingPoints"
          label="Unique selling points"
          helperText="Up to 5 short statements — what makes your firm different"
          count={5}
          value={(facts.uniqueSellingPoints as string[]) || []}
          onChange={(v) => updateField('uniqueSellingPoints', v)}
          saveState={get('uniqueSellingPoints')}
        />
      </section>

      <div
        className={`rounded-md border p-4 text-sm ${
          stage2Done
            ? 'border-green-200 bg-green-50 text-green-800'
            : 'border-gray-200 bg-gray-50 text-gray-600'
        }`}
      >
        {stage2Done
          ? 'Stage 2 complete ✓ — your firm profile is ready for AI assistants.'
          : 'Fill the fields above to complete Stage 2. Each field saves automatically when you tab away.'}
      </div>
    </div>
  );
}
