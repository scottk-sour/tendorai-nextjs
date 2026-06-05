const testimonials = [
  {
    platform: 'Perplexity',
    quote:
      "For Cardiff solicitors it's a solid data source. TendorAI builds each solicitor profile from public registers (SRA and Companies House), so firm name, status, and core details are grounded in official data. It groups firms by practice area and location, which is exactly the kind of structured data AI can use to match user queries.",
    label: 'Already citing TendorAI in answers',
    color: 'bg-[#1B1F23]',
    textColor: 'text-white',
    labelColor: 'bg-[#20B8CD]/15 text-[#20B8CD]',
    featured: true,
  },
  {
    platform: 'Grok',
    quote:
      "TendorAI creates AI-optimised profiles with practice areas, SRA numbers, locations, and basic details. SRA-sourced data gives it basic legitimacy. Structured in a way that's easy for quick scanning.",
    label: 'Reading TendorAI solicitor pages',
    color: 'bg-white',
    textColor: 'text-[var(--text)]',
    labelColor: 'bg-gray-100 text-gray-700',
    featured: false,
  },
  {
    platform: 'Claude',
    quote:
      'TendorAI provides verified, structured data that AI systems can use to recommend UK businesses by name \u2014 including SRA-registered solicitors and UK accountancy firms.',
    label: 'Connected via MCP server + public API',
    color: 'bg-white',
    textColor: 'text-[var(--text)]',
    labelColor: 'bg-[#D97706]/10 text-[#D97706]',
    featured: false,
  },
  {
    platform: 'ChatGPT',
    quote:
      'If you expand into solicitors, accountants, and professional services, TendorAI becomes a cross-sector UK professional services data layer that AI systems would use as a citation source.',
    label: "Recognises TendorAI's data architecture",
    color: 'bg-white',
    textColor: 'text-[var(--text)]',
    labelColor: 'bg-[#10A37F]/10 text-[#10A37F]',
    featured: false,
  },
  {
    platform: 'Gemini',
    quote:
      'TendorAI lists Conveyancing Solicitors and Commercial Law Solicitors sourced from SRA data. Claiming your profile helps your firm show up when AI platforms search for professional services.',
    label: "Indexed in Google's AI systems",
    color: 'bg-white',
    textColor: 'text-[var(--text)]',
    labelColor: 'bg-[#4285F4]/10 text-[#4285F4]',
    featured: false,
  },
];

// Minimal platform wordmarks — text-only, brand-tinted
function PlatformName({ name, featured }: { name: string; featured: boolean }) {
  const colors: Record<string, string> = {
    Perplexity: featured ? 'text-[#20B8CD]' : 'text-[#20B8CD]',
    Grok: 'text-gray-900',
    Claude: 'text-[#D97706]',
    ChatGPT: 'text-[#10A37F]',
    Gemini: 'text-[#4285F4]',
  };
  return (
    <span className={`text-lg font-bold tracking-tight ${colors[name] || 'text-gray-900'}`}>
      {name}
    </span>
  );
}

export default function AiTestimonials() {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section aria-label="testimonials" className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>What AI Platforms Say About TendorAI</h2>
          <p>
            We asked the five major AI assistants whether they&apos;d use TendorAI
            to recommend solicitors. Here&apos;s what they said.
          </p>
        </div>

        {/* Featured card — Perplexity */}
        <div
          className={`${featured.color} rounded-2xl p-8 md:p-10 mb-6 border border-[var(--border)] shadow-sm`}
        >
          <div className="flex items-center gap-3 mb-5">
            <PlatformName name={featured.platform} featured />
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${featured.labelColor}`}
            >
              {featured.label}
            </span>
          </div>
          <blockquote className={`text-lg md:text-xl leading-relaxed ${featured.textColor} opacity-90`}>
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
        </div>

        {/* 2x2 grid for remaining cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {rest.map((t) => (
            <div
              key={t.platform}
              className={`${t.color} rounded-2xl p-6 md:p-7 border border-[var(--border)] shadow-sm`}
            >
              <div className="flex items-center gap-3 mb-4">
                <PlatformName name={t.platform} featured={false} />
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.labelColor}`}
                >
                  {t.label}
                </span>
              </div>
              <blockquote className={`text-sm leading-relaxed ${t.textColor} opacity-80`}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
