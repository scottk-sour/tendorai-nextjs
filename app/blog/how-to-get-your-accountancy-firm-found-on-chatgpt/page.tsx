import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'How to Get Your Accountancy Firm Found on ChatGPT';
const DESCRIPTION =
  'Most UK accountancy firms are invisible to AI search. Learn how to get recommended by ChatGPT, Perplexity and Gemini. Check your AI visibility free with TendorAI.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-get-your-accountancy-firm-found-on-chatgpt';
const PUBLISHED = '2026-03-17';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['Scott Davies'],
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
    q: 'Do I need to pay ChatGPT to recommend my accountancy firm?',
    a: 'No. There is no paid placement in ChatGPT\u2019s responses. Recommendations are based on the AI\u2019s assessment of your authority, relevance, and the quality of information available about your firm online.',
  },
  {
    q: 'How long before my accountancy firm appears in AI results?',
    a: 'Firms with strong ICAEW/ACCA profiles and published content can see changes within 4\u20138 weeks. Firms starting from scratch should expect 3\u20136 months of consistent work before reliable visibility.',
  },
  {
    q: 'Does AEO replace SEO for accountants?',
    a: 'No. AEO complements SEO. Google still drives the majority of traffic. But AI search is growing rapidly \u2014 particularly among business owners under 45. The best strategy runs both in parallel.',
  },
  {
    q: 'Can I control what ChatGPT says about my accountancy practice?',
    a: 'Not directly. You can influence it by ensuring information about your firm online is accurate, detailed, and consistent. Improving directory listings and website content is the most effective approach.',
  },
  {
    q: 'Which AI tools do business owners use to find accountants?',
    a: 'ChatGPT is the most widely used, followed by Google Gemini and Perplexity. Microsoft Copilot also generates recommendations. The Karbon State of AI in Accounting 2026 report found 87% of accounting professionals use ChatGPT specifically.',
  },
  {
    q: 'Does ICAEW registration help with AI visibility?',
    a: 'Yes. AI tools use professional body registration as a trust signal. A complete ICAEW or ACCA profile with service specialisms, office locations, and up-to-date contact details gives AI tools verified data to reference when making recommendations.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Rewrite Service Pages as Direct Answers to Client Questions',
    content:
      'Your tax advisory page should answer \u201cwhat does a tax accountant do?\u201d in its first two sentences. Your bookkeeping page should state what bookkeeping costs within the first paragraph. AI tools extract answers from the opening lines of clearly structured content. Use headings that mirror how clients actually ask questions. \u201cCorporation Tax for Small Businesses \u2014 What You Need to Know\u201d works. \u201cCorporate Tax Services\u201d does not. Every service page should include who you help, what you charge, and where you operate \u2014 stated plainly.',
  },
  {
    number: 2,
    title: 'Complete Your ICAEW or ACCA Directory Profile',
    content:
      'Fill in every available field on your ICAEW or ACCA directory listing. Add service specialisms, office locations, team size, languages spoken, and sector expertise. AI tools cross-reference your professional body registration as a trust signal. Consistency matters. Your firm name, address, and phone number must be identical across your website, Google Business Profile, ICAEW/ACCA listing, and any other directories. Discrepancies reduce AI confidence and make recommendations less likely.',
  },
  {
    number: 3,
    title: 'Publish Specialist Guides on Tax, MTD, and Compliance Topics',
    content:
      'Write long-form guides (1,500\u20132,500 words) on the specific problems your clients face. \u201cHow to Prepare for Making Tax Digital for Income Tax\u201d is the kind of content ChatGPT draws from when a user asks that exact question. The Karbon report found that bookkeeping (61%), accounting (37%), and tax (32%) are the functions most expected to be disrupted by AI. Writing authoritative content on these topics positions your firm as the source AI tools reference. Include current HMRC deadlines, reference legislation by name, and keep the language accessible.',
  },
  {
    number: 4,
    title: 'Get Quoted in Accounting Press and Local Business Media',
    content:
      'Pitch commentary to Accountancy Age, AccountingWEB, local business publications, and regional press. Offer quotes on Budget changes, MTD updates, or tax planning trends. Each third-party mention creates an independent signal that AI tools use to validate your expertise. One well-placed quote in a regional business story about tax changes can carry more AI visibility weight than a year of social media posts.',
  },
  {
    number: 5,
    title: 'Add Structured Data (AccountingService Schema) to Your Website',
    content:
      'Implement AccountingService, Article, and Organization schema markup on your website. This tells AI tools exactly what services you offer, where you operate, and what professional body you belong to \u2014 without ambiguity. If you use WordPress, plugins like Yoast or Rank Math handle the basics. For custom sites, your developer can add this in a few hours. The goal is to make your website machine-readable, not just human-readable.',
  },
  {
    number: 6,
    title: 'Optimise Your Google Business Profile with Service Categories',
    content:
      'Your Google Business Profile feeds directly into Gemini\u2019s recommendations. Set your primary category to \u201cAccountant\u201d and add secondary categories for each specialism \u2014 Tax Consultant, Bookkeeping Service, Payroll Service. Respond to every client review. A firm with 35 reviews and a 4.8 rating is significantly more likely to be cited by AI tools than one with 2 reviews and no responses. Reviews are social proof that AI models weigh heavily.',
  },
  {
    number: 7,
    title: 'Track Your AI Visibility Across ChatGPT, Perplexity, and Gemini',
    content:
      'AI recommendations change as models update. What ChatGPT says about your firm today may differ from what it says next month. You need a system for monitoring this. Manual checks work initially \u2014 run your test prompts monthly. But tracking multiple service areas across multiple AI tools manually becomes unsustainable. This is where a purpose-built platform like TendorAI saves time, monitoring your firm\u2019s visibility automatically across every service area and location.',
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

export default function AccountancyFirmChatGPTPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': CANONICAL,
    headline: TITLE,
    description: DESCRIPTION,
    author: {
      '@type': 'Person',
      name: 'Scott Davies',
      jobTitle: 'Founder',
      worksFor: {
        '@type': 'Organization',
        name: 'TendorAI',
        url: 'https://www.tendorai.com',
      },
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
    dateModified: today,
    url: CANONICAL,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://www.tendorai.com/logo.png',
      width: 873,
      height: 873,
    },
    articleSection: 'AI Visibility',
    keywords: [
      'AI visibility for accountants',
      'ChatGPT recommendations for accountants',
      'answer engine optimisation accountants',
      'how accountants appear in AI search results',
      'get recommended by ChatGPT as an accountant',
      'AEO for accountants',
      'ICAEW',
      'ACCA',
    ],
    wordCount: 2400,
    inLanguage: 'en-GB',
    about: {
      '@type': 'Thing',
      name: 'AI Visibility for Accountants',
      description:
        'How UK accountancy firms can get recommended by AI assistants including ChatGPT, Perplexity and Google Gemini',
    },
    mentions: [
      {
        '@type': 'Organization',
        name: 'Institute of Chartered Accountants in England and Wales',
        alternateName: 'ICAEW',
        url: 'https://www.icaew.com',
      },
      {
        '@type': 'Organization',
        name: 'Association of Chartered Certified Accountants',
        alternateName: 'ACCA',
        url: 'https://www.accaglobal.com',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'ChatGPT',
        applicationCategory: 'AI Assistant',
        creator: { '@type': 'Organization', name: 'OpenAI' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Perplexity',
        applicationCategory: 'AI Search Engine',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Google Gemini',
        applicationCategory: 'AI Assistant',
        creator: { '@type': 'Organization', name: 'Google' },
      },
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
        name: 'How to Get Your Accountancy Firm Found on ChatGPT',
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
              <span className="text-white">Accountancy Firm AI Visibility</span>
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

            <div className="mt-6 flex items-center gap-4 text-sm text-purple-200">
              <span>By Scott Davies</span>
              <span>&middot;</span>
              <span>Published 17 March 2026</span>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Happens When Someone Asks ChatGPT for an Accountant
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              When a business owner types &quot;find a tax accountant in
              Birmingham&quot; into ChatGPT, the tool does not return a list of
              websites. <strong>It names specific firms.</strong> Three, maybe four.
              It describes what each firm does, where they are based, and sometimes
              what they charge. There are no ads. No sponsored results. The AI picks
              who gets recommended.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              ChatGPT draws from training data, web browsing, and sources it
              considers trustworthy &mdash; regulatory directories, professional body
              listings, published articles, and structured website content.{' '}
              <strong>
                87% of accounting professionals already use ChatGPT themselves
              </strong>
              , according to the Karbon State of AI in Accounting 2026 report. Your
              clients are using it too.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The difference between Google and AI search is straightforward. Google
              shows ten blue links.{' '}
              <strong>ChatGPT chooses for the user.</strong> If your firm is not in
              the response, you are not losing a ranking &mdash; you are losing the
              recommendation entirely. There is no page two. There is no position
              seven.
            </p>
            <p className="text-gray-600 leading-relaxed">
              A 2025 BrightLocal survey found that{' '}
              <strong>
                31% of UK consumers had used an AI tool to research a professional
                service
              </strong>{' '}
              in the previous six months. For business owners under 45, the figure
              was closer to 40%. That number is climbing every quarter.
            </p>
          </section>

          {/* Why invisible */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Most Accountancy Firms Are Invisible to AI Search
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your Website Lists Services but Doesn&apos;t Answer Questions
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Most accountant websites have a services page that says &quot;Tax
                  Advisory&quot; with a paragraph about the firm&apos;s experience.{' '}
                  <strong>
                    AI tools need content that directly answers specific questions.
                  </strong>{' '}
                  When someone asks ChatGPT &quot;how much does a self-assessment
                  accountant cost?&quot;, it looks for pages that answer that
                  question in the first two sentences.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  AI models favour content structured like a reference source.
                  Specific. Factual. Organised under clear headings that mirror
                  natural questions. A page titled &quot;Our Services&quot; gives
                  ChatGPT nothing to cite. A page titled &quot;Self-Assessment Tax
                  Returns &mdash; What We Do and What It Costs&quot; gives it
                  everything.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Incomplete ICAEW or ACCA Directory Profiles
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Your professional body listing is one of the first places AI tools
                  check for verification. But most ICAEW and ACCA directory profiles
                  contain a firm name, registration number, and a one-line
                  description.{' '}
                  <strong>
                    AI tools weigh the depth and consistency of your data across
                    directories.
                  </strong>{' '}
                  A sparse profile on three directories is worth less than a
                  complete, detailed profile on one.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Fewer than{' '}
                  <strong>
                    12% of UK accountancy firm websites include AccountingService
                    schema markup
                  </strong>
                  , according to a 2025 BrightLocal audit. Without structured data,
                  AI tools have to guess what services you offer based on
                  unstructured text &mdash; and they often guess wrong.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Third-Party Mentions Outside Your Own Site
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  ChatGPT places significant weight on{' '}
                  <strong>third-party validation</strong>. Articles in Accountancy
                  Age, mentions in local business press, citations in professional
                  publications. If the only place your firm name appears online is
                  your own website, AI tools have no independent signal to trust.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  A firm quoted in an Accountancy Age article about MTD compliance
                  or mentioned in a regional business feature carries far more
                  weight in AI recommendations than one with a polished website but
                  no external footprint.
                </p>
              </div>
            </div>
          </section>

          {/* How to check */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How to Check if ChatGPT Already Recommends Your Firm
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Before changing anything, find out where you stand.{' '}
              <strong>This takes five minutes and costs nothing.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Open ChatGPT (free version works) and enter these prompts:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  1
                </span>
                <span className="text-gray-600">
                  <strong>
                    &quot;Recommend a [service] accountant in [your city]&quot;
                  </strong>{' '}
                  &mdash; e.g. &quot;Recommend a tax advisory accountant in
                  Manchester&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  2
                </span>
                <span className="text-gray-600">
                  <strong>
                    &quot;Who are the best accountants for [service] in
                    [region]?&quot;
                  </strong>{' '}
                  &mdash; e.g. &quot;Who are the best payroll accountants in the
                  West Midlands?&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  3
                </span>
                <span className="text-gray-600">
                  <strong>
                    &quot;I need an accountant for [specific problem] in
                    [location]&quot;
                  </strong>{' '}
                  &mdash; e.g. &quot;I need an accountant for Making Tax Digital
                  compliance in Leeds&quot;
                </span>
              </li>
            </ol>
            <p className="text-gray-600 leading-relaxed mb-4">
              Run the same prompts in <strong>Perplexity</strong> (perplexity.ai)
              and <strong>Google Gemini</strong>. Each tool uses different sources.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-2">What to look for:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">&#8226;</span>
                  Is your firm named? If yes, is the description accurate?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">&#8226;</span>
                  Which competitors appear instead of you?
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">&#8226;</span>
                  Are the sources cited directories, articles, or websites you
                  could influence?
                </li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">
              If your firm does not appear, you have an AI visibility gap. That gap
              is where clients are going instead of coming to you.
            </p>
          </section>

          {/* Seven steps */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Seven Ways to Get Your Accountancy Firm Recommended by AI
            </h2>
            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0 mt-1">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What is AEO */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Is Answer Engine Optimisation (AEO) for Accountants?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>
                Answer engine optimisation is the practice of structuring your
                online presence so AI tools recommend your firm by name.
              </strong>{' '}
              It targets ChatGPT, Perplexity, Gemini, and Copilot rather than
              Google&apos;s organic results.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The accounting profession is already deep into AI adoption. The Karbon
              State of AI in Accounting 2026 report found that{' '}
              <strong>98% of accounting professionals now use AI</strong>, with{' '}
              <strong>74% using it daily</strong>. The same tools accountants use
              internally are the tools their clients use to find them.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Where SEO focuses on ranking a webpage in a list of ten results,{' '}
              <strong>AEO focuses on being the answer</strong>. When someone asks an
              AI tool to recommend an accountant, AEO determines whether your firm
              is one of the three or four names that come back.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>
                63% of accounting professionals believe a firm&apos;s value drops if
                it doesn&apos;t use AI.
              </strong>{' '}
              The same logic applies in reverse: a firm that AI tools cannot find,
              verify, or recommend is losing value in the eyes of a market that
              increasingly starts its search in ChatGPT, not Google.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The techniques overlap with good SEO &mdash; clear content, structured
              data, authoritative backlinks &mdash; but the emphasis shifts. AEO
              prioritises{' '}
              <strong>
                direct answers, entity recognition, and third-party validation
              </strong>{' '}
              over keyword density. A firm that ranks fifth on Google for &quot;tax
              accountant Leeds&quot; might be the only firm ChatGPT recommends for
              the same query &mdash; or might not appear at all.
            </p>
          </section>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Check Your Firm&apos;s AI Visibility &mdash; Free
            </h2>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              <Link
                href="https://www.tendorai.com"
                className="underline hover:text-white font-semibold"
              >
                TendorAI
              </Link>{' '}
              monitors how your accountancy practice appears across ChatGPT,
              Perplexity, and Gemini &mdash; across every service area and
              location. Your profile is already built from ICAEW data. You just need
              to claim it.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center bg-white text-purple-700 font-semibold rounded-lg px-8 py-4 text-lg hover:bg-purple-50 transition-colors"
            >
              Get Your Free AI Visibility Report
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

          {/* Related links */}
          <section className="border-t border-gray-200 pt-8 mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Related Pages
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/ai-visibility-for-accountants"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  AI Visibility for Accountants
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Make your accounting practice visible to ChatGPT, Gemini and
                  Perplexity.
                </p>
              </Link>
              <Link
                href="/blog/how-to-get-found-on-chatgpt-as-a-solicitor"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  How to Get Found on ChatGPT as a Solicitor
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  The solicitor version of this guide &mdash; same principles,
                  different regulatory signals.
                </p>
              </Link>
              <Link
                href="/suppliers/accountants"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  Accountants Directory
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Browse ICAEW-registered accountancy firms across England and
                  Wales.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
