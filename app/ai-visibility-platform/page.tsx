import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility for UK Solicitors | TendorAI';
const DESCRIPTION =
  'A three-month measured programme for UK solicitors. We measure whether ChatGPT, Google AI Overviews and Perplexity name your firm, make your firm easier for them to read and verify, then measure again. £999 per month.';
const CANONICAL = 'https://www.tendorai.com/ai-visibility-platform';

const AUGUST_REPORT = '/resources/ai-visibility-report-solicitors-august-2026';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
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

const whatYouGet: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: 'You’ll know where you stand',
    body: (
      <>
        Right now you probably don’t know whether AI names your firm, what it says about you, or
        which competitors it names instead. Month one gives you a measured baseline across ChatGPT,
        Google AI Overviews and Perplexity. Not a guessed score. Not a checklist. A record of what
        the systems actually return for the questions your potential clients ask.
      </>
    ),
  },
  {
    title: 'Your firm will be easier for AI to read and verify',
    body: (
      <>
        <p className="mb-4">
          We work on what AI systems can actually find about your firm: your identity, regulatory
          details, services, locations and supporting evidence across your website and public
          sources. That includes structured data matched to your SRA record, clearer service pages,
          and consistent information across the sources AI systems use.
        </p>
        <p>
          We cannot decide which firm an AI assistant ultimately recommends. We can make sure your
          firm is clear, consistent and verifiable when it is considered.
        </p>
      </>
    ),
  },
  {
    title: 'You’ll know whether anything changed',
    body: (
      <>
        We use the same prompts and the same measurement method throughout. Every change is
        recorded. Every measurement is dated. At the end you can see the baseline beside the second
        measurement and understand what moved.
      </>
    ),
  },
];

const programmeSteps: Array<{ title: string; body: string }> = [
  {
    title: 'Measure',
    body: 'across ChatGPT, Google AI Overviews and Perplexity, using a prompt set fixed at onboarding.',
  },
  {
    title: 'Diagnose',
    body: 'what AI assistants can and cannot currently find about your firm, which sources they rely on, and which competitors they name instead.',
  },
  {
    title: 'Implement',
    body: 'changes to your website, including structured data, service pages and supporting content where the evidence suggests they’re worth making.',
  },
  {
    title: 'Record',
    body: 'every change logged with the date and what we expected it to achieve.',
  },
  {
    title: 'Re-measure',
    body: 'the same measurement again, so you can see whether anything actually moved.',
  },
];

const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'What does it cost?',
    a: '£999 per month for an initial three-month programme — £2,997 in total. TendorAI is not VAT-registered, so no VAT is added. Booked through a short call so we can establish whether your firm is a sensible fit before you commit.',
  },
  {
    q: 'Why three months?',
    a: 'Long enough to establish a baseline, make and record changes, and measure again using the same methodology. A shorter engagement can tell you where you are. It gives you much less evidence about whether anything changed.',
  },
  {
    q: 'Which AI assistants do you measure?',
    a: 'Three: ChatGPT, Google AI Overviews and Perplexity. Not Claude, not Grok, not Gemini. We measure what we measure, and we name it.',
  },
  {
    q: 'Who runs TendorAI?',
    a: 'TendorAI is run by its founder, Scott Davies, from Cwmbran.',
  },
];

export default function AiVisibilityPlatformPage() {
  // Service, Organization, FAQPage and BreadcrumbList were already on this
  // page and are kept. The Offer and OfferCatalog nodes are deliberately
  // gone: /pricing is the single machine-readable source for what TendorAI
  // sells and what it costs.
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Visibility Growth Programme',
    serviceType: 'AI visibility measurement and implementation',
    description: DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'UK solicitors regulated by the SRA',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TendorAI',
    legalName: 'TendorAI Ltd',
    url: 'https://www.tendorai.com',
    logo: 'https://www.tendorai.com/logo.png',
    description:
      'TendorAI measures whether AI assistants name UK solicitors, works on what those systems can read and verify about a firm, and measures again using the same method.',
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    founder: { '@type': 'Person', name: 'Scott Davies' },
    sameAs: [
      'https://www.linkedin.com/company/tendorai',
      'https://x.com/AiTendor95471',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'AI Visibility for UK Solicitors', item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
              AI Visibility for UK Solicitors
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4">
              When someone asks ChatGPT for a solicitor in your town, does it name your firm?
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              In three months you’ll know exactly where you stand, what AI assistants can find about
              your firm, what we’ve changed, and whether your visibility moved.
            </p>
            <p className="text-base font-semibold text-white mb-8">
              &pound;999 per month &middot; 3-month initial programme &middot; no VAT
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-purple-50 transition-colors"
              >
                Book a 15-minute call
              </Link>
              <Link
                href="/ai-visibility-report"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Get your free report first
              </Link>
            </div>
          </div>
        </section>

        {/* The measurement */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">
              Most solicitors are never named. We measured it.
            </h2>
            <div className="space-y-4 text-[var(--text2)] leading-relaxed">
              <p>
                In August 2026{' '}
                <Link href={AUGUST_REPORT} className="text-[var(--purple-start)] underline hover:text-[var(--purple-end)]">
                  we measured 1,214 SRA-regulated firms
                </Link>{' '}
                across 17 UK cities. Across 40 eligible AI answers each, 1,003 firms &mdash; 82.6%
                &mdash; were never named once. Three firms were named in all 40.
              </p>
              <p>
                In this measurement, AI visibility behaved more like a threshold than a smooth
                ranking. A small set of firms were named repeatedly; most were not named at all.
              </p>
              <p>Most firms have never checked which side of that line they’re on.</p>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="py-16 bg-[var(--surface)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">
              What you get
            </h2>
            <div className="space-y-8">
              {whatYouGet.map((b) => (
                <div key={b.title} className="bg-white rounded-xl border border-[var(--border)] p-6">
                  <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-3">{b.title}</h3>
                  <div className="text-[var(--text2)] leading-relaxed">{b.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What arrives */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">
              What arrives, and when
            </h2>
            <div className="space-y-4 text-[var(--text2)] leading-relaxed">
              <p>
                Three pieces of content a week, written against what the measurement showed was
                missing. Every piece is checked for fabricated facts before it reaches you &mdash; no
                invented statistics, no claims about your firm we can’t verify against the SRA
                register. You review and approve before anything publishes. Nothing goes out in your
                firm’s name that a partner hasn’t seen.
              </p>
              <p>If a week’s drafts aren’t good enough to send, you don’t get filler. You get told.</p>
              <p>
                A short report every week and a fuller one every month, showing where the measurement
                stands and what changed.
              </p>
            </div>
          </div>
        </section>

        {/* How the programme runs */}
        <section className="py-16 bg-[var(--surface)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">
              How the programme runs
            </h2>
            <ol className="space-y-4">
              {programmeSteps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-4 bg-white rounded-xl border border-[var(--border)] p-5">
                  <span className="flex-shrink-0 font-serif font-bold text-[var(--purple-start)]" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[var(--text2)] leading-relaxed">
                    <strong className="text-[var(--text)]">{s.title}</strong> &mdash; {s.body}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[var(--text2)] leading-relaxed">
              The prompts don’t quietly change to make the results look better.
            </p>
          </div>
        </section>

        {/* Control group */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">
              We measure the result. We don’t manufacture a promise about it.
            </h2>
            <div className="space-y-4 text-[var(--text2)] leading-relaxed">
              <p>
                We don’t pretend we already know the formula for getting a solicitor recommended by
                AI. Our own research shows why.
              </p>
              <p>
                In our August 2026 study we ran a control group. Firms we deliberately left unchanged
                saw their mention rate rise from 3.59% to 4.19% over five weeks, on Perplexity.
                Visibility can move without the firm doing anything.
              </p>
              <p>
                So we don’t judge the programme by whether a number happened to rise between two
                dates. We record what changed, measure the same questions again, and give you the
                evidence.
              </p>
            </div>
          </div>
        </section>

        {/* How to check our work */}
        <section className="py-16 bg-[var(--surface)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">
              How to check our work
            </h2>
            <div className="space-y-4 text-[var(--text2)] leading-relaxed">
              <p>
                Our research is public. The{' '}
                <a
                  href="/research/solicitors-july-2026/prompts.csv"
                  className="text-[var(--purple-start)] underline hover:text-[var(--purple-end)]"
                >
                  full 68-prompt panel
                </a>
                , the{' '}
                <a
                  href="/research/solicitors-july-2026/panel.csv"
                  className="text-[var(--purple-start)] underline hover:text-[var(--purple-end)]"
                >
                  city and firm-count panel
                </a>
                , the{' '}
                <Link
                  href="/research/solicitors-august-2026/deviations"
                  className="text-[var(--purple-start)] underline hover:text-[var(--purple-end)]"
                >
                  deviations log including corrections to our own errors
                </Link>
                ,{' '}
                <Link
                  href={AUGUST_REPORT}
                  className="text-[var(--purple-start)] underline hover:text-[var(--purple-end)]"
                >
                  our reports in full and ungated
                </Link>
                , and the methodology behind the measurements.
              </p>
              <p>
                We also publish results that don’t help us sell. Our August report includes a test of
                one of our own products that did not support the mechanism we had hypothesised. We
                published it anyway.
              </p>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">
              Who it’s for
            </h2>
            <div className="space-y-4 text-[var(--text2)] leading-relaxed">
              <p>UK solicitors regulated by the SRA. That’s it.</p>
              <p>
                We’re focused on solicitors because that’s where our research, measurement panel and
                regulatory data are strongest. We’re not currently taking on accountants, mortgage
                advisers or estate agents. We’d rather do one profession properly than claim we
                understand every profession.
              </p>
            </div>
          </div>
        </section>

        {/* Free report */}
        <section className="py-16 bg-[var(--surface)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-6">
              Start with the free report
            </h2>
            <div className="space-y-4 text-[var(--text2)] leading-relaxed mb-8">
              <p>
                You don’t have to buy anything to find out where you stand. Our free AI visibility
                report checks whether AI assistants currently name your firm and what they can find
                about you. Free permanently, no payment details.
              </p>
              <p>
                If it shows a problem, you’ll have something concrete to discuss. If it doesn’t, you
                haven’t spent anything finding out.
              </p>
            </div>
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get your free report
            </Link>
          </div>
        </section>

        {/* Questions */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text)] mb-8">
              Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group border border-[var(--border)] rounded-lg overflow-hidden bg-white">
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text)] flex items-center justify-between gap-4">
                    <span>{f.q}</span>
                    <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 py-4 border-t border-[var(--border)] text-[var(--text2)] leading-relaxed">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-16 bg-[var(--surface)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-lg text-[var(--text)] mb-8">
              Ready to find out where your firm stands? Start with the free report &mdash; or book a
              call if you already know you want the full programme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ai-visibility-report"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get your free report
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
              >
                Book a 15-minute call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
