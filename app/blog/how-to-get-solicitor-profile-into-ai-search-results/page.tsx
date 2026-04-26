import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'How to Get Your Solicitor Profile into AI Search Results';
const DESCRIPTION =
  'Step-by-step guide to getting your solicitor profile into AI search results. Covers SRA listing optimisation, TendorAI profile, schema markup, ReviewSolicitors, and Google Business Profile.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-get-solicitor-profile-into-ai-search-results';
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
    q: 'How do I get my solicitor profile to appear in ChatGPT?',
    a: 'You need structured data that AI can verify. Start with your SRA listing (ensure it\u2019s complete), create a TendorAI profile, and install Schema.org markup on your website. AI uses these data sources to build recommendations.',
  },
  {
    q: 'Does my SRA number help with AI visibility?',
    a: 'Yes. AI platforms cross-reference the SRA Solicitors Register to verify firms. Having your SRA number in your structured data gives AI confidence to recommend you.',
  },
  {
    q: 'What information should I include in my solicitor profile?',
    a: 'Practice areas, SRA number, office locations, partner/solicitor names, specialisms, fee information, client sectors, and reviews. The more complete your data, the more likely AI is to recommend you.',
  },
  {
    q: 'How do ReviewSolicitors reviews affect AI recommendations?',
    a: 'AI platforms trust verified review sources. ReviewSolicitors reviews provide social proof that AI uses when deciding which firms to recommend. More positive reviews = higher AI confidence.',
  },
  {
    q: 'Can a sole practitioner compete with large firms in AI results?',
    a: 'Yes. AI recommends based on data quality, not firm size. A sole practitioner with complete structured data, good reviews, and clear specialisms can outrank a large firm with poor data.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Verify Your SRA Listing Is Complete and Accurate',
    content:
      'Your SRA listing is the foundational data source that AI platforms cross-reference when verifying solicitors. Log into mySRA and ensure every field is complete: all practice areas you cover, every office address where you practise, all authorised individuals listed under your firm, and current email addresses and phone numbers. AI platforms like ChatGPT and Perplexity check the SRA Solicitors Register to confirm that a firm is genuine and regulated before recommending it. If your listing is incomplete \u2014 missing practice areas, outdated contact details, or unlisted offices \u2014 AI tools either skip your firm entirely or lack the confidence to recommend you. Cross-check that your firm name, address, and contact details match exactly across your SRA listing, website, and Google Business Profile. This step is free, takes ten minutes, and has the highest impact on your AI visibility of anything on this list.',
  },
  {
    number: 2,
    title: 'Claim Your TendorAI Profile',
    content:
      'Claim your free profile on TendorAI and fill in every detail: your SRA number, practice areas, specialisms, fee ranges, and office locations. TendorAI converts this information into AI-readable structured data that platforms like ChatGPT, Perplexity, Claude, and Gemini can parse directly. Unlike a standard website, which AI has to interpret from unstructured text, a TendorAI profile presents your firm\u2019s data in a format AI tools are built to consume. TendorAI pulls directly from SRA regulatory data, so your profile starts with verified information that AI platforms already trust. Include your client sectors (individuals, SMEs, corporates), languages spoken, and any accreditations such as Lexcel or Conveyancing Quality Scheme. A free profile gets you listed; upgrading to a paid plan adds schema markup installation on your website and weekly AI mention tracking so you can see which platforms recommend you.',
  },
  {
    number: 3,
    title: 'Add LegalService Schema Markup to Your Website',
    content:
      'Schema.org markup is structured code embedded in your website that tells AI exactly what your firm does. For solicitors, the key schema type is LegalService. The fields that matter most are: name (your firm\u2019s legal name), address (each office location with postcode), areaServed (the towns, cities, and regions you cover), knowsAbout (your practice areas \u2014 conveyancing, family law, immigration, employment, wills and probate), hasCredential (your SRA number), and sameAs (links to your SRA register entry, ReviewSolicitors profile, and other authoritative sources). This markup is invisible to visitors but is the single most important technical signal for AI platforms. Without it, AI tools have to guess what you do by reading your website copy, and they frequently guess wrong or skip you entirely. If you do not have a developer to hand, TendorAI Pro installs this markup on your website automatically as part of the subscription.',
  },
  {
    number: 4,
    title: 'Get Listed on ReviewSolicitors',
    content:
      'ReviewSolicitors is the leading verified review platform for UK solicitors, and its data feeds directly into AI recommendations. Claim your profile, ensure your practice areas and office locations are correct, and respond to any existing reviews. Then actively encourage satisfied clients to leave feedback \u2014 a simple follow-up email after matter completion works well. AI tools weigh both the volume and recency of reviews: a firm with twenty reviews from the last six months will rank higher in AI recommendations than a firm with fifty reviews that are all three years old. Respond to every review, positive or negative, as this signals active engagement to AI platforms. Beyond ReviewSolicitors, claim your Google Reviews and Trustpilot profiles. The combination of verified reviews across multiple platforms gives AI strong social proof that your firm delivers quality service and can be recommended with confidence.',
  },
  {
    number: 5,
    title: 'Publish Practice Area FAQ Pages',
    content:
      'AI assistants answer questions \u2014 so your website needs to contain the answers. Create a dedicated FAQ page for each practice area you cover. For conveyancing: \u201cHow long does conveyancing take?\u201d, \u201cWhat are the solicitor fees for buying a house?\u201d, \u201cDo I need a solicitor to remortgage?\u201d. For family law: \u201cHow much does a divorce solicitor cost?\u201d, \u201cWhat is the difference between a financial order and a consent order?\u201d. For immigration: \u201cHow long does a spouse visa application take?\u201d, \u201cDo I need a solicitor for a visa application?\u201d. Write in plain English that a member of the public would understand, not legal jargon. Mark up each FAQ page with FAQPage schema so AI tools can parse the questions and answers directly. This content serves double duty: it helps your traditional SEO and feeds directly into AI-generated answers when people ask these exact questions.',
  },
  {
    number: 6,
    title: 'Ensure Your Google Business Profile Is Complete',
    content:
      'Google Business Profile (GBP) is one of the most heavily crawled data sources for AI platforms, including Google\u2019s own Gemini and AI Overviews. Ensure your GBP has the correct primary and secondary categories (e.g. Solicitor, Immigration Attorney, Conveyancing Service), high-quality photos of your office and team, accurate opening hours, a detailed business description that includes your key practice areas and locations, and your website URL. Add all office locations as separate listings if applicable. AI tools like Gemini pull directly from GBP data, so an incomplete profile means reduced visibility in AI-generated responses. Keep your GBP information consistent with your SRA listing and website \u2014 the firm name, address format, and phone number should be identical across all three. Data conflicts between platforms reduce AI confidence and make it less likely you will be recommended.',
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

export default function HowToGetSolicitorProfileIntoAiSearchResultsPage() {
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
              <span className="text-white">Solicitor Profile AI Search</span>
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
          {/* Opening paragraph */}
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Getting your solicitor profile into AI search results requires
            structured data that AI platforms can verify and trust. Here&apos;s
            exactly how to do it, step by step.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            When someone asks ChatGPT &quot;Who are the best solicitors for
            conveyancing near me?&quot; or tells Perplexity &quot;Find me an
            immigration solicitor in Birmingham&quot;, the AI does not return a
            list of website links. It names specific firms and individual
            solicitors. The firms that get named are the ones whose data is
            structured, verified, and consistent across multiple sources. If your
            profile data is incomplete or scattered, AI tools cannot confidently
            recommend you &mdash; regardless of how experienced you are or how
            many clients you serve. The six steps below will fix that.
          </p>

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

          {/* Summary */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Summary: The 6-Step Checklist
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
              Check Your Solicitor Profile&apos;s AI Visibility
            </h2>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Run a free AI visibility report for your solicitor profile. See
              how AI assistants perceive your firm and get specific steps to
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
                href="/blog/how-to-get-your-law-firm-visible-to-ai-assistants"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  Law Firm AI Visibility Guide
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Step-by-step guide to getting your law firm recommended by
                  ChatGPT, Perplexity, and Claude.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
