import Link from 'next/link';

const faqItems = [
  {
    question: 'What areas does TendorAI cover?',
    answer: 'TendorAI lists office equipment suppliers across Wales and South West England. Our directory includes suppliers in Cardiff, Newport, Swansea, Bridgend, Bristol, Bath, Gloucester, Cheltenham, Exeter, Plymouth, and surrounding areas.',
  },
  {
    question: 'What types of office equipment can I find suppliers for?',
    answer: 'Our directory covers four main categories: photocopiers and multifunction printers, telecoms and business phone systems, CCTV and security systems, and IT equipment. You can browse suppliers by category or search by your postcode.',
  },
  {
    question: 'Is TendorAI free to use?',
    answer: 'Yes, TendorAI is completely free for businesses looking for office equipment. You can browse our supplier directory, view company profiles, and request quotes without any charge.',
  },
  {
    question: 'How do I get quotes from suppliers?',
    answer: 'Enter your postcode to see suppliers in your area, then browse their profiles to learn about their services. You can request quotes directly through supplier profile pages. We recommend contacting 2-3 suppliers to compare quotes.',
  },
  {
    question: 'Are the suppliers on TendorAI vetted?',
    answer: 'We compile and categorise established office equipment suppliers across Wales and the South West. Supplier profiles include their services, coverage areas, and contact information. We recommend checking reviews when comparing quotes.',
  },
  {
    question: 'Can I find photocopier suppliers in Cardiff or Bristol?',
    answer: 'Yes, we have multiple photocopier and printer suppliers listed in both Cardiff and Bristol, as well as across South Wales and the South West region. Use the postcode search to find suppliers who cover your specific area.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Common questions about finding office equipment suppliers in Wales and South West England
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:-translate-y-1 hover:shadow-md hover:border-blue-800 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-3 leading-snug">
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
            className="inline-flex items-center gap-2 text-blue-800 font-semibold border-2 border-blue-800 px-6 py-3 rounded-lg hover:bg-blue-800 hover:text-white transition-all"
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
