import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  "Why Your Business Isn't Showing Up in ChatGPT Recommendations (And How to Fix It)";
const DESCRIPTION =
  "6 reasons your business doesn't appear in ChatGPT recommendations and specific fixes for each. Covers structured data, reviews, directory listings and more.";
const CANONICAL =
  'https://www.tendorai.com/blog/why-business-not-showing-up-chatgpt-recommendations';
const PUBLISHED = '2026-03-01';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
  alternates: {
    canonical: CANONICAL,
  },
};

const reasons = [
  {
    number: 1,
    title: "You Don't Have Structured Data on Your Website",
    problem:
      "ChatGPT can't parse unstructured web pages reliably. When your website is just paragraphs of text without machine-readable markup, AI models have to guess what your business does, where you're located, and what services you offer. That guesswork usually means you get skipped entirely in favour of a competitor whose data is clear and structured.",
    fix: 'Install Schema.org markup on your website. Use the appropriate types for your business — LocalBusiness, LegalService, FinancialService, AccountingService, RealEstateAgent, or InsuranceAgency — and include your services, service areas, contact details, opening hours, and pricing where applicable. TendorAI Pro creates and installs this structured data for you automatically, formatted exactly how AI models expect to read it.',
  },
  {
    number: 2,
    title: 'Your Directory Listings Are Incomplete or Inconsistent',
    problem:
      "AI models cross-reference multiple sources when deciding whether to recommend a business. If your Google Business Profile says you're in \"Cardiff\" but your website says \"South Wales\", and your SRA listing has a different phone number, AI loses confidence in your data. Inconsistency is a trust killer — AI would rather recommend nobody than recommend unreliable information.",
    fix: 'Audit every directory listing your business appears on. Ensure your Name, Address, and Phone number (NAP) are identical everywhere — your website, Google Business Profile, SRA/FCA register, industry directories, and social media profiles. Even small differences like "St." versus "Street" can cause problems. Use the exact same formatting everywhere.',
  },
  {
    number: 3,
    title: 'You Have No Reviews or Very Few Reviews',
    problem:
      'AI uses reviews as a trust signal. A business with zero reviews gives ChatGPT nothing to assess quality or reliability against. When someone asks "Who is the best conveyancing solicitor in Leeds?", AI needs evidence to justify a recommendation. No reviews means no evidence, which means no recommendation.',
    fix: 'Actively collect reviews on Google, Trustpilot, and industry-specific platforms like ReviewSolicitors, VouchedFor, Feefo, or unbiased.co.uk. Aim for at least 5-10 genuine reviews with an average rating above 4.0. Respond to reviews professionally — AI models can read your responses too, and they contribute to the overall trust picture.',
  },
  {
    number: 4,
    title: "Your Website Content Doesn't Match How People Ask AI",
    problem:
      'AI answers conversational questions. People ask ChatGPT things like "What does a conveyancing solicitor do?" and "How much does a divorce solicitor cost in Birmingham?". If your website only has formal, jargon-heavy service descriptions that nobody would naturally say out loud, your content doesn\'t match the query patterns AI models are trying to answer.',
    fix: 'Add FAQ pages and conversational content to your website that directly answers the questions people ask AI. Write in plain English. Include pages that answer "What does [your service] cost?", "How long does [your service] take?", "What is the difference between [service A] and [service B]?", and "Do I need a [your profession] for [common situation]?". Structure these as proper FAQ markup with Schema.org FAQPage schema.',
  },
  {
    number: 5,
    title: "You're Not Listed on Verified Industry Directories",
    problem:
      'AI trusts verified sources more than unverified ones. Regulatory registers like the SRA Solicitors Register, FCA Financial Services Register, and ICAEW directory carry significant weight because their data is verified. Industry platforms like TendorAI, Checkatrade, and sector-specific directories provide structured, verified data that AI can trust. If you only exist on your own website, AI has a single unverified source — and that is not enough.',
    fix: 'Claim and complete your profile on every relevant verified directory. Start with your regulatory register (SRA, FCA, ICAEW, CILEx, or equivalent). Then claim your Google Business Profile, and sign up to industry directories including TendorAI, which structures your data specifically for AI consumption. The more verified sources that confirm your business details, the more confident AI becomes in recommending you.',
  },
  {
    number: 6,
    title: 'Your Business Is Too New or Has Changed Recently',
    problem:
      "AI knowledge has a time lag. ChatGPT's base training data is not updated in real-time, and even its browsing feature needs time to discover and index new information. If your business launched recently, rebranded, moved offices, or changed its service offering, there may not be enough of a data footprint for AI to work with yet.",
    fix: "Be patient but proactive. Get your structured data, directory listings, and review presence in place now. ChatGPT's browsing feature accesses current web data, so properly structured information can be picked up within 2-4 weeks. The base model's training data updates on a longer cycle, but having consistent structured data across multiple sources means you'll be included when the next update happens. The worst thing you can do is wait — start building your data presence today.",
  },
];

const faqs = [
  {
    q: "Why doesn't ChatGPT know about my business?",
    a: "ChatGPT uses training data and web-connected search. If your business lacks structured data, directory listings, and reviews, ChatGPT has no reliable information to base a recommendation on.",
  },
  {
    q: 'How do I get ChatGPT to recommend my business?',
    a: "Create structured data (Schema.org markup), maintain complete directory listings (Google Business Profile, industry directories), build a review presence, and ensure NAP consistency. TendorAI automates most of this.",
  },
  {
    q: 'Does ChatGPT use Google results?',
    a: "ChatGPT with browsing enabled can access web data, and its training includes web content. However, it prioritises structured, verifiable data over raw web pages. Having Schema.org markup is more effective than SEO alone.",
  },
  {
    q: 'How long does it take to appear in ChatGPT?',
    a: "Typically 2-4 weeks after implementing structured data changes. ChatGPT's browsing feature accesses current data, but its base knowledge updates on a longer cycle.",
  },
  {
    q: 'Can I pay to appear in ChatGPT recommendations?',
    a: 'No. ChatGPT recommendations are based on data quality, not advertising. You cannot buy placement. This makes structured data and verified information even more important.',
  },
];

function ReasonCard({ reason }: { reason: (typeof reasons)[number] }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Card header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          {reason.number}. {reason.title}
        </h2>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Problem */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-700">
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Problem
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">{reason.problem}</p>
        </div>

        {/* Fix */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Fix
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">{reason.fix}</p>
        </div>
      </div>
    </div>
  );
}

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

export default function WhyBusinessNotShowingUpPage() {
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
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
              <span className="text-white">ChatGPT Recommendations</span>
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
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Intro */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            You&apos;ve searched for your own business on ChatGPT and it
            doesn&apos;t appear. Competitors show up. You don&apos;t. It&apos;s
            frustrating, but it&apos;s fixable. The most common reason is
            straightforward: ChatGPT doesn&apos;t have enough structured,
            verifiable data about your business to feel confident recommending
            you.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            ChatGPT doesn&apos;t work like Google. It doesn&apos;t crawl
            websites and rank them by links and keywords. Instead, it pulls from
            training data, structured information, and &mdash; when browsing is
            enabled &mdash; real-time web data to generate recommendations. If
            your business isn&apos;t represented clearly in those sources, you
            simply won&apos;t appear.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            Here are the 6 specific reasons your business isn&apos;t showing up
            in ChatGPT recommendations, and exactly how to fix each one.
          </p>

          {/* Reason cards */}
          <div className="space-y-8">
            {reasons.map((reason) => (
              <ReasonCard key={reason.number} reason={reason} />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              The Common Thread
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Every one of these six issues comes back to the same root cause:
              AI models need structured, verifiable, consistent data to make
              recommendations. Unlike traditional search engines that rank pages
              by links and keywords, AI models evaluate the quality and
              reliability of information itself.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The businesses that show up in ChatGPT recommendations are not
              necessarily the biggest or the ones spending the most on marketing.
              They are the ones whose data is clean, structured, verified, and
              consistent across multiple sources. That is an achievable standard
              for any business willing to put the work in &mdash; or use a
              platform like{' '}
              <Link
                href="/for-vendors"
                className="text-purple-600 hover:text-purple-700 underline"
              >
                TendorAI
              </Link>{' '}
              to do it for them.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="my-12 bg-purple-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Find Out Why AI Doesn&apos;t Recommend You
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Our free AEO report scans ChatGPT, Perplexity, Claude, Gemini,
              Copilot, and Meta AI to show you exactly where your business
              stands. Get your visibility score, see who AI recommends instead of
              you, and get specific fixes.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-lg"
            >
              Get Your Free AEO Report
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
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <FAQSection />

          {/* Internal links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Related Reading
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/for-vendors"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  How TendorAI Makes Your Business Visible to AI
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  More Articles on AI Visibility
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-visibility-uk"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  AI Visibility for UK Businesses
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </main>
    </>
  );
}
