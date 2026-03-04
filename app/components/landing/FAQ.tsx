import Link from 'next/link';

const faqItems = [
  {
    question: 'What is AI visibility?',
    answer: 'AI visibility is how likely AI assistants like ChatGPT, Claude, and Perplexity are to recommend your business. TendorAI provides structured data profiles and AI visibility reports so AI platforms can find and recommend you by name.',
  },
  {
    question: 'Which industries does TendorAI cover?',
    answer: 'We cover solicitors (10,000+ SRA-registered firms), accountants (ICAEW-registered), mortgage advisers (FCA-regulated), and estate agents across England and Wales. Over 12,000 UK professional services firms are listed.',
  },
  {
    question: 'Is TendorAI free to use?',
    answer: 'Free AI visibility reports are available for any UK business. Basic directory listings are also free. Paid plans start at \u00a3149/month for full AI visibility with structured data profiles.',
  },
  {
    question: 'How is this different from SEO?',
    answer: 'SEO optimises for Google search results. AI Visibility (AEO) optimises for AI recommendations. When someone asks ChatGPT "find me a solicitor in Bristol", AI needs structured data to give a specific answer \u2014 that\u2019s what TendorAI provides.',
  },
  {
    question: 'What does a free AI visibility report show?',
    answer: 'Our free report scans how AI platforms currently see your business. It shows your AI visibility score (0-100), who AI recommends instead, gaps in your online presence, and specific steps to improve.',
  },
  {
    question: 'What areas does TendorAI cover?',
    answer: 'TendorAI covers all of England and Wales, including London, Birmingham, Manchester, Bristol, Cardiff, Leeds, Liverpool, Sheffield, Newcastle, and hundreds more cities and towns.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Common questions about AI visibility for UK businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:-translate-y-1 hover:shadow-md hover:border-purple-600 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-purple-700 mb-3 leading-snug">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-purple-700 font-semibold border-2 border-purple-600 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
