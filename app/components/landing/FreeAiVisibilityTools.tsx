import Link from 'next/link';

interface Tool {
  name: string;
  description: string;
  href: string;
  cta: string;
}

const tools: Tool[] = [
  {
    name: 'AI Visibility Report',
    description:
      'See exactly how ChatGPT, Perplexity, Claude, Gemini, Grok, and Google AI Overviews respond when asked about your firm. 60-second diagnostic, 0–100 score.',
    href: '/ai-visibility-report',
    cta: 'Run Free Report',
  },
  {
    name: 'Schema Checker',
    description:
      'Paste any URL. See exactly which Schema.org types AI assistants can read on your site — and which are missing.',
    href: '/tools/schema-checker',
    cta: 'Check Schema',
  },
  {
    name: 'AI Crawler Checker',
    description:
      'See whether GPTBot, ClaudeBot, PerplexityBot, and the other AI crawlers are allowed to crawl your site. Most UK firms block them by accident.',
    href: '/tools/robots-checker',
    cta: 'Check Crawlers',
  },
  {
    name: 'AI Visibility Checklist',
    description:
      'The 30-point AI visibility checklist used by every TendorAI customer. Free PDF.',
    href: '/tools/ai-visibility-checklist',
    cta: 'Download Checklist',
  },
  {
    name: 'Accountancy AI Checklist',
    description:
      'ICAEW-specific AI visibility checklist for UK accounting firms. Free PDF.',
    href: '/tools/ai-visibility-checklist-accountants',
    cta: 'Download Checklist',
  },
];

export default function FreeAiVisibilityTools() {
  return (
    <section
      aria-label="free AI visibility tools"
      className="py-20 md:py-24 bg-[var(--surface)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>Free AI Visibility Tools</h2>
          <p>
            Five free tools to check your firm&apos;s AI readiness. No signup
            required to run a check.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex h-full flex-col bg-white rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 text-left"
            >
              <span className="text-xs font-semibold tracking-wider uppercase text-purple-600 mb-2">
                Free tool
              </span>
              <h3 className="font-serif text-lg lg:text-xl font-bold text-[var(--text)] mb-3 leading-tight">
                {tool.name}
              </h3>
              <p className="text-sm text-[var(--text2)] leading-relaxed flex-1 mb-4">
                {tool.description}
              </p>
              <span className="text-sm font-semibold text-purple-600 group-hover:underline">
                {tool.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
