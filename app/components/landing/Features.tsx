import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Check Your AI Visibility',
    description:
      'Your firm may already be in our system \u2014 we pull from SRA, ICAEW, FCA registers and public business data. Run a free AI Visibility report to see what ChatGPT, Claude, and Perplexity currently say about your business. Takes 60 seconds.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Claim and Complete Your Profile',
    description:
      'Add your fees, specialisms, accreditations, and services through a simple dashboard. This is the structured data AI needs to recommend you by name \u2014 not just mention you generically.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'We Install AI Data on Your Website',
    description:
      'Pro only \u2014 we log into your website and install schema markup using your dashboard data. You give us the login. We handle everything. No developer needed. Live within 48 hours.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'One Update. Everywhere in Sync.',
    description:
      'Every time you update your dashboard, your TendorAI directory profile and your website schema update simultaneously. AI platforms crawl both. You do nothing technical. Ever.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section aria-label="how it works" className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>How TendorAI Works</h2>
          <p>Four steps from invisible to AI-recommended</p>
        </div>

        <div className="grid md:grid-cols-4 gap-0 border border-[var(--border)] rounded-2xl overflow-hidden bg-white">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`p-7 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-[var(--border)]' : ''}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="gradient-text">{step.icon}</div>
                <div className="gradient-text text-4xl font-bold opacity-35 leading-none">{step.number}</div>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--text2)] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div className="mt-16">
          <div className="section-header">
            <h2>Everything You Get</h2>
            <p>Schema is just the start. TendorAI handles content, social, tracking, and auditing &mdash; automatically.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Blog Writer',
                text: 'Publish two AI-optimised blog posts a week automatically. Enter a topic, Claude writes it in the format AI loves, publishes to your TendorAI profile, LinkedIn, Facebook, and your own website. No writer needed.',
              },
              {
                title: 'Social Publishing',
                text: 'Every blog post syncs to LinkedIn and Facebook automatically. LinkedIn is cited in 48% of AI responses \u2014 consistent publishing builds the citation signals AI uses to recommend you.',
              },
              {
                title: 'Schema Auto-Sync',
                text: 'Every dashboard update syncs to your website schema automatically. Fees change? Schema updates in minutes. New accreditation? Live the same day. No developer ever needed.',
              },
              {
                title: 'Website AI Audit',
                text: "10-point technical audit of your website. Each failing item links to a plain English fix guide. We show you exactly what\u2019s stopping AI from recommending you \u2014 and how to fix it.",
              },
              {
                title: 'AI Visibility Tracking',
                text: 'Weekly scans across ChatGPT, Perplexity, Claude, Gemini, Grok, and Meta AI. Get an email the moment any AI platform recommends you. Track your score trend week by week.',
              },
              {
                title: 'Export Your Schema',
                text: 'Download your complete JSON-LD schema as a static file any time. If you ever leave TendorAI, your structured data stays with you \u2014 self-host it and it keeps working forever.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl border border-[var(--border)] p-6 hover:border-[var(--purple-start)] hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text2)] leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/aeo-report" className="btn-primary">
            Check Your Score &mdash; Free
          </Link>
        </div>
      </div>
    </section>
  );
}
