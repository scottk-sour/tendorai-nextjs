import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'Schema Markup Is Why AI Recommends Your Competitor Instead of You | TendorAI';
const DESCRIPTION =
  "Firms with properly implemented structured data are cited in AI responses 3.2 times more often than those without. Here's what UK solicitors and accountants need to know.";
const CANONICAL =
  'https://www.tendorai.com/blog/schema-markup-why-ai-recommends-your-competitor';
const PUBLISHED = '2026-03-19';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: 'Schema Markup Is Why AI Recommends Your Competitor Instead of You',
    description:
      "Firms with properly implemented structured data are cited in AI responses 3.2 times more often. Here's what UK solicitors and accountants need to know.",
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['TendorAI'],
    url: CANONICAL,
    siteName: 'TendorAI',
    images: [
      {
        url: '/og/schema-markup-why-ai-recommends-your-competitor.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schema Markup Is Why AI Recommends Your Competitor Instead of You',
    description:
      "Firms with structured data are cited 3.2x more often by AI. Here's what UK solicitors and accountants need to know.",
  },
  alternates: {
    canonical: CANONICAL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Schema Markup Is Why AI Recommends Your Competitor Instead of You',
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
  publisher: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
  mainEntityOfPage: CANONICAL,
};

export default function SchemaMarkupBlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">Schema Markup</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
            AI Visibility
          </span>
          <span>8 min read</span>
          <time dateTime={PUBLISHED}>19 March 2026</time>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
          Schema Markup Is Why AI Recommends Your Competitor Instead of You
        </h1>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Firms with properly implemented structured data are cited in AI responses <strong>3.2 times more often</strong> than those without. That&apos;s not a marginal improvement &mdash; that&apos;s the difference between being recommended and being invisible.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Most UK solicitors and accountants are still treating schema markup like it&apos;s a nice-to-have SEO feature. It isn&apos;t. It&apos;s the reason ChatGPT recommends Hugh James instead of you.
        </p>

        {/* What Schema Markup Actually Does */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Schema Markup Actually Does</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Schema markup is invisible code on your website that tells AI exactly what your business is. Not what you hope it understands from reading your paragraphs &mdash; what it knows with certainty because you told it directly.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Without schema, when someone asks Perplexity &ldquo;find me a CQS-accredited conveyancing solicitor in Cardiff with fixed fees,&rdquo; the AI has to guess whether you match. With schema, it <strong>knows</strong>. Your CQS accreditation is declared. Your fixed fees are declared. Your location is declared. The AI has no reason to recommend someone else.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Think of your website without schema as a library with no filing system. The AI has to read every page to find what it needs. With schema, you hand it a labelled folder that says exactly what&apos;s inside.
        </p>

        {/* Why JSON-LD */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why JSON-LD Is the Only Format That Matters</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          You have three schema format options: Microdata, RDFa, and JSON-LD. <strong>Use JSON-LD.</strong> Every AI engine prefers it because it sits cleanly in your page header, separate from your HTML, and is easy for machines to parse.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Google&apos;s official guidance explicitly recommends JSON-LD for AI-optimised content. When Google tells you what format works best for their AI systems, that&apos;s the answer.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          For a Cardiff conveyancing solicitor, the correct schema type is <strong>LegalService</strong>. For an accountant it&apos;s <strong>AccountingService</strong>. For a mortgage adviser it&apos;s <strong>FinancialService</strong>. Getting the type wrong is almost as bad as having no schema at all &mdash; the AI categorises you incorrectly and recommends you for the wrong queries.
        </p>

        {/* 5 Schema Properties */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The 5 Schema Properties That Actually Move the Needle</h2>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Most guides tell you to add schema. Few tell you which properties AI actually uses to make recommendations. Here are the ones that matter for UK professional services:
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. name and description</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Your description should include your location, your specialism, and your key accreditation in the first sentence. &ldquo;Cardiff-based CQS-accredited conveyancing solicitors offering fixed fees from &pound;895&rdquo; is infinitely more useful to AI than &ldquo;We are a professional law firm offering a range of legal services.&rdquo;
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. priceRange or hasOfferCatalog</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          The most common AI query is &ldquo;how much does conveyancing cost in Cardiff.&rdquo; If your fees aren&apos;t in your schema, AI cannot answer that question with your name attached. Your competitors who have published fees will be recommended instead. Every time.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. hasCredential</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          This is where your SRA number, CQS accreditation, Lexcel certification, or ICAEW registration goes. AI uses regulatory credentials as trust signals. A firm with verified credentials in their schema gets recommended over a firm with the same credentials buried in a PDF nobody can parse.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. areaServed</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          AI uses location data to match firms to local queries. Your postcode and city coverage areas need to be in your schema explicitly. &ldquo;We cover South Wales&rdquo; in a paragraph is not the same as <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&quot;areaServed&quot;: &quot;Cardiff, CF10&quot;</code> in your schema.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. aggregateRating</h3>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Your Google reviews need to be reflected in your schema. 52 reviews averaging 4.8 stars means nothing to AI if it isn&apos;t structured. Once it is, AI can confidently say &ldquo;Lucas Law Solicitors in Penarth has 52 reviews averaging 4.8 stars&rdquo; &mdash; and that becomes a recommendation.
        </p>

        {/* Schema Drift */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Problem With Schema You Set and Forget</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>Schema drift</strong> &mdash; where markup falls out of sync with actual page content &mdash; is one of the most common reasons AI systems stop citing previously trusted content.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          You update your fees in January. You forget to update your schema. AI is still recommending you based on your old prices. A client arrives expecting &pound;895 and you quote &pound;1,100. That&apos;s a trust problem that starts with stale schema.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Inaccurate or outdated schema can hurt your company&apos;s visibility across traditional search, local results, and AI-driven experiences. This is the core problem with manual schema implementation. Someone installs it once, forgets about it, and six months later it&apos;s actively working against them.
        </p>

        {/* What This Means */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What This Means for UK Professional Services Firms</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          The firms that will dominate AI recommendations in 2026 are not necessarily the biggest or the best known. They are the ones with the <strong>most accurate, most complete, most current structured data</strong>.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          A Cardiff conveyancing solicitor with properly implemented schema telling AI their CQS accreditation, fixed fees, postcode coverage, and 52 Google reviews will be recommended over a larger firm whose website has no schema at all.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          In March 2025, both Google and Microsoft publicly stated they use schema markup for their generative AI features. ChatGPT then confirmed it uses structured data to determine which products and services appear in its results. This is not speculation. It is confirmed by the platforms themselves.
        </p>

        {/* TendorAI Approach */}
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The TendorAI Approach</h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Most tools tell you what schema to add. <strong>TendorAI installs it for you and keeps it current automatically.</strong>
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          When a Pro firm updates their fees in the TendorAI dashboard, their schema updates on their website within minutes. When they add a new accreditation, it appears in their structured data the same day. When their review count increases, their schema reflects it automatically.
        </p>

        <p className="text-gray-700 mb-10 leading-relaxed">
          No developer. No quarterly audits. No schema drift.
        </p>

        {/* CTA */}
        <div className="bg-[#1B4F72] text-white rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Check your AI visibility now</h3>
          <p className="text-blue-100 mb-6">
            Run a free AI visibility report and see if your schema is helping or hurting your recommendations.
          </p>
          <Link
            href="/aeo-report"
            className="inline-flex items-center px-8 py-3 bg-white text-[#1B4F72] font-bold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Run Your Free Report
          </Link>
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Published {new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by TendorAI
          </p>
        </div>
      </article>
    </>
  );
}
