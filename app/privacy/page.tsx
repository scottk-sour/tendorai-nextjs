// app/privacy/page.tsx
//
// ─────────────────────────────────────────────────────────────────────────────
// BEFORE YOU MERGE — fill this placeholder (search "FILL:"):
//   1. REGISTERED_OFFICE  – your TendorAI Ltd registered office address (Wales)
//
// The ICO reference is no longer held here: the Complaints section states that
// registration is in progress. When the ZA…… reference is issued, replace that
// sentence rather than reinstating a constant.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';

const REGISTERED_OFFICE = '[FILL: registered office address, Wales]';
const CONTACT_EMAIL = 'scott.davies@tendorai.com';
const LAST_UPDATED = '4 September 2026';

export const metadata: Metadata = {
  title: 'Privacy Policy | TendorAI',
  description:
    'How TendorAI Ltd collects, uses, stores and protects personal data, including data sourced from public registers under Article 14 UK GDPR.',
  alternates: { canonical: 'https://www.tendorai.com/privacy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy | TendorAI',
    description:
      'How TendorAI Ltd handles your data, including firm data sourced from public registers.',
    url: 'https://www.tendorai.com/privacy',
    siteName: 'TendorAI',
    locale: 'en_GB',
    type: 'website',
  },
};

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[15px] leading-relaxed text-gray-700">{children}</p>;
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 mb-3 scroll-mt-24 text-xl font-semibold text-gray-900">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 mb-2 text-base font-semibold text-gray-900">{children}</h3>;
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mb-4 ml-5 list-disc space-y-1.5 text-[15px] leading-relaxed text-gray-700">
      {children}
    </ul>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800">
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">Privacy Policy</h1>
      <p className="mb-10 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

      {/* Plain-English summary */}
      <div className="mb-10 rounded-lg border border-indigo-100 bg-indigo-50/60 p-5">
        <p className="mb-2 text-sm font-semibold text-indigo-900">In plain terms</p>
        <p className="mb-0 text-[15px] leading-relaxed text-indigo-900/90">
          TendorAI holds two kinds of personal data: (1) data about regulated firms that we have
          taken from public registers such as the SRA, Companies House, ICAEW, FCA and Propertymark,
          and (2) data about people who create an account or contact us. If your firm appears on our
          platform and you did not give us your data directly, Section 6 explains exactly where we
          got it, why we hold it, and how to ask us to stop. You can object or ask for removal at any
          time by emailing{' '}
          <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>.
        </p>
      </div>

      <H2 id="introduction">1. Who we are</H2>
      <P>
        This Privacy Policy explains how TendorAI Ltd (&quot;TendorAI&quot;, &quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;) collects, uses, stores and protects personal data when you
        use our website at tendorai.com and our services, and when we hold data about your firm that
        we have obtained from public sources.
      </P>
      <P>
        TendorAI Ltd is a company registered in England and Wales under company number{' '}
        <strong>16521860</strong>, with its registered office at {REGISTERED_OFFICE}. We are the
        data controller responsible for your personal data.
      </P>
      <P>
        TendorAI is an AI visibility platform. We measure how often AI assistants recommend regulated
        professional-services firms, diagnose why a firm may be invisible to those assistants, and
        help firms close the underlying technical gaps.
      </P>

      <H2 id="data-we-collect">2. The data we collect</H2>

      <H3>(a) Firm data from public registers</H3>
      <P>
        We maintain profiles for UK regulated firms using information published in public registers.
        For each firm this may include:
      </P>
      <UL>
        <li>Firm or trading name and any branch/office names</li>
        <li>
          Regulatory and registration identifiers (for example SRA ID, Companies House number, VAT
          number, ICAEW firm number, FCA reference, Propertymark membership)
        </li>
        <li>Business address and service-coverage areas</li>
        <li>Regulatory status and areas of practice</li>
        <li>
          Business contact details published in the register (such as a business email address,
          telephone number and website)
        </li>
        <li>
          Where published, the names of principals, partners or named contacts — which, for sole
          practitioners and partnerships, constitutes personal data
        </li>
      </UL>
      <P>
        Section 6 sets out the specific sources, legal basis and retention for this category, as
        required by Article 14 UK GDPR.
      </P>

      <H3>(b) Account data</H3>
      <P>If you register for a free or Pro account, we collect:</P>
      <UL>
        <li>Your name, job title and business email address</li>
        <li>Login credentials</li>
        <li>The firm you represent and details you choose to add or correct on your profile</li>
        <li>Your communication preferences</li>
      </UL>

      <H3>(c) Billing data</H3>
      <P>
        If you subscribe to our Pro plan (£299/month), payment is processed securely by Stripe. We do
        not store full card details on our own systems. We retain transaction records (such as
        invoices and the subscription status) as required for accounting and tax purposes.
      </P>

      <H3>(d) Reports and diagnostic data</H3>
      <P>
        When you use the platform we generate AI-visibility scores, diagnostics and content drafts
        relating to your firm. Where these are linked to your account, they are treated as your
        personal data.
      </P>

      <H3>(e) Website and analytics data</H3>
      <UL>
        <li>Page views, navigation and search/filter activity</li>
        <li>Device type, browser and operating system</li>
        <li>IP address</li>
      </UL>

      <H3>(f) Communications</H3>
      <P>
        If you email us or use our contact form, we keep a record of that correspondence and the
        information you provide.
      </P>

      <H2 id="sources">3. Where we obtain your data</H2>
      <UL>
        <li>
          <strong>Directly from you</strong> — when you register, subscribe, complete your profile or
          contact us.
        </li>
        <li>
          <strong>From public registers and published sources</strong> — including the Solicitors
          Regulation Authority (SRA), Companies House, the Institute of Chartered Accountants in
          England and Wales (ICAEW), the Financial Conduct Authority (FCA) and Propertymark, and from
          firms&apos; own public websites.
        </li>
        <li>
          <strong>Automatically</strong> — through cookies and similar technologies when you use the
          website (see Section 10).
        </li>
      </UL>

      <H2 id="why">4. Why we use your data and our legal basis</H2>
      <P>We process personal data for the following purposes, on the bases shown:</P>
      <UL>
        <li>
          <strong>Operating the platform and firm profiles</strong> — to measure and report AI
          visibility for regulated firms. Legal basis: <strong>legitimate interests</strong> (running
          a B2B benchmarking and visibility service for professional-services firms), balanced against
          the rights of the individuals concerned (see Section 5).
        </li>
        <li>
          <strong>Providing the service to account holders</strong> — to create and manage your
          account, generate reports and deliver features. Legal basis: <strong>contract</strong>.
        </li>
        <li>
          <strong>Billing and payments</strong> — to take payment and keep financial records. Legal
          basis: <strong>contract</strong> and <strong>legal obligation</strong> (accounting/tax law).
        </li>
        <li>
          <strong>Marketing communications to firms</strong> — to tell firms about the platform.
          Legal basis: <strong>legitimate interests</strong> for corporate subscribers, and{' '}
          <strong>consent</strong> where required by the Privacy and Electronic Communications
          Regulations (PECR). You can opt out at any time.
        </li>
        <li>
          <strong>Website analytics</strong> — to understand and improve how the site is used. Legal
          basis: <strong>consent</strong>.
        </li>
        <li>
          <strong>Security, fraud prevention and legal compliance</strong>. Legal basis:{' '}
          <strong>legitimate interests</strong> and <strong>legal obligation</strong>.
        </li>
      </UL>

      <H2 id="legitimate-interests">5. Our legitimate interests</H2>
      <P>
        Where we rely on legitimate interests, we have weighed our interest in operating an AI
        visibility platform against your interests, rights and freedoms. We only process business and
        professional contact information that is already published in public registers or on firms&apos;
        own websites, we limit the data to what is needed to run the service, and we give every firm a
        clear and easy route to object or be removed. You can ask for a copy of our balancing
        assessment by emailing us.
      </P>

      <H2 id="article-14">6. Firm data obtained from public registers (Article 14 UK GDPR)</H2>
      <P>
        If your firm appears on our platform and you did not provide your data to us directly, this
        section is your privacy notice under Article 14 UK GDPR.
      </P>
      <UL>
        <li>
          <strong>What we hold:</strong> the firm-data categories listed in Section 2(a).
        </li>
        <li>
          <strong>Where we got it:</strong> publicly accessible registers and published sources,
          namely the SRA, Companies House, ICAEW, the FCA, Propertymark, and firms&apos; own public
          websites.
        </li>
        <li>
          <strong>Why we hold it and our legal basis:</strong> our legitimate interest in operating an
          AI visibility benchmarking platform for UK regulated professional-services firms (Article
          6(1)(f) UK GDPR), as explained in Section 5.
        </li>
        <li>
          <strong>How long we keep it:</strong> for as long as we operate the platform and the firm
          remains on the relevant public register, reviewed periodically, and removed promptly on a
          valid objection or erasure request (see Section 12).
        </li>
        <li>
          <strong>Your rights:</strong> you have the rights set out in Section 12, including the right
          to object to this processing and to ask us to remove your firm&apos;s profile.
        </li>
      </UL>
      <P>
        To object, correct your details, or ask for your firm&apos;s profile to be removed, email{' '}
        <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>. We will action valid requests without
        undue delay.
      </P>

      <H2 id="ai-visibility-reports">7. AI visibility reports</H2>
      <P>
        When you request a free AI visibility report, we collect your company name, website address,
        city, business category and email address, and your name if you choose to give it.
      </P>
      <P>
        We use these details to generate your report and to send it to you. We may also contact you
        afterwards about our services. Our lawful basis for both is legitimate interests: you have
        asked us to produce something for you, and we have an interest in offering related services
        to firms who have used the tool. You can object to marketing contact at any time by replying
        to any email or writing to <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>, and we
        will stop.
      </P>
      <P>
        We keep report submissions for 24 months from your last contact with us, after which they
        are deleted.
      </P>
      <P>
        Reports are hosted at a private URL that search engines do not index. Anyone with the link
        can view the report, so treat it as you would any unlisted page.
      </P>

      <H2 id="sharing">8. Who we share data with</H2>
      <P>
        We do not sell your personal data. We share it only with the service providers (processors)
        that help us run the platform, each under a data-processing agreement:
      </P>
      <UL>
        <li>
          <strong>Vercel</strong> — website/frontend hosting
        </li>
        <li>
          <strong>Render</strong> — backend application hosting
        </li>
        <li>
          <strong>MongoDB Atlas</strong> — database hosting (UK/EU region)
        </li>
        <li>
          <strong>Stripe</strong> — payment processing
        </li>
        <li>
          <strong>Resend</strong> — transactional and service email delivery
        </li>
        <li>
          <strong>Google Analytics</strong> — website analytics
        </li>
        <li>
          <strong>AI service providers</strong> (including Anthropic) — used to generate content and
          to measure how AI assistants respond to queries about firms. To perform this core function,
          firm identifiers and public profile information may be sent to third-party AI platforms.
        </li>
      </UL>
      <P>
        We may also disclose data where required by law, to enforce our terms, or to protect our
        rights, property or safety.
      </P>

      <H2 id="transfers">9. International transfers</H2>
      <P>
        Some of our providers (including Stripe, Google and certain AI service providers) process data
        outside the UK, including in the United States. Where personal data is transferred outside the
        UK, we rely on appropriate safeguards — such as the UK International Data Transfer Agreement,
        the UK Addendum to the EU Standard Contractual Clauses, UK adequacy regulations, or the UK
        extension to the EU–US Data Privacy Framework — so that your data receives equivalent
        protection. You can ask us for details of the safeguards that apply.
      </P>

      <H2 id="cookies">10. Cookies</H2>
      <UL>
        <li>
          <strong>Essential cookies</strong> — required for the site to work (for example session
          management and authentication). These are set without consent because the site cannot
          function without them.
        </li>
        <li>
          <strong>Analytics cookies</strong> — Google Analytics cookies that help us understand site
          usage. These are only set after you give consent through our cookie banner, and you can
          withdraw consent at any time.
        </li>
      </UL>
      <P>You can also control cookies through your browser settings.</P>

      <H2 id="retention">11. How long we keep data</H2>
      <UL>
        <li>
          <strong>Firm register data:</strong> as described in Section 6.
        </li>
        <li>
          <strong>Accounts:</strong> while your account is active; deleted within 30 days of closure,
          except where we must keep it for legal reasons.
        </li>
        <li>
          <strong>Billing and financial records:</strong> retained for 6 years to meet UK accounting
          and tax (HMRC) requirements.
        </li>
        <li>
          <strong>Analytics data:</strong> individual analytics data retained for up to 14 months;
          aggregated data may be kept longer.
        </li>
        <li>
          <strong>Marketing opt-outs:</strong> if you opt out, we keep a minimal record indefinitely
          so that we can honour your choice.
        </li>
      </UL>

      <H2 id="rights">12. Your rights</H2>
      <P>Under the UK GDPR you have the right to:</P>
      <UL>
        <li>
          <strong>Access</strong> a copy of the personal data we hold about you
        </li>
        <li>
          <strong>Rectification</strong> of inaccurate or incomplete data
        </li>
        <li>
          <strong>Erasure</strong> of your data (the &quot;right to be forgotten&quot;)
        </li>
        <li>
          <strong>Restriction</strong> of processing in certain circumstances
        </li>
        <li>
          <strong>Portability</strong> — to receive your data in a machine-readable format
        </li>
        <li>
          <strong>Object</strong> to processing based on legitimate interests, including profile
          listings; and an <strong>absolute right to object to direct marketing</strong> at any time
        </li>
        <li>
          <strong>Withdraw consent</strong> at any time where we rely on consent
        </li>
      </UL>
      <P>
        To exercise any of these rights, email{' '}
        <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>. We will respond within one month. You
        will not normally have to pay a fee.
      </P>

      <H2 id="complaints">13. Complaints</H2>
      <P>
        If you are unhappy with how we have handled your data, please contact us first at{' '}
        <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>. We will acknowledge your complaint
        within 30 days and work to resolve it.
      </P>
      <P>
        You also have the right to complain to the Information Commissioner&apos;s Office (ICO) at any
        time. TendorAI Ltd&apos;s ICO registration as a data controller is in progress. You can
        contact the ICO at <A href="https://ico.org.uk">ico.org.uk</A>.
      </P>

      <H2 id="changes">14. Changes to this policy</H2>
      <P>
        We may update this Privacy Policy from time to time. We will post any significant changes on
        this page and update the &quot;last updated&quot; date above. Your continued use of our
        services after changes are posted constitutes acceptance of the updated policy.
      </P>

      <H2 id="contact">15. Contact us</H2>
      <P>
        TendorAI Ltd
        <br />
        {REGISTERED_OFFICE}
        <br />
        Email: <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>
      </P>
    </main>
  );
}
