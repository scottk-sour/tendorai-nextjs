import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'How to Improve AI Visibility for Mortgage Advisers in the UK';
const DESCRIPTION =
  'A complete guide for UK mortgage advisers to improve AI visibility. Covers FCA register data, structured data profiles, and how to get recommended by ChatGPT and Perplexity.';
const CANONICAL =
  'https://www.tendorai.com/blog/ai-visibility-mortgage-advisors-uk';
const PUBLISHED = '2026-03-01';

export const metadata: Metadata = {
  title: TITLE,
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
    q: 'How do I get my mortgage advice firm recommended by ChatGPT?',
    a: 'Ensure your FCA register entry is complete, create structured data profiles on TendorAI and Google Business Profile, and install Schema.org markup on your website. AI needs verifiable data about your authorisations and specialisms.',
  },
  {
    q: 'Does the FCA register affect AI visibility for mortgage advisers?',
    a: 'Yes. AI platforms cross-reference the FCA Financial Services Register to verify firms and advisers. Having complete permissions, principal details, and contact information on the FCA register directly impacts whether AI recommends you.',
  },
  {
    q: 'What prompts do AI platforms use to recommend mortgage advisers?',
    a: 'Common prompts include "Can you recommend a mortgage adviser in [city]?", "Who is the best mortgage broker near me?", "Find a first-time buyer mortgage adviser in [area]". AI answers based on structured data it can find about local advisers.',
  },
  {
    q: 'How is AI visibility different from mortgage lead generation?',
    a: 'Traditional lead gen involves paying for leads from comparison sites. AI visibility means appearing in organic AI recommendations when people ask ChatGPT or Perplexity for advice. It\u2019s free organic traffic, not paid leads.',
  },
  {
    q: 'Can independent mortgage advisers compete with networks in AI results?',
    a: 'Absolutely. AI doesn\u2019t favour large networks over independents. It recommends based on data quality, local presence, and specialisms. A well-optimised independent adviser can outrank a national network in their local area.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Complete Your FCA Register Entry',
    content:
      'Your FCA register entry is the single most important data source AI platforms check when verifying mortgage advisers. Log into FCA Connect and ensure every field is accurate and complete: all permissions (mortgage advising, mortgage arranging, insurance mediation), principal details, trading names, and every office address where you practise. AI platforms like ChatGPT and Perplexity cross-reference the FCA Financial Services Register before recommending any financial services firm. If your permissions are missing, your trading name is outdated, or your office addresses are incomplete, AI tools either skip your firm entirely or lack the confidence to recommend you. This step is free, takes fifteen minutes, and has the highest impact on your AI visibility of anything on this list.',
  },
  {
    number: 2,
    title: 'Create a TendorAI Profile',
    content:
      'Claim your free profile on TendorAI and complete every section: your FCA number, specialisms (residential mortgages, buy-to-let, first-time buyer, equity release, commercial finance), coverage areas, fee structure, and contact details. TendorAI converts this information into AI-readable structured data that platforms like ChatGPT, Perplexity, Claude, and Gemini can parse directly. Unlike your website, which AI has to interpret from unstructured text, a TendorAI profile presents your firm\u2019s data in a format AI tools are built to consume. Include your client types (first-time buyers, home movers, landlords, self-employed borrowers), lender panel details, and any qualifications such as CeMAP or CeRER. The more complete your profile, the more data points AI has to match you with relevant queries.',
  },
  {
    number: 3,
    title: 'Install Structured Data on Your Website',
    content:
      'Schema.org markup is structured code embedded in your website that tells AI exactly what your firm does. For mortgage advisers, the key schema type is FinancialService. The fields that matter most are: name (your firm\u2019s trading name), address (each office location), areaServed (the towns, cities, and regions you cover), knowsAbout (your specialisms \u2014 residential mortgages, buy-to-let, equity release, protection), and hasCredential (your FCA number and any professional qualifications). This markup is invisible to visitors but is the single most important technical signal for AI platforms. Without it, AI tools have to guess what you do by reading your website copy, and they frequently guess wrong. TendorAI Pro installs this markup on your website automatically as part of the subscription, so you do not need a developer.',
  },
  {
    number: 4,
    title: 'Publish FAQ Content Around Mortgage Queries Buyers Ask AI',
    content:
      'Write clear, detailed answers to the questions your clients actually ask AI tools: \u201cHow much deposit do I need for a first home?\u201d, \u201cWhat\u2019s the difference between fixed and variable rate mortgages?\u201d, \u201cCan I get a mortgage with bad credit?\u201d, \u201cHow does buy-to-let mortgage criteria work?\u201d, \u201cWhat happens if my fixed rate is ending?\u201d, \u201cCan I get a mortgage if I\u2019m self-employed?\u201d. Publish these as a dedicated FAQ page or blog posts on your website and mark them up with FAQPage schema so AI can parse them directly. When someone asks ChatGPT \u201cCan I get a mortgage with CCJs?\u201d and your website has a detailed, expert answer to that exact question, AI is far more likely to reference your firm. Write in plain English, not financial jargon. Structure each answer with the question as an H2 or H3 heading followed by a clear explanation. This content also drives organic search traffic, so you benefit twice.',
  },
  {
    number: 5,
    title: 'Build Google Reviews and Trustpilot Presence',
    content:
      'AI platforms use reviews as a confidence signal when deciding which mortgage advisers to recommend. Claim your Google Reviews and Trustpilot profiles, and get listed on VouchedFor, the leading review platform for UK financial advisers. Mortgage clients trust reviews heavily \u2014 a recommendation from a friend carries weight, but twenty verified five-star reviews carry more. Actively encourage satisfied clients to leave a review after completion: a simple follow-up email works well. AI tools weigh both the volume and recency of reviews. A firm with fifteen reviews from the last three months will rank higher in AI recommendations than a firm with fifty reviews that are all two years old. Respond to every review, positive or negative, as this signals active engagement. The combination of verified reviews across Google, Trustpilot, and VouchedFor gives AI strong social proof that your firm delivers quality mortgage advice.',
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

export default function AiVisibilityMortgageAdvisorsUkPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
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
      },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
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

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white py-12 md:py-16">
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
              <span className="text-white">AI Visibility for Mortgage Advisers</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                How-To Guide
              </span>
              <span className="text-purple-200">7 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 1 March 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Mortgage advisers face a unique AI visibility challenge. First-time
            buyers, remortgagers, and buy-to-let investors are increasingly
            asking AI for recommendations before checking comparison sites.
            Here&apos;s how to make sure AI recommends you.
          </p>

          {/* Section: Why AI Visibility Matters */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why AI Visibility Matters for Mortgage Advisers
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The way people find mortgage advisers is shifting. For years,
              comparison sites like Unbiased and VouchedFor dominated lead
              generation. Now, a growing number of borrowers &mdash; especially
              first-time buyers &mdash; are turning to ChatGPT, Perplexity, and
              Google&apos;s AI Overviews to ask questions like &quot;Can you
              recommend a mortgage adviser in Manchester?&quot; or &quot;Who is
              the best broker for first-time buyers near me?&quot;.
            </p>
            <p className="text-gray-600 leading-relaxed">
              AI doesn&apos;t return a list of links. It names specific firms and
              advisers. Perplexity cites FCA data when making recommendations.
              ChatGPT references structured profiles and review platforms. The
              advisers AI knows about get the warm leads &mdash; people who have
              already decided they want advice and are looking for a specific
              recommendation. If AI doesn&apos;t know you exist, those leads go
              to your competitors.
            </p>
          </section>

          {/* Section: What AI Looks For */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What AI Platforms Look for When Recommending Mortgage Advisers
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI platforms need to be confident before recommending a financial
              services firm. They look for several key signals: FCA
              authorisation data (permissions, principal details, regulatory
              status), local presence (office addresses matching the area
              someone is searching for), specialisms (first-time buyer,
              buy-to-let, equity release, protection), client reviews across
              trusted platforms, and structured website data that AI can parse
              without ambiguity.
            </p>
            <p className="text-gray-600 leading-relaxed">
              AI wants to verify you are authorised before recommending you.
              This is not optional &mdash; it&apos;s the foundation of mortgage
              adviser AI visibility. If your FCA data is incomplete or your
              website doesn&apos;t have structured markup, AI cannot verify your
              credentials and will recommend someone else.
            </p>
          </section>

          {/* Steps */}
          <div className="space-y-10">
            {steps.map((step) => (
              <section key={step.number}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0 mt-1">
                    {step.number}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Summary checklist */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Summary: The 5-Step Checklist
            </h2>
            <ol className="space-y-3">
              {steps.map((step) => (
                <li key={step.number} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-purple-600 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700 text-sm font-medium">
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Check Your Mortgage Firm&apos;s AI Visibility
            </h2>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Run a free AI visibility report for your mortgage advice firm. See
              how AI assistants perceive your business and get specific steps to
              improve your recommendations.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center bg-white text-purple-700 font-semibold rounded-lg px-8 py-4 text-lg hover:bg-purple-50 transition-colors"
            >
              Get Your Free Report
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

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <FAQSection />
          </section>

          {/* Internal links */}
          <section className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Related Pages
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/for-vendors"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  For Firms
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  See how TendorAI helps UK firms get recommended by AI
                  platforms.
                </p>
              </Link>
              <Link
                href="/blog"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  Blog
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  More guides on AI visibility, AEO, and structured data for
                  professional services.
                </p>
              </Link>
              <Link
                href="/ai-visibility-uk"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  AI Visibility UK
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Learn how UK businesses are optimising for AI search engines
                  and recommendation platforms.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
