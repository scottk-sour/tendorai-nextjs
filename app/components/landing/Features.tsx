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

        {/* The Loop \u2014 what Pro actually does */}
        <div className="mt-16">
          <div className="section-header">
            <h2>The Loop</h2>
            <p>Pro runs a continuous five-stage system on your firm. Every week. Forever.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                verb: 'Measure',
                tagline: 'Where you appear in AI',
                text: 'Every Monday we scan ChatGPT, Perplexity, Claude, Gemini, Grok, and Meta AI for the queries your clients are asking. We log where your firm shows up, where it doesn\u2019t, and what changed since last week.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                verb: 'Diagnose',
                tagline: 'Why you\u2019re being missed',
                text: 'We work out exactly why AI is passing you over: missing schema markup, vague specialism descriptions, weak third-party citations, broken NAP data. Every gap is logged and sized.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a4 4 0 008 0V7a2 2 0 00-2-2h-2M7 11v3a4 4 0 008 0v-3m-4 7v3a3 3 0 003 3h0a3 3 0 003-3v-1.5m-3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                ),
              },
              {
                verb: 'Fix',
                tagline: 'What we\u2019re sorting',
                text: 'We draft the schema, write the content, build the listings, and prepare the press releases. You see every item before it ships and approve in one click.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a4 4 0 105.656 5.656l-1.06 1.06-7.071 7.072a2 2 0 01-2.829 0l-1.414-1.414a2 2 0 010-2.829l7.071-7.071-1.06-1.06z M14.7 6.3l-3.535 3.536" />
                  </svg>
                ),
              },
              {
                verb: 'Deploy',
                tagline: 'What we put live',
                text: 'Approved fixes go live on your website, on third-party directories, on LinkedIn and Facebook, and across the citation sources AI assistants trust. You don\u2019t touch a CMS.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841" />
                  </svg>
                ),
              },
              {
                verb: 'Track',
                tagline: 'Did it work?',
                text: 'The next Monday we re-measure. Score delta, new platforms now mentioning you, what improved, what didn\u2019t. Then the loop starts again.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
            ].map((stage) => (
              <div
                key={stage.verb}
                className="bg-white rounded-xl border border-[var(--border)] p-6 hover:border-[var(--purple-start)] hover:-translate-y-1 hover:shadow-md transition-[transform,box-shadow,border-color]"
              >
                <div className="text-purple-600 mb-3">{stage.icon}</div>
                <h3 className="font-serif font-bold uppercase tracking-wide text-sm text-[var(--text)] mb-1">{stage.verb}</h3>
                <p className="text-sm text-[var(--text2)] mb-3">{stage.tagline}</p>
                <p className="text-xs text-[var(--text2)] leading-relaxed">{stage.text}</p>
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
