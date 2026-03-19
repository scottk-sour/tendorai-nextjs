'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { hasTierAccess } from './TierGate';

const CHECK_TO_GUIDE: Record<string, string> = {
  schema: 'schema-markup',
  meta: 'meta-titles',
  h1: 'h1-heading',
  viewport: 'mobile-viewport',
  ssl: 'ssl-certificate',
  speed: 'page-weight',
  social: 'social-media-links',
  contact: 'contact-information',
  faq: 'faq-section',
  content: 'content-length',
};

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

interface AeoCheck {
  name: string;
  key: string;
  score: number;
  maxScore: number;
  passed: boolean;
  details: string;
  recommendation: string;
}

interface AuditResult {
  id: string;
  websiteUrl: string;
  overallScore: number;
  checks: AeoCheck[];
  recommendations: string[];
  tendoraiSchemaDetected?: boolean;
  createdAt: string;
}

interface AeoAuditCardProps {
  token: string;
  tier: string;
  vendorWebsite: string;
}

const ALL_SOCIALS = ['Facebook', 'Twitter/X', 'LinkedIn', 'Instagram', 'YouTube'];

function parseMissingSocials(details: string): string[] {
  if (!details || details === 'No social media links detected') return ALL_SOCIALS;
  const foundMatch = details.match(/^Found:\s*(.+)$/i);
  if (!foundMatch) return ALL_SOCIALS;
  const found = foundMatch[1].split(',').map(s => s.trim().toLowerCase());
  return ALL_SOCIALS.filter(s => !found.some(f => f === s.toLowerCase()));
}

const SOCIAL_PLACEHOLDER_URLS: Record<string, string> = {
  Facebook: 'https://facebook.com/YOUR_PAGE',
  'Twitter/X': 'https://x.com/YOUR_HANDLE',
  LinkedIn: 'https://linkedin.com/company/YOUR_COMPANY',
  Instagram: 'https://instagram.com/YOUR_HANDLE',
  YouTube: 'https://youtube.com/@YOUR_CHANNEL',
};

const PLATFORM_INSTRUCTIONS: Record<string, string[]> = {
  WordPress: [
    'Log in to your WordPress admin dashboard.',
    'Go to Appearance > Widgets (or Appearance > Customize > Widgets).',
    'Find the footer widget area and add a "Social Icons" or "Custom HTML" widget.',
    'If your theme has a social media settings page (many do), check Appearance > Theme Options or Customize > Social Links.',
    'Add the URL for each missing platform and save.',
  ],
  Wix: [
    'Open the Wix Editor for your site.',
    'Click Add (+) in the left toolbar.',
    'Search for "Social Bar" and drag it into your footer or header.',
    'Click the social bar to edit — add icons for each missing platform.',
    'Paste your profile URLs and publish.',
  ],
  Squarespace: [
    'Log in to your Squarespace dashboard.',
    'Go to Pages and click the footer area (or Design > Site Styles > Footer).',
    'Add a Social Links block — click Add Block > Social Links.',
    'In the block settings, add each missing platform with your profile URL.',
    'Save and publish your changes.',
  ],
  Webflow: [
    'Open your site in the Webflow Designer.',
    'Navigate to your footer section (or the global symbol if you use one).',
    'Add a Link Block or Text Link element for each missing platform.',
    'Set the URL to your profile page and add an aria-label for accessibility.',
    'Publish your site to make the changes live.',
  ],
};

function parseMetaDetails(details: string): { titleChars: number; titleGood: boolean; descChars: number; descGood: boolean } {
  const titleMatch = details.match(/Title:\s*(\d+)\s*chars/i);
  const descMatch = details.match(/Description:\s*(\d+)\s*chars/i);
  const titleChars = titleMatch ? parseInt(titleMatch[1], 10) : 0;
  const descChars = descMatch ? parseInt(descMatch[1], 10) : 0;
  return {
    titleChars,
    titleGood: details.includes('Title:') && details.split('Description')[0].includes('(good)'),
    descChars,
    descGood: details.includes('Description:') && details.split('Description')[1]?.includes('(good)') || false,
  };
}

const META_PLATFORM_INSTRUCTIONS: Record<string, string[]> = {
  WordPress: [
    'Open your page in the WordPress editor.',
    'Install Yoast SEO or Rank Math if not already installed.',
    'Scroll down below the editor to the SEO plugin section.',
    'Fill in the SEO Title field (20–70 characters).',
    'Fill in the Meta Description field (50–160 characters).',
    'Click Update/Publish to save.',
  ],
  Wix: [
    'Open the Wix Editor for your site.',
    'Click the page you want to edit.',
    'Click the three dots menu next to the page name.',
    'Select SEO Settings.',
    'Fill in the Page Title and Description fields.',
    'Save and publish.',
  ],
  Squarespace: [
    'Open Pages in your Squarespace dashboard.',
    'Click the gear icon next to the page you want to edit.',
    'Go to the SEO tab.',
    'Fill in the SEO Title (20–70 characters).',
    'Fill in the SEO Description (50–160 characters).',
    'Save your changes.',
  ],
  Webflow: [
    'Open the page in the Webflow Designer.',
    'Click the page settings cog (gear icon) in the Pages panel.',
    'Scroll to SEO Settings.',
    'Fill in the Title Tag (20–70 characters).',
    'Fill in the Meta Description (50–160 characters).',
    'Publish your site.',
  ],
};

function MetaFixWizard({
  details,
  platform,
  setPlatform,
  onRerun,
  loading,
}: {
  details: string;
  platform: string | null;
  setPlatform: (p: string | null) => void;
  onRerun: () => void;
  loading: boolean;
}) {
  const [snippetCopied, setSnippetCopied] = useState(false);
  const { titleChars, titleGood, descChars, descGood } = parseMetaDetails(details);

  const snippet = `<head>
  <title>YOUR_BUSINESS_NAME — YOUR_SERVICES in YOUR_LOCATION</title>
  <meta name="description" content="YOUR_DESCRIPTION — include your services, location, and a call to action. Aim for 50–160 characters." />
</head>`;

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = snippet;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 2000);
  };

  return (
    <div className="mt-3 space-y-3">
      {/* Status for each */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          {titleGood ? (
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className={`text-xs font-medium ${titleGood ? 'text-green-700' : 'text-red-700'}`}>
            {titleGood
              ? `Title looks good (${titleChars} chars)`
              : titleChars === 0
                ? 'Title missing'
                : `Title ${titleChars < 20 ? 'too short' : 'too long'} (${titleChars} chars — needs 20–70)`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {descGood ? (
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className={`text-xs font-medium ${descGood ? 'text-green-700' : 'text-red-700'}`}>
            {descGood
              ? `Description looks good (${descChars} chars)`
              : descChars === 0
                ? 'Description missing'
                : `Description ${descChars < 50 ? 'too short' : 'too long'} (${descChars} chars — needs 50–160)`}
          </span>
        </div>
      </div>

      {/* Platform selection */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">What platform is your website built on?</p>
        <div className="flex flex-wrap gap-2">
          {['WordPress', 'Wix', 'Squarespace', 'Webflow', 'Other'].map(p => (
            <button
              key={p}
              onClick={() => setPlatform(platform === p ? null : p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                platform === p
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p === 'Other' ? 'Other / Send to developer' : p}
            </button>
          ))}
        </div>
      </div>

      {/* CMS instructions */}
      {platform && platform !== 'Other' && META_PLATFORM_INSTRUCTIONS[platform] && (
        <div className="bg-purple-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-purple-900 mb-2">How to fix meta tags in {platform}:</p>
          <ol className="space-y-1.5 list-decimal list-inside marker:font-bold marker:text-purple-500">
            {META_PLATFORM_INSTRUCTIONS[platform].map((step, i) => (
              <li key={i} className="text-xs text-purple-800">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* HTML snippet for developer */}
      {platform === 'Other' && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Copy this HTML and send to your developer:</p>
            <button
              onClick={copySnippet}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              {snippetCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs bg-white border border-gray-200 rounded p-2 overflow-x-auto font-mono text-gray-800 whitespace-pre-wrap">
            {snippet}
          </pre>
          <p className="text-[10px] text-gray-500 mt-1.5">Replace the placeholder text with your actual business details. This goes inside the &lt;head&gt; tag of your HTML.</p>
        </div>
      )}

      {/* Example */}
      {platform && (
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-900 mb-1.5">Example (for reference only):</p>
          <p className="text-xs text-blue-800"><strong>Title:</strong> Smith &amp; Co Solicitors &mdash; Conveyancing &amp; Family Law in Cardiff</p>
          <p className="text-xs text-blue-800 mt-1"><strong>Description:</strong> Regulated solicitors in Cardiff offering conveyancing, family law and wills &amp; probate. SRA-regulated, free initial consultation. Call us today.</p>
        </div>
      )}

      {/* Re-run button */}
      {platform && (
        <button
          onClick={onRerun}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Re-running audit...
            </>
          ) : (
            'Mark as done & re-run audit'
          )}
        </button>
      )}
    </div>
  );
}

const FAQ_PLATFORM_INSTRUCTIONS: Record<string, string[]> = {
  WordPress: [
    'Go to Pages and edit your main page.',
    'Click the + button to add a new block.',
    'Choose an Accordion or FAQ block (or use your theme\'s built-in FAQ section).',
    'Add 4–6 questions and answers about your services.',
    'Save and publish.',
  ],
  Wix: [
    'Open the Wix Editor for your site.',
    'Click Add (+) in the left toolbar.',
    'Choose Interactive → Accordion.',
    'Add your FAQ questions and answers.',
    'Save and publish.',
  ],
  Squarespace: [
    'Edit your page in Squarespace.',
    'Click Add Block.',
    'Choose Accordion.',
    'Add your FAQ questions and answers.',
    'Save your changes.',
  ],
  Webflow: [
    'Open the page in the Webflow Designer.',
    'Add a new section to your page.',
    'Use a FAQ component from your template, or add a div with class "faq-section".',
    'Add question/answer pairs inside.',
    'Publish your site.',
  ],
};

const FAQ_HTML_SNIPPET = `<section id="faq">
  <h2>Frequently Asked Questions</h2>
  <details>
    <summary>How much does conveyancing cost?</summary>
    <p>Our fixed-fee conveyancing starts from £X. Contact us for an exact quote.</p>
  </details>
  <details>
    <summary>How long does the process take?</summary>
    <p>The average timeline is 8–12 weeks, depending on the complexity of your case.</p>
  </details>
  <details>
    <summary>Are you SRA regulated?</summary>
    <p>Yes — we are fully regulated by the Solicitors Regulation Authority.</p>
  </details>
</section>`;

const FAQ_SCHEMA_SNIPPET = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "YOUR FIRST QUESTION HERE",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YOUR ANSWER HERE"
      }
    },
    {
      "@type": "Question",
      "name": "YOUR SECOND QUESTION HERE",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YOUR ANSWER HERE"
      }
    }
  ]
}
</script>`;

const CONTACT_PLATFORM_INSTRUCTIONS: Record<string, string> = {
  WordPress: 'Go to Appearance → Widgets → Footer widget area → add a Text or HTML widget with your contact details.',
  Wix: 'Open the Wix Editor → click on your footer → add a Text element with your contact details.',
  Squarespace: 'Go to Pages → Footer → add a Text block with your contact details.',
  Webflow: 'Open the footer section in the Webflow Designer → add a text element with your contact details.',
};

const CONTACT_HTML_SNIPPET = `<footer>
  <p>Call us: <a href="tel:YOUR_PHONE">YOUR_PHONE</a></p>
  <p>Email: <a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a></p>
  <p>YOUR_ADDRESS</p>
</footer>`;

function parseContactDetails(details: string): { phone: boolean; email: boolean; address: boolean } {
  return {
    phone: /Phone:\s*yes/i.test(details),
    email: /Email:\s*yes/i.test(details),
    address: /Address:\s*yes/i.test(details),
  };
}

function ContactFixWizard({
  details,
  platform,
  setPlatform,
  onRerun,
  loading,
}: {
  details: string;
  platform: string | null;
  setPlatform: (p: string | null) => void;
  onRerun: () => void;
  loading: boolean;
}) {
  const [snippetCopied, setSnippetCopied] = useState(false);
  const { phone, email, address } = parseContactDetails(details);

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_HTML_SNIPPET);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = CONTACT_HTML_SNIPPET;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 2000);
  };

  const statusIcon = (ok: boolean) => ok ? (
    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="mt-3 space-y-3">
      {/* Status rows */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          {statusIcon(phone)}
          <span className={`text-xs font-medium ${phone ? 'text-green-700' : 'text-red-700'}`}>
            {phone ? 'Phone number detected' : 'Phone number missing'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {statusIcon(email)}
          <span className={`text-xs font-medium ${email ? 'text-green-700' : 'text-red-700'}`}>
            {email ? 'Email address detected' : 'Email address missing'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {statusIcon(address)}
          <span className={`text-xs font-medium ${address ? 'text-green-700' : 'text-red-700'}`}>
            {address ? 'Address detected' : 'Address missing'}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-700">
        AI assistants use contact details to verify your business is real and legitimate &mdash; missing details reduce your chances of being recommended.
      </p>

      {/* Fix instructions per missing item */}
      {(!phone || !email || !address) && (
        <div className="bg-purple-50 rounded-lg p-3 space-y-3">
          <p className="text-xs font-semibold text-purple-900">How to fix:</p>

          {!phone && (
            <div>
              <p className="text-xs font-semibold text-purple-800 mb-1">Phone number</p>
              <ul className="space-y-1">
                <li className="text-xs text-purple-800">&bull; Add your phone number visibly on your homepage and contact page.</li>
                <li className="text-xs text-purple-800">&bull; Use the full format including area code, e.g. 029 2000 0000 or +44 29 2000 0000.</li>
                <li className="text-xs text-purple-800">&bull; Do not hide it in an image &mdash; it must be real text in the HTML.</li>
              </ul>
            </div>
          )}

          {!email && (
            <div>
              <p className="text-xs font-semibold text-purple-800 mb-1">Email address</p>
              <ul className="space-y-1">
                <li className="text-xs text-purple-800">&bull; Add your email address as a visible mailto: link on your homepage and contact page.</li>
                <li className="text-xs text-purple-800">&bull; Example: <code className="text-[11px] bg-white px-1 rounded">&lt;a href=&quot;mailto:info@yourfirm.co.uk&quot;&gt;info@yourfirm.co.uk&lt;/a&gt;</code></li>
                <li className="text-xs text-purple-800">&bull; Do not use a contact form as a replacement &mdash; the actual email address must appear in the HTML.</li>
              </ul>
            </div>
          )}

          {!address && (
            <div>
              <p className="text-xs font-semibold text-purple-800 mb-1">Address</p>
              <ul className="space-y-1">
                <li className="text-xs text-purple-800">&bull; Add your full office address as visible text on your homepage or footer.</li>
                <li className="text-xs text-purple-800">&bull; Include street, town/city, and postcode.</li>
                <li className="text-xs text-purple-800">&bull; Example: 1 Park Street, Cardiff, CF10 1AB</li>
                <li className="text-xs text-purple-800">&bull; This does not need to be a Google Maps embed &mdash; plain text is sufficient.</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Platform selection */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">What platform is your website built on?</p>
        <div className="flex flex-wrap gap-2">
          {['WordPress', 'Wix', 'Squarespace', 'Webflow', 'Other'].map(p => (
            <button
              key={p}
              onClick={() => setPlatform(platform === p ? null : p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                platform === p
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p === 'Other' ? 'Other / Send to developer' : p}
            </button>
          ))}
        </div>
      </div>

      {/* CMS instruction */}
      {platform && platform !== 'Other' && CONTACT_PLATFORM_INSTRUCTIONS[platform] && (
        <div className="bg-purple-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-purple-900 mb-1">Where to add contact details in {platform}:</p>
          <p className="text-xs text-purple-800">{CONTACT_PLATFORM_INSTRUCTIONS[platform]}</p>
        </div>
      )}

      {/* HTML snippet for developer */}
      {platform === 'Other' && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Copy this HTML and send to your developer:</p>
            <button
              onClick={copySnippet}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              {snippetCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs bg-white border border-gray-200 rounded p-2 overflow-x-auto font-mono text-gray-800 whitespace-pre-wrap">
            {CONTACT_HTML_SNIPPET}
          </pre>
          <p className="text-[10px] text-gray-500 mt-1.5">Replace YOUR_PHONE, YOUR_EMAIL, and YOUR_ADDRESS with your actual details. Add this to your website footer.</p>
        </div>
      )}

      {/* Tip */}
      {platform && (
        <p className="text-[10px] text-gray-500">
          Tip: adding your contact details to your footer means they appear on every page of your site &mdash; which is ideal.
        </p>
      )}

      {/* Re-run button */}
      {platform && (
        <button
          onClick={onRerun}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Re-running audit...
            </>
          ) : (
            'Mark as done & re-run audit'
          )}
        </button>
      )}
    </div>
  );
}

function FaqFixWizard({
  details,
  score,
  platform,
  setPlatform,
  onRerun,
  loading,
}: {
  details: string;
  score: number;
  platform: string | null;
  setPlatform: (p: string | null) => void;
  onRerun: () => void;
  loading: boolean;
}) {
  const [snippetCopied, setSnippetCopied] = useState<string | null>(null);
  const hasSection = details.includes('FAQ section found');

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setSnippetCopied(label);
    setTimeout(() => setSnippetCopied(null), 2000);
  };

  // SCENARIO B — has FAQ section, needs schema
  if (hasSection) {
    return (
      <div className="mt-3 space-y-3">
        <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2">
          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium text-green-700">You have an FAQ section &mdash; great start. You&apos;re at {score}/10.</span>
        </div>

        <p className="text-xs text-gray-700">
          To reach 10/10 you need FAQPage schema added to your HTML. This tells AI crawlers exactly which content are questions and answers, making it far more likely they&apos;ll pull your FAQs into responses.
        </p>

        {/* Option 1 — Pro */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-purple-900 mb-1">Recommended: let TendorAI handle it</p>
          <p className="text-xs text-purple-800">
            TendorAI Pro installs FAQPage schema on your site automatically &mdash; no developer needed.
          </p>
          <a
            href="/vendor-dashboard/settings?tab=subscription"
            className="inline-flex items-center mt-2 text-xs font-semibold text-purple-600 hover:text-purple-700"
          >
            Upgrade to Pro
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Option 2 — DIY schema */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Do it yourself &mdash; add FAQPage schema:</p>
            <button
              onClick={() => copyText(FAQ_SCHEMA_SNIPPET, 'schema')}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              {snippetCopied === 'schema' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs bg-white border border-gray-200 rounded p-2 overflow-x-auto font-mono text-gray-800 whitespace-pre-wrap">
            {FAQ_SCHEMA_SNIPPET}
          </pre>
          <p className="text-[10px] text-gray-500 mt-1.5">
            Paste this before the &lt;/body&gt; tag on your page. Replace the example questions with your actual FAQ content.
          </p>
        </div>

        <button
          onClick={onRerun}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Re-running audit...
            </>
          ) : (
            'Mark as done & re-run audit'
          )}
        </button>
      </div>
    );
  }

  // SCENARIO A — no FAQ at all
  return (
    <div className="mt-3 space-y-3">
      <p className="text-xs text-gray-700">
        AI assistants like ChatGPT and Perplexity pull answers directly from FAQ sections &mdash; firms with FAQs are far more likely to be recommended.
      </p>

      {/* Platform selection */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">What platform is your website built on?</p>
        <div className="flex flex-wrap gap-2">
          {['WordPress', 'Wix', 'Squarespace', 'Webflow', 'Other'].map(p => (
            <button
              key={p}
              onClick={() => setPlatform(platform === p ? null : p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                platform === p
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p === 'Other' ? 'Other / Send to developer' : p}
            </button>
          ))}
        </div>
      </div>

      {/* CMS instructions */}
      {platform && platform !== 'Other' && FAQ_PLATFORM_INSTRUCTIONS[platform] && (
        <div className="bg-purple-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-purple-900 mb-2">How to add an FAQ section in {platform}:</p>
          <ol className="space-y-1.5 list-decimal list-inside marker:font-bold marker:text-purple-500">
            {FAQ_PLATFORM_INSTRUCTIONS[platform].map((step, i) => (
              <li key={i} className="text-xs text-purple-800">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* HTML snippet for developer */}
      {platform === 'Other' && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Copy this HTML and send to your developer:</p>
            <button
              onClick={() => copyText(FAQ_HTML_SNIPPET, 'html')}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              {snippetCopied === 'html' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs bg-white border border-gray-200 rounded p-2 overflow-x-auto font-mono text-gray-800 whitespace-pre-wrap">
            {FAQ_HTML_SNIPPET}
          </pre>
          <p className="text-[10px] text-gray-500 mt-1.5">Replace the example questions and answers with your own. Add this to your main page.</p>
        </div>
      )}

      {/* Example questions */}
      {platform && (
        <>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-900 mb-1.5">Example FAQ questions (for reference only):</p>
            <ul className="space-y-1">
              <li className="text-xs text-blue-800">&bull; How much does conveyancing cost?</li>
              <li className="text-xs text-blue-800">&bull; How long does conveyancing take?</li>
              <li className="text-xs text-blue-800">&bull; Are you SRA regulated?</li>
              <li className="text-xs text-blue-800">&bull; Do you offer a free initial consultation?</li>
              <li className="text-xs text-blue-800">&bull; What areas do you cover?</li>
            </ul>
          </div>

          {/* Pro upsell */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-xs text-purple-800">
              <strong>Want the full 10/10?</strong> TendorAI Pro automatically adds FAQPage schema to your site &mdash; upgrade to get full marks.
            </p>
            <a
              href="/vendor-dashboard/settings?tab=subscription"
              className="inline-flex items-center mt-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700"
            >
              Upgrade to Pro
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <button
            onClick={onRerun}
            disabled={loading}
            className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Re-running audit...
              </>
            ) : (
              'Mark as done & re-run audit'
            )}
          </button>
        </>
      )}
    </div>
  );
}

function SpeedFixWizard({
  details,
  score,
  onRerun,
  loading,
}: {
  details: string;
  score: number;
  onRerun: () => void;
  loading: boolean;
}) {
  const kbMatch = details.match(/(\d+)KB/);
  const sizeKb = kbMatch ? parseInt(kbMatch[1], 10) : null;

  const severity = score >= 8
    ? "You're close — minor tweaks will get you to 10/10"
    : score >= 5
      ? "Acceptable but improvable — here's what to do"
      : 'Your HTML is heavy — this needs attention';

  const severityColour = score >= 8 ? 'text-green-700 bg-green-50' : score >= 5 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';

  return (
    <div className="mt-3 space-y-3">
      {/* Size + target */}
      {sizeKb !== null && (
        <p className="text-sm font-semibold text-gray-900">
          Your page HTML is {sizeKb}KB &mdash; the target is under 100KB
        </p>
      )}

      {/* Severity */}
      <p className={`text-xs font-medium rounded p-2 ${severityColour}`}>{severity}</p>

      {/* Fix steps */}
      <div className="bg-purple-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-purple-900 mb-2">How to reduce HTML size:</p>
        <ol className="space-y-2 list-decimal list-inside marker:font-bold marker:text-purple-500">
          <li className="text-xs text-purple-800">
            <strong>Remove inline CSS</strong> and move styles to a separate stylesheet. Inline CSS means style rules written directly in your HTML tags (e.g. <code className="text-[11px] bg-white px-1 rounded">style=&quot;color:red&quot;</code>) — these bloat the HTML file.
          </li>
          <li className="text-xs text-purple-800">
            <strong>Remove inline JavaScript</strong> and move scripts to external .js files. Large script blocks inside your HTML add significant weight.
          </li>
          <li className="text-xs text-purple-800">
            <strong>Minify your HTML</strong> — remove comments, extra whitespace, and line breaks. Use a free tool like <a href="https://www.willpeavy.com/tools/minifier/" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline hover:text-purple-700">willpeavy.com/tools/minifier</a>.
          </li>
          <li className="text-xs text-purple-800">
            <strong>Check for tracking script bloat</strong> — tag managers (Google Tag Manager, HubSpot, etc.) often inject large blocks of HTML. Review what&apos;s being pasted directly into your page.
          </li>
          <li className="text-xs text-purple-800">
            <strong>If on WordPress</strong>, install <strong>WP Rocket</strong> or <strong>Autoptimize</strong> — both can minify and defer HTML/CSS/JS automatically.
          </li>
          <li className="text-xs text-purple-800">
            Run a full page speed test at <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline hover:text-purple-700">pagespeed.web.dev</a> to identify the biggest issues across your whole page.
          </li>
        </ol>
      </div>

      {/* Note */}
      <p className="text-[10px] text-gray-500">
        Note: this score only measures your HTML file size. Images, CSS and JavaScript are not included in this check.
      </p>

      {/* Re-run button */}
      <button
        onClick={onRerun}
        disabled={loading}
        className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Re-running audit...
          </>
        ) : (
          'Mark as done & re-run audit'
        )}
      </button>
    </div>
  );
}

function SocialFixWizard({
  details,
  platform,
  setPlatform,
  onRerun,
  loading,
}: {
  details: string;
  platform: string | null;
  setPlatform: (p: string | null) => void;
  onRerun: () => void;
  loading: boolean;
}) {
  const [snippetCopied, setSnippetCopied] = useState(false);
  const missing = parseMissingSocials(details);

  if (missing.length === 0) return null;

  const snippet = missing
    .map(s => `<a href="${SOCIAL_PLACEHOLDER_URLS[s]}" target="_blank" rel="noopener noreferrer">${s}</a>`)
    .join('\n');

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = snippet;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 2000);
  };

  return (
    <div className="mt-3 space-y-3">
      {/* Missing platforms */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">Missing from your site:</p>
        <div className="flex flex-wrap gap-1.5">
          {missing.map(s => (
            <span key={s} className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">{s}</span>
          ))}
        </div>
      </div>

      {/* Platform selection */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">What platform is your website built on?</p>
        <div className="flex flex-wrap gap-2">
          {['WordPress', 'Wix', 'Squarespace', 'Webflow', 'Other'].map(p => (
            <button
              key={p}
              onClick={() => setPlatform(platform === p ? null : p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                platform === p
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p === 'Other' ? 'Other / Send to developer' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions for CMS platforms */}
      {platform && platform !== 'Other' && PLATFORM_INSTRUCTIONS[platform] && (
        <div className="bg-purple-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-purple-900 mb-2">How to add social links in {platform}:</p>
          <ol className="space-y-1.5">
            {PLATFORM_INSTRUCTIONS[platform].map((step, i) => (
              <li key={i} className="text-xs text-purple-800 flex gap-2">
                <span className="font-bold text-purple-500 flex-shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* HTML snippet for Other / developer */}
      {platform === 'Other' && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Copy this HTML and send to your developer:</p>
            <button
              onClick={copySnippet}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              {snippetCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs bg-white border border-gray-200 rounded p-2 overflow-x-auto font-mono text-gray-800 whitespace-pre-wrap">
            {snippet}
          </pre>
          <p className="text-[10px] text-gray-500 mt-1.5">Replace the placeholder URLs with your actual profile links. Add this to your website footer.</p>
        </div>
      )}

      {/* Re-run button */}
      {platform && (
        <button
          onClick={onRerun}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Re-running audit...
            </>
          ) : (
            'Mark as done & re-run audit'
          )}
        </button>
      )}
    </div>
  );
}

export default function AeoAuditCard({ token, tier, vendorWebsite }: AeoAuditCardProps) {
  const [url, setUrl] = useState(vendorWebsite || '');
  const [loading, setLoading] = useState(false);
  const [fetchingLatest, setFetchingLatest] = useState(true);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [canRunAgain, setCanRunAgain] = useState(true);
  const [nextAvailable, setNextAvailable] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);
  const [socialPlatform, setSocialPlatform] = useState<string | null>(null);
  const [metaPlatform, setMetaPlatform] = useState<string | null>(null);
  const [faqPlatform, setFaqPlatform] = useState<string | null>(null);
  const [contactPlatform, setContactPlatform] = useState<string | null>(null);

  const isPaid = hasTierAccess(tier, 'starter');

  // Fetch latest audit on mount
  const fetchLatest = useCallback(async () => {
    if (!token) return;
    setFetchingLatest(true);
    try {
      const res = await fetch(`${API_URL}/api/aeo-audit/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
        setCanRunAgain(json.canRunAgain);
        setNextAvailable(json.nextAvailable || null);
        if (!url && json.data.websiteUrl) setUrl(json.data.websiteUrl);
      }
    } catch {
      // Silently ignore — first-time users won't have an audit
    } finally {
      setFetchingLatest(false);
    }
  }, [token, url]);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  useEffect(() => {
    if (vendorWebsite && !url) setUrl(vendorWebsite);
  }, [vendorWebsite, url]);

  const runAudit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setRateLimitMsg(null);

    try {
      const res = await fetch(`${API_URL}/api/aeo-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ websiteUrl: url.trim() }),
      });

      const json = await res.json();

      if (res.status === 429) {
        setRateLimitMsg(json.message || 'Rate limit reached.');
        setCanRunAgain(false);
        if (json.nextAvailable) setNextAvailable(json.nextAvailable);
        return;
      }

      if (!res.ok) {
        setError(json.error || 'Something went wrong.');
        return;
      }

      if (json.success) {
        setResult(json.data);
        setCanRunAgain(false);
        // Re-fetch to get accurate canRunAgain flag
        setTimeout(() => fetchLatest(), 500);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColour = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-green-50 border-green-200';
    if (score >= 40) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreRingColour = (score: number) => {
    if (score >= 70) return 'stroke-green-500';
    if (score >= 40) return 'stroke-amber-500';
    return 'stroke-red-500';
  };

  const getCheckIcon = (passed: boolean) => {
    if (passed) {
      return (
        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  if (fetchingLatest) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Loading AI Visibility (AEO) Audit...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">AI Visibility (AEO) Audit</h3>
          <p className="text-sm text-gray-600 mt-1">
            Check how AI-ready your website is. AI assistants crawl your site for structured data, content, and trust signals.
          </p>
        </div>
      </div>

      {/* URL input + run button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          disabled={loading}
        />
        <button
          onClick={runAudit}
          disabled={loading || !url.trim() || (!canRunAgain && !error)}
          className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
        >
          {loading ? 'Analysing...' : 'Run AI Visibility (AEO) Audit'}
        </button>
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="flex flex-col items-center py-8 gap-4">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-gray-600">Analysing your website for AI readiness...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Rate limit message */}
      {rateLimitMsg && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
          <p className="text-sm text-amber-700">{rateLimitMsg}</p>
          {!isPaid && (
            <Link
              href="/vendor-dashboard/settings?tab=subscription"
              className="inline-flex items-center mt-2 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Upgrade for weekly audits
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
          {isPaid && nextAvailable && (
            <p className="text-xs text-amber-600 mt-1">
              Next audit available: {new Date(nextAvailable).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Score summary */}
          <div className={`flex items-center gap-6 p-5 rounded-xl border ${getScoreBg(result.overallScore)}`}>
            {/* Circular score */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  className={getScoreRingColour(result.overallScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(result.overallScore / 100) * 264} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getScoreColour(result.overallScore)}`}>
                  {result.overallScore}
                </span>
              </div>
            </div>

            <div>
              <p className={`text-xl font-bold ${getScoreColour(result.overallScore)}`}>
                {result.overallScore >= 70 ? 'Good' : result.overallScore >= 40 ? 'Needs Work' : 'Poor'} AI Readiness
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {result.overallScore >= 70
                  ? 'Your website is well-optimised for AI discovery.'
                  : result.overallScore >= 40
                    ? 'Some improvements could boost how AI assistants see your site.'
                    : 'Significant improvements needed for AI visibility.'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Audited {new Date(result.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} &middot; {result.websiteUrl}
              </p>
            </div>
          </div>

          {/* TendorAI Schema Detection */}
          {result.tendoraiSchemaDetected === true && (
            <a href="#schema-generator" className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-green-700">TendorAI Schema detected on your website</span>
            </a>
          )}
          {result.tendoraiSchemaDetected === false && (
            <a href="#schema-generator" className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium text-amber-700">TendorAI Schema not installed — add it below</span>
            </a>
          )}

          {/* Check list */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Audit Checklist</h4>
            <div className="space-y-2">
              {result.checks.map((check) => (
                <div
                  key={check.key}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCheck(expandedCheck === check.key ? null : check.key)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    {getCheckIcon(check.passed)}
                    <span className="flex-1 text-sm font-medium text-gray-900">{check.name}</span>
                    <span className={`text-sm font-semibold ${check.score >= 7 ? 'text-green-600' : check.score >= 4 ? 'text-amber-500' : 'text-red-500'}`}>
                      {check.score}/{check.maxScore}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedCheck === check.key ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCheck === check.key && (
                    <div className="px-3 pb-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mt-2">{check.details}</p>
                      {check.key === 'contact' && check.score < 10 ? (
                        <ContactFixWizard
                          details={check.details}
                          platform={contactPlatform}
                          setPlatform={setContactPlatform}
                          onRerun={() => { runAudit(); setExpandedCheck(null); setContactPlatform(null); }}
                          loading={loading}
                        />
                      ) : check.key === 'faq' && check.score < 10 ? (
                        <FaqFixWizard
                          details={check.details}
                          score={check.score}
                          platform={faqPlatform}
                          setPlatform={setFaqPlatform}
                          onRerun={() => { runAudit(); setExpandedCheck(null); setFaqPlatform(null); }}
                          loading={loading}
                        />
                      ) : check.key === 'meta' && check.score < 10 ? (
                        <MetaFixWizard
                          details={check.details}
                          platform={metaPlatform}
                          setPlatform={setMetaPlatform}
                          onRerun={() => { runAudit(); setExpandedCheck(null); setMetaPlatform(null); }}
                          loading={loading}
                        />
                      ) : check.key === 'speed' && check.score < 10 ? (
                        <SpeedFixWizard
                          details={check.details}
                          score={check.score}
                          onRerun={() => { runAudit(); setExpandedCheck(null); }}
                          loading={loading}
                        />
                      ) : check.key === 'social' && check.score < 10 ? (
                        <SocialFixWizard
                          details={check.details}
                          platform={socialPlatform}
                          setPlatform={setSocialPlatform}
                          onRerun={() => { runAudit(); setExpandedCheck(null); setSocialPlatform(null); }}
                          loading={loading}
                        />
                      ) : check.recommendation ? (
                        <p className="text-sm text-purple-700 mt-2 bg-purple-50 rounded p-2">
                          {check.recommendation}
                        </p>
                      ) : null}
                      {CHECK_TO_GUIDE[check.key] && (
                        <Link
                          href={`/aeo-guide/${CHECK_TO_GUIDE[check.key]}`}
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2 font-medium"
                        >
                          Learn how to fix this &rarr;
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top recommendations */}
          {result.recommendations.length > 0 && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Top Recommendations</h4>
              <ul className="space-y-1.5">
                {result.recommendations.slice(0, 5).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-purple-800">
                    <span className="text-purple-400 mt-0.5">&#8226;</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* No result yet — show explanation */}
      {!result && !loading && !error && (
        <div className="text-center py-6 text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="font-medium text-gray-700">No AI Visibility (AEO) audit yet</p>
          <p className="text-sm mt-1">Enter your website URL above and run your first audit.</p>
        </div>
      )}
    </div>
  );
}
