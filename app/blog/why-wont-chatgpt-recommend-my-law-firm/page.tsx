import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  "Why Won't ChatGPT Recommend My Law Firm? (And What to Do About It)";
const DESCRIPTION =
  'Your competitors appear in ChatGPT recommendations but your law firm doesn\'t. Here\'s exactly why — and the specific fixes that get solicitors visible to AI assistants like ChatGPT, Perplexity, Gemini and Claude.';
const CANONICAL =
  'https://www.tendorai.com/blog/why-wont-chatgpt-recommend-my-law-firm';
const PUBLISHED = '2026-03-08';

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

const sections = [
  {
    number: 1,
    title: 'Your Website Doesn\'t Speak AI',
    body: `Most law firm websites were built to impress human visitors — clean layouts, professional photography, a confident "About Us" page. But AI assistants don't see any of that. They parse data. And if your website doesn't have structured data markup — specifically Schema.org types like LegalService, Attorney, or LocalBusiness — then ChatGPT, Perplexity, and Gemini have to guess what your firm does, where you're based, and what practice areas you cover.

Guessing means low confidence. Low confidence means you get skipped.

**What to do:** Add Schema.org structured data to your website. At minimum, mark up your firm name, address, phone number, practice areas, service areas, and opening hours using the LegalService or Attorney schema types. If your website runs on WordPress, plugins like Yoast or Rank Math can help. If you're on a custom build, your developer can add JSON-LD scripts to the page head. TendorAI Pro creates and installs this structured data for you automatically, formatted exactly how AI models expect to read it.`,
  },
  {
    number: 2,
    title: 'No Client Reviews for AI to Reference',
    body: `When someone asks ChatGPT "Who is the best conveyancing solicitor in Cardiff?", it needs evidence to justify a recommendation. Reviews are that evidence. A law firm with zero reviews on Google, Trustpilot, or ReviewSolicitors gives AI nothing to work with — no star ratings, no client testimonials, no trust signal.

Even a small number of genuine reviews (five to ten) with an average rating above 4.0 is enough to get noticed. The firms appearing in AI recommendations aren't necessarily the ones with hundreds of reviews — they're the ones with recent, positive, verifiable feedback.

**What to do:** Start collecting reviews systematically. Send a short follow-up email to clients after completing their matter, with a direct link to your Google Business Profile or ReviewSolicitors page. Respond to every review, positive or negative — AI models can read your responses and they contribute to the trust picture. Aim for at least one new review per month to show AI that your firm is active and current.`,
  },
  {
    number: 3,
    title: 'Your Google Business Profile Is Incomplete',
    body: `Google Business Profile is one of the most heavily crawled data sources for AI platforms — including Google's own Gemini, but also ChatGPT with browsing and Perplexity. If your GBP is unclaimed, has a generic description, uses the wrong business category, or lacks photos and opening hours, AI models don't have enough confidence to recommend you.

Many solicitors claimed their GBP years ago and never touched it again. The listing still says "Legal Services" as the primary category instead of "Solicitor" or a more specific type. The description is two sentences. There are no photos. No opening hours. No service areas listed.

**What to do:** Log into business.google.com and complete every field. Set your primary category to "Solicitor" (or "Conveyancing Solicitor", "Family Law Solicitor" etc. if available). Add secondary categories for other practice areas. Write a detailed business description that includes your key services, specialisms, and the specific towns or cities you serve. Add photos of your office and team. Set accurate opening hours. If you have multiple offices, create a separate listing for each location.`,
  },
  {
    number: 4,
    title: 'You Don\'t Publish Your Fees',
    body: `The SRA already requires solicitors to publish pricing for certain services — conveyancing, probate, employment tribunals, immigration, and others. But many firms either bury this information in a PDF download or provide only a vague "fees from £X" without useful detail.

AI platforms favour firms that publish clear pricing. When someone asks "How much does conveyancing cost in Manchester?", ChatGPT looks for firms with actual fee data to reference. "Contact us for a quote" gives it nothing to work with.

**What to do:** Add clear pricing or fee ranges to your service pages. Ranges are fine — "Conveyancing fees from £850 + VAT for a standard freehold purchase" is much better than nothing. Include pricing in your Schema.org markup using the priceRange property. If you offer fixed fees for any service, make those prominent. Pricing transparency is both a regulatory requirement and an AI visibility advantage — firms that publish fees consistently appear more often in AI recommendations.`,
  },
  {
    number: 5,
    title: 'Your Data Is Inconsistent Across Platforms',
    body: `AI models cross-reference multiple sources when deciding whether to recommend a firm. Your website, your Google Business Profile, the SRA Solicitors Register, your Law Society listing, ReviewSolicitors, Trustpilot, and your social media profiles all need to tell the same story.

If your SRA listing says "Smith & Jones Solicitors" but your Google Business Profile says "Smith and Jones Legal", and your website says "Smith Jones Law" — AI loses confidence in your data. Even small inconsistencies like different phone numbers, "St." versus "Street", or a missing postcode can cause problems. AI would rather recommend nobody than recommend unreliable information.

**What to do:** Audit every platform where your firm appears. Check the SRA Solicitors Register, Law Society Find a Solicitor, Google Business Profile, your website, Trustpilot, ReviewSolicitors, social media, and any legal directories you're listed in. Your firm name, address, and phone number must be identical everywhere. Choose one format and stick to it. A TendorAI profile creates a single structured source of truth that AI platforms can reference with confidence.`,
  },
  {
    number: 6,
    title: 'Your Website Content Doesn\'t Match What People Ask AI',
    body: `People don't ask ChatGPT formal legal questions. They ask things like "Do I need a solicitor to buy a house?", "How long does a divorce take?", and "What's the difference between a barrister and a solicitor?". If your website only has brief service descriptions written in legal jargon — "We provide a comprehensive range of legal services to both private and commercial clients" — your content doesn't match the conversational queries AI is trying to answer.

AI needs specific, detailed, plain-English content to work with. The firms that appear in AI recommendations tend to have thorough FAQ pages, detailed service descriptions, and educational content that directly answers the questions real people ask.

**What to do:** Add FAQ pages to your website for each practice area. Write in the language your clients actually use, not legal terminology. Answer the questions people genuinely ask: "How much does it cost?", "How long does it take?", "What documents do I need?", "What happens if...?". Use Schema.org FAQPage markup so AI can parse them directly. Aim for at least five to ten questions per practice area, each with a thorough answer of 100 words or more.`,
  },
];

const faqs = [
  {
    q: "Why doesn't ChatGPT recommend my law firm?",
    a: 'ChatGPT recommendations are based on structured, verifiable data — not advertising or website traffic. If your firm lacks Schema.org markup, client reviews, a complete Google Business Profile, and consistent data across platforms, ChatGPT doesn\'t have enough confidence to recommend you. The good news is that these are all fixable issues.',
  },
  {
    q: 'Can I pay to appear in ChatGPT recommendations?',
    a: 'No. ChatGPT recommendations cannot be bought. They are based on data quality, trust signals, and how well AI can verify information about your firm. This means structured data, reviews, and directory accuracy matter far more than marketing spend.',
  },
  {
    q: 'How long does it take for my law firm to appear in AI recommendations?',
    a: 'Most firms start seeing results within 2 to 4 weeks of implementing structured data changes. Perplexity and ChatGPT with browsing access current web data, so improvements can appear relatively quickly. Base model knowledge updates happen on longer cycles.',
  },
  {
    q: 'Does this apply to all AI assistants or just ChatGPT?',
    a: 'The same principles apply to all major AI assistants — ChatGPT, Perplexity, Google Gemini, Claude, Microsoft Copilot, and Meta AI. They all rely on structured, verifiable data to make recommendations. Optimising for one effectively optimises for all of them.',
  },
  {
    q: 'Is this the same as SEO?',
    a: 'No. Traditional SEO focuses on Google search rankings through keywords, backlinks, and page authority. AI Engine Optimisation (AEO) focuses on making your data structured, verifiable, and consistent so that AI assistants can confidently recommend you. Some tactics overlap (good content, Schema.org markup), but AEO requires a different approach — particularly around structured data and cross-platform consistency.',
  },
  {
    q: 'What is an AI visibility score?',
    a: 'An AI visibility score measures how likely AI platforms are to recommend your firm. It factors in structured data quality, review presence, directory completeness, pricing transparency, and cross-platform consistency. TendorAI provides a free AI visibility report that scores your firm out of 100 and shows exactly which AI platforms mention you.',
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

export default function WhyWontChatGPTRecommendMyLawFirmPage() {
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
              <span className="text-white">AI for Law Firms</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AI Visibility
              </span>
              <span className="text-purple-200">6 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 8 March 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Intro */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            More people are asking AI for professional recommendations than ever
            before. Instead of searching Google for &ldquo;best solicitor near
            me&rdquo;, they&apos;re asking ChatGPT, Perplexity, and Gemini
            questions like &ldquo;Can you recommend a good conveyancing solicitor
            in Leeds?&rdquo; — and getting specific firm names back.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            If your law firm isn&apos;t one of those names, you&apos;re losing
            potential clients to competitors who are. Not because those firms are
            better — but because AI can find, verify, and confidently recommend
            them.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            We tested this ourselves. We asked six major AI platforms — ChatGPT,
            Perplexity, Claude, Gemini, Grok, and Meta AI — to recommend
            solicitors in cities across the UK. The same firms kept appearing.
            Others, including well-established practices, were completely absent.
            The difference wasn&apos;t reputation or experience. It was data.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            Here are the six reasons your law firm isn&apos;t being recommended
            by AI — and what you can do about each one.
          </p>

          {/* Content sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.number}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.number}. {section.title}
                </h2>
                {section.body.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**What to do:**')) {
                    return (
                      <div
                        key={i}
                        className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-5 mt-4"
                      >
                        <p className="text-gray-700 leading-relaxed">
                          <span className="font-semibold text-green-800">
                            What to do:{' '}
                          </span>
                          {paragraph.replace('**What to do:** ', '')}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-gray-600 leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>

          {/* The real issue */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              The Real Issue: AI Needs Data, Not Marketing
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Every one of these six issues comes back to the same root cause: AI
              models recommend businesses they can verify. Unlike Google, which
              ranks pages by links and keywords, AI assistants evaluate the
              quality, consistency, and structure of information itself.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The law firms appearing in AI recommendations are not necessarily
              the largest or the ones with the biggest marketing budgets. They
              are the ones whose data is clean, structured, and consistent across
              the SRA register, Google Business Profile, review platforms, and
              their own website.
            </p>
            <p className="text-gray-600 leading-relaxed">
              That is an achievable standard for any firm — and the ones fixing
              these issues now are building a competitive advantage that will be
              very difficult for latecomers to close.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="my-12 bg-purple-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Find Out What AI Says About Your Law Firm
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Our free AI Visibility Report queries ChatGPT, Perplexity, Claude,
              Gemini, Grok, and Meta AI to show you exactly where your firm
              stands. See your visibility score, which platforms mention you,
              who AI recommends instead, and specific fixes.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-lg"
            >
              Run Your Free AI Visibility Report
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
                  href="/blog/how-to-get-recommended-by-ai"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  How to Get Your Business Recommended by AI Assistants
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/why-business-not-showing-up-chatgpt-recommendations"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Why Your Business Isn&apos;t Showing Up in ChatGPT
                  Recommendations
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-get-solicitor-profile-into-ai-search-results"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  How to Get Your Solicitor Profile Into AI Search Results
                </Link>
              </li>
              <li>
                <Link
                  href="/aeo-report"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Free AI Visibility Report for Solicitors
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-visibility-for-solicitors"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  AI Visibility for Solicitors
                </Link>
              </li>
              <li>
                <Link
                  href="/for-vendors"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  How TendorAI Makes Your Firm Visible to AI
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </main>
    </>
  );
}
