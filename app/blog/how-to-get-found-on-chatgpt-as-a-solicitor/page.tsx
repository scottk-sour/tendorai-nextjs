import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'How to Get Found on ChatGPT as a Solicitor';
const DESCRIPTION =
  'Most solicitors are invisible to AI search. Learn how to get your firm recommended by ChatGPT, Perplexity and Gemini. Check your AI visibility free with TendorAI.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-get-found-on-chatgpt-as-a-solicitor';
const PUBLISHED = '2026-03-16';

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
    q: 'Do I need to pay ChatGPT to recommend my firm?',
    a: 'No. There is no paid placement in ChatGPT\u2019s responses. Recommendations are based on the AI\u2019s assessment of your authority, relevance, and the quality of information available about your firm online. You cannot buy your way in.',
  },
  {
    q: 'How long does it take to appear in AI search results?',
    a: 'It depends on your starting position. Firms with strong directory profiles and published content can see changes within 4\u20138 weeks as AI tools crawl updated sources. Firms starting from scratch should expect 3\u20136 months of consistent work before reliable visibility.',
  },
  {
    q: 'Does this replace SEO for solicitors?',
    a: 'No. AEO complements SEO. Google still drives the majority of search traffic to solicitor websites. But the share going to AI tools is growing rapidly, and firms that ignore it now will face a harder catch-up later. The best strategy runs both in parallel.',
  },
  {
    q: 'Can I control what ChatGPT says about my firm?',
    a: 'Not directly. You can influence it by ensuring the information available about your firm online is accurate, detailed, and consistent. If ChatGPT is pulling incorrect details, improving your directory listings and website content is the most effective fix.',
  },
  {
    q: 'Which AI tools do clients actually use to find solicitors?',
    a: 'ChatGPT is the most widely used, followed by Google Gemini (built into Google search) and Perplexity. Microsoft Copilot also generates recommendations. Younger clients are more likely to use these tools, but adoption is broadening across all age groups.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Structure Your Website Content as Direct Answers',
    content:
      'Rewrite your key service pages so the first paragraph directly answers the question a client would ask. \u201cWhat does a conveyancing solicitor do?\u201d should be answered in the first two sentences of your conveyancing page \u2014 not buried under a paragraph about your firm\u2019s history. Use clear H2 and H3 headings that mirror natural questions. AI tools scan heading structures to identify relevant content. A page titled \u201cOur Services\u201d tells ChatGPT nothing. A page titled \u201cConveyancing Solicitors in Leeds \u2014 What We Do and What It Costs\u201d tells it everything.',
  },
  {
    number: 2,
    title: 'Build Authority on Legal Directories and the SRA Register',
    content:
      'Complete every field on your Solicitors Regulation Authority profile. Add practice areas, languages spoken, and office locations. Do the same on The Law Society, Chambers, Legal 500, and any specialist directories for your practice areas. Consistency matters. Your firm name, address, and phone number must be identical across every listing. AI tools cross-reference these details. Discrepancies reduce confidence in your data and make recommendations less likely.',
  },
  {
    number: 3,
    title: 'Publish Practice-Area Guides That AI Tools Want to Cite',
    content:
      'Write long-form guides (1,500\u20132,500 words) on the specific legal issues your clients face. \u201cHow to Contest a Will in England and Wales\u201d is the kind of content ChatGPT draws from when a user asks that exact question. Include current statistics, reference relevant legislation by name, and keep the language accessible. AI tools favour content that is both authoritative and readable \u2014 legal accuracy without legal jargon. Firms that publish one in-depth guide per month build topical authority faster than those running weekly 400-word news posts.',
  },
  {
    number: 4,
    title: 'Get Mentioned in Third-Party Articles and Legal Press',
    content:
      'Pitch commentary to the Law Gazette, local press, and legal blogs. Offer quotes on cases in the news. Write guest articles for professional publications. Each third-party mention creates an independent signal that AI tools use to validate your expertise. Digital PR for solicitors does not need to be complicated. One well-placed quote in a regional news story about changes to probate rules can carry more AI visibility weight than a year of social media posts.',
  },
  {
    number: 5,
    title: 'Add Structured Data to Your Key Pages',
    content:
      'Implement Article, LegalService, and Organization schema on your website. This markup helps AI tools parse your content accurately \u2014 identifying your practice areas, office locations, and professional credentials without ambiguity. Your web developer can add this in a few hours. If you use WordPress, plugins like Yoast or Rank Math handle the basics. The goal is to make your website machine-readable, not just human-readable.',
  },
  {
    number: 6,
    title: 'Optimise Your Google Business Profile for Local AI Results',
    content:
      'Your Google Business Profile feeds into Gemini\u2019s recommendations directly. Keep it updated with correct opening hours, practice areas listed as services, and regular posts about your work. Respond to every client review. A firm with 40 reviews and a 4.7 rating is significantly more likely to be cited by AI tools than one with 3 reviews and no responses. Reviews are social proof that AI models weigh heavily for local recommendations.',
  },
  {
    number: 7,
    title: 'Monitor Your AI Visibility and Track Changes',
    content:
      'AI recommendations change as models update and new content enters their training data. What ChatGPT says about your firm today may differ from what it says next month. You need a system for tracking this. Manual checks work at the start \u2014 run your test prompts monthly and record the results. But as AI search grows, manual monitoring becomes unsustainable across multiple tools and practice areas. This is where a purpose-built platform like TendorAI saves time, tracking your firm\u2019s visibility across ChatGPT, Perplexity, and Gemini automatically.',
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

export default function HowToGetFoundOnChatGPTPage() {
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
              <span className="text-white">Get Found on ChatGPT</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                How-To Guide
              </span>
              <span className="text-purple-200">9 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 16 March 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Happens When Someone Asks ChatGPT to Recommend a Solicitor
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              When a potential client types &quot;recommend a family law solicitor
              in Manchester&quot; into ChatGPT, the tool generates a list of firms
              it considers authoritative, well-reviewed, and relevant.{' '}
              <strong>It does not search Google.</strong> It draws from training
              data, web browsing results, and sources it deems trustworthy &mdash;
              legal directories, regulatory registers, published articles, and
              structured website content.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The response typically includes three to five firm names, a brief
              description of each, and sometimes a link. There is no paid
              placement. No ads. No map pack.{' '}
              <strong>
                The AI decides who gets recommended based on the strength and
                clarity of your digital footprint.
              </strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              A 2025 survey by the Legal Services Consumer Panel found that{' '}
              <strong>
                33% of UK adults under 45 had used an AI tool to research a legal
                issue
              </strong>{' '}
              in the previous twelve months. That number is climbing. If your firm
              does not appear in these responses, you are invisible to a growing
              share of your market.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The difference between Google and AI search is simple. Google shows
              ten blue links and lets the user choose.{' '}
              <strong>ChatGPT chooses for them.</strong> It names specific firms.
              That makes visibility here extraordinarily valuable &mdash; and the
              absence of it a real commercial problem.
            </p>
          </section>

          {/* Why most solicitors are invisible */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Most Solicitors Are Invisible to AI Search
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your Website Talks to Google, Not to AI
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Most solicitor websites are optimised for keywords, meta tags,
                  and backlinks. That works for traditional search. But{' '}
                  <strong>
                    AI tools prioritise content that directly answers questions
                  </strong>{' '}
                  in clear, structured language. A page full of vague marketing
                  copy about &quot;our experienced team&quot; gives ChatGPT nothing
                  to cite.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  AI models favour content that reads like a reference source
                  &mdash; specific, factual, and organised under clear headings. If
                  your service pages do not explain what you do, where you do it,
                  and who you do it for in plain terms, they get skipped.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Thin Directory Listings and Missing Structured Data
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Being listed on The Law Society&apos;s Find a Solicitor page is a
                  start, but most solicitor directory profiles contain a firm name,
                  address, and two lines of boilerplate.{' '}
                  <strong>
                    AI tools weigh the depth and consistency of your mentions across
                    directories.
                  </strong>{' '}
                  A thin listing on five directories is worth less than a detailed,
                  complete profile on two.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Structured data (schema markup) on your own website helps AI
                  tools understand your practice areas, locations, and credentials.
                  Fewer than{' '}
                  <strong>
                    15% of UK solicitor websites use structured data correctly
                  </strong>
                  , according to a 2025 audit by BrightLocal.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Authoritative Third-Party Mentions
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  ChatGPT places significant weight on{' '}
                  <strong>third-party validation</strong> &mdash; articles in legal
                  press, mentions in guides, citations in professional
                  publications. If the only place your firm name appears is your own
                  website, AI tools have no independent signal to trust.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  A firm mentioned in a Legal 500 editorial, a Law Gazette article,
                  or a local news story about a landmark case carries far more
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
                    &quot;Recommend a [practice area] solicitor in [your
                    city]&quot;
                  </strong>{' '}
                  &mdash; e.g. &quot;Recommend a conveyancing solicitor in
                  Cardiff&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  2
                </span>
                <span className="text-gray-600">
                  <strong>
                    &quot;Who are the best solicitors for [practice area] in
                    [region]?&quot;
                  </strong>{' '}
                  &mdash; e.g. &quot;Who are the best employment law solicitors in
                  Wales?&quot;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  3
                </span>
                <span className="text-gray-600">
                  <strong>
                    &quot;I need a solicitor for [specific problem] in
                    [location]&quot;
                  </strong>{' '}
                  &mdash; e.g. &quot;I need a solicitor for a disputed will in
                  Birmingham&quot;
                </span>
              </li>
            </ol>
            <p className="text-gray-600 leading-relaxed mb-4">
              Run the same prompts in <strong>Perplexity</strong> (perplexity.ai)
              and <strong>Google Gemini</strong>. Each tool uses different sources
              and will give you a broader picture.
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
              If your firm does not appear in any of these results, you have an AI
              visibility gap. That gap is where clients are going instead of coming
              to you.
            </p>
          </section>

          {/* Seven steps */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Seven Ways to Get Your Firm Recommended by AI
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
              What Is Answer Engine Optimisation (AEO)?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>
                Answer engine optimisation is the practice of structuring your
                online presence so AI tools recommend you by name.
              </strong>{' '}
              It sits alongside traditional SEO but targets a different set of
              systems &mdash; ChatGPT, Perplexity, Gemini, and Copilot rather than
              Google&apos;s organic results.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Where SEO focuses on ranking a webpage in a list of ten results,{' '}
              <strong>AEO focuses on being the answer</strong>. When someone asks an
              AI tool to recommend a solicitor, AEO determines whether your firm is
              one of the three or four names that come back.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For solicitors, this distinction matters because{' '}
              <strong>
                AI tools do not show ten options and let the user decide. They
                recommend specific firms.
              </strong>{' '}
              Being recommended is a binary outcome &mdash; you are either named or
              you are not. There is no position seven.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The techniques overlap with good SEO &mdash; clear content, structured
              data, authoritative backlinks &mdash; but the emphasis shifts. AEO
              prioritises{' '}
              <strong>
                direct answers, entity recognition, and third-party validation
              </strong>{' '}
              over keyword density and link volume. A firm that ranks fifth on
              Google for &quot;divorce solicitor Leeds&quot; might be the only firm
              ChatGPT recommends for the same query, or it might not appear at all.
              The two systems reward different signals.
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
              tracks how your firm appears across ChatGPT, Perplexity, and Gemini
              &mdash; across every practice area and location you serve. No
              guesswork. No manual prompt checking. Just a clear view of where you
              stand in AI search and what to do next.
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
                href="/blog/how-to-get-your-law-firm-visible-to-ai-assistants"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  Law Firm AI Visibility Guide
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Step-by-step guide to getting your law firm recommended by AI
                  assistants.
                </p>
              </Link>
              <Link
                href="/blog/why-wont-chatgpt-recommend-my-law-firm"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                  Why Won&apos;t ChatGPT Recommend My Law Firm?
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Common reasons your firm is invisible to AI search and how to
                  fix them.
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
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
