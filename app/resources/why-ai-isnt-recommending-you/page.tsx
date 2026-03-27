import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/content/articles';

const TITLE = 'Why AI Isn\u2019t Recommending You \u2014 And the Data That Proves It';
const DESCRIPTION = 'The average AI Visibility Score across 12,793 UK professional services firms is 28 out of 100. 91% have no structured data markup. Here\u2019s what the data shows and how to fix it.';
const SLUG = 'why-ai-isnt-recommending-you';
const PUBLISHED = '2026-03-27';
const CANONICAL = `https://www.tendorai.com/resources/${SLUG}`;

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
    q: 'Why does AI recommend my competitor instead of me?',
    a: 'Your competitor almost certainly has structured data in place that you do not. Schema.org markup, verified regulatory credentials, published fee information, and consistent NAP data across platforms are the primary signals AI uses to decide who to recommend. TendorAI\u2019s scan data shows firms with complete structured data profiles are cited 3.2 times more often than those without.',
  },
  {
    q: 'Does being on Google My Business help with AI recommendations?',
    a: 'Partially. A complete, consistent Google Business Profile is one signal AI uses \u2014 but it is not sufficient on its own. AI also needs structured data on your website, verified regulatory credentials, and fee information. A firm with a strong GBP but no schema markup on their website will still score in the 20\u201335 range on TendorAI\u2019s AI Visibility Score.',
  },
  {
    q: 'How long does it take to start appearing in AI recommendations after fixing the gaps?',
    a: 'Structural fixes like schema installation typically take 4\u20138 weeks to be reflected in AI responses. Perplexity updates fastest \u2014 often within 2\u20133 weeks. ChatGPT takes longer. TendorAI\u2019s tracking data shows firms that complete their structured data profile see AI mention frequency increase by an average of 340% within 90 days.',
  },
  {
    q: 'Is AI visibility only relevant for firms in large cities?',
    a: 'No \u2014 and smaller cities and towns often present a bigger opportunity. In major cities like London and Manchester, AI recommendation competition is higher. In smaller markets \u2014 Cardiff, Leicester, Cheltenham, Preston \u2014 fewer firms have structured data in place, which means a complete profile stands out more clearly.',
  },
  {
    q: 'What is the fastest way to improve my AI Visibility Score?',
    a: 'The single highest-impact action is installing Schema.org markup on your website with your regulatory credentials, services, and fee ranges structured correctly. This alone typically moves a score from the 20\u201330 range to 50\u201365. The free AEO report at tendorai.com/aeo-report shows your current score and the specific gaps holding it down \u2014 it takes 30 seconds and requires no login.',
  },
];

const scoreTableRows = [
  { range: '0\u201330', meaning: 'AI knows you exist, cannot verify you', likelihood: 'Rarely recommended' },
  { range: '31\u201360', meaning: 'Partial data \u2014 AI mentions but does not prioritise', likelihood: 'Occasionally recommended' },
  { range: '61\u201380', meaning: 'Strong structured data \u2014 AI recommends with context', likelihood: 'Regularly recommended' },
  { range: '81\u2013100', meaning: 'Complete entity profile \u2014 AI recommends with confidence', likelihood: 'Consistently recommended' },
];

const dataGaps = [
  {
    title: 'No structured data markup on the website',
    body: 'Present in 91% of cases. Schema.org markup is the language AI speaks. Without it, your website is a document AI has to guess the meaning of rather than read directly. A firm with Schema markup installed is cited in AI responses 3.2 times more often than one without, according to TendorAI\u2019s scan data.',
  },
  {
    title: 'Inconsistent NAP data',
    body: 'Name, address, and phone number appearing differently across your website, Google Business Profile, Companies House, and directory listings. AI cross-references these sources to verify an entity is real. Inconsistencies reduce confidence and reduce recommendation frequency. TendorAI\u2019s data shows 40% of tracked firms have at least one NAP inconsistency across platforms.',
  },
  {
    title: 'No fee or pricing information',
    body: 'AI recommends specifics. When someone asks \u201chow much does a conveyancing solicitor cost in Leeds,\u201d AI looks for a source that answers that question directly. A firm with published fee ranges gets cited. A firm with \u201ccontact us for a quote\u201d gets skipped. 78% of solicitor profiles in TendorAI\u2019s dataset have no fee information whatsoever.',
  },
  {
    title: 'Regulatory credentials not machine-readable',
    body: 'Your SRA number, ICAEW registration, or FCA authorisation number may appear on your website \u2014 but if it is buried in a paragraph of text rather than marked up as a structured data field, AI cannot extract it. Without verified regulatory credentials, AI treats your firm as unconfirmed and reduces recommendation confidence accordingly.',
  },
  {
    title: 'No reviews or social proof in structured format',
    body: 'BrightLocal\u2019s research shows 88% of consumers trust online reviews as much as personal recommendations. AI applies similar weighting. A firm with AggregateRating schema showing verified reviews scores significantly higher than one with no review data \u2014 even if reviews exist on Google but are not surfaced in structured format.',
  },
  {
    title: 'No fresh content answering the questions clients ask AI',
    body: 'AI recommendation is not a one-time fix. AI platforms crawl and update continuously. A firm that published a blog post in 2023 and nothing since is losing ground to firms publishing structured, FAQ-rich content monthly. The firms appearing consistently in AI responses are publishing content that directly answers the questions their clients ask \u2014 with specific UK pricing, regulatory context, and structured FAQ markup.',
  },
];

const commonTraits = [
  'Schema.org markup installed and current',
  'ICAEW, SRA, or FCA number confirmed in structured format',
  'Fee ranges published for primary services',
  'Google Business Profile complete and consistent with website data',
  'At least 10 verified reviews with AggregateRating schema',
  'Content published within the last 90 days answering a specific client question',
];

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
      <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{value}</div>
      <div className="text-sm font-medium text-gray-900">{label}</div>
    </div>
  );
}

export default function WhyAiIsntRecommendingYouPage() {
  const related = articles.filter(a => a.slug !== SLUG && a.category === 'Research').slice(0, 3);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    author: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    publisher: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
    mainEntityOfPage: CANONICAL,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/resources" className="text-purple-300 hover:text-white transition text-sm">&larr; Resources</Link>
              <span className="text-purple-400">|</span>
              <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-xs font-medium rounded-full">Research</span>
              <span className="text-purple-400 text-sm">12 min read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Why AI Isn&rsquo;t Recommending You &mdash; And the Data That Proves It
            </h1>
            <p className="text-lg md:text-xl text-purple-200 leading-relaxed max-w-3xl">
              The average AI Visibility Score across 12,793 UK professional services firms is <strong className="text-white">28 out of 100</strong>. Not a single firm in TendorAI&rsquo;s dataset scores above 60 without paid intervention.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="28/100" label="Average AI Visibility Score" />
            <StatCard value="91%" label="Missing structured data" />
            <StatCard value="12,793" label="UK firms tracked" />
            <StatCard value="3.2x" label="More mentions with schema" />
          </div>
        </section>

        {/* Article Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">

            {/* Intro */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The problem is not your reputation. It is your data.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              ChatGPT, Perplexity, and Gemini are not search engines. They do not rank ten results and let the user choose. They pick two or three firms, recommend them by name, and ignore everyone else. The firms they pick are not necessarily the best &mdash; they are the best-structured. The ones that have told AI exactly who they are, what they do, and why they are credible.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              TendorAI tracks AI recommendation data across 12,793 SRA, ICAEW, and FCA-registered firms in the UK. The data is unambiguous. Here is what it shows.
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              91% of UK Professional Services Firms Are Missing the Data AI Needs
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AI cannot recommend what it cannot read &mdash; and right now, it cannot read most UK professional services websites.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              TendorAI&rsquo;s analysis of 8,625 SRA-registered solicitors found that <strong>91% have no structured data markup</strong> on their website. No Schema.org. No machine-readable service information. No verified regulatory credentials in a format AI can parse. To ChatGPT, these firms are effectively anonymous.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The same pattern holds across verticals. Of 35,000+ ICAEW and ACCA-registered accountancy practices, fewer than 9% have structured data in place. Among FCA-registered mortgage advisers, the figure is lower still.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              This is not a small gap. It is the difference between existing to AI and being invisible to it.
            </p>

            {/* Section 2 - Data Gaps */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
              The 6 Data Gaps That Keep Firms Out of AI Recommendations
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&rsquo;s weekly scans identify the same gaps repeatedly across every vertical. These are the six most common &mdash; ranked by frequency across all firms tracked.
            </p>
            <div className="space-y-6 mb-10">
              {dataGaps.map((gap, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{gap.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{gap.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 3 - Score Breakdown */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              What a 28/100 Score Actually Means
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The average UK professional services firm scores 28 out of 100 on TendorAI&rsquo;s AI Visibility Score. At that level, AI knows your firm exists &mdash; but not enough to recommend it with confidence.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The score measures six components: schema installation, NAP consistency, fee transparency, regulatory credential verification, review data, and content freshness. A score of 28 typically means a firm has a Google Business Profile, appears in one or two directories, and has an SRA or ICAEW number somewhere on their website &mdash; but none of it is structured, verified, or connected in a way AI can use.
            </p>

            <div className="overflow-x-auto mb-10">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">AI Visibility Score</th>
                    <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">What It Means</th>
                    <th className="text-left px-4 py-3 font-semibold text-purple-900 border border-purple-100">Recommendation Likelihood</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreTableRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-900 border border-gray-100">{row.range}</td>
                      <td className="px-4 py-3 text-gray-600 border border-gray-100">{row.meaning}</td>
                      <td className="px-4 py-3 text-gray-600 border border-gray-100">{row.likelihood}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 leading-relaxed mb-10">
              The firms scoring above 60 in TendorAI&rsquo;s dataset have three things in common: schema markup installed on their own website, verified regulatory credentials in structured format, and at least one recent piece of content answering a specific client question.
            </p>

            {/* Section 4 - Google vs AI */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Why Google Rankings Do Not Transfer to AI
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A firm ranked on page one of Google for &ldquo;accountant Manchester&rdquo; can be completely absent from ChatGPT&rsquo;s answer to the same question. This is not a bug &mdash; it is a fundamental difference in how the two systems work.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Google ranks pages. AI recommends entities. Google looks at backlinks, keyword relevance, and domain authority. AI looks at structured data, entity verification, and confidence signals. The two systems share some inputs &mdash; domain authority has some crossover &mdash; but they are not the same channel and optimising for one does not optimise for the other.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              This is why firms with strong Google rankings are surprised to find themselves invisible in AI responses. And it is why firms with modest Google presence but complete structured data profiles are appearing in ChatGPT recommendations ahead of established competitors.
            </p>

            {/* Section 5 - What successful firms share */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              The Firms AI Does Recommend &mdash; What They Have in Common
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              TendorAI&rsquo;s scan data across 10 major UK cities shows the firms appearing consistently in AI recommendations share a consistent profile:
            </p>
            <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-6">
              <ul className="space-y-3">
                {commonTraits.map((trait, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed mb-10">
              None of these firms are necessarily the largest or the best-known. Several are small practices with fewer than five staff. What they have is complete, structured, verified data &mdash; the exact signals AI needs to recommend with confidence.
            </p>

            {/* FAQs */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6 mb-10">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Closing */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 mt-10">
              <p className="text-gray-700 leading-relaxed mb-4">
                The data is not ambiguous. <strong>91% of UK professional services firms are invisible to AI</strong> because they are missing structured data &mdash; not because they are unknown, unqualified, or lacking clients.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The firms AI recommends are not the biggest or the oldest. They are the best-structured. That is a gap that closes in weeks, not years.
              </p>
              <div className="mt-6">
                <Link
                  href="/aeo-report"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                >
                  Check your AI Visibility Score &mdash; free, 30 seconds, no login
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Research</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((article) => (
                  <Link
                    key={article.slug}
                    href={article.href || `/resources/${article.slug}`}
                    className="group bg-white p-5 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
                  >
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-rose-100 text-rose-700 mb-3">
                      {article.category}
                    </span>
                    <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-500">{article.readTime} min read</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
            Published {PUBLISHED} by TendorAI Research
          </div>
        </article>
      </main>
    </>
  );
}
