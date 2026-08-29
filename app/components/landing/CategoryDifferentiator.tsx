export default function CategoryDifferentiator() {
  return (
    <section
      aria-label="category differentiator"
      className="py-12 md:py-16 bg-white border-y border-[var(--border)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-serif text-xl md:text-2xl lg:text-3xl text-[var(--text)] leading-snug">
          Monitor-only tools tell you the building is on fire. Agencies put the
          fire out at <span className="font-semibold">£1,500–£8,000 per month</span>.{' '}
          <span className="gradient-text font-bold">TendorAI does both at £999.</span>
        </p>
      </div>
    </section>
  );
}
