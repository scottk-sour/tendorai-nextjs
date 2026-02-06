'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// =====================================================
// TYPES
// =====================================================

interface Vendor {
  id: string;
  company: string;
  services: string[];
  description?: string;
  location: string;
  coverage: string[];
  rating: number | null;
  reviewCount: number;
  brands?: string[];
  tier: string;
  matchScore: number;
  scoreBreakdown?: {
    productFit: number;
    vendorQuality: number;
    tierBonus: number;
    costEfficiency: number;
  };
  rank: number;
  badge: string | null;
  whyRecommended: string;
  product?: {
    name: string;
    category: string;
    speed: number;
    isColour: boolean;
    isA3: boolean;
    features: string[];
  };
  pricing?: {
    estimatedMonthly: string;
    breakdown: { lease: string; cpc: string; service: string };
    cpcMono: string | null;
    cpcColour: string | null;
  };
  savings?: {
    monthly: number;
    annual: number;
    percentage: number;
    formatted: string;
  };
  service?: {
    includesToner: boolean;
    includesPartsLabour: boolean;
    responseTime: string;
  };
  profileUrl: string;
  quoteUrl: string;
}

interface FollowUpQuestion {
  field: string;
  question: string;
  options: string[];
  impact: 'high' | 'medium' | 'low';
  help: string;
  multiSelect?: boolean;
}

interface APIResponse {
  success: boolean;
  count: number;
  vendors: Vendor[];
  summary: {
    totalMatches: number;
    withPricing: number;
    priceRange: { min: number; max: number } | null;
    maxAnnualSavings: number | null;
  };
  followUp: FollowUpQuestion[];
  answeredFields: string[];
  filters: {
    volume: number;
    colour?: boolean;
    a3?: boolean;
    features?: string[];
    colourRatio?: number;
  };
}

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  postcode: string;
  message: string;
  timeline: string;
}

// =====================================================
// CONSTANTS
// =====================================================

const CATEGORIES = [
  { value: 'Photocopiers', label: 'Photocopiers & Printers', icon: '🖨️', description: 'Lease or buy multifunction printers, copiers, and managed print services' },
  { value: 'Telecoms', label: 'Telecoms & Phone Systems', icon: '📞', description: 'VoIP, cloud phones, PBX systems, and business broadband' },
  { value: 'CCTV', label: 'CCTV & Security', icon: '📹', description: 'Security cameras, monitoring, access control, and alarms' },
  { value: 'IT', label: 'IT Services', icon: '💻', description: 'Managed IT support, cloud services, cybersecurity, and Microsoft 365' },
];

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-procurement-backend-q35u.onrender.com';

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function parseVolume(option: string): number {
  const map: Record<string, number> = {
    'Under 1,000': 500,
    '1,000-3,000': 2000,
    '3,000-5,000': 4000,
    '5,000-10,000': 7500,
    '10,000-20,000': 15000,
    '20,000-50,000': 35000,
    '50,000+': 60000,
    '1-5': 3,
    '6-10': 8,
    '11-25': 18,
    '26-50': 38,
    '51-100': 75,
    '100+': 150,
    '100-250': 175,
    '250+': 300,
    '1-4': 3,
    '5-8': 6,
    '9-16': 12,
    '17-32': 24,
    '32+': 40,
    '1-10': 5,
  };
  return map[option] || 5000;
}

function parseBudget(option: string): number | undefined {
  const map: Record<string, number> = {
    // Photocopier budget options
    'Under £100': 100,
    '£100-£200': 150,
    '£200-£350': 275,
    '£350-£500': 425,
    'Over £500': 600,
    // CCTV budget options
    'Under £50': 50,
    '£50-£100': 75,
    '£100-£250': 175,
    '£250-£500': 375,
    // IT budget options
    'Under £500': 500,
    '£500-£1000': 750,
    '£1000-£2500': 1750,
    '£2500-£5000': 3750,
    'Over £5000': 6000,
    // Telecoms budget options
    '£100-£300': 200,
    '£300-£500': 400,
    'Over £1000': 1200,
    // New setup
    'New setup': 0,
    'No current support': 0,
  };
  return map[option];
}

function parseColourRatio(option: string): number {
  const map: Record<string, number> = {
    'Under 10%': 0.05,
    '10-25%': 0.175,
    '25-50%': 0.375,
    'Over 50%': 0.6,
  };
  return map[option] || 0.2;
}

function parseColour(option: string): boolean | undefined {
  if (option === 'Yes - regularly' || option === 'Yes - occasionally') return true;
  if (option === 'No - mono only') return false;
  return undefined;
}

function parseA3(option: string): boolean | undefined {
  if (option === 'Yes') return true;
  if (option === 'No') return false;
  return undefined;
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function QuoteFlow() {
  const searchParams = useSearchParams();

  // Flow state
  const [step, setStep] = useState<'category' | 'questions' | 'results' | 'form'>('category');
  const [category, setCategory] = useState('');
  const [postcode, setPostcode] = useState('');

  // Answers accumulated from questions
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  // API data
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [followUpQuestions, setFollowUpQuestions] = useState<FollowUpQuestion[]>([]);
  const [summary, setSummary] = useState<APIResponse['summary'] | null>(null);
  const [answeredFields, setAnsweredFields] = useState<string[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  // Quote form
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    postcode: '',
    message: '',
    timeline: 'soon',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const postcodeParam = searchParams.get('postcode');

    if (categoryParam) {
      const mappedCategory = CATEGORIES.find(
        c => c.value.toLowerCase() === categoryParam.toLowerCase() || c.label.toLowerCase().includes(categoryParam.toLowerCase())
      )?.value;
      if (mappedCategory) {
        setCategory(mappedCategory);
      }
    }
    if (postcodeParam) {
      setPostcode(postcodeParam.toUpperCase());
    }
  }, [searchParams]);

  // Fetch matches from API
  const fetchMatches = useCallback(async (categoryValue: string, postcodeValue: string, currentAnswers: Record<string, string | string[]>) => {
    setLoading(true);
    setError(null);

    try {
      // Build requirements from answers
      const requirements: Record<string, unknown> = {};
      let volume = 5000;
      let budget: number | undefined;
      let colourRatio = 0.2;

      Object.entries(currentAnswers).forEach(([field, value]) => {
        if (field === 'volume') {
          volume = parseVolume(value as string);
        } else if (field === 'currentMonthlyCost') {
          budget = parseBudget(value as string);
        } else if (field === 'colourRatio') {
          colourRatio = parseColourRatio(value as string);
        } else if (field === 'colour') {
          requirements.colour = parseColour(value as string);
        } else if (field === 'a3') {
          requirements.a3 = parseA3(value as string);
        } else if (field === 'features') {
          requirements.features = Array.isArray(value) ? value : [value];
        } else if (field === 'numberOfUsers') {
          requirements.numberOfUsers = parseVolume(value as string);
        } else if (field === 'numberOfCameras') {
          requirements.numberOfCameras = parseVolume(value as string);
        } else {
          requirements[field] = value;
        }
      });

      const response = await fetch(`${BACKEND_URL}/api/ai-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryValue,
          location: postcodeValue,
          volume,
          budget,
          colourRatio,
          requirements,
          limit: 10,
        }),
      });

      const data: APIResponse = await response.json();

      if (data.success) {
        setVendors(data.vendors);
        setFollowUpQuestions(data.followUp || []);
        setSummary(data.summary);
        setAnsweredFields(data.answeredFields || []);
      } else {
        setError('Failed to load suppliers');
      }
    } catch (err) {
      console.error('Failed to fetch matches:', err);
      setError('Failed to load suppliers. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle category selection and proceed
  const handleCategorySubmit = async () => {
    if (!category) return;
    await fetchMatches(category, postcode, {});
    setStep('questions');
    setCurrentQuestionIndex(0);
  };

  // Handle answer submission
  const handleAnswer = async (field: string, value: string | string[]) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers);

    // Re-fetch with new answers
    await fetchMatches(category, postcode, newAnswers);

    // Move to next question
    if (!showAllQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Skip to results
  const skipToResults = () => {
    setStep('results');
  };

  // Get current high-impact questions answered
  const highImpactAnswered = useMemo(() => {
    const highImpactFields = followUpQuestions
      .filter(q => q.impact === 'high')
      .map(q => q.field);
    return Object.keys(answers).filter(a => highImpactFields.includes(a)).length;
  }, [answers, followUpQuestions]);

  // Toggle vendor selection
  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors(prev =>
      prev.includes(vendorId) ? prev.filter(id => id !== vendorId) : [...prev, vendorId]
    );
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.contactName.trim()) errors.contactName = 'Contact name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) errors.phone = 'Invalid phone number';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit quote form
  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormSubmitting(true);

    try {
      const vendorIds = selectedVendors.length > 0
        ? selectedVendors
        : vendors.slice(0, 3).map(v => v.id);

      for (const vendorId of vendorIds) {
        await fetch(`${BACKEND_URL}/api/vendor-leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vendorId,
            service: category,
            companyName: formData.companyName.trim(),
            contactName: formData.contactName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            postcode: formData.postcode.trim().toUpperCase() || postcode,
            message: formData.message.trim() || undefined,
            timeline: formData.timeline,
            requirements: answers,
            source: { page: 'get-quotes', referrer: 'tendorai-nextjs' },
          }),
        });
      }

      setFormSubmitted(true);
    } catch (err) {
      console.error('Failed to submit quote:', err);
      setError('Failed to submit quote. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // =====================================================
  // RENDER: Category Selection
  // =====================================================
  const renderCategoryStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">What do you need?</h1>
        <p className="text-lg text-gray-600">Select a category to get started with personalised quotes</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              category === cat.value
                ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-200'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{cat.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{cat.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your postcode (optional but recommended)
        </label>
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          placeholder="e.g., CF10 1AA"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
          maxLength={10}
        />
        <p className="text-sm text-gray-500 mt-2">Helps us find suppliers in your area</p>
      </div>

      <button
        onClick={handleCategorySubmit}
        disabled={!category}
        className={`w-full py-4 text-lg font-semibold rounded-xl transition-all ${
          category
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        Find Suppliers
      </button>
    </div>
  );

  // =====================================================
  // RENDER: Question Flow
  // =====================================================
  const renderQuestionsStep = () => {
    const currentQuestion = followUpQuestions[currentQuestionIndex];
    const hasEnoughAnswers = highImpactAnswered >= 2 || Object.keys(answers).length >= 3;
    const allQuestionsAnswered = currentQuestionIndex >= followUpQuestions.length;

    if (loading && vendors.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Finding suppliers...</p>
        </div>
      );
    }

    if (allQuestionsAnswered || !currentQuestion) {
      return (
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Great! We have all we need</h2>
          <p className="text-gray-600 mb-6">
            We found <strong>{vendors.length}</strong> suppliers matching your requirements.
          </p>
          <button
            onClick={skipToResults}
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            See Your Matches
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestionIndex + 1} of {followUpQuestions.length}</span>
            <span>{vendors.length} suppliers matched</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / followUpQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current question */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-6">
          <div className="flex items-start justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.impact === 'high' ? 'bg-purple-100 text-purple-700' :
              currentQuestion.impact === 'medium' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {currentQuestion.impact === 'high' ? 'Important' : currentQuestion.impact === 'medium' ? 'Helpful' : 'Optional'}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h2>

          {currentQuestion.multiSelect ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const currentValue = answers[currentQuestion.field];
                const isSelected = Array.isArray(currentValue) && currentValue.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => {
                      const currentArr = Array.isArray(answers[currentQuestion.field])
                        ? answers[currentQuestion.field] as string[]
                        : [];
                      const newValue = isSelected
                        ? currentArr.filter(v => v !== option)
                        : [...currentArr, option];
                      setAnswers({ ...answers, [currentQuestion.field]: newValue });
                    }}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                      }`}>
                        {isSelected && <span className="text-white text-sm">✓</span>}
                      </div>
                      <span className="font-medium text-gray-900">{option}</span>
                    </div>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  const currentArr = Array.isArray(answers[currentQuestion.field])
                    ? answers[currentQuestion.field] as string[]
                    : [];
                  if (currentArr.length > 0) {
                    handleAnswer(currentQuestion.field, currentArr);
                  } else {
                    setCurrentQuestionIndex(prev => prev + 1);
                  }
                }}
                className="w-full mt-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(currentQuestion.field, option)}
                  disabled={loading}
                  className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all disabled:opacity-50"
                >
                  <span className="font-medium text-gray-900">{option}</span>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.help && (
            <p className="text-sm text-gray-500 mt-4 flex items-start gap-2">
              <span className="text-purple-500">💡</span>
              {currentQuestion.help}
            </p>
          )}
        </div>

        {/* Skip option */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Skip this question
          </button>

          {hasEnoughAnswers && (
            <button
              onClick={skipToResults}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              See {vendors.length} Results
              <span className="text-lg">→</span>
            </button>
          )}
        </div>

        {/* Summary of answered questions */}
        {Object.keys(answers).length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Your requirements:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(answers).map(([field, value]) => (
                <span key={field} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border">
                  {Array.isArray(value) ? value.join(', ') : value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // =====================================================
  // RENDER: Results
  // =====================================================
  const renderResultsStep = () => {
    const top3 = vendors.filter(v => v.badge);
    const others = vendors.filter(v => !v.badge);

    return (
      <div className="max-w-6xl mx-auto">
        {/* Summary header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Top Matches</h1>
          <p className="text-lg text-gray-600">
            {vendors.length} suppliers matched your requirements
            {summary?.withPricing ? ` • ${summary.withPricing} with pricing` : ''}
          </p>
        </div>

        {/* Requirements summary (editable) */}
        {Object.keys(answers).length > 0 && (
          <div className="mb-8 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-purple-900">Your requirements</h3>
              <button
                onClick={() => { setStep('questions'); setCurrentQuestionIndex(0); }}
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white rounded-full text-sm text-purple-700 border border-purple-200">
                {CATEGORIES.find(c => c.value === category)?.label}
              </span>
              {postcode && (
                <span className="px-3 py-1 bg-white rounded-full text-sm text-purple-700 border border-purple-200">
                  {postcode}
                </span>
              )}
              {Object.entries(answers).map(([, value]) => (
                <span key={String(value)} className="px-3 py-1 bg-white rounded-full text-sm text-purple-700 border border-purple-200">
                  {Array.isArray(value) ? value.slice(0, 2).join(', ') + (value.length > 2 ? '...' : '') : value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Top 3 recommended */}
        {top3.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for you</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {top3.map((vendor, index) => (
                <div
                  key={vendor.id}
                  className={`bg-white rounded-xl p-6 border-2 transition-all relative ${
                    index === 0 ? 'border-purple-500 ring-2 ring-purple-100' :
                    index === 1 ? 'border-blue-400' :
                    'border-green-400'
                  } ${selectedVendors.includes(vendor.id) ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                >
                  {/* Badge */}
                  <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                    index === 0 ? 'bg-purple-600' : index === 1 ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {vendor.badge}
                  </div>

                  {/* Selection checkbox */}
                  <button
                    onClick={() => toggleVendorSelection(vendor.id)}
                    className="absolute top-4 right-4 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors"
                    style={{
                      borderColor: selectedVendors.includes(vendor.id) ? '#7c3aed' : '#d1d5db',
                      backgroundColor: selectedVendors.includes(vendor.id) ? '#7c3aed' : 'white'
                    }}
                  >
                    {selectedVendors.includes(vendor.id) && <span className="text-white text-sm">✓</span>}
                  </button>

                  <div className="pt-4">
                    <h3 className="text-lg font-bold text-gray-900">{vendor.company}</h3>
                    {vendor.location && <p className="text-sm text-gray-500">{vendor.location}</p>}

                    {/* Match score */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-16 h-16 relative">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                          <circle
                            cx="32" cy="32" r="28"
                            stroke={index === 0 ? '#7c3aed' : index === 1 ? '#3b82f6' : '#22c55e'}
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${(vendor.matchScore / 100) * 175.9} 175.9`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">
                          {vendor.matchScore}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">Match</div>
                    </div>

                    {/* Rating */}
                    {vendor.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{vendor.rating.toFixed(1)}</span>
                        {vendor.reviewCount > 0 && (
                          <span className="text-gray-400 text-sm">({vendor.reviewCount})</span>
                        )}
                      </div>
                    )}

                    {/* Why recommended */}
                    <p className="text-sm text-gray-600 mt-3">{vendor.whyRecommended}</p>

                    {/* Product info */}
                    {vendor.product && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-900">{vendor.product.name}</p>
                        <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-600">
                          <span>{vendor.product.speed} ppm</span>
                          <span>•</span>
                          <span>{vendor.product.isA3 ? 'A3' : 'A4'}</span>
                          <span>•</span>
                          <span>{vendor.product.isColour ? 'Colour' : 'Mono'}</span>
                        </div>
                      </div>
                    )}

                    {/* Pricing */}
                    {vendor.pricing && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-purple-700">{vendor.pricing.estimatedMonthly}</span>
                          <span className="text-sm text-purple-600">/month</span>
                        </div>
                        {vendor.savings && (
                          <p className="text-sm text-green-600 mt-1">
                            Save {vendor.savings.formatted}/year
                          </p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedVendors([vendor.id]);
                          setStep('form');
                        }}
                        className="flex-1 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        Get Quote
                      </button>
                      <Link
                        href={`/suppliers/profile/${vendor.id}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other suppliers */}
        {others.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Other matching suppliers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((vendor) => (
                <div
                  key={vendor.id}
                  className={`bg-white rounded-xl p-5 border transition-all ${
                    selectedVendors.includes(vendor.id)
                      ? 'border-purple-500 ring-2 ring-purple-200'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{vendor.company}</h3>
                      {vendor.location && <p className="text-sm text-gray-500">{vendor.location}</p>}
                    </div>
                    <button
                      onClick={() => toggleVendorSelection(vendor.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        selectedVendors.includes(vendor.id)
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedVendors.includes(vendor.id) && <span className="text-sm">✓</span>}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-purple-600">{vendor.matchScore}% match</span>
                    {vendor.rating && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{vendor.rating.toFixed(1)} ★</span>
                      </>
                    )}
                  </div>

                  {vendor.pricing && (
                    <p className="text-lg font-bold text-gray-900 mb-3">{vendor.pricing.estimatedMonthly}/mo</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedVendors([vendor.id]);
                        setStep('form');
                      }}
                      className="flex-1 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700"
                    >
                      Get Quote
                    </button>
                    <Link
                      href={`/suppliers/profile/${vendor.id}`}
                      className="px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floating action bar */}
        {selectedVendors.length >= 2 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                  {selectedVendors.length}
                </span>
                <span className="text-gray-700 font-medium">suppliers selected</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedVendors([])}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Clear
                </button>
                <button
                  onClick={() => setStep('form')}
                  className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
                >
                  Get Quotes from All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // =====================================================
  // RENDER: Quote Form
  // =====================================================
  const renderFormStep = () => {
    if (formSubmitted) {
      return (
        <div className="max-w-xl mx-auto text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your enquiry. The selected suppliers will be in touch within 1-2 business days.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setFormSubmitted(false);
                setSelectedVendors([]);
                setStep('results');
              }}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
            >
              Get More Quotes
            </button>
            <Link
              href="/suppliers"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
            >
              Browse Suppliers
            </Link>
          </div>
        </div>
      );
    }

    const selectedVendorDetails = vendors.filter(v => selectedVendors.includes(v.id));

    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Get Your Personalised Quotes</h1>
          <p className="text-gray-600">
            {selectedVendorDetails.length > 0
              ? `Requesting quotes from ${selectedVendorDetails.map(v => v.company).join(', ')}`
              : `Requesting quotes from top ${Math.min(3, vendors.length)} suppliers`
            }
          </p>
        </div>

        <form onSubmit={handleSubmitQuote} className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  formErrors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your company name"
              />
              {formErrors.companyName && <p className="text-sm text-red-600 mt-1">{formErrors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  formErrors.contactName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your name"
              />
              {formErrors.contactName && <p className="text-sm text-red-600 mt-1">{formErrors.contactName}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="you@company.com"
              />
              {formErrors.email && <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  formErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="01234 567890"
              />
              {formErrors.phone && <p className="text-sm text-red-600 mt-1">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
              <input
                type="text"
                value={formData.postcode || postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="CF10 1AA"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="urgent">Urgent (ASAP)</option>
                <option value="soon">Soon (1-3 months)</option>
                <option value="planning">Planning (3-6 months)</option>
                <option value="future">Future (6+ months)</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Tell us about your specific requirements..."
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={formSubmitting}
              className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
            <button
              type="button"
              onClick={() => setStep('results')}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
            >
              Back
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting, you agree to be contacted by the selected suppliers.{' '}
            <Link href="/privacy" className="text-purple-600 hover:text-purple-700">Privacy Policy</Link>
          </p>
        </form>
      </div>
    );
  };

  // =====================================================
  // MAIN RENDER
  // =====================================================
  return (
    <main className="min-h-screen bg-gray-50 pt-16 pb-24">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4 text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Get Quotes</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {step === 'category' && 'Get Quotes from Verified Suppliers'}
            {step === 'questions' && `Tell us about your ${CATEGORIES.find(c => c.value === category)?.label.toLowerCase() || 'needs'}`}
            {step === 'results' && 'Your Matching Suppliers'}
            {step === 'form' && 'Request Your Quotes'}
          </h1>
          <p className="text-purple-100">
            {step === 'category' && 'Compare pricing and get personalised quotes — free, instant, no obligation'}
            {step === 'questions' && 'A few questions help us find the best suppliers for you'}
            {step === 'results' && `${vendors.length} suppliers found matching your requirements`}
            {step === 'form' && 'Fill in your details to receive personalised quotes'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8">
        {step === 'category' && renderCategoryStep()}
        {step === 'questions' && renderQuestionsStep()}
        {step === 'results' && renderResultsStep()}
        {step === 'form' && renderFormStep()}
      </section>

      {/* Trust badges */}
      <section className="py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>No obligation quotes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>70+ verified suppliers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Free to use</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
