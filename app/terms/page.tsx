import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | TendorAI',
  description: 'TendorAI Terms of Service - The terms and conditions governing use of our B2B supplier directory and quote comparison platform.',
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
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
                Welcome to TendorAI. These Terms of Service (&quot;Terms&quot;) govern your use of the TendorAI
                website at tendorai.com and all related services (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-gray-600 mb-4">
                TendorAI is a trading name registered in England and Wales. By accessing or using our Service,
                you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
              </p>
              <p className="text-gray-600">
                These Terms apply to all users, including businesses seeking quotes (&quot;Users&quot;) and
                suppliers offering products and services (&quot;Vendors&quot;).
              </p>
            </div>

            {/* Service Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-600 mb-4">
                TendorAI operates a free B2B supplier directory and quote comparison platform. Our Service:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>Lists verified UK suppliers of office equipment (photocopiers, telecoms, CCTV, IT services)</li>
                <li>Allows businesses to search for suppliers by location and service type</li>
                <li>Facilitates quote requests from businesses to suppliers</li>
                <li>Uses AI to match requirements with suitable suppliers</li>
                <li>Provides pricing estimates based on supplier data</li>
              </ul>
              <p className="text-gray-600">
                TendorAI acts as an intermediary platform. We do not sell, lease, or provide office equipment directly.
              </p>
            </div>

            {/* User Obligations */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
              <p className="text-gray-600 mb-4">As a User of our Service, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>
                  <strong>Provide accurate information:</strong> All information submitted in quote requests must be
                  accurate and truthful, including company details and requirements.
                </li>
                <li>
                  <strong>Business use only:</strong> The Service is intended for B2B purposes. You represent that
                  you are acting on behalf of a business, not as a consumer.
                </li>
                <li>
                  <strong>No misuse:</strong> You will not use the Service for any unlawful purpose, to harass vendors,
                  or to submit fake or spam requests.
                </li>
                <li>
                  <strong>No scraping or automation:</strong> You will not use automated tools to scrape data,
                  submit bulk requests, or interfere with the Service&apos;s operation.
                </li>
                <li>
                  <strong>Respect intellectual property:</strong> You will not copy, reproduce, or distribute
                  content from our platform without permission.
                </li>
              </ul>
            </div>

            {/* Vendor Obligations */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Vendor Obligations</h2>
              <p className="text-gray-600 mb-4">As a Vendor using our Service, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>
                  <strong>Accurate business information:</strong> Your company details, service areas, and contact
                  information must be accurate and kept up to date.
                </li>
                <li>
                  <strong>Accurate product and pricing data:</strong> Any products, pricing, and specifications you
                  upload must be accurate and reflect your actual offerings.
                </li>
                <li>
                  <strong>Respond to enquiries in good faith:</strong> You agree to respond to quote requests
                  professionally and in a timely manner (typically within 1-2 business days).
                </li>
                <li>
                  <strong>No misleading claims:</strong> You will not make false claims about your products, services,
                  accreditations, or capabilities.
                </li>
                <li>
                  <strong>Subscription terms:</strong> If you subscribe to a paid tier, you agree to our subscription
                  terms including payment obligations and cancellation policies.
                </li>
              </ul>
            </div>

            {/* Quote Requests */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Quote Requests and Introductions</h2>
              <p className="text-gray-600 mb-4">
                <strong>Facilitation only:</strong> TendorAI facilitates introductions between Users and Vendors.
                We do not guarantee that any Vendor will respond to a quote request, provide a quote, or offer any
                particular pricing.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Pricing estimates:</strong> Any pricing estimates shown on our platform are indicative only,
                based on data provided by Vendors. Final pricing is determined directly between User and Vendor.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>No obligation:</strong> Submitting a quote request does not obligate you to purchase anything.
                Similarly, Vendors listing on our platform are not obligated to accept every enquiry.
              </p>
              <p className="text-gray-600">
                <strong>Direct relationship:</strong> Any contract for goods or services is formed directly between
                User and Vendor. TendorAI is not a party to such contracts.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                <strong>Intermediary role:</strong> TendorAI acts solely as an intermediary platform. We are not
                responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>The quality, safety, or legality of any products or services offered by Vendors</li>
                <li>The accuracy of information provided by Vendors or Users</li>
                <li>The ability of Vendors to fulfil orders or provide services</li>
                <li>Any disputes between Users and Vendors</li>
                <li>Any loss or damage arising from transactions between Users and Vendors</li>
              </ul>
              <p className="text-gray-600 mb-4">
                <strong>No warranty:</strong> The Service is provided &quot;as is&quot; without warranties of any kind,
                either express or implied, including but not limited to merchantability, fitness for a particular
                purpose, or non-infringement.
              </p>
              <p className="text-gray-600">
                <strong>Liability cap:</strong> To the maximum extent permitted by law, TendorAI&apos;s total liability
                for any claims arising from use of the Service shall not exceed the amount you have paid us (if any)
                in the 12 months preceding the claim.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                <strong>Our property:</strong> The TendorAI platform, including our website, AI matching algorithms,
                software, logos, and original content, is owned by TendorAI and protected by intellectual property laws.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>User content:</strong> You retain ownership of content you submit (e.g., quote request details).
                By submitting content, you grant us a licence to use it for providing the Service.
              </p>
              <p className="text-gray-600">
                <strong>Vendor content:</strong> Vendors retain ownership of their product listings and business information.
                By uploading content, Vendors grant us a licence to display it on our platform and share it with potential
                customers.
              </p>
            </div>

            {/* Account Termination */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Account Suspension and Termination</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to suspend or terminate accounts and access to our Service if we reasonably
                believe you have:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                <li>Violated these Terms of Service</li>
                <li>Provided false or misleading information</li>
                <li>Engaged in fraudulent or abusive behaviour</li>
                <li>Harassed other users or our staff</li>
                <li>Used the Service for unlawful purposes</li>
              </ul>
              <p className="text-gray-600">
                For Vendor accounts, we will provide reasonable notice before termination except in cases of
                serious misconduct.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-600">
                You agree to indemnify and hold harmless TendorAI, its officers, directors, employees, and agents
                from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from
                your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>
              <p className="text-gray-600 mb-4">
                <strong>Informal resolution:</strong> If you have a dispute with TendorAI, we encourage you to
                contact us first at{' '}
                <a href="mailto:hello@tendorai.com" className="text-purple-600 hover:text-purple-700">
                  hello@tendorai.com
                </a>{' '}
                to attempt informal resolution.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>User-Vendor disputes:</strong> Disputes between Users and Vendors should be resolved directly
                between those parties. TendorAI may, at its discretion, assist with mediation but is not obligated to do so.
              </p>
              <p className="text-gray-600">
                <strong>Legal proceedings:</strong> If informal resolution fails, any legal proceedings shall be
                brought in the courts of England and Wales.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales,
                without regard to conflict of law principles. You agree to submit to the exclusive jurisdiction
                of the courts of England and Wales for any disputes arising from these Terms or your use of the Service.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to These Terms</h2>
              <p className="text-gray-600">
                We may update these Terms from time to time. We will notify you of material changes by posting
                a notice on our website or, for Vendors with accounts, by email. Your continued use of the Service
                after changes are posted constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
              <p className="text-gray-600">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
                shall continue in full force and effect. The invalid provision shall be modified to the minimum
                extent necessary to make it valid and enforceable.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
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
            Have questions about our terms?
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
