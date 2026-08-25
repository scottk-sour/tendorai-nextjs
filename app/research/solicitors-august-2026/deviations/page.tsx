/**
 * Deviations log for study TAI-R-2026-002.
 *
 * Structure mirrors the July log at /research/solicitors-july-2026/deviations
 * and reuses its Deviation / Row components.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

import { Deviation } from '@/app/components/reports/DeviationEntry';

const STUDY_URL = 'https://www.tendorai.com/resources/ai-visibility-report-solicitors-august-2026';
const CANONICAL = 'https://www.tendorai.com/research/solicitors-august-2026/deviations';
const TITLE = 'Deviations log — Most UK Solicitors Are Never Recommended by AI, August 2026';
const DESCRIPTION =
  'Every departure from the pre-registered plan for study TAI-R-2026-002, including corrections to our own errors. Published alongside the report so its methodology can be independently checked.';
const PUBLISHED = '2026-08-25';
const STUDY_NAME = 'Most UK Solicitors Are Never Recommended by AI. We Measured How Many.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    url: CANONICAL,
    siteName: 'TendorAI',
    publishedTime: PUBLISHED,
    authors: ['TendorAI'],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  identifier: 'TAI-R-2026-002',
  author: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
  publisher: {
    '@type': 'Organization',
    name: 'TendorAI',
    url: 'https://www.tendorai.com',
    logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
  },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  articleSection: 'Research',
  inLanguage: 'en-GB',
  isPartOf: { '@type': 'CreativeWork', name: STUDY_NAME, url: STUDY_URL },
  citation: { '@type': 'CreativeWork', name: STUDY_NAME, url: STUDY_URL, identifier: 'TAI-R-2026-002' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
    { '@type': 'ListItem', position: 2, name: 'Study', item: STUDY_URL },
    { '@type': 'ListItem', position: 3, name: 'Deviations log', item: CANONICAL },
  ],
};

export default function DeviationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-5 py-14">
        {/* Back-link to the study */}
        <nav className="text-sm mb-8 text-gray-500">
          <Link
            href="/resources/ai-visibility-report-solicitors-august-2026"
            className="text-purple-700 hover:text-purple-900 underline underline-offset-2"
          >
            ← Back to the study: Most UK Solicitors Are Never Recommended by AI
          </Link>
        </nav>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Deviations log — Most UK Solicitors Are Never Recommended by AI, August 2026
          </h1>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-8">
            Report TAI-R-2026-002
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What this document is</h2>
          <p className="mb-4 leading-relaxed">
            This report is based on two collection waves against the same fixed panel: 68
            prompts across 17 UK cities, ten repeats per prompt. Wave 1 opened 18 July 2026
            and covered Perplexity and ChatGPT. Wave 2 completed 24 August 2026, Perplexity
            only.
          </p>
          <p className="mb-4 leading-relaxed">
            The prompt panel, the city selection rule and the treatment and control
            assignments were all fixed before any collection began. This document records
            every departure from that plan, including corrections to our own errors. Each
            entry gives the date, what went wrong, what we did about it, and whether it
            affected the published figures.
          </p>
          <p className="mb-4 leading-relaxed">
            We publish this because a study you cannot check is not worth citing.
          </p>

          <hr className="my-10 border-gray-200" />

          <Deviation date="19/08/2026" title="Wave 2 first launch abandoned">
            <p className="mb-3 leading-relaxed">
              Wave 2 was launched on 19 August 2026 and terminated after 240 of an expected
              1,360 runs, Perplexity only. No runs errored; the process was stopped by a
              database storage limit. The 240 completed runs were discarded rather than
              topped up: resuming would have produced a wave collected across two windows six
              days apart, spanning possible model and index changes. Wave 1 was verified
              intact at 1,360 runs before deletion.
            </p>
          </Deviation>

          <hr className="my-10 border-gray-200" />

          <Deviation date="24/08/2026" title="Wave 2 relaunched clean">
            <p className="mb-3 leading-relaxed">
              Wave 2 was relaunched on 24 August 2026 with the same prompt panel, platforms
              and configuration, and completed 680 Perplexity runs.
            </p>
          </Deviation>

          <hr className="my-10 border-gray-200" />

          <Deviation date="25/08/2026" title="ChatGPT arm could not be collected">
            <p className="mb-3 leading-relaxed">
              Every ChatGPT attempt in wave 2 failed: 2,040 attempts across 68 prompts. OpenAI
              had retired gpt-4o-mini-search-preview, the model wave 1&rsquo;s ChatGPT arm was
              collected on. The wave 1 ChatGPT measurement cannot be reproduced on the same
              instrument. We did not substitute a different model, because a replacement model
              is a different instrument and the two figures would not be comparable. The
              ChatGPT series ends at wave 1; any future ChatGPT collection begins a new
              series.
            </p>
          </Deviation>

          <hr className="my-10 border-gray-200" />

          <Deviation date="24/08/2026" title="Instrument verified unchanged">
            <p className="mb-3 leading-relaxed">
              The classifier, collection script and prompt configuration were verified
              byte-identical between waves by MD5 hash, with no commits touching those files
              between the two collection dates.
            </p>
          </Deviation>

          <hr className="my-10 border-gray-200" />

          <p className="mb-4 leading-relaxed">
            Wave 2 findings are therefore Perplexity-only. This is stated in the report body
            and in its limitations section.
          </p>
        </article>
      </div>
    </>
  );
}
