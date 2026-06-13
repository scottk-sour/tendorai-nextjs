export default function TrustBar() {
  // Vertical padding aligned to the page rhythm (py-20 md:py-24, the value
  // used by every other body section). Heading uses the same font-serif /
  // size / weight as the global .section-header h2 rule so the section
  // typography matches Problem / Industries / Demo / Pricing.
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl border border-gray-100 px-8 py-10 text-center">
          <svg
            className="w-10 h-10 text-purple-600 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text)] mb-3.5">
            Built on Verified UK Data
          </h2>
          <p className="text-[var(--text2)] text-base max-w-[560px] mx-auto leading-relaxed">
            TendorAI profiles are built from authoritative UK sources &mdash; SRA Solicitors Register,
            ICAEW Chartered Accountant directory, FCA Financial Services Register, and Companies House.
            63,406 verified UK firms across SRA, ICAEW, FCA, Propertymark, and Companies House &mdash; so AI
            systems see accurate, trustworthy information from day one.
          </p>
        </div>
      </div>
    </section>
  );
}
