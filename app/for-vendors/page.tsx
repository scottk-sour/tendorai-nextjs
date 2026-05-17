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
              href="/aeo-report"
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
              { step: '4', title: 'Deploy', description: 'Approved fixes go live automatically — to your profile, your website, and directories.' },
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

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[var(--text2)] text-lg max-w-2xl mx-auto">
              Start free. Upgrade when AI should recommend you first.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-start">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 border border-[var(--border)]">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">£0</span>
                  <span className="text-gray-500">/forever</span>
                </div>
                <p className="text-sm text-gray-500">Claim your profile. Get listed in the TendorAI directory and visible to AI crawlers with your basic business details.</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['Basic company profile', 'Listed in directory', 'Public register data', 'No pricing visible to AI'].map((f, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/vendor-signup?plan=free" className="block w-full text-center py-3.5 px-6 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-[var(--surface)] transition-all">
                Claim Your Free Profile
              </Link>
            </div>

            {/* Pro — MOST POPULAR */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl blur-lg opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-b from-amber-50 via-white to-orange-50 rounded-2xl p-8 border-2 border-amber-400 shadow-2xl transform md:-translate-y-6">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                  <div className="mb-1">
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">£299</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-xs text-gray-400 italic">Early-adopter pricing &mdash; first 50 customers lock in &pound;299/month.</p>
                </div>
                <p className="text-sm text-gray-500 text-center mb-6">Everything you need to go from invisible to recommended by AI &mdash; schema installation, content creation, social publishing, weekly tracking, and a 90-day promise. Agencies charge &pound;1,500&ndash;&pound;3,900/month for this manually. You pay &pound;299.</p>

                {/* Schema & Website */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Schema &amp; Website</p>
                <ul className="space-y-2.5 mb-5">
                  {[
                    'AI-optimised schema markup installed on your website within 48 hours',
                    'Auto-sync \u2014 every dashboard update updates your website schema automatically',
                    'Fees, accreditations, and practice areas visible to AI',
                    'Export your schema any time \u2014 your data stays with you if you ever leave',
                    'Done-for-you installation \u2014 just send us your website login',
                  ].map((f, i) => (
                    <li key={`schema-${i}`} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* AI Blog Writer */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">AI Blog Writer</p>
                <ul className="space-y-2.5 mb-5">
                  {[
                    'Write two AI-optimised blog posts per week automatically',
                    'Enter a topic, Claude writes it in TendorAI format \u2014 the structure AI loves to cite',
                    'One click publishes to your TendorAI profile',
                    'LinkedIn and Facebook copy — post in one click from your dashboard',
                    'Blog content published to your TendorAI profile page and ready to share on LinkedIn and Facebook',
                  ].map((f, i) => (
                    <li key={`blog-${i}`} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Tracking & Visibility */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tracking &amp; Visibility</p>
                <ul className="space-y-2.5 mb-5">
                  {[
                    'Weekly AI visibility scans across ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews',
                    'Email alert when any AI platform recommends you — ChatGPT, Perplexity, Claude, Gemini, Grok, or Google AI Overviews',
                    'Weekly AI Visibility Score with trend tracking',
                    'Competitor comparison \u2014 see who AI recommends instead',
                    'Profile gaps report \u2014 exact fields missing and why they matter',
                  ].map((f, i) => (
                    <li key={`tracking-${i}`} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Directory & Profile */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Directory &amp; Profile</p>
                <ul className="space-y-2.5 mb-5">
                  {[
                    'Ranked above free profiles in TendorAI directory',
                    'TendorAI Verified badge on your profile',
                    'Pre-built profile from SRA, ICAEW, or FCA register data',
                    'Unlimited products and services listed',
                    'Team members with individual specialisms',
                  ].map((f, i) => (
                    <li key={`directory-${i}`} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Reports & Support */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Reports &amp; Support</p>
                <ul className="space-y-2.5 mb-5">
                  {[
                    'Weekly AI Visibility Report emailed every Monday',
                    '10-point Website AI Audit with fix guides',
                    'Google Business Profile optimisation checklist',
                    'Priority support',
                    "90-day promise \u2014 score reviewed and refunded if it isn't moving",
                  ].map((f, i) => (
                    <li key={`reports-${i}`} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-gray-500">If you cancel, the AI visibility code stops working</span>
                  </div>
                </div>
                <Link href="/vendor-signup?plan=pro" className="block w-full text-center py-3.5 px-6 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  Start Pro
                </Link>
              </div>
            </div>

          </div>

          {/* Comparison Table: TendorAI vs Agencies */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">How we compare to GEO agencies</h3>
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--surface)]">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600"></th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">GEO Agencies</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-[var(--purple-start)]">TendorAI Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Monthly cost', '£1,500 — £8,000', '£299/month'],
                    ['Contract', '12 months minimum', 'Month-to-month, cancel anytime'],
                    ['Time to go live', '3–6 months', 'Installed within 48 hours'],
                    ['You need to do', 'Attend meetings, approve content, provide assets', 'Just give us your website login'],
                    ['What gets installed', 'Manual audit, maybe some schema', 'AI-optimised data that syncs with your profile'],
                    ['AI platforms covered', 'Usually 1–2', 'ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews'],
                    ['If you cancel', 'You keep whatever they built', 'Download your schema file and self-host it — your data stays yours forever'],
                    ['Content & reputation', 'Manual, £800–£2,000/month extra', 'AI blog writer, social publishing, review collection — included'],
                    ['Ongoing updates', 'You pay for every change', 'Automatic — update TendorAI, your website updates too'],
                  ].map(([label, agency, tendorai], i) => (
                    <tr key={i}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{label}</td>
                      <td className="py-4 px-6 text-sm text-gray-500 text-center">{agency}</td>
                      <td className="py-4 px-6 text-sm text-[var(--purple-start)] font-semibold text-center">{tendorai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              Agency pricing based on UK market averages for AI Visibility (AEO) services, 2024–2025.
            </p>
          </div>

          {/* What to Expect */}
          <div className="mt-12 max-w-3xl mx-auto bg-purple-50/60 border border-purple-100 rounded-xl px-6 py-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">What to Expect</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              TendorAI structures your data so AI recommends you to potential clients. Can you get leads
              and enquiries from this? Absolutely. But this isn&apos;t pay-per-lead &mdash; it&apos;s building your AI
              presence for the long term. Think of it like SEO in 2005. The businesses that invested
              early dominated for years. AI search is that same moment, right now.
            </p>
          </div>
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
            href="/aeo-report"
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
