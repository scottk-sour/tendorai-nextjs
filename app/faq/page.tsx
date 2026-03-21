import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: "Find answers to common questions about TendorAI, the UK's AI visibility platform for solicitors, accountants, and suppliers.",
  alternates: { canonical: '/faq' },
};

const allFaqs = [
    {
      question: 'What is TendorAI?',
      answer: "TendorAI is the UK's AI Visibility Platform. We help businesses get recommended by AI platforms like ChatGPT, Claude, and Perplexity through structured data profiles and AI visibility optimisation.",
    },
    {
      question: 'How does it work?',
      answer: "Every UK business in our verticals gets a free profile built from public register data. You claim your profile, add pricing and accreditations, and AI crawlers index your enriched data. Paid plans rank you higher when AI recommends suppliers.",
    },
    {
      question: 'How much does it cost?',
      answer: "Free to be listed. Paid plans start at £299/month (3/50 early adopter spots remaining) for full AI visibility including priority ranking, AI Visibility (AEO) reports, and mention tracking.",
    },
    {
      question: 'What industries do you cover?',
      answer: "Solicitors (10,000+ SRA-registered firms), accountants (ICAEW-registered), mortgage advisers (FCA-regulated), estate agents, and office equipment suppliers. Over 12,000 UK professional services firms are listed.",
    },
    {
      question: 'Is it free?',
      answer: "Free to be listed with a basic profile. Paid plans from £299/month (3/50 early adopter spots remaining) give you priority ranking in AI results, pricing visibility, and AI visibility reports.",
    },
    {
      question: 'What is an AI Visibility (AEO) report?',
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
    {
      question: 'What do you install on my website?',
      answer: "A small piece of code that tells AI platforms about your business — your services, location, reviews, and that you're verified on TendorAI. It's invisible to visitors but makes your business readable to AI. We handle the installation — you don't need to do anything technical.",
    },
    {
      question: 'What happens if I cancel my Pro subscription?',
      answer: "The code we installed on your website stops working. It won't break your site — it just stops telling AI about your business. Your TendorAI profile also reverts to the free tier.",
    },
    {
      question: 'How is this different from hiring a GEO agency?',
      answer: "GEO agencies charge £1,500–8,000 per month on 12-month contracts and take 3–6 months to deliver results. TendorAI Pro costs £299/month (3/50 early adopter spots remaining), has no lock-in, and we install everything within 48 hours. Our data also syncs automatically with your TendorAI profile — agencies require manual updates every time something changes.",
    },
    {
      question: 'Do I need to give you my website password?',
      answer: "Yes — we need temporary access to add the code to your site. Your credentials are encrypted with AES-256 encryption and only accessible to the TendorAI team. If you prefer, you can create a temporary admin account for us and remove it after installation.",
    },
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-brand-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Everything you need to know about TendorAI
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {allFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-3">
                  {faq.question}
                </h3>
                <p className="text-[var(--text2)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--text2)] mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="text-[var(--purple-start)] hover:text-[var(--purple-end)] font-medium"
            >
              Contact us &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
