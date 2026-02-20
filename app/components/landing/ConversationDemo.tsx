export default function ConversationDemo() {
  return (
    <section aria-label="AI recommendation demo" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>This is what AI recommendations look like</h2>
          <p>
            When someone asks AI for a supplier, this is the kind of answer they get.
            Is your business in it?
          </p>
        </div>

        <div className="max-w-[660px] mx-auto">
          {/* Chat container */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-8 space-y-5">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#e8edf4] rounded-2xl rounded-br-md px-5 py-3 max-w-[85%]">
                <p className="text-sm text-[var(--text)]">
                  I need a conveyancing solicitor in Bristol. Who do you recommend?
                </p>
              </div>
            </div>

            {/* AI response */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md px-5 py-4 max-w-[95%] border border-[var(--border)] shadow-sm">
                <p className="text-sm text-[var(--text)] mb-3">
                  Here are three highly-rated conveyancing solicitors in Bristol:
                </p>
                <ol className="text-sm text-[var(--text2)] space-y-2.5 list-decimal list-inside mb-3">
                  <li>
                    <strong className="text-[var(--primary-blue)]">Harrison Scott Solicitors</strong> — Specialist
                    residential conveyancing, CQS accredited, fixed fees from £995
                  </li>
                  <li>
                    <strong className="text-[var(--primary-blue)]">Avon Legal Partners</strong> — Full-service
                    firm with dedicated conveyancing team, Lexcel certified
                  </li>
                  <li>
                    <strong className="text-[var(--primary-blue)]">Bristol Property Law</strong> — Boutique
                    conveyancing practice, 4.8 star rating, typical completion in 8 weeks
                  </li>
                </ol>
                <p className="text-sm text-[var(--text2)]">
                  All three are SRA-regulated with verified pricing and client reviews.
                </p>
              </div>
            </div>

            {/* Source attribution */}
            <div className="flex justify-start">
              <div className="bg-[#f0eef8] rounded-xl px-4 py-2.5 border border-[#e0daf0] max-w-[85%]">
                <p className="text-xs text-[var(--purple-start)] font-medium">
                  Source: Verified profiles from TendorAI
                </p>
              </div>
            </div>

            {/* User follow-up */}
            <div className="flex justify-end">
              <div className="bg-[#e8edf4] rounded-2xl rounded-br-md px-5 py-3 max-w-[85%]">
                <p className="text-sm text-[var(--text)]">
                  What are Harrison Scott&apos;s fees for a £350k property?
                </p>
              </div>
            </div>

            {/* AI follow-up response */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md px-5 py-4 max-w-[95%] border border-[var(--border)] shadow-sm">
                <p className="text-sm text-[var(--text)]">
                  Based on their TendorAI profile, Harrison Scott charges <strong>£1,250 + VAT</strong> for
                  properties valued £250k–£500k. This includes searches, land registry, and SDLT filing.
                  They also offer a no-completion, no-fee guarantee.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <p className="text-center text-xs text-[var(--text3)] mt-5">
            Simulated conversation. Actual AI responses depend on your profile data.
          </p>
        </div>
      </div>
    </section>
  );
}
