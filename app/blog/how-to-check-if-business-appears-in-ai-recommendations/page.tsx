import { Metadata } from 'next';
import Link from 'next/link';

const TITLE =
  'How to Check if Your Business Appears in AI Recommendations (Free)';
const DESCRIPTION =
  "Free step-by-step guide to checking if ChatGPT, Perplexity and Claude recommend your business. Manual testing method plus automated AI visibility scanning.";
const CANONICAL =
  'https://www.tendorai.com/blog/how-to-check-if-business-appears-in-ai-recommendations';
const PUBLISHED = '2026-03-01';

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

const faqs = [
  {
    q: 'How do I check if ChatGPT recommends my business?',
    a: 'Open ChatGPT, ask "Can you recommend a [your service] in [your city]?" and see if your business appears. For automated multi-platform testing, use TendorAI\'s free AI visibility report.',
  },
  {
    q: 'Which AI platforms should I check for my business?',
    a: "The main ones are ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews. TendorAI's free report checks 6 platforms automatically.",
  },
  {
    q: "Why doesn't my business show up in AI recommendations?",
    a: 'Common reasons: no structured data, inconsistent NAP data, thin online presence, no reviews, missing directory listings. Your AI visibility report identifies the specific gaps.',
  },
  {
    q: 'How often should I check my AI visibility?',
    a: "At least monthly. AI platforms update their knowledge continuously. TendorAI paid plans include weekly automated monitoring.",
  },
  {
    q: 'Is there a free tool to check AI recommendations?',
    a: 'Yes. TendorAI offers a free AI visibility report that scans 6 AI platforms and shows whether each recommends your business, your position, and who ranks above you.',
  },
];

function FAQSection() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-gray-200 rounded-lg">
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

function PromptBox({ prompt }: { prompt: string }) {
  return (
    <div className="bg-gray-900 text-green-400 rounded-lg p-4 my-4 font-mono text-sm leading-relaxed overflow-x-auto">
      <div className="flex items-center gap-2 mb-2 text-gray-500 text-xs">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
        <span className="ml-2">AI prompt</span>
      </div>
      <span className="text-gray-500 select-none">&gt; </span>
      {prompt}
    </div>
  );
}

export default function HowToCheckAIRecommendationsPage() {
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
              <span className="text-white">Check AI Recommendations</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                How-To Guide
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
              Published 1 March 2026
            </div>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Opening */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            More people are asking AI tools like ChatGPT, Perplexity, and Claude
            to recommend businesses instead of searching on Google. If someone asks
            &quot;Can you recommend a good solicitor in Leeds?&quot; and your firm
            doesn&apos;t appear, you&apos;re losing potential clients to competitors
            who do. The good news: you can check whether AI platforms recommend your
            business right now, for free.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            There are two ways to do this. The manual method involves opening each
            AI platform and typing test prompts yourself. The automated method uses{' '}
            <Link href="/ai-visibility-report" className="text-purple-600 underline hover:text-purple-800">
              TendorAI&apos;s free AI visibility report
            </Link>{' '}
            to scan 6 AI platforms simultaneously and deliver your results in about
            60 seconds. This guide covers both approaches step by step.
          </p>

          {/* Section 1: Manual Method */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            1. The Manual Method: Test Each Platform Yourself
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            The most straightforward way to check is to open each AI platform and
            ask it to recommend a business like yours. Here is exactly how to do it
            for each platform:
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            ChatGPT (chat.openai.com)
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">
            Open ChatGPT and start a new conversation. Type a prompt that a real
            customer might use:
          </p>
          <PromptBox prompt="Can you recommend a good conveyancing solicitor in Bristol?" />
          <p className="text-gray-600 leading-relaxed mb-4">
            Read through the full response. Look for your company name, any
            description of your services, and note your position in the list if
            multiple businesses are mentioned. Copy or screenshot the response
            for your records.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Perplexity (perplexity.ai)
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">
            Perplexity searches the web in real time and cites sources. Use the
            same style of prompt:
          </p>
          <PromptBox prompt="Who are the best mortgage advisers in Manchester?" />
          <p className="text-gray-600 leading-relaxed mb-4">
            Perplexity shows source links alongside its answer. Check whether your
            business is mentioned in the text and whether any of the cited sources
            are your website or directory listings.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Claude (claude.ai)
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">
            Open Claude and start a new conversation:
          </p>
          <PromptBox prompt="I need a reliable accountant in Birmingham. Who would you recommend?" />
          <p className="text-gray-600 leading-relaxed mb-4">
            Claude often provides detailed reasoning about why it recommends certain
            businesses. Note whether it mentions your firm by name and what it says
            about you.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Google Gemini and AI Overviews
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">
            Search Google for a service query and look for the AI Overview panel at
            the top. You can also test Gemini directly at gemini.google.com:
          </p>
          <PromptBox prompt="Find me a financial adviser in Edinburgh" />

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Microsoft Copilot (copilot.microsoft.com)
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">
            Microsoft Copilot uses Bing search data combined with AI to generate
            recommendations. Open Copilot and try:
          </p>
          <PromptBox prompt="Who are the best estate agents in Liverpool?" />
          <p className="text-gray-600 leading-relaxed mb-4">
            Copilot often includes links to sources alongside its recommendations.
            Check whether your business is mentioned by name and whether any of the
            linked sources are your website, directory listings, or review profiles.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6">
            <h4 className="font-semibold text-amber-900 mb-2">Why Manual Testing Is Inconsistent</h4>
            <p className="text-sm text-amber-800 mb-2">
              Testing manually across all five platforms takes 20&ndash;30 minutes
              per platform. You should test multiple prompt variations for each,
              which means a thorough manual check takes 2+ hours.
            </p>
            <p className="text-sm text-amber-800 mb-2">
              More importantly, AI responses are non-deterministic &mdash; the
              same prompt can produce different answers in different sessions, at
              different times of day, and from different locations. A single
              manual test is not definitive. Your business might appear in one
              session and not the next. This makes manual testing unreliable for
              tracking your visibility over time.
            </p>
            <p className="text-sm text-amber-800">
              For a reliable picture, you need to test dozens of prompt
              variations across all platforms simultaneously &mdash; which is
              exactly what automated tools do.
            </p>
          </div>

          {/* Section 2: What to Search For */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            2. What to Search For
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            The exact wording of your prompt matters. Start with the format most
            people naturally use:
          </p>

          <PromptBox prompt="Can you recommend a [service type] in [city]?" />

          <p className="text-gray-600 leading-relaxed mb-4">
            Then try variations. Real users phrase things differently, and AI
            models may return different results for each:
          </p>

          <div className="space-y-2 mb-6">
            <PromptBox prompt="Who is the best estate agent in Liverpool?" />
            <PromptBox prompt="Find me a family solicitor near Brighton" />
            <PromptBox prompt="I need a tax adviser in London. Any suggestions?" />
            <PromptBox prompt="Which accounting firms in Cardiff have good reviews?" />
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            Try at least three to five variations per platform. AI responses are
            non-deterministic, meaning the same prompt can produce different answers
            in different sessions. Testing multiple phrasings gives you a more
            reliable picture of your visibility.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Replace the service type and city with your actual business details. If
            you serve multiple locations, test each one separately.
          </p>

          {/* Section 3: How to Read the Results */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            3. How to Read the Results
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            When you get a response, you need to understand what it actually means
            for your business. There is an important distinction between being
            mentioned and being recommended.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h4 className="font-semibold text-green-900 mb-2">Recommended</h4>
              <p className="text-sm text-green-800">
                The AI explicitly suggests your business as a good option.
                &quot;I&apos;d recommend Smith &amp; Partners for conveyancing in
                Bristol. They specialise in residential property and have strong
                client reviews.&quot;
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h4 className="font-semibold text-blue-900 mb-2">Mentioned</h4>
              <p className="text-sm text-blue-800">
                The AI names your business but does not specifically recommend it.
                &quot;Some firms in Bristol include Smith &amp; Partners, Jones Law,
                and Carter Associates.&quot;
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Position matters.</strong> Being the first business mentioned
            (position 1) is significantly more valuable than being fifth on a list.
            Users typically contact the first one or two businesses an AI suggests,
            just like they click the top Google results.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            When reviewing each response, record three things:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li>
              <strong>Mention status</strong> &mdash; Were you mentioned at all?
              Yes or no.
            </li>
            <li>
              <strong>Position</strong> &mdash; If you were mentioned, what number
              were you in the list? (1st, 2nd, 3rd, etc.)
            </li>
            <li>
              <strong>Competitors</strong> &mdash; Which businesses were mentioned
              instead of (or alongside) yours?
            </li>
          </ul>

          <p className="text-gray-600 leading-relaxed mb-6">
            Tracking competitor mentions is just as important as tracking your own.
            If the same competitor consistently appears at position 1 across
            multiple platforms, study what they are doing differently &mdash;
            their structured data, review profiles, and directory listings likely
            hold clues.
          </p>

          {/* Section 4: Automated Method */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            4. The Automated Method: TendorAI&apos;s Free AI Visibility Report
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            The manual method works, but it is time-consuming and inconsistent.
            You would need to test dozens of prompt variations across multiple
            platforms to get a reliable picture.{' '}
            <Link href="/ai-visibility-report" className="text-purple-600 underline hover:text-purple-800">
              TendorAI&apos;s free AI visibility report
            </Link>{' '}
            automates this across 50+ prompt variations and 6 AI platforms
            simultaneously. Here is what it does:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Queries 6 AI platforms simultaneously</strong> &mdash;
                  ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI, all in
                  one scan.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Shows mention status per platform</strong> &mdash; a clear
                  yes/no for each platform, so you know exactly where you are
                  visible and where you are not.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Position ranking</strong> &mdash; where you appear in each
                  AI&apos;s recommendation list (1st, 3rd, 5th, etc.).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Competitor data</strong> &mdash; see which businesses AI
                  platforms recommend instead of yours.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>AI Visibility score</strong> &mdash; a single number
                  summarising your overall presence across all AI platforms.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Specific improvement recommendations</strong> &mdash;
                  actionable steps to increase your visibility, tailored to your
                  business.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            The whole process takes about 60 seconds compared to 2+ hours of manual
            testing. TendorAI runs 50+ prompt variations across all 6 platforms,
            giving you a far more reliable picture than any manual test could. You
            enter your business name, service type, and location, and TendorAI
            handles the rest.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            For{' '}
            <Link href="/pricing" className="text-purple-600 underline hover:text-purple-800">
              businesses that want ongoing monitoring
            </Link>
            , TendorAI&apos;s paid plans include weekly automated scans so you can
            track how your AI visibility changes over time without repeating the
            manual process every month.
          </p>

          {/* Section 5: What to Do If AI Doesn't Recommend You */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            5. What to Do If AI Doesn&apos;t Recommend You
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            If your business does not appear in AI recommendations, that is not
            unusual &mdash; most businesses don&apos;t. The difference between
            businesses that get recommended and those that don&apos;t usually comes
            down to a handful of factors that AI models rely on when generating
            answers.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Here are the most common fixes, in order of impact:
          </p>

          <ol className="list-decimal pl-6 space-y-3 text-gray-600 mb-6">
            <li>
              <strong>Add structured data to your website.</strong> Schema.org
              markup (LocalBusiness, ProfessionalService, or Organization) tells AI
              models exactly what your business does, where it operates, and how to
              contact you. Without it, AI models have to guess.
            </li>
            <li>
              <strong>Get listed in authoritative directories.</strong> AI models
              draw heavily from directory data. For UK professional services, this
              means the SRA, FCA, or ICAEW registers, plus platforms like Google
              Business Profile, Trustpilot, and Yelp.
            </li>
            <li>
              <strong>Install Schema.org markup.</strong> Beyond basic structured
              data, implement FAQ schema, review schema, and service schema on your
              key pages. This gives AI models structured answers they can reference
              directly.
            </li>
            <li>
              <strong>Build a review profile.</strong> AI models treat reviews as
              trust signals. Businesses with more reviews and higher ratings are
              more likely to be recommended. Ask satisfied clients to leave reviews
              on Google and Trustpilot.
            </li>
            <li>
              <strong>Ensure consistent NAP data.</strong> Your Name, Address, and
              Phone number should be identical across every directory, your website,
              and your social profiles. Inconsistencies confuse AI models and reduce
              your chances of being mentioned.
            </li>
          </ol>

          <p className="text-gray-600 leading-relaxed mb-6">
            Your{' '}
            <Link href="/ai-visibility-report" className="text-purple-600 underline hover:text-purple-800">
              free AI visibility report
            </Link>{' '}
            identifies which of these gaps apply to your business specifically, so
            you know exactly where to start. For a deeper dive into{' '}
            <Link
              href="/ai-visibility-uk"
              className="text-purple-600 underline hover:text-purple-800"
            >
              AI visibility for UK businesses
            </Link>
            , see our full guide.
          </p>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <FAQSection />

          {/* CTA Banner */}
          <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Check Your AI Visibility &mdash; Free
            </h3>
            <p className="text-purple-100 mb-6 max-w-lg mx-auto">
              Find out if ChatGPT, Perplexity, Claude, Gemini, Copilot, and Meta AI
              recommend your business. Get your AI Visibility score, see your
              competitors, and get actionable recommendations &mdash; all in
              60 seconds.
            </p>
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-lg"
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

          {/* Internal links */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Related Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pricing"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  TendorAI for Businesses &mdash; Plans and Features
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  TendorAI Blog &mdash; More Guides and Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-visibility-uk"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  AI Visibility for UK Businesses &mdash; The Complete Guide
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </main>
    </>
  );
}
