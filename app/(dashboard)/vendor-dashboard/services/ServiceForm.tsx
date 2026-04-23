'use client';

import { useState, useEffect } from 'react';
import type {
  VendorService,
  VendorType,
  SolicitorData,
  AccountantData,
  MortgageData,
  EstateData,
  FaqItem,
} from '@/lib/vendorServices/types';

function splitLines(raw: string): string[] {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function joinLines(arr?: string[]): string {
  return (arr || []).join('\n');
}

function FieldLabel({ htmlFor, children, hint }: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-1">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
      {hint && <p className="text-xs text-gray-500 mt-0.5">{hint}</p>}
    </div>
  );
}

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-gray-900">{children}</h3>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

function TextInput({ id, value, onChange, placeholder, type = 'text' }: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input"
    />
  );
}

function NumberInput({ id, value, onChange, placeholder, step, min }: {
  id: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
  placeholder?: string;
  step?: string;
  min?: string;
}) {
  return (
    <input
      id={id}
      type="number"
      value={value === undefined || Number.isNaN(value) ? '' : value}
      onChange={(e) => {
        const raw = e.target.value;
        if (raw === '') onChange(undefined);
        else {
          const n = Number(raw);
          onChange(Number.isFinite(n) ? n : undefined);
        }
      }}
      placeholder={placeholder}
      step={step}
      min={min}
      className="input"
    />
  );
}

function TextArea({ id, value, onChange, rows = 4, placeholder }: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input"
    />
  );
}

function Checkbox({ id, checked, onChange, label }: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

export default function ServiceForm({
  vendorType,
  initial,
  submitting,
  saveLabel,
  errorMessage,
  onSubmit,
}: {
  vendorType: VendorType;
  initial?: VendorService;
  submitting: boolean;
  saveLabel: string;
  errorMessage: string | null;
  onSubmit: (value: VendorService) => void;
}) {
  // Common fields
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [serviceType, setServiceType] = useState(initial?.serviceType || '');
  const [areaServed, setAreaServed] = useState(initial?.areaServed || '');
  const [active, setActive] = useState(initial?.active !== false);
  const [faqs, setFaqs] = useState<FaqItem[]>(initial?.faqs || []);

  // Vertical-specific. Stored as separate state objects so each section is
  // self-contained; only the active vendorType's block is sent on submit.
  const [solicitorData, setSolicitorData] = useState<SolicitorData>(initial?.solicitorData || {});
  const [accountantData, setAccountantData] = useState<AccountantData>(initial?.accountantData || {});
  const [mortgageData, setMortgageData] = useState<MortgageData>(initial?.mortgageData || {});
  const [estateData, setEstateData] = useState<EstateData>(initial?.estateData || {});

  const [clientError, setClientError] = useState<string | null>(null);

  // If the parent swaps initial (rare), reset form
  useEffect(() => {
    if (!initial) return;
    setName(initial.name || '');
    setDescription(initial.description || '');
    setServiceType(initial.serviceType || '');
    setAreaServed(initial.areaServed || '');
    setActive(initial.active !== false);
    setFaqs(initial.faqs || []);
    setSolicitorData(initial.solicitorData || {});
    setAccountantData(initial.accountantData || {});
    setMortgageData(initial.mortgageData || {});
    setEstateData(initial.estateData || {});
  }, [initial]);

  const updateFaq = (i: number, patch: Partial<FaqItem>) => {
    setFaqs((curr) => curr.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  };
  const addFaq = () => setFaqs((curr) => [...curr, { question: '', answer: '' }]);
  const removeFaq = (i: number) => setFaqs((curr) => curr.filter((_, idx) => idx !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    if (!name.trim()) {
      setClientError('Service name is required.');
      return;
    }

    const cleanedFaqs = faqs
      .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
      .filter((f) => f.question || f.answer);

    const payload: VendorService = {
      name: name.trim(),
      description: description.trim() || undefined,
      serviceType: serviceType.trim() || undefined,
      areaServed: areaServed.trim() || undefined,
      active,
      faqs: cleanedFaqs,
      vendorType,
    };

    if (vendorType === 'solicitor') payload.solicitorData = solicitorData;
    if (vendorType === 'accountant') payload.accountantData = accountantData;
    if (vendorType === 'mortgage-advisor') payload.mortgageData = mortgageData;
    if (vendorType === 'estate-agent') payload.estateData = estateData;

    onSubmit(payload);
  };

  const verticalLabel: Record<VendorType, string> = {
    solicitor: 'Solicitor-specific details',
    accountant: 'Accountant-specific details',
    'mortgage-advisor': 'Mortgage adviser-specific details',
    'estate-agent': 'Estate agent-specific details',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(clientError || errorMessage) && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
          {clientError || errorMessage}
        </div>
      )}

      {/* ── Common fields ─────────────────────────────────────────── */}
      <section className="card p-5 sm:p-6">
        <SectionHeading sub="The basics that apply to every service.">
          Service details
        </SectionHeading>

        <div className="space-y-4">
          <div>
            <FieldLabel htmlFor="svc-name">Name *</FieldLabel>
            <TextInput id="svc-name" value={name} onChange={setName} placeholder="e.g. Residential Conveyancing" />
          </div>

          <div>
            <FieldLabel htmlFor="svc-type" hint="Short tag — what kind of service this is. Used in listings and navigation.">
              Service type
            </FieldLabel>
            <TextInput id="svc-type" value={serviceType} onChange={setServiceType} placeholder="e.g. Conveyancing" />
          </div>

          <div>
            <FieldLabel htmlFor="svc-area" hint="City, region, or postcode area.">
              Area served
            </FieldLabel>
            <TextInput id="svc-area" value={areaServed} onChange={setAreaServed} placeholder="e.g. Cardiff and the Vale of Glamorgan" />
          </div>

          <div>
            <FieldLabel htmlFor="svc-description" hint="Explain the service, your process, and what's included. 600+ words perform best for AI citation.">
              Description
            </FieldLabel>
            <TextArea
              id="svc-description"
              value={description}
              onChange={setDescription}
              rows={8}
              placeholder="Describe the service, the typical process, timescales, and what's included."
            />
          </div>

          {initial?._id && (
            <div>
              <Checkbox id="svc-active" checked={active} onChange={setActive} label="Active (visible in listings)" />
            </div>
          )}
        </div>
      </section>

      {/* ── Vertical-specific ─────────────────────────────────────── */}
      <section className="card p-5 sm:p-6">
        <SectionHeading sub="Only the fields relevant to your vendor type are shown.">
          {verticalLabel[vendorType]}
        </SectionHeading>

        {vendorType === 'solicitor' && (
          <div className="space-y-4">
            <div>
              <FieldLabel htmlFor="sol-practice" hint="One per line.">
                Practice areas
              </FieldLabel>
              <TextArea
                id="sol-practice"
                value={joinLines(solicitorData.practiceAreas)}
                onChange={(v) => setSolicitorData({ ...solicitorData, practiceAreas: splitLines(v) })}
                rows={4}
                placeholder={'Residential conveyancing\nFamily law\nWills and probate'}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="sol-sra">SRA number</FieldLabel>
                <TextInput
                  id="sol-sra"
                  value={solicitorData.sraNumber || ''}
                  onChange={(v) => setSolicitorData({ ...solicitorData, sraNumber: v })}
                  placeholder="e.g. 123456"
                />
              </div>
              <div>
                <FieldLabel htmlFor="sol-pricing-model" hint="Fixed, Hourly, Range, Quote on request.">
                  Pricing model
                </FieldLabel>
                <TextInput
                  id="sol-pricing-model"
                  value={solicitorData.pricingModel || ''}
                  onChange={(v) => setSolicitorData({ ...solicitorData, pricingModel: v })}
                  placeholder="e.g. Fixed fee"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="sol-accred" hint="One per line. For example: CQS, Lexcel, Law Society accreditation.">
                Accreditations
              </FieldLabel>
              <TextArea
                id="sol-accred"
                value={joinLines(solicitorData.accreditations)}
                onChange={(v) => setSolicitorData({ ...solicitorData, accreditations: splitLines(v) })}
                rows={3}
                placeholder={'CQS\nLexcel'}
              />
            </div>

            <div>
              <FieldLabel htmlFor="sol-pricing" hint="Be specific. SRA Transparency Rules mandate published pricing for several service areas.">
                Pricing details
              </FieldLabel>
              <TextArea
                id="sol-pricing"
                value={solicitorData.pricing || ''}
                onChange={(v) => setSolicitorData({ ...solicitorData, pricing: v })}
                rows={4}
                placeholder="e.g. Fixed fee from £895 + VAT and disbursements for freehold conveyancing up to £250,000. Leasehold from £1,195 + VAT."
              />
            </div>

            <div>
              <Checkbox
                id="sol-legalaid"
                checked={!!solicitorData.legalAidAvailable}
                onChange={(v) => setSolicitorData({ ...solicitorData, legalAidAvailable: v })}
                label="Legal aid available for this service"
              />
            </div>
          </div>
        )}

        {vendorType === 'accountant' && (
          <div className="space-y-4">
            <div>
              <FieldLabel htmlFor="acc-spec" hint="One per line.">
                Specialisms
              </FieldLabel>
              <TextArea
                id="acc-spec"
                value={joinLines(accountantData.specialisms)}
                onChange={(v) => setAccountantData({ ...accountantData, specialisms: splitLines(v) })}
                rows={4}
                placeholder={'Tax advisory\nVAT services\nCorporate finance'}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="acc-icaew">ICAEW / ACCA firm number</FieldLabel>
                <TextInput
                  id="acc-icaew"
                  value={accountantData.icaewAccaNumber || ''}
                  onChange={(v) => setAccountantData({ ...accountantData, icaewAccaNumber: v })}
                  placeholder="e.g. C001234567"
                />
              </div>
              <div>
                <FieldLabel htmlFor="acc-pricing-model">Pricing model</FieldLabel>
                <TextInput
                  id="acc-pricing-model"
                  value={accountantData.pricingModel || ''}
                  onChange={(v) => setAccountantData({ ...accountantData, pricingModel: v })}
                  placeholder="e.g. Monthly retainer"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="acc-software" hint="One per line. For example: Xero Gold Partner, QuickBooks ProAdvisor.">
                Software partner status
              </FieldLabel>
              <TextArea
                id="acc-software"
                value={joinLines(accountantData.softwarePartnerStatus)}
                onChange={(v) => setAccountantData({ ...accountantData, softwarePartnerStatus: splitLines(v) })}
                rows={3}
                placeholder={'Xero Gold Partner\nQuickBooks ProAdvisor'}
              />
            </div>

            <div>
              <FieldLabel htmlFor="acc-pricing">Pricing details</FieldLabel>
              <TextArea
                id="acc-pricing"
                value={accountantData.pricing || ''}
                onChange={(v) => setAccountantData({ ...accountantData, pricing: v })}
                rows={4}
                placeholder="e.g. From £150/month for limited company accounts including bookkeeping, annual accounts, and corporation tax."
              />
            </div>

            <div>
              <Checkbox
                id="acc-mtd"
                checked={!!accountantData.mtdCompliant}
                onChange={(v) => setAccountantData({ ...accountantData, mtdCompliant: v })}
                label="Making Tax Digital compliant"
              />
            </div>
          </div>
        )}

        {vendorType === 'mortgage-advisor' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="mort-fca">FCA number</FieldLabel>
                <TextInput
                  id="mort-fca"
                  value={mortgageData.fcaNumber || ''}
                  onChange={(v) => setMortgageData({ ...mortgageData, fcaNumber: v })}
                  placeholder="e.g. 123456"
                />
              </div>
              <div>
                <FieldLabel htmlFor="mort-fee-type" hint="e.g. Fixed fee, Percentage, Hybrid.">
                  Fee type
                </FieldLabel>
                <TextInput
                  id="mort-fee-type"
                  value={mortgageData.feeType || ''}
                  onChange={(v) => setMortgageData({ ...mortgageData, feeType: v })}
                  placeholder="e.g. Fixed fee"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="mort-fee-amount">Fee amount (£)</FieldLabel>
                <NumberInput
                  id="mort-fee-amount"
                  value={mortgageData.feeAmountGBP}
                  onChange={(v) => setMortgageData({ ...mortgageData, feeAmountGBP: v })}
                  placeholder="e.g. 499"
                  min="0"
                  step="1"
                />
              </div>
              <div>
                <FieldLabel htmlFor="mort-fee-pct" hint="If your fee is a percentage of loan amount.">
                  Fee percentage (%)
                </FieldLabel>
                <NumberInput
                  id="mort-fee-pct"
                  value={mortgageData.feePercentage}
                  onChange={(v) => setMortgageData({ ...mortgageData, feePercentage: v })}
                  placeholder="e.g. 0.35"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="mort-lender-count" hint="Number of lenders on your panel.">
                  Lender count
                </FieldLabel>
                <NumberInput
                  id="mort-lender-count"
                  value={mortgageData.lenderCount}
                  onChange={(v) => setMortgageData({ ...mortgageData, lenderCount: v })}
                  placeholder="e.g. 90"
                  min="0"
                  step="1"
                />
              </div>
              <div className="flex items-end pb-2">
                <Checkbox
                  id="mort-wom"
                  checked={!!mortgageData.wholeOfMarket}
                  onChange={(v) => setMortgageData({ ...mortgageData, wholeOfMarket: v })}
                  label="Whole-of-market adviser"
                />
              </div>
            </div>
          </div>
        )}

        {vendorType === 'estate-agent' && (
          <div className="space-y-4">
            <div>
              <FieldLabel htmlFor="est-services" hint="One per line. For example: Sales, Lettings, Property management.">
                Service types
              </FieldLabel>
              <TextArea
                id="est-services"
                value={joinLines(estateData.serviceTypes)}
                onChange={(v) => setEstateData({ ...estateData, serviceTypes: splitLines(v) })}
                rows={3}
                placeholder={'Sales\nLettings'}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="est-redress" hint="TPO or PRS.">
                  Redress scheme
                </FieldLabel>
                <TextInput
                  id="est-redress"
                  value={estateData.redressScheme || ''}
                  onChange={(v) => setEstateData({ ...estateData, redressScheme: v })}
                  placeholder="e.g. TPO"
                />
              </div>
              <div>
                <FieldLabel htmlFor="est-cmp">Client money protection</FieldLabel>
                <TextInput
                  id="est-cmp"
                  value={estateData.clientMoneyProtection || ''}
                  onChange={(v) => setEstateData({ ...estateData, clientMoneyProtection: v })}
                  placeholder="e.g. Propertymark CMP"
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="est-postcodes" hint="One per line. Outward codes fine (e.g. CF5, CF64).">
                Coverage postcodes
              </FieldLabel>
              <TextArea
                id="est-postcodes"
                value={joinLines(estateData.coveragePostcodes)}
                onChange={(v) => setEstateData({ ...estateData, coveragePostcodes: splitLines(v) })}
                rows={4}
                placeholder={'CF5\nCF64\nCF11'}
              />
            </div>

            <div>
              <FieldLabel htmlFor="est-pricing-model">Pricing model</FieldLabel>
              <TextInput
                id="est-pricing-model"
                value={estateData.pricingModel || ''}
                onChange={(v) => setEstateData({ ...estateData, pricingModel: v })}
                placeholder="e.g. Percentage commission"
              />
            </div>

            <div>
              <FieldLabel htmlFor="est-pricing">Pricing details</FieldLabel>
              <TextArea
                id="est-pricing"
                value={estateData.pricing || ''}
                onChange={(v) => setEstateData({ ...estateData, pricing: v })}
                rows={4}
                placeholder="e.g. Sales: 1.2% of sale price + VAT, no sale no fee. Lettings: 10% of rent collected."
              />
            </div>
          </div>
        )}
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────── */}
      <section className="card p-5 sm:p-6">
        <SectionHeading sub="FAQ content is the most-cited format in AI responses. Aim for 5+ questions clients actually ask.">
          Frequently asked questions
        </SectionHeading>

        <div className="space-y-4">
          {faqs.length === 0 && (
            <p className="text-sm text-gray-500">No FAQs yet. Add your first one below.</p>
          )}

          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Question {i + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-3">
                <TextInput
                  id={`faq-q-${i}`}
                  value={faq.question}
                  onChange={(v) => updateFaq(i, { question: v })}
                  placeholder="e.g. How much does conveyancing cost?"
                />
                <TextArea
                  id={`faq-a-${i}`}
                  rows={3}
                  value={faq.answer}
                  onChange={(v) => updateFaq(i, { answer: v })}
                  placeholder="Be specific with numbers and timescales — AI cites specific answers."
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg"
          >
            + Add FAQ
          </button>
        </div>
      </section>

      {/* ── Submit ────────────────────────────────────────────────── */}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving…' : saveLabel}
        </button>
      </div>
    </form>
  );
}
