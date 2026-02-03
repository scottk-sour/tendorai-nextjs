import Link from 'next/link';
import HeroSearch from './HeroSearch';

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
          Free Comparison Service
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          Compare Office Equipment Quotes from{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Local Suppliers in Wales & South West England
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          TendorAI is a free supplier directory for UK businesses. Browse 70+ office equipment suppliers
          across South Wales, Bristol, and the South West. Find local providers for photocopiers,
          business telecoms, CCTV systems, and IT equipment.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-4 md:gap-8 mb-10 flex-wrap">
          <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-xl border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">70+</div>
            <div className="text-sm text-white/90 font-medium">Local Suppliers</div>
          </div>
          <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-xl border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">4</div>
            <div className="text-sm text-white/90 font-medium">Categories</div>
          </div>
          <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-xl border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">Free</div>
            <div className="text-sm text-white/90 font-medium">To Use</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <HeroSearch />
        </div>

        {/* Secondary Actions */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <Link
            href="/suppliers"
            className="px-6 py-3 bg-white/15 backdrop-blur text-white font-medium rounded-lg border border-white/40 hover:bg-white/25 transition-all"
          >
            Browse All Suppliers
          </Link>
          <Link
            href="/how-it-works"
            className="px-6 py-3 bg-transparent text-white font-medium rounded-lg border-2 border-white/50 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            How It Works
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Coverage Note */}
        <p className="text-sm text-white/80">
          Covering: Cardiff, Bristol, Swansea, Newport, Bath, Gloucester, Cheltenham, Exeter & more
        </p>
      </div>
    </section>
  );
}
