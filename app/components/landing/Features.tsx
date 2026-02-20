import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Check Your AI Visibility',
    description:
      'Run a free AEO report to see what ChatGPT, Claude, and Perplexity say about your business. Get your AI visibility score in 60 seconds.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Claim Your Profile',
    description:
      'Add your services, fees, accreditations, and specialisms. The structured data AI platforms need to recommend you ahead of competitors.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Recommended by AI',
    description:
      'When someone asks ChatGPT for a solicitor in Bristol or an accountant in Manchester, AI recommends you by name. No bidding. No shared leads.',
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
          <p>Three steps from invisible to AI-recommended</p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-[var(--border)] rounded-2xl overflow-hidden bg-white">
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

        <div className="text-center mt-8">
          <Link href="/aeo-report" className="btn-primary">
            Check Your Score &mdash; Free
          </Link>
        </div>
      </div>
    </section>
  );
}
