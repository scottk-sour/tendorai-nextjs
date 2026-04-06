import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'What Steps Should I Take to Enhance AI Visibility for My Firm?';
const DESCRIPTION =
  'A practical step-by-step guide for UK professional services firms on improving AI visibility across ChatGPT, Perplexity and Google AI Overviews.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-enhance-ai-visibility-professional-services-firm';
const PUBLISHED = '2026-04-06';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
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
  keywords: [
    'enhance AI visibility professional services',
    'AI visibility steps UK firms',
    'ChatGPT visibility solicitors',
    'Perplexity visibility accountants',
    'Google AI Overviews professional services',
    'AEO strategy UK',
  ],
};

const faqs = [
  {
    q: 'How long does it take to improve AI visibility for a professional services firm?',
    a: 'Most firms see measurable improvement within 60 days of implementing schema markup, fixing directory consistency, and publishing targeted content. Perplexity reflects changes fastest \u2014 sometimes within days. ChatGPT updates more slowly, typically 4 to 8 weeks.',
  },
  {
    q: 'Can I improve AI visibility without technical knowledge?',
    a: 'Yes. TendorAI handles the technical implementation \u2014 schema installation, regulatory data structuring, and directory verification \u2014 without requiring any developer involvement. The entire setup takes under 10 minutes of your time.',
  },
  {
    q: 'Which AI platform should I prioritise first?',
    a: 'Perplexity currently cites specific UK professional services firms most frequently by name. Google AI Overviews pulls heavily from Google Business Profile. ChatGPT relies on structured schema and entity verification. TendorAI tracks all six major platforms.',
  },
  {
    q: 'How do I know if my AI visibility is improving?',
    a: 'Test manually by asking ChatGPT, Perplexity and Claude to recommend a firm like yours in your area. TendorAI Pro automates this with weekly scans across six platforms and sends you an email the moment any AI platform recommends you.',
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

export default function EnhanceAIVisibilityProfessionalServicesPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': CANONICAL,
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: today,
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
        width: 873,
        height: 873,
      },
    },
    url: CANONICAL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: {
      '@type': 'ImageObject',
      url: 'https://www.tendorai.com/logo.png',
      width: 873,
      height: 873,
    },
    articleSection: 'AEO Strategy',
    keywords: [
      'enhance AI visibility',
      'professional services AI',
      'AEO strategy',
      'schema markup',
      'UK firms AI recommendations',
    ],
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
      { '@type': 'ListItem', position: 3, name: 'AEO Strategy', item: 'https://www.tendorai.com/blog' },
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
        <section className="bg-brand-gradient text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-white">AEO Strategy</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">AEO Strategy</span>
              <span className="text-blue-200">8 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{TITLE}</h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">{DESCRIPTION}</p>

            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span>Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Opening */}
          <section className="mb-12">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              <strong>Most UK professional services firms take no action on AI visibility until a competitor starts appearing in ChatGPT recommendations ahead of them &mdash; by which point the gap is already six months wide.</strong> The firms that act now will be the ones AI recommends by default. This guide covers the exact steps, in order of priority.
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-8">The firms appearing in AI results did not get there by accident. They followed a specific process.</p>
          </section>

          {/* Step 1 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Step 1 &mdash; Audit your current AI visibility</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Before changing anything, <strong>find out where you stand</strong>. Open ChatGPT, Perplexity and Claude and enter prompts matching your services: &ldquo;recommend a [your profession] in [your city]&rdquo;, &ldquo;who is the best [your specialism] in [your area]?&rdquo; Record whether your firm appears, which competitors do, and what reasons the AI gives. This takes five minutes and reveals exactly how visible you currently are. <strong>TendorAI&apos;s free AI visibility report</strong> automates this across six platforms.
            </p>
          </section>

          {/* Step 2 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Step 2 &mdash; Fix your schema markup</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Install the <strong>correct Schema.org type</strong> for your profession on your website. Solicitors need LegalService schema. Accountants need AccountingService. Mortgage advisers need FinancialService. Estate agents need RealEstateAgent. Each must include your firm name, address, phone, website URL, services offered, and any <strong>professional registration numbers as structured identifiers</strong>. This is the single most impactful technical change you can make.
            </p>
          </section>

          {/* Step 3 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Step 3 &mdash; Make your regulatory data machine-readable</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you are regulated, your <strong>registration number must appear in JSON-LD schema</strong> &mdash; not just as plain text on your website. Your SRA number, ICAEW membership, FCA registration or Propertymark number should be declared as a structured identifier with a <strong>sameAs link pointing to your entry on the relevant register</strong>. This is how AI models verify your legitimacy before recommending you.
            </p>
          </section>

          {/* Step 4 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Step 4 &mdash; Align your directory presence</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your <strong>firm name, address, phone number and website URL must be identical</strong> across every directory where you appear: your own website, Google Business Profile, your regulatory register entry, any professional directories, and platforms like TendorAI. Any inconsistency &mdash; even a different phone format &mdash; <strong>reduces AI confidence in your identity</strong> and suppresses recommendations.
            </p>
          </section>

          {/* Step 5 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Step 5 &mdash; Publish Q&amp;A content targeting client questions</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI tools cite content that <strong>directly answers questions</strong>. &ldquo;How much does conveyancing cost in Cardiff?&rdquo; is a question clients ask ChatGPT. If your firm has a published, structured answer, AI is more likely to cite you. Publish at least <strong>five pages in Q&amp;A format</strong> targeting the exact questions your clients ask most often. Each should open with a direct answer in the first paragraph.
            </p>
          </section>

          {/* Step 6 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Step 6 &mdash; Claim your TendorAI profile</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              TendorAI has already built a profile for most UK professional services firms using data from the <strong>SRA, ICAEW and FCA registers</strong>. Claiming your profile takes two minutes and gives you a verified, machine-readable presence in an AI-indexed directory. Upgrading to Pro gets your <strong>schema installed on your own website within 48 hours</strong> &mdash; no developer required.
            </p>
          </section>

          {/* Step 7 */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Step 7 &mdash; Track your visibility weekly</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You cannot improve what you do not measure. Run the same manual tests from Step 1 every week, or use <strong>TendorAI Pro&apos;s automated weekly scans</strong> across ChatGPT, Perplexity, Claude, Gemini, Grok and Meta AI. Track your <strong>AI Visibility Score</strong> over time to see which changes are having the most impact.
            </p>
          </section>

          {/* Comparison table */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Comparison &mdash; firms that have taken these steps vs firms that have not</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-3 text-left font-semibold">Factor</th>
                    <th className="p-3 text-left font-semibold">No AI visibility action</th>
                    <th className="p-3 text-left font-semibold">All seven steps implemented</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Schema markup', 'None', 'Correct profession-specific JSON-LD with regulatory identifiers'],
                    ['Regulatory data', 'Registration number in footer text', 'Machine-readable, cross-referenced with register'],
                    ['Content', 'Generic service descriptions', 'Q&A format targeting specific client questions'],
                    ['Directory consistency', 'Mismatched across sources', 'Identical NAP everywhere'],
                    ['AI recommendation rate', 'Near zero', 'Measurably higher within 60 days'],
                    ['Time to results', 'N/A', 'Schema installed in 48 hours, visible improvement in 60 days'],
                  ].map(([factor, without, withSteps], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-medium text-gray-900">{factor}</td>
                      <td className="p-3 text-red-700">{without}</td>
                      <td className="p-3 text-green-700 font-medium">{withSteps}</td>
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
          <div className="mt-8 text-xs text-gray-400 italic">
            Sources: SRA Regulated Firms Register &mdash; sra.org.uk &middot; ICAEW Find a Chartered Accountant &mdash; icaew.com &middot; FCA Financial Services Register &mdash; register.fca.org.uk &middot; Schema.org &mdash; schema.org &middot; TendorAI How It Works &mdash; tendorai.com/ai-visibility-platform
          </div>

          {/* Internal links */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Related reading</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/why-isnt-my-business-appearing-in-chatgpt-recommendations" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Related article: Why isn&apos;t my business appearing in ChatGPT recommendations?
                </Link>
              </li>
              <li>
                <Link href="/tools/schema-checker" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Schema Checker &mdash; test your website&apos;s structured data
                </Link>
              </li>
              <li>
                <Link href="/for-vendors" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Plans &amp; Pricing &mdash; see what TendorAI Pro includes
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="my-12 bg-gradient-to-r from-[#1B4F72] to-[#2d1b4e] rounded-2xl p-8 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to get your firm recommended by AI?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              TendorAI pulls your regulatory data, installs schema on your website, and tracks your visibility across six AI platforms. Free to start.
            </p>
            <Link
              href="/for-vendors"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg text-lg"
            >
              Claim your free profile
            </Link>
          </div>

          {/* Back to Blog */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
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
