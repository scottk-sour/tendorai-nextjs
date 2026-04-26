'use client';

import { useState, useEffect, useMemo } from 'react';
import TierGate from './TierGate';

const GBP_CATEGORY_MAP: Record<string, string> = {
  solicitor: 'Solicitor',
  accountant: 'Accountant',
  'mortgage-advisor': 'Mortgage Broker',
  'estate-agent': 'Real Estate Agent',
  'office-equipment': 'Office Equipment Supplier',
};

interface GbpChecklistCardProps {
  vendorId: string;
  tier: string;
  company: string;
  vendorType?: string;
  website?: string;
  phone?: string;
  city?: string;
  postcode?: string;
  address?: string;
  description?: string;
  services?: string[];
  practiceAreas?: string[];
}

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  autoPass: boolean;
}

export default function GbpChecklistCard({
  vendorId,
  tier,
  company,
  vendorType,
  website,
  phone,
  city,
  postcode,
  address,
  description,
  services,
  practiceAreas,
}: GbpChecklistCardProps) {
  const storageKey = `gbp-checklist-${vendorId}`;

  const [manualChecks, setManualChecks] = useState<Record<string, boolean>>({});
  const [showConnectModal, setShowConnectModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setManualChecks(JSON.parse(saved));
    } catch { /* localStorage unavailable */ }
  }, [storageKey]);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(manualChecks));
    } catch { /* localStorage unavailable */ }
  }, [manualChecks, storageKey]);

  const suggestedCategory = GBP_CATEGORY_MAP[vendorType || ''] || 'Local Business';
  const servicesList = vendorType === 'solicitor'
    ? (practiceAreas || [])
    : (services || []);

  const checklist: ChecklistItem[] = useMemo(() => [
    {
      id: 'business-name',
      label: 'Business name matches exactly',
      description: `Your GBP name should be "${company}" — exactly as registered, no keyword stuffing.`,
      autoPass: !!company,
    },
    {
      id: 'category',
      label: `Primary category set to "${suggestedCategory}"`,
      description: `Set your primary GBP category to "${suggestedCategory}" for best AI match.`,
      autoPass: false,
    },
    {
      id: 'address',
      label: 'Full address listed',
      description: address && city ? `Verify: ${address}, ${city}${postcode ? ` ${postcode}` : ''}` : 'Add your full business address to GBP.',
      autoPass: !!(address && city),
    },
    {
      id: 'phone',
      label: 'Phone number added',
      description: phone ? `Your phone (${phone}) should match your GBP listing.` : 'Add a local phone number to your GBP listing.',
      autoPass: !!phone,
    },
    {
      id: 'website',
      label: 'Website URL added',
      description: website ? `Your primary website (${website}) should be your GBP link.` : 'Add your website URL to GBP.',
      autoPass: !!website,
    },
    {
      id: 'tendorai-link',
      label: 'TendorAI profile as secondary website',
      description: `Add https://www.tendorai.com/suppliers/profile/${vendorId} as an additional website in GBP.`,
      autoPass: false,
    },
    {
      id: 'services',
      label: 'Services listed in GBP',
      description: servicesList.length > 0
        ? `Add these services to your GBP: ${servicesList.slice(0, 5).join(', ')}${servicesList.length > 5 ? '...' : ''}`
        : 'List your key services in your GBP profile.',
      autoPass: false,
    },
    {
      id: 'review-keywords',
      label: 'Ask for reviews mentioning services',
      description: `Ask happy clients to mention "${servicesList[0] || company}" and "${city || 'your area'}" in their Google reviews.`,
      autoPass: false,
    },
    {
      id: 'photos',
      label: 'At least 5 photos uploaded',
      description: 'Upload photos of your office, team, and work. Businesses with photos get 42% more direction requests.',
      autoPass: false,
    },
    {
      id: 'description',
      label: 'Business description written',
      description: description
        ? `Your description is ${description.length} chars. Aim for 500-750 chars with key service terms.`
        : 'Write a 500-750 character description including your services and location.',
      autoPass: !!(description && description.length >= 100),
    },
    {
      id: 'hours',
      label: 'Opening hours set',
      description: 'Set accurate opening hours. Mark special hours for holidays.',
      autoPass: false,
    },
  ], [company, suggestedCategory, address, city, postcode, phone, website, vendorId, servicesList, description]);

  const toggleCheck = (id: string) => {
    setManualChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const autoPassedCount = checklist.filter(item => item.autoPass).length;
  const manualCheckedCount = checklist.filter(item => !item.autoPass && manualChecks[item.id]).length;
  const completedCount = autoPassedCount + manualCheckedCount;
  const percentage = Math.round((completedCount / checklist.length) * 100);

  // Percentage ring
  const ringSize = 72;
  const radius = (ringSize - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const ringColor = percentage >= 80 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Google Business Profile Checklist</h3>
          <p className="text-sm text-gray-500 mt-1">Manual checklist — tick items as you complete them in Google Business Profile</p>
        </div>
      </div>

      {/* Connect GBP button */}
      <div className="relative">
        <button
          onClick={() => setShowConnectModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
          </svg>
          Connect Google Business Profile
        </button>

        {showConnectModal && (
          <div className="absolute left-0 top-full mt-2 z-10 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">Coming Soon</h4>
              <button onClick={() => setShowConnectModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Google Business Profile integration is coming soon. You&apos;ll be able to connect your GBP account to auto-sync your business details and track review performance directly from TendorAI.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              For now, use the checklist below to manually optimise your listing.
            </p>
          </div>
        )}
      </div>

      <TierGate
        currentTier={tier}
        requiredTier="pro"
        featureName="GBP Checklist"
        featureDescription="Get a personalised Google Business Profile checklist based on your firm data. Pro tier only."
      >
        <div className="space-y-5">
          {/* Progress ring */}
          <div className="flex items-center gap-4">
            <svg width={ringSize} height={ringSize} className="transform -rotate-90 flex-shrink-0">
              <circle cx={ringSize / 2} cy={ringSize / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={4} />
              <circle cx={ringSize / 2} cy={ringSize / 2} r={radius} fill="none" stroke={ringColor} strokeWidth={4}
                strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-500" />
              <text x="50%" y="50%" textAnchor="middle" dy="0.35em"
                className="text-sm font-bold"
                style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%' }}
                fill={ringColor}>
                {percentage}%
              </text>
            </svg>
            <div>
              <p className="font-medium text-gray-900">{completedCount} of {checklist.length} completed</p>
              <p className="text-sm text-gray-500">
                {autoPassedCount} auto-detected, {manualCheckedCount} manually checked
              </p>
            </div>
          </div>

          {/* Checklist items */}
          <div className="space-y-2">
            {checklist.map(item => {
              const isChecked = item.autoPass || manualChecks[item.id];
              return (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    isChecked
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  {item.autoPass ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <input
                      type="checkbox"
                      checked={!!manualChecks[item.id]}
                      onChange={() => toggleCheck(item.id)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-0.5 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${isChecked ? 'text-green-800' : 'text-gray-900'}`}>
                      {item.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${isChecked ? 'text-green-600' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </TierGate>
    </div>
  );
}
