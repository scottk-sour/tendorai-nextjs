import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'Schema Markup Is Why AI Recommends Your Competitor Instead of You';
const DESCRIPTION =
  "Firms with properly implemented structured data are cited in AI responses 3.2 times more often than those without. Here's what UK solicitors and accountants need to know.";
const CANONICAL =
  'https://www.tendorai.com/blog/schema-markup-why-ai-recommends-your-competitor';
const PUBLISHED = '2026-03-19';

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

const schemaProperties = [
  {
    number: 1,
    title: 'name and description',
    content:
      'Your description should include your location, your specialism, and your key accreditation in the first sentence. "Cardiff-based CQS-accredited conveyancing solicitors offering fixed fees from \u00a3895" is infinitely more useful to AI than "We are a professional law firm offering a range of legal services."',
  },
  {
    number: 2,
    title: 'priceRange or hasOfferCatalog',
    content:
      'The most common AI query is "how much does conveyancing cost in Cardiff." If your fees aren\u2019t in your schema, AI cannot answer that question with your name attached. Your competitors who have published fees will be recommended instead. Every time.',
  },
  {
    number: 3,
    title: 'hasCredential',
    content:
      'This is where your SRA number, CQS accreditation, Lexcel certification, or ICAEW registration goes. AI uses regulatory credentials as trust signals. A firm with verified credentials in their schema gets recommended over a firm with the same credentials buried in a PDF nobody can parse.',
  },
  {
    number: 4,
    title: 'areaServed',
    content:
      'AI uses location data to match firms to local queries. Your postcode and city coverage areas need to be in your schema explicitly. "We cover South Wales" in a paragraph is not the same as "areaServed": "Cardiff, CF10" in your schema.',
  },
  {
    number: 5,
    title: 'aggregateRating',
    content:
      'Your Google reviews need to be reflected in your schema. 52 reviews averaging 4.8 stars means nothing to AI if it isn\u2019t structured. Once it is, AI can confidently say "Lucas Law Solicitors in Penarth has 52 reviews averaging 4.8 stars" \u2014 and that becomes a recommendation.',
  },
];

const faqs = [
  {
    q: 'What is schema markup in simple terms?',
    a: 'Schema markup is invisible code added to your website that tells AI and search engines exactly what your business does, where you are, what you charge, and what credentials you hold. It\u2019s like a structured CV for your website that machines can read instantly.',
  },
  {
    q: 'Do I need a developer to add schema markup?',
    a: 'You can add basic schema using WordPress plugins like Yoast or Rank Math. For professional services firms, accurate LegalService or AccountingService schema usually needs a developer or a platform like TendorAI that installs it automatically.',
  },
  {
    q: 'How quickly does schema markup affect AI recommendations?',
    a: 'AI platforms like Perplexity crawl the web in real time, so changes can appear within days. ChatGPT and Claude update their knowledge periodically \u2014 most firms see changes within 4\u20138 weeks of implementing schema.',
  },
  {
    q: 'What schema type should a solicitor use?',
    a: 'UK solicitors should use LegalService as their primary schema type. Accountants should use AccountingService, mortgage advisers should use FinancialService, and estate agents should use RealEstateAgent.',
  },
  {
    q: 'What is schema drift?',
    a: 'Schema drift is when your schema markup falls out of sync with your actual website content \u2014 for example, your fees change but your schema still shows the old price. This causes AI to recommend you inaccurately, which damages trust and visibility over time.',
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

export default function SchemaMarkupBlogPost() {
  const today = new Date().toISOString().split('T')[0];

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
      logo: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://www.tendorai.com/logo.png', width: 873, height: 873 },
    articleSection: 'AI Visibility',
    keywords: [
      'schema markup for solicitors',
      'structured data AI visibility',
      'JSON-LD for law firms',
      'schema markup for accountants',
      'AI recommendations structured data',
      'LegalService schema',
      'AccountingService schema',
    ],
    wordCount: 1800,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.tendorai.com/blog' },
      { '@type': 'ListItem', position: 3, name: TITLE, item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B4F72] via-[#1a3d5c] to-[#2d1b4e] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Schema Markup</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                AI Visibility
              </span>
              <span className="text-blue-200">8 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Schema Markup Is Why AI Recommends Your Competitor Instead of You
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
              {DESCRIPTION}
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span>By TendorAI</span>
              <span>&middot;</span>
              <span>Published 19 March 2026</span>
            </div>
          </div>
        </section>

        {/* Key stat callout */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left">
              <div className="text-4xl font-bold text-[#1B4F72]">3.2x</div>
              <div className="text-sm text-gray-500">more AI citations</div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-gray-200 w-full sm:w-auto" />
            <p className="text-gray-700 text-sm leading-relaxed">
              Firms with properly implemented structured data are cited in AI responses <strong>3.2 times more often</strong> than those without. That&apos;s not a marginal improvement &mdash; that&apos;s the difference between being recommended and being invisible.
            </p>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Most UK solicitors and accountants are still treating schema markup like it&apos;s a nice-to-have SEO feature. It isn&apos;t. It&apos;s the reason ChatGPT recommends Hugh James instead of you.
            </p>
          </section>

          {/* What Schema Markup Actually Does */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Schema Markup Actually Does</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Schema markup is invisible code on your website that tells AI exactly what your business is. Not what you hope it understands from reading your paragraphs &mdash; what it knows with certainty because you told it directly.
            </p>

            {/* With/without comparison */}
            <div className="grid sm:grid-cols-2 gap-4 my-8">
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-500 font-bold text-lg">&#10007;</span>
                  <h3 className="font-bold text-gray-900">Without Schema</h3>
                </div>
                <p className="text-sm text-gray-700">
                  AI asks: &ldquo;Is this firm CQS accredited?&rdquo;<br />
                  Your website: mentions CQS on page 3, paragraph 7.<br />
                  <strong className="text-red-700">AI guesses. Recommends someone else.</strong>
                </p>
              </div>
              <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-green-600 font-bold text-lg">&#10003;</span>
                  <h3 className="font-bold text-gray-900">With Schema</h3>
                </div>
                <p className="text-sm text-gray-700">
                  AI asks: &ldquo;Is this firm CQS accredited?&rdquo;<br />
                  Your schema: <code className="bg-white px-1 rounded text-xs">&quot;hasCredential&quot;: &quot;CQS&quot;</code><br />
                  <strong className="text-green-700">AI knows. Recommends you by name.</strong>
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Think of your website without schema as a library with no filing system. The AI has to read every page to find what it needs. With schema, you hand it a labelled folder that says exactly what&apos;s inside.
            </p>
          </section>

          {/* Why JSON-LD */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why JSON-LD Is the Only Format That Matters</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              You have three schema format options: Microdata, RDFa, and JSON-LD. <strong>Use JSON-LD.</strong> Every AI engine prefers it because it sits cleanly in your page header, separate from your HTML, and is easy for machines to parse.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
              <p className="text-sm text-blue-900">
                <strong>Google&apos;s official guidance explicitly recommends JSON-LD</strong> for AI-optimised content. When Google tells you what format works best for their AI systems, that&apos;s the answer.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">Vertical</th>
                    <th className="p-3 text-left font-semibold">Correct Schema Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Solicitor', 'LegalService'],
                    ['Accountant', 'AccountingService'],
                    ['Mortgage Adviser', 'FinancialService'],
                    ['Estate Agent', 'RealEstateAgent'],
                  ].map(([vertical, schema], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 text-gray-900 font-medium">{vertical}</td>
                      <td className="p-3"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">{schema}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-500 text-sm mt-3">
              Getting the type wrong is almost as bad as having no schema at all &mdash; the AI categorises you incorrectly and recommends you for the wrong queries.
            </p>
          </section>

          {/* 5 Properties */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              The 5 Schema Properties That Actually Move the Needle
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Most guides tell you to add schema. Few tell you which properties AI actually uses to make recommendations. Here are the ones that matter:
            </p>

            <div className="space-y-4">
              {schemaProperties.map((prop) => (
                <div key={prop.number} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B4F72] flex items-center justify-center text-white font-bold">
                      {prop.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        <code className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-sm">{prop.title}</code>
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{prop.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schema Drift */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Problem With Schema You Set and Forget</h2>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">Schema drift</h3>
                  <p className="text-sm text-amber-800">
                    Where markup falls out of sync with actual page content &mdash; is one of the most common reasons AI systems stop citing previously trusted content.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              You update your fees in January. You forget to update your schema. AI is still recommending you based on your old prices. A client arrives expecting &pound;895 and you quote &pound;1,100. That&apos;s a trust problem that starts with stale schema.
            </p>

            <p className="text-gray-600 leading-relaxed">
              This is the core problem with manual schema implementation. Someone installs it once, forgets about it, and six months later it&apos;s actively working against them.
            </p>
          </section>

          {/* What This Means */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What This Means for UK Professional Services Firms</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              The firms that will dominate AI recommendations in 2026 are not necessarily the biggest or the best known. They are the ones with the <strong>most accurate, most complete, most current structured data</strong>.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              A Cardiff conveyancing solicitor with properly implemented schema telling AI their CQS accreditation, fixed fees, postcode coverage, and 52 Google reviews will be recommended over a larger firm whose website has no schema at all.
            </p>

            <div className="bg-gray-900 text-white rounded-xl p-6 my-8">
              <p className="text-sm leading-relaxed text-gray-200">
                In March 2025, both <strong className="text-white">Google</strong> and <strong className="text-white">Microsoft</strong> publicly stated they use schema markup for their generative AI features. <strong className="text-white">ChatGPT</strong> then confirmed it uses structured data to determine which products and services appear in its results. This is not speculation. It is confirmed by the platforms themselves.
              </p>
            </div>
          </section>

          {/* TendorAI Approach */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The TendorAI Approach</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Most tools tell you what schema to add. <strong>TendorAI installs it for you and keeps it current automatically.</strong>
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-8">
              {[
                { icon: '&#9889;', title: 'Fees updated?', desc: 'Schema updates on your website within minutes.' },
                { icon: '&#127942;', title: 'New accreditation?', desc: 'Appears in your structured data the same day.' },
                { icon: '&#11088;', title: 'Review count up?', desc: 'Schema reflects it automatically.' },
              ].map((item, i) => (
                <div key={i} className="bg-purple-50 border border-purple-100 rounded-xl p-5 text-center">
                  <div className="text-2xl mb-2" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-lg font-semibold text-gray-900 text-center">
              No developer. No quarterly audits. No schema drift.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <FAQSection />
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Is your schema helping or hurting you?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Run a free AI visibility report. We&apos;ll check what AI platforms currently know about your firm &mdash; and what&apos;s missing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/aeo-report"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg"
              >
                Run Your Free Report
              </Link>
              <Link
                href="/for-vendors#pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                See TendorAI Pro
              </Link>
            </div>
          </section>

          {/* Author / date */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by TendorAI
            </p>
            <Link href="/blog" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              &larr; Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
