import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ | TendorAI - Frequently Asked Questions',
  description: 'Find answers to common questions about TendorAI, our AI-powered procurement platform for UK businesses.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'Is TendorAI free to use?',
      answer: 'Yes, TendorAI is completely free for businesses looking for quotes. We earn our revenue from suppliers who pay for visibility and qualified leads.',
    },
    {
      question: 'How does AI matching work?',
      answer: 'Our AI analyses your requirements (equipment type, location, volume, budget) and matches you with suppliers from our verified network who best fit your needs. This happens instantly — no waiting days for responses.',
    },
    {
      question: 'Are the suppliers verified?',
      answer: 'Yes. Every supplier in our network is vetted before they can receive leads. We verify their business credentials, service areas, and track their performance over time.',
    },
    {
      question: 'What equipment can I get quotes for?',
      answer: 'TendorAI covers photocopiers and printers, telecoms systems (VoIP, phone systems), CCTV and security systems, IT services, and office equipment. We are constantly expanding our categories.',
    },
    {
      question: 'How do I become a vendor on TendorAI?',
      answer: 'Visit our For Vendors page and sign up for a free account. You can upgrade to paid tiers (Visible or Verified) to increase your AI visibility and receive more qualified leads.',
    },
    {
      question: 'What areas do you cover?',
      answer: 'TendorAI currently has strong coverage across Wales and South West England, with suppliers throughout the UK. We are expanding coverage continuously.',
    },
    {
      question: 'How is this different from other quote sites?',
      answer: 'Traditional quote sites blast your details to every supplier and hope for the best. TendorAI uses AI to match you with the most relevant suppliers, and we are built to be queried by AI assistants — so when someone asks ChatGPT for supplier recommendations, our verified suppliers get mentioned.',
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Everything you need to know about TendorAI
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact us →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
