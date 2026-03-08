import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'How to Get Your Business Recommended by AI Assistants | TendorAI';
const DESCRIPTION =
  'A step-by-step guide for UK professional services firms on how to get recommended by ChatGPT, Gemini and Perplexity — and the exact signals AI uses to decide who to suggest.';
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-get-recommended-by-ai';
const PUBLISHED = '2026-03-08';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: 'How to Get Your Business Recommended by AI Assistants',
    description:
      'A step-by-step guide for UK professional services firms on how to get recommended by ChatGPT, Gemini and Perplexity.',
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['TendorAI'],
    url: CANONICAL,
    siteName: 'TendorAI',
    images: [
      {
        url: '/og/how-to-get-recommended-by-ai.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Your Business Recommended by AI Assistants',
    description:
      'Step-by-step guide for UK professional services firms on getting recommended by ChatGPT, Gemini and Perplexity.',
  },
  alternates: {
    canonical: CANONICAL,
  },
};

const faqs = [
  {
    q: 'How do AI assistants decide which businesses to recommend?',
    a: 'AI assistants look for businesses that are real (appear on multiple trusted sources), regulated (registered with professional bodies), reputable (have genuine client reviews), and relevant (clearly serve the location and service being asked about). The more evidence they find across these four signals, the more confidently they recommend a firm.',
  },
  {
    q: 'How long does it take to start appearing in AI recommendations?',
    a: 'Most firms see improvement within four to eight weeks of making structured data, directory, and review changes. Perplexity and ChatGPT with browsing access current web data, so improvements can appear relatively quickly.',
  },
  {
    q: 'Do I need to pay to appear in ChatGPT or Gemini?',
    a: 'No. AI recommendations cannot be bought. They are based on data quality and trust signals. This makes structured data, reviews, and directory consistency more important than marketing spend.',
  },
  {
    q: 'What is the difference between SEO and AI visibility?',
    a: 'Traditional SEO focuses on Google search rankings through keywords and backlinks. AI visibility (AEO) focuses on making your data structured, verifiable, and consistent so AI assistants can confidently recommend you. Some tactics overlap, but AEO requires specific attention to structured data and cross-platform consistency.',
  },
  {
    q: 'Which AI platforms should I focus on?',
    a: 'The six most important platforms for UK professional services are ChatGPT, Perplexity, Google Gemini, Claude, Grok, and Meta AI. The same optimisation steps work across all of them — you don\'t need a separate strategy for each.',
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

export default function HowToGetRecommendedByAIPage() {
  const today = new Date().toISOString().split('T')[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Get Your Business Recommended by AI Assistants',
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
      },
    },
    datePublished: PUBLISHED,
    dateModified: today,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': CANONICAL,
    },
    keywords: [
      'how to get recommended by ai',
      'how to get my business found on chatgpt',
      'how to appear in chatgpt results',
      'get my business found on chatgpt',
      'ai visibility uk',
      'how do i get my firm on chatgpt',
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
              <span className="text-white">Get Recommended by AI</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                How-To Guide
              </span>
              <span className="text-purple-200">7 min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              How to Get Your Business Recommended by AI Assistants
            </h1>

            <p className="text-lg text-purple-100 leading-relaxed max-w-3xl">
              AI assistants like ChatGPT and Gemini are now recommending
              businesses directly to potential clients. Here is exactly how to
              make sure yours is one of them.
            </p>

            <div className="mt-6 text-sm text-purple-200">
              Published 8 March 2026 &middot; Scott Davies, Founder —
              TendorAI
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Intro */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Something has quietly changed in how people find professional
            services firms.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Instead of searching Google and clicking through several websites,
            more people are now opening ChatGPT, Gemini or Perplexity and asking
            a direct question:
          </p>

          <ul className="mb-6 space-y-2">
            <li className="text-gray-600 leading-relaxed pl-4 border-l-2 border-purple-300 italic">
              &ldquo;Who is the best accountant for a small business in
              Manchester?&rdquo;
            </li>
            <li className="text-gray-600 leading-relaxed pl-4 border-l-2 border-purple-300 italic">
              &ldquo;Can you recommend a conveyancing solicitor in
              Cardiff?&rdquo;
            </li>
            <li className="text-gray-600 leading-relaxed pl-4 border-l-2 border-purple-300 italic">
              &ldquo;Which mortgage adviser should I use in
              Birmingham?&rdquo;
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-6">
            The AI gives them two or three names. They contact one. The search
            is over.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            If your firm isn&apos;t one of the names that comes back,
            you&apos;re invisible to that potential client — and you&apos;ll
            never know it happened.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            This guide explains exactly how AI assistants decide who to
            recommend, and the specific steps you can take to make your firm one
            of them.
          </p>

          {/* How AI decides */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How AI Assistants Actually Decide Who to Recommend
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Understanding this is the most important part.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              AI assistants don&apos;t rank websites the way Google does. They
              don&apos;t look at page speed, keyword density, or backlinks in
              the traditional sense.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Instead, they look for evidence that a business is:
            </p>

            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span className="text-gray-600">
                  <strong className="text-gray-900">Real</strong> — does it
                  exist on multiple trusted sources across the web?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span className="text-gray-600">
                  <strong className="text-gray-900">Regulated</strong> — is it
                  registered with the relevant professional body?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span className="text-gray-600">
                  <strong className="text-gray-900">Reputable</strong> — do
                  real clients say it is trustworthy?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span className="text-gray-600">
                  <strong className="text-gray-900">Relevant</strong> — does it
                  clearly serve the location and service area being asked about?
                </span>
              </li>
            </ul>

            <p className="text-gray-600 leading-relaxed mb-4">
              When an AI assistant has strong evidence on all four points, it
              recommends that firm with confidence. When the evidence is thin, it
              either recommends a competitor or gives a vague answer that
              doesn&apos;t mention your firm at all.
            </p>

            <p className="text-gray-700 leading-relaxed font-medium">
              The good news: all four of these signals are things you can
              directly influence.
            </p>
          </div>

          {/* Step 1 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step 1: Claim and Verify Your Professional Directory Listings
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            The first thing AI systems check is whether your business is
            registered with the appropriate regulatory body.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            For UK professional services firms this means:
          </p>

          <ul className="mb-4 space-y-2 pl-6 list-disc">
            <li className="text-gray-600">
              <strong>Solicitors</strong> — SRA register (sra.org.uk)
            </li>
            <li className="text-gray-600">
              <strong>Accountants</strong> — ICAEW or ACCA member listings
            </li>
            <li className="text-gray-600">
              <strong>Mortgage advisers</strong> — FCA register (fca.org.uk)
            </li>
            <li className="text-gray-600">
              <strong>Estate agents</strong> — Property Redress Scheme or The
              Property Ombudsman
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI assistants treat these registers as ground truth. If your firm
            appears on the SRA register and your website matches that
            information exactly, it dramatically increases AI confidence in
            recommending you.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-5 mb-10">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-green-800">
                What to do:{' '}
              </span>
              Check that your firm appears correctly on the relevant register.
              Make sure your trading name, address, and website match exactly
              across the register and your own website.
            </p>
          </div>

          {/* Step 2 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step 2: Add Structured Data to Your Website
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Structured data is code that sits in the background of your website
            and tells AI systems — in precise, machine-readable language —
            exactly what your business does, where it operates, and who
            regulates it.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Without it, AI assistants have to guess. With it, they can verify
            your firm instantly.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The most important fields for professional services firms are:
          </p>

          <ul className="mb-4 space-y-2 pl-6 list-disc">
            <li className="text-gray-600">Business name and trading name</li>
            <li className="text-gray-600">Office address and phone number</li>
            <li className="text-gray-600">
              Services offered and practice areas
            </li>
            <li className="text-gray-600">
              Regulatory body and registration number
            </li>
            <li className="text-gray-600">Geographic areas served</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">
            This is technical to implement manually, but platforms like TendorAI
            handle it automatically for UK professional services firms using live
            data from the SRA, FCA and ICAEW registers.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-5 mb-10">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-green-800">
                What to do:{' '}
              </span>
              Add LocalBusiness and ProfessionalService schema markup to your
              website homepage and service pages. Include your regulatory
              registration number in the structured data.
            </p>
          </div>

          {/* Step 3 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step 3: Build Consistent Listings Across the Web
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI assistants cross-reference your business across multiple sources
            before recommending you. The more places your firm appears — with
            consistent, matching information — the more confident AI systems are
            in recommending you.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Key platforms to be listed on:
          </p>

          <ul className="mb-4 space-y-2 pl-6 list-disc">
            <li className="text-gray-600">Google Business Profile</li>
            <li className="text-gray-600">Bing Places</li>
            <li className="text-gray-600">Trustpilot</li>
            <li className="text-gray-600">Yell.com</li>
            <li className="text-gray-600">Thomson Local</li>
            <li className="text-gray-600">
              Your industry-specific directory (Law Society Find a Solicitor,
              ICAEW directory, Unbiased for financial advisers)
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">
            The critical word is <strong>consistent</strong>. Your business
            name, address, and phone number must be identical across every
            listing. Even small variations — &ldquo;Limited&rdquo; versus
            &ldquo;Ltd&rdquo;, or a slightly different postcode format — reduce
            AI confidence.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-5 mb-10">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-green-800">
                What to do:{' '}
              </span>
              Search for your firm name on Google and audit every listing that
              appears. Update any that have outdated or inconsistent information.
            </p>
          </div>

          {/* Step 4 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step 4: Get Genuine Client Reviews on Public Platforms
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Reviews are one of the strongest signals AI assistants use to decide
            which firms to recommend.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Not because AI reads every review — but because a firm with 50
            Google reviews and a 4.8 rating is clearly trusted by real clients,
            and AI systems use that as a credibility signal.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The most influential review platforms for professional services firms
            are:
          </p>

          <ul className="mb-4 space-y-2 pl-6 list-disc">
            <li className="text-gray-600">
              <strong>Google Reviews</strong> — the most important single
              platform
            </li>
            <li className="text-gray-600">
              <strong>Trustpilot</strong> — widely referenced by AI assistants
            </li>
            <li className="text-gray-600">
              <strong>ReviewSolicitors</strong> — specifically for law firms
            </li>
            <li className="text-gray-600">
              <strong>VouchedFor</strong> — for financial advisers and mortgage
              brokers
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">
            You don&apos;t need hundreds of reviews. Ten to twenty genuine,
            recent reviews on Google alone will put most small professional
            services firms ahead of competitors who have none.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-5 mb-10">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-green-800">
                What to do:{' '}
              </span>
              After completing a matter for a satisfied client, send them a
              direct link to your Google review page. Most clients are happy to
              leave a review if you make it easy.
            </p>
          </div>

          {/* Step 5 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step 5: Create Clear, Specific Service Pages on Your Website
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI assistants match firms to searches based on what they can verify
            about your services and location.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            A website that says &ldquo;we offer a full range of legal
            services&rdquo; gives AI very little to work with. A website with
            dedicated pages for &ldquo;Conveyancing Solicitors in
            Cardiff&rdquo;, &ldquo;Probate Solicitors in Newport&rdquo;, and
            &ldquo;Employment Law Advice in Swansea&rdquo; gives AI exactly
            what it needs.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Each service page should clearly state:
          </p>

          <ul className="mb-4 space-y-2 pl-6 list-disc">
            <li className="text-gray-600">
              The specific service you offer
            </li>
            <li className="text-gray-600">The location you serve</li>
            <li className="text-gray-600">Who your typical clients are</li>
            <li className="text-gray-600">What the process involves</li>
            <li className="text-gray-600">How to get in touch</li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">
            This also improves your traditional Google rankings — so it is
            effort that works on multiple fronts.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-5 mb-10">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-green-800">
                What to do:{' '}
              </span>
              Identify your top three to five services and make sure each has
              its own dedicated page with a clear title, location reference, and
              description.
            </p>
          </div>

          {/* Step 6 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step 6: Get Mentioned on Trusted Third-Party Websites
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            AI assistants give more weight to firms that are mentioned or
            referenced outside their own website.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            This can include:
          </p>

          <ul className="mb-4 space-y-2 pl-6 list-disc">
            <li className="text-gray-600">
              Press coverage in local or industry publications
            </li>
            <li className="text-gray-600">
              Guest articles on legal, financial or property websites
            </li>
            <li className="text-gray-600">
              Features in local business directories or chambers of commerce
            </li>
            <li className="text-gray-600">
              Case studies or testimonials on partner websites
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-4">
            You don&apos;t need national press coverage. A mention in your local
            business journal, a guest post on an industry blog, or a feature in
            a trade publication all count.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-5 mb-10">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-green-800">
                What to do:{' '}
              </span>
              Contact your local chamber of commerce, any industry associations
              you belong to, and local business publications. Offer a short
              article or comment on a topic relevant to your sector.
            </p>
          </div>

          {/* Step 7 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step 7: Check How Visible You Actually Are
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Most professional services firms have no idea whether AI assistants
            are recommending them or not — because they&apos;ve never checked.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            The quickest way to find out is to open ChatGPT or Perplexity and
            type:
          </p>

          <div className="bg-gray-50 border-l-4 border-purple-500 rounded-r-lg p-5 mb-6">
            <p className="text-gray-700 italic leading-relaxed">
              &ldquo;Who are the best [your service] in [your town]?&rdquo;
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            If your firm doesn&apos;t appear, you now know what to work on.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            For a more detailed picture — including your score across six AI
            platforms, the specific gaps affecting your visibility, and the
            competitors being recommended instead —{' '}
            <Link
              href="/aeo-report"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              TendorAI runs a full AI Visibility Report
            </Link>{' '}
            in under 60 seconds.
          </p>

          {/* Timeline */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              How Long Does This Take to Work?
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Results vary depending on how much groundwork already exists, but
              firms typically see improvement within four to eight weeks of
              making these changes.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              The firms seeing the fastest results are those that combine all
              seven steps rather than doing one or two in isolation. Structured
              data alone helps. Reviews alone help. But the combination of
              regulatory verification, consistent listings, reviews, and
              structured data creates a level of AI confidence that individual
              signals cannot achieve on their own.
            </p>

            <p className="text-gray-700 leading-relaxed font-medium">
              The firms doing this now are the ones that will dominate AI
              recommendations in their area over the next twelve to eighteen
              months. The window to get ahead of competitors is still open — but
              it won&apos;t be for long.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="my-12 bg-purple-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Find Out What AI Says About Your Firm
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              TendorAI scans your business across ChatGPT, Gemini, Perplexity
              and three other AI platforms and shows exactly where you stand —
              and what to fix. Run your free AI Visibility Report in 60 seconds.
            </p>
            <Link
              href="/aeo-report"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-lg"
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
                  href="/blog/why-wont-chatgpt-recommend-my-law-firm"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Why Won&apos;t ChatGPT Recommend My Law Firm?
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
                  href="/blog/how-to-check-if-business-appears-in-ai-recommendations"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  How to Check If Your Business Appears in AI Recommendations
                </Link>
              </li>
              <li>
                <Link
                  href="/aeo-report"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  Free AI Visibility Report
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
