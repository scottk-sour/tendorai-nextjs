import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: "Find answers to common questions about TendorAI, the UK's AI visibility platform for solicitors, accountants, and suppliers.",
  alternates: { canonical: '/faq' },
};

const FIRM_COUNT = '62,026+';

const faqs: { q: string; a: string }[] = [
  {
    q: 'What is TendorAI?',
    a: "TendorAI is the UK's AI visibility platform. We help regulated professional-services firms — solicitors, accountants, mortgage advisers and estate agents — become accurate, readable and easy to cite for AI assistants like ChatGPT, Claude, Gemini, Perplexity and similar tools, using structured data and verified firm information.",
  },
  {
    q: 'How does it work?',
    a: 'Every firm in our verticals starts with a free profile built from public register data. You claim it, verify your details, and add the information AI assistants look for. We structure that data so AI platforms can read it correctly. Pro adds deeper diagnostics, draft content and tracking. No AI platform lets anyone pay for a higher ranking, and we do not claim to influence rankings directly — we make your information clear and trustworthy so you are more likely to be referenced.',
  },
  {
    q: 'How do you measure AI visibility?',
    a: 'We run real buyer-style questions across the AI assistants we support and record which firms get referenced in the answers. Scores are based on those live results, not on self-reported data. We only count mentions from assistants that genuinely browse or cite sources, so a score reflects what AI actually says about a firm. Because AI platforms change frequently, our method evolves over time.',
  },
  {
    q: 'How much does it cost?',
    a: 'Being listed is free. Pro costs £299 per month, billed monthly with no lock-in contract. You can cancel at any time and keep Pro access until the end of your paid month.',
  },
  {
    q: 'Do I need to give you my website login details?',
    a: 'No. The recommended method is to add the structured-data snippet yourself, or through your tag manager — no credentials required. If you would prefer hands-on help, you can create a temporary, limited admin account and remove it once we are done. We do not ask for, or need, your main website password.',
  },
  {
    q: 'What do you add to my website?',
    a: "We generate a small piece of code called schema markup — structured data that helps AI assistants and search engines understand your firm more accurately. It is invisible to visitors and does not change how your site looks or works. You can add it yourself in a few minutes or via your tag manager, and we will guide you.",
  },
  {
    q: 'What industries do you cover?',
    a: `Solicitors (SRA-registered), accountancy firms (ICAEW membership shown only where we have confirmed it), mortgage advisers (FCA-regulated) and estate agents (Propertymark). ${FIRM_COUNT} UK regulated firms are currently profiled.`,
  },
  {
    q: "Where does my firm's information come from?",
    a: 'We build free profiles from publicly available regulatory information and published business details — for example the SRA, Companies House, ICAEW, FCA and Propertymark registers. You can claim your profile, update it, or ask us to correct or remove your information at any time. This is explained in full in our Privacy Policy.',
  },
  {
    q: 'What is an AI visibility report?',
    a: 'It audits how AI assistants currently describe your firm: what they say about you, which firms they name instead, and the specific gaps to address. It is based on live queries to real AI platforms. Like all our outputs, it is generated using AI and should be treated as a starting point, not a finished assessment.',
  },
  {
    q: 'Can you guarantee my firm will be recommended by AI assistants?',
    a: 'No — and be cautious of anyone who promises that. We do not control third-party AI platforms or their models, and they change without notice. What we can do is make your firm’s information accurate, structured and easy for AI to read, which improves your chances of being referenced.',
  },
  {
    q: 'Are the reports and draft content guaranteed accurate?',
    a: 'No. Scores, reports and draft content are generated using AI and are drafts and suggestions, not finished work or professional advice. You should always review and approve anything before you publish it or rely on it. This is set out in full in our Terms of Service.',
  },
  {
    q: 'How is this different from SEO?',
    a: 'SEO optimises your website for traditional search engines like Google. TendorAI focuses on your structured data and how AI assistants read and represent your firm. Related goals, different technology and audience.',
  },
  {
    q: 'How is this different from Trustpilot?',
    a: 'Trustpilot manages customer reviews. TendorAI manages how your firm appears to AI assistants — your structured data, services, accreditations and verified details. Reviews can be one input; we focus on the wider picture.',
  },
  {
    q: 'How is this different from a specialist AI or GEO agency?',
    a: 'Specialist agencies typically charge four figures a month on annual contracts. TendorAI Pro is £299 per month with no lock-in, and your data stays in sync with your profile automatically rather than needing manual updates.',
  },
  {
    q: 'What happens if I cancel Pro?',
    a: 'Your account reverts to the free tier and Pro features stop at the end of your paid month. Any structured-data snippet you added to your own site remains there unless you remove it — if you want it gone, we will tell you exactly what to take out.',
  },
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
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
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-3">
                  {faq.q}
                </h3>
                <p className="text-[var(--text2)] leading-relaxed">
                  {faq.a}
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
