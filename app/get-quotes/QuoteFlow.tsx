'use client';

import { useState, useCallback, useMemo } from 'react';
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
    serviceCategory?: string;
    speed?: number;
    isColour?: boolean;
    isA3?: boolean;
    features?: string[];
    systemType?: string;
    perUserMonthly?: number;
    resolution?: string;
    perCameraCost?: number;
    serviceType?: string;
    responseTimeSLA?: string;
  };
  pricing?: {
    estimatedMonthly: string;
    breakdown: Record<string, string>;
    cpcMono?: string | null;
    cpcColour?: string | null;
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
  followUp: unknown[];
  answeredFields: string[];
  filters: Record<string, unknown>;
}

interface Question {
  id: string;
  field: string;
  question: string;
  type: 'single' | 'multi' | 'text' | 'date';
  options?: string[];
  condition?: { field: string; values: string[] };
  placeholder?: string;
}

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  postcode: string;
  message: string;
  consent: boolean;
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
// CATEGORY-SPECIFIC QUESTION SETS
// =====================================================

const PHOTOCOPIER_QUESTIONS: Question[] = [
  {
    id: 'pc-volume',
    field: 'volume',
    question: 'How many pages do you print per month?',
    type: 'single',
    options: ['Under 1,000', '1,000-3,000', '3,000-5,000', '5,000-10,000', '10,000-20,000', '20,000+'],
  },
  {
    id: 'pc-colour',
    field: 'colour',
    question: 'Do you need colour printing?',
    type: 'single',
    options: ['Yes, regularly', 'Yes, occasionally', 'No, mono only'],
  },
  {
    id: 'pc-a3',
    field: 'a3',
    question: 'Do you need A3 printing?',
    type: 'single',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'pc-devices',
    field: 'devices',
    question: 'How many devices do you need?',
    type: 'single',
    options: ['1', '2-3', '4-5', '6+'],
  },
  {
    id: 'pc-features',
    field: 'features',
    question: 'What features do you need?',
    type: 'multi',
    options: ['Scanning', 'Fax', 'Stapling/Finishing', 'Booklet making', 'Wireless', 'Cloud printing'],
  },
  {
    id: 'pc-has-contract',
    field: 'hasContract',
    question: 'Do you currently have a copier contract?',
    type: 'single',
    options: ['Yes', 'No', "Don't know"],
  },
  {
    id: 'pc-current-provider',
    field: 'currentProvider',
    question: 'Who is your current provider?',
    type: 'text',
    placeholder: 'e.g. Xerox, Canon, Ricoh...',
    condition: { field: 'hasContract', values: ['Yes'] },
  },
  {
    id: 'pc-contract-end',
    field: 'contractEnd',
    question: 'When does your contract end?',
    type: 'date',
    condition: { field: 'hasContract', values: ['Yes'] },
  },
  {
    id: 'pc-current-cost',
    field: 'currentCost',
    question: 'What do you currently pay per month?',
    type: 'single',
    options: ['Under £100', '£100-£250', '£250-£500', '£500+'],
    condition: { field: 'hasContract', values: ['Yes'] },
  },
  {
    id: 'pc-timeline',
    field: 'timeline',
    question: 'How soon do you need this?',
    type: 'single',
    options: ['ASAP', '1-3 months', '3-6 months', 'Just researching'],
  },
  {
    id: 'pc-brands',
    field: 'brands',
    question: 'Any specific brands preferred?',
    type: 'multi',
    options: ['Canon', 'Ricoh', 'Konica Minolta', 'Xerox', 'Sharp', 'Kyocera', 'No preference'],
  },
];

const TELECOMS_QUESTIONS: Question[] = [
  {
    id: 'tel-services',
    field: 'telecomsServices',
    question: 'What telecoms services do you need?',
    type: 'multi',
    options: ['Phone system', 'SIP trunks', 'Broadband', 'Mobile', 'Lines & calls'],
  },
  {
    id: 'tel-users',
    field: 'users',
    question: 'How many users/handsets?',
    type: 'single',
    options: ['1-5', '6-10', '11-25', '26-50', '50+'],
  },
  {
    id: 'tel-mobile',
    field: 'mobileIntegration',
    question: 'Do you need mobile integration?',
    type: 'single',
    options: ['Yes', 'No'],
  },
  {
    id: 'tel-has-contract',
    field: 'hasContract',
    question: 'Do you currently have a telecoms contract?',
    type: 'single',
    options: ['Yes', 'No'],
  },
  {
    id: 'tel-current-provider',
    field: 'currentProvider',
    question: 'Who is your current provider?',
    type: 'text',
    placeholder: 'e.g. BT, Virgin, 8x8...',
    condition: { field: 'hasContract', values: ['Yes'] },
  },
  {
    id: 'tel-contract-end',
    field: 'contractEnd',
    question: 'When does your contract end?',
    type: 'date',
    condition: { field: 'hasContract', values: ['Yes'] },
  },
  {
    id: 'tel-current-cost',
    field: 'currentCost',
    question: 'What do you currently pay per month?',
    type: 'single',
    options: ['Under £100', '£100-£300', '£300-£500', '£500+'],
    condition: { field: 'hasContract', values: ['Yes'] },
  },
  {
    id: 'tel-recording',
    field: 'callRecording',
    question: 'Do you need call recording?',
    type: 'single',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'tel-crm',
    field: 'crmIntegration',
    question: 'Do you need CRM integration?',
    type: 'single',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'tel-timeline',
    field: 'timeline',
    question: 'How soon do you need this?',
    type: 'single',
    options: ['ASAP', '1-3 months', '3-6 months', 'Just researching'],
  },
];

const CCTV_QUESTIONS: Question[] = [
  {
    id: 'cctv-services',
    field: 'securityServices',
    question: 'What do you need?',
    type: 'multi',
    options: ['CCTV cameras', 'Access control', 'Intruder alarms', 'Fire alarms', 'Intercom'],
  },
  {
    id: 'cctv-cameras',
    field: 'cameras',
    question: 'How many cameras do you need?',
    type: 'single',
    options: ['1-4', '5-8', '9-16', '16+'],
  },
  {
    id: 'cctv-location',
    field: 'cameraLocation',
    question: 'Indoor, outdoor, or both?',
    type: 'single',
    options: ['Indoor', 'Outdoor', 'Both'],
  },
  {
    id: 'cctv-remote',
    field: 'remoteViewing',
    question: 'Do you need remote viewing?',
    type: 'single',
    options: ['Yes', 'No'],
  },
  {
    id: 'cctv-type',
    field: 'installationType',
    question: 'Is this a new installation or upgrade?',
    type: 'single',
    options: ['New installation', 'Upgrade existing'],
  },
  {
    id: 'cctv-cabling',
    field: 'existingCabling',
    question: 'Do you have existing cabling?',
    type: 'single',
    options: ['Yes', 'No', "Don't know"],
  },
  {
    id: 'cctv-timeline',
    field: 'timeline',
    question: 'How soon do you need this?',
    type: 'single',
    options: ['ASAP', '1-3 months', '3-6 months', 'Just researching'],
  },
];

const IT_QUESTIONS: Question[] = [
  {
    id: 'it-services',
    field: 'itServices',
    question: 'What do you need?',
    type: 'multi',
    options: ['Managed IT support', 'Cloud migration', 'Cybersecurity', 'Hardware', 'Software licensing', 'Data backup'],
  },
  {
    id: 'it-users',
    field: 'users',
    question: 'How many PCs/users?',
    type: 'single',
    options: ['1-10', '11-25', '26-50', '50-100', '100+'],
  },
  {
    id: 'it-current-support',
    field: 'currentSupport',
    question: 'Do you currently have IT support?',
    type: 'single',
    options: ['Yes, in-house', 'Yes, outsourced', 'No'],
  },
  {
    id: 'it-current-provider',
    field: 'currentProvider',
    question: 'Who is your current IT provider?',
    type: 'text',
    placeholder: 'e.g. company name...',
    condition: { field: 'currentSupport', values: ['Yes, outsourced'] },
  },
  {
    id: 'it-pain-point',
    field: 'painPoint',
    question: "What's your biggest IT pain point?",
    type: 'text',
    placeholder: 'e.g. Slow network, frequent downtime, security concerns...',
  },
  {
    id: 'it-timeline',
    field: 'timeline',
    question: 'How soon do you need this?',
    type: 'single',
    options: ['ASAP', '1-3 months', '3-6 months', 'Just researching'],
  },
];

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function getQuestionsForCategory(category: string): Question[] {
  switch (category) {
    case 'Photocopiers': return PHOTOCOPIER_QUESTIONS;
    case 'Telecoms': return TELECOMS_QUESTIONS;
    case 'CCTV': return CCTV_QUESTIONS;
    case 'IT': return IT_QUESTIONS;
    default: return [];
  }
}

function getVisibleQuestions(questions: Question[], answers: Record<string, string | string[]>): Question[] {
  return questions.filter(q => {
    if (!q.condition) return true;
    const currentValue = answers[q.condition.field];
    if (!currentValue) return false;
    const valueStr = Array.isArray(currentValue) ? currentValue[0] : currentValue;
    return q.condition.values.includes(valueStr);
  });
}

function mapTimeline(answer: string): string {
  const map: Record<string, string> = {
    'ASAP': 'urgent',
    '1-3 months': 'soon',
    '3-6 months': 'planning',
    'Just researching': 'future',
  };
  return map[answer] || 'soon';
}

function mapColour(answer: string): boolean | null {
  if (answer === 'Yes, regularly' || answer === 'Yes, occasionally') return true;
  if (answer === 'No, mono only') return false;
  return null;
}

function mapA3(answer: string): boolean | null {
  if (answer === 'Yes') return true;
  if (answer === 'No') return false;
  return null;
}

function mapVolume(answer: string): number {
  const map: Record<string, number> = {
    'Under 1,000': 500,
    '1,000-3,000': 2000,
    '3,000-5,000': 4000,
    '5,000-10,000': 7500,
    '10,000-20,000': 15000,
    '20,000+': 35000,
  };
  return map[answer] || 5000;
}

function mapUsers(answer: string): number {
  const map: Record<string, number> = {
    '1-5': 3, '6-10': 8, '11-25': 18, '26-50': 38, '50+': 75,
    '1-10': 5, '50-100': 75, '100+': 150,
  };
  return map[answer] || 10;
}

function mapCameras(answer: string): number {
  const map: Record<string, number> = {
    '1-4': 3, '5-8': 6, '9-16': 12, '16+': 24,
  };
  return map[answer] || 4;
}

function mapBudgetRange(answer: string): string | undefined {
  const map: Record<string, string> = {
    'Under £100': 'under-100',
    '£100-£250': '100-250',
    '£250-£500': '250-500',
    '£500+': '500-1000',
    '£100-£300': '100-250',
    '£300-£500': '250-500',
  };
  return map[answer];
}

function mapMonthlyCostNumber(answer: string): number | undefined {
  const map: Record<string, number> = {
    'Under £100': 75,
    '£100-£250': 175,
    '£250-£500': 375,
    '£500+': 600,
    '£100-£300': 200,
    '£300-£500': 400,
  };
  return map[answer];
}

function parseContractDate(dateStr: string): Date | undefined {
  if (!dateStr) return undefined;
  // dateStr is in format "YYYY-MM"
  const [year, month] = dateStr.split('-').map(Number);
  if (year && month) return new Date(year, month - 1, 1);
  return undefined;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// =====================================================
// MAIN COMPONENT
// =====================================================

interface QuoteFlowProps {
  initialCategory?: string;
  initialPostcode?: string;
}

export default function QuoteFlow({ initialCategory, initialPostcode }: QuoteFlowProps) {
  // Map initial category from URL param
  const mappedCategory = initialCategory
    ? CATEGORIES.find(
        c => c.value.toLowerCase() === initialCategory.toLowerCase() || c.label.toLowerCase().includes(initialCategory.toLowerCase())
      )?.value || ''
    : '';

  const [step, setStep] = useState<'category' | 'questions' | 'results' | 'form'>('category');
  const [category, setCategory] = useState(mappedCategory);
  const [postcode, setPostcode] = useState(initialPostcode?.toUpperCase() || '');

  // Answers accumulated from questions
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  // API data
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [summary, setSummary] = useState<APIResponse['summary'] | null>(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Text input state for current text question
  const [textInput, setTextInput] = useState('');

  // Date picker state for current date question
  const [dateMonth, setDateMonth] = useState('');
  const [dateYear, setDateYear] = useState('');

  // Multi-select temporary state
  const [multiSelections, setMultiSelections] = useState<string[]>([]);

  // Quote form
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    postcode: '',
    message: '',
    consent: false,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Get visible questions for current category
  const allQuestions = useMemo(() => getQuestionsForCategory(category), [category]);
  const visibleQuestions = useMemo(
    () => getVisibleQuestions(allQuestions, answers),
    [allQuestions, answers]
  );

  // Fetch matches from backend API
  const fetchMatches = useCallback(async (categoryValue: string, postcodeValue: string, currentAnswers: Record<string, string | string[]>) => {
    setLoading(true);
    setError(null);

    try {
      // Build requirements for the AI query from answers
      const requirements: Record<string, unknown> = {};
      let volume = 5000;
      let budget: number | undefined;
      let colourRatio = 0.2;

      Object.entries(currentAnswers).forEach(([field, value]) => {
        if (field === 'volume') {
          volume = mapVolume(value as string);
        } else if (field === 'colour') {
          const col = mapColour(value as string);
          if (col !== null) requirements.colour = col;
          if (value === 'Yes, occasionally') colourRatio = 0.15;
          else if (value === 'Yes, regularly') colourRatio = 0.4;
          else colourRatio = 0;
        } else if (field === 'a3') {
          const a3Val = mapA3(value as string);
          if (a3Val !== null) requirements.a3 = a3Val;
        } else if (field === 'features' || field === 'telecomsServices' || field === 'securityServices' || field === 'itServices') {
          requirements.features = Array.isArray(value) ? value : [value];
        } else if (field === 'users') {
          requirements.numberOfUsers = mapUsers(value as string);
        } else if (field === 'cameras') {
          requirements.numberOfCameras = mapCameras(value as string);
        } else if (field === 'currentCost') {
          budget = mapMonthlyCostNumber(value as string);
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
        setSummary(data.summary);
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

  // Handle category selection
  const handleCategorySubmit = () => {
    if (!category) return;
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep('questions');
  };

  // Handle answer for the current question
  const handleSingleAnswer = (field: string, value: string) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers);
    advanceToNextQuestion(newAnswers);
  };

  const handleMultiAnswer = (field: string, selections: string[]) => {
    const newAnswers = { ...answers, [field]: selections };
    setAnswers(newAnswers);
    setMultiSelections([]);
    advanceToNextQuestion(newAnswers);
  };

  const handleTextAnswer = (field: string, value: string) => {
    if (!value.trim()) {
      advanceToNextQuestion(answers);
      return;
    }
    const newAnswers = { ...answers, [field]: value.trim() };
    setAnswers(newAnswers);
    setTextInput('');
    advanceToNextQuestion(newAnswers);
  };

  const handleDateAnswer = (field: string, month: string, year: string) => {
    if (!month || !year) {
      advanceToNextQuestion(answers);
      return;
    }
    const dateValue = `${year}-${month.padStart(2, '0')}`;
    const newAnswers = { ...answers, [field]: dateValue };
    setAnswers(newAnswers);
    setDateMonth('');
    setDateYear('');
    advanceToNextQuestion(newAnswers);
  };

  const advanceToNextQuestion = (currentAnswers: Record<string, string | string[]>) => {
    // Recalculate visible questions with new answers
    const newVisible = getVisibleQuestions(allQuestions, currentAnswers);
    const currentQ = visibleQuestions[currentQuestionIndex];
    // Find the index of the current question in the new visible list, then advance
    const currentIdx = newVisible.findIndex(q => q.id === currentQ?.id);
    const nextIdx = currentIdx + 1;

    if (nextIdx >= newVisible.length) {
      // All questions answered, fetch matches and go to results
      fetchMatches(category, postcode, currentAnswers);
      setStep('results');
    } else {
      setCurrentQuestionIndex(nextIdx);
      // Reset input states for next question
      setTextInput('');
      setDateMonth('');
      setDateYear('');
      setMultiSelections([]);
    }
  };

  // Skip current question
  const skipQuestion = () => {
    advanceToNextQuestion(answers);
  };

  // Go to results early
  const skipToResults = () => {
    fetchMatches(category, postcode, answers);
    setStep('results');
  };

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
    if (!formData.contactName.trim()) errors.contactName = 'Your name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) errors.phone = 'Invalid phone number';
    if (!formData.consent) errors.consent = 'You must agree to be contacted';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Build structured payload for backend
  const buildSubmissionPayload = (vendorId: string) => {
    const timelineAnswer = answers.timeline as string;
    const colourAnswer = answers.colour as string;
    const a3Answer = answers.a3 as string;
    const currentCost = answers.currentCost as string;
    const contractEnd = answers.contractEnd as string;
    const providerName = answers.currentProvider as string;

    return {
      vendorId,
      service: category,
      companyName: formData.companyName.trim(),
      contactName: formData.contactName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      postcode: (formData.postcode.trim() || postcode).toUpperCase(),
      message: formData.message.trim() || undefined,
      timeline: timelineAnswer ? mapTimeline(timelineAnswer) : 'soon',
      // Structured requirements — ALL answers
      requirements: { ...answers },
      // Mapped fields for backward compat
      colour: colourAnswer ? mapColour(colourAnswer) : undefined,
      a3: a3Answer ? mapA3(a3Answer) : undefined,
      features: (answers.features as string[]) || (answers.telecomsServices as string[]) || (answers.securityServices as string[]) || (answers.itServices as string[]) || [],
      specificVolume: answers.volume ? mapVolume(answers.volume as string) : undefined,
      budgetRange: currentCost ? mapBudgetRange(currentCost) : undefined,
      currentMonthlyCost: currentCost ? mapMonthlyCostNumber(currentCost) : undefined,
      currentProvider: providerName ? {
        name: providerName,
        contractEndDate: contractEnd ? parseContractDate(contractEnd) : undefined,
        monthlyCost: currentCost || undefined,
      } : undefined,
      source: { page: 'get-quotes', referrer: 'tendorai-nextjs' },
    };
  };

  // Submit quote form
  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormSubmitting(true);
    setError(null);

    try {
      const vendorIds = selectedVendors.length > 0
        ? selectedVendors
        : vendors.slice(0, 3).map(v => v.id);

      for (const vendorId of vendorIds) {
        await fetch(`${BACKEND_URL}/api/vendor-leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildSubmissionPayload(vendorId)),
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
        Continue
      </button>
    </div>
  );

  // =====================================================
  // RENDER: Question Flow
  // =====================================================
  const renderQuestionsStep = () => {
    const currentQuestion = visibleQuestions[currentQuestionIndex];
    const hasAnsweredEnough = Object.keys(answers).length >= 3;

    if (!currentQuestion) {
      // All questions done — auto-advance
      return (
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Great, we have everything we need!</h2>
          <p className="text-gray-600 mb-6">Finding the best suppliers for your requirements...</p>
          <button
            onClick={skipToResults}
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            See Your Matches
          </button>
        </div>
      );
    }

    const totalVisible = visibleQuestions.length;
    const progress = ((currentQuestionIndex) / totalVisible) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestionIndex + 1} of {totalVisible}</span>
            <span>{CATEGORIES.find(c => c.value === category)?.label}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current question card */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h2>

          {/* Single select */}
          {currentQuestion.type === 'single' && currentQuestion.options && (
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSingleAnswer(currentQuestion.field, option)}
                  className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all"
                >
                  <span className="font-medium text-gray-900">{option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Multi select */}
          {currentQuestion.type === 'multi' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = multiSelections.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => {
                      setMultiSelections(prev =>
                        isSelected ? prev.filter(v => v !== option) : [...prev, option]
                      );
                    }}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                      }`}>
                        {isSelected && <span className="text-white text-sm">&#10003;</span>}
                      </div>
                      <span className="font-medium text-gray-900">{option}</span>
                    </div>
                  </button>
                );
              })}
              <button
                onClick={() => handleMultiAnswer(currentQuestion.field, multiSelections)}
                disabled={multiSelections.length === 0}
                className="w-full mt-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Text input */}
          {currentQuestion.type === 'text' && (
            <div className="space-y-4">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={currentQuestion.placeholder || 'Type your answer...'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleTextAnswer(currentQuestion.field, textInput);
                  }
                }}
                autoFocus
              />
              <button
                onClick={() => handleTextAnswer(currentQuestion.field, textInput)}
                className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                {textInput.trim() ? 'Continue' : 'Skip'}
              </button>
            </div>
          )}

          {/* Date picker (month/year) */}
          {currentQuestion.type === 'date' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <select
                    value={dateMonth}
                    onChange={(e) => setDateMonth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select month</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={String(i + 1)}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    value={dateYear}
                    onChange={(e) => setDateYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 6 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return <option key={year} value={String(year)}>{year}</option>;
                    })}
                  </select>
                </div>
              </div>
              <button
                onClick={() => handleDateAnswer(currentQuestion.field, dateMonth, dateYear)}
                className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                {dateMonth && dateYear ? 'Continue' : 'Skip'}
              </button>
            </div>
          )}
        </div>

        {/* Skip + quick actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={skipQuestion}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Skip this question
          </button>

          {hasAnsweredEnough && (
            <button
              onClick={skipToResults}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              See Results
              <span className="text-lg">&rarr;</span>
            </button>
          )}
        </div>

        {/* Summary of answered questions */}
        {Object.keys(answers).length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Your requirements so far:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(answers).map(([field, value]) => {
                // Format date values nicely
                if (typeof value === 'string' && /^\d{4}-\d{2}$/.test(value)) {
                  const [y, m] = value.split('-');
                  return (
                    <span key={field} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border">
                      {MONTHS[parseInt(m) - 1]} {y}
                    </span>
                  );
                }
                return (
                  <span key={field} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                );
              })}
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
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Finding the best suppliers for you...</p>
        </div>
      );
    }

    const top3 = vendors.filter(v => v.badge);
    const others = vendors.filter(v => !v.badge);

    return (
      <div className="max-w-6xl mx-auto">
        {/* Summary header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Top Matches</h1>
          <p className="text-lg text-gray-600">
            {vendors.length} suppliers matched your requirements
            {summary?.withPricing ? ` \u2022 ${summary.withPricing} with pricing` : ''}
          </p>
        </div>

        {/* Requirements summary */}
        {Object.keys(answers).length > 0 && (
          <div className="mb-8 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-purple-900">Your requirements</h3>
              <button
                onClick={() => { setStep('questions'); setCurrentQuestionIndex(0); setMultiSelections([]); }}
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
              {Object.entries(answers).map(([field, value]) => {
                if (typeof value === 'string' && /^\d{4}-\d{2}$/.test(value)) {
                  const [y, m] = value.split('-');
                  return (
                    <span key={field} className="px-3 py-1 bg-white rounded-full text-sm text-purple-700 border border-purple-200">
                      Contract ends {MONTHS[parseInt(m) - 1]} {y}
                    </span>
                  );
                }
                return (
                  <span key={field} className="px-3 py-1 bg-white rounded-full text-sm text-purple-700 border border-purple-200">
                    {Array.isArray(value) ? value.slice(0, 2).join(', ') + (value.length > 2 ? '...' : '') : value}
                  </span>
                );
              })}
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
                    {selectedVendors.includes(vendor.id) && <span className="text-white text-sm">&#10003;</span>}
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
                        <span className="text-yellow-500">&#9733;</span>
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
                          {vendor.product.serviceCategory === 'Telecoms' ? (
                            <>
                              <span>{vendor.product.systemType}</span>
                              {vendor.product.perUserMonthly && <><span>&bull;</span><span>&pound;{vendor.product.perUserMonthly}/user/mo</span></>}
                            </>
                          ) : vendor.product.serviceCategory === 'CCTV' ? (
                            <>
                              <span>{vendor.product.resolution}</span>
                              {vendor.product.perCameraCost && <><span>&bull;</span><span>&pound;{vendor.product.perCameraCost}/camera</span></>}
                            </>
                          ) : vendor.product.serviceCategory === 'IT' ? (
                            <>
                              <span>{vendor.product.serviceType}</span>
                              {vendor.product.perUserMonthly && <><span>&bull;</span><span>&pound;{vendor.product.perUserMonthly}/user/mo</span></>}
                              {vendor.product.responseTimeSLA && <><span>&bull;</span><span>{vendor.product.responseTimeSLA} SLA</span></>}
                            </>
                          ) : (
                            <>
                              {vendor.product.speed && <span>{vendor.product.speed} ppm</span>}
                              {vendor.product.speed && <span>&bull;</span>}
                              <span>{vendor.product.isA3 ? 'A3' : 'A4'}</span>
                              <span>&bull;</span>
                              <span>{vendor.product.isColour ? 'Colour' : 'Mono'}</span>
                            </>
                          )}
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
                      {selectedVendors.includes(vendor.id) && <span className="text-sm">&#10003;</span>}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-purple-600">{vendor.matchScore}% match</span>
                    {vendor.rating && (
                      <>
                        <span className="text-gray-300">&bull;</span>
                        <span className="text-sm text-gray-600">{vendor.rating.toFixed(1)} &#9733;</span>
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

        {/* No vendors state */}
        {vendors.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No exact matches found</h2>
            <p className="text-gray-500 mb-6">
              Don&apos;t worry - submit your details and we&apos;ll find suppliers for you manually.
            </p>
            <button
              onClick={() => setStep('form')}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
            >
              Submit Your Requirements
            </button>
          </div>
        )}

        {/* Floating action bar for multi-select */}
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
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
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
                Your Name <span className="text-red-500">*</span>
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
                Phone Number <span className="text-red-500">*</span>
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Postcode</label>
            <input
              type="text"
              value={formData.postcode || postcode}
              onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="CF10 1AA"
              maxLength={10}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (optional)</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Any additional details about your requirements..."
            />
          </div>

          {/* Consent checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">
                I agree to be contacted by up to 3 matched suppliers regarding my quote request.{' '}
                <Link href="/privacy" className="text-purple-600 hover:text-purple-700 underline">Privacy Policy</Link>
              </span>
            </label>
            {formErrors.consent && <p className="text-sm text-red-600 mt-1">{formErrors.consent}</p>}
          </div>

          <div className="flex gap-3">
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
            {step === 'category' && 'Compare pricing and get personalised quotes \u2014 free, instant, no obligation'}
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
              <span className="text-green-500">&#10003;</span>
              <span>No obligation quotes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              <span>1,000+ verified suppliers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span>
              <span>Free to use</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
