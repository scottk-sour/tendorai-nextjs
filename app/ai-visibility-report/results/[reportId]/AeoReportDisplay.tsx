'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  aOrAn,
  getCategoryLabel,
  getCategoryLabelPlural,
  getCategoryLabelTitle,
} from '@/lib/aeo/categoryLabels';

interface Competitor {
  name: string;
  description: string;
  reason?: string | null;
  website?: string | null;
  strengths: string[];
}

interface Gap {
  title: string;
  explanation: string;
}

interface PlatformCompetitor {
  name: string;
  reason?: string | null;
}

interface PlatformResult {
  platform: string;
  platformLabel: string;
  mentioned: boolean | null;
  status?: 'checked' | 'timeout' | 'error';
  position: number | null;
  snippet: string | null;
  competitors: (string | PlatformCompetitor)[];
  error: string | null;
  // Forward-compat field the backend will start emitting. Absent on all
  // existing reports; used only to bucket cards into live-web vs
  // model-knowledge groups (see Fix 2).
  dataSource?: 'live_web' | 'training_data';
}

interface CheckDetail {
  state: 'pass' | 'amber' | 'fail';
  summary: string;
}

interface Report {
  _id: string;
  companyName: string;
  category: string;
  customIndustry?: string | null;
  city: string;
  score: number;
  aiMentioned: boolean;
  aiPosition?: number | null;
  scoreBreakdown?: {
    websiteOptimisation?: number | null;
    contentAuthority?: number | null;
    directoryPresence?: number | null;
    reviewSignals?: number | null;
    structuredData?: number | null;
    competitivePosition?: number | null;
  };
  technicalHealthScore?: number | null;
  technicalHealthBand?: 'Excellent' | 'Good' | 'Needs Work' | 'Critical' | null;
  technicalHealthBreakdown?: SignalBreakdown | null;
  aiVisibilityScore?: number | null;
  aiVisibilityBand?: 'Strong' | 'Moderate' | 'Early Stage' | 'Starting Out' | null;
  aiVisibilityBreakdown?: SignalBreakdown | null;
  searchedCompany?: {
    website?: string | null;
    hasReviews?: boolean | null;
    hasPricing?: boolean | null;
    hasStructuredData?: boolean | null;
    hasDetailedServices?: boolean | null;
    hasSocialMedia?: boolean | null;
    hasGoogleBusiness?: boolean | null;
    googleBusinessDetail?: CheckDetail | null;
    websiteDetail?: CheckDetail | null;
    structuredDataDetail?: CheckDetail | null;
    socialMediaDetail?: CheckDetail | null;
    summary?: string | null;
  };
  competitors: Competitor[];
  gaps: Gap[];
  gapsIdentified?: number;
  competitorsOnTendorAI: number;
  createdAt: string;
  platformResults?: PlatformResult[];
  tier?: string | null;
  profileGaps?: {
    gaps: Array<{
      field: string;
      label: string;
      impact: string;
      tier: 'free' | 'starter' | 'pro';
    }>;
    totalGaps: number;
    totalFields: number;
    completeFields: number;
    hasProfile: boolean;
    vendorType: string;
    isClaimed: boolean;
  };
}

interface Props {
  report: Report;
  pdfUrl: string;
}

function getScoreColor(score: number): string {
  if (score <= 30) return '#C0392B';
  if (score <= 60) return '#D4880F';
  return '#1B4F72';
}

function getScoreLabel(score: number): string {
  if (score <= 20) return 'Critical';
  if (score <= 35) return 'Poor';
  if (score <= 50) return 'Below Average';
  if (score <= 65) return 'Average';
  if (score <= 80) return 'Good';
  return 'Excellent';
}

function ScoreGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [score]);

  const color = getScoreColor(score);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} className="w-full max-w-[200px]" viewBox="0 0 200 200" aria-label="AI visibility score gauge">
        {/* Background circle */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none" stroke="#E5E7EB" strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none" stroke={color} strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
        {/* Score text */}
        <text x="100" y="95" textAnchor="middle" fontSize="48" fontWeight="bold" fill={color}>
          {animatedScore}
        </text>
        <text x="100" y="118" textAnchor="middle" fontSize="14" fill="#6B7280">
          out of 100
        </text>
      </svg>
      <span className="mt-2 text-lg font-bold" style={{ color }}>
        {getScoreLabel(score)}
      </span>
    </div>
  );
}

// Report-check → /aeo-guide/{slug} routing. Every key listed here must
// correspond to an entry in lib/content/aeoGuides.ts. Any check omitted
// passes undefined to CheckItem's guideSlug prop and the "How to fix
// this →" link is hidden entirely.
const REPORT_CHECK_TO_GUIDE: Record<string, string> = {
  customerReviews: 'google-reviews',
  pricingInformation: 'pricing-information',
  structuredData: 'schema-markup',
  detailedServicePages: 'service-pages',
  socialMediaPresence: 'social-media-links',
  googleBusinessProfile: 'google-business-profile',
};

type CheckState = 'pass' | 'amber' | 'fail' | 'not-checked';

function toCheckState(value: boolean | null | undefined): CheckState {
  if (value === null || value === undefined) return 'not-checked';
  return value ? 'pass' : 'fail';
}

function resolveCheckState(value: boolean | null | undefined, detail?: CheckDetail | null): CheckState {
  if (detail?.state) return detail.state;
  return toCheckState(value);
}

const BADGE_BG: Record<CheckState, string> = {
  pass: 'bg-green-600',
  amber: 'bg-amber-500',
  fail: 'bg-red-500',
  'not-checked': 'bg-gray-300',
};

const BADGE_ICON: Record<CheckState, string> = {
  pass: '✓',
  amber: '!',
  fail: '✗',
  'not-checked': '—',
};

const BADGE_ARIA: Record<CheckState, string> = {
  pass: 'Passed',
  amber: 'Needs attention',
  fail: 'Failed',
  'not-checked': 'Not checked',
};

function CheckItem({ label, state, detail, guideSlug }: { label: string; state: CheckState; detail: string; guideSlug?: string }) {
  const labelColor = state === 'not-checked' ? 'text-gray-500' : 'text-gray-900';
  const effectiveDetail = state === 'not-checked' ? 'Check not yet available — coming soon' : detail;

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span
        className={`flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${BADGE_BG[state]}`}
        aria-label={BADGE_ARIA[state]}
      >
        {BADGE_ICON[state]}
      </span>
      <div>
        <div className="flex items-center gap-2">
          <p className={`font-semibold text-sm ${labelColor}`}>{label}</p>
          {state === 'not-checked' && (
            <span className="inline-block text-[10px] uppercase tracking-wide font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
              Not Checked
            </span>
          )}
          {state === 'amber' && (
            <span className="inline-block text-[10px] uppercase tracking-wide font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
              Incomplete
            </span>
          )}
        </div>
        <p className="text-gray-500 text-xs mt-0.5">{effectiveDetail}</p>
        {(state === 'fail' || state === 'amber') && guideSlug && (
          <Link
            href={`/aeo-guide/${guideSlug}`}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1 font-medium"
          >
            How to fix this &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}


function BreakdownBar({ label, score, max = 17 }: { label: string; score: number; max?: number }) {
  const pct = Math.round((score / max) * 100);
  const color = pct <= 29 ? '#C0392B' : pct <= 59 ? '#D4880F' : '#1B4F72';

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

type TechnicalBand = 'Excellent' | 'Good' | 'Needs Work' | 'Critical';
type AiBand = 'Strong' | 'Moderate' | 'Early Stage' | 'Starting Out';
type AnyBand = TechnicalBand | AiBand;

const BAND_PALETTE: Record<AnyBand, { ring: string; chipBg: string; chipText: string }> = {
  Excellent:      { ring: '#16A34A', chipBg: 'bg-green-100',  chipText: 'text-green-800' },
  Strong:         { ring: '#16A34A', chipBg: 'bg-green-100',  chipText: 'text-green-800' },
  Good:           { ring: '#D97706', chipBg: 'bg-amber-100',  chipText: 'text-amber-800' },
  Moderate:       { ring: '#D97706', chipBg: 'bg-amber-100',  chipText: 'text-amber-800' },
  'Needs Work':   { ring: '#EA580C', chipBg: 'bg-orange-100', chipText: 'text-orange-800' },
  'Early Stage':  { ring: '#EA580C', chipBg: 'bg-orange-100', chipText: 'text-orange-800' },
  Critical:       { ring: '#DC2626', chipBg: 'bg-red-100',    chipText: 'text-red-800' },
  'Starting Out': { ring: '#DC2626', chipBg: 'bg-red-100',    chipText: 'text-red-800' },
};

// Signal key → user-facing label. Cover every plausible variant the backend
// might emit (camelCase, snake_case, short forms). Unknown keys still fall
// through to the humaniser below.
const SIGNAL_LABEL_OVERRIDES: Record<string, string> = {
  // SSL
  ssl: 'SSL',
  https: 'SSL',

  // FAQ schema
  faq: 'FAQ Schema',
  faqSchema: 'FAQ Schema',
  faq_schema: 'FAQ Schema',

  // Google Business Profile
  gbp: 'Google Business Profile',
  googleBusiness: 'Google Business Profile',
  google_business: 'Google Business Profile',
  googleBusinessProfile: 'Google Business Profile',
  google_business_profile: 'Google Business Profile',
  hasGoogleBusiness: 'Google Business Profile',

  // Google Maps Presence (a.k.a. "directory presence" / Places listing)
  placesListing: 'Google Maps Presence',
  places_listing: 'Google Maps Presence',
  placesPresence: 'Google Maps Presence',
  places_presence: 'Google Maps Presence',
  googleMapsPresence: 'Google Maps Presence',
  google_maps_presence: 'Google Maps Presence',
  googleMaps: 'Google Maps Presence',
  google_maps: 'Google Maps Presence',
  mapsPresence: 'Google Maps Presence',
  maps_presence: 'Google Maps Presence',
  directoryPresence: 'Google Maps Presence',
  directory_presence: 'Google Maps Presence',

  // AI platform mentions
  aiMentions: 'AI Platform Mentions',
  ai_mentions: 'AI Platform Mentions',
  aiPlatformMentions: 'AI Platform Mentions',
  ai_platform_mentions: 'AI Platform Mentions',
  platformMentions: 'AI Platform Mentions',
  platform_mentions: 'AI Platform Mentions',

  // LocalBusiness schema
  localBusiness: 'LocalBusiness Schema',
  local_business: 'LocalBusiness Schema',
  localBusinessSchema: 'LocalBusiness Schema',
  local_business_schema: 'LocalBusiness Schema',

  // Headings / basic HTML
  h1: 'H1 Heading',
  h1Heading: 'H1 Heading',
  h1_heading: 'H1 Heading',

  // Meta tags
  meta: 'Meta Tags',
  metaTags: 'Meta Tags',
  meta_tags: 'Meta Tags',

  // Viewport
  viewport: 'Mobile Viewport',
  mobileViewport: 'Mobile Viewport',
  mobile_viewport: 'Mobile Viewport',

  // Social
  social: 'Social Media Links',
  socialMedia: 'Social Media Links',
  social_media: 'Social Media Links',
  socialMediaLinks: 'Social Media Links',
  social_media_links: 'Social Media Links',

  // Contact
  contact: 'Contact Information',
  contactInfo: 'Contact Information',
  contact_info: 'Contact Information',
  contactInformation: 'Contact Information',
  contact_information: 'Contact Information',

  // Content depth
  content: 'Content Depth',
  contentDepth: 'Content Depth',
  content_depth: 'Content Depth',

  // Generic schema / structured data
  schema: 'Structured Data (Schema)',
  structuredData: 'Structured Data (Schema)',
  structured_data: 'Structured Data (Schema)',

  // Blog / content hub
  blog: 'Blog / Content Hub',
  blogContent: 'Blog / Content Hub',
  blog_content: 'Blog / Content Hub',
  blogHub: 'Blog / Content Hub',
  blog_hub: 'Blog / Content Hub',
  contentHub: 'Blog / Content Hub',
  content_hub: 'Blog / Content Hub',

  // Reviews (Google)
  reviews: 'Google Reviews',
  googleReviews: 'Google Reviews',
  google_reviews: 'Google Reviews',
  hasReviews: 'Google Reviews',

  // Speed / page performance (likely in tech health)
  speed: 'Page Speed',
  pageSpeed: 'Page Speed',
  page_speed: 'Page Speed',
};

const SIGNAL_ACRONYMS = new Set(['AI', 'API', 'GBP', 'CMS', 'SEO', 'AI visibility', 'CTA', 'LLM', 'URL', 'UK']);

function humaniseSignalKey(key: string): string {
  const override = SIGNAL_LABEL_OVERRIDES[key];
  if (override) return override;
  const spaced = key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
  return spaced
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (SIGNAL_ACRONYMS.has(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function ScoreCard({ title, score, band, description }: {
  title: string;
  score: number;
  band: AnyBand | null | undefined;
  description: string;
}) {
  const palette = band ? BAND_PALETTE[band] : null;
  const colour = palette?.ring ?? '#6B7280';
  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
      <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{title}</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-5xl sm:text-6xl font-bold tabular-nums" style={{ color: colour }}>{score}</span>
        <span className="text-lg text-gray-400 font-medium">/ 100</span>
      </div>
      {band && palette && (
        <span className={`inline-block ${palette.chipBg} ${palette.chipText} text-xs font-semibold px-2.5 py-1 rounded-full mb-3`}>
          {band}
        </span>
      )}
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// Signal weights are split two ways:
//   1. Technical Health is the same across all categories.
//   2. AI Visibility has TWO weight sets — regulated verticals
//      (solicitor / accountant / mortgage adviser / estate agent) follow
//      the original plan. "Other" (the default for non-regulated firms) gets
//      the 10 placesListing points redistributed across the remaining six
//      AI signals (placesListing weight is 0 → row is hidden).
//
// Backend PR #31 emits each signal as a plain earned value; the max is a
// fixed constant per (signal, bucket) pair. Same variant-coverage style as
// SIGNAL_LABEL_OVERRIDES so snake_case and camelCase both resolve.

const REGULATED_CATEGORIES: readonly string[] = [
  // Legal (SRA)
  'conveyancing', 'family-law', 'criminal-law', 'commercial-law',
  'employment-law', 'wills-and-probate', 'immigration', 'personal-injury',
  'solicitor',
  // Accountancy (ICAEW)
  'tax-advisory', 'audit-assurance', 'bookkeeping', 'payroll',
  'corporate-finance', 'business-advisory', 'vat-services',
  'financial-planning', 'accountant',
  // Mortgage (FCA)
  'residential-mortgages', 'buy-to-let', 'remortgage', 'first-time-buyer',
  'equity-release', 'commercial-mortgages', 'protection-insurance',
  'mortgage-advisor', 'mortgage-adviser',
  // Estate agents
  'sales', 'lettings', 'property-management', 'block-management',
  'auctions', 'commercial-property', 'inventory', 'estate-agent',
];

function isRegulatedCategory(category: string): boolean {
  return REGULATED_CATEGORIES.includes(category);
}

const TECH_SIGNAL_WEIGHTS: Record<string, number> = {
  ssl: 15,
  https: 15,

  viewport: 10,
  mobileViewport: 10,
  mobile_viewport: 10,

  meta: 17,
  metaTags: 17,
  meta_tags: 17,

  h1: 10,
  h1Heading: 10,
  h1_heading: 10,

  schema: 13,
  structuredData: 13,
  structured_data: 13,

  social: 10,
  socialMedia: 10,
  social_media: 10,
  socialMediaLinks: 10,
  social_media_links: 10,

  contact: 11,
  contactInfo: 11,
  contact_info: 11,
  contactInformation: 11,
  contact_information: 11,

  content: 14,
  contentDepth: 14,
  content_depth: 14,
};

// Regulated verticals — original plan weights, sum to 100.
const AI_SIGNAL_WEIGHTS_REGULATED: Record<string, number> = {
  faq: 15, faqSchema: 15, faq_schema: 15,

  localBusiness: 15, local_business: 15,
  localBusinessSchema: 15, local_business_schema: 15,

  blog: 10,
  blogContent: 10, blog_content: 10,
  blogHub: 10, blog_hub: 10,
  contentHub: 10, content_hub: 10,

  gbp: 15,
  googleBusiness: 15, google_business: 15,
  googleBusinessProfile: 15, google_business_profile: 15,
  hasGoogleBusiness: 15,

  reviews: 15,
  googleReviews: 15, google_reviews: 15,
  hasReviews: 15,

  placesListing: 10, places_listing: 10,
  placesPresence: 10, places_presence: 10,
  googleMapsPresence: 10, google_maps_presence: 10,
  googleMaps: 10, google_maps: 10,
  mapsPresence: 10, maps_presence: 10,
  directoryPresence: 10, directory_presence: 10,

  aiMentions: 20, ai_mentions: 20,
  aiPlatformMentions: 20, ai_platform_mentions: 20,
  platformMentions: 20, platform_mentions: 20,
};

// "Other" category — placesListing weight redistributed across the remaining
// six signals. Places row is weight=0 and therefore hidden by the renderer.
const AI_SIGNAL_WEIGHTS_OTHER: Record<string, number> = {
  faq: 17, faqSchema: 17, faq_schema: 17,

  localBusiness: 17, local_business: 17,
  localBusinessSchema: 17, local_business_schema: 17,

  blog: 11,
  blogContent: 11, blog_content: 11,
  blogHub: 11, blog_hub: 11,
  contentHub: 11, content_hub: 11,

  gbp: 17,
  googleBusiness: 17, google_business: 17,
  googleBusinessProfile: 17, google_business_profile: 17,
  hasGoogleBusiness: 17,

  reviews: 17,
  googleReviews: 17, google_reviews: 17,
  hasReviews: 17,

  placesListing: 0, places_listing: 0,
  placesPresence: 0, places_presence: 0,
  googleMapsPresence: 0, google_maps_presence: 0,
  googleMaps: 0, google_maps: 0,
  mapsPresence: 0, maps_presence: 0,
  directoryPresence: 0, directory_presence: 0,

  aiMentions: 21, ai_mentions: 21,
  aiPlatformMentions: 21, ai_platform_mentions: 21,
  platformMentions: 21, platform_mentions: 21,
};

function aiSignalWeightsFor(category: string): Record<string, number> {
  return isRegulatedCategory(category) ? AI_SIGNAL_WEIGHTS_REGULATED : AI_SIGNAL_WEIGHTS_OTHER;
}
type SignalBreakdownValue =
  | number
  | {
      weight?: number;
      earned?: number;
      score?: number;
      max?: number;
      points?: number;
      maxPoints?: number;
      possible?: number;
      value?: number;
    }
  | null;
type SignalBreakdown = Record<string, SignalBreakdownValue>;

function toFiniteNumber(x: unknown): number {
  const n =
    typeof x === 'number'
      ? x
      : typeof x === 'string'
        ? Number(x)
        : NaN;
  return Number.isFinite(n) ? n : 0;
}

function resolveSignalValues(
  key: string,
  raw: SignalBreakdownValue,
  weightsMap: Record<string, number>,
): { earned: number; weight: number } {
  // Earned: backend emits a plain number; keep tolerance for object shapes
  // in case a future backend revision embeds max alongside earned.
  const earned = (() => {
    if (raw == null) return 0;
    if (typeof raw === 'number') return toFiniteNumber(raw);
    if (typeof raw !== 'object') return 0;
    if ('earned' in raw && raw.earned !== undefined) return toFiniteNumber(raw.earned);
    if ('score' in raw && raw.score !== undefined) return toFiniteNumber(raw.score);
    if ('points' in raw && raw.points !== undefined) return toFiniteNumber(raw.points);
    if ('value' in raw && raw.value !== undefined) return toFiniteNumber(raw.value);
    return 0;
  })();

  // Weight: prefer an explicit payload max (future-proofing), else use the
  // per-category weights map. A key deliberately set to 0 in the map (e.g.
  // placesListing in "other") is treated as "hide this row".
  let weight = 0;
  let payloadHadWeight = false;
  if (raw && typeof raw === 'object') {
    if ('weight' in raw && raw.weight !== undefined) { weight = toFiniteNumber(raw.weight); payloadHadWeight = true; }
    else if ('max' in raw && raw.max !== undefined) { weight = toFiniteNumber(raw.max); payloadHadWeight = true; }
    else if ('maxPoints' in raw && raw.maxPoints !== undefined) { weight = toFiniteNumber(raw.maxPoints); payloadHadWeight = true; }
    else if ('possible' in raw && raw.possible !== undefined) { weight = toFiniteNumber(raw.possible); payloadHadWeight = true; }
  }
  if (!payloadHadWeight) {
    const fromMap = weightsMap[key];
    if (fromMap !== undefined) weight = fromMap;
  }

  return { earned, weight };
}

function SignalBreakdownList({ breakdown, weights }: {
  breakdown: SignalBreakdown;
  weights: Record<string, number>;
}) {
  const entries = Object.entries(breakdown);
  if (entries.length === 0) {
    return <p className="text-sm text-gray-500">No signal breakdown available.</p>;
  }
  return (
    <ul className="divide-y divide-gray-100">
      {entries.map(([key, value]) => {
        // Explicit hide: weight deliberately set to 0 in the weights map
        // (e.g. placesListing for "other" category, where the 10 points are
        // redistributed across the remaining AI Visibility signals).
        if (weights[key] === 0) return null;

        const { earned, weight } = resolveSignalValues(key, value, weights);
        const label = humaniseSignalKey(key);
        // Fallback: if the map doesn't cover this key or the earned value
        // exceeds the mapped weight (map disagrees with backend reality),
        // render earned-only rather than "X/wrongY".
        const hasWeight = weight > 0 && earned <= weight;
        const pct = hasWeight ? Math.max(0, Math.min(100, (earned / weight) * 100)) : 0;
        const colour = pct >= 80 ? '#16A34A' : pct >= 50 ? '#D97706' : pct >= 25 ? '#EA580C' : '#DC2626';
        return (
          <li key={key} className="py-3">
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">
                {hasWeight ? `${earned}/${weight} points` : `${earned} points`}
              </span>
            </div>
            {hasWeight && (
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: colour }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function getRegulatoryBody(category: string): string {
  const legal = ['conveyancing', 'family-law', 'criminal-law', 'commercial-law', 'employment-law', 'wills-and-probate', 'immigration', 'personal-injury'];
  const accountants = ['tax-advisory', 'audit-assurance', 'bookkeeping', 'payroll', 'corporate-finance', 'business-advisory', 'vat-services', 'financial-planning'];
  const mortgage = ['residential-mortgages', 'buy-to-let', 'remortgage', 'first-time-buyer', 'equity-release', 'commercial-mortgages', 'protection-insurance'];
  const estate = ['sales', 'lettings', 'property-management', 'block-management', 'auctions', 'commercial-property', 'inventory'];

  if (legal.includes(category)) return 'the SRA Solicitors Register';
  if (accountants.includes(category)) return 'the ICAEW directory';
  if (mortgage.includes(category)) return 'the FCA Financial Services Register';
  if (estate.includes(category)) return 'public property directories';
  return 'publicly available business data';
}

const PLATFORM_META: Record<string, { color: string; icon: string }> = {
  perplexity: { color: '#20B8CD', icon: '\uD83D\uDD0D' },
  chatgpt: { color: '#10A37F', icon: '\uD83D\uDCAC' },
  claude: { color: '#D97706', icon: '\uD83E\uDD16' },
  gemini: { color: '#4285F4', icon: '\u2728' },
  grok: { color: '#1D9BF0', icon: '\u26A1' },
  meta: { color: '#0668E1', icon: '\uD83E\uDD99' },
};


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

const INSTRUCTION_VALUES: Record<string, { label: string; value: number }> = {
  conveyancing: { label: '£1,500', value: 1500 },
  'family-law': { label: '£3,000', value: 3000 },
  'criminal-law': { label: '£2,500', value: 2500 },
  'employment-law': { label: '£2,000', value: 2000 },
  'personal-injury': { label: '£4,000', value: 4000 },
  'tax-advisory': { label: '£2,500', value: 2500 },
  bookkeeping: { label: '£800', value: 800 },
  payroll: { label: '£600', value: 600 },
  'audit-assurance': { label: '£3,000', value: 3000 },
  'residential-mortgages': { label: '£500 in proc fees', value: 500 },
  'buy-to-let': { label: '£500 in proc fees', value: 500 },
  remortgage: { label: '£500 in proc fees', value: 500 },
  'first-time-buyer': { label: '£500 in proc fees', value: 500 },
  'equity-release': { label: '£500 in proc fees', value: 500 },
  'commercial-mortgages': { label: '£500 in proc fees', value: 500 },
  'protection-insurance': { label: '£500 in proc fees', value: 500 },
  sales: { label: '£3,500 in commission', value: 3500 },
  lettings: { label: '£3,500 in commission', value: 3500 },
  'property-management': { label: '£3,500 in commission', value: 3500 },
  'block-management': { label: '£3,500 in commission', value: 3500 },
  auctions: { label: '£3,500 in commission', value: 3500 },
  'commercial-property': { label: '£3,500 in commission', value: 3500 },
  inventory: { label: '£3,500 in commission', value: 3500 },
};

function getFirstRealCompetitor(competitors: Competitor[]): Competitor | null {
  const junkPrefixes = ['Ask', 'Asking', 'Consider', 'Try', 'Check', 'Search', 'Look', 'Visit'];
  return competitors.find(c => !junkPrefixes.some(p => c.name.startsWith(p))) || null;
}

// User-supplied city strings arrive lowercase from the form ("cwmbran").
// Title-case for every display site so "Cardiff" and "cwmbran" don't
// coexist in the same sentence. Preserves spaces, hyphens and apostrophes
// so "milton keynes", "stoke-on-trent", "king's lynn" render sensibly.
function titleCaseCity(city: string | null | undefined): string {
  if (!city) return '';
  return city
    .split(/([\s\-'])/)
    .map((part) => {
      if (!part || /^[\s\-']$/.test(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');
}

function getVerticalSpecificField(category: string): string {
  // Solicitor accreditations are practice-area specific — the SRA doesn't
  // issue a single blanket accreditation, so blanketing every legal category
  // with "CQS" was factually wrong for family-law, wills, PI, etc.
  const SOLICITOR_ACCREDITATION: Record<string, string> = {
    'conveyancing': 'CQS accreditation',
    'family-law': 'Resolution membership',
    'wills-and-probate': 'STEP/WIQS accreditation',
    'personal-injury': 'APIL accreditation',
  };
  if (category in SOLICITOR_ACCREDITATION) return SOLICITOR_ACCREDITATION[category];

  const OTHER_SOLICITOR_CATS = ['criminal-law', 'commercial-law', 'employment-law', 'immigration'];
  if (OTHER_SOLICITOR_CATS.includes(category)) return 'specialist accreditations';

  const ACCOUNTANT_CATS = ['tax-advisory', 'audit-assurance', 'bookkeeping', 'payroll', 'corporate-finance', 'business-advisory', 'vat-services', 'financial-planning'];
  const MORTGAGE_CATS = ['residential-mortgages', 'buy-to-let', 'remortgage', 'first-time-buyer', 'equity-release', 'commercial-mortgages', 'protection-insurance'];
  const ESTATE_CATS = ['sales', 'lettings', 'property-management', 'block-management', 'auctions', 'commercial-property', 'inventory'];

  if (ACCOUNTANT_CATS.includes(category)) return 'Xero/QuickBooks certification';
  if (MORTGAGE_CATS.includes(category)) return 'whole of market status';
  if (ESTATE_CATS.includes(category)) return 'average sale time and fees';
  return 'service specialisms';
}

export default function AeoReportDisplay({ report, pdfUrl }: Props) {
  const sc = report.searchedCompany || {};
  const breakdown = report.scoreBreakdown || {};

  const isLegacyScoring =
    (report.technicalHealthScore === null || report.technicalHealthScore === undefined) &&
    (report.aiVisibilityScore === null || report.aiVisibilityScore === undefined);

  const aiVisibilityScore = report.aiVisibilityScore ?? report.score;
  const aiVisibilityBand = report.aiVisibilityBand ?? null;

  // Single source of truth for "did AI actually recommend this firm?". Prefer
  // the top-level flag, then fall back to any live-web platform result
  // explicitly marked mentioned. Model-knowledge (training_data) hits
  // deliberately do not count — the narrative sections fork on live-web
  // evidence, not memory.
  const isRecommended =
    report.aiMentioned === true ||
    (report.platformResults ?? []).some(
      (r) => (!r.dataSource || r.dataSource === 'live_web') && r.mentioned === true,
    );

  // Title-cased once so every display site renders the same value ("cwmbran"
  // typed in the form → "Cwmbran" everywhere).
  const displayCity = titleCaseCity(report.city);

  const [platformOverrides, setPlatformOverrides] = useState<Record<string, PlatformResult>>({});
  const [retryingPlatforms, setRetryingPlatforms] = useState<Record<string, boolean>>({});
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const isFree = !report.tier || report.tier === 'free';

  useEffect(() => {
    if (!isFree || !heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [isFree]);

  const handleRetryPlatform = async (platform: string) => {
    setRetryingPlatforms(prev => ({ ...prev, [platform]: true }));
    try {
      const resp = await fetch(`${API_URL}/api/public/ai-visibility-report/${report._id}/retry-platform`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform }),
      });
      const data = await resp.json();
      if (data.success && data.result) {
        setPlatformOverrides(prev => ({ ...prev, [platform]: data.result }));
      }
    } catch {
      // Retry failed silently — card stays in timeout state
    } finally {
      setRetryingPlatforms(prev => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Sticky upgrade bar — free tier only, visible after scrolling past hero */}
      {isFree && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 bg-purple-700 text-white transition-transform duration-300 ${
            showStickyBar ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <p className="text-sm font-medium">
              Pro: weekly AI monitoring and done-for-you fixes
            </p>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center px-4 py-1.5 bg-white text-purple-700 text-sm font-bold rounded-lg hover:bg-purple-50 transition-colors"
            >
              Book a 15-minute call
            </Link>
          </div>
        </div>
      )}

      {/* Legacy scoring banner — only shown for reports generated under the
          pre-dual-score methodology (i.e. before backend PR #31 shipped). */}
      {isLegacyScoring && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <p className="text-sm text-amber-900 flex-1">
              This report was scored under our previous methodology. Re-run for updated analysis using the new Technical Health + AI Visibility scoring.
            </p>
            <Link
              href="/ai-visibility-report"
              className="flex-shrink-0 inline-flex items-center px-3 py-1.5 bg-amber-700 text-white text-xs font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              Re-run report for updated analysis &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Hero / Score Section */}
      <section ref={heroRef} className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2 text-center">AI Visibility Report</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 text-center">{report.companyName}</h1>
          <p className="text-gray-500 mb-8 text-center">
            {report.category === 'other' ? (report.customIndustry || 'Other') : getCategoryLabelTitle(report.category)} &mdash; {displayCity}
          </p>

          {(() => {
            const topCompetitor = getFirstRealCompetitor(report.competitors);
            const categoryLabel = report.category === 'other'
              ? (report.customIndustry || 'your industry').toLowerCase()
              : getCategoryLabel(report.category);
            const categoryArticle = aOrAn(categoryLabel);
            return (
              <div className="mb-8 text-center sm:text-left">
                {isRecommended ? (
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    When someone in {displayCity} asks AI for {categoryArticle} {categoryLabel},{' '}
                    <span className="text-emerald-700">{report.companyName} was named in this check.</span>
                    {' '}AI assistants can give different answers to the same question, so treat this as a
                    snapshot rather than a fixed position.
                  </p>
                ) : (
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    When someone in {displayCity} asks an AI assistant for {categoryArticle} {categoryLabel} right now &mdash;{' '}
                    <span className="text-red-600">you don&apos;t appear.</span>
                    {topCompetitor && (
                      <> {topCompetitor.name} does. You don&apos;t.</>
                    )}
                  </p>
                )}
              </div>
            );
          })()}

          {isLegacyScoring ? (
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-1 text-center sm:text-left">
                <p className="text-lg font-semibold" style={{ color: getScoreColor(report.score) }}>
                  Your AI Visibility Score: {report.score}/100
                </p>
              </div>
              <div className="flex-shrink-0">
                <ScoreGauge score={report.score} />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <ScoreCard
                  title="Technical Health"
                  score={report.technicalHealthScore ?? 0}
                  band={report.technicalHealthBand ?? null}
                  description="The basics search engines and AI crawlers need to read your site — schema, meta, speed, SSL, and other deterministic signals."
                />
                <ScoreCard
                  title="AI Visibility"
                  score={report.aiVisibilityScore ?? 0}
                  band={report.aiVisibilityBand ?? null}
                  description="Signals AI assistants can read about your firm — Google Business Profile, reviews, directory and platform presence."
                />
              </div>
              <p className="mt-4 text-sm text-gray-600 text-center md:text-left">
                You can score high on one and low on the other — that&apos;s useful. They measure different things and have different fixes.
              </p>
            </div>
          )}

          {/* Quick stats */}
          <div className={`mt-8 grid gap-4 ${isLegacyScoring ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
            {(isLegacyScoring
              ? [
                  { label: 'Your Score', value: `${report.score}/100` },
                  { label: 'Competitors Found', value: String(report.competitors.length) },
                  { label: 'On TendorAI', value: String(report.competitorsOnTendorAI) },
                  // Bound to the array actually rendered under "Your Visibility Gaps"
                  // so the tile can't diverge from the rendered list. gapsIdentified
                  // from the backend is ignored on purpose.
                  { label: 'Gaps Identified', value: String(report.gaps.length) },
                ]
              : [
                  { label: 'Competitors Found', value: String(report.competitors.length) },
                  { label: 'On TendorAI', value: String(report.competitorsOnTendorAI) },
                  // Bound to the array actually rendered under "Your Visibility Gaps"
                  // so the tile can't diverge from the rendered list. gapsIdentified
                  // from the backend is ignored on purpose.
                  { label: 'Gaps Identified', value: String(report.gaps.length) },
                ]
            ).map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                <p className="text-xl font-bold text-[#1B4F72]">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C2 — Estimated Lost Revenue */}
      {(() => {
        const topCompetitor = getFirstRealCompetitor(report.competitors);
        const instrData = INSTRUCTION_VALUES[report.category] || { label: '£2,000', value: 2000 };
        const categoryLabel = report.category === 'other'
          ? (report.customIndustry || 'your industry').toLowerCase()
          : getCategoryLabel(report.category);
        return (
          <section className="max-w-3xl mx-auto px-4 mt-8">
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <p className="text-sm leading-relaxed">
                The average {categoryLabel} instruction is worth <strong>{instrData.label}</strong>.
              </p>
              <p className="text-xs text-gray-400 mt-3">
                Illustrative, based on average {categoryLabel} instruction values &mdash; not measured firm revenue.
              </p>
            </div>
          </section>
        );
      })()}

      <div className="max-w-3xl mx-auto px-4">
        {/* What AI Says About {company} — evidence only. Cards render only
            for platforms actually returned by the backend. Snippets full,
            no line-clamp. No pricing/unlock copy in this section. */}
        {report.platformResults && report.platformResults.length > 0 && (() => {
          const orderedResults = report.platformResults.map(r => platformOverrides[r.platform] ?? r);

          // Split live-web (or unlabelled — treated as live) from
          // training-data assistants. Coverage summary counts live only;
          // model-knowledge assistants are surfaced separately below.
          const liveResults = orderedResults.filter(r => !r.dataSource || r.dataSource === 'live_web');
          const modelResults = orderedResults.filter(r => r.dataSource === 'training_data');

          const liveCheckedResults = liveResults.filter(r => r.status === 'checked' || (!r.status && !r.error));
          const timeoutCount = liveResults.filter(r => r.status === 'timeout' || r.status === 'error').length;

          // "A, B and C" — never announce a platform that wasn't queried.
          // List only live-web platforms; training-data assistants are
          // introduced under their own muted subheading below.
          const platformLabels = liveResults.map(r => r.platformLabel);
          const platformList =
            platformLabels.length === 0
              ? ''
              : platformLabels.length === 1
                ? platformLabels[0]
                : platformLabels.length === 2
                  ? `${platformLabels[0]} and ${platformLabels[1]}`
                  : `${platformLabels.slice(0, -1).join(', ')} and ${platformLabels[platformLabels.length - 1]}`;

          const categoryLabel = report.category === 'other'
            ? (report.customIndustry || 'business').toLowerCase()
            : getCategoryLabel(report.category);
          const categoryArticle = aOrAn(categoryLabel);

          return (
            <section className="mt-10 bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                What AI Says About {report.companyName}
              </h2>
              {platformList && (
                <p className="text-sm text-gray-500 mb-3">
                  We asked {platformList} to recommend {categoryArticle} {categoryLabel} in {displayCity}.
                  Here&apos;s what came back.
                </p>
              )}
              <p className="text-xs text-gray-500 mb-6">
                We asked each assistant the same question: to name up to five real{' '}
                {categoryLabel}s in or near {displayCity}, with no generic advice allowed.
              </p>

              {/* Coverage summary — live-web only. Model-knowledge results
                  are surfaced separately below and do not count toward
                  recommendation coverage. */}
              <div className="mb-6 p-4 rounded-lg bg-gray-50">
                <p className="text-base font-semibold text-gray-900">
                  Here is what each assistant returned when we asked, once, on{' '}
                  {new Date(report.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
                </p>
                {timeoutCount > 0 && (
                  <p className="text-sm text-amber-700 mt-1">
                    {timeoutCount} assistant{timeoutCount !== 1 ? 's' : ''} did not respond in time.
                  </p>
                )}
              </div>

              {/* Evidence cards — live-web results only. */}
              <div className="space-y-4">
                {liveResults.map((result) => {
                  const r = result as PlatformResult;
                  const meta = PLATFORM_META[r.platform] || { color: '#6B7280', icon: '🤖' };
                  const isTimeout = r.status === 'timeout' || r.status === 'error';

                  if (isTimeout) {
                    return (
                      <div key={r.platform} className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{meta.icon}</span>
                            <span className="font-bold text-gray-900">{r.platformLabel}</span>
                          </div>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm font-bold">!</span>
                        </div>
                        <p className="text-sm text-amber-700 font-medium mb-2">
                          Check failed &mdash; {r.platformLabel} did not respond in time
                        </p>
                        <button
                          onClick={() => handleRetryPlatform(r.platform)}
                          disabled={retryingPlatforms[r.platform]}
                          className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-amber-300 bg-white text-amber-700 hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {retryingPlatforms[r.platform] ? 'Retrying…' : 'Retry'}
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div key={r.platform} className="rounded-xl border border-gray-200 bg-white p-5">
                      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xl">{meta.icon}</span>
                          <span className="font-bold text-gray-900">{r.platformLabel}</span>
                          {r.dataSource === 'live_web' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                              Live web search
                            </span>
                          )}
                          {r.dataSource === 'training_data' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                              Model knowledge
                            </span>
                          )}
                        </div>
                        {r.mentioned ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            <span aria-hidden>&#10003;</span> Recommended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            <span aria-hidden>&#10007;</span> Not recommended
                          </span>
                        )}
                      </div>

                      {r.snippet && (
                        <blockquote className="border-l-4 border-gray-200 pl-4 py-1 mb-3 text-sm text-gray-700 whitespace-pre-wrap break-words">
                          {r.snippet}
                        </blockquote>
                      )}

                      {!r.mentioned && r.competitors.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-500 mb-1.5">Recommended instead:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {r.competitors.slice(0, 6).map((c, i) => {
                              const cName = typeof c === 'string' ? c : c.name;
                              const cReason = typeof c === 'string' ? undefined : c.reason || undefined;
                              return (
                                <span
                                  key={`${cName}-${i}`}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                                  title={cReason ?? undefined}
                                >
                                  {cName}{cReason ? ` — ${cReason}` : ''}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {r.mentioned && r.competitors.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-500 mb-1.5">Also mentioned:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {r.competitors.slice(0, 6).map((c, i) => {
                              const cName = typeof c === 'string' ? c : c.name;
                              return (
                                <span
                                  key={`${cName}-${i}`}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                                >
                                  {cName}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Model-knowledge subsection — assistants queried without live
                  web search. Muted so they read as auxiliary, not evidence. */}
              {modelResults.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    We also checked what AI models know about {report.companyName} from their training data.
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    These assistants answered from memory rather than browsing the web.
                  </p>
                  <div className="space-y-3">
                    {modelResults.map((result) => {
                      const r = result as PlatformResult;
                      const meta = PLATFORM_META[r.platform] || { color: '#6B7280', icon: '🤖' };
                      const nothingRecalled = !r.mentioned && r.competitors.length === 0;
                      return (
                        <div key={r.platform} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                          <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{meta.icon}</span>
                              <span className="text-sm font-semibold text-gray-700">{r.platformLabel}</span>
                            </div>
                            {!nothingRecalled && (
                              r.mentioned ? (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-700">
                                  <span aria-hidden>&#10003;</span> In model knowledge
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-200 text-gray-600">
                                  Not in model knowledge
                                </span>
                              )
                            )}
                          </div>

                          {nothingRecalled ? (
                            <p className="text-xs text-gray-500 italic">
                              This model couldn&apos;t name any {categoryLabel}s in {displayCity} from memory.
                            </p>
                          ) : (
                            <>
                              {r.snippet && (
                                <blockquote className="border-l-2 border-gray-300 pl-3 py-0.5 mb-2 text-xs text-gray-600 whitespace-pre-wrap break-words">
                                  {r.snippet}
                                </blockquote>
                              )}
                              {r.competitors.length > 0 && (
                                <div className="mt-1">
                                  <p className="text-[11px] font-medium text-gray-500 mb-1">
                                    {r.mentioned ? 'Also named:' : 'Named instead:'}
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {r.competitors.slice(0, 6).map((c, i) => {
                                      const cName = typeof c === 'string' ? c : c.name;
                                      return (
                                        <span
                                          key={`${cName}-${i}`}
                                          className="text-[11px] bg-white text-gray-600 border border-gray-200 px-1.5 py-0.5 rounded-full"
                                        >
                                          {cName}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          );
        })()}

        {/* What AI Knows */}
        <section className="mt-10 bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">What AI Knows About You</h2>
          <p className="text-sm text-gray-500 mb-6">
            {sc.summary || 'Limited information was found about your company online.'}
          </p>

          <div className="space-y-0">
            {(() => {
              const websiteState = resolveCheckState(sc.website ? true : false, sc.websiteDetail);
              return (
                <CheckItem
                  label="Company Website Found"
                  state={websiteState}
                  detail={
                    sc.websiteDetail?.summary
                      ?? (sc.website ? sc.website : 'No website found')
                  }
                />
              );
            })()}
            <CheckItem
              label="Google Reviews Visible"
              state={toCheckState(sc.hasReviews)}
              detail={sc.hasReviews ? 'Google reviews found on Business Profile' : 'No Google reviews found — ask customers to leave a review'}
              guideSlug={REPORT_CHECK_TO_GUIDE.customerReviews}
            />
            <CheckItem
              label="Pricing Information"
              state={toCheckState(sc.hasPricing)}
              detail={sc.hasPricing ? 'Pricing visible on website' : 'No pricing information found'}
              guideSlug={REPORT_CHECK_TO_GUIDE.pricingInformation}
            />
            {(() => {
              const structuredDataState = resolveCheckState(sc.hasStructuredData, sc.structuredDataDetail);
              return (
                <CheckItem
                  label="Structured Data (Schema.org)"
                  state={structuredDataState}
                  detail={
                    sc.structuredDataDetail?.summary
                      ?? (sc.hasStructuredData ? 'Schema markup detected' : 'No structured data — AI cannot easily parse your site')
                  }
                  guideSlug={REPORT_CHECK_TO_GUIDE.structuredData}
                />
              );
            })()}
            <CheckItem
              label="Detailed Service Pages"
              state={toCheckState(sc.hasDetailedServices)}
              detail={sc.hasDetailedServices ? 'Service pages with detail' : 'Vague or missing service descriptions'}
              guideSlug={REPORT_CHECK_TO_GUIDE.detailedServicePages}
            />
            {(() => {
              const socialMediaState = resolveCheckState(sc.hasSocialMedia, sc.socialMediaDetail);
              return (
                <CheckItem
                  label="Social Media Presence"
                  state={socialMediaState}
                  detail={
                    sc.socialMediaDetail?.summary
                      ?? (sc.hasSocialMedia ? 'Active social profiles found' : 'No active social media found')
                  }
                  guideSlug={REPORT_CHECK_TO_GUIDE.socialMediaPresence}
                />
              );
            })()}
            {(() => {
              const gbpState = resolveCheckState(sc.hasGoogleBusiness, sc.googleBusinessDetail);
              const gbpDetail =
                sc.googleBusinessDetail?.summary
                  ?? (gbpState === 'amber'
                    ? 'Google Business Profile found but incomplete — add opening hours, photos, and description to strengthen AI recommendations'
                    : gbpState === 'pass'
                      ? 'Google Business listing found'
                      : 'No Google Business Profile detected');
              return (
                <CheckItem
                  label="Google Business Profile"
                  state={gbpState}
                  detail={gbpDetail}
                  guideSlug={REPORT_CHECK_TO_GUIDE.googleBusinessProfile}
                />
              );
            })()}
          </div>
        </section>

        {/* SEO vs AI visibility Education */}
        <section className="mt-8 bg-blue-50 rounded-xl border border-blue-100 p-4 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <svg className="w-6 h-6 text-[#1B4F72] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            <h2 className="text-lg font-bold text-[#1B4F72]">Why Your SEO Score Doesn&apos;t Tell the Full Story</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              Your website may perform well on traditional SEO audits &mdash; but that no longer guarantees
              visibility. SEO measures how Google indexes your site. AI Visibility measures
              whether AI actually recommends you.
            </p>
            <p>
              AI recommendation engines like ChatGPT, Perplexity, and Claude don&apos;t just crawl your
              site &mdash; they evaluate structured data, authority signals, verified profiles, and review
              sentiment to decide who to recommend.
            </p>
            <p>
              A business can score 70+ on a website SEO audit and still score under 20 on AI visibility,
              because the signals AI uses are fundamentally different from what traditional SEO tools measure.
            </p>
            <p className="font-medium text-[#1B4F72]">
              This report measures what matters now: whether AI recommends you.
            </p>
          </div>
        </section>

        {/* Score Breakdown — dual under new scoring, legacy 6-bucket otherwise */}
        {isLegacyScoring ? (
          <section className="mt-8 bg-white rounded-xl shadow-sm border p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Score Breakdown</h3>
            <BreakdownBar label="Website Optimisation" score={breakdown.websiteOptimisation || 0} />
            <BreakdownBar label="Content Authority" score={breakdown.contentAuthority || 0} />
            <BreakdownBar label="Google Maps Presence" score={breakdown.directoryPresence || 0} />
            <BreakdownBar label="Review Signals" score={breakdown.reviewSignals || 0} />
            <BreakdownBar label="Structured Data" score={breakdown.structuredData || 0} />
            <BreakdownBar label="Competitive Position" score={breakdown.competitivePosition || 0} />
          </section>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Technical Health Signals</h3>
              <p className="text-xs text-gray-500 mb-4">
                Deterministic HTML-level checks that govern whether crawlers and AI can read your site.
              </p>
              {report.technicalHealthBreakdown ? (
                <SignalBreakdownList breakdown={report.technicalHealthBreakdown} weights={TECH_SIGNAL_WEIGHTS} />
              ) : (
                <p className="text-sm text-gray-500">Signal breakdown unavailable for this report.</p>
              )}
            </section>
            <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">AI Visibility Signals</h3>
              <p className="text-xs text-gray-500 mb-4">
                Signals AI assistants can read about your firm.
              </p>
              {report.aiVisibilityBreakdown ? (
                <SignalBreakdownList breakdown={report.aiVisibilityBreakdown} weights={aiSignalWeightsFor(report.category)} />
              ) : (
                <p className="text-sm text-gray-500">Signal breakdown unavailable for this report.</p>
              )}
            </section>
          </div>
        )}

        {/* Your AI-Readable Signals — measured signals for this firm only.
            No fabricated competitor column; no estimated competitor score. */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your AI-Readable Signals</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-gray-500 font-semibold">Signal</th>
                  <th className="p-3 text-left font-semibold text-gray-900">{report.companyName}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="p-3 text-gray-600">Fees visible to AI</td>
                  <td className="p-3">{
                    report.searchedCompany?.hasPricing === null || report.searchedCompany?.hasPricing === undefined
                      ? <span className="text-gray-400 font-bold" title="Not checked">&mdash;</span>
                      : report.searchedCompany.hasPricing
                        ? <span className="text-green-600 font-bold">&#10003;</span>
                        : <span className="text-red-500 font-bold">&#10007;</span>
                  }</td>
                </tr>
                <tr className="border-t border-gray-100 bg-gray-50">
                  <td className="p-3 text-gray-600">Schema markup detected</td>
                  <td className="p-3">{
                    report.searchedCompany?.hasStructuredData === null || report.searchedCompany?.hasStructuredData === undefined
                      ? <span className="text-gray-400 font-bold" title="Not checked">&mdash;</span>
                      : report.searchedCompany.hasStructuredData
                        ? <span className="text-green-600 font-bold">&#10003;</span>
                        : <span className="text-red-500 font-bold">&#10007;</span>
                  }</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="p-3 text-gray-600">Appears in AI results</td>
                  <td className="p-3">{report.aiMentioned ? <span className="text-green-600 font-bold">&#10003;</span> : <span className="text-red-500 font-bold">&#10007;</span>}</td>
                </tr>
                <tr className="border-t border-gray-100 bg-gray-50">
                  <td className="p-3 text-gray-600">AI Visibility Score</td>
                  <td className="p-3 font-bold" style={{ color: getScoreColor(report.score) }}>{report.score}/100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Other Firms Named in This Check */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            Other Firms Named in This Check
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            {(() => {
              const categoryPlural = report.category === 'other'
                ? (report.customIndustry || 'businesses')
                : getCategoryLabelPlural(report.category);
              if (isRecommended) {
                return `These firms appeared alongside ${report.companyName} when we asked AI for ${categoryPlural} in ${displayCity}.`;
              }
              return `These firms were also named when we asked about ${displayCity}.`;
            })()}
          </p>

          {report.competitors.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {(() => {
                  const competitorLabel = report.category === 'other'
                    ? (report.customIndustry || 'business')
                    : getCategoryLabel(report.category);
                  if (isRecommended) {
                    return (
                      <>
                        AI named {report.companyName} for buyers asking for{' '}
                        {aOrAn(competitorLabel)} {competitorLabel} in {displayCity}. These
                        firms appear in the same set of recommendations &mdash; the gaps below
                        are the signals AI assistants can currently read about you.
                      </>
                    );
                  }
                  return (
                    <>
                      These businesses appear when someone asks AI to recommend{' '}
                      {aOrAn(competitorLabel)} {competitorLabel} in {displayCity}.
                    </>
                  );
                })()}
              </p>

              <div className="space-y-6">
                {report.competitors.map((comp, i) => (
                  <div key={i} className="flex gap-4 p-3 sm:p-4">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-900">{comp.name}</p>
                        {/* Platform pills — green for Perplexity (web search), grey for LLMs */}
                        {comp.strengths.map((s, j) => {
                          const isPerplexity = s.toLowerCase().includes('perplexity');
                          return (
                            <span
                              key={j}
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                isPerplexity
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {s.replace('Mentioned by ', '')}
                            </span>
                          );
                        })}
                      </div>
                      {comp.reason && (
                        <p className="text-xs text-gray-500 mt-0.5">{comp.reason}</p>
                      )}
                      {comp.website && (
                        <a
                          href={comp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#1B4F72] hover:underline break-all"
                        >
                          {comp.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </a>
                      )}
                      <p className="text-sm text-gray-600 mt-1">{comp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-6 text-center bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-600 font-medium">
                No competing firms were named alongside you in this check.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                That may mean AI has little data about firms in {displayCity}, or that this
                particular question surfaced few names.
              </p>
            </div>
          )}
        </section>

        {/* Why AI Isn't Recommending You — static framing that separates the
            evidence above from the fixable gaps below. Never presented as a
            judgement of quality. */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Why AI Isn&apos;t Recommending You</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            This report doesn&apos;t assess the quality of your work, your client service, or your
            reputation. AI assistants don&apos;t know which firm is best &mdash; they recommend the
            firms they can verify and understand.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            In many cases, firms aren&apos;t recommended not because they&apos;re less capable, but
            because AI doesn&apos;t have enough trusted, structured information to recommend them
            confidently. That&apos;s usually improvable &mdash; and the gaps below show exactly
            where to start.
          </p>
        </section>

        {/* Pro sell — single block, positioned after the "Why" framing so the
            gaps section below still reads as evidence rather than upsell.
            Sells the work (installation + monitoring), not the software.
            Deliberately does NOT name Claude/Gemini/Grok/Meta anywhere. */}
        {isFree && report.category !== 'other' && (
          <section className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Pro fixes what this report surfaces</h3>
            <ul className="space-y-2.5 text-sm text-gray-700 mb-5">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">1.</span>
                <span>Install AI-readable structured data on your website.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">2.</span>
                <span>Improve how your services and specialisms are understood by AI.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">3.</span>
                <span>Strengthen the authority signals AI assistants can read.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5 flex-shrink-0">4.</span>
                <span>Weekly monitoring of Perplexity and ChatGPT plus other AI assistants, with alerts when your visibility changes.</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Book a 15-minute call
              </Link>
              <p className="text-xs text-gray-500 italic">
                We promise accurate, verifiable work &mdash; not an AI outcome. Nobody can guarantee what an AI assistant will say.
              </p>
            </div>
          </section>
        )}

        {/* Your Gaps */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Your Visibility Gaps</h2>
          <p className="text-sm text-gray-500 mb-6">
            These are the signals AI assistants can currently read about your firm, and the ones
            they can&apos;t.
          </p>

          <div className="space-y-4">
            {report.gaps.map((gap, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4880F] flex items-center justify-center text-white font-bold text-xs">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{gap.title}</p>
                    <p className="text-gray-600 text-sm mt-1">{gap.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* What this means box — copy keys off aiVisibilityBand under new
              scoring, falls back to legacy score-based copy otherwise. */}
          {(() => {
            // Plural — used inside "ask for X in city", "queries for X in city",
            // "find X in city". For 'other' we don't pluralise the user's free
            // text, since it's typically already an industry name.
            const categoryCopy = report.category === 'other'
              ? (report.customIndustry || 'your industry').toLowerCase()
              : getCategoryLabelPlural(report.category);

            let bodyCopy: React.ReactNode;
            if (isRecommended) {
              // Firm is already surfaced by live-web AI. Do not tell them
              // they're "rarely recommended" or "effectively invisible"
              // regardless of band — the evidence above says otherwise.
              bodyCopy = (
                <>
                  AI named {report.companyName} for some {categoryCopy} queries in{' '}
                  {displayCity} &mdash; the gaps below are the signals AI assistants can currently
                  read about you, and the ones they can&apos;t.
                </>
              );
            } else if (!isLegacyScoring && aiVisibilityBand) {
              const scoreStr = `${aiVisibilityScore}/100`;
              switch (aiVisibilityBand) {
                case 'Strong':
                  bodyCopy = (
                    <>
                      Your AI visibility score of {scoreStr} puts you in a strong position. AI assistants
                      named you in this check when we asked for {categoryCopy} in {displayCity}.
                      Focus now on maintaining momentum — review signals and structured data drift quickly.
                    </>
                  );
                  break;
                case 'Moderate':
                  bodyCopy = (
                    <>
                      With an AI visibility score of {scoreStr}, AI assistants named you in some of
                      this check&apos;s answers but not others. The gaps below are the signals AI
                      assistants can currently read about you.
                    </>
                  );
                  break;
                case 'Early Stage':
                  bodyCopy = (
                    <>
                      With an AI visibility score of {scoreStr}, AI assistants did not name you in this
                      check when we asked for {categoryCopy} in {displayCity}. The gaps below are the
                      signals AI assistants can currently read about you.
                    </>
                  );
                  break;
                case 'Starting Out':
                default:
                  bodyCopy = (
                    <>
                      AI assistants named other firms in this check and did not name you. The gaps
                      below are the signals they can currently read about you.
                    </>
                  );
                  break;
              }
            } else {
              bodyCopy = (
                <>
                  With a score of {report.score}/100, AI assistants named other firms in this check
                  and did not name you. The gaps below are the signals they can currently read about you.
                </>
              );
            }

            return (
              <div className="mt-6 bg-[#1B4F72] rounded-lg p-5 text-white">
                <h3 className="font-bold mb-2">What This Means</h3>
                <p className="text-sm text-blue-100">{bodyCopy}</p>
              </div>
            );
          })()}
        </section>

        {/* Profile Gaps */}
        {report.profileGaps?.hasProfile && report.profileGaps.totalGaps > 0 && (() => {
          const pg = report.profileGaps;
          const pct = Math.round((pg.completeFields / pg.totalFields) * 100);
          const VERTICAL_LABELS: Record<string, string> = {
            solicitor: 'solicitor', accountant: 'accountant',
            'mortgage-advisor': 'mortgage adviser', 'estate-agent': 'estate agent',
            'office-equipment': 'office equipment',
          };
          const verticalLabel = VERTICAL_LABELS[pg.vendorType] || pg.vendorType;
          const freeGapCount = pg.gaps.filter(g => g.tier === 'free').length;

          return (
            <section className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Profile Gaps</h2>
                  <span className="flex-shrink-0 text-sm font-semibold text-gray-500">
                    {pg.completeFields}/{pg.totalFields} fields complete
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-5">
                  Your TendorAI profile is missing {pg.totalGaps} field{pg.totalGaps !== 1 ? 's' : ''}.
                </p>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full rounded-full bg-[#1B4F72] transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Gap list */}
                <div className="space-y-4">
                  {pg.gaps.map((gap, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-500 text-xs font-bold">
                        &#10007;
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 text-sm">{gap.label}</p>
                          {gap.tier === 'free' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">
                              Fix free
                            </span>
                          )}
                          {gap.tier === 'pro' && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">
                              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                              </svg>
                              Pro
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{gap.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="bg-blue-50 border-t border-blue-100 p-6 sm:px-8">
                {!pg.isClaimed ? (
                  <>
                    <p className="text-sm text-gray-700 mb-4">
                      Claim your free profile to fix {freeGapCount} free gap{freeGapCount !== 1 ? 's' : ''} now.
                      Upgrade to Pro and we install everything on your website.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/vendor-signup"
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1B4F72] text-white text-sm font-semibold rounded-lg hover:bg-[#163d5a] transition-colors"
                      >
                        Claim Your Profile &mdash; Free
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Book a 15-minute call
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-700 mb-4">
                      You&apos;ve completed {pg.completeFields} of {pg.totalFields} fields.
                      Fix the remaining {pg.totalGaps}.
                    </p>
                    <Link
                      href="/vendor-dashboard/settings"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1B4F72] text-white text-sm font-semibold rounded-lg hover:bg-[#163d5a] transition-colors"
                    >
                      Complete Your Profile
                    </Link>
                  </>
                )}
              </div>
            </section>
          );
        })()}

        {/* The Shift */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">The Shift: SEO &rarr; AI Visibility</h2>
          <div className="mt-4 space-y-6 text-sm text-gray-600">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Most Firms Are Never Named</h3>
              <p>
                We{' '}
                <Link
                  href="/resources/ai-visibility-report-solicitors-august-2026"
                  className="text-[#1B4F72] underline hover:text-[#163d5a]"
                >
                  measured 1,214 UK solicitors
                </Link>
                {' '}across 17 UK cities in August 2026. 83% were never named once across 40 AI answers
                each. Most firms have never checked which side of that line they&apos;re on.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">What is AI Visibility?</h3>
              <p>
                AI Visibility is the process of making your business visible to AI
                recommendation engines like ChatGPT, Perplexity, Claude, and Google AI Overviews. Unlike
                SEO which optimises for search engine rankings, AI Visibility focuses on structured data, authority
                signals, and verified profiles that AI tools use to make recommendations.
              </p>
            </div>

            {/* SEO vs AI visibility table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 font-semibold"></th>
                    <th className="p-3 font-semibold">Traditional SEO</th>
                    <th className="p-3 font-semibold">AI Visibility</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Goal', 'Rank on Google page 1', 'Be recommended by AI'],
                    ['Format', 'Blue links & snippets', 'Conversational answers'],
                    ['Key Factor', 'Backlinks & keywords', 'Structured data & authority'],
                    ['Visibility', 'Search results page', 'AI chat responses'],
                    ['User Intent', 'Browse multiple results', 'Trust single AI answer'],
                    ['Timeline', 'Established since 1990s', 'Emerging since 2023'],
                  ].map(([label, seo, aeo], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 text-xs sm:text-sm font-semibold text-gray-900">{label}</td>
                      <td className="p-3 text-xs sm:text-sm text-gray-500">{seo}</td>
                      <td className="p-3 text-xs sm:text-sm font-semibold text-[#1B4F72]">{aeo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* C4 — Before/After Pro Explanation */}
        {report.category === 'other' ? (
          <section className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Your industry isn&apos;t on TendorAI yet</h3>
                <p className="text-gray-600">
                  TendorAI doesn&apos;t yet have a dedicated directory for your industry.
                  Join the waitlist and we&apos;ll notify you when we launch.
                </p>
              </div>
              <Link
                href="/vendor-signup"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                Join the Waitlist
              </Link>
            </div>
          </section>
        ) : (
          <section className="mt-8">
            {(() => {
              const topCompetitor = getFirstRealCompetitor(report.competitors);
              const competitorName = topCompetitor?.name || 'your competitors';
              // Search-query phrasing — "AI searches Cardiff estate agents".
              // Always plural here; this branch only fires for non-'other'.
              const categoryLabel = getCategoryLabelPlural(report.category);
              const verticalField = getVerticalSpecificField(report.category);
              return (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Without Pro */}
                    <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Without Pro</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold flex-shrink-0">&#10007;</span>
                          <span>AI searches {displayCity} {categoryLabel}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold flex-shrink-0">&#10007;</span>
                          <span>Can&apos;t find your fees or accreditations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold flex-shrink-0">&#10007;</span>
                          <span>Your structured data is not installed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold flex-shrink-0">&#10007;</span>
                          <span>No weekly tracking of your AI mentions</span>
                        </li>
                      </ul>
                    </div>

                    {/* With Pro */}
                    <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
                      <h3 className="font-bold text-gray-900 mb-4">With Pro</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold flex-shrink-0">&#10003;</span>
                          <span>AI searches {displayCity} {categoryLabel}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold flex-shrink-0">&#10003;</span>
                          <span>Finds your fees, accreditations, {verticalField}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold flex-shrink-0">&#10003;</span>
                          <span>We install AI-readable structured data on your website</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold flex-shrink-0">&#10003;</span>
                          <span>We track your AI mentions weekly and alert you when they change</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-600 text-center">
                    TendorAI installs this data on your website.
                  </p>
                </>
              );
            })()}
          </section>
        )}

        {/* Trust note */}
        <p className="mt-8 text-sm text-gray-500 text-center flex items-center justify-center gap-1.5">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          This report was generated using data from {getRegulatoryBody(report.category)} and live AI analysis of your online presence.
        </p>

        {/* CTA */}
        <section className="mt-8 bg-[#1B4F72] rounded-xl shadow-sm p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Fix Your AI Visibility</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Claim your free TendorAI profile and start appearing in AI recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              {report.category === 'other' ? 'Join the Waitlist' : 'Claim Your Free Profile'}
            </Link>
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Download PDF Report
            </a>
          </div>

          {report.category === 'other' && (
            <p className="mt-4 text-sm text-blue-200">
              TendorAI doesn&apos;t yet have a dedicated directory for your industry. Join the waitlist and we&apos;ll notify you when we launch.
            </p>
          )}

          {/* Pricing summary */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <div className="rounded-xl p-6 bg-white/10 flex flex-col">
              <p className="font-bold text-lg">Free</p>
              <p className="text-2xl font-bold my-1">&pound;0<span className="text-sm font-normal text-blue-200">/forever</span></p>
              <p className="text-xs text-blue-200 mt-2 flex-1">
                Claim your profile. Get listed in the TendorAI directory and visible to AI crawlers with your basic SRA/FCA details.
              </p>
              <a
                href="/vendor-signup?plan=free"
                className="mt-4 block text-center px-4 py-2 rounded-lg border border-white/30 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Claim Your Free Profile
              </a>
            </div>

            {/* Pro — Most Popular */}
            <div className="rounded-xl p-6 bg-white text-[#1B4F72] ring-2 ring-white flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-[#1B4F72] text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wide">
                Most Popular
              </span>
              <p className="font-bold text-lg text-[#1B4F72]">Pro</p>
              <p className="text-2xl font-bold my-1 text-[#1B4F72]">Pricing on request</p>
              <p className="text-xs text-gray-500 mt-2 flex-1">
                We install AI-optimised data on your website, track your AI mentions weekly, and give you a Verified badge.
              </p>
              <p className="text-[10px] text-gray-400 mt-1 italic">We promise accurate, verifiable work &mdash; not an AI outcome. Nobody can guarantee what an AI assistant will say.</p>
              <Link
                href="/contact"
                className="mt-4 block text-center px-4 py-2 rounded-lg bg-[#1B4F72] text-white text-sm font-semibold hover:bg-[#163d5a] transition-colors"
              >
                Book a 15-minute call
              </Link>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Report generated {new Date(report.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by TendorAI.
          This report analyses your company&apos;s visibility to AI recommendation engines.
        </p>
      </div>
    </main>
  );
}
