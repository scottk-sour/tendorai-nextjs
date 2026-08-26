'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ChecklistItem {
  label: string;
  points: number;
}

interface Section {
  title: string;
  maxPoints: number;
  items: ChecklistItem[];
}

const sections: Section[] = [
  {
    title: 'Directory & Entity Presence',
    maxPoints: 25,
    items: [
      { label: 'Firm is listed on TendorAI directory', points: 10 },
      { label: 'Google Business Profile is claimed and complete', points: 5 },
      { label: 'Bing Places listing exists', points: 5 },
      { label: 'Firm name/address/phone consistent across all directories', points: 5 },
    ],
  },
  {
    title: 'Schema & Structured Data',
    maxPoints: 25,
    items: [
      { label: 'LegalService, AccountingService or FinancialService schema on website', points: 10 },
      { label: 'LocalBusiness schema with correct regulatory details', points: 5 },
      { label: 'FAQPage schema on at least one page', points: 5 },
      { label: 'BreadcrumbList schema present', points: 5 },
    ],
  },
  {
    title: 'Content & Citations',
    maxPoints: 25,
    items: [
      { label: 'At least one blog post targeting an AI-style question (e.g. "what does a solicitor do")', points: 10 },
      { label: 'Firm is mentioned on at least one third-party site', points: 5 },
      { label: 'Regulatory accreditation mentioned on the website (SRA number, ICAEW membership etc.)', points: 5 },
      { label: 'Client testimonials or case studies published on the website', points: 5 },
    ],
  },
  {
    title: 'AI Visibility Signals',
    maxPoints: 25,
    items: [
      { label: 'Firm has run an AI visibility report on TendorAI', points: 10 },
      { label: 'AI tools return the firm\u2019s name when queried', points: 5 },
      { label: 'Firm appears in at least one AI-generated "find me a [profession] in [city]" result', points: 5 },
      { label: 'TendorAI Pro schema is installed and syncing', points: 5 },
    ],
  },
];

const STORAGE_KEY = 'tendorai-aeo-checklist';

function getScoreBand(score: number) {
  if (score <= 40) return {
    label: 'Your firm is largely invisible to AI tools.',
    cta: 'Start with a free TendorAI profile.',
    ctaHref: '/vendor-signup',
    ctaLabel: 'Create Free Profile',
    color: 'bg-red-50 border-red-200 text-red-800',
  };
  if (score <= 70) return {
    label: 'You have some foundations in place.',
    cta: 'TendorAI Pro will accelerate your visibility.',
    ctaHref: '/pricing',
    ctaLabel: 'See TendorAI Pro',
    color: 'bg-amber-50 border-amber-200 text-amber-800',
  };
  if (score <= 90) return {
    label: 'Good foundations.',
    cta: 'Focus on content and citation building.',
    ctaHref: '/resources',
    ctaLabel: 'View Resources',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  return {
    label: 'Excellent.',
    cta: 'Your firm is well positioned for AI visibility.',
    ctaHref: '/ai-visibility-report',
    ctaLabel: 'Run an AI Visibility Report',
    color: 'bg-green-50 border-green-200 text-green-800',
  };
}

export default function AeoChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const toggle = (sectionIdx: number, itemIdx: number) => {
    const key = `${sectionIdx}-${itemIdx}`;
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const score = sections.reduce((total, section, si) =>
    total + section.items.reduce((sTotal, item, ii) =>
      sTotal + (checked[`${si}-${ii}`] ? item.points : 0), 0), 0);

  const band = getScoreBand(score);

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-brand-gradient text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Visibility Readiness Checklist</h1>
          <p className="text-lg text-purple-100 max-w-2xl">
            How ready is your firm for AI search? Tick each item to see your readiness score out of 100. Built specifically for UK regulated professional services firms.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Score Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 sticky top-20 z-10 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-900">Your AI Visibility Readiness Score</span>
            <span className="text-2xl font-bold text-purple-600">{score}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, si) => {
            const sectionScore = section.items.reduce((t, item, ii) =>
              t + (checked[`${si}-${ii}`] ? item.points : 0), 0);

            return (
              <div key={si} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">{section.title}</h2>
                  <span className="text-sm font-medium text-purple-600">{sectionScore}/{section.maxPoints}</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.items.map((item, ii) => {
                    const key = `${si}-${ii}`;
                    const isChecked = !!checked[key];
                    return (
                      <label
                        key={key}
                        className="flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(si, ii)}
                          className="mt-0.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-5 h-5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm ${isChecked ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {item.label}
                          </span>
                        </div>
                        <span className={`text-xs font-medium flex-shrink-0 px-2 py-0.5 rounded-full ${isChecked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {item.points}pts
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Score Band */}
        <div className={`mt-8 rounded-xl border p-6 ${band.color}`}>
          <p className="font-semibold mb-1">{score}/100 &mdash; {band.label}</p>
          <p className="text-sm mb-4">{band.cta}</p>
          <Link
            href={band.ctaHref}
            className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            {band.ctaLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
