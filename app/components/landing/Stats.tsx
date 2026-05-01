'use client';

import StatCounter from './StatCounter';

interface StatItem {
  number?: number;
  suffix?: string;
  displayText?: string;
  label: string;
}

const stats: StatItem[] = [
  { number: 12793, suffix: '', label: 'Verified UK Firms' },
  { number: 6, suffix: '', label: 'AI Platforms Tracked' },
  { displayText: 'From £299/mo', label: '3 of 50 early adopter spots taken' },
  { displayText: 'Self-Serve', label: 'No Agency' },
];

export default function Stats() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-2">
                {stat.displayText ? (
                  <span>{stat.displayText}</span>
                ) : stat.number !== undefined ? (
                  <StatCounter end={stat.number} suffix={stat.suffix || ''} />
                ) : null}
              </div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
