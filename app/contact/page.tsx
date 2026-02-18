import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with TendorAI. Questions about AI visibility for your business? We're here to help.",
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
            Contact Us
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Businesses */}
            <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
              <h2 className="font-serif text-xl font-semibold text-[var(--text)] mb-4">For Businesses</h2>
              <p className="text-[var(--text2)] mb-6">
                Want to see what AI says about your business? Run a free AI visibility report.
              </p>
              <Link href="/aeo-report" className="btn-primary">
                Check AI Visibility
              </Link>
            </div>

            {/* For Vendors */}
            <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
              <h2 className="font-serif text-xl font-semibold text-[var(--text)] mb-4">For Vendors</h2>
              <p className="text-[var(--text2)] mb-6">
                Want to claim your profile and get recommended by AI? Sign up for a vendor account.
              </p>
              <Link href="/vendor-signup" className="btn-secondary">
                Claim Your Profile
              </Link>
            </div>
          </div>

          {/* Email */}
          <div className="mt-12 text-center">
            <h2 className="font-serif text-xl font-semibold text-[var(--text)] mb-4">General Enquiries</h2>
            <p className="text-[var(--text2)] mb-4">
              For all other questions, reach us at:
            </p>
            <a
              href="mailto:scott.davies@tendorai.com"
              className="text-[var(--purple-start)] hover:text-[var(--purple-end)] font-medium text-lg"
            >
              scott.davies@tendorai.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
