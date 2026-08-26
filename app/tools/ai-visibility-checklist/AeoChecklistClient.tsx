'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CheckItem {
  id: string;
  label: string;
  points: number;
}

interface Section {
  title: string;
  maxPoints: number;
  items: CheckItem[];
}

const sections: Section[] = [
  {
    title: 'Directory & Entity Presence',
    maxPoints: 25,
    items: [
      { id: 'dir-tendorai', label: 'Firm is listed on TendorAI directory', points: 10 },
      { id: 'dir-gbp', label: 'Google Business Profile is claimed and complete', points: 5 },
      { id: 'dir-bing', label: 'Bing Places listing exists', points: 5 },
      { id: 'dir-nap', label: 'Firm name/address/phone consistent across all directories', points: 5 },
    ],
  },
  {
    title: 'Schema & Structured Data',
    maxPoints: 25,
    items: [
      { id: 'schema-service', label: 'LegalService, AccountingService or FinancialService schema on website', points: 10 },
      { id: 'schema-local', label: 'LocalBusiness schema with correct regulatory details', points: 5 },
      { id: 'schema-faq', label: 'FAQPage schema on at least one page', points: 5 },
      { id: 'schema-breadcrumb', label: 'BreadcrumbList schema present', points: 5 },
    ],
  },
  {
    title: 'Content & Citations',
    maxPoints: 25,
    items: [
      { id: 'content-blog', label: 'At least one blog post targeting an AI-style question', points: 10 },
      { id: 'content-mention', label: 'Firm is mentioned on at least one third-party site', points: 5 },
      { id: 'content-reg', label: 'Regulatory accreditation mentioned on the website', points: 5 },
      { id: 'content-testimonials', label: 'Client testimonials or case studies published on the website', points: 5 },
    ],
  },
  {
    title: 'AI Visibility Signals',
    maxPoints: 25,
    items: [
      { id: 'ai-aeo', label: 'Firm has run an AI visibility report on TendorAI', points: 10 },
      { id: 'ai-named', label: 'AI tools return the firm\u2019s name when queried', points: 5 },
      { id: 'ai-local', label: 'Firm appears in at least one AI-generated local result', points: 5 },
      { id: 'ai-pro', label: 'TendorAI Pro schema is installed and syncing', points: 5 },
    ],
  },
];

const STORAGE_KEY = 'tendorai-aeo-checklist';

function getScoreBand(score: number) {
  if (score <= 40) return {
    label: 'Your firm is largely invisible to AI tools. Start with a free TendorAI profile.',
    color: 'text-red-600',
    bg: 'bg-red-50 border-red-200',
    cta: { label: 'Claim Your Free Profile', href: '/vendor-signup' },
  };
  if (score <= 70) return {
    label: 'You have some foundations in place. TendorAI Pro will accelerate your visibility.',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    cta: { label: 'See TendorAI Pro', href: '/ai-visibility-platform' },
  };
  if (score <= 90) return {
    label: 'Good foundations. Focus on content and citation building.',
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    cta: { label: 'Run Your AI Visibility Report', href: '/ai-visibility-report' },
  };
  return {
    label: 'Excellent. Your firm is well positioned for AI visibility.',
    color: 'text-green-600',
    bg: 'bg-green-50 border-green-200',
    cta: { label: 'Check Your AI Visibility', href: '/ai-visibility-report' },
  };
}

export default function AeoChecklistClient() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch { /* ignore */ }
  }, [checked]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const score = sections.reduce((total, section) =>
    total + section.items.reduce((s, item) => s + (checked[item.id] ? item.points : 0), 0), 0);

  const band = getScoreBand(score);

  return (
    <div>
      {/* Score */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-center">
        <div className={`text-5xl font-bold ${band.color} mb-1`}>{score}</div>
        <div className="text-sm text-gray-500 mb-3">out of 100</div>
        <div className={`inline-block px-4 py-2 rounded-lg border text-sm font-medium ${band.bg} ${band.color}`}>
          {band.label}
        </div>
        <div className="mt-4">
          <Link
            href={band.cta.href}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all text-sm"
          >
            {band.cta.label}
          </Link>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => {
          const sectionScore = section.items.reduce((s, item) => s + (checked[item.id] ? item.points : 0), 0);
          return (
            <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">{section.title}</h3>
                <span className={`text-sm font-semibold ${sectionScore === section.maxPoints ? 'text-green-600' : 'text-gray-500'}`}>
                  {sectionScore}/{section.maxPoints}
                </span>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={!!checked[item.id]}
                      onChange={() => toggle(item.id)}
                      className="mt-0.5 h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <span className={`text-sm ${checked[item.id] ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.label}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">({item.points}pts)</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
