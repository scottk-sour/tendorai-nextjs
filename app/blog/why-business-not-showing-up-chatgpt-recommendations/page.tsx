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
    title: 'No Structured Data on Your Website',
    problem:
      'ChatGPT cannot parse unstructured web pages reliably. When your website is just paragraphs of text without machine-readable markup, AI models have to guess what your business does, where you are located, and what services you offer. That guesswork usually means you get skipped entirely in favour of a competitor whose data is clear and structured. Most business websites were built for human visitors, not AI consumption \u2014 and AI needs a different kind of information architecture to understand you.\n\nIn TendorAI\u2019s analysis of UK professional services firms, firms with properly implemented Schema.org markup are cited in AI responses 3.2 times more often than those without.',
    fix: 'Install Schema.org markup on your website. Use the appropriate types for your business \u2014 LocalBusiness, LegalService, FinancialService, AccountingService, RealEstateAgent, or ProfessionalService \u2014 and include your services, service areas, contact details, opening hours, and pricing where applicable. This markup is invisible to visitors but gives AI models a structured, machine-readable description of your business. TendorAI Pro creates and installs this structured data for you automatically, formatted exactly how AI models expect to read it.',
  },
  {
    number: 2,
    title: 'No Visible Client Reviews',
    problem:
      'AI uses reviews as a trust signal. A business with zero reviews gives ChatGPT nothing to assess quality or reliability against. When someone asks \u201cWho is the best conveyancing solicitor in Leeds?\u201d, AI needs evidence to justify a recommendation. No reviews means no evidence, which means no recommendation. Even a handful of mediocre reviews is better than none at all \u2014 at least they prove you have real clients.',
    fix: 'Actively collect reviews on Google, Trustpilot, and industry-specific platforms like ReviewSolicitors, VouchedFor, or unbiased.co.uk. Aim for at least five to ten genuine reviews with an average rating above 4.0. Send a simple follow-up email to satisfied clients after completing their matter or engagement. Respond to every review professionally, positive or negative \u2014 AI models can read your responses too, and they contribute to the overall trust picture. Recent reviews carry more weight than old ones, so make review collection an ongoing habit rather than a one-off effort.',
  },
  {
    number: 3,
    title: 'Missing or Incomplete Google Business Profile',
    problem:
      'Google Business Profile (GBP) is one of the most heavily crawled data sources for AI platforms, including Google\u2019s own Gemini and AI Overviews. If your GBP is unclaimed, half-finished, or has the wrong categories, AI tools either cannot find you or do not have enough confidence to recommend you. A GBP with no photos, no opening hours, a generic business description, and a single category tells AI you are not a serious business worth recommending.\n\nOf the 8,625 UK solicitors TendorAI tracks, firms with complete Google Business Profiles receive AI recommendations at twice the rate of those with incomplete or unclaimed listings.',
    fix: 'Claim your Google Business Profile at business.google.com if you have not already. Set the correct primary category (e.g. Solicitor, Mortgage Broker, Accountant) and add relevant secondary categories. Write a detailed business description that includes your key services, specialisms, and the areas you serve. Add high-quality photos of your office and team, accurate opening hours, your phone number, and your website URL. If you have multiple offices, create a separate listing for each. Keep your GBP information consistent with your website and regulatory register \u2014 AI cross-references these sources and penalises inconsistencies.',
  },
  {
    number: 4,
    title: 'No Pricing Transparency',
    problem:
      'AI platforms favour businesses that publish pricing information. When someone asks ChatGPT \u201cHow much does conveyancing cost in Manchester?\u201d, it looks for businesses that provide clear fee data. If your website says \u201cContact us for a quote\u201d without any indication of costs, AI has nothing to reference and will recommend a competitor who publishes their fees instead. Pricing transparency is also a trust signal \u2014 it suggests confidence in your service and respect for the client\u2019s time.',
    fix: 'Add clear pricing or fee ranges to your service pages. You do not need to publish exact figures \u2014 ranges work well (\u201cConveyancing fees from \u00a3850 + VAT\u201d, \u201cDivorce proceedings typically \u00a35,000\u2013\u00a315,000\u201d). Include pricing in your Schema.org markup using the priceRange property. For regulated professions, this often aligns with existing transparency requirements \u2014 the SRA requires solicitors to publish pricing for certain services, and the FCA expects clear fee disclosure. Firms that publish fees are consistently recommended more often by AI assistants than those that hide their costs behind a phone call.',
  },
  {
    number: 5,
    title: 'Inconsistent NAP Data Across Platforms',
    problem:
      'AI models cross-reference multiple sources when deciding whether to recommend a business. If your Google Business Profile says you are in \u201cCardiff\u201d but your website says \u201cSouth Wales\u201d, and your SRA listing has a different phone number, AI loses confidence in your data. Even small discrepancies \u2014 \u201cSt.\u201d versus \u201cStreet\u201d, \u201c& \u201d versus \u201cand\u201d, a missing postcode \u2014 can cause problems. Inconsistency is a trust killer. AI would rather recommend nobody than recommend unreliable information.',
    fix: 'Audit every platform where your business appears: your website, Google Business Profile, regulatory register (SRA, FCA, ICAEW), industry directories, Trustpilot, ReviewSolicitors, social media profiles, and Companies House. Ensure your Name, Address, and Phone number (NAP) are identical everywhere. Choose one format for your business name, one format for your address, and one phone number, and use them consistently across every platform without exception. If you have rebranded, moved offices, or changed phone numbers recently, update every listing immediately. A TendorAI profile helps by creating a single structured source of truth that AI platforms can reference.',
  },
  {
    number: 6,
    title: 'Thin or Generic Website Content',
    problem:
      'AI answers conversational questions. People ask ChatGPT things like \u201cWhat does a conveyancing solicitor do?\u201d and \u201cHow much does a divorce solicitor cost in Birmingham?\u201d. If your website only has brief, generic service descriptions \u2014 \u201cWe offer a range of legal services\u201d \u2014 or formal jargon that nobody would naturally say aloud, your content does not match the query patterns AI models are trying to answer. AI needs specific, detailed, plain-English content to work with.\n\nTendorAI\u2019s data shows that solicitor firms with fewer than 300 words per service page have an average AI visibility score of 18 out of 100. Firms with detailed FAQ content and 500+ words per page average 41 out of 100.',
    fix: 'Add FAQ pages and detailed service content to your website that directly answers the questions people ask AI. Write in plain English that your clients would understand. Create pages that answer: \u201cWhat does [your service] cost?\u201d, \u201cHow long does [your service] take?\u201d, \u201cWhat is the difference between [service A] and [service B]?\u201d, and \u201cDo I need a [your profession] for [common situation]?\u201d. Structure these with Schema.org FAQPage markup so AI can parse them directly. Aim for at least 500 words per service page and five to ten FAQ questions per practice area. This content serves double duty: it helps your traditional SEO and feeds directly into AI-generated answers.',
  },
  {
    number: 7,
    title: 'You\u2019re Not Listed on Regulatory and Professional Directories',
    problem:
      'AI models treat regulatory registers as high-trust data sources. The SRA register, FCA register, and ICAEW directory are among the most authoritative sources AI platforms use when verifying professional services firms. If your firm appears on these registers but that data isn\u2019t connected to your web presence, AI can\u2019t match you to search queries. Worse, if your register data conflicts with your website \u2014 different address, different trading name, different phone number \u2014 AI loses confidence and skips you entirely.',
    fix: 'Ensure your regulatory register listing is complete and matches your website exactly. For SRA-registered firms, check your entry at solicitors.lawsociety.org.uk. For FCA-regulated advisers, verify your entry at register.fca.org.uk. For ICAEW members, check icaew.com/about-icaew/find-a-chartered-accountant. TendorAI pulls directly from these registers to build your structured profile \u2014 ensuring the data AI trusts most is connected to your business and working in your favour.',
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
              <span className="text-purple-200">10 min read</span>
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

          <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
            <p className="text-sm leading-relaxed text-gray-200">
              <strong className="text-white">TendorAI analysed 8,625 SRA-registered UK solicitors.</strong> 73% are completely invisible to ChatGPT. 17% have no website at all. The firms that do appear share a consistent set of characteristics &mdash; here&apos;s exactly what they are.
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            ChatGPT doesn&apos;t work like Google. It doesn&apos;t crawl
            websites and rank them by links and keywords. Instead, it pulls from
            training data, structured information, and &mdash; when browsing is
            enabled &mdash; real-time web data to generate recommendations. If
            your business isn&apos;t represented clearly in those sources, you
            simply won&apos;t appear.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            Here are the 7 specific reasons your business isn&apos;t showing up
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
              Every one of these seven issues comes back to the same root cause:
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
