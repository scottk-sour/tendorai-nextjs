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
  if (v.tier === 'verified') identifiers.push({ '@type': 'PropertyValue', name: 'TendorAI Verified', propertyID: 'https://www.tendorai.com', value: v.vendorId });

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
      description: 'AI-powered professional services directory',
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

export default function SchemaGeneratorCard({ token, tier, vendorId, vendorData }: SchemaGeneratorCardProps) {
  const [schemaCopied, setSchemaCopied] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [validationError, setValidationError] = useState('');
  const [schemaHealth, setSchemaHealth] = useState<'green' | 'amber' | 'none'>('none');
  const [emailCopied, setEmailCopied] = useState(false);

  const schema = useMemo(() => generateSchemaClientSide(vendorData), [vendorData]);
  const schemaJson = useMemo(() => JSON.stringify(schema, null, 2), [schema]);
  const scriptTag = `<script src="https://api.tendorai.com/api/schema/${vendorId}.js"></script>`;

  // Fetch schema health from latest GEO audit
  useEffect(() => {
    if (!token || tier !== 'verified') return;
    fetch(`${API_URL}/api/geo-audit/latest`, {
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

  const copySchema = async () => {
    try {
      await navigator.clipboard.writeText(schemaJson);
      setSchemaCopied(true);
      setTimeout(() => setSchemaCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(scriptTag);
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  const copyEmail = async () => {
    const email = `Hi,

I'd like to add Schema.org structured data to our website to improve our visibility in AI search results.

Please add the following script tag just before the closing </head> tag on our homepage:

${scriptTag}

This loads our verified TendorAI Schema.org data, which helps AI assistants like ChatGPT and Google find and recommend our business.

You can verify it's working by checking Google's Rich Results Test after deployment.

Thanks`;
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch { /* clipboard not available */ }
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

  const togglePanel = (key: string) => {
    setExpandedPanel(expandedPanel === key ? null : key);
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

  return (
    <div id="schema-generator" className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Schema.org Generator</h3>
          <p className="text-sm text-gray-500 mt-1">Structured data for your website that AI crawlers can read</p>
        </div>
        {tier === 'verified' && (
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
          {/* JSON-LD Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Your JSON-LD Schema</h4>
              <button
                onClick={copySchema}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                {schemaCopied ? 'Copied!' : 'Copy Schema'}
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 max-h-80 overflow-auto">
              <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap break-words">
                {schemaJson}
              </pre>
            </div>
          </div>

          {/* Script Tag */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Auto-Loading Script Tag</h4>
              <button
                onClick={copyScript}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                {scriptCopied ? 'Copied!' : 'Copy Script'}
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4">
              <code className="text-green-400 text-xs font-mono break-all">{scriptTag}</code>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Add this before the closing &lt;/head&gt; tag. The script auto-injects your schema and stays in sync with your TendorAI profile.
            </p>
          </div>

          {/* Installation Instructions (Accordion) */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">How to Install</h4>

            {/* DIY */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => togglePanel('diy')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-sm">Do It Yourself</span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedPanel === 'diy' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedPanel === 'diy' && (
                <div className="px-4 pb-4 text-sm text-gray-600 space-y-3 border-t border-gray-100 pt-3">
                  <p><strong>Option A — Script tag (easiest):</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Copy the script tag above</li>
                    <li>Open your website&apos;s HTML (or CMS header section)</li>
                    <li>Paste it before the closing <code className="bg-gray-100 px-1 rounded">&lt;/head&gt;</code> tag</li>
                    <li>Save and publish</li>
                  </ol>
                  <p className="mt-2"><strong>Option B — Manual JSON-LD:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Copy the JSON-LD schema above</li>
                    <li>Wrap it in <code className="bg-gray-100 px-1 rounded">&lt;script type=&quot;application/ld+json&quot;&gt;...&lt;/script&gt;</code></li>
                    <li>Paste in your page&apos;s <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code></li>
                  </ol>
                </div>
              )}
            </div>

            {/* Send to Dev */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => togglePanel('dev')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-sm">Send to Your Developer</span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedPanel === 'dev' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedPanel === 'dev' && (
                <div className="px-4 pb-4 text-sm text-gray-600 space-y-3 border-t border-gray-100 pt-3">
                  <p>Copy this pre-written email and send it to your web developer:</p>
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700 whitespace-pre-line">
                    {`Hi,\n\nI'd like to add Schema.org structured data to our website to improve our AI visibility.\n\nPlease add this script tag before </head> on our homepage:\n\n${scriptTag}\n\nThis loads our verified TendorAI schema data.\n\nThanks`}
                  </div>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    {emailCopied ? 'Copied!' : 'Copy Email'}
                  </button>
                </div>
              )}
            </div>

            {/* We'll Do It */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => togglePanel('support')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-sm">We&apos;ll Do It For You</span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedPanel === 'support' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedPanel === 'support' && (
                <div className="px-4 pb-4 text-sm text-gray-600 space-y-2 border-t border-gray-100 pt-3">
                  <p>
                    Email us at{' '}
                    <a href="mailto:support@tendorai.com?subject=Schema Installation Request" className="text-purple-600 font-medium hover:underline">
                      support@tendorai.com
                    </a>{' '}
                    with your website login details and we&apos;ll install it for you at no extra charge.
                  </p>
                </div>
              )}
            </div>
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
