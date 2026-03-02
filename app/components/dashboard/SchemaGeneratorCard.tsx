'use client';

import { useState, useEffect, useMemo } from 'react';
import TierGate from './TierGate';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

// Mirror of backend vendorType → Schema.org type mapping
const VENDOR_TYPE_MAP: Record<string, string> = {
  solicitor: 'LegalService',
  accountant: 'AccountingService',
  'mortgage-advisor': 'FinancialService',
  'estate-agent': 'RealEstateAgent',
};

interface VendorData {
  vendorId: string;
  company: string;
  vendorType?: string;
  description?: string;
  website?: string;
  phone?: string;
  city?: string;
  region?: string;
  postcode?: string;
  address?: string;
  linkedIn?: string;
  services?: string[];
  practiceAreas?: string[];
  specializations?: string[];
  sraNumber?: string;
  fcaNumber?: string;
  icaewFirmNumber?: string;
  propertymarkNumber?: string;
  accreditations?: string[];
  certifications?: string[];
  yearsInBusiness?: number;
  rating?: number;
  reviewCount?: number;
  brands?: string[];
  coverage?: string[];
  tier?: string;
}

interface ValidationResult {
  schemasFound: number;
  tendoraiSchemaFound: boolean;
  hasScriptTag: boolean;
  matchingFields: string[];
  missingFields: string[];
  matchPercentage: number;
  websiteUrl: string;
}

interface SchemaGeneratorCardProps {
  token: string;
  tier: string;
  vendorId: string;
  vendorData: VendorData;
}

function stripEmpty(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    const filtered = obj.map(stripEmpty).filter(v => v !== null && v !== undefined);
    return filtered.length > 0 ? filtered : undefined;
  }
  if (obj && typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const v = stripEmpty(value);
      if (v !== null && v !== undefined && v !== '' &&
          !(Array.isArray(v) && v.length === 0) &&
          !(typeof v === 'object' && !Array.isArray(v) && Object.keys(v as object).length === 0)) {
        cleaned[key] = v;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }
  return obj;
}

function generateSchemaClientSide(v: VendorData): Record<string, unknown> {
  const profileUrl = `https://www.tendorai.com/suppliers/profile/${v.vendorId}`;
  const schemaType = VENDOR_TYPE_MAP[v.vendorType || ''] || 'LocalBusiness';

  const sameAs = [profileUrl];
  if (v.website) sameAs.push(v.website);
  if (v.linkedIn) sameAs.push(v.linkedIn);

  const knowsAbout = [
    ...(v.services || []),
    ...(v.practiceAreas || []),
    ...(v.specializations || []),
  ].filter(Boolean);

  const identifiers: Array<Record<string, string>> = [];
  if (v.sraNumber) identifiers.push({ '@type': 'PropertyValue', name: 'SRA Number', propertyID: 'https://www.sra.org.uk', value: v.sraNumber });
  if (v.fcaNumber) identifiers.push({ '@type': 'PropertyValue', name: 'FCA Number', propertyID: 'https://www.fca.org.uk', value: v.fcaNumber });
  if (v.icaewFirmNumber) identifiers.push({ '@type': 'PropertyValue', name: 'ICAEW Firm Number', propertyID: 'https://www.icaew.com', value: v.icaewFirmNumber });
  if (v.propertymarkNumber) identifiers.push({ '@type': 'PropertyValue', name: 'Propertymark Number', propertyID: 'https://www.propertymark.co.uk', value: v.propertymarkNumber });
  if (['managed', 'pro', 'verified', 'gold', 'enterprise'].includes(v.tier || '')) identifiers.push({ '@type': 'PropertyValue', name: 'TendorAI Verified', propertyID: 'https://www.tendorai.com', value: v.vendorId });

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': profileUrl,
    name: v.company,
    description: v.description || `${v.company} - Professional services`,
    url: v.website || profileUrl,
    telephone: v.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: v.address || undefined,
      addressLocality: v.city || undefined,
      addressRegion: v.region || undefined,
      postalCode: v.postcode || undefined,
      addressCountry: 'GB',
    },
    sameAs,
    identifier: identifiers.length > 0 ? identifiers : undefined,
    memberOf: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      description: 'The UK\'s AI Visibility Platform — verified business profiles optimised for AI recommendations',
    },
    knowsAbout: knowsAbout.length > 0 ? knowsAbout : undefined,
    ...(v.yearsInBusiness && { foundingDate: new Date().getFullYear() - v.yearsInBusiness }),
    ...(v.brands && v.brands.length > 0 && { brand: v.brands.map(b => ({ '@type': 'Brand', name: b })) }),
    ...(v.rating && v.rating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: v.rating,
        reviewCount: v.reviewCount || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    areaServed: v.coverage?.map(code => ({ '@type': 'Place', name: code })),
    potentialAction: {
      '@type': 'AskAction',
      name: 'Request a Quote',
      target: profileUrl,
      description: `Request a quote from ${v.company} via TendorAI`,
    },
  };

  return stripEmpty(schema) as Record<string, unknown>;
}

const CMS_OPTIONS = [
  { value: 'wordpress', label: 'WordPress' },
  { value: 'wix', label: 'Wix' },
  { value: 'squarespace', label: 'Squarespace' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'custom', label: 'Custom / Other' },
];

export default function SchemaGeneratorCard({ token, tier, vendorId, vendorData }: SchemaGeneratorCardProps) {
  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [validationError, setValidationError] = useState('');
  const [schemaHealth, setSchemaHealth] = useState<'green' | 'amber' | 'none'>('none');

  // Self-install copy state
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedDiv, setCopiedDiv] = useState(false);
  const [showPlatformGuides, setShowPlatformGuides] = useState(false);

  // Install request state
  const [installStatus, setInstallStatus] = useState<string | null>(null);
  const [installDate, setInstallDate] = useState<string | null>(null);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [cmsPlatform, setCmsPlatform] = useState('wordpress');
  const [cmsLoginUrl, setCmsLoginUrl] = useState('');
  const [cmsUsername, setCmsUsername] = useState('');
  const [cmsPassword, setCmsPassword] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const schema = useMemo(() => generateSchemaClientSide(vendorData), [vendorData]);
  const schemaJson = useMemo(() => JSON.stringify(schema, null, 2), [schema]);

  // Fetch schema health from latest AEO audit
  useEffect(() => {
    if (!token || !['managed', 'pro', 'verified', 'gold', 'enterprise'].includes(tier)) return;
    fetch(`${API_URL}/api/aeo-audit/latest`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data?.checks) {
          const schemaCheck = data.data.checks.find((c: { key: string }) => c.key === 'schema');
          if (schemaCheck) {
            setSchemaHealth(schemaCheck.score >= 8 ? 'green' : schemaCheck.score >= 5 ? 'amber' : 'none');
          }
        }
      })
      .catch(() => {});
  }, [token, tier]);

  // Fetch latest install request status
  useEffect(() => {
    if (!token || !['managed', 'pro', 'verified', 'gold', 'enterprise'].includes(tier)) return;
    fetch(`${API_URL}/api/schema/install-request/latest`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setInstallStatus(data.data.status);
          setInstallDate(data.data.createdAt);
          setCompletedAt(data.data.completedAt);
        }
      })
      .catch(() => {});
  }, [token, tier]);

  const handleSubmitInstallRequest = async () => {
    if (!cmsUsername || !cmsPassword || !cmsPlatform) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch(`${API_URL}/api/schema/install-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          websiteUrl: vendorData.website || cmsLoginUrl,
          cmsPlatform,
          cmsLoginUrl,
          cmsUsername,
          cmsPassword,
          additionalNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setInstallStatus('pending');
        setInstallDate(data.data.createdAt);
        setShowForm(false);
        setCmsUsername('');
        setCmsPassword('');
        setCmsLoginUrl('');
        setAdditionalNotes('');
      } else {
        setSubmitError(data.error || 'Failed to submit request');
      }
    } catch {
      setSubmitError('Could not reach the server');
    } finally {
      setSubmitting(false);
    }
  };

  const runValidation = async () => {
    setValidating(true);
    setValidationError('');
    setValidation(null);
    try {
      const res = await fetch(`${API_URL}/api/schema/${vendorId}/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setValidation(data.data);
      } else {
        setValidationError(data.error || 'Validation failed');
      }
    } catch {
      setValidationError('Could not reach the server');
    } finally {
      setValidating(false);
    }
  };

  // Percentage ring SVG helper
  const PercentageRing = ({ value, size = 64 }: { value: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const color = value >= 80 ? '#22c55e' : value >= 50 ? '#f59e0b' : '#ef4444';
    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
        <text x="50%" y="50%" textAnchor="middle" dy="0.35em" className="text-sm font-bold fill-current"
          style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%' }} fill={color}>
          {value}%
        </text>
      </svg>
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div id="schema-generator" className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Schema.org Generator</h3>
          <p className="text-sm text-gray-500 mt-1">Structured data for your website that AI crawlers can read</p>
        </div>
        {['managed', 'pro', 'verified', 'gold', 'enterprise'].includes(tier) && (
          <div className="flex items-center gap-2">
            {schemaHealth === 'green' && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Schema healthy
              </span>
            )}
            {schemaHealth === 'amber' && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Partial schema
              </span>
            )}
          </div>
        )}
      </div>

      <TierGate
        currentTier={tier}
        requiredTier="pro"
        featureName="Schema Generator"
        featureDescription="Generate Schema.org structured data to boost your AI visibility. Pro vendors get a verified schema that AI assistants trust."
      >
        <div className="space-y-6">
          {/* JSON-LD Preview (read-only) */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Your JSON-LD Schema</h4>
            <div className="bg-gray-900 rounded-xl p-4 max-h-80 overflow-auto">
              <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap break-words">
                {schemaJson}
              </pre>
            </div>
          </div>

          {/* Installation Request Section */}
          <div className="border-t border-gray-100 pt-4">
            {/* No request yet */}
            {installStatus === null && !showForm && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Get Your Schema Installed</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Included in your Pro subscription — our team will add your schema markup within 48 hours.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Request Installation
                </button>
              </div>
            )}

            {/* Install Request Form */}
            {showForm && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900">Request Schema Installation</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CMS Platform</label>
                  <select
                    value={cmsPlatform}
                    onChange={(e) => setCmsPlatform(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    {CMS_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CMS Login URL</label>
                  <input
                    type="text"
                    value={cmsLoginUrl}
                    onChange={(e) => setCmsLoginUrl(e.target.value)}
                    placeholder="https://yoursite.com/wp-admin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                  <input
                    type="text"
                    value={cmsUsername}
                    onChange={(e) => setCmsUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    value={cmsPassword}
                    onChange={(e) => setCmsPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any special instructions..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <p className="text-xs text-gray-500">
                  Your credentials are encrypted with AES-256 and only accessible to the TendorAI team.
                </p>

                {submitError && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{submitError}</div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitInstallRequest}
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                  <button
                    onClick={() => { setShowForm(false); setSubmitError(''); }}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Pending Status */}
            {installStatus === 'pending' && !showForm && (
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Installation Requested
                </span>
                <p className="text-sm text-gray-600">
                  Submitted on {installDate ? formatDate(installDate) : 'recently'}. Our team will install your schema within 48 hours.
                </p>
              </div>
            )}

            {/* In Progress Status */}
            {installStatus === 'in_progress' && (
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Installation In Progress
                </span>
                <p className="text-sm text-gray-600">
                  Our team is currently installing your schema.
                </p>
              </div>
            )}

            {/* Completed Status */}
            {installStatus === 'completed' && (
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Schema Installed
                </span>
                <p className="text-sm text-gray-600 mb-3">
                  Your schema was installed on {completedAt ? formatDate(completedAt) : 'recently'}.
                </p>
                <button
                  onClick={runValidation}
                  disabled={validating}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {validating ? 'Checking...' : 'Run Test'}
                </button>
              </div>
            )}

            {/* Failed Status */}
            {installStatus === 'failed' && !showForm && (
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Installation Failed
                </span>
                <p className="text-sm text-gray-600 mb-3">
                  There was an issue. Please submit a new request or contact support.
                </p>
                <button
                  onClick={() => { setShowForm(true); setInstallStatus(null); }}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Request Again
                </button>
              </div>
            )}
          </div>

          {/* Install It Yourself */}
          <div className="border-t border-gray-100 pt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Install It Yourself</h4>
              <p className="text-sm text-gray-500 mt-1">Copy and paste — updates automatically when you update your profile</p>
            </div>

            {/* Block 1: Script tag */}
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1.5">{`Step 1: Add this before </body>`}</p>
              <div className="relative bg-gray-900 rounded-lg p-3 pr-12">
                <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap break-words">
{`<script src="https://www.tendorai.com/api/schema/${vendorId}.js"></script>`}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`<script src="https://www.tendorai.com/api/schema/${vendorId}.js"></script>`);
                    setCopiedScript(true);
                    setTimeout(() => setCopiedScript(false), 2000);
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedScript ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M20 6L9 17l-5-5" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Block 2: Badge div */}
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1.5">Step 2: Add this where you want the badge in your footer</p>
              <div className="relative bg-gray-900 rounded-lg p-3 pr-12">
                <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap break-words">
{`<div id="tendorai-badge"></div>`}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`<div id="tendorai-badge"></div>`);
                    setCopiedDiv(true);
                    setTimeout(() => setCopiedDiv(false), 2000);
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedDiv ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M20 6L9 17l-5-5" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Expandable platform guides */}
            <div>
              <button
                onClick={() => setShowPlatformGuides(!showPlatformGuides)}
                className="flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
              >
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform duration-200 ${showPlatformGuides ? 'rotate-90' : ''}`}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                How to install on your platform
              </button>

              {showPlatformGuides && (
                <div className="mt-3 space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-medium text-gray-900">WordPress</p>
                    <p className="text-gray-600">{`Appearance → Theme Editor → footer.php → paste Step 1 before </body>`}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Wix</p>
                    <p className="text-gray-600">{`Settings → Custom Code → Add Code to All Pages → Body (end) → paste Step 1. Add Step 2 where you want the badge.`}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Squarespace</p>
                    <p className="text-gray-600">{`Settings → Advanced → Code Injection → Footer → paste both steps`}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Shopify</p>
                    <p className="text-gray-600">{`Online Store → Themes → Edit Code → theme.liquid → paste Step 1 before </body>`}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Custom / Other</p>
                    <p className="text-gray-600">{`Paste Step 1 before </body> on every page. Add Step 2 anywhere in your footer HTML.`}</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-sm text-green-600 font-medium">
              &#10003; Your schema updates automatically every time you save changes to your TendorAI profile
            </p>
          </div>

          {/* What This Does */}
          <div className="bg-purple-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">What This Does</h4>
            <ul className="text-sm text-purple-800 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">&#10003;</span>
                <span>Adds structured data that AI crawlers (ChatGPT, Claude, Perplexity, Google) can parse</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">&#10003;</span>
                <span>Creates a two-way reference between your site and TendorAI, building AI trust</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">&#10003;</span>
                <span>Includes your regulatory numbers, services, and reviews in machine-readable format</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">&#10003;</span>
                <span>Auto-syncs with your TendorAI profile — update once, reflected everywhere</span>
              </li>
            </ul>
          </div>

          {/* Test Your Schema */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Test Your Schema</h4>
              <button
                onClick={runValidation}
                disabled={validating}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {validating ? 'Checking...' : 'Run Test'}
              </button>
            </div>

            {validationError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{validationError}</div>
            )}

            {validation && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <PercentageRing value={validation.matchPercentage} />
                  <div>
                    <p className="font-medium text-gray-900">
                      {validation.matchPercentage}% match
                    </p>
                    <p className="text-sm text-gray-500">
                      {validation.schemasFound} schema block{validation.schemasFound !== 1 ? 's' : ''} found on {validation.websiteUrl}
                    </p>
                    {validation.tendoraiSchemaFound ? (
                      <p className="text-sm text-green-600 font-medium mt-1">TendorAI schema detected</p>
                    ) : (
                      <p className="text-sm text-amber-600 font-medium mt-1">TendorAI schema not found yet</p>
                    )}
                  </div>
                </div>

                {validation.matchingFields.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Matching Fields</p>
                    <div className="flex flex-wrap gap-1.5">
                      {validation.matchingFields.map(f => (
                        <span key={f} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">{f}</span>
                      ))}
                    </div>
                  </div>
                )}

                {validation.missingFields.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Missing Fields</p>
                    <div className="flex flex-wrap gap-1.5">
                      {validation.missingFields.map(f => (
                        <span key={f} className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </TierGate>
    </div>
  );
}
