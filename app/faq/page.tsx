import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: "Find answers to common questions about TendorAI, the UK's AI visibility platform for solicitors, accountants, and suppliers.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is TendorAI?',
      answer: "TendorAI is the UK's AI Visibility Platform. We help businesses get recommended by AI platforms like ChatGPT, Claude, and Perplexity through structured data profiles and AI visibility optimisation.",
    },
    {
      question: 'How does it work?',
      answer: "Every UK business in our verticals gets a free profile built from public register data. You claim your profile, add pricing and accreditations, and AI crawlers index your enriched data. Paid tiers rank you higher when AI recommends suppliers.",
    },
    {
      question: 'How much does it cost?',
      answer: "Free to be listed. Paid tiers start at £149/month for full AI visibility including priority ranking, AEO reports, and mention tracking.",
    },
    {
      question: 'What industries do you cover?',
      answer: "Solicitors (10,000+ firms), office equipment dealers (1,044), with accountants, estate agents, and recruitment agencies coming soon.",
    },
    {
      question: 'Is it free?',
      answer: "Free to be listed with a basic profile. Paid tiers from £149/month give you priority ranking in AI results, pricing visibility, and AI visibility reports.",
    },
    {
      question: 'What is an AEO report?',
      answer: "An AI Engine Optimisation report that audits how AI platforms see your business. It shows what AI says about you, who it recommends instead, and what to fix.",
    },
    {
      question: 'How is this different from SEO?',
      answer: "SEO optimises your website for Google search. TendorAI optimises your structured data for AI platforms — ChatGPT, Claude, Perplexity, Google AI. Different technology, different audience.",
    },
    {
      question: 'How is this different from Trustpilot?',
      answer: "Trustpilot manages reviews. TendorAI manages your visibility across all AI platforms — structured data, pricing, accreditations, and ranking. Reviews are one input; we optimise the full picture.",
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
              Contact us &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
