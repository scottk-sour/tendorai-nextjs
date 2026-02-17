import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-brand-gradient">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-gradient opacity-70 z-10" />
        {/* Decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 py-20">
        {/* Badge */}
        <div className="inline-block bg-white/15 backdrop-blur border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
          Join 11,000+ UK Businesses Already Listed
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          The UK&apos;s{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            AI Visibility Platform
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
          Get your business recommended by ChatGPT, Perplexity, and Claude.
          Join 11,000+ UK businesses already listed.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <Link
            href="/aeo-report"
            className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-lg text-lg"
          >
            Check Your AI Visibility — Free
          </Link>
          <Link
            href="/vendor-signup"
            className="px-8 py-4 bg-white/15 backdrop-blur text-white font-semibold rounded-lg border border-white/40 hover:bg-white/25 transition-all text-lg"
          >
            Claim Your Profile
          </Link>
        </div>

        {/* Trust note */}
        <p className="text-sm text-white/70">
          No login required. No credit card. 30-second results.
        </p>
      </div>
    </section>
  );
}
