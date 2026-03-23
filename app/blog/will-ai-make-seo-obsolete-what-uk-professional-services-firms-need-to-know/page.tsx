import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'Will AI Make SEO Obsolete? What UK Solicitors and Accountants Need to Know';
const DESCRIPTION =
  'AI won\u2019t kill SEO \u2014 but it has created a new channel SEO can\u2019t reach. See how UK solicitors and accountants can be visible in both Google and AI recommendations.';
const CANONICAL =
  'https://www.tendorai.com/blog/will-ai-make-seo-obsolete-what-uk-professional-services-firms-need-to-know';
const PUBLISHED = '2026-03-22';

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
    q: 'Will AI replace Google for finding solicitors?',
    a: 'Not entirely \u2014 but AI is already handling high-intent queries like \u201crecommend me a conveyancing solicitor in Cardiff\u201d directly, without returning links. When a potential client asks ChatGPT for a recommendation, they get three to five named firms. There is no second page of results. Firms not in that shortlist are not seen.',
  },
  {
    q: 'Do I need to choose between SEO and AI visibility?',
    a: 'No. They target different channels. SEO gets you found on Google. AI visibility gets you recommended by ChatGPT and Perplexity. The two are complementary, not competing. TendorAI handles the AI visibility layer so your existing SEO investment is not undermined \u2014 it is extended.',
  },
  {
    q: 'How is TendorAI different from an SEO agency?',
    a: 'SEO agencies optimise for Google rankings \u2014 keywords, backlinks, page speed. TendorAI optimises for AI recommendations \u2014 installing structured schema markup on your website, building verified profiles from SRA, ICAEW, and FCA regulatory data, and tracking your visibility across 6 AI platforms every week.',
  },
  {
    q: 'How long before AI visibility affects my enquiry volume?',
    a: 'Most firms see their first AI recommendation within 2\u20134 weeks of completing their TendorAI profile and having schema installed on their website. TendorAI tracks this weekly and emails you when AI platforms like Perplexity recommend your firm for the first time.',
  },
  {
    q: 'Is AI visibility relevant for small firms?',
    a: 'More so than for large firms. Established practices like Hugh James already have brand recognition that AI picks up from years of third-party citations. A 2-partner conveyancing firm in Cardiff competing for the same queries needs structured data to compete \u2014 and with TendorAI, firm size is no longer the deciding factor.',
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

export default function WillAIMakeSEOObsoletePage() {
  const today = new Date().toISOString().split('T')[0];

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
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
    keywords: [
      'will AI replace SEO',
      'AI visibility UK solicitors',
      'SEO vs AI visibility',
      'AEO strategy solicitors accountants',
      'ChatGPT solicitor recommendations',
      'TendorAI AI visibility',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
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
        <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">AEO Strategy</span>
              <span className="mx-2">/</span>
              <span className="text-white">SEO vs AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AEO Strategy
              </span>
              <span className="text-blue-200">7 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {TITLE}
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 text-sm text-blue-200">
              Published 22 March 2026 &middot; TendorAI
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening paragraph */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong>AI will not make SEO obsolete &mdash; but it has created an entirely new channel that SEO alone cannot reach.</strong> For UK solicitors and accountants, the question is not whether to replace SEO but whether they are visible in both Google search and AI recommendations. The firms that treat these as two separate channels &mdash; and invest in both &mdash; will capture the clients that firms relying on SEO alone will miss.
            </p>
            <p className="text-lg font-semibold text-gray-900">
              Here is what has actually changed, what it means for your practice, and what to do about it before your competitors work it out.
            </p>
          </section>

          {/* H2: SEO and AI Visibility Are Different Channels */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              SEO and AI Visibility Are Different Channels
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>SEO optimises for Google rankings.</strong> It focuses on keywords, backlinks, page speed, and domain authority. A well-optimised website appears in the ten blue links when a potential client searches &ldquo;conveyancing solicitor Cardiff&rdquo; on Google. That system has worked for twenty years and it still works today.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>AI visibility optimises for AI recommendations.</strong> It focuses on structured data, entity recognition, and verified credentials. When a potential client asks ChatGPT to &ldquo;recommend a conveyancing solicitor in Cardiff,&rdquo; the AI does not crawl Google results. It draws on machine-readable data it has already indexed &mdash; schema markup, regulatory registers, structured directory profiles.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              These are fundamentally different systems. <strong>A firm can rank number one on Google for its target keywords and be completely invisible to ChatGPT.</strong> TendorAI&apos;s analysis of Cardiff solicitors found firms with strong Google rankings &mdash; first page for competitive terms &mdash; still scoring under 20 out of 100 for AI visibility. Their websites were optimised for humans browsing search results, not for AI engines parsing structured data.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The two channels serve different moments in the client journey. Google serves &ldquo;I want to browse options.&rdquo; AI serves &ldquo;Recommend me the best one.&rdquo; The client asking Google expects to do their own research. <strong>The client asking ChatGPT expects a direct answer &mdash; and acts on it.</strong>
            </p>
          </section>

          {/* H2: Why AI Still Needs Structured Data */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why AI Still Needs Structured Data &mdash; And Why That Matters for Your Firm
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>AI does not read websites the way humans do.</strong> A human visitor scans your homepage, reads &ldquo;We specialise in residential conveyancing across South Wales,&rdquo; and understands what you do. An AI engine cannot reliably extract that claim from a paragraph of marketing copy. It might. It might not. It depends on how the sentence is structured, what else is on the page, and whether the AI has already indexed conflicting information from another source.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Schema markup eliminates the ambiguity. A <strong>LegalService</strong> schema declaration that states your SRA number, practice areas, fee basis, office location, and accreditations is unambiguous. The AI reads it, validates it against the SRA register, and stores it as a verified entity. When a client asks for a recommendation, that entity is what gets retrieved.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              This is exactly what TendorAI installs on your website &mdash; <strong>verified regulatory data from the SRA, ICAEW, or FCA register, structured in machine-readable format</strong>. It declares who you are, what you do, where you do it, and what credentials you hold. No ambiguity. No parsing errors. No reliance on the AI correctly interpreting your About page.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Without structured data, even a firm that ranks on the first page of Google gets skipped by AI. <strong>The AI cannot recommend what it cannot reliably identify.</strong>
            </p>
          </section>

          {/* H2: What Changes When AI Gets Involved */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Changes When AI Gets Involved in Client Discovery
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>The traditional SEO path looks like this:</strong> a potential client searches Google, sees ten results, clicks three or four, reads each website, compares pricing and reviews, and eventually calls one firm. The client does the filtering. Your website competes against nine others for attention.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>The AI discovery path is different:</strong> the client asks ChatGPT &ldquo;Who is the best conveyancing solicitor in Cardiff?&rdquo; and receives three named recommendations with reasons. The client reads the summary, picks the one that sounds right, and calls them. There is no browsing. There is no comparison shopping. There is no second page of results.
            </p>

            {/* Comparison table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="px-4 py-3 font-semibold">Stage</th>
                    <th className="px-4 py-3 font-semibold">Google SEO Path</th>
                    <th className="px-4 py-3 font-semibold">AI Discovery Path</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-900">Search</td>
                    <td className="px-4 py-3">Client types keywords</td>
                    <td className="px-4 py-3">Client asks a question</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Results</td>
                    <td className="px-4 py-3">10 blue links</td>
                    <td className="px-4 py-3">3&ndash;5 named recommendations</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-900">Client effort</td>
                    <td className="px-4 py-3">Visits 3&ndash;4 websites, compares</td>
                    <td className="px-4 py-3">Reads summary, picks one</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">Visibility</td>
                    <td className="px-4 py-3">Top 10 all get seen</td>
                    <td className="px-4 py-3">Only the 3&ndash;5 named firms exist</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-900">If you&apos;re not listed</td>
                    <td className="px-4 py-3">You&apos;re on page 2</td>
                    <td className="px-4 py-3">You don&apos;t exist</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              The firms not in those three recommendations are effectively invisible. There is no equivalent of &ldquo;page two of Google&rdquo; in AI search. You are either recommended or you are not.
            </p>
            <p className="text-gray-600 leading-relaxed">
              TendorAI tracks which Cardiff solicitors appear in AI recommendations across ChatGPT, Perplexity, Claude, and Gemini. <strong>Currently, fewer than 10% of SRA-registered firms in Cardiff appear consistently.</strong> The rest are invisible to a growing share of potential clients.
            </p>
          </section>

          {/* H2: The Firms That Will Win Are Doing Both */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The Firms That Will Win Are Doing Both
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>SEO remains essential.</strong> Google still drives the majority of search traffic to solicitor and accountant websites in the UK. A firm that abandons SEO is abandoning the largest source of inbound enquiries it currently has. That would be reckless.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>AI visibility is the new layer on top.</strong> It is growing fast, it is increasingly decisive for high-intent queries, and it rewards different signals than Google does. Structured data, verified credentials, and third-party citations matter more than keyword density or backlink profiles.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The firms that invest in both channels will dominate client acquisition over the next decade. They will appear in Google search results <em>and</em> in AI recommendations. They will capture clients who browse <em>and</em> clients who ask.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Firms that do neither are already losing ground.</strong> TendorAI&apos;s data shows that 17% of SRA-registered solicitors nationwide have no website at all &mdash; they are invisible to both Google and AI.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Firms that only invest in SEO will see diminishing returns as AI takes a larger share of discovery queries. Their Google rankings will still bring traffic, but an increasing proportion of high-intent clients &mdash; the ones ready to instruct, not just browsing &mdash; <strong>will go to whichever firm ChatGPT recommends first</strong>.
            </p>
          </section>

          {/* H2: What UK Professional Services Firms Should Do Right Now */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What UK Professional Services Firms Should Do Right Now
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Five steps, in order of priority:
            </p>
            <div className="space-y-6">
              {[
                {
                  num: 1,
                  title: 'Run a free AI visibility report',
                  desc: 'See exactly where your firm stands across ChatGPT, Perplexity, Claude, and Gemini. TendorAI\u2019s report scans all four platforms using prompts relevant to your practice areas and location. It takes 60 seconds and costs nothing.',
                },
                {
                  num: 2,
                  title: 'Complete your TendorAI profile',
                  desc: 'Add your fees, accreditations, practice areas, and postcode coverage. TendorAI pulls your core details from regulatory registers automatically \u2014 SRA for solicitors, ICAEW or ACCA for accountants, FCA for mortgage advisers. You fill in what the register does not cover.',
                },
                {
                  num: 3,
                  title: 'Get schema installed on your website',
                  desc: 'TendorAI Pro installs verified structured data on your website within 48 hours \u2014 no developer required. This is the single most impactful step for AI visibility. It declares your credentials, services, and location in machine-readable format that AI engines trust.',
                },
                {
                  num: 4,
                  title: 'Keep doing SEO',
                  desc: 'SEO is not going anywhere. Google still processes billions of searches daily. Your existing SEO investment protects your Google visibility. AI visibility sits alongside it, not instead of it. The two compound \u2014 structured data improves both channels.',
                },
                {
                  num: 5,
                  title: 'Publish AI-optimised content',
                  desc: 'Write blog posts that answer the exact questions AI gets asked about your services. \u201cHow much does conveyancing cost in Cardiff in 2026?\u201d is a question clients ask ChatGPT. If your firm has a published, structured answer, AI is more likely to cite you.',
                },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1B4F72] text-white flex items-center justify-center font-bold text-lg shrink-0 mt-1">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-[#1B4F72] to-[#2d1b4e] rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Run Your Free AI Visibility Report
            </h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              See what ChatGPT, Perplexity, and Gemini currently say about your firm. <Link
                href="https://www.tendorai.com"
                className="underline hover:text-white font-semibold"
              >TendorAI</Link> scans all major AI platforms in 60 seconds &mdash; free, no login required.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center bg-white text-[#1B4F72] font-semibold rounded-lg px-8 py-4 text-lg hover:bg-blue-50 transition-colors"
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
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/blog/how-to-get-found-on-chatgpt-as-a-solicitor"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-[#1B4F72] transition-colors">
                  How to Get Found on ChatGPT as a Solicitor
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  7 steps to get your law firm recommended by AI assistants.
                </p>
              </Link>
              <Link
                href="/blog/schema-markup-why-ai-recommends-your-competitor"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-[#1B4F72] transition-colors">
                  Schema Markup: Why AI Recommends Your Competitor
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  How structured data determines which firms AI engines trust.
                </p>
              </Link>
              <Link
                href="/blog/how-much-conveyancing-cost-cardiff-2026"
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-[#1B4F72] transition-colors">
                  How Much Does Conveyancing Cost in Cardiff in 2026?
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Full cost breakdown for Cardiff conveyancing solicitors.
                </p>
              </Link>
            </div>
          </section>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-[#1B4F72] hover:underline font-medium"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
