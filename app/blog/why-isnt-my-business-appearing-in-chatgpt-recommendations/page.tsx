import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'Why Isn\u2019t My Business Appearing in ChatGPT Recommendations? (And How to Fix It)';
const DESCRIPTION =
  'The most common reasons UK businesses don\u2019t appear in ChatGPT recommendations \u2014 and exactly what to do about each one. Covers schema, directories, content and entity verification.';
const CANONICAL =
  'https://www.tendorai.com/blog/why-isnt-my-business-appearing-in-chatgpt-recommendations';
const PUBLISHED = '2026-04-06';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
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
  alternates: {
    canonical: CANONICAL,
  },
};

const faqs = [
  {
    q: 'How long after fixing these issues will I appear in ChatGPT?',
    a: 'Schema and directory changes typically take 4 to 8 weeks to surface in ChatGPT outputs. Perplexity is faster \u2014 it crawls the web frequently and can reflect changes within days. Google AI Overviews updates from Google Business Profile quickly. Most firms see measurable improvement within 60 days.',
  },
  {
    q: 'Does this apply to Perplexity and Google AI Overviews too?',
    a: 'Yes. The same five issues affect visibility across all AI platforms. Schema markup, directory consistency, regulatory data, content specificity, and authoritative listings are universal AI recommendation signals. Fixing them improves your visibility across ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews simultaneously.',
  },
  {
    q: 'Is there a free way to check if my business appears in AI recommendations?',
    a: 'Yes. Ask ChatGPT, Perplexity and Claude directly: \u201cCan you recommend a [your profession] in [your city]?\u201d This is free and takes two minutes. TendorAI also offers a free schema checker at tendorai.com/tools/schema-checker and a free AI visibility profile.',
  },
  {
    q: 'Do I need a developer to fix these issues?',
    a: 'Not with TendorAI. TendorAI Pro installs the correct schema on your website within 48 hours, structures your regulatory data, and lists you in an AI-indexed directory \u2014 all without developer involvement. Manual implementation is possible but requires technical knowledge of JSON-LD and Schema.org.',
  },
];

function FAQSection() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-gray-200 rounded-lg">
          <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
            <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
            <svg className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

export default function WhyIsntMyBusinessAppearingInChatGPTPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': CANONICAL,
    headline: TITLE,
    description: DESCRIPTION,
    author: { '@type': 'Person', name: 'Scott Davies' },
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
    keywords: ['ChatGPT recommendations', 'AI visibility', 'schema markup', 'UK business', 'professional services'],
    wordCount: 2200,
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
      { '@type': 'ListItem', position: 3, name: 'AI Visibility', item: 'https://www.tendorai.com/blog' },
      { '@type': 'ListItem', position: 4, name: TITLE, item: CANONICAL },
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
              <span className="text-white">AI Visibility</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">AI Visibility</span>
              <span className="text-blue-200">8 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{TITLE}</h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">{DESCRIPTION}</p>

            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span>By Scott Davies</span>
              <span>&middot;</span>
              <span>Published 6 April 2026</span>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900">If you have asked ChatGPT to recommend a business like yours and your name did not appear, the problem is almost certainly one of five fixable issues &mdash; not your reputation, your size, or how long you have been trading.</strong> AI models do not exclude businesses deliberately. They exclude businesses whose data they cannot verify, understand, or cite with confidence. This guide covers each issue and exactly how to fix it.
            </p>
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <p className="text-sm leading-relaxed text-gray-200">
                <strong className="text-white">AI does not ignore your business. It cannot see it.</strong>
              </p>
            </div>
          </section>

          {/* Reason 1 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Reason 1 &mdash; No schema markup on your website</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              AI crawlers like GPTBot and ClaudeBot visit your website looking for structured data in JSON-LD format. If they find none, they have no machine-readable signal that your business exists or what it does. Most UK business websites have no schema markup at all. The AI defaults to recommending businesses it can verify from structured sources &mdash; and skips everyone else.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">The fix</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Install the correct Schema.org type for your business. Solicitors need <code className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-xs">LegalService</code>. Accountants need <code className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-xs">AccountingService</code>. Mortgage advisers need <code className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-xs">FinancialService</code>. Estate agents need <code className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-xs">RealEstateAgent</code>. Include your business name, address, services, and any professional registration numbers. TendorAI Pro installs this within 48 hours.
              </p>
            </div>
          </section>

          {/* Reason 2 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Reason 2 &mdash; Inconsistent directory data</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              AI models cross-reference your business data across multiple sources before recommending you. If your firm name is slightly different on Google Business Profile than on your website, or your phone number format varies between directories, AI confidence drops. Inconsistencies signal unreliability to AI models &mdash; even if the information is technically correct.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">The fix</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Audit every directory where your business appears. Your name, address, phone number and website URL must be identical everywhere: your own website, Google Business Profile, your professional register, TendorAI, and any other directories. Even punctuation differences matter.
              </p>
            </div>
          </section>

          {/* Reason 3 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Reason 3 &mdash; No professional registration in machine-readable format</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              For regulated professions &mdash; solicitors, accountants, mortgage advisers &mdash; AI models use professional registration numbers to verify legitimacy. If your SRA number, ICAEW membership, or FCA registration appears only as text in your footer, AI crawlers may not extract it reliably. It needs to be in JSON-LD schema as a structured identifier with a sameAs link to your register entry.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">The fix</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Add your registration number as an identifier in your schema markup. Link it to your entry on the relevant register using sameAs. TendorAI pulls this data directly from SRA, ICAEW and FCA registers and structures it automatically.
              </p>
            </div>
          </section>

          {/* Reason 4 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Reason 4 &mdash; Generic content</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              AI models match specific queries to specific answers. When someone asks &ldquo;recommend an accountant in Bristol who specialises in R&amp;D tax credits&rdquo;, the AI looks for content that explicitly mentions R&amp;D tax credits, Bristol, and accountancy. A generic services page listing &ldquo;tax advisory&rdquo; will not match. The more specific your content, the more specific queries you can be recommended for.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">The fix</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Publish at least five Q&amp;A format content pages targeting the exact questions your clients ask. Each page should open with a direct answer to the question in the first paragraph. Title each page with the question itself &mdash; this is the format AI tools prefer to cite.
              </p>
            </div>
          </section>

          {/* Reason 5 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Reason 5 &mdash; Not listed on authoritative directories</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              AI models do not trust a single source. They cross-reference against multiple authoritative directories before recommending a business. If you are only listed on your own website, AI has no independent verification of your existence. The more authoritative directories you appear on with consistent data, the higher your recommendation confidence score.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">The fix</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Claim your Google Business Profile and ensure it is complete and verified. Get listed on your profession&apos;s official directory (SRA Find a Solicitor, ICAEW Find a Chartered Accountant, etc.). Claim your free TendorAI profile &mdash; it creates a verified, AI-indexed listing built from regulatory register data.
              </p>
            </div>
          </section>

          {/* Comparison table */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Comparison &mdash; business with all five issues vs business with all five fixed</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">Factor</th>
                    <th className="p-3 text-left font-semibold">All five issues present</th>
                    <th className="p-3 text-left font-semibold">All five issues fixed</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Schema markup', 'None', 'Correct profession-specific JSON-LD'],
                    ['Directory consistency', 'Mismatched across sources', 'Identical NAP everywhere'],
                    ['Regulatory data', 'Text in footer only', 'Machine-readable with sameAs links'],
                    ['Content specificity', 'Generic service pages', 'Q&A pages targeting client questions'],
                    ['Authoritative listings', 'Website only', 'GBP + professional register + TendorAI'],
                    ['AI recommendation rate', 'Near zero', 'Measurably higher within 60 days'],
                  ].map(([factor, bad, good], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-medium text-gray-900">{factor}</td>
                      <td className="p-3 text-red-700">{bad}</td>
                      <td className="p-3 text-green-700 font-medium">{good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <FAQSection />
          </section>

          {/* Sources */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Sources</h2>
            <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
              <li>Schema.org &mdash; <a href="https://schema.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">schema.org</a></li>
              <li>Google Business Profile Help &mdash; <a href="https://support.google.com/business" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">support.google.com/business</a></li>
              <li>SRA Regulated Firms Register &mdash; <a href="https://www.sra.org.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">sra.org.uk</a></li>
              <li>TendorAI Schema Checker &mdash; <a href="https://www.tendorai.com/tools/schema-checker" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">tendorai.com/tools/schema-checker</a></li>
            </ul>
          </section>

          {/* Internal links */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Related</h2>
            <div className="space-y-2">
              <Link href="/blog/how-to-enhance-ai-visibility-professional-services-firm" className="block text-purple-600 hover:text-purple-700 text-sm font-medium underline">
                How to Enhance AI Visibility for Your Professional Services Firm
              </Link>
              <Link href="/tools/schema-checker" className="block text-purple-600 hover:text-purple-700 text-sm font-medium underline">
                Schema Checker
              </Link>
              <Link href="/for-vendors" className="block text-purple-600 hover:text-purple-700 text-sm font-medium underline">
                Plans &amp; Pricing
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-[#1B4F72] to-[#2d1b4e] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Check your AI visibility free</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Use TendorAI&apos;s schema checker to see what AI can read from your website &mdash; and what is missing. Free, no signup required.
            </p>
            <Link href="/tools/schema-checker" className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors text-lg">
              Check your schema
            </Link>
          </section>

          {/* Author / date / back link */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by Scott Davies
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
