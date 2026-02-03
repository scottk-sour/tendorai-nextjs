import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | TendorAI',
  description: 'Get in touch with TendorAI. Questions about our AI-powered procurement platform? We are here to help.',
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Businesses */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🏢</div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">For Businesses</h2>
              <p className="text-gray-600 mb-6">
                Looking for office equipment quotes? Our AI can match you with verified suppliers instantly.
              </p>
              <Link
                href="/suppliers"
                className="inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get Quotes Now
              </Link>
            </div>

            {/* For Vendors */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-3xl mb-4">🤝</div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">For Vendors</h2>
              <p className="text-gray-600 mb-6">
                Want to join our network and receive qualified leads? Sign up for a vendor account.
              </p>
              <a
                href="https://www.tendorai.com/vendor-signup"
                className="inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Become a Vendor
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">General Enquiries</h2>
            <p className="text-gray-600 mb-4">
              For all other questions, reach us at:
            </p>
            <a
              href="mailto:support@tendorai.com"
              className="text-purple-600 hover:text-purple-700 font-medium text-lg"
            >
              support@tendorai.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
