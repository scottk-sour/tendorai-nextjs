import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "For Firms — AI is Recommending Your Competitors. We Fix That.",
  description: "200M people now ask ChatGPT instead of Google. Get your business recommended by AI platforms. Free profile, Pro plan at £299/month. No agency required.",
  alternates: { canonical: 'https://www.tendorai.com/for-vendors' },
  openGraph: {
    title: 'For Firms — AI is Recommending Your Competitors. We Fix That.',
    description: '200M people now ask ChatGPT instead of Google. Get your business recommended by AI platforms. Free profile, Pro plan at £299/month. No agency required.',
    url: 'https://www.tendorai.com/for-vendors',
    type: 'website',
    siteName: 'TendorAI',
    images: [{ url: '/logo.png', width: 873, height: 873 }],
  },
  twitter: {
    card: 'summary',
    title: 'For Firms — AI is Recommending Your Competitors. We Fix That.',
    description: '200M people now ask ChatGPT instead of Google. Get your business recommended by AI platforms. Free profile, Pro plan at £299/month.',
  },
};

const faqs = [
  {
    q: 'Is there a free option?',
    a: 'Yes. Every business gets a free profile built from SRA, ICAEW, or FCA register data. It is already live. Claim it to control what AI says about your firm. The free profile includes your company name, location, services, and regulatory details — visible to AI crawlers immediately. Upgrade to Pro when you want schema installed on your website, AI blog content, and weekly visibility tracking.',
  },
  {
    q: 'How does TendorAI get my firm recommended by AI?',
    a: 'TendorAI installs structured schema markup on your website that tells ChatGPT, Claude, Perplexity, Gemini, Grok, and Google AI Overviews exactly what your firm does, where you are, and what credentials you hold. AI platforms use this structured data to decide which firms to recommend. Without it, AI has to guess from unstructured page content — and usually recommends a competitor who has made it easier.',
  },
  {
    q: 'What is AI visibility and why does it matter?',
    a: 'AI visibility means your firm appears when someone asks ChatGPT, Perplexity, or Claude to recommend a solicitor, accountant, or mortgage adviser. Over 200 million people now use AI assistants instead of Google. AI does not return a list of ten links — it recommends one to three firms by name. If your firm is not in the response, you are not losing a ranking. You are losing the recommendation entirely.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Month-to-month billing, no contracts, no lock-in. Cancel from your dashboard at any time. You keep access until the end of your billing period. If you cancel, you can export your schema file and self-host it — your data stays yours.',
  },
  {
    q: 'How is TendorAI different from SEO agencies?',
    a: 'SEO agencies optimise your website for Google search rankings. TendorAI optimises your structured data for AI recommendation engines — ChatGPT, Claude, Perplexity, Gemini, Grok, and Google AI Overviews. We install schema markup on your website, write AI-optimised blog content, generate LinkedIn and Facebook posts, and scan six AI platforms weekly. Agencies charge £1,500 to £8,000 per month for manual work. TendorAI is £299 per month and everything is automatic.',
  },
  {
    q: 'How long before I see results?',
    a: 'Schema is installed on your website within 48 hours of signing up. Perplexity crawls the web in real time, so changes can appear within days. ChatGPT and Claude update periodically — most firms see changes within 4 to 8 weeks. Your weekly AI visibility scans will show you exactly when AI platforms start citing your firm.',
  },
];

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TendorAI Pro',
  description: 'AI visibility platform for UK professional services firms. Schema markup installation, AI blog writer, social publishing, weekly AI visibility scans across ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews.',
  brand: { '@type': 'Organization', name: 'TendorAI' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'GBP',
      description: 'Free profile built from regulatory register data. Listed in TendorAI directory, visible to AI crawlers.',
      url: 'https://www.tendorai.com/vendor-signup?plan=free',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '299',
      priceCurrency: 'GBP',
      billingDuration: 'P1M',
      description: 'Schema markup installed on your website, AI blog writer, LinkedIn and Facebook copy, weekly AI visibility scans, email alerts, competitor comparison.',
      url: 'https://www.tendorai.com/vendor-signup?plan=pro',
    },
  ],
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

export default function ForVendorsPage() {

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium">12,000+ businesses already listed</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            You control what AI says<br />
            about your firm.
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-6">
            Most firms are invisible to AI not because they&apos;re unknown &mdash; but because
            AI can&apos;t verify them. TendorAI fixes that.
          </p>
          <p className="text-base text-white/70 max-w-3xl mx-auto mb-4">
            TendorAI creates a verified entity record for your firm &mdash; structured,
            data-linked, and embedded directly onto your website. When ChatGPT,
            Perplexity or Claude looks for a firm to recommend, they find a closed
            trust loop: your website, your TendorAI profile, your regulatory or business
            data, all cross-referenced and machine-readable.
          </p>
          <p className="text-base text-white/70 max-w-3xl mx-auto mb-10">
            Every update you make to your TendorAI profile automatically restructures your
            schema. Pro plan pushes it live onto your website. No code. No agency. No waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-visibility-report"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-[var(--purple-start)] hover:bg-purple-50 transition-all shadow-lg text-lg"
            >
              Check Your AI Visibility &mdash; Free
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg"
            >
              See Pricing
            </a>
          </div>
          <div className="mt-4 text-center">
            <Link href="/ai-visibility-platform" className="text-sm text-white/60 hover:text-white underline underline-offset-2 transition-colors">
              What is an AI visibility platform? &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <span className="text-2xl font-bold text-white">12,000+</span>
              <span className="text-gray-400 text-sm ml-2">Businesses listed</span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div>
              <span className="text-2xl font-bold text-white">6</span>
              <span className="text-gray-400 text-sm ml-2">AI platforms tracked</span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div>
              <span className="text-gray-400 text-sm">Self-serve. No agency.</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              How It Works
            </h2>
            <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
              The five-stage loop TendorAI runs on every Pro account
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {[
              { step: '1', title: 'Measure', description: 'Reconnaissance Agent scans six AI platforms daily and scores your visibility.' },
              { step: '2', title: 'Diagnose', description: "Detective Agent identifies why you're missed, per platform, per prompt." },
              { step: '3', title: 'Fix', description: 'Writer Agent drafts content; engineering updates schema. Held in your approval queue.' },
              { step: '4', title: 'Deploy', description: 'Approved fixes go live automatically — to your profile and your website.' },
              { step: '5', title: 'Track', description: 'Reporter Agent aggregates the week into a single dashboard — the Weekly Pro Report.' },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-[var(--purple-start)] font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg
            className="w-8 h-8 text-purple-600 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
            Your TendorAI profile starts with verified data &mdash; regulatory numbers, practice areas,
            office locations, and contact details for regulated firms, or Companies House data for B2B
            suppliers. You&apos;re not starting from scratch. Claim your profile, add your pricing and
            services, and AI starts recommending you.
          </p>
        </div>
      </section>

      {/* Pricing — canonical lives at /pricing. The full inline block
          that used to sit here has been removed; do not duplicate
          pricing data. The section id="pricing" anchor is preserved so
          historical /for-vendors#pricing inbound links still land in
          the right position on this page. */}
      <section id="pricing" className="py-24 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            Pricing
          </h2>
          <p className="text-[var(--text2)] text-lg mb-8">
            The AI Visibility Growth Programme is <strong>&pound;999 per month</strong>, on an
            initial three-month term, currently for solicitors only. TendorAI is not currently
            VAT-registered, so no VAT is added. The AI visibility report is permanently free.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Full pricing details &rarr;
          </Link>
        </div>
      </section>


      {/* What happens when you upgrade to Pro */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What happens when you upgrade to Pro?
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--border)] p-8 sm:p-10 mb-12">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We log into your website and install a small piece of code that tells AI everything about your business &mdash; your services, your location, your reviews, your accreditations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                When ChatGPT or Google Gemini visits your website, instead of trying to guess what you do from your homepage copy, it reads this data and instantly knows:
              </p>
              <ul className="space-y-2 mb-6">
                {['Who you are', 'What you do', 'Where you\u2019re based', 'That you\u2019re verified on TendorAI'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>The clever bit:</strong> your website points to TendorAI, and TendorAI points to your website. AI sees both sources agreeing and trusts you more. That&apos;s what gets you recommended.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                It syncs automatically. When you update your TendorAI profile &mdash; new services, new reviews, new address &mdash; your website updates too. You never touch your site again.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>And if you cancel?</strong> The code stops working. Your AI visibility goes back to wherever it was before.
              </p>
            </div>
          </div>

          {/* 3-step visual */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'You give us your website login', desc: 'Just your CMS login. Your credentials are encrypted and only accessible to the TendorAI team.' },
              { step: '2', title: 'We install AI-optimised data', desc: 'Within 48 hours, our team installs the code on your website. You don\u2019t touch anything.' },
              { step: '3', title: 'AI recommends you by name', desc: 'When someone asks AI for a supplier like you, it reads your data and recommends your business.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--border)] pb-6 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Run Your Free AI Visibility Report
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            See exactly what ChatGPT, Claude, and Perplexity say about your business. Takes 30 seconds.
          </p>
          <Link
            href="/ai-visibility-report"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Check Your AI Visibility — Free
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
