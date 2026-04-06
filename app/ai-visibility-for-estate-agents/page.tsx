import { Metadata } from 'next';
import Link from 'next/link';

const TITLE = 'AI Visibility for Estate Agents';
const DESCRIPTION = 'TendorAI helps UK estate agents get recommended by ChatGPT, Perplexity and Google AI Overviews. Structured data, directory verification and AI tracking — built for UK property firms.';
const CANONICAL = 'https://www.tendorai.com/ai-visibility-for-estate-agents';

export const metadata: Metadata = {
  title: `${TITLE} | TendorAI`,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: 'website', siteName: 'TendorAI', images: [{ url: '/logo.png', width: 873, height: 873 }] },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

const faqs = [
  { q: 'Do estate agents need to be regulated to use TendorAI?', a: 'No. TendorAI works for all UK estate agents regardless of professional membership. You do not need to be NAEA or ARLA registered — though if you are, we include that in your profile as an additional trust signal.' },
  { q: 'How quickly will I appear in ChatGPT recommendations after signing up?', a: 'Schema changes typically take 4 to 8 weeks to surface in AI model outputs. Perplexity is faster. Most agencies see measurable improvement within 60 days of completing their profile and having schema installed.' },
  { q: 'What information do I need to get started?', a: 'Your agency name, address, phone, website URL, the areas you cover, and your main services. The whole setup takes under 10 minutes.' },
  { q: 'Can TendorAI help me compete with national estate agency brands?', a: 'Yes. National brands have AI visibility by default because of their scale and existing online presence. TendorAI gives independent and regional agencies the same structured data signals — levelling the playing field for local AI recommendations.' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'TendorAI AI Visibility for Estate Agents',
  description: DESCRIPTION,
  provider: { '@type': 'Organization', name: 'TendorAI', url: 'https://www.tendorai.com' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  serviceType: 'AI Visibility Platform',
  url: CANONICAL,
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
    { '@type': 'ListItem', position: 2, name: TITLE, item: CANONICAL },
  ],
};

export default function AIVisibilityEstateAgentsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <nav className="text-sm mb-6 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Estate Agents</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{TITLE}</h1>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-6">
              <strong className="text-white">Buyers and vendors are already using ChatGPT and Perplexity to find estate agents</strong> &mdash; and most UK agencies are not appearing.
            </p>
            <p className="text-purple-200 max-w-2xl mx-auto">
              TendorAI builds a machine-readable profile for your agency and installs structured data on your website so AI tools can verify, understand and recommend you. No technical knowledge required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/for-vendors" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg text-lg">
                Claim your free profile
              </Link>
              <Link href="/ai-visibility-platform" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                See how it works
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Why invisible */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Why estate agents are invisible to AI tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">No schema markup</h3>
                <p className="text-sm text-gray-600">Most agency websites have no structured data. AI crawlers including GPTBot and ClaudeBot cannot extract your services, coverage areas or contact details in machine-readable format.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Inconsistent directory data</h3>
                <p className="text-sm text-gray-600">Mismatches between your website, Google Business Profile, Rightmove and Zoopla listings reduce AI confidence in your agency identity.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Generic content</h3>
                <p className="text-sm text-gray-600">AI models match specific queries to specific answers. &ldquo;Sales and lettings across the region&rdquo; does not match &ldquo;estate agent specialising in period properties in Cardiff.&rdquo;</p>
              </div>
            </div>
          </section>

          {/* What TendorAI does */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What TendorAI does for estate agents</h2>
            <div className="space-y-6">
              {[
                { num: '1', title: 'Builds your AI visibility profile', desc: 'We create a structured, machine-readable profile for your agency covering your name, address, coverage areas, services and specialisms.' },
                { num: '2', title: 'Installs schema on your website', desc: 'RealEstateAgent JSON-LD installed on your site within 48 hours. No developer required.' },
                { num: '3', title: "Lists you in TendorAI's estate agent directory", desc: 'Crawled by AI models and cross-referenced when generating property recommendations.' },
                { num: '4', title: 'Tracks your AI visibility weekly', desc: 'See whether you appear in ChatGPT, Perplexity and Google AI Overviews responses, and how you compare to agencies in your area.' },
              ].map(item => (
                <div key={item.num} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0">{item.num}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Who it's for */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Who TendorAI is for</h2>
            <p className="text-gray-600 leading-relaxed">
              TendorAI is built for independent and regional estate agencies across the UK. If you are a sole trader agent, a small independent, or a regional firm competing against national brands, AI visibility is your fastest route to appearing in front of buyers and vendors who are already using AI tools to find agents.
            </p>
          </section>

          {/* Pricing */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Pricing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Free</h3>
                <p className="text-gray-600 mb-4">Claim your profile, get listed in the TendorAI directory, basic visibility data.</p>
                <Link href="/vendor-signup?plan=free" className="text-purple-600 font-medium hover:underline">Claim your free profile &rarr;</Link>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="font-bold text-gray-900 text-lg mb-1">Pro &mdash; &pound;299/month</h3>
                <p className="text-gray-600 mb-4">Full AI visibility profile, schema installation within 48 hours, weekly tracking across six AI platforms, competitor benchmarking, monthly visibility report.</p>
                <Link href="/for-vendors#pricing" className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all text-sm">Start Pro</Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-200 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer p-5 text-left">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
                    <svg className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section className="mb-16 text-sm text-gray-400">
            <p className="font-medium text-gray-500 mb-2">Sources</p>
            <ul className="space-y-1">
              <li>Schema.org RealEstateAgent: schema.org/RealEstateAgent</li>
              <li>Google Business Profile for Estate Agents: business.google.com</li>
              <li><Link href="/ai-visibility-platform" className="text-purple-500 hover:underline">TendorAI How It Works</Link></li>
            </ul>
          </section>

          {/* Related */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/blog/how-to-get-estate-agency-recommended-by-chatgpt" className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600">How to Get Your Estate Agency Recommended by ChatGPT</h3>
                <p className="text-sm text-gray-500 mt-1">Step-by-step guide for UK estate agents.</p>
              </Link>
              <Link href="/for-vendors" className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-medium text-gray-900 group-hover:text-purple-600">For Firms &mdash; Plans &amp; Pricing</h3>
                <p className="text-sm text-gray-500 mt-1">See TendorAI Free and Pro plans.</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
