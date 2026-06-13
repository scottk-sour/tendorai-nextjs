import Link from 'next/link';

/**
 * Free Tools section. Lives directly below Hero on the homepage.
 * Previously these cards were crammed into the Loop's container in Hero —
 * this section lifts them out and gives them a clean, scannable home.
 *
 * Layout, padding, container, fonts and card styling reuse the same
 * design tokens used by ProblemSection / SectorBenefits / Pricing so the
 * new section sits within the page rhythm without introducing anything new.
 */

interface Tool {
  href: string;
  title: string;
  detail: string;
  cta: string;
  featured?: boolean;
}

const TOOLS: Tool[] = [
  {
    href: '/aeo-report',
    title: 'AI Visibility Report',
    detail: 'See where your firm appears across six AI platforms.',
    cta: 'Get free report →',
    featured: true,
  },
  {
    href: '/tools/schema-checker',
    title: 'Schema Checker',
    detail: 'Check whether your website has AI-readable structured data.',
    cta: 'Run schema checker →',
  },
  {
    href: '/tools/robots-checker',
    title: 'AI Crawler Checker',
    detail: 'Find out whether AI assistants can access your website.',
    cta: 'Check crawler access →',
  },
  {
    href: '/tools/aeo-checklist',
    title: 'AEO Checklist',
    detail: '30-point checklist used by TendorAI Pro customers.',
    cta: 'Download checklist →',
  },
];

export default function FreeTools() {
  return (
    <section aria-label="free tools" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>Free Tools</h2>
          <p>Run any of these without signing up. No card required.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool) =>
            tool.featured ? (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex h-full flex-col text-left rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 text-white"
                style={{ background: 'var(--gradient-cta)' }}
              >
                <span className="text-xs font-semibold tracking-wider uppercase text-white/85 mb-2">
                  Free report
                </span>
                <h3 className="font-serif text-lg lg:text-xl font-bold text-white mb-2 leading-tight">
                  {tool.title}
                </h3>
                <p className="text-sm text-white/90 mb-4 flex-1 leading-relaxed">
                  {tool.detail}
                </p>
                <span className="text-sm font-bold text-white group-hover:underline">
                  {tool.cta}
                </span>
              </Link>
            ) : (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex h-full flex-col text-left bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5"
              >
                <span className="text-xs font-semibold tracking-wider uppercase text-purple-600 mb-2">
                  Free tool
                </span>
                <h3 className="font-serif text-lg lg:text-xl font-bold text-[var(--text)] mb-2 leading-tight">
                  {tool.title}
                </h3>
                <p className="text-sm text-[var(--text2)] mb-4 flex-1 leading-relaxed">
                  {tool.detail}
                </p>
                <span className="text-sm font-semibold text-purple-600 group-hover:underline">
                  {tool.cta}
                </span>
              </Link>
            ),
          )}
        </div>

        {/* Secondary links — Accountancy AI Checklist + solicitor comparison.
            Folded in as a single quiet footer line so they're not lost but
            don't compete with the four primary tools above. */}
        <p className="text-center text-sm text-[var(--text2)] mt-8">
          For accountants?{' '}
          <Link
            href="/tools/ai-visibility-checklist-accountants"
            className="font-semibold text-purple-600 hover:underline"
          >
            Accountancy AI Checklist &rarr;
          </Link>
          {' · '}
          Comparing tools?{' '}
          <Link
            href="/best-ai-visibility-tools-uk-solicitors"
            className="font-semibold text-purple-600 hover:underline"
          >
            2026 UK solicitor comparison &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
