'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { NEARBY_LOCATIONS, POSTCODE_AREAS, MAJOR_LOCATIONS } from '@/lib/constants/locations';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

interface TestResult {
  query: string;
  aiResponse: string;
  vendorFound: boolean;
  vendorPosition: string;
  totalCompaniesRecommended: number;
  competitorsInResponse: string[];
  testsRemaining: number;
  isPaid: boolean;
  resetDate: string | null;
  limited?: boolean;
  message?: string;
}

interface HistoryItem {
  id: string;
  date: string;
  query: string;
  found: boolean;
  position: string;
  competitors: string[];
  snippet: string;
}

interface AISearchTestProps {
  token: string;
  tier: string;
  vendorName: string;
  vendorCategory: string;
  vendorLocation: string;
  vendorServices?: string[];
  vendorCoverage?: string[];
}

const QUESTION_TYPES = [
  { value: 'Who are the best', label: 'Who are the best...' },
  { value: 'Recommend a', label: 'Recommend a...' },
  { value: 'I need a', label: 'I need a...' },
];

const CATEGORY_MAP: Record<string, string> = {
  Photocopiers: 'copier supplier',
  Telecoms: 'telecoms provider',
  CCTV: 'CCTV installer',
  IT: 'IT support company',
  Security: 'security systems provider',
  Software: 'business software provider',
};

export default function AISearchTest({
  token,
  tier,
  vendorName,
  vendorCategory,
  vendorLocation,
  vendorServices,
  vendorCoverage,
}: AISearchTestProps) {
  const [questionType, setQuestionType] = useState(QUESTION_TYPES[0].value);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);
  const [testsRemaining, setTestsRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exhausted, setExhausted] = useState(false);

  // Typing animation state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const category = vendorCategory || 'your service';
  const location = vendorLocation || 'your area';

  // Build category options from vendor's services
  const categoryOptions = useMemo(() => {
    const services = vendorServices?.length ? vendorServices : [vendorCategory].filter(Boolean);
    return services.map((svc) => ({
      value: CATEGORY_MAP[svc] || svc.toLowerCase(),
      label: CATEGORY_MAP[svc] || svc.toLowerCase(),
      raw: svc,
    }));
  }, [vendorServices, vendorCategory]);

  // Build area options from vendor's city + coverage + nearby
  const areaOptions = useMemo(() => {
    const areas = new Set<string>();
    if (vendorLocation) areas.add(vendorLocation);
    // Resolve postcode prefixes (CF, NP, BS) to city names
    if (vendorCoverage) {
      vendorCoverage.forEach((c) => {
        const mapped = POSTCODE_AREAS[c.toUpperCase() as keyof typeof POSTCODE_AREAS];
        if (mapped) {
          areas.add(mapped.name);
        } else {
          areas.add(c);
        }
      });
    }
    // Add nearby locations for the vendor's city
    const nearby = NEARBY_LOCATIONS[vendorLocation?.toLowerCase() || ''];
    if (nearby) nearby.forEach((loc) => areas.add(loc));
    // Fallback: if still empty, show major locations
    if (areas.size === 0) {
      MAJOR_LOCATIONS.forEach((loc) => areas.add(loc));
    }
    return Array.from(areas);
  }, [vendorLocation, vendorCoverage]);

  // Set defaults when options load
  useEffect(() => {
    if (categoryOptions.length > 0 && !selectedCategory) {
      setSelectedCategory(categoryOptions[0].value);
    }
  }, [categoryOptions, selectedCategory]);

  useEffect(() => {
    if (areaOptions.length > 0 && !selectedArea) {
      setSelectedArea(areaOptions[0]);
    }
  }, [areaOptions, selectedArea]);

  // Compose query from dropdowns
  const composedQuery = useMemo(() => {
    if (!selectedCategory || !selectedArea) return '';
    return `${questionType} ${selectedCategory} in ${selectedArea}?`;
  }, [questionType, selectedCategory, selectedArea]);

  // Fetch history on mount
  const fetchHistory = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/ai-search-test/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setHistory(json.data.tests || []);
        const remaining = json.data.testsRemaining;
        setTestsRemaining(remaining);
        if (remaining === 0) setExhausted(true);
      }
    } catch {
      // Silent fail on history
    }
  }, [token]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Typing animation effect
  useEffect(() => {
    if (!isTyping || !result?.aiResponse) return;

    const text = result.aiResponse;
    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        const chunk = text.substring(index, index + 4);
        setDisplayedText((prev) => prev + chunk);
        index += 4;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [isTyping, result?.aiResponse]);

  const runTest = async () => {
    if (!composedQuery.trim() || loading || exhausted) return;
    setError(null);
    setResult(null);
    setDisplayedText('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/ai-search-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: composedQuery.trim() }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || 'Failed to run test');
        return;
      }

      const data = json.data;
      setResult(data);
      const remaining = data.testsRemaining ?? testsRemaining;
      setTestsRemaining(remaining);

      if (remaining === 0) {
        setExhausted(true);
      }

      if (!data.limited) {
        setIsTyping(true);
        fetchHistory();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Highlight vendor name in text
  const highlightVendorName = (text: string) => {
    if (!vendorName) return text;
    const escaped = vendorName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded font-semibold">$1</mark>');
  };

  const positionLabel = (pos: string) => {
    switch (pos) {
      case 'first': return '1st recommendation';
      case 'top3': return 'Top 3';
      case 'mentioned': return 'Mentioned';
      default: return 'Not found';
    }
  };

  const isPaid = tier !== 'free' && tier !== 'listed';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Test Your AI Visibility</h2>
      <p className="text-sm text-gray-500 mb-4">
        See what AI tools say when someone searches for your type of business.
      </p>

      {/* Dropdown Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          disabled={loading || exhausted}
          className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white disabled:opacity-50 disabled:bg-gray-100"
        >
          {QUESTION_TYPES.map((qt) => (
            <option key={qt.value} value={qt.value}>{qt.label}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={loading || exhausted}
          className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white disabled:opacity-50 disabled:bg-gray-100"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          disabled={loading || exhausted}
          className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white disabled:opacity-50 disabled:bg-gray-100"
        >
          {areaOptions.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* Query Preview + Search Button */}
      <div className="flex items-center gap-3 mb-4">
        {composedQuery && (
          <p className="flex-1 text-sm text-gray-500 italic truncate">
            &ldquo;{composedQuery}&rdquo;
          </p>
        )}
        <button
          onClick={runTest}
          disabled={loading || !composedQuery.trim() || exhausted}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm whitespace-nowrap"
        >
          {loading ? 'Asking AI...' : 'Search'}
        </button>
      </div>

      {/* Exhausted Banner */}
      {exhausted && (
        <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg mb-4 text-center">
          <p className="text-gray-700 font-medium mb-2">You&apos;ve used all your free tests</p>
          <p className="text-sm text-gray-500 mb-3">Upgrade to get 10 monthly tests and track how AI recommends your business.</p>
          <a
            href="/vendor-dashboard/settings?tab=subscription"
            className="inline-block px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
          >
            Upgrade to Visible &mdash; &pound;99/mo
          </a>
        </div>
      )}

      {/* Tests Remaining Bar (after each test, non-exhausted) */}
      {!exhausted && testsRemaining !== null && testsRemaining <= 3 && result && !result.limited && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4 flex items-center justify-between">
          <span className="text-sm text-amber-800 font-medium">
            {testsRemaining} test{testsRemaining !== 1 ? 's' : ''} remaining
          </span>
          {!isPaid && (
            <a
              href="/vendor-dashboard/settings?tab=subscription"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Upgrade for 10 monthly tests &rarr;
            </a>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="py-8 text-center">
          <div className="inline-flex items-center gap-2 text-purple-600">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm font-medium">Asking AI...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Rate Limited */}
      {result?.limited && (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-center">
          <p className="text-amber-800 font-medium mb-2">{result.message}</p>
          {!result.isPaid && (
            <a
              href="/vendor-dashboard/settings?tab=subscription"
              className="inline-block mt-2 px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
            >
              Upgrade to Visible &mdash; &pound;99/mo
            </a>
          )}
        </div>
      )}

      {/* Results */}
      {result && !result.limited && !loading && (
        <div className="space-y-4">
          {/* Verdict Banner */}
          <div
            className={`p-4 rounded-lg border ${
              result.vendorFound
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <p className={`text-lg font-bold ${result.vendorFound ? 'text-green-800' : 'text-red-800'}`}>
              {result.vendorFound
                ? `You were found! Position: ${positionLabel(result.vendorPosition)}`
                : "AI didn't recommend you for this search"}
            </p>
          </div>

          {/* AI Response with vendor name highlighted */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-medium">AI Response</p>
            <div
              className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: highlightVendorName(isTyping ? displayedText : result.aiResponse) +
                  (isTyping ? '<span class="inline-block w-0.5 h-4 bg-purple-600 animate-pulse ml-0.5 align-text-bottom"></span>' : ''),
              }}
            />
          </div>

          {/* Competitor Analysis */}
          <div className="p-4 bg-white border rounded-lg">
            <p className="text-sm font-medium text-gray-900 mb-2">
              {result.totalCompaniesRecommended} {result.totalCompaniesRecommended === 1 ? 'company was' : 'companies were'} recommended
            </p>
            {result.competitorsInResponse.length > 0 && (
              <>
                <p className="text-xs text-gray-500 mb-2">
                  {result.vendorFound
                    ? 'Other companies also mentioned:'
                    : 'These companies appeared instead of you:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.competitorsInResponse.map((c, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Tests Remaining (inline, non-prominent) */}
          {!exhausted && (
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <span>Tests remaining: {result.testsRemaining}</span>
              {!result.isPaid && result.testsRemaining <= 1 && (
                <a
                  href="/vendor-dashboard/settings?tab=subscription"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Get 10 monthly tests &rarr; Upgrade
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Test History */}
      {history.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Previous Tests</h3>
          <div className="space-y-2">
            {history.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedHistory(expandedHistory === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`flex-shrink-0 w-2 h-2 rounded-full ${item.found ? 'bg-green-500' : 'bg-red-400'}`} />
                    <span className="text-sm text-gray-700 truncate">{item.query}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.found
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.found ? positionLabel(item.position) : 'Not found'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </button>
                {expandedHistory === item.id && item.snippet && (
                  <div className="px-3 pb-3 border-t bg-gray-50">
                    <p className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">{item.snippet}</p>
                    {item.competitors.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.competitors.map((c, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">{c}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tests Remaining Footer (when no result shown, not exhausted) */}
      {!result && !exhausted && testsRemaining !== null && (
        <div className="text-xs text-gray-400 text-center">
          {testsRemaining} test{testsRemaining !== 1 ? 's' : ''} remaining
        </div>
      )}
    </div>
  );
}
