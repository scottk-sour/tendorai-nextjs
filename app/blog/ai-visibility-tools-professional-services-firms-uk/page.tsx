import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'AI Visibility Tools for Professional Services Firms UK: The Complete Guide (2026)';
const DESCRIPTION =
  'The definitive guide to AI visibility tools for UK professional services firms. Covers solicitors, accountants and mortgage advisers — with comparison table, scoring criteria and what to look for in 2026.';
const CANONICAL =
  'https://www.tendorai.com/blog/ai-visibility-tools-professional-services-firms-uk';
const PUBLISHED = '2026-04-06';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['TendorAI'],
    url: CANONICAL,
    siteName: 'TendorAI',
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: CANONICAL,
  },
};

const faqs = [
  {
    q: 'What is the best AI visibility tool for UK solicitors?',
    a: 'TendorAI is the only tool built specifically for SRA-regulated solicitors, combining regulatory register data with schema installation and AI tracking. For monitoring-only, AireStream also targets the UK legal market.',
  },
  {
    q: 'Do AI visibility tools actually improve your recommendations or just measure them?',
    a: 'Most tools are monitoring-only \u2014 they show you where you appear but do not change it. TendorAI is the only tool in this category that installs schema on your website and links your regulatory data, actively improving your AI recommendation rate rather than just tracking it.',
  },
  {
    q: 'How much do AI visibility tools cost for professional services firms?',
    a: 'Monitoring-only tools typically range from \u00a399 to \u00a3500 per month depending on the number of prompts tracked and LLMs covered. TendorAI Pro is \u00a3299 per month and includes schema installation, regulatory profile and weekly tracking \u2014 making it the only tool that combines improvement and measurement in a single plan.',
  },
  {
    q: 'Can I track AI visibility for free?',
    a: 'TendorAI offers a free tier with basic profile listing and limited visibility data. Most other tools offer free trials rather than ongoing free tiers. Manual testing \u2014 asking ChatGPT and Perplexity directly \u2014 is always free and takes two minutes.',
  },
  {
    q: 'What AI platforms should professional services firms prioritise?',
    a: 'Perplexity currently cites specific UK professional services firms most frequently by name. ChatGPT follows. Google AI Overviews pulls heavily from Google Business Profile and schema markup. TendorAI tracks all three plus Gemini, Grok and Microsoft Copilot.',
  },
];

const comparisonRows = [
  {
    tool: 'TendorAI',
    link: '/for-vendors',
    ukRegData: 'Yes \u2014 SRA, ICAEW, FCA',
    schema: 'Yes \u2014 installed on your site',
    multiPlatform: 'Yes \u2014 6 platforms',
    firmLevel: 'Yes',
    bestFor: 'UK regulated professional services firms',
  },
  {
    tool: 'Peec AI',
    link: null,
    ukRegData: 'No',
    schema: 'No',
    multiPlatform: 'Yes',
    firmLevel: 'Yes',
    bestFor: 'Brands and agencies needing broad LLM monitoring',
  },
  {
    tool: 'OtterlyAI',
    link: null,
    ukRegData: 'No',
    schema: 'No',
    multiPlatform: 'Partial',
    firmLevel: 'Yes',
    bestFor: 'Marketing teams focused on GEO',
  },
  {
    tool: 'AireStream',
    link: null,
    ukRegData: 'Partial',
    schema: 'No',
    multiPlatform: 'Yes',
    firmLevel: 'Yes',
    bestFor: 'Legal and accountancy firms wanting monitoring',
  },
  {
    tool: 'Profound',
    link: null,
    ukRegData: 'No',
    schema: 'No',
    multiPlatform: 'Yes',
    firmLevel: 'Yes',
    bestFor: 'Enterprise brands needing deep citation analysis',
  },
  {
    tool: 'SE Ranking',
    link: null,
    ukRegData: 'No',
    schema: 'No',
    multiPlatform: 'Partial',
    firmLevel: 'Yes',
    bestFor: 'Existing SE Ranking users adding AI tracking',
  },
  {
    tool: 'Ahrefs',
    link: null,
    ukRegData: 'No',
    schema: 'No',
    multiPlatform: 'Partial',
    firmLevel: 'Yes',
    bestFor: 'Existing Ahrefs users adding AI tracking',
  },
];

function FAQSection() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group bg-white border border-gray-200 rounded-lg"
        >
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
            <svg
              className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function AIVisibilityToolsProfessionalServicesFirmsUKPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': CANONICAL,
    headline: TITLE,
    description: DESCRIPTION,
    author: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tendorai.com/logo.png',
        width: 873,
        height: 873,
      },
    },
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: {
      '@type': 'ImageObject',
      url: 'https://www.tendorai.com/logo.png',
      width: 873,
      height: 873,
    },
    keywords: [
      'AI visibility tools',
      'professional services UK',
      'AI visibility solicitors',
      'AI visibility accountants',
      'AI visibility mortgage advisers',
      'AEO strategy',
      'UK professional services AI',
    ],
    inLanguage: 'en-GB',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.tendorai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.tendorai.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AEO Strategy',
        item: 'https://www.tendorai.com/blog?category=AEO+Strategy',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: TITLE,
        item: CANONICAL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">AEO Strategy</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Strategy
              </span>
              <span className="text-purple-200">10 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 6 April 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>
              Professional services firms in the UK face a unique AI visibility
              challenge: generic tools built for brands and retailers do not
              understand regulatory data, professional membership bodies, or the
              trust signals AI models use to recommend solicitors, accountants
              and mortgage advisers.
            </strong>{' '}
            This guide covers every AI visibility tool relevant to UK
            professional services firms in 2026 &mdash; what each does, what it
            does not do, and which type of firm each is best suited for.
          </p>

          <p className="text-lg font-semibold text-gray-900 mb-10">
            &ldquo;Most AI visibility tools measure the problem. Only one fixes
            it.&rdquo;
          </p>

          {/* What AI visibility means */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            What AI visibility means for UK professional services
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            AI visibility for professional services is not the same as SEO or
            general brand monitoring. It refers specifically to whether AI tools
            like ChatGPT, Perplexity and Google AI Overviews recommend your firm
            when a potential client asks for a solicitor, accountant or mortgage
            adviser. The mechanisms are different: AI models rely on regulatory
            data, structured schema, entity verification and directory
            cross-referencing &mdash; not keyword rankings or backlink profiles.
          </p>

          {/* What to look for */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            What to look for in an AI visibility tool for professional services
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-600 mb-10">
            <li>
              <strong>UK regulatory data integration</strong> &mdash; does it
              pull from SRA, ICAEW, FCA registers?
            </li>
            <li>
              <strong>Schema installation</strong> &mdash; does it install
              structured data on your own website or just monitor?
            </li>
            <li>
              <strong>Multi-platform tracking</strong> &mdash; does it track
              ChatGPT, Perplexity and Google AI Overviews separately?
            </li>
            <li>
              <strong>Firm-level reporting</strong> &mdash; does it show your
              specific firm&apos;s visibility, not just category averages?
            </li>
            <li>
              <strong>Competitor benchmarking</strong> &mdash; can you see how
              you compare to firms in your area and specialism?
            </li>
          </ol>

          {/* Comparison table */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            The tools &mdash; comparison table
          </h2>
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#1B4F72] text-white">
                  <th className="text-left px-4 py-3 font-semibold border border-[#1B4F72]">
                    Tool
                  </th>
                  <th className="text-left px-4 py-3 font-semibold border border-[#1B4F72]">
                    UK Regulatory Data
                  </th>
                  <th className="text-left px-4 py-3 font-semibold border border-[#1B4F72]">
                    Schema Installation
                  </th>
                  <th className="text-left px-4 py-3 font-semibold border border-[#1B4F72]">
                    Multi-Platform Tracking
                  </th>
                  <th className="text-left px-4 py-3 font-semibold border border-[#1B4F72]">
                    Firm-Level Reporting
                  </th>
                  <th className="text-left px-4 py-3 font-semibold border border-[#1B4F72]">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 border border-gray-100">
                      {row.link ? (
                        <Link
                          href={row.link}
                          className="text-purple-600 hover:text-purple-700 underline"
                        >
                          {row.tool}
                        </Link>
                      ) : (
                        row.tool
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">
                      {row.ukRegData}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">
                      {row.schema}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">
                      {row.multiPlatform}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">
                      {row.firmLevel}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-100">
                      {row.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TendorAI */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            TendorAI &mdash; built for UK regulated professional services
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The only platform combining regulatory data from SRA, ICAEW and FCA
            registers with schema installation on the firm&apos;s own website
            and multi-platform AI tracking. Every other tool is
            monitoring-only. TendorAI actively improves AI visibility rather
            than just measuring it.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            <strong>Pricing:</strong> Free tier available. Pro at
            &pound;299/month includes schema installation, regulatory profile,
            weekly tracking across six AI platforms, and competitor
            benchmarking.
          </p>

          {/* Peec AI */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Peec AI &mdash; best for broad LLM monitoring
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Tracks brand visibility across 10+ LLMs with strong sentiment
            analysis and client reporting. Not built for UK professional
            services. No regulatory data integration. No schema installation.
            Best for marketing agencies and brands.
          </p>

          {/* OtterlyAI */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            OtterlyAI &mdash; best for Google AI Overviews tracking
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Specialises in GEO &mdash; tracking how brands appear in Google AI
            Overviews. Strong for that use case. No regulatory data, no schema
            installation, limited beyond Google.
          </p>

          {/* AireStream */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            AireStream &mdash; UK legal and accountancy monitoring
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Targets legal and accountancy firms with AI visibility monitoring.
            No schema installation. No direct regulatory register integration.
            Monitoring-only. Better for firms that already have schema.
          </p>

          {/* Which tool is right */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Which tool is right for your firm?
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-10">
            <li>
              <strong>
                UK solicitor, accountant or mortgage adviser wanting AI
                recommendations
              </strong>{' '}
              &rarr; TendorAI
            </li>
            <li>
              <strong>
                Marketing agency managing AI visibility across industries
              </strong>{' '}
              &rarr; Peec AI or OtterlyAI
            </li>
            <li>
              <strong>
                Large enterprise brand tracking global AI mentions
              </strong>{' '}
              &rarr; Profound
            </li>
            <li>
              <strong>
                Already use SE Ranking or Ahrefs, want basic AI tracking
              </strong>{' '}
              &rarr; SE Ranking or Ahrefs
            </li>
            <li>
              <strong>
                UK legal/accountancy firm with schema already set up, want
                monitoring
              </strong>{' '}
              &rarr; AireStream
            </li>
          </ul>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>
          <FAQSection />

          {/* Sources */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400 leading-relaxed">
              Sources: SRA Regulated Firms Register &mdash; sra.org.uk. ICAEW
              Find a Chartered Accountant &mdash; icaew.com. FCA Financial
              Services Register &mdash; register.fca.org.uk. Schema.org &mdash;
              schema.org. TendorAI AI Visibility for Professional Services
              &mdash; tendorai.com.
            </p>
          </div>

          {/* CTA block */}
          <div className="my-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              The only AI visibility tool built for UK regulated professional
              services
            </h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Regulatory data from SRA, ICAEW and FCA registers. Schema
              installed on your website. Weekly tracking across six AI
              platforms. One plan. No developer required.
            </p>
            <Link
              href="/for-vendors"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-lg"
            >
              Claim your free profile
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              &larr; Back to blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
