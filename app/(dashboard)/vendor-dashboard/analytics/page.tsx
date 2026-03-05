'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import TierGate, { hasTierAccess, getTierLabel } from '@/app/components/dashboard/TierGate';
import AIVisibilityScoreCard from '@/app/components/dashboard/AIVisibilityScoreCard';
import AISearchTest from '@/app/components/dashboard/AISearchTest';
import AeoAuditCard from '@/app/components/dashboard/AeoAuditCard';
import SchemaGeneratorCard from '@/app/components/dashboard/SchemaGeneratorCard';
import GbpChecklistCard from '@/app/components/dashboard/GbpChecklistCard';

interface AnalyticsData {
  period: string;
  profileViews: number;
  quoteRequests: number;
  websiteClicks: number;
  phoneClicks: number;
  aiMentions: number;
  searchImpressions: number;
  aiMentionsBySource: {
    chatgpt: number;
    claude: number;
    perplexity: number;
    other: number;
  };
  recentAiQueries: Array<{
    timestamp: string;
    query?: string;
    position?: number;
    source?: string;
  }>;
  dailyActivity: Array<{
    date: string;
    profileViews: number;
    aiMentions: number;
    quoteRequests: number;
  }>;
}

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

export default function AnalyticsPage() {
  const { getCurrentToken } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [tier, setTier] = useState('free');
  const [vendorId, setVendorId] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorCategory, setVendorCategory] = useState('');
  const [vendorLocation, setVendorLocation] = useState('');
  const [vendorWebsite, setVendorWebsite] = useState('');
  const [vendorType, setVendorType] = useState('office-equipment');
  const [vendorServices, setVendorServices] = useState<string[]>([]);
  const [vendorCoverage, setVendorCoverage] = useState<string[]>([]);
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorDescription, setVendorDescription] = useState('');
  const [vendorPostcode, setVendorPostcode] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');
  const [vendorLinkedIn, setVendorLinkedIn] = useState('');
  const [vendorSraNumber, setVendorSraNumber] = useState('');
  const [vendorFcaNumber, setVendorFcaNumber] = useState('');
  const [vendorIcaewFirmNumber, setVendorIcaewFirmNumber] = useState('');
  const [vendorPropertymarkNumber, setVendorPropertymarkNumber] = useState('');
  const [vendorSpecializations, setVendorSpecializations] = useState<string[]>([]);
  const [vendorPracticeAreas, setVendorPracticeAreas] = useState<string[]>([]);
  const [vendorYearsInBusiness, setVendorYearsInBusiness] = useState<number | undefined>();
  const [vendorRating, setVendorRating] = useState<number | undefined>();
  const [vendorReviewCount, setVendorReviewCount] = useState<number | undefined>();
  const [vendorBrands, setVendorBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7d' | '30d'>('30d');

  const fetchAnalytics = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      // First fetch profile to get tier and vendorId
      const profileRes = await fetch(`${API_URL}/api/vendors/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        const v = profileData.vendor;
        const vendorTier = v?.tier || 'free';
        const vId = v?.vendorId || v?._id || '';
        setTier(vendorTier);
        setVendorId(vId);
        setVendorName(v?.company || '');
        const vType = v?.vendorType || 'office-equipment';
        setVendorType(vType);
        // Derive category from vendorType for professional services
        if (vType === 'solicitor') {
          setVendorCategory('Solicitors');
        } else if (vType === 'accountant') {
          setVendorCategory('Accountants');
        } else {
          setVendorCategory(v?.services?.[0] || '');
        }
        setVendorLocation(v?.location?.city || v?.location?.region || '');
        setVendorWebsite(v?.contactInfo?.website || v?.website || '');
        setVendorServices(v?.services || []);
        setVendorCoverage(v?.location?.coverage || []);
        setVendorPhone(v?.contactInfo?.phone || '');
        setVendorDescription(v?.businessProfile?.description || '');
        setVendorPostcode(v?.location?.postcode || '');
        setVendorAddress(v?.location?.address || '');
        setVendorLinkedIn(v?.contactInfo?.linkedIn || '');
        setVendorSraNumber(v?.sraNumber || '');
        setVendorFcaNumber(v?.fcaNumber || '');
        setVendorIcaewFirmNumber(v?.icaewFirmNumber || '');
        setVendorPropertymarkNumber(v?.propertymarkNumber || '');
        setVendorSpecializations(v?.businessProfile?.specializations || []);
        setVendorPracticeAreas(v?.practiceAreas || []);
        setVendorYearsInBusiness(v?.businessProfile?.yearsInBusiness);
        setVendorRating(v?.performance?.rating);
        setVendorReviewCount(v?.performance?.reviewCount);
        setVendorBrands(v?.brands || []);

        // Fetch analytics if vendor has access
        if (hasTierAccess(vendorTier, 'starter') && vId) {
          const analyticsRes = await fetch(
            `${API_URL}/api/analytics/vendor/${vId}?period=${period}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
          );

          if (analyticsRes.ok) {
            const analyticsData = await analyticsRes.json();
            setData(analyticsData);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken, period]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const hasVisibleAccess = hasTierAccess(tier, 'starter');
  const hasVerifiedAccess = hasTierAccess(tier, 'pro');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const token = getCurrentToken();

  // Chart component for AI mentions over time
  const MentionsChart = () => {
    const dailyData = data?.dailyActivity || [];
    const hasMentionData = dailyData.some(d => d.aiMentions > 0);

    if (!hasMentionData) {
      return (
        <div className="py-8 text-center">
          <p className="text-gray-500 text-sm">
            Your AI visibility trend will appear here once scanning begins.
          </p>
        </div>
      );
    }

    const maxMentions = Math.max(...dailyData.map(d => d.aiMentions), 1);

    return (
      <div className="h-48">
        <div className="h-full flex items-end gap-1">
          {dailyData.map((day, i) => {
            const height = (day.aiMentions / maxMentions) * 100;
            return (
              <div
                key={day.date || i}
                className="flex-1 bg-purple-500 rounded-t hover:bg-purple-600 transition-colors min-h-[4px]"
                style={{ height: `${Math.max(height, 2)}%` }}
                title={`${new Date(day.date).toLocaleDateString('en-GB')}: ${day.aiMentions} AI mentions`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{new Date(dailyData[0]?.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</span>
          <span>{new Date(dailyData[dailyData.length - 1]?.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    );
  };

  // Mock chart for locked state
  const MockChart = () => (
    <div className="h-48 flex items-end gap-1">
      {[3, 5, 2, 7, 4, 6, 8, 3, 5, 9, 4, 6, 2, 7, 5, 8, 4, 6, 3, 7, 5, 4, 6, 8, 3, 5, 7, 4, 6, 5].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-purple-500 rounded-t"
          style={{ height: `${h * 10}%` }}
        />
      ))}
    </div>
  );

  // Source breakdown cards
  const SourceBreakdown = () => {
    const sources = data?.aiMentionsBySource || { chatgpt: 0, claude: 0, perplexity: 0, other: 0 };
    const total = Object.values(sources).reduce((a, b) => a + b, 0);

    if (total === 0) {
      return (
        <div className="py-8 text-center">
          <p className="text-gray-500 text-sm">
            Waiting for first scan results. We&apos;ll show you exactly which AI platforms are recommending you — and which aren&apos;t.
          </p>
        </div>
      );
    }

    const sourceData = [
      { name: 'ChatGPT', value: sources.chatgpt, icon: '🤖', color: 'bg-green-500' },
      { name: 'Claude', value: sources.claude, icon: '🧠', color: 'bg-orange-500' },
      { name: 'Perplexity', value: sources.perplexity, icon: '🔍', color: 'bg-blue-500' },
      { name: 'Other', value: sources.other, icon: '✨', color: 'bg-gray-500' },
    ];

    return (
      <div className="grid grid-cols-2 gap-4">
        {sourceData.map((source) => (
          <div key={source.name} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{source.icon}</span>
              <span className="font-medium text-gray-900">{source.name}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{source.value}</div>
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${source.color} transition-all`}
                  style={{ width: `${(source.value / total) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round((source.value / total) * 100)}% of mentions
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Recent AI queries list
  const RecentQueries = () => {
    const queries = data?.recentAiQueries || [];

    if (queries.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            Your recent AI query results will appear here after your first weekly scan.
          </p>
          <p className="text-gray-400 text-xs mt-3 italic">
            Example queries we test: Best conveyancing solicitor in Cardiff — Recommend a family lawyer in South Wales — Conveyancing solicitor near me
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {queries.map((q, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm text-gray-900 flex-1">
                &quot;{q.query || 'Search query'}&quot;
              </p>
              {q.position && (
                <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                  #{q.position}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span className="capitalize">{q.source || 'AI'}</span>
              <span>{q.timestamp ? new Date(q.timestamp).toLocaleDateString('en-GB') : ''}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Derive mock queries from vendor data
  const getMockQueries = () => {
    const loc = vendorLocation || 'your area';
    const cat = vendorCategory || 'supplier';
    // vendorType-aware mock queries
    if (vendorCategory === 'Solicitors' || vendorName.toLowerCase().includes('solicitor') || vendorName.toLowerCase().includes('law')) {
      return [
        { query: `Best solicitors in ${loc}`, position: 2, source: 'ChatGPT' },
        { query: `Family law solicitors ${loc}`, position: 1, source: 'Claude' },
        { query: `Conveyancing solicitors near ${loc}`, position: 3, source: 'Perplexity' },
      ];
    }
    if (vendorCategory === 'Accountants' || vendorName.toLowerCase().includes('accountant')) {
      return [
        { query: `Best accountants in ${loc}`, position: 2, source: 'ChatGPT' },
        { query: `Small business accountants ${loc}`, position: 1, source: 'Claude' },
        { query: `Tax advisors near ${loc}`, position: 3, source: 'Perplexity' },
      ];
    }
    return [
      { query: `Best ${cat.toLowerCase()} suppliers in ${loc}`, position: 2, source: 'ChatGPT' },
      { query: `${cat} companies ${loc}`, position: 1, source: 'Claude' },
      { query: `${cat} suppliers UK`, position: 3, source: 'Perplexity' },
    ];
  };

  // Mock queries for locked state
  const MockQueries = () => (
    <div className="space-y-3">
      {getMockQueries().map((q, i) => (
        <div key={i} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-gray-900">&quot;{q.query}&quot;</p>
            <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
              #{q.position}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>{q.source}</span>
            <span>Today</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Analytics</h1>
          <p className="text-gray-600 mt-1">Track how AI assistants recommend your business</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            hasVerifiedAccess ? 'bg-green-100 text-green-700' :
            hasVisibleAccess ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {getTierLabel(tier)}
          </span>
          {hasVisibleAccess && (
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as '7d' | '30d')}
              className="input w-32"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
          )}
        </div>
      </div>

      {/* AI Visibility Score - Full version */}
      <AIVisibilityScoreCard
        token={token || ''}
        tier={tier}
        compact={false}
      />

      {/* AI Search Test */}
      <AISearchTest
        token={token || ''}
        tier={tier}
        vendorName={vendorName}
        vendorCategory={vendorCategory}
        vendorLocation={vendorLocation}
        vendorServices={vendorServices}
        vendorCoverage={vendorCoverage}
      />

      {/* AEO Audit */}
      <AeoAuditCard
        token={token || ''}
        tier={tier}
        vendorWebsite={vendorWebsite}
      />

      {/* Schema Generator */}
      <SchemaGeneratorCard
        token={token || ''}
        tier={tier}
        vendorId={vendorId}
        vendorData={{
          vendorId,
          company: vendorName,
          vendorType,
          description: vendorDescription,
          website: vendorWebsite,
          phone: vendorPhone,
          city: vendorLocation,
          region: vendorLocation,
          postcode: vendorPostcode,
          address: vendorAddress,
          linkedIn: vendorLinkedIn,
          services: vendorServices,
          practiceAreas: vendorPracticeAreas,
          specializations: vendorSpecializations,
          sraNumber: vendorSraNumber,
          fcaNumber: vendorFcaNumber,
          icaewFirmNumber: vendorIcaewFirmNumber,
          propertymarkNumber: vendorPropertymarkNumber,
          yearsInBusiness: vendorYearsInBusiness,
          rating: vendorRating,
          reviewCount: vendorReviewCount,
          brands: vendorBrands,
          coverage: vendorCoverage,
          tier,
        }}
      />

      {/* GBP Checklist */}
      <GbpChecklistCard
        vendorId={vendorId}
        tier={tier}
        company={vendorName}
        vendorType={vendorType}
        website={vendorWebsite}
        phone={vendorPhone}
        city={vendorLocation}
        postcode={vendorPostcode}
        address={vendorAddress}
        description={vendorDescription}
        services={vendorServices}
        practiceAreas={vendorPracticeAreas}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TierGate
          currentTier={tier}
          requiredTier="starter"
          featureName="AI Mentions"
          featureDescription="Track how many times AI recommended you this month."
          compact
        >
          <div className="card p-4">
            <div className="text-2xl font-bold text-purple-600">{data?.aiMentions || 0}</div>
            <div className="text-sm font-medium text-gray-700">AI Mentions</div>
            {(data?.aiMentions || 0) === 0 && (
              <div className="text-xs text-gray-400 mt-1">Scanning begins within 7 days</div>
            )}
          </div>
        </TierGate>

        <TierGate
          currentTier={tier}
          requiredTier="starter"
          featureName="Profile Views"
          featureDescription="See how many businesses viewed your profile."
          compact
        >
          <div className="card p-4">
            <div className="text-2xl font-bold text-blue-600">{data?.profileViews || 0}</div>
            <div className="text-sm font-medium text-gray-700">Profile Views</div>
            <div className="text-xs text-gray-400 mt-1">Times your TendorAI profile was viewed this month</div>
          </div>
        </TierGate>

        <TierGate
          currentTier={tier}
          requiredTier="starter"
          featureName="Website Clicks"
          featureDescription="Track how many visitors clicked through to your website."
          compact
        >
          <div className="card p-4">
            <div className="text-2xl font-bold text-green-600">{data?.websiteClicks || 0}</div>
            <div className="text-sm font-medium text-gray-700">Website Clicks</div>
            <div className="text-xs text-gray-400 mt-1">Times someone clicked through to your website from TendorAI</div>
          </div>
        </TierGate>

        <TierGate
          currentTier={tier}
          requiredTier="starter"
          featureName="Quote Requests"
          featureDescription="Monitor quote requests generated by AI traffic."
          compact
        >
          <div className="card p-4">
            <div className="text-2xl font-bold text-orange-600">{data?.quoteRequests || 0}</div>
            <div className="text-sm font-medium text-gray-700">Quote Requests</div>
          </div>
        </TierGate>
      </div>

      {/* AI Mentions Over Time — only show when there's data */}
      {hasVisibleAccess && (data?.dailyActivity || []).some(d => d.aiMentions > 0) && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">AI Mentions Over Time</h3>
          <MentionsChart />
        </div>
      )}
      {!hasVisibleAccess && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">AI Mentions Over Time</h3>
          <MockChart />
        </div>
      )}

      {/* Two column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Mentions by Source */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Mentions by AI Source</h3>
          <TierGate
            currentTier={tier}
            requiredTier="starter"
            featureName="Source Breakdown"
            featureDescription="Discover which AI platforms (ChatGPT, Claude, Perplexity) mention you most."
          >
            <SourceBreakdown />
          </TierGate>
          {!hasVisibleAccess && (
            <div className="grid grid-cols-2 gap-4 opacity-50">
              {['ChatGPT', 'Claude', 'Perplexity', 'Other'].map((name) => (
                <div key={name} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-2">{name}</div>
                  <div className="text-2xl font-bold text-gray-400">--</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent AI Queries */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent AI Queries</h3>
            {!hasVerifiedAccess && hasVisibleAccess && (
              <span className="text-xs text-gray-500">Query details require Pro tier</span>
            )}
          </div>
          <TierGate
            currentTier={tier}
            requiredTier="pro"
            featureName="Query Details"
            featureDescription="See the exact questions businesses asked AI about suppliers like you."
          >
            <RecentQueries />
          </TierGate>
          {!hasVerifiedAccess && <MockQueries />}
        </div>
      </div>

      {/* Improvement Tips */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
        <h3 className="font-semibold text-gray-900 mb-4">Improve Your AI Visibility</h3>
        {hasVisibleAccess ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Complete your profile</p>
                <p className="text-sm text-gray-600">Add a detailed description and all services you offer</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Upload products</p>
                <p className="text-sm text-gray-600">AI assistants can recommend specific products to customers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Add certifications</p>
                <p className="text-sm text-gray-600">Accreditations and certifications boost your credibility score</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Expand coverage areas</p>
                <p className="text-sm text-gray-600">Add all postcodes and regions you serve</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              Upgrade to see personalised improvement recommendations based on your profile
            </p>
            <Link
              href="/vendor-dashboard/settings?tab=subscription"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Upgrade to Starter — £149/mo
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
