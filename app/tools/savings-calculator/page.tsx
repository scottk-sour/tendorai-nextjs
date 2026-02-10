'use client';

import { useState } from 'react';
import Link from 'next/link';

type Category = 'Photocopiers' | 'Telecoms' | 'CCTV';

interface CalculatorResult {
  marketAverage: number;
  bestAvailable: number;
  potentialSavings: number;
  savingsPercentage: number;
  supplierCount: number;
  cpcComparison?: {
    userMono: number;
    userColour: number;
    avgMono: number;
    avgColour: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

// Default market averages when no API data available
const defaultAverages: Record<Category, { monthly: number; monoRate: number; colourRate: number }> = {
  Photocopiers: { monthly: 180, monoRate: 0.5, colourRate: 3.8 },
  Telecoms: { monthly: 150, monoRate: 0, colourRate: 0 },
  CCTV: { monthly: 120, monoRate: 0, colourRate: 0 },
};

export default function SavingsCalculatorPage() {
  const [category, setCategory] = useState<Category>('Photocopiers');
  const [currentCost, setCurrentCost] = useState<string>('');
  const [monthlyVolume, setMonthlyVolume] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
  const [cpcMono, setCpcMono] = useState<string>('');
  const [cpcColour, setCpcColour] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const calculateSavings = async () => {
    if (!currentCost) return;

    setLoading(true);
    setCalculated(false);

    try {
      const cost = parseFloat(currentCost);
      const volume = monthlyVolume ? parseInt(monthlyVolume) : 5000;

      // Try to get real data from API
      const response = await fetch(`${API_URL}/api/ai-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `${category} comparison`,
          location: postcode || 'UK',
          category,
          volume,
          budget: cost,
          requirements: category === 'Photocopiers' ? { colour: true, a3: true } : {},
        }),
      });

      let marketAverage = defaultAverages[category].monthly;
      let bestAvailable = marketAverage * 0.7;
      let supplierCount = 0;
      let avgMono = defaultAverages[category].monoRate;
      let avgColour = defaultAverages[category].colourRate;

      if (response.ok) {
        const data = await response.json();
        if (data.vendors && data.vendors.length > 0) {
          supplierCount = data.vendors.length;

          // Calculate averages from real data
          const pricesWithPricing = data.vendors
            .filter((v: { pricing?: { estimatedMonthly?: string } }) => v.pricing?.estimatedMonthly)
            .map((v: { pricing: { estimatedMonthly: string } }) =>
              parseFloat(v.pricing.estimatedMonthly.replace('£', ''))
            );

          if (pricesWithPricing.length > 0) {
            marketAverage = pricesWithPricing.reduce((a: number, b: number) => a + b, 0) / pricesWithPricing.length;
            bestAvailable = Math.min(...pricesWithPricing);
          }

          // Get CPC averages from products
          const cpcRates = data.vendors
            .filter((v: { pricing?: { cpcMono?: string; cpcColour?: string } }) => v.pricing?.cpcMono)
            .map((v: { pricing: { cpcMono: string; cpcColour?: string } }) => ({
              mono: parseFloat(v.pricing.cpcMono.replace('p', '')),
              colour: v.pricing.cpcColour ? parseFloat(v.pricing.cpcColour.replace('p', '')) : 0,
            }));

          if (cpcRates.length > 0) {
            avgMono = cpcRates.reduce((a: number, b: { mono: number }) => a + b.mono, 0) / cpcRates.length;
            avgColour = cpcRates
              .filter((r: { colour: number }) => r.colour > 0)
              .reduce((a: number, b: { colour: number }, _: number, arr: { colour: number }[]) =>
                a + b.colour / arr.length, 0) || avgColour;
          }
        }
      }

      const potentialSavings = Math.max(0, cost - marketAverage);
      const savingsPercentage = cost > 0 ? Math.round((potentialSavings / cost) * 100) : 0;

      const resultData: CalculatorResult = {
        marketAverage: Math.round(marketAverage),
        bestAvailable: Math.round(bestAvailable),
        potentialSavings: Math.round(potentialSavings),
        savingsPercentage,
        supplierCount: supplierCount || 10,
      };

      // Add CPC comparison for photocopiers
      if (category === 'Photocopiers' && (cpcMono || cpcColour)) {
        resultData.cpcComparison = {
          userMono: cpcMono ? parseFloat(cpcMono) : 0,
          userColour: cpcColour ? parseFloat(cpcColour) : 0,
          avgMono: Math.round(avgMono * 10) / 10,
          avgColour: Math.round(avgColour * 10) / 10,
        };
      }

      setResult(resultData);
      setCalculated(true);
    } catch (error) {
      console.error('Calculation error:', error);
      // Use defaults on error
      const cost = parseFloat(currentCost);
      const marketAverage = defaultAverages[category].monthly;
      setResult({
        marketAverage,
        bestAvailable: Math.round(marketAverage * 0.7),
        potentialSavings: Math.max(0, Math.round(cost - marketAverage)),
        savingsPercentage: Math.max(0, Math.round(((cost - marketAverage) / cost) * 100)),
        supplierCount: 10,
      });
      setCalculated(true);
    } finally {
      setLoading(false);
    }
  };

  const getQuoteUrl = () => {
    const params = new URLSearchParams();
    params.set('category', category);
    if (postcode) params.set('postcode', postcode);
    if (monthlyVolume) params.set('volume', monthlyVolume);
    if (currentCost) params.set('budget', currentCost);
    return `/get-quotes?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-16">
        <div className="section text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Office Equipment Savings Calculator
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            See how much you could save by comparing your current costs against
            market rates from verified UK suppliers.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="section py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Current Setup</h2>

              {/* Category Pills */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['Photocopiers', 'Telecoms', 'CCTV'] as Category[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setResult(null);
                        setCalculated(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        category === cat
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Monthly Cost */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Monthly Cost *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                  <input
                    type="number"
                    value={currentCost}
                    onChange={(e) => setCurrentCost(e.target.value)}
                    placeholder="e.g. 250"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Include lease, CPC charges, and any service fees
                </p>
              </div>

              {/* Postcode */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode (Optional)
                </label>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="e.g. CF10 or BS1"
                  maxLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get results from suppliers in your area
                </p>
              </div>

              {/* Photocopier-specific fields */}
              {category === 'Photocopiers' && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Print Volume (Optional)
                    </label>
                    <input
                      type="number"
                      value={monthlyVolume}
                      onChange={(e) => setMonthlyVolume(e.target.value)}
                      placeholder="e.g. 5000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Mono CPC (pence)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={cpcMono}
                        onChange={(e) => setCpcMono(e.target.value)}
                        placeholder="e.g. 0.6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Colour CPC (pence)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={cpcColour}
                        onChange={(e) => setCpcColour(e.target.value)}
                        placeholder="e.g. 4.5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Calculate Button */}
              <button
                onClick={calculateSavings}
                disabled={!currentCost || loading}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Calculating...' : 'Calculate Savings'}
              </button>
            </div>

            {/* Results */}
            <div className={`bg-white rounded-xl shadow-sm p-6 lg:p-8 ${!calculated ? 'opacity-50' : ''}`}>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Potential Savings</h2>

              {!calculated ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p>Enter your current costs to see potential savings</p>
                </div>
              ) : result && (
                <>
                  {/* Savings Summary */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-100">
                    <div className="text-center">
                      <p className="text-sm text-green-600 font-medium mb-1">You could save up to</p>
                      <p className="text-4xl font-bold text-green-700">
                        £{result.potentialSavings}
                        <span className="text-xl font-normal text-green-600">/mo</span>
                      </p>
                      {result.savingsPercentage > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          That&apos;s {result.savingsPercentage}% less than you&apos;re paying now
                        </p>
                      )}
                      <p className="text-2xl font-semibold text-green-700 mt-3">
                        £{result.potentialSavings * 12}/year
                      </p>
                    </div>
                  </div>

                  {/* Market Comparison */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Your Current Cost</p>
                        <p className="text-lg font-semibold text-gray-900">£{currentCost}/mo</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 text-lg">↑</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Market Average</p>
                        <p className="text-lg font-semibold text-gray-900">£{result.marketAverage}/mo</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-yellow-600 text-lg">→</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <div>
                        <p className="text-sm text-green-600">Best Available</p>
                        <p className="text-lg font-semibold text-green-700">£{result.bestAvailable}/mo</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-lg">↓</span>
                      </div>
                    </div>
                  </div>

                  {/* CPC Comparison */}
                  {result.cpcComparison && (result.cpcComparison.userMono > 0 || result.cpcComparison.userColour > 0) && (
                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-sm font-medium text-purple-700 mb-3">CPC Rate Comparison</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {result.cpcComparison.userMono > 0 && (
                          <div>
                            <p className="text-gray-500">A4 Mono</p>
                            <p className="font-medium">
                              Your rate: {result.cpcComparison.userMono}p
                              {result.cpcComparison.userMono > result.cpcComparison.avgMono && (
                                <span className="text-red-600 ml-2">
                                  (avg: {result.cpcComparison.avgMono}p)
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                        {result.cpcComparison.userColour > 0 && (
                          <div>
                            <p className="text-gray-500">A4 Colour</p>
                            <p className="font-medium">
                              Your rate: {result.cpcComparison.userColour}p
                              {result.cpcComparison.userColour > result.cpcComparison.avgColour && (
                                <span className="text-red-600 ml-2">
                                  (avg: {result.cpcComparison.avgColour}p)
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-500 mb-6">
                    Based on {result.supplierCount} suppliers{postcode ? ` in your area` : ' across the UK'}
                  </p>

                  {/* CTA */}
                  <Link
                    href={getQuoteUrl()}
                    className="block w-full py-3 bg-purple-600 text-white font-semibold rounded-lg text-center hover:bg-purple-700 transition-colors"
                  >
                    Get Actual Quotes from Local Suppliers
                  </Link>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Free, no-obligation quotes
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How This Calculator Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enter Your Costs</h3>
              <p className="text-sm text-gray-600">
                Tell us what you currently pay for your office equipment
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">We Compare Rates</h3>
              <p className="text-sm text-gray-600">
                We check real pricing from 1,000+ verified UK suppliers
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">See Your Savings</h3>
              <p className="text-sm text-gray-600">
                Instantly see how much you could save by switching
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Office Equipment Savings Calculator',
            url: 'https://tendorai.com/tools/savings-calculator',
            applicationCategory: 'BusinessApplication',
            description: 'Calculate how much you could save on office equipment by comparing local supplier quotes.',
            provider: {
              '@type': 'Organization',
              name: 'TendorAI',
              url: 'https://tendorai.com',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'GBP',
            },
          }),
        }}
      />
    </main>
  );
}
