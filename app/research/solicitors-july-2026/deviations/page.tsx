import type { Metadata } from 'next';
import Link from 'next/link';

import { Deviation, Row } from '@/app/components/reports/DeviationEntry';

const STUDY_URL = 'https://www.tendorai.com/resources/ai-visibility-report-solicitors-july-2026';
const CANONICAL = 'https://www.tendorai.com/research/solicitors-july-2026/deviations';
const TITLE = 'Deviations log — UK AI Visibility Report for Solicitors, July 2026';
const DESCRIPTION =
  'Every departure from the pre-registered plan for study TAI-R-2026-001, including corrections to our own errors. Published alongside the report so its methodology can be independently checked.';
const PUBLISHED = '2026-08-02';

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
  identifier: 'TAI-R-2026-001',
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
  isPartOf: { '@type': 'CreativeWork', name: 'The UK AI Visibility Report for Solicitors — July 2026', url: STUDY_URL },
  citation: { '@type': 'CreativeWork', name: 'The UK AI Visibility Report for Solicitors — July 2026', url: STUDY_URL, identifier: 'TAI-R-2026-001' },
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
            href="/resources/ai-visibility-report-solicitors-july-2026"
            className="text-purple-700 hover:text-purple-900 underline underline-offset-2"
          >
            ← Back to the study: The UK AI Visibility Report for Solicitors — July 2026
          </Link>
        </nav>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Deviations log — UK AI Visibility Report for Solicitors, July 2026
          </h1>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-8">
            Report TAI-R-2026-001
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What this document is</h2>
          <p className="mb-4 leading-relaxed">
            This report is based on a single collection run: 68 prompts across 17 UK cities,
            put to ChatGPT and Perplexity, producing 1,360 answer runs and 12,279 recorded
            citations, collected on 19 July 2026.
          </p>
          <p className="mb-4 leading-relaxed">
            The prompt panel, the city selection rule and the classification approach were all
            fixed before any collection began. This document records every departure from that
            plan, including corrections to our own errors. Each entry gives the date, what
            went wrong, what we did about it, and whether it affected the published figures.
          </p>
          <p className="mb-4 leading-relaxed">
            We publish this because a study you cannot check is not worth citing. Four things
            went wrong during collection and analysis. All four were found and corrected
            before any results were reported.
          </p>

          <hr className="my-10 border-gray-200" />

          <Deviation date="18/07/2026" title="API quota outage mid-collection">
            <Row label="What happened.">
              The collection run hit an API quota limit partway through. ChatGPT calls started
              returning rate-limit errors, leaving some prompts with fewer than the target
              number of clean runs.
            </Row>
            <Row label="What we did.">
              Paused the run. After the quota reset, resumed it. The collection script counts
              existing clean runs per prompt and platform and tops up to the target, so no
              duplicates were created and every prompt reached the full target.
            </Row>
            <Row label="Effect on published figures.">
              None. All runs were collected before any figures were calculated.
            </Row>
          </Deviation>

          <hr className="my-10 border-gray-200" />

          <Deviation date="18/07/2026" title="Configuration file lost during a server deployment">
            <Row label="What happened.">
              A routine server deployment replaced the running container partway through
              collection, wiping the generated configuration file, which had not yet been
              committed to version control. The collection process was killed.
            </Row>
            <Row label="What we did.">
              Regenerated the configuration from the committed source data. Generation is
              deterministic given the same inputs, so the regenerated file was identical to
              the original. Resumed collection. Committed the configuration to version control
              so it cannot be lost this way again.
            </Row>
            <Row label="Effect on published figures.">
              None. No collected data was lost; incomplete prompts were topped up.
            </Row>
          </Deviation>

          <hr className="my-10 border-gray-200" />

          <Deviation date="18–19/07/2026" title="Firm-name matching returned false negatives">
            <Row label="What happened.">
              The configuration generator left the firm-name field empty for every tracked
              firm. The matching function that checks whether a firm is named in an AI
              response therefore returned &ldquo;not mentioned&rdquo; for every firm, regardless of what
              the response actually said. 874 records were wrongly flagged.
            </Row>
            <Row label="How we found it.">
              Manual inspection of stored responses. Several responses clearly named tracked
              firms while every corresponding flag read &ldquo;not mentioned&rdquo;.
            </Row>
            <Row label="What we did.">
              Fixed the configuration generator to populate firm names from the source
              register data. Built a new name-matching library with normalised matching —
              stripping common suffixes, treating &ldquo;&amp;&rdquo; and &ldquo;and&rdquo; as equivalent, requiring
              multi-word names to appear as contiguous phrases, and requiring single-word
              names to appear in a list context to prevent false positives. It carries 24 unit
              tests built on real stored responses. Rebuilt every flag from the stored
              response text.
            </Row>
            <Row label="Effect on published figures.">
              None. The correction was applied before any figures were calculated.
            </Row>
          </Deviation>

          <hr className="my-10 border-gray-200" />

          <Deviation date="19/07/2026" title="Citation URL pattern mismatch">
            <Row label="What happened.">
              The configuration recorded our own profile page URLs using an old path pattern
              that no longer matched the live site. Citation matching compared AI-returned
              URLs against those wrong URLs, so nothing ever matched. The result was an
              apparent zero citation count, which was an artefact of the mismatch rather than
              a real measurement.
            </Row>
            <Row label="How we found it.">
              An audit script showed Perplexity citing one of our profile pages nine times
              while the corresponding record showed no citations at all.
            </Row>
            <Row label="What we did.">
              Corrected the URL pattern against the live routing configuration. Wrote a
              script to re-match every stored citation URL against the corrected targets. Two
              problems surfaced while doing so:
            </Row>
            <ul className="list-disc pl-6 my-4 space-y-2 leading-relaxed">
              <li>
                The first version loaded all 1,360 runs into memory at once and crashed,
                leaving partially written flags. Rewritten to stream records and write in
                batches.
              </li>
              <li>
                The recomputation scripts overwrote each other&rsquo;s results, because each
                rebuilt the full record while calculating only its own field. Both were
                rewritten to update only the field they own.
              </li>
            </ul>
            <p className="mb-3 leading-relaxed">
              All flags were then rebuilt from the stored raw responses and citation URLs. Raw
              responses were never affected at any point.
            </p>
            <p className="mb-3 leading-relaxed">
              We also added a check that spot-tests a sample of target URLs and fails if any
              return a 404, so a wrong URL pattern cannot ship silently again.
            </p>
            <Row label="Effect on published figures.">
              None. All corrections were applied before any figures were calculated.
            </Row>
          </Deviation>

          <hr className="my-10 border-gray-200" />

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Note on the classification method
          </h2>
          <p className="mb-4 leading-relaxed">
            The domain classification used in this report is not the first version we wrote.
            An earlier version used a residual rule — anything not matched to another category
            was treated as a firm website — which placed several small directories in the firm
            bucket and several media and reference sites in the directory bucket. That version
            produced materially different figures and was discarded before publication in
            favour of a five-bucket classification with suffix-safe domain matching and a
            manual review of the most-cited domains.
          </p>
          <p className="mb-4 leading-relaxed">
            The classification list used to produce the published figures is available
            alongside this report.
          </p>

          <hr className="my-10 border-gray-200" />

          <p className="italic text-sm text-gray-600 mt-8">
            Published by TendorAI, 02/08/2026. Reproduction permitted with attribution.
          </p>
        </article>
      </div>
    </>
  );
}
