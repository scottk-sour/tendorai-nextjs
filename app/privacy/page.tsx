import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TendorAI Privacy Policy - Learn how we collect, use, and protect your data. We are committed to protecting the privacy of our users and vendors.',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-purple-100">
            Last updated: February 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">

            {/* Introduction */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                TendorAI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting and respecting your privacy.
                This Privacy Policy explains how we collect, use, store, and protect your personal data when you use
                our website at tendorai.com and our services.
              </p>
              <p className="text-gray-600 mb-4">
                TendorAI is a trading name registered in England and Wales. We operate as a B2B procurement
                platform connecting businesses with office equipment suppliers across the UK.
              </p>
              <p className="text-gray-600">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Data We Collect */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quote Request Information</h3>
              <p className="text-gray-600 mb-4">
                When you submit a quote request, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>Company name and business address</li>
                <li>Contact name and job title</li>
                <li>Email address and telephone number</li>
                <li>Postcode (for supplier matching)</li>
                <li>Equipment requirements (volume, features, timeline)</li>
                <li>Current provider details (if provided)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Vendor Account Information</h3>
              <p className="text-gray-600 mb-4">
                If you register as a supplier, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>Business name, registration number, and VAT number</li>
                <li>Business address and service coverage areas</li>
                <li>Contact details for your account</li>
                <li>Product and pricing information you upload</li>
                <li>Payment details for subscription services (processed securely by Stripe)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics Data</h3>
              <p className="text-gray-600 mb-4">
                We automatically collect:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>Page views and navigation patterns</li>
                <li>Search queries and filter selections</li>
                <li>AI assistant referrals and mentions</li>
                <li>Device type, browser, and operating system</li>
                <li>IP address (anonymised for analytics)</li>
              </ul>
            </div>

            {/* Why We Collect Data */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Why We Collect Your Data</h2>
              <p className="text-gray-600 mb-4">We use your data to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>Match your business with relevant local suppliers</li>
                <li>Forward your quote requests to selected vendors</li>
                <li>Provide pricing estimates and savings calculations</li>
                <li>Improve our AI matching algorithms</li>
                <li>Send service-related communications</li>
                <li>Process vendor subscriptions and payments</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Legal Basis */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Legal Basis for Processing</h2>
              <p className="text-gray-600 mb-4">
                We process your personal data under the following legal bases:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>
                  <strong>Legitimate Interest:</strong> As a B2B service, we have a legitimate interest in
                  processing business contact information to facilitate supplier matching and provide our services.
                </li>
                <li>
                  <strong>Contractual Necessity:</strong> Processing is necessary to fulfil our service agreement
                  with vendor subscribers.
                </li>
                <li>
                  <strong>Consent:</strong> For optional cookies and marketing communications, we rely on your consent.
                </li>
                <li>
                  <strong>Legal Obligation:</strong> We may process data to comply with legal requirements.
                </li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Who We Share Data With</h2>
              <p className="text-gray-600 mb-4">
                <strong>Suppliers:</strong> When you submit a quote request, your contact details and requirements
                are shared with the suppliers you select (or our AI matches for you). This is the core function of our service.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Service Providers:</strong> We use trusted third-party services:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>MongoDB Atlas (database hosting)</li>
                <li>Render.com (application hosting)</li>
                <li>Vercel (website hosting)</li>
                <li>Stripe (payment processing)</li>
                <li>Google Analytics (anonymised usage analytics)</li>
              </ul>
              <p className="text-gray-600 mb-4">
                <strong>We do not sell your data</strong> to third parties for marketing purposes.
              </p>
            </div>

            {/* Data Storage & Security */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Storage and Security</h2>
              <p className="text-gray-600 mb-4">
                Your data is stored securely on MongoDB Atlas servers located in the EU/UK region.
                Our backend services are hosted on Render.com with industry-standard security measures including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>Encryption in transit (HTTPS/TLS)</li>
                <li>Encryption at rest for sensitive data</li>
                <li>Regular security updates and monitoring</li>
                <li>Access controls and authentication</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
              <p className="text-gray-600 mb-4">We use the following types of cookies:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function (session management, authentication).
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Google Analytics cookies to understand how visitors use our site.
                  These are anonymised and do not identify you personally.
                </li>
              </ul>
              <p className="text-gray-600">
                You can control cookies through your browser settings. Disabling essential cookies may affect site functionality.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>
                  <strong>Quote Requests:</strong> Retained for 24 months to allow follow-up and service improvement,
                  then automatically deleted.
                </li>
                <li>
                  <strong>Vendor Accounts:</strong> Retained while your account is active. Upon account closure,
                  data is deleted within 30 days except where required for legal purposes.
                </li>
                <li>
                  <strong>Analytics Data:</strong> Aggregated analytics retained indefinitely; individual session data
                  retained for 14 months.
                </li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights Under GDPR</h2>
              <p className="text-gray-600 mb-4">
                Under the UK General Data Protection Regulation (UK GDPR), you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
                <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Restriction:</strong> Request limited processing in certain circumstances</li>
              </ul>
              <p className="text-gray-600">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:hello@tendorai.com" className="text-purple-600 hover:text-purple-700">
                  hello@tendorai.com
                </a>. We will respond within 30 days.
              </p>
            </div>

            {/* ICO */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Regulatory Information</h2>
              <p className="text-gray-600 mb-4">
                TendorAI is registered with the Information Commissioner&apos;s Office (ICO) as a data controller.
              </p>
              <p className="text-gray-600">
                If you have concerns about how we handle your data that we cannot resolve, you have the right
                to lodge a complaint with the ICO at{' '}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                  ico.org.uk
                </a>.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any significant
                changes by posting a notice on our website. Your continued use of our services after changes
                are posted constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong>{' '}
                <a href="mailto:hello@tendorai.com" className="text-purple-600 hover:text-purple-700">
                  hello@tendorai.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">
            Have questions about your data?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
