'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CheckItem {
  id: string;
  label: string;
  why: string;
}

interface Section {
  title: string;
  items: CheckItem[];
}

const sections: Section[] = [
  {
    title: 'Regulatory Data',
    items: [
      { id: 'reg-membership', label: 'Your ICAEW or ACCA membership number appears on your website', why: 'AI models use professional membership numbers to verify firm legitimacy. Without it, they cannot confirm you are a qualified practice.' },
      { id: 'reg-jsonld', label: 'Your membership number is in JSON-LD schema, not just visible text', why: 'Plain text is for humans. JSON-LD is machine-readable and directly consumed by AI crawlers including GPTBot and ClaudeBot.' },
      { id: 'reg-sameas', label: 'Your schema includes a sameAs link to your ICAEW or ACCA register entry', why: 'Cross-referencing your website data against the official register is how AI models verify your credentials are current and legitimate.' },
      { id: 'reg-namematch', label: 'Your firm name on the register matches your website exactly', why: 'Any mismatch between your register entry and website reduces AI confidence in your firm identity and suppresses recommendations.' },
      { id: 'reg-companies', label: 'Your Companies House registration number appears in your schema', why: 'Companies House data is a high-trust source for AI models. Including it as a structured identifier strengthens your entity verification.' },
    ],
  },
  {
    title: 'Schema Markup',
    items: [
      { id: 'schema-type', label: 'Your website uses AccountingService schema (not just LocalBusiness)', why: 'AccountingService is the correct Schema.org type for accountancy practices. It signals to AI exactly what category of service you provide.' },
      { id: 'schema-knows', label: 'Your schema includes a knowsAbout array listing your specific services', why: 'Generic schema is ignored. Explicit service listings (R&D tax credits, management accounts, self-assessment) allow AI to match you to specific client queries.' },
      { id: 'schema-area', label: 'Your schema includes areaServed with your geographic coverage', why: 'AI models use areaServed to match local recommendations. Without it, you may be excluded from location-specific queries even in your own city.' },
      { id: 'schema-desc', label: 'Your schema includes a description field with your core specialism', why: 'The description field is one of the first things AI models extract when building a firm summary for a recommendation response.' },
      { id: 'schema-valid', label: "Your JSON-LD validates without errors in Google's Rich Results Test", why: 'Invalid schema is ignored by crawlers. Validation errors mean your structured data is not being read regardless of what it contains.' },
    ],
  },
  {
    title: 'Directory Presence',
    items: [
      { id: 'dir-icaew', label: "Your firm is listed on ICAEW's Find a Chartered Accountant directory", why: 'ICAEW\u2019s directory is a primary authoritative source for AI models recommending UK chartered accountants.' },
      { id: 'dir-accweb', label: "Your firm is listed on AccountingWEB's directory", why: 'AccountingWEB is a high-domain-authority UK accountancy resource that AI models cite regularly in recommendation responses.' },
      { id: 'dir-gbp', label: 'Your Google Business Profile is claimed, verified and complete', why: 'Google AI Overviews pulls heavily from GBP for local recommendations. An incomplete or unverified profile means you\u2019re invisible in local AI queries.' },
      { id: 'dir-nap', label: 'Your firm name, address and phone number are identical across all directories', why: 'NAP inconsistency is one of the most common reasons AI models exclude firms from recommendations. A single mismatch reduces confidence across all sources.' },
      { id: 'dir-tendorai', label: 'Your firm has a verified profile on TendorAI', why: 'TendorAI\u2019s directory is crawled by AI models and combines regulatory verification with schema \u2014 creating a single authoritative source for your firm data.' },
    ],
  },
  {
    title: 'Content',
    items: [
      { id: 'content-services', label: 'Your website has at least one page per core service specialism', why: 'AI models need dedicated, specific content to match your firm to specific client queries. A single generic services page is not sufficient.' },
      { id: 'content-qa', label: 'At least one page answers a specific client question directly (Q&A format)', why: 'AI tools prefer to cite content that directly answers questions in the format they reproduce. Q&A content is the highest-citation content type.' },
      { id: 'content-about', label: 'Your About page states your qualifications, founding year and specialism explicitly', why: 'AI models use About page content to build entity summaries. Vague About pages produce vague or no recommendations.' },
      { id: 'content-local', label: 'You have at least one piece of content targeting a local query', why: 'Local AI queries are the fastest-growing category for professional services. Location-specific content directly improves local recommendation rates.' },
      { id: 'content-reg', label: 'Your content references your regulatory body and membership status explicitly', why: 'Regulatory references in content reinforce the schema signals and help AI models build a consistent, trustworthy picture of your firm.' },
    ],
  },
  {
    title: 'Tracking',
    items: [
      { id: 'track-chatgpt', label: 'You have tested whether your firm appears in ChatGPT recommendations', why: 'You cannot improve what you don\u2019t measure. Manual testing takes two minutes and immediately reveals whether your current setup is working.' },
      { id: 'track-perplexity', label: 'You have tested whether your firm appears in Perplexity recommendations', why: 'Perplexity is currently the most active AI platform for citing specific UK professional services firms by name.' },
      { id: 'track-score', label: 'You track your AI visibility score over time', why: 'One-off checks miss trends. Regular tracking shows whether changes you make are improving your recommendation rate.' },
      { id: 'track-competitor', label: 'You monitor competitor AI visibility in your area', why: 'AI visibility is relative. If a competitor improves their setup, your relative recommendation rate falls even if your absolute score stays the same.' },
    ],
  },
];

const STORAGE_KEY = 'tendorai-accountant-checklist';

function getScoreBand(count: number) {
  if (count <= 8) return { label: 'Critical \u2014 your practice is almost certainly invisible to AI tools', color: 'text-red-600', bg: 'bg-red-50 border-red-200', cta: { label: 'Claim Your Free Profile', href: '/vendor-signup' } };
  if (count <= 16) return { label: 'Developing \u2014 some signals present but significant gaps remain', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', cta: { label: 'See TendorAI Pro', href: '/for-vendors' } };
  if (count <= 20) return { label: 'Strong \u2014 well-positioned for AI recommendations', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', cta: { label: 'Run Your AI Visibility Report', href: '/ai-visibility-report' } };
  return { label: 'Excellent \u2014 your practice is optimised for AI discovery', color: 'text-green-600', bg: 'bg-green-50 border-green-200', cta: { label: 'Check Your AI Visibility', href: '/ai-visibility-report' } };
}

const totalItems = sections.reduce((t, s) => t + s.items.length, 0);

export default function AccountantChecklistClient() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch { /* ignore */ }
  }, [checked]);

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const count = Object.values(checked).filter(Boolean).length;
  const band = getScoreBand(count);

  return (
    <div>
      {/* Score */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-center sticky top-20 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-900">Items completed</span>
          <span className={`text-2xl font-bold ${band.color}`}>{count}/{totalItems}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div className="bg-purple-600 h-3 rounded-full transition-all duration-300" style={{ width: `${(count / totalItems) * 100}%` }} />
        </div>
        <div className={`inline-block px-4 py-2 rounded-lg border text-sm font-medium ${band.bg} ${band.color}`}>{band.label}</div>
        <div className="mt-3">
          <Link href={band.cta.href} className="inline-flex items-center justify-center px-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all text-sm">{band.cta.label}</Link>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => {
          const sectionCount = section.items.filter(item => checked[item.id]).length;
          return (
            <div key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">{section.title}</h2>
                <span className="text-sm font-medium text-purple-600">{sectionCount}/{section.items.length}</span>
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <label key={item.id} className="flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)} className="mt-0.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-medium ${checked[item.id] ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item.label}</span>
                      <p className="text-xs text-gray-500 mt-1">{item.why}</p>
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
