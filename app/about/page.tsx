import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | TendorAI - AI-Powered Procurement Platform',
  description: 'TendorAI is an AI-powered procurement platform helping UK businesses find the best office equipment suppliers. Learn about our mission and how we work.',
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About TendorAI
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            We&apos;re making procurement simple, fast, and intelligent for UK businesses.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              TendorAI was built to solve a problem every business faces: finding reliable suppliers
              for office equipment shouldn&apos;t be a time-consuming, frustrating process.
            </p>
            <p className="text-gray-600 mb-6">
              We use AI to match businesses with verified suppliers instantly, saving hours of research
              and ensuring you get competitive quotes from companies that actually serve your area.
            </p>
            <p className="text-gray-600 mb-6">
              Whether you need photocopiers, telecoms systems, CCTV, or IT services, TendorAI connects
              you with the right suppliers in minutes, not days.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">70+</div>
              <div className="text-gray-600">Verified Suppliers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">230+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">5</div>
              <div className="text-gray-600">Service Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">UK</div>
              <div className="text-gray-600">Wide Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why We&apos;re Different
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">🤖 AI-Powered Matching</h3>
              <p className="text-gray-600">
                Our AI analyses your requirements and matches you with suppliers based on location,
                specialisation, pricing, and verified ratings — not just whoever pays the most.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">✅ Verified Suppliers Only</h3>
              <p className="text-gray-600">
                Every supplier in our network is vetted. We check their credentials, service areas,
                and track their performance to ensure you&apos;re dealing with reliable businesses.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">💷 Free for Businesses</h3>
              <p className="text-gray-600">
                TendorAI is completely free for businesses to use. We&apos;re funded by suppliers who
                value qualified leads, not by charging you for quotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-600 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Simplify Your Procurement?
          </h2>
          <Link
            href="/suppliers"
            className="inline-block bg-white text-purple-600 font-medium px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </main>
  );
}
