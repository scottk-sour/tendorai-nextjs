import Link from 'next/link';

const coverageAreas = {
  wales: ['Cardiff', 'Newport', 'Swansea', 'Bridgend', 'Caerphilly', 'Pontypridd'],
  southwest: ['Bristol', 'Bath', 'Gloucester', 'Cheltenham', 'Exeter', 'Plymouth', 'Taunton', 'Swindon'],
};

export default function CoverageAreas() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
            Suppliers Across Wales & South West England
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our directory includes office equipment suppliers serving these areas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Wales Coverage */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">South Wales</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {coverageAreas.wales.join(' • ')}
            </p>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">Photocopiers, Telecoms, CCTV, IT</div>
                <div className="text-sm text-gray-600">Multiple suppliers per area</div>
              </div>
            </div>
          </div>

          {/* South West Coverage */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">South West England</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {coverageAreas.southwest.join(' • ')}
            </p>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">All equipment categories</div>
                <div className="text-sm text-gray-600">Regional and national suppliers</div>
              </div>
            </div>
          </div>

          {/* Supplier CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Are You a Supplier?</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Join 70+ office equipment suppliers already listed on TendorAI. Get your business in front of companies looking for quotes in your area.
            </p>
            <Link
              href="/for-vendors"
              className="inline-flex items-center gap-2 text-purple-700 font-semibold border-2 border-purple-600 px-5 py-2.5 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
            >
              List Your Business
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
