import Link from 'next/link';
import Image from 'next/image';

const stats = [
  {
    number: '#1',
    label: 'Industry ranking in AI recommendations',
    subtext: 'Ahead of Peec AI, OtterlyAI, and Rankscale',
  },
  {
    number: '41%',
    label: 'Share of voice in AI responses',
    subtext: '4x more mentions than our nearest competitor',
  },
  {
    number: '4.8',
    label: 'Average citations per AI response',
    subtext: 'Third highest cited domain globally in our category',
  },
];

const screenshots = [
  {
    src: '/images/proof-visibility-ranking.jpg',
    alt: 'TendorAI #1 in AI visibility industry ranking',
    caption: 'Industry ranking — TendorAI #1 with 46 mentions',
  },
  {
    src: '/images/proof-share-of-voice.jpg',
    alt: 'TendorAI 41% share of voice in AI responses',
    caption: 'Share of voice — 41.4% vs all competitors',
  },
  {
    src: '/images/proof-source-domains.jpg',
    alt: 'TendorAI appearing in 48.8% of AI responses',
    caption: 'Source domains — tendorai.com cited in 48.8% of responses',
  },
];

export default function ProofSection() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            TendorAI went from zero to #1 in 37&nbsp;days.
            <br className="hidden sm:block" />
            <span className="text-[var(--purple-start)]">
              Using exactly the same method we use for your firm.
            </span>
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            These are our own live AI visibility stats — not a client case study.
            We proved the method works on ourselves first.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#1B4F72] mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">{stat.subtext}</div>
            </div>
          ))}
        </div>

        {/* Screenshot gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {screenshots.map((shot) => (
            <div
              key={shot.src}
              className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <p className="text-xs text-gray-500 p-3 bg-gray-50">
                {shot.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-2">
          Screenshot taken 19 March 2026 from our live AI visibility tracking
          dashboard. Data covers the previous 7 days.
        </p>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-lg font-semibold text-gray-900 mb-4">
            This is what TendorAI Pro does for your firm.
          </p>
          <Link
            href="/aeo-report"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-[#1B4F72] text-white hover:bg-[#163d5a] transition-all shadow-lg text-lg"
          >
            Run Your Free AI Visibility Report
          </Link>
        </div>
      </div>
    </section>
  );
}
