import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICES, MAJOR_LOCATIONS, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'TendorAI | AI-Powered Procurement for UK Businesses',
  description:
    'TendorAI connects UK businesses with trusted office equipment suppliers. Compare 70+ verified vendors across Wales and South West England. Get instant quotes for copiers, telecoms, CCTV, IT, and security systems.',
  alternates: {
    canonical: 'https://www.tendorai.com',
  },
};

// JSON-LD for home page
const homePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TendorAI',
  url: 'https://www.tendorai.com',
  description: 'AI-powered procurement platform for UK businesses',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.tendorai.com/suppliers?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  const services = Object.values(SERVICES);
  const featuredLocations = MAJOR_LOCATIONS.slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-brand-gradient text-white py-20 lg:py-28">
          <div className="section text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Find Trusted Office Equipment Suppliers
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              TendorAI connects UK businesses with {SITE_CONFIG.stats.suppliers}+ verified suppliers
              across Wales and South West England. Compare quotes for copiers, telecoms, CCTV, IT,
              and security systems.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <Link
                href="/suppliers"
                className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl"
              >
                Browse Suppliers
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{SITE_CONFIG.stats.suppliers}+</div>
                <div className="text-purple-200 text-sm">Verified Suppliers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{SITE_CONFIG.stats.products}+</div>
                <div className="text-purple-200 text-sm">Products Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{SITE_CONFIG.stats.categories}</div>
                <div className="text-purple-200 text-sm">Service Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{SITE_CONFIG.stats.locations}+</div>
                <div className="text-purple-200 text-sm">Locations Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="section">
            <h2 className="text-3xl font-bold text-center mb-4">Our Service Categories</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Find suppliers across all major office equipment categories. Each supplier is verified
              for quality and reliability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/suppliers/${service.slug}`}
                  className="card-hover p-6 group"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-16 bg-gray-50">
          <div className="section">
            <h2 className="text-3xl font-bold text-center mb-4">Coverage Areas</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Our supplier network covers Wales and South West England. Find local suppliers in your
              area.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredLocations.map((location) => (
                <Link
                  key={location}
                  href={`/suppliers/photocopiers/${location.toLowerCase().replace(/\s+/g, '-')}`}
                  className="card-hover p-4 text-center group"
                >
                  <span className="text-gray-700 group-hover:text-purple-600 transition-colors font-medium">
                    {location}
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/suppliers" className="link font-medium">
                View all locations →
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="section">
            <h2 className="text-3xl font-bold text-center mb-12">How TendorAI Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Search Suppliers</h3>
                <p className="text-gray-600">
                  Browse our directory of verified suppliers by service type and location.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Compare Options</h3>
                <p className="text-gray-600">
                  Review profiles, ratings, and services to find the best match for your needs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Request Quotes</h3>
                <p className="text-gray-600">
                  Submit your requirements and receive competitive quotes directly from suppliers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-gradient text-white">
          <div className="section text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Find Your Supplier?</h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Join UK businesses saving time and money with TendorAI. Our AI-powered matching
              connects you with the right suppliers for your needs.
            </p>
            <Link
              href="/suppliers"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              Browse Suppliers
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="section">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">TendorAI</h4>
                <p className="text-sm">
                  AI-powered procurement platform connecting UK businesses with trusted office
                  equipment suppliers.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                  {services.slice(0, 4).map((service) => (
                    <li key={service.slug}>
                      <Link href={`/suppliers/${service.slug}`} className="hover:text-white transition-colors">
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Locations</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/suppliers/photocopiers/cardiff" className="hover:text-white transition-colors">
                      Cardiff
                    </Link>
                  </li>
                  <li>
                    <Link href="/suppliers/photocopiers/bristol" className="hover:text-white transition-colors">
                      Bristol
                    </Link>
                  </li>
                  <li>
                    <Link href="/suppliers/photocopiers/newport" className="hover:text-white transition-colors">
                      Newport
                    </Link>
                  </li>
                  <li>
                    <Link href="/suppliers/photocopiers/swansea" className="hover:text-white transition-colors">
                      Swansea
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="mailto:support@tendorai.com" className="hover:text-white transition-colors">
                      support@tendorai.com
                    </a>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>© {new Date().getFullYear()} TendorAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
