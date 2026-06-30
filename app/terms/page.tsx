// app/terms/page.tsx
//
// ─────────────────────────────────────────────────────────────────────────────
// BEFORE YOU MERGE:
//   1. Fill REGISTERED_OFFICE (search "FILL:").
//   2. Three business decisions are baked in below — change the wording in
//      §4 (refunds/cancellation) or §11 (liability cap) if you want different:
//        • Refunds:      no refunds for part-periods
//        • Cancellation: cancel anytime, access to end of paid month
//        • Liability cap: greater of fees-paid-in-12-months or £100
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';

const REGISTERED_OFFICE = '[FILL: registered office address, Wales]';
const CONTACT_EMAIL = 'scott.davies@tendorai.com';
const LAST_UPDATED = '30 June 2026';

export const metadata: Metadata = {
  title: 'Terms of Service | TendorAI',
  description:
    'The terms governing use of TendorAI, the UK AI visibility platform for regulated professional-services firms.',
  alternates: { canonical: 'https://www.tendorai.com/terms' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Terms of Service | TendorAI',
    description: 'The terms governing use of the TendorAI AI visibility platform.',
    url: 'https://www.tendorai.com/terms',
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

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">Terms of Service</h1>
      <p className="mb-10 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

      <div className="mb-10 rounded-lg border border-indigo-100 bg-indigo-50/60 p-5">
        <p className="mb-2 text-sm font-semibold text-indigo-900">In plain terms</p>
        <p className="mb-0 text-[15px] leading-relaxed text-indigo-900/90">
          TendorAI is an AI visibility platform for UK regulated firms. We generate scores,
          diagnostics and draft content using AI. Those outputs are starting points, not finished
          work or professional advice — you are responsible for checking and approving anything before
          you publish it or rely on it. We can&apos;t guarantee that any AI assistant will recommend
          your firm. These Terms set out the rest.
        </p>
      </div>

      <H2 id="introduction">1. Who we are and these Terms</H2>
      <P>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the TendorAI
        website at tendorai.com and all related services, tools and content (together, the
        &quot;Service&quot;).
      </P>
      <P>
        The Service is provided by TendorAI Ltd (&quot;TendorAI&quot;, &quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;), a company registered in England and Wales under company
        number <strong>16521860</strong>, with its registered office at {REGISTERED_OFFICE}.
      </P>
      <P>
        By accessing or using the Service, or by registering for an account, you agree to be bound by
        these Terms. If you do not agree, do not use the Service.
      </P>

      <H2 id="service">2. What TendorAI is</H2>
      <P>
        TendorAI is an AI visibility platform. The Service measures how often AI assistants reference
        or recommend regulated professional-services firms, diagnoses why a firm may be under-
        represented, and produces recommendations and draft content intended to help close those
        gaps. The Service includes free tools, a free account tier, and a paid &quot;Pro&quot;
        subscription.
      </P>

      <H2 id="accounts">3. Eligibility and accounts</H2>
      <UL>
        <li>
          The Service is for business and professional use only. By using it you confirm you are
          acting on behalf of a business and not as a consumer.
        </li>
        <li>
          You confirm you are authorised to act for the firm whose account you create or manage, and
          to accept these Terms on its behalf.
        </li>
        <li>
          You must provide accurate account information and keep it up to date, and you are
          responsible for keeping your login credentials secure and for activity under your account.
        </li>
      </UL>

      <H2 id="subscription">4. Free tier, Pro subscription and billing</H2>
      <UL>
        <li>
          <strong>Free tier:</strong> certain features are available at no cost. We may change or
          withdraw free features at any time.
        </li>
        <li>
          <strong>Pro subscription:</strong> the Pro plan costs £299 per month. Prices are inclusive
          of any applicable taxes; we are not currently VAT-registered, and if that changes we will
          give you notice before VAT is added.
        </li>
        <li>
          <strong>Payment and renewal:</strong> payment is taken in advance via Stripe. The
          subscription renews automatically each month until cancelled.
        </li>
        <li>
          <strong>Cancellation:</strong> you may cancel at any time. Cancellation takes effect at the
          end of your current paid month; you keep Pro access until then and are not billed again
          afterwards.
        </li>
        <li>
          <strong>Refunds:</strong> fees already paid are non-refundable, including for partial
          periods, except where required by law.
        </li>
        <li>
          <strong>Price changes:</strong> we may change the Pro price on at least 30 days&apos; notice
          before your next renewal. Continuing after the change takes effect means you accept the new
          price.
        </li>
        <li>
          <strong>Failed payment:</strong> if a payment fails, we may suspend Pro features or downgrade
          your account to the free tier until payment is resolved.
        </li>
      </UL>

      <H2 id="ai-outputs">5. AI-generated content and outputs</H2>
      <P>
        Scores, diagnostics, recommendations and draft content produced by the Service are generated
        using artificial intelligence and automated analysis. You acknowledge and agree that:
      </P>
      <UL>
        <li>
          These outputs may contain errors, omissions or inaccuracies, and are provided as drafts and
          suggestions only.
        </li>
        <li>
          You are responsible for reviewing, verifying and approving any output before you publish it,
          send it, or otherwise rely on it.
        </li>
        <li>
          The outputs are not legal, regulatory, accounting, financial or other professional advice,
          and do not replace your own professional judgement or that of a qualified adviser.
        </li>
        <li>
          You remain solely responsible for any content you publish and for your firm&apos;s
          compliance with its regulator (for example the SRA, ICAEW, FCA or Propertymark) and with
          advertising, consumer and other applicable law.
        </li>
      </UL>

      <H2 id="no-guarantee">6. No guarantee of results</H2>
      <P>
        The Service depends on third-party AI assistants and search platforms that we do not control
        and that change their models and behaviour without notice. We do not warrant or guarantee that
        your firm will be recommended, cited or ranked by any AI assistant, that any visibility score
        will improve, or that any particular outcome will be achieved. Any examples or projected
        results are illustrative only.
      </P>

      <H2 id="acceptable-use">7. Acceptable use</H2>
      <P>You agree not to:</P>
      <UL>
        <li>use the Service unlawfully, or in breach of any third party&apos;s rights;</li>
        <li>
          scrape, harvest, or use automated tools against the Service, or attempt to copy, reverse
          engineer or extract its underlying data, models or software;
        </li>
        <li>resell, sublicense or make the Service available to third parties except as permitted;</li>
        <li>interfere with, overload, or attempt to gain unauthorised access to the Service;</li>
        <li>submit content you do not have the right to submit, or that is false or misleading.</li>
      </UL>

      <H2 id="ip">8. Intellectual property</H2>
      <UL>
        <li>
          <strong>Our property:</strong> the Service, including the platform, software, models,
          scoring methods, branding and original content, is owned by TendorAI and protected by
          intellectual property laws.
        </li>
        <li>
          <strong>Your content:</strong> you retain ownership of the firm information and materials you
          provide. You grant us a non-exclusive licence to host, process and use that content, and to
          send it to our service providers (including AI providers), to operate and provide the
          Service.
        </li>
        <li>
          <strong>Outputs:</strong> subject to your compliance with these Terms and payment of any
          fees due, you may use the outputs the Service generates for your firm&apos;s own business
          purposes.
        </li>
      </UL>

      <H2 id="third-party">9. Third-party services and data</H2>
      <P>
        The Service relies on third-party providers, and your use involves the processing of personal
        data as described in our <A href="/privacy">Privacy Policy</A>, which forms part of these
        Terms. We are not responsible for the availability or acts of third-party platforms.
      </P>

      <H2 id="termination">10. Suspension and termination</H2>
      <P>
        We may suspend or terminate your access if you breach these Terms, provide false information,
        or act unlawfully or abusively. Except in cases of serious breach, we will give reasonable
        notice before terminating a paid account. You may stop using the Service and close your
        account at any time. Clauses that by their nature should survive termination (including
        Sections 5, 6, 8, 11 and 12) will continue to apply.
      </P>

      <H2 id="liability">11. Disclaimers and limitation of liability</H2>
      <P>
        Nothing in these Terms excludes or limits our liability for death or personal injury caused by
        our negligence, for fraud or fraudulent misrepresentation, or for any other liability that
        cannot be excluded or limited under English law.
      </P>
      <P>
        Subject to that, the Service is provided &quot;as is&quot; and &quot;as available&quot;
        without warranties of any kind, whether express or implied, including any implied warranties of
        satisfactory quality, fitness for a particular purpose, or non-infringement.
      </P>
      <P>
        Subject to the first paragraph of this Section, we are not liable for any loss of profits,
        revenue, goodwill, business or anticipated savings, or for any indirect or consequential loss;
        and our total aggregate liability arising out of or in connection with the Service shall not
        exceed the greater of (a) the total fees you paid us in the 12 months before the claim and
        (b) £100.
      </P>

      <H2 id="indemnity">12. Indemnity</H2>
      <P>
        You agree to indemnify us against all claims, losses, damages and reasonable costs (including
        legal fees) arising from content you publish using outputs from the Service, your breach of
        these Terms, or your infringement of any third party&apos;s rights or of applicable law.
      </P>

      <H2 id="changes">13. Changes to the Service and these Terms</H2>
      <P>
        We may change or discontinue features of the Service, and we may update these Terms from time
        to time. We will post material changes on this page and, for account holders, may notify you by
        email. Your continued use of the Service after changes take effect constitutes acceptance.
      </P>

      <H2 id="law">14. Governing law and jurisdiction</H2>
      <P>
        These Terms are governed by the laws of England and Wales. The courts of England and Wales have
        exclusive jurisdiction over any dispute arising out of or in connection with these Terms or the
        Service. If you have a dispute, please contact us first at{' '}
        <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A> so we can try to resolve it informally.
      </P>

      <H2 id="general">15. General</H2>
      <UL>
        <li>
          If any provision of these Terms is found invalid or unenforceable, the remaining provisions
          continue in full force, and the invalid provision will be modified to the minimum extent
          necessary to make it enforceable.
        </li>
        <li>
          These Terms, together with the Privacy Policy, are the entire agreement between you and us
          regarding the Service.
        </li>
        <li>Our failure to enforce any provision is not a waiver of it.</li>
      </UL>

      <H2 id="contact">16. Contact us</H2>
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
