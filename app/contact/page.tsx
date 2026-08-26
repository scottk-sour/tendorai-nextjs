import { Metadata } from 'next';

const CAL_LINK = 'https://cal.com/tendorai/15min';
const CONTACT_EMAIL = 'scott.davies@tendorai.com';

export const metadata: Metadata = {
  title: 'Book a call',
  description:
    'Book a 15-minute call with TendorAI to talk about AI visibility for your firm. For UK solicitors. No obligation.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">Book a call</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            A 15-minute call, no obligation, for UK solicitors. We&rsquo;ll look at what AI
            assistants can currently read about your firm and answer any questions you have.
          </p>
        </div>
      </section>

      {/* Booking — Cal.com */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-white">
            <iframe
              src={CAL_LINK}
              title="Book a 15-minute call with TendorAI"
              className="w-full block"
              style={{ height: '780px', border: 0 }}
              loading="lazy"
            />
          </div>

          {/* Fallback for anyone who can't use the embed — blocked iframes,
              strict corporate browsers, assistive tech, no JavaScript. */}
          <div className="mt-6 text-center text-sm text-[var(--text2)]">
            <p className="mb-2">
              If the booking calendar doesn&rsquo;t load,{' '}
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--purple-start)] underline hover:text-[var(--purple-end)]"
              >
                open it in a new tab
              </a>
              .
            </p>
            <p>
              Or email{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Booking a call about AI visibility')}`}
                className="text-[var(--purple-start)] underline hover:text-[var(--purple-end)]"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              with your firm name, website and SRA number, and we&rsquo;ll reply with times.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
