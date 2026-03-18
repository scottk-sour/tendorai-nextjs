'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { SERVICES, SERVICE_KEYS } from '@/lib/constants/services';
import { PLANS } from '@/lib/constants/plans';
import { getTierLabel } from '@/app/components/dashboard/TierGate';

// ─── Solicitor constants ──────────────────────────────────────────────
const SOLICITOR_PRACTICE_AREAS = [
  'Conveyancing', 'Family Law', 'Criminal Law', 'Commercial Law',
  'Employment Law', 'Wills & Probate', 'Immigration', 'Personal Injury',
];

const SOLICITOR_ACCREDITATIONS = [
  'CQS', 'Lexcel', 'Legal 500', 'Law Society Panel',
];

const SOLICITOR_RESPONSE_TIMES = [
  { value: 'same-day', label: 'Same day' },
  { value: '24-hours', label: 'Within 24 hours' },
  { value: '48-hours', label: 'Within 48 hours' },
];

// ─── Accountant constants ─────────────────────────────────────────────
const ACCOUNTANT_SERVICES = [
  'Tax', 'Bookkeeping', 'Payroll', 'VAT', 'Self-Assessment',
  'Corporation Tax', 'Management Accounts', 'Audit', 'R&D Tax Credits',
  'Company Formation', 'Cloud Accounting',
];

const ACCOUNTANT_SOFTWARE = ['Xero', 'QuickBooks', 'Sage', 'FreeAgent'];

// ─── Mortgage Advisor constants ──────────────────────────────────────
const MORTGAGE_SERVICES = [
  'Residential Mortgages', 'Buy-to-Let', 'Remortgage', 'First-Time Buyer',
  'Equity Release', 'Commercial Mortgages', 'Protection Insurance',
];

const MORTGAGE_ACCREDITATIONS = [
  'CeMAP', 'DipFA', 'CeRER (Equity Release)', 'CF6 (Mortgage Advice)',
  'Chartered Financial Planner', 'Fellow of PFS',
];

// ─── Estate Agent constants ──────────────────────────────────────────
const ESTATE_AGENT_SERVICES = [
  'Sales', 'Lettings', 'Property Management', 'Block Management',
  'Auctions', 'Commercial Property', 'Inventory',
];

const ESTATE_AGENT_ACCREDITATIONS = [
  'NAEA Propertymark', 'ARLA Propertymark', 'RICS', 'NFOPP',
  'NFoPP Level 3', 'TDS Insured', 'Client Money Protection',
];

const PORTAL_LISTINGS = ['Rightmove', 'Zoopla', 'OnTheMarket', 'Primelocation'];

const PROPERTY_TYPES = ['Residential', 'Commercial', 'HMO', 'New Build', 'Shared Ownership'];

// ─── Types ────────────────────────────────────────────────────────────
interface FixedFee {
  service: string;
  fee: string;
}

interface IndividualSolicitor {
  name: string;
  role: string;
  specialisms: string;
  qualifications: string;
}

interface ProfileData {
  company: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  postcode: string;
  coverage: string[];
  description: string;
  yearsInBusiness: number;
  services: string[];
  brands: string[];
  certifications: string[];
  tier: string;
  vendorType: string;
  // Solicitor fields
  sraNumber: string;
  practiceAreas: string[];
  accreditations: string[];
  fixedFees: FixedFee[];
  lenderPanels: string[];
  individualSolicitors: IndividualSolicitor[];
  languages: string[];
  legalAid: boolean;
  responseTime: string;
  noWinNoFee: boolean;
  courtCoverageAreas: string[];
  // Accountant fields
  icaewFirmNumber: string;
  softwareUsed: string[];
  industrySpecialisms: string[];
  mtdCompliant: boolean;
  accaNumber: string;
  practiceCertificateNumber: string;
  minimumFeeThreshold: number;
  rdTaxCreditsSpecialist: boolean;
  feeStructureType: string;
  // Mortgage Advisor fields
  fcaNumber: string;
  wholeOfMarket: boolean;
  numberOfLenders: number;
  typicalCompletionTime: string;
  feeModel: string;
  maximumLoanSize: number;
  // Estate Agent fields
  propertymarkNumber: string;
  propertymarkQualification: string;
  portalListings: string[];
  coveragePostcodes: string[];
  averageSaleTime: string;
  achievedVsAskingPercent: number;
  managementFeePercent: number;
  tenantFindOrFullManagement: string;
  epcAssessor: boolean;
  propertyTypesHandled: string[];
  // Office Equipment fields
  leaseVsPurchase: string;
  managedPrintService: boolean;
  monthlyCostRange: string;
}

interface SubscriptionData {
  plan: string;
  internalTier: string;
  subscription: {
    id?: string;
    status?: string;
    currentPeriodEnd?: string;
    cancelAtPeriodEnd?: boolean;
  } | null;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const SERVICE_OPTIONS = SERVICE_KEYS
  .filter((key) => SERVICES[key].group === 'office-equipment')
  .map((key) => ({
    value: SERVICES[key].value,
    label: SERVICES[key].name,
    icon: SERVICES[key].icon,
  }));

// What you're missing by tier
const MISSING_BY_TIER: Record<string, string[]> = {
  free: [
    'AI Mentions tracking',
    'Analytics dashboard',
    'Full visibility breakdown & tips',
    'Unlimited products/services',
    'Monthly AI Visibility (AEO) report',
    'Request reviews',
  ],
  starter: [
    'Verified badge',
    'Unlimited products/services',
    'Weekly AI Visibility (AEO) report',
    'Detailed AI query analytics',
    'Featured placement',
    'Priority support',
    '+15 extra visibility points',
  ],
};

const DEFAULT_PROFILE: ProfileData = {
  company: '', name: '', email: '', phone: '', website: '',
  city: '', postcode: '', coverage: [], description: '',
  yearsInBusiness: 0, services: [], brands: [], certifications: [],
  tier: 'free', vendorType: 'office-equipment',
  sraNumber: '', practiceAreas: [], accreditations: [], fixedFees: [],
  lenderPanels: [], individualSolicitors: [], languages: [],
  legalAid: false, responseTime: '',
  noWinNoFee: false, courtCoverageAreas: [],
  icaewFirmNumber: '', softwareUsed: [], industrySpecialisms: [],
  mtdCompliant: false,
  accaNumber: '', practiceCertificateNumber: '', minimumFeeThreshold: 0,
  rdTaxCreditsSpecialist: false, feeStructureType: '',
  fcaNumber: '',
  wholeOfMarket: false, numberOfLenders: 0, typicalCompletionTime: '',
  feeModel: '', maximumLoanSize: 0,
  propertymarkNumber: '', propertymarkQualification: '',
  portalListings: [], coveragePostcodes: [],
  averageSaleTime: '', achievedVsAskingPercent: 0, managementFeePercent: 0,
  tenantFindOrFullManagement: '', epcAssessor: false, propertyTypesHandled: [],
  leaseVsPurchase: '', managedPrintService: false, monthlyCostRange: '',
};

export default function SettingsContent({ initialTab }: { initialTab?: string }) {
  const { getCurrentToken } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab === 'subscription' ? 'subscription' : 'profile');
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [upgradingTo, setUpgradingTo] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [newBrand, setNewBrand] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newCoverage, setNewCoverage] = useState('');
  const [newLenderPanel, setNewLenderPanel] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newSpecialism, setNewSpecialism] = useState('');
  const [newCoveragePostcode, setNewCoveragePostcode] = useState('');
  const [newCourtArea, setNewCourtArea] = useState('');

  const vendorType = profile.vendorType || 'office-equipment';
  const isSolicitor = vendorType === 'solicitor';
  const isAccountant = vendorType === 'accountant';
  const isMortgageAdvisor = vendorType === 'mortgage-advisor';
  const isEstateAgent = vendorType === 'estate-agent';
  const isProfessional = isSolicitor || isAccountant || isMortgageAdvisor || isEstateAgent;
  const isEquipment = !isProfessional;

  const fetchProfile = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const [profileRes, subRes] = await Promise.all([
        fetch(`${API_URL}/api/vendors/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/stripe/subscription-status`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (profileRes.ok) {
        const data = await profileRes.json();
        if (data.vendor) {
          setProfile({
            company: data.vendor.company || '',
            name: data.vendor.name || '',
            email: data.vendor.email || '',
            phone: data.vendor.phone || '',
            website: data.vendor.website || '',
            city: data.vendor.city || '',
            postcode: data.vendor.postcode || '',
            coverage: data.vendor.coverage || [],
            description: data.vendor.description || '',
            yearsInBusiness: data.vendor.yearsInBusiness || 0,
            services: data.vendor.services || [],
            brands: data.vendor.brands || [],
            certifications: data.vendor.certifications || [],
            tier: data.vendor.tier || 'free',
            vendorType: data.vendor.vendorType || 'office-equipment',
            sraNumber: data.vendor.sraNumber || '',
            practiceAreas: data.vendor.practiceAreas || [],
            accreditations: data.vendor.accreditations || [],
            fixedFees: data.vendor.fixedFees || [],
            lenderPanels: data.vendor.lenderPanels || [],
            individualSolicitors: data.vendor.individualSolicitors || [],
            languages: data.vendor.languages || [],
            legalAid: data.vendor.legalAid || false,
            responseTime: data.vendor.responseTime || '',
            noWinNoFee: data.vendor.noWinNoFee || false,
            courtCoverageAreas: data.vendor.courtCoverageAreas || [],
            icaewFirmNumber: data.vendor.icaewFirmNumber || '',
            softwareUsed: data.vendor.softwareUsed || [],
            industrySpecialisms: data.vendor.industrySpecialisms || [],
            mtdCompliant: data.vendor.mtdCompliant || false,
            accaNumber: data.vendor.accaNumber || '',
            practiceCertificateNumber: data.vendor.practiceCertificateNumber || '',
            minimumFeeThreshold: data.vendor.minimumFeeThreshold || 0,
            rdTaxCreditsSpecialist: data.vendor.rdTaxCreditsSpecialist || false,
            feeStructureType: data.vendor.feeStructureType || '',
            fcaNumber: data.vendor.fcaNumber || '',
            wholeOfMarket: data.vendor.wholeOfMarket || false,
            numberOfLenders: data.vendor.numberOfLenders || 0,
            typicalCompletionTime: data.vendor.typicalCompletionTime || '',
            feeModel: data.vendor.feeModel || '',
            maximumLoanSize: data.vendor.maximumLoanSize || 0,
            propertymarkNumber: data.vendor.propertymarkNumber || '',
            propertymarkQualification: data.vendor.propertymarkQualification || '',
            portalListings: data.vendor.portalListings || [],
            coveragePostcodes: data.vendor.coveragePostcodes || [],
            averageSaleTime: data.vendor.averageSaleTime || '',
            achievedVsAskingPercent: data.vendor.achievedVsAskingPercent || 0,
            managementFeePercent: data.vendor.managementFeePercent || 0,
            tenantFindOrFullManagement: data.vendor.tenantFindOrFullManagement || '',
            epcAssessor: data.vendor.epcAssessor || false,
            propertyTypesHandled: data.vendor.propertyTypesHandled || [],
            leaseVsPurchase: data.vendor.leaseVsPurchase || '',
            managedPrintService: data.vendor.managedPrintService || false,
            monthlyCostRange: data.vendor.monthlyCostRange || '',
          });
        }
      }

      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscription(subData);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setMessage({ text: 'Failed to load profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCurrentToken();
    if (!token) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/vendors/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Profile saved successfully!', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to save profile', type: 'error' });
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      setMessage({ text: 'Failed to save profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProfile((prev) => ({ ...prev, [name]: checked }));
  };

  const handleServiceToggle = (service: string) => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleArrayToggle = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => {
      const arr = (prev[field] as string[]) || [];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  type TagField = 'brands' | 'certifications' | 'coverage' | 'lenderPanels' | 'languages' | 'industrySpecialisms' | 'coveragePostcodes' | 'courtCoverageAreas';

  const addTag = (field: TagField, value: string) => {
    if (!value.trim()) return;
    setProfile((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value.trim()],
    }));
    const setters: Record<string, (v: string) => void> = {
      brands: setNewBrand, certifications: setNewCertification, coverage: setNewCoverage,
      lenderPanels: setNewLenderPanel, languages: setNewLanguage, industrySpecialisms: setNewSpecialism,
      coveragePostcodes: setNewCoveragePostcode, courtCoverageAreas: setNewCourtArea,
    };
    setters[field]?.('');
  };

  const removeTag = (field: TagField, index: number) => {
    setProfile((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  // Fixed fees helpers
  const addFixedFee = () => {
    setProfile((prev) => ({
      ...prev,
      fixedFees: [...prev.fixedFees, { service: '', fee: '' }],
    }));
  };

  const updateFixedFee = (index: number, field: 'service' | 'fee', value: string) => {
    setProfile((prev) => ({
      ...prev,
      fixedFees: prev.fixedFees.map((f, i) => i === index ? { ...f, [field]: value } : f),
    }));
  };

  const removeFixedFee = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      fixedFees: prev.fixedFees.filter((_, i) => i !== index),
    }));
  };

  // Individual solicitors helpers
  const addSolicitor = () => {
    setProfile((prev) => ({
      ...prev,
      individualSolicitors: [...prev.individualSolicitors, { name: '', role: '', specialisms: '', qualifications: '' }],
    }));
  };

  const updateSolicitor = (index: number, field: keyof IndividualSolicitor, value: string) => {
    setProfile((prev) => ({
      ...prev,
      individualSolicitors: prev.individualSolicitors.map((s, i) => i === index ? { ...s, [field]: value } : s),
    }));
  };

  const removeSolicitor = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      individualSolicitors: prev.individualSolicitors.filter((_, i) => i !== index),
    }));
  };

  // Handle upgrade to a plan
  const handleUpgrade = async (planId: string) => {
    const token = getCurrentToken();
    if (!token) return;

    setUpgradingTo(planId);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else if (response.status === 503) {
        setMessage({
          text: 'Online payments are not yet available. Please contact us to upgrade: scott.davies@tendorai.com',
          type: 'error',
        });
      } else {
        setMessage({
          text: data.message || 'Failed to start checkout',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      setMessage({
        text: 'Failed to start checkout. Please try again or contact support.',
        type: 'error',
      });
    } finally {
      setUpgradingTo(null);
    }
  };

  // Handle manage subscription (portal)
  const handleManageSubscription = async () => {
    const token = getCurrentToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/stripe/create-portal-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        setMessage({
          text: data.message || 'Failed to open billing portal',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Portal error:', error);
      setMessage({
        text: 'Failed to open billing portal',
        type: 'error',
      });
    }
  };

  // Get current plan ID
  const getCurrentPlanId = () => {
    const tier = profile.tier?.toLowerCase() || 'free';
    if (['managed', 'verified', 'pro', 'enterprise'].includes(tier)) return 'pro';
    if (['basic', 'visible', 'starter'].includes(tier)) return 'starter';
    return 'free';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentPlanId = getCurrentPlanId();

  // ─── Tag input helper component ──────────────────────────────────────
  const TagInput = ({ label, placeholder, value, onChange, onAdd, tags, onRemove, color = 'gray' }: {
    label: string; placeholder: string; value: string;
    onChange: (v: string) => void; onAdd: () => void;
    tags: string[]; onRemove: (i: number) => void;
    color?: 'gray' | 'blue' | 'green' | 'purple';
  }) => {
    const colorMap = {
      gray: 'bg-gray-100 text-gray-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
    };
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="input flex-1"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
          />
          <button type="button" onClick={onAdd} className="btn-secondary px-4">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${colorMap[color]}`}>
              {tag}
              <button type="button" onClick={() => onRemove(i)} className="ml-2 hover:opacity-70">&times;</button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your profile and subscription</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'subscription'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Subscription
          </button>
        </nav>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Plan Badge */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700">Current Plan: </span>
                <span className={`font-semibold ${
                  currentPlanId === 'pro' ? 'text-green-600' :
                  currentPlanId === 'starter' ? 'text-blue-600' :
                  'text-gray-600'
                }`}>
                  {getTierLabel(profile.tier)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('subscription')}
                className="btn-outline py-1.5 px-3 text-sm"
              >
                {currentPlanId === 'free' ? 'Upgrade Plan' : 'Manage Plan'}
              </button>
            </div>
          </div>

          {/* Business Details */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isSolicitor ? 'Firm Details' : isAccountant ? 'Practice Details' : isMortgageAdvisor ? 'Brokerage Details' : isEstateAgent ? 'Agency Details' : 'Business Details'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  {isSolicitor || isAccountant ? 'Firm Name' : isMortgageAdvisor ? 'Brokerage Name' : isEstateAgent ? 'Agency Name' : 'Company Name'}
                </label>
                <input type="text" id="company" name="company" value={profile.company} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" id="phone" name="phone" value={profile.phone} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input type="url" id="website" name="website" value={profile.website} onChange={handleChange} placeholder="https://" className="input" />
              </div>
              <div>
                <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                <input type="number" id="yearsInBusiness" name="yearsInBusiness" value={profile.yearsInBusiness || ''} onChange={handleChange} min="0" className="input" />
              </div>

              {/* SRA Number (solicitor, read-only) */}
              {isSolicitor && profile.sraNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SRA Number</label>
                  <input type="text" value={profile.sraNumber} readOnly className="input bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
              )}

              {/* ICAEW/ACCA Number (accountant, read-only) */}
              {isAccountant && profile.icaewFirmNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ICAEW/ACCA Firm Number</label>
                  <input type="text" value={profile.icaewFirmNumber} readOnly className="input bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
              )}

              {/* FCA Number (mortgage advisor) */}
              {isMortgageAdvisor && (
                <div>
                  <label htmlFor="fcaNumber" className="block text-sm font-medium text-gray-700 mb-1">FCA Number</label>
                  <input type="text" id="fcaNumber" name="fcaNumber" value={profile.fcaNumber} onChange={handleChange} placeholder="e.g. 123456" className="input" />
                </div>
              )}

              {/* Propertymark Number (estate agent) */}
              {isEstateAgent && (
                <div>
                  <label htmlFor="propertymarkNumber" className="block text-sm font-medium text-gray-700 mb-1">Propertymark Number</label>
                  <input type="text" id="propertymarkNumber" name="propertymarkNumber" value={profile.propertymarkNumber} onChange={handleChange} placeholder="e.g. M012345" className="input" />
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" id="city" name="city" value={profile.city} onChange={handleChange} className="input" />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                <input type="text" id="postcode" name="postcode" value={profile.postcode} onChange={handleChange} className="input" />
              </div>
            </div>
            <div className="mt-4">
              <TagInput
                label="Coverage Areas"
                placeholder="e.g. South Wales, Bristol"
                value={newCoverage}
                onChange={setNewCoverage}
                onAdd={() => addTag('coverage', newCoverage)}
                tags={profile.coverage}
                onRemove={(i) => removeTag('coverage', i)}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              SOLICITOR-SPECIFIC FIELDS
              ═══════════════════════════════════════════════════════════════ */}
          {isSolicitor && (
            <>
              {/* Practice Areas */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Practice Areas</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SOLICITOR_PRACTICE_AREAS.map((area) => (
                    <label key={area} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.practiceAreas.includes(area)
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.practiceAreas.includes(area)}
                        onChange={() => handleArrayToggle('practiceAreas', area)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fixed Fees */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Fixed Fees</h2>
                <p className="text-sm text-gray-500 mb-3">Add starting prices for your services (e.g. &quot;Conveyancing from &pound;999+VAT&quot;)</p>
                {profile.fixedFees.map((fee, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={fee.service}
                      onChange={(e) => updateFixedFee(i, 'service', e.target.value)}
                      placeholder="Service (e.g. Conveyancing)"
                      className="input flex-1"
                    />
                    <input
                      type="text"
                      value={fee.fee}
                      onChange={(e) => updateFixedFee(i, 'fee', e.target.value)}
                      placeholder="Fee (e.g. from &pound;999+VAT)"
                      className="input w-48"
                    />
                    <button type="button" onClick={() => removeFixedFee(i)} className="text-red-500 hover:text-red-700 px-2">&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addFixedFee} className="btn-secondary text-sm mt-2">+ Add fee</button>
              </div>

              {/* Accreditations */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Accreditations</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SOLICITOR_ACCREDITATIONS.map((acc) => (
                    <label key={acc} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.accreditations.includes(acc)
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.accreditations.includes(acc)}
                        onChange={() => handleArrayToggle('accreditations', acc)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{acc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Lender Panels */}
              <div className="card p-6">
                <TagInput
                  label="Lender Panels"
                  placeholder="e.g. Nationwide, Halifax, Barclays"
                  value={newLenderPanel}
                  onChange={setNewLenderPanel}
                  onAdd={() => addTag('lenderPanels', newLenderPanel)}
                  tags={profile.lenderPanels}
                  onRemove={(i) => removeTag('lenderPanels', i)}
                  color="blue"
                />
              </div>

              {/* Individual Solicitors */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Solicitors at the Firm</h2>
                {profile.individualSolicitors.map((sol, i) => (
                  <div key={i} className="grid gap-3 sm:grid-cols-2 mb-4 p-4 bg-gray-50 rounded-lg relative">
                    <button type="button" onClick={() => removeSolicitor(i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                    <input type="text" value={sol.name} onChange={(e) => updateSolicitor(i, 'name', e.target.value)} placeholder="Name" className="input" />
                    <input type="text" value={sol.role} onChange={(e) => updateSolicitor(i, 'role', e.target.value)} placeholder="Role (e.g. Partner)" className="input" />
                    <input type="text" value={sol.specialisms} onChange={(e) => updateSolicitor(i, 'specialisms', e.target.value)} placeholder="Specialisms" className="input" />
                    <input type="text" value={sol.qualifications} onChange={(e) => updateSolicitor(i, 'qualifications', e.target.value)} placeholder="Qualifications" className="input" />
                  </div>
                ))}
                <button type="button" onClick={addSolicitor} className="btn-secondary text-sm">+ Add solicitor</button>
              </div>

              {/* Languages */}
              <div className="card p-6">
                <TagInput
                  label="Languages Spoken"
                  placeholder="e.g. English, Welsh, Urdu"
                  value={newLanguage}
                  onChange={setNewLanguage}
                  onAdd={() => addTag('languages', newLanguage)}
                  tags={profile.languages}
                  onRemove={(i) => removeTag('languages', i)}
                  color="purple"
                />
              </div>

              {/* Legal Aid & Response Time */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="legalAid"
                      name="legalAid"
                      checked={profile.legalAid}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                    />
                    <label htmlFor="legalAid" className="text-sm font-medium text-gray-700">Legal aid accepted</label>
                  </div>
                  <div>
                    <label htmlFor="responseTime" className="block text-sm font-medium text-gray-700 mb-1">Response Time</label>
                    <select id="responseTime" name="responseTime" value={profile.responseTime} onChange={handleChange} className="input">
                      <option value="">Select...</option>
                      {SOLICITOR_RESPONSE_TIMES.map((rt) => (
                        <option key={rt.value} value={rt.value}>{rt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="noWinNoFee"
                      name="noWinNoFee"
                      checked={profile.noWinNoFee}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                    />
                    <label htmlFor="noWinNoFee" className="text-sm font-medium text-gray-700">No Win No Fee offered</label>
                  </div>
                </div>
              </div>

              {/* Court Coverage Areas */}
              <div className="card p-6">
                <TagInput
                  label="Courts covered"
                  placeholder="e.g. Cardiff Crown Court, Bristol Magistrates"
                  value={newCourtArea}
                  onChange={setNewCourtArea}
                  onAdd={() => addTag('courtCoverageAreas', newCourtArea)}
                  tags={profile.courtCoverageAreas}
                  onRemove={(i) => removeTag('courtCoverageAreas', i)}
                  color="purple"
                />
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              ACCOUNTANT-SPECIFIC FIELDS
              ═══════════════════════════════════════════════════════════════ */}
          {isAccountant && (
            <>
              {/* Accountant Services (practiceAreas) */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Services</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ACCOUNTANT_SERVICES.map((svc) => (
                    <label key={svc} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.practiceAreas.includes(svc)
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.practiceAreas.includes(svc)}
                        onChange={() => handleArrayToggle('practiceAreas', svc)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{svc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Software Used */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Software Used</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ACCOUNTANT_SOFTWARE.map((sw) => (
                    <label key={sw} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.softwareUsed.includes(sw)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.softwareUsed.includes(sw)}
                        onChange={() => handleArrayToggle('softwareUsed', sw)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{sw}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fixed Fees */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Fixed Fees</h2>
                <p className="text-sm text-gray-500 mb-3">Add starting prices for your services</p>
                {profile.fixedFees.map((fee, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={fee.service}
                      onChange={(e) => updateFixedFee(i, 'service', e.target.value)}
                      placeholder="Service (e.g. Self-Assessment)"
                      className="input flex-1"
                    />
                    <input
                      type="text"
                      value={fee.fee}
                      onChange={(e) => updateFixedFee(i, 'fee', e.target.value)}
                      placeholder="Fee (e.g. from &pound;250+VAT)"
                      className="input w-48"
                    />
                    <button type="button" onClick={() => removeFixedFee(i)} className="text-red-500 hover:text-red-700 px-2">&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addFixedFee} className="btn-secondary text-sm mt-2">+ Add fee</button>
              </div>

              {/* Industry Specialisms */}
              <div className="card p-6">
                <TagInput
                  label="Industry Specialisms"
                  placeholder="e.g. Construction, Healthcare, Property"
                  value={newSpecialism}
                  onChange={setNewSpecialism}
                  onAdd={() => addTag('industrySpecialisms', newSpecialism)}
                  tags={profile.industrySpecialisms}
                  onRemove={(i) => removeTag('industrySpecialisms', i)}
                  color="green"
                />
              </div>

              {/* Additional Details */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="mtdCompliant"
                      name="mtdCompliant"
                      checked={profile.mtdCompliant}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                    />
                    <label htmlFor="mtdCompliant" className="text-sm font-medium text-gray-700">Making Tax Digital (MTD) compliant</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="rdTaxCreditsSpecialist"
                      name="rdTaxCreditsSpecialist"
                      checked={profile.rdTaxCreditsSpecialist}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                    />
                    <label htmlFor="rdTaxCreditsSpecialist" className="text-sm font-medium text-gray-700">R&D Tax Credits specialist</label>
                  </div>
                  <div>
                    <label htmlFor="accaNumber" className="block text-sm font-medium text-gray-700 mb-1">ACCA Registration Number</label>
                    <input type="text" id="accaNumber" name="accaNumber" value={profile.accaNumber} onChange={handleChange} placeholder="e.g. 1234567" className="input" />
                  </div>
                  <div>
                    <label htmlFor="practiceCertificateNumber" className="block text-sm font-medium text-gray-700 mb-1">Practice Certificate Number</label>
                    <input type="text" id="practiceCertificateNumber" name="practiceCertificateNumber" value={profile.practiceCertificateNumber} onChange={handleChange} className="input" />
                  </div>
                  <div>
                    <label htmlFor="minimumFeeThreshold" className="block text-sm font-medium text-gray-700 mb-1">Minimum fee (&pound;)</label>
                    <input type="number" id="minimumFeeThreshold" name="minimumFeeThreshold" value={profile.minimumFeeThreshold || ''} onChange={handleChange} min="0" placeholder="e.g. 250" className="input" />
                  </div>
                  <div>
                    <label htmlFor="feeStructureType" className="block text-sm font-medium text-gray-700 mb-1">Fee structure</label>
                    <select id="feeStructureType" name="feeStructureType" value={profile.feeStructureType} onChange={handleChange} className="input">
                      <option value="">Select...</option>
                      <option value="fixed">Fixed</option>
                      <option value="hourly">Hourly</option>
                      <option value="retainer">Monthly Retainer</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              MORTGAGE ADVISOR-SPECIFIC FIELDS
              ═══════════════════════════════════════════════════════════════ */}
          {isMortgageAdvisor && (
            <>
              {/* Service Areas */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Areas</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MORTGAGE_SERVICES.map((svc) => (
                    <label key={svc} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.practiceAreas.includes(svc)
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.practiceAreas.includes(svc)}
                        onChange={() => handleArrayToggle('practiceAreas', svc)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{svc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fixed Fees */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Fixed Fees</h2>
                <p className="text-sm text-gray-500 mb-3">Add starting prices for your services (e.g. &quot;Remortgage advice from &pound;499&quot;)</p>
                {profile.fixedFees.map((fee, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={fee.service}
                      onChange={(e) => updateFixedFee(i, 'service', e.target.value)}
                      placeholder="Service (e.g. Remortgage Advice)"
                      className="input flex-1"
                    />
                    <input
                      type="text"
                      value={fee.fee}
                      onChange={(e) => updateFixedFee(i, 'fee', e.target.value)}
                      placeholder="Fee (e.g. from &pound;499)"
                      className="input w-48"
                    />
                    <button type="button" onClick={() => removeFixedFee(i)} className="text-red-500 hover:text-red-700 px-2">&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addFixedFee} className="btn-secondary text-sm mt-2">+ Add fee</button>
              </div>

              {/* Accreditations */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Accreditations</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MORTGAGE_ACCREDITATIONS.map((acc) => (
                    <label key={acc} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.accreditations.includes(acc)
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.accreditations.includes(acc)}
                        onChange={() => handleArrayToggle('accreditations', acc)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{acc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Lender Panels */}
              <div className="card p-6">
                <TagInput
                  label="Lender Panels"
                  placeholder="e.g. Nationwide, Halifax, Barclays"
                  value={newLenderPanel}
                  onChange={setNewLenderPanel}
                  onAdd={() => addTag('lenderPanels', newLenderPanel)}
                  tags={profile.lenderPanels}
                  onRemove={(i) => removeTag('lenderPanels', i)}
                  color="blue"
                />
              </div>

              {/* Mortgage Additional Details */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="wholeOfMarket"
                      name="wholeOfMarket"
                      checked={profile.wholeOfMarket}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                    />
                    <label htmlFor="wholeOfMarket" className="text-sm font-medium text-gray-700">Whole of market adviser</label>
                  </div>
                  <div>
                    <label htmlFor="numberOfLenders" className="block text-sm font-medium text-gray-700 mb-1">Lenders on panel</label>
                    <input type="number" id="numberOfLenders" name="numberOfLenders" value={profile.numberOfLenders || ''} onChange={handleChange} min="0" placeholder="e.g. 90" className="input" />
                  </div>
                  <div>
                    <label htmlFor="typicalCompletionTime" className="block text-sm font-medium text-gray-700 mb-1">Typical completion time (e.g. 6-8 weeks)</label>
                    <input type="text" id="typicalCompletionTime" name="typicalCompletionTime" value={profile.typicalCompletionTime} onChange={handleChange} placeholder="e.g. 6-8 weeks" className="input" />
                  </div>
                  <div>
                    <label htmlFor="feeModel" className="block text-sm font-medium text-gray-700 mb-1">Fee model</label>
                    <select id="feeModel" name="feeModel" value={profile.feeModel} onChange={handleChange} className="input">
                      <option value="">Select...</option>
                      <option value="fee">Fee-based</option>
                      <option value="fee-free">Fee-free</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="maximumLoanSize" className="block text-sm font-medium text-gray-700 mb-1">Maximum loan size (&pound;)</label>
                    <input type="number" id="maximumLoanSize" name="maximumLoanSize" value={profile.maximumLoanSize || ''} onChange={handleChange} min="0" placeholder="e.g. 2000000" className="input" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              ESTATE AGENT-SPECIFIC FIELDS
              ═══════════════════════════════════════════════════════════════ */}
          {isEstateAgent && (
            <>
              {/* Service Areas */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Areas</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ESTATE_AGENT_SERVICES.map((svc) => (
                    <label key={svc} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.practiceAreas.includes(svc)
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.practiceAreas.includes(svc)}
                        onChange={() => handleArrayToggle('practiceAreas', svc)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{svc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fixed Fees */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Fixed Fees</h2>
                <p className="text-sm text-gray-500 mb-3">Add starting prices for your services (e.g. &quot;Sales fee from 1% + VAT&quot;)</p>
                {profile.fixedFees.map((fee, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={fee.service}
                      onChange={(e) => updateFixedFee(i, 'service', e.target.value)}
                      placeholder="Service (e.g. Sales Fee)"
                      className="input flex-1"
                    />
                    <input
                      type="text"
                      value={fee.fee}
                      onChange={(e) => updateFixedFee(i, 'fee', e.target.value)}
                      placeholder="Fee (e.g. from 1% + VAT)"
                      className="input w-48"
                    />
                    <button type="button" onClick={() => removeFixedFee(i)} className="text-red-500 hover:text-red-700 px-2">&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addFixedFee} className="btn-secondary text-sm mt-2">+ Add fee</button>
              </div>

              {/* Accreditations */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Accreditations</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ESTATE_AGENT_ACCREDITATIONS.map((acc) => (
                    <label key={acc} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.accreditations.includes(acc)
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.accreditations.includes(acc)}
                        onChange={() => handleArrayToggle('accreditations', acc)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{acc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Portal Listings */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Portal Listings</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PORTAL_LISTINGS.map((portal) => (
                    <label key={portal} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.portalListings.includes(portal)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.portalListings.includes(portal)}
                        onChange={() => handleArrayToggle('portalListings', portal)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{portal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Coverage Postcodes */}
              <div className="card p-6">
                <TagInput
                  label="Coverage Postcodes"
                  placeholder="e.g. CF10, BS1, NP20"
                  value={newCoveragePostcode}
                  onChange={setNewCoveragePostcode}
                  onAdd={() => addTag('coveragePostcodes', newCoveragePostcode)}
                  tags={profile.coveragePostcodes}
                  onRemove={(i) => removeTag('coveragePostcodes', i)}
                  color="purple"
                />
              </div>

              {/* Property Types */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Property types</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PROPERTY_TYPES.map((pt) => (
                    <label key={pt} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.propertyTypesHandled.includes(pt)
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}>
                      <input
                        type="checkbox"
                        checked={profile.propertyTypesHandled.includes(pt)}
                        onChange={() => handleArrayToggle('propertyTypesHandled', pt)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{pt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Estate Agent Additional Details */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="averageSaleTime" className="block text-sm font-medium text-gray-700 mb-1">Average sale time (e.g. 8 weeks)</label>
                    <input type="text" id="averageSaleTime" name="averageSaleTime" value={profile.averageSaleTime} onChange={handleChange} placeholder="e.g. 8 weeks" className="input" />
                  </div>
                  <div>
                    <label htmlFor="achievedVsAskingPercent" className="block text-sm font-medium text-gray-700 mb-1">Average achieved vs asking price (%)</label>
                    <input type="number" id="achievedVsAskingPercent" name="achievedVsAskingPercent" value={profile.achievedVsAskingPercent || ''} onChange={handleChange} min="0" max="200" placeholder="e.g. 98" className="input" />
                  </div>
                  <div>
                    <label htmlFor="managementFeePercent" className="block text-sm font-medium text-gray-700 mb-1">Management fee (%)</label>
                    <input type="number" id="managementFeePercent" name="managementFeePercent" value={profile.managementFeePercent || ''} onChange={handleChange} min="0" max="100" placeholder="e.g. 10" className="input" />
                  </div>
                  <div>
                    <label htmlFor="tenantFindOrFullManagement" className="block text-sm font-medium text-gray-700 mb-1">Lettings service type</label>
                    <select id="tenantFindOrFullManagement" name="tenantFindOrFullManagement" value={profile.tenantFindOrFullManagement} onChange={handleChange} className="input">
                      <option value="">Select...</option>
                      <option value="tenant-find">Tenant Find Only</option>
                      <option value="full-management">Full Management</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="epcAssessor"
                      name="epcAssessor"
                      checked={profile.epcAssessor}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                    />
                    <label htmlFor="epcAssessor" className="text-sm font-medium text-gray-700">EPC assessments offered</label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              OFFICE EQUIPMENT FIELDS (existing)
              ═══════════════════════════════════════════════════════════════ */}
          {isEquipment && (
            <>
              {/* Services */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVICE_OPTIONS.map((service) => (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => handleServiceToggle(service.value)}
                      className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                        profile.services.includes(service.value)
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-xl mr-2">{service.icon}</span>
                      <span className="text-sm font-medium">{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands & Certifications */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Brands & Certifications</h2>
                <div className="space-y-4">
                  <TagInput
                    label="Brands You Work With"
                    placeholder="e.g. Canon, Ricoh, Xerox"
                    value={newBrand}
                    onChange={setNewBrand}
                    onAdd={() => addTag('brands', newBrand)}
                    tags={profile.brands}
                    onRemove={(i) => removeTag('brands', i)}
                    color="blue"
                  />
                  <TagInput
                    label="Certifications"
                    placeholder="e.g. ISO 9001, Cyber Essentials"
                    value={newCertification}
                    onChange={setNewCertification}
                    onAdd={() => addTag('certifications', newCertification)}
                    tags={profile.certifications}
                    onRemove={(i) => removeTag('certifications', i)}
                    color="green"
                  />
                </div>
              </div>

              {/* Equipment Additional Details */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="leaseVsPurchase" className="block text-sm font-medium text-gray-700 mb-1">Equipment available on</label>
                    <select id="leaseVsPurchase" name="leaseVsPurchase" value={profile.leaseVsPurchase} onChange={handleChange} className="input">
                      <option value="">Select...</option>
                      <option value="lease">Lease</option>
                      <option value="purchase">Purchase</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="monthlyCostRange" className="block text-sm font-medium text-gray-700 mb-1">Typical monthly cost range (e.g. &pound;50-&pound;200/month)</label>
                    <input type="text" id="monthlyCostRange" name="monthlyCostRange" value={profile.monthlyCostRange} onChange={handleChange} placeholder="e.g. £50-£200/month" className="input" />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="managedPrintService"
                      name="managedPrintService"
                      checked={profile.managedPrintService}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                    />
                    <label htmlFor="managedPrintService" className="text-sm font-medium text-gray-700">Managed Print Service offered</label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Description (all vendor types) */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isSolicitor ? 'About the Firm' : isAccountant ? 'About the Practice' : isMortgageAdvisor ? 'About the Brokerage' : isEstateAgent ? 'About the Agency' : 'About Your Business'}
            </h2>
            <textarea
              id="description"
              name="description"
              value={profile.description}
              onChange={handleChange}
              rows={4}
              placeholder={
                isSolicitor ? 'Tell potential clients about your firm, areas of expertise, and what sets you apart...'
                : isAccountant ? 'Tell potential clients about your practice, specialisms, and approach...'
                : isMortgageAdvisor ? 'Tell potential clients about your brokerage, specialist areas, and what sets you apart...'
                : isEstateAgent ? 'Tell potential clients about your agency, local expertise, and what makes you different...'
                : 'Tell potential customers about your business, experience, and what makes you different...'
              }
              className="input"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary py-2.5 px-6 disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      )}

      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {/* What you're missing */}
          {currentPlanId !== 'pro' && MISSING_BY_TIER[currentPlanId] && (
            <div className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                What you&apos;re missing
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {MISSING_BY_TIER[currentPlanId].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleUpgrade(currentPlanId === 'free' ? 'starter' : 'pro')}
                className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                Unlock these features
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Current subscription info */}
          {subscription?.subscription && (
            <div className="card p-6 bg-purple-50 border-purple-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-purple-900">Active Subscription</h3>
                  <p className="text-purple-700 text-sm mt-1">
                    {getTierLabel(profile.tier)} Plan
                    {subscription.subscription.currentPeriodEnd && (
                      <> • Renews {new Date(subscription.subscription.currentPeriodEnd).toLocaleDateString('en-GB')}</>
                    )}
                    {subscription.subscription.cancelAtPeriodEnd && (
                      <span className="text-amber-600"> (Cancels at period end)</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={handleManageSubscription}
                  className="btn-secondary py-2 px-4 text-sm"
                >
                  Manage Billing
                </button>
              </div>
            </div>
          )}

          {/* Plan comparison */}
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const isCurrent = plan.id === currentPlanId;
              const isUpgrade = !isCurrent && (
                (currentPlanId === 'free' && (plan.id === 'starter' || plan.id === 'pro')) ||
                (currentPlanId === 'starter' && plan.id === 'pro')
              );
              const isDowngrade = !isCurrent && !isUpgrade && plan.id !== currentPlanId;

              return (
                <div
                  key={plan.id}
                  className={`card p-6 relative ${
                    plan.popular ? 'ring-2 ring-purple-600' : ''
                  } ${isCurrent ? 'bg-purple-50 border-purple-200' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">{plan.priceLabel}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {feature.included ? (
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* What you'll lose warning for paid vendors viewing free tier */}
                  {isDowngrade && plan.id === 'free' && currentPlanId !== 'free' && (
                    <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs font-medium text-amber-800">
                        Downgrading will remove: AI Mentions, Analytics, visibility tips
                        {currentPlanId === 'pro' ? ', verified badge, unlimited products/services' : ', extra product/service slots'}.
                      </p>
                    </div>
                  )}

                  {isCurrent ? (
                    <div className="w-full py-2.5 px-4 text-center text-purple-700 bg-purple-100 rounded-lg font-medium">
                      Current Plan
                    </div>
                  ) : isUpgrade ? (
                    <button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={upgradingTo === plan.id}
                      className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
                        plan.popular
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      } disabled:opacity-50`}
                    >
                      {upgradingTo === plan.id ? 'Processing...' : plan.cta}
                    </button>
                  ) : isDowngrade ? (
                    <button
                      onClick={handleManageSubscription}
                      className="w-full py-2.5 px-4 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Manage Subscription
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Contact for enterprise */}
          <div className="card p-6 text-center bg-gray-50">
            <h3 className="font-semibold text-gray-900">Need a custom plan?</h3>
            <p className="text-gray-600 text-sm mt-1">
              For enterprise needs or custom requirements, get in touch.
            </p>
            <a
              href="mailto:scott.davies@tendorai.com?subject=Custom Plan Enquiry"
              className="inline-block mt-4 text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact us at scott.davies@tendorai.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
