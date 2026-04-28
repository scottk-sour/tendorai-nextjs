import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'SRA-Registered Solicitors in Bristol (2026) — AI Visibility Report | TendorAI',
  description: 'Browse 85 SRA-registered solicitors in Bristol. Verified against the SRA register. See which Bristol firms appear in ChatGPT, Perplexity, and Google AI when people search for legal advice.',
  alternates: {
    canonical: 'https://www.tendorai.com/suppliers/solicitors/bristol',
  },
  openGraph: {
    title: 'SRA-Registered Solicitors in Bristol (2026) — AI Visibility Report',
    description: 'Verified Bristol solicitors. Compare AI visibility scores across ChatGPT, Perplexity, and Google AI.',
    url: 'https://www.tendorai.com/suppliers/solicitors/bristol',
    type: 'website',
  },
};

const BRISTOL_FIRM_COUNT = 85;
const INVISIBLE_PERCENTAGE = 91;
const INVISIBLE_FIRM_COUNT = Math.round(BRISTOL_FIRM_COUNT * (INVISIBLE_PERCENTAGE / 100));
const VISIBLE_FIRM_COUNT = BRISTOL_FIRM_COUNT - INVISIBLE_FIRM_COUNT;

export default function BristolSolicitorsPage() {
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SRA-Registered Solicitors in Bristol',
    description: `Browse ${BRISTOL_FIRM_COUNT} SRA-registered solicitors in Bristol with AI visibility scores.`,
    url: 'https://www.tendorai.com/suppliers/solicitors/bristol',
    dateModified: '2026-04-28',
    provider: {
      '@type': 'SoftwareApplication',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
  };

  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    areaServed: {
      '@type': 'City',
      name: 'Bristol',
      addressCountry: 'GB',
    },
    provider: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many SRA-registered solicitors are there in Bristol?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `There are ${BRISTOL_FIRM_COUNT} SRA-registered solicitor firms in Bristol as of April 2026, sourced directly from the Solicitors Regulation Authority register. Firms range from sole practitioners to large multi-partner practices including Burges Salmon LLP, TLT LLP, and Bevan Brittan LLP.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find a solicitor in Bristol using AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI assistants like ChatGPT, Perplexity, and Google AI recommend Bristol solicitors based on structured data — verified profiles, SRA registration, fee transparency, and client reviews. Firms with stronger structured data appear more often in AI answers. TendorAI provides this data layer for SRA-registered Bristol firms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does AI not recommend my Bristol law firm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Around ${INVISIBLE_PERCENTAGE}% of Bristol solicitors do not appear when ChatGPT or Perplexity is asked to recommend a firm. The reason is structured data: most firm websites lack LegalService schema, verified SRA numbers, and machine-readable fee information. Firms with this data in place are recommended by name; firms without it are passed over.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is TendorAI a directory or a regulator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neither. TendorAI is an AI visibility platform. Regulation is the role of the Solicitors Regulation Authority (SRA). TendorAI sources firm data from the SRA register, structures it for AI consumption, and lets firms claim and enrich their profiles so AI assistants recommend them by name.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to be listed on TendorAI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Free profiles are available to every SRA-registered firm in Bristol. The free profile includes verified SRA data and a basic public listing. The Pro tier is £299 per month and includes schema installation on the firm\'s website, weekly AI visibility tracking across ChatGPT, Perplexity, Google AI, and Claude, and monthly reporting.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            SRA-Registered Solicitors in Bristol (2026) — AI Visibility Report
          </h1>
          <p className="text-xl text-gray-700">
            Bristol has {BRISTOL_FIRM_COUNT} SRA-registered solicitor firms.
            When ChatGPT, Perplexity, or Google AI is asked to recommend a Bristol solicitor,
            roughly {INVISIBLE_PERCENTAGE}% of these firms are not mentioned in any answer.
            This page shows why — and which firms are visible.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How people now find solicitors in Bristol</h2>
          <p className="mb-4">
            The way people find a solicitor in Bristol has shifted. Google searches for
            &ldquo;solicitors Bristol&rdquo; still happen, but a rapidly growing share of legal
            enquiries now starts inside an AI assistant. A homeowner buying a flat in Clifton asks
            ChatGPT for a conveyancing solicitor. A small business owner in Temple Quay asks
            Perplexity for a commercial law firm. A professional facing dismissal asks Google AI
            for an employment solicitor.
          </p>
          <p className="mb-4">
            None of those queries return a list of ten blue links. They return a short list of
            named firms with reasoning attached. The firms recommended are not the firms that pay
            the most for ads. They are the firms whose data the AI can read, verify, and trust.
          </p>
          <p>
            For Bristol&apos;s {BRISTOL_FIRM_COUNT} SRA-registered solicitors, this is a structural
            change in client acquisition. Most firms have not adapted. A small number have, and
            they are being recommended by name across every major AI platform.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Bristol AI visibility — the numbers</h2>
          <p className="mb-4">
            TendorAI tested ten standard prompts a Bristol-based client might use across ChatGPT,
            Perplexity, and Google AI in April 2026. The prompts covered conveyancing, employment
            law, wills and probate, family law, commercial law, and immigration — the six largest
            specialisms in Bristol by firm count.
          </p>
          <p className="mb-4">
            Across all three platforms, a small group of firms appeared repeatedly. The remainder
            — approximately {INVISIBLE_PERCENTAGE}% of Bristol&apos;s SRA-registered solicitors,
            around {INVISIBLE_FIRM_COUNT} firms — were not mentioned in any AI response. Many of
            these firms have strong reputations, long histories in Bristol, and active websites.
            None of that mattered. The AI could not read them.
          </p>
          <p>
            The {VISIBLE_FIRM_COUNT - 1}&ndash;{VISIBLE_FIRM_COUNT + 2} visible firms shared three traits:
            claimed structured data on their websites (LegalService schema, verified SRA number,
            machine-readable specialisms), client reviews tied to verifiable identity, and clear
            fee information. The invisible firms had none of these in place.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Worked example — what AI visibility is worth in Bristol</h2>
          <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded">
            <p className="mb-3">
              Bristol has {BRISTOL_FIRM_COUNT} SRA-registered solicitors. Around{' '}
              {INVISIBLE_PERCENTAGE}% — roughly {INVISIBLE_FIRM_COUNT} firms — do not appear when
              ChatGPT, Perplexity, or Google AI is asked to recommend a firm. That leaves a small
              group of {VISIBLE_FIRM_COUNT - 1}&ndash;{VISIBLE_FIRM_COUNT + 2} firms taking the entire
              share of voice on AI platforms.
            </p>
            <p className="mb-3">
              At an average conveyancing matter value of £1,400 in the Bristol area, and a
              conservative conversion rate of 2% on AI-driven enquiries, a Bristol firm appearing
              in AI responses for a single specialism could expect 2&ndash;4 additional matters per
              month. That is £2,800&ndash;£5,600 in additional monthly revenue from one specialism alone.
              TendorAI Pro is £299 per month — payback period under one matter.
            </p>
            <p className="text-sm text-gray-600 italic">
              These figures are illustrative. Actual results depend on firm size, specialism mix,
              and conversion process. Source: TendorAI April 2026 AI visibility audit, {BRISTOL_FIRM_COUNT}{' '}
              Bristol SRA-registered firms.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Most common specialisms in Bristol</h2>
          <p className="mb-4">
            Based on TendorAI&apos;s analysis of SRA register data, Bristol&apos;s {BRISTOL_FIRM_COUNT}{' '}
            solicitor firms are concentrated in the following specialisms:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <Link href="/suppliers/conveyancing/bristol" className="text-blue-600 hover:underline">
                Conveyancing solicitors in Bristol
              </Link>{' '}
              — driven by Bristol&apos;s active property market across Clifton, Redland, Bishopston,
              and Bedminster.
            </li>
            <li>
              <Link href="/suppliers/employment-law/bristol" className="text-blue-600 hover:underline">
                Employment law solicitors in Bristol
              </Link>{' '}
              — Bristol&apos;s status as a regional hub for finance, tech, and professional services
              drives steady demand.
            </li>
            <li>
              <Link href="/suppliers/wills-and-probate/bristol" className="text-blue-600 hover:underline">
                Wills and probate solicitors in Bristol
              </Link>{' '}
              — long-established practices serving the wider Bristol and South Gloucestershire area.
            </li>
            <li>
              <Link href="/suppliers/commercial-law/bristol" className="text-blue-600 hover:underline">
                Commercial law solicitors in Bristol
              </Link>{' '}
              — Bristol hosts the largest cluster of corporate firms outside London, including
              Burges Salmon LLP and TLT LLP.
            </li>
            <li>
              <Link href="/suppliers/family-law/bristol" className="text-blue-600 hover:underline">
                Family law solicitors in Bristol
              </Link>{' '}
              — strong demand across divorce, children law, and financial settlements.
            </li>
            <li>
              <Link href="/suppliers/immigration/bristol" className="text-blue-600 hover:underline">
                Immigration solicitors in Bristol
              </Link>{' '}
              — a smaller pool of specialist firms serving Bristol&apos;s diverse population.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How AI recommends Bristol solicitors</h2>
          <p className="mb-4">
            ChatGPT, Perplexity, Google AI, and Claude do not crawl the web the way Google&apos;s
            classic search did. They rely on structured data — machine-readable facts an AI can
            verify and quote with confidence. For a solicitor firm, that data has four parts:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>
              <strong>SRA verification.</strong> The firm&apos;s SRA number is published on the
              SRA register and matched against its website. AI uses this to confirm the firm is
              authorised to practise.
            </li>
            <li>
              <strong>LegalService schema.</strong> Structured JSON-LD on the firm&apos;s website
              that names specialisms, fees, areas served, and contact details in a format AI can
              parse without ambiguity.
            </li>
            <li>
              <strong>Reviews tied to verified identity.</strong> Reviews from named clients on
              platforms AI trusts, not anonymous testimonials on the firm&apos;s own homepage.
            </li>
            <li>
              <strong>Specialism clarity.</strong> A firm that clearly advertises &ldquo;commercial
              property solicitor in Bristol&rdquo; is recommended for that query. A firm with a
              vague &ldquo;full-service&rdquo; positioning is not.
            </li>
          </ol>
          <p>
            TendorAI provides this layer for SRA-registered Bristol firms. The free profile starts
            with verified SRA data. Firms add specialisms, fee structures, and client reviews. The
            Pro tier installs the LegalService schema directly on the firm&apos;s website and
            tracks weekly AI visibility across ChatGPT, Perplexity, Google AI, and Claude.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Claim your Bristol solicitor profile on TendorAI</h2>
          <p className="mb-4">
            Every SRA-registered solicitor in Bristol already has a profile on TendorAI, built from
            SRA register data. Claiming the profile is free and takes under five minutes. Once
            claimed, you can add specialisms, fee ranges, accreditations, and client reviews.
          </p>
          <p className="mb-6">
            With only {BRISTOL_FIRM_COUNT} firms competing for AI share of voice in Bristol, the
            firms that move first take a disproportionate share of AI-driven enquiries. To check
            how your firm currently appears across ChatGPT, Perplexity, and Google AI, run a free
            AI Visibility (AEO) report.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/aeo-report?utm_source=bristol-solicitors&utm_medium=blog&utm_campaign=solicitors-cluster&utm_content=in-article-cta"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Run free AI Visibility report
            </Link>
            <Link
              href="/for-vendors?utm_source=bristol-solicitors&utm_medium=blog&utm_campaign=solicitors-cluster&utm_content=pro-cta"
              className="inline-block border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              See TendorAI Pro for solicitors
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How many SRA-registered solicitors are there in Bristol?</h3>
              <p>
                There are {BRISTOL_FIRM_COUNT} SRA-registered solicitor firms in Bristol as of
                April 2026, sourced directly from the Solicitors Regulation Authority register.
                Firms range from sole practitioners to large multi-partner practices including
                Burges Salmon LLP, TLT LLP, and Bevan Brittan LLP.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I find a solicitor in Bristol using AI?</h3>
              <p>
                AI assistants like ChatGPT, Perplexity, and Google AI recommend Bristol solicitors
                based on structured data — verified profiles, SRA registration, fee transparency,
                and client reviews. Firms with stronger structured data appear more often in AI
                answers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why does AI not recommend my Bristol law firm?</h3>
              <p>
                Around {INVISIBLE_PERCENTAGE}% of Bristol solicitors do not appear when ChatGPT or
                Perplexity is asked to recommend a firm. The reason is structured data: most firm
                websites lack LegalService schema, verified SRA numbers, and machine-readable fee
                information. Firms with this data in place are recommended by name; firms without
                it are passed over.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is TendorAI a directory or a regulator?</h3>
              <p>
                Neither. TendorAI is an AI visibility platform. Regulation is the role of the
                Solicitors Regulation Authority (SRA). TendorAI sources firm data from the SRA
                register, structures it for AI consumption, and lets firms claim and enrich their
                profiles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How much does it cost?</h3>
              <p>
                Free profiles are available to every SRA-registered firm in Bristol. The Pro tier
                is £299 per month and includes schema installation, weekly AI visibility tracking
                across ChatGPT, Perplexity, Google AI, and Claude, and monthly reporting.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About TendorAI&apos;s Bristol solicitor data</h2>
          <p className="mb-4">
            Profile data for Bristol solicitors is sourced from the Solicitors Regulation Authority
            register, with company information cross-referenced against Companies House. AI
            visibility scores are generated from a standardised test of ten prompts run weekly
            across ChatGPT, Perplexity, Google AI, and Claude.
          </p>
          <p className="text-sm text-gray-600">
            Last updated: 28 April 2026. Source: SRA register, Companies House. Methodology:
            ten standardised prompts tested weekly across four AI platforms.
            Firm count: {BRISTOL_FIRM_COUNT}.
          </p>
        </section>

        <section className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Solicitors in nearby cities</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/suppliers/solicitors/cardiff" className="text-blue-600 hover:underline">
              Solicitors in Cardiff
            </Link>
            <span className="text-gray-400">·</span>
            <Link href="/suppliers/solicitors/bath" className="text-blue-600 hover:underline">
              Solicitors in Bath
            </Link>
            <span className="text-gray-400">·</span>
            <Link href="/suppliers/solicitors/newport" className="text-blue-600 hover:underline">
              Solicitors in Newport
            </Link>
            <span className="text-gray-400">·</span>
            <Link href="/suppliers/solicitors/swindon" className="text-blue-600 hover:underline">
              Solicitors in Swindon
            </Link>
            <span className="text-gray-400">·</span>
            <Link href="/ai-visibility-for-solicitors" className="text-blue-600 hover:underline">
              AI Visibility for Solicitors (pillar)
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
