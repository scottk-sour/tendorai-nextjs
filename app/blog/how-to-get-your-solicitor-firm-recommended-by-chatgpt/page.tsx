import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'How to Get Your Solicitor Firm Recommended by ChatGPT (UK Guide)';
const DESCRIPTION =
  'A step-by-step guide for UK solicitors on getting recommended by ChatGPT, Perplexity and Google AI Overviews. Covers schema, regulatory data, and AI visibility strategy.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt';
const PUBLISHED = '2026-04-06';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
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
};

const faqs = [
  {
    q: 'Can I get recommended by ChatGPT without paying for any tools?',
    a: 'Yes \u2014 you can implement schema markup manually and update your directory listings yourself. It takes technical knowledge and time. TendorAI automates the process and adds regulatory verification that manual setup cannot replicate.',
  },
  {
    q: 'Does being SRA-regulated automatically mean ChatGPT will recommend me?',
    a: 'No. SRA registration is necessary but not sufficient. AI models need your regulatory data to be structured and machine-readable on your own website, not just present on the SRA register.',
  },
  {
    q: 'Which AI tools should I prioritise for solicitor recommendations?',
    a: 'Perplexity is currently the most active in citing specific UK firms by name. ChatGPT follows. Google AI Overviews pulls heavily from Google Business Profile and schema. Focus on Perplexity and schema first.',
  },
  {
    q: 'How do I know if my firm is already appearing in AI recommendations?',
    a: 'Ask ChatGPT, Perplexity and Claude directly: \u201cCan you recommend a [practice area] solicitor in [your city]?\u201d and see if your firm appears. TendorAI\u2019s free profile also includes a basic AI visibility scan.',
  },
  {
    q: 'What is the fastest way to get my solicitor firm into AI search results?',
    a: 'Claim your free TendorAI profile, which pulls your SRA data automatically and creates a machine-readable firm profile. Join the AI Visibility Growth Programme to get schema installed on your own website within 48 hours.',
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
            <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
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

export default function SolicitorFirmChatGPTRecommendationPage() {
  const today = new Date().toISOString().split('T')[0];

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: today,
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
      },
    },
    url: CANONICAL,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
    keywords: [
      'solicitor ChatGPT recommendation',
      'UK solicitor AI visibility',
      'get recommended by ChatGPT solicitor',
      'SRA schema markup',
      'solicitor AI search',
      'LegalService JSON-LD',
      'AI visibility solicitors UK',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
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
        name: 'Solicitors',
        item: 'https://www.tendorai.com/blog',
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
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
              <span className="text-white">Solicitors</span>
              <span className="mx-2">/</span>
              <span className="text-white">{TITLE}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                How-To Guide
              </span>
              <span className="text-purple-200">8 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>
            <p className="text-sm text-white/70 mb-6">Updated 05/09/2026: TendorAI pricing revised</p>

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
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            <strong>
              UK solicitors that appear in ChatGPT recommendations receive up to
              3x more inbound enquiries than firms relying on Google search
              alone.
            </strong>{' '}
            Most SRA-regulated firms are invisible to AI tools not because of
            poor reputation, but because their data is not structured in a way AI
            models can read. This guide covers exactly what to fix and in what
            order.
          </p>

          <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
            <p className="text-sm leading-relaxed text-gray-200">
              <strong className="text-white">
                The firms appearing in AI search results are not necessarily the
                best. They are the firms whose data AI can verify.
              </strong>
            </p>
          </div>

          {/* Section: Why ChatGPT doesn't recommend most UK solicitors */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Why ChatGPT Doesn&apos;t Recommend Most UK Solicitors
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>
              ChatGPT pulls from publicly available, machine-readable data.
            </strong>{' '}
            Most solicitor websites have no schema markup, no regulatory
            identifier in structured format, and no consistent entity data
            across directories. AI models cannot verify the firm exists as a
            regulated legal practice, so they do not recommend it.
            TendorAI&apos;s analysis of 8,625 SRA-registered solicitors found
            that fewer than 15% have any form of structured data on their
            website. The rest are invisible to AI by default.
          </p>

          {/* Section: Step 1 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-12">
            Step 1 &mdash; Verify Your SRA Number Is Machine-Readable on Your
            Website
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>
              The SRA number must appear in JSON-LD schema on the website, not
              just as plain text in the footer.
            </strong>{' '}
            Plain text is for humans. JSON-LD is for AI. A correctly structured
            LegalService schema includes your SRA number as an identifier, a
            sameAs link pointing to your SRA register entry, and explicit
            declarations of your practice areas, office location, and firm name.
            Without this, AI models have no authoritative way to confirm your
            firm is regulated.
          </p>

          {/* Section: Step 2 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-12">
            Step 2 &mdash; Claim and Complete Your Regulatory Profile
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>
              AI models cross-reference firm data against authoritative sources.
            </strong>{' '}
            The SRA register is one of the highest-trust sources for UK legal
            firms. Your profile there must match your website exactly &mdash;
            firm name, address, practice areas. Any mismatch reduces AI
            confidence in your identity. TendorAI pulls directly from the SRA
            register and builds a verified profile automatically. You can claim
            it for free.
          </p>

          {/* Section: Step 3 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-12">
            Step 3 &mdash; Structure Your Practice Areas Explicitly
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>
              Generic content like &ldquo;full range of legal services&rdquo; is
              ignored by AI.
            </strong>{' '}
            Explicit service statements such as &ldquo;We specialise in
            residential conveyancing, family law, and employment disputes in
            Cardiff&rdquo; give AI models something to match against user
            queries. Add a knowsAbout array to your schema listing each practice
            area. This is how AI decides whether to recommend your firm for a
            specific query.
          </p>

          {/* Section: Step 4 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-12">
            Step 4 &mdash; Build Consistent Entity Signals Across Directories
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>
              ChatGPT and Perplexity cross-reference multiple sources before
              recommending a firm.
            </strong>{' '}
            Your firm name, address, phone number, and website URL must be
            identical across the SRA register, Google Business Profile, Law
            Society directory, ReviewSolicitors, and your own website. Any
            inconsistency &mdash; even a different phone number format &mdash;
            reduces recommendation confidence.
          </p>

          {/* Section: Step 5 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-12">
            Step 5 &mdash; Get Listed on AI-Indexed Directories
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>
              Some directories are crawled and indexed by AI models more
              frequently than others.
            </strong>{' '}
            The Law Society Find a Solicitor tool, ReviewSolicitors, and
            TendorAI&apos;s verified firm directory are examples of sources AI
            tools pull from when generating solicitor recommendations. Being
            listed on these with consistent, verified data increases the number
            of independent signals AI can use to validate your firm.
          </p>

          {/* Section: How long does it take */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-12">
            How Long Does It Take to Appear in ChatGPT Recommendations?
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>
              Schema changes are typically reflected in AI outputs within 4 to 8
              weeks as models are updated.
            </strong>{' '}
            Perplexity is faster &mdash; it crawls the web in near real-time and
            can surface changes within days. Google AI Overviews reflects Google
            Business Profile changes quickly. Firms that implement all five
            steps typically see measurable improvement within 60 days.
          </p>

          {/* Section: Comparison table */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-12">
            Comparison &mdash; Firms With AI Visibility Setup vs Without
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-[#1B4F72] text-white">
                  <th className="text-left p-4 font-semibold">Factor</th>
                  <th className="text-left p-4 font-semibold">
                    Without AI Visibility Setup
                  </th>
                  <th className="text-left p-4 font-semibold">
                    With AI Visibility Setup
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    Schema markup
                  </td>
                  <td className="p-4 text-gray-600">None or basic</td>
                  <td className="p-4 text-gray-600">
                    Full LegalService JSON-LD with SRA identifier
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-medium text-gray-900">
                    Regulatory data
                  </td>
                  <td className="p-4 text-gray-600">
                    SRA number in footer text only
                  </td>
                  <td className="p-4 text-gray-600">
                    Machine-readable, cross-referenced
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    Directory consistency
                  </td>
                  <td className="p-4 text-gray-600">Often inconsistent</td>
                  <td className="p-4 text-gray-600">
                    NAP identical across all sources
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-medium text-gray-900">
                    Practice area specificity
                  </td>
                  <td className="p-4 text-gray-600">
                    Generic (&ldquo;full legal services&rdquo;)
                  </td>
                  <td className="p-4 text-gray-600">
                    Explicit service and location statements
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    AI recommendation rate
                  </td>
                  <td className="p-4 text-gray-600">Near zero</td>
                  <td className="p-4 text-gray-600">
                    Measurably higher within 60 days
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-medium text-gray-900">
                    Typical setup time
                  </td>
                  <td className="p-4 text-gray-600">N/A</td>
                  <td className="p-4 text-gray-600">
                    48 hours with the TendorAI programme
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <FAQSection />

          {/* Sources */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Sources
            </h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>
                SRA Regulated Firms Register: sra.org.uk
              </li>
              <li>
                Schema.org LegalService specification: schema.org/LegalService
              </li>
              <li>
                Law Society Find a Solicitor:
                solicitors.lawsociety.org.uk
              </li>
              <li>
                TendorAI AI Visibility for Solicitors:
                tendorai.com/ai-visibility-for-solicitors
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="my-12 bg-gradient-to-r from-[#1B4F72] to-[#2d1b4e] rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Is Your Solicitor Firm Appearing in AI Recommendations?
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Most SRA-regulated firms are invisible to ChatGPT, Perplexity and
              Google AI Overviews. Claim your free TendorAI profile to find out
              where your firm stands &mdash; and what to fix first.
            </p>
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg px-8 py-4 text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Check Your AI Visibility
            </Link>
          </div>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
