'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { hasTierAccess } from './TierGate';

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

interface AeoCheck {
  name: string;
  key: string;
  score: number;
  maxScore: number;
  passed: boolean;
  details: string;
  recommendation: string;
}

interface AuditResult {
  id: string;
  websiteUrl: string;
  overallScore: number;
  checks: AeoCheck[];
  recommendations: string[];
  tendoraiSchemaDetected?: boolean;
  createdAt: string;
}

interface AeoAuditCardProps {
  token: string;
  tier: string;
  vendorWebsite: string;
}

const ALL_SOCIALS = ['Facebook', 'Twitter/X', 'LinkedIn', 'Instagram', 'YouTube'];

function parseMissingSocials(details: string): string[] {
  if (!details || details === 'No social media links detected') return ALL_SOCIALS;
  const foundMatch = details.match(/^Found:\s*(.+)$/i);
  if (!foundMatch) return ALL_SOCIALS;
  const found = foundMatch[1].split(',').map(s => s.trim().toLowerCase());
  return ALL_SOCIALS.filter(s => !found.some(f => f === s.toLowerCase()));
}

const SOCIAL_PLACEHOLDER_URLS: Record<string, string> = {
  Facebook: 'https://facebook.com/YOUR_PAGE',
  'Twitter/X': 'https://x.com/YOUR_HANDLE',
  LinkedIn: 'https://linkedin.com/company/YOUR_COMPANY',
  Instagram: 'https://instagram.com/YOUR_HANDLE',
  YouTube: 'https://youtube.com/@YOUR_CHANNEL',
};

const PLATFORM_INSTRUCTIONS: Record<string, string[]> = {
  WordPress: [
    'Log in to your WordPress admin dashboard.',
    'Go to Appearance > Widgets (or Appearance > Customize > Widgets).',
    'Find the footer widget area and add a "Social Icons" or "Custom HTML" widget.',
    'If your theme has a social media settings page (many do), check Appearance > Theme Options or Customize > Social Links.',
    'Add the URL for each missing platform and save.',
  ],
  Wix: [
    'Open the Wix Editor for your site.',
    'Click Add (+) in the left toolbar.',
    'Search for "Social Bar" and drag it into your footer or header.',
    'Click the social bar to edit — add icons for each missing platform.',
    'Paste your profile URLs and publish.',
  ],
  Squarespace: [
    'Log in to your Squarespace dashboard.',
    'Go to Pages and click the footer area (or Design > Site Styles > Footer).',
    'Add a Social Links block — click Add Block > Social Links.',
    'In the block settings, add each missing platform with your profile URL.',
    'Save and publish your changes.',
  ],
  Webflow: [
    'Open your site in the Webflow Designer.',
    'Navigate to your footer section (or the global symbol if you use one).',
    'Add a Link Block or Text Link element for each missing platform.',
    'Set the URL to your profile page and add an aria-label for accessibility.',
    'Publish your site to make the changes live.',
  ],
};

function SpeedFixWizard({
  details,
  score,
  onRerun,
  loading,
}: {
  details: string;
  score: number;
  onRerun: () => void;
  loading: boolean;
}) {
  const kbMatch = details.match(/(\d+)KB/);
  const sizeKb = kbMatch ? parseInt(kbMatch[1], 10) : null;

  const severity = score >= 8
    ? "You're close — minor tweaks will get you to 10/10"
    : score >= 5
      ? "Acceptable but improvable — here's what to do"
      : 'Your HTML is heavy — this needs attention';

  const severityColour = score >= 8 ? 'text-green-700 bg-green-50' : score >= 5 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';

  return (
    <div className="mt-3 space-y-3">
      {/* Size + target */}
      {sizeKb !== null && (
        <p className="text-sm font-semibold text-gray-900">
          Your page HTML is {sizeKb}KB &mdash; the target is under 100KB
        </p>
      )}

      {/* Severity */}
      <p className={`text-xs font-medium rounded p-2 ${severityColour}`}>{severity}</p>

      {/* Fix steps */}
      <div className="bg-purple-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-purple-900 mb-2">How to reduce HTML size:</p>
        <ol className="space-y-2 list-decimal list-inside marker:font-bold marker:text-purple-500">
          <li className="text-xs text-purple-800">
            <strong>Remove inline CSS</strong> and move styles to a separate stylesheet. Inline CSS means style rules written directly in your HTML tags (e.g. <code className="text-[11px] bg-white px-1 rounded">style=&quot;color:red&quot;</code>) — these bloat the HTML file.
          </li>
          <li className="text-xs text-purple-800">
            <strong>Remove inline JavaScript</strong> and move scripts to external .js files. Large script blocks inside your HTML add significant weight.
          </li>
          <li className="text-xs text-purple-800">
            <strong>Minify your HTML</strong> — remove comments, extra whitespace, and line breaks. Use a free tool like <a href="https://www.willpeavy.com/tools/minifier/" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline hover:text-purple-700">willpeavy.com/tools/minifier</a>.
          </li>
          <li className="text-xs text-purple-800">
            <strong>Check for tracking script bloat</strong> — tag managers (Google Tag Manager, HubSpot, etc.) often inject large blocks of HTML. Review what&apos;s being pasted directly into your page.
          </li>
          <li className="text-xs text-purple-800">
            <strong>If on WordPress</strong>, install <strong>WP Rocket</strong> or <strong>Autoptimize</strong> — both can minify and defer HTML/CSS/JS automatically.
          </li>
          <li className="text-xs text-purple-800">
            Run a full page speed test at <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline hover:text-purple-700">pagespeed.web.dev</a> to identify the biggest issues across your whole page.
          </li>
        </ol>
      </div>

      {/* Note */}
      <p className="text-[10px] text-gray-500">
        Note: this score only measures your HTML file size. Images, CSS and JavaScript are not included in this check.
      </p>

      {/* Re-run button */}
      <button
        onClick={onRerun}
        disabled={loading}
        className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Re-running audit...
          </>
        ) : (
          'Mark as done & re-run audit'
        )}
      </button>
    </div>
  );
}

function SocialFixWizard({
  details,
  platform,
  setPlatform,
  onRerun,
  loading,
}: {
  details: string;
  platform: string | null;
  setPlatform: (p: string | null) => void;
  onRerun: () => void;
  loading: boolean;
}) {
  const [snippetCopied, setSnippetCopied] = useState(false);
  const missing = parseMissingSocials(details);

  if (missing.length === 0) return null;

  const snippet = missing
    .map(s => `<a href="${SOCIAL_PLACEHOLDER_URLS[s]}" target="_blank" rel="noopener noreferrer">${s}</a>`)
    .join('\n');

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = snippet;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 2000);
  };

  return (
    <div className="mt-3 space-y-3">
      {/* Missing platforms */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">Missing from your site:</p>
        <div className="flex flex-wrap gap-1.5">
          {missing.map(s => (
            <span key={s} className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">{s}</span>
          ))}
        </div>
      </div>

      {/* Platform selection */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1.5">What platform is your website built on?</p>
        <div className="flex flex-wrap gap-2">
          {['WordPress', 'Wix', 'Squarespace', 'Webflow', 'Other'].map(p => (
            <button
              key={p}
              onClick={() => setPlatform(platform === p ? null : p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                platform === p
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p === 'Other' ? 'Other / Send to developer' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions for CMS platforms */}
      {platform && platform !== 'Other' && PLATFORM_INSTRUCTIONS[platform] && (
        <div className="bg-purple-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-purple-900 mb-2">How to add social links in {platform}:</p>
          <ol className="space-y-1.5">
            {PLATFORM_INSTRUCTIONS[platform].map((step, i) => (
              <li key={i} className="text-xs text-purple-800 flex gap-2">
                <span className="font-bold text-purple-500 flex-shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* HTML snippet for Other / developer */}
      {platform === 'Other' && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Copy this HTML and send to your developer:</p>
            <button
              onClick={copySnippet}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              {snippetCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs bg-white border border-gray-200 rounded p-2 overflow-x-auto font-mono text-gray-800 whitespace-pre-wrap">
            {snippet}
          </pre>
          <p className="text-[10px] text-gray-500 mt-1.5">Replace the placeholder URLs with your actual profile links. Add this to your website footer.</p>
        </div>
      )}

      {/* Re-run button */}
      {platform && (
        <button
          onClick={onRerun}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Re-running audit...
            </>
          ) : (
            'Mark as done & re-run audit'
          )}
        </button>
      )}
    </div>
  );
}

export default function AeoAuditCard({ token, tier, vendorWebsite }: AeoAuditCardProps) {
  const [url, setUrl] = useState(vendorWebsite || '');
  const [loading, setLoading] = useState(false);
  const [fetchingLatest, setFetchingLatest] = useState(true);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [canRunAgain, setCanRunAgain] = useState(true);
  const [nextAvailable, setNextAvailable] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);
  const [socialPlatform, setSocialPlatform] = useState<string | null>(null);

  const isPaid = hasTierAccess(tier, 'starter');

  // Fetch latest audit on mount
  const fetchLatest = useCallback(async () => {
    if (!token) return;
    setFetchingLatest(true);
    try {
      const res = await fetch(`${API_URL}/api/aeo-audit/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success && json.data) {
        setResult(json.data);
        setCanRunAgain(json.canRunAgain);
        setNextAvailable(json.nextAvailable || null);
        if (!url && json.data.websiteUrl) setUrl(json.data.websiteUrl);
      }
    } catch {
      // Silently ignore — first-time users won't have an audit
    } finally {
      setFetchingLatest(false);
    }
  }, [token, url]);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  useEffect(() => {
    if (vendorWebsite && !url) setUrl(vendorWebsite);
  }, [vendorWebsite, url]);

  const runAudit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setRateLimitMsg(null);

    try {
      const res = await fetch(`${API_URL}/api/aeo-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ websiteUrl: url.trim() }),
      });

      const json = await res.json();

      if (res.status === 429) {
        setRateLimitMsg(json.message || 'Rate limit reached.');
        setCanRunAgain(false);
        if (json.nextAvailable) setNextAvailable(json.nextAvailable);
        return;
      }

      if (!res.ok) {
        setError(json.error || 'Something went wrong.');
        return;
      }

      if (json.success) {
        setResult(json.data);
        setCanRunAgain(false);
        // Re-fetch to get accurate canRunAgain flag
        setTimeout(() => fetchLatest(), 500);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColour = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-green-50 border-green-200';
    if (score >= 40) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreRingColour = (score: number) => {
    if (score >= 70) return 'stroke-green-500';
    if (score >= 40) return 'stroke-amber-500';
    return 'stroke-red-500';
  };

  const getCheckIcon = (passed: boolean) => {
    if (passed) {
      return (
        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  if (fetchingLatest) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Loading AI Visibility (AEO) Audit...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">AI Visibility (AEO) Audit</h3>
          <p className="text-sm text-gray-600 mt-1">
            Check how AI-ready your website is. AI assistants crawl your site for structured data, content, and trust signals.
          </p>
        </div>
      </div>

      {/* URL input + run button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          disabled={loading}
        />
        <button
          onClick={runAudit}
          disabled={loading || !url.trim() || (!canRunAgain && !error)}
          className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
        >
          {loading ? 'Analysing...' : 'Run AI Visibility (AEO) Audit'}
        </button>
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="flex flex-col items-center py-8 gap-4">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-gray-600">Analysing your website for AI readiness...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Rate limit message */}
      {rateLimitMsg && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
          <p className="text-sm text-amber-700">{rateLimitMsg}</p>
          {!isPaid && (
            <Link
              href="/vendor-dashboard/settings?tab=subscription"
              className="inline-flex items-center mt-2 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Upgrade for weekly audits
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
          {isPaid && nextAvailable && (
            <p className="text-xs text-amber-600 mt-1">
              Next audit available: {new Date(nextAvailable).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Score summary */}
          <div className={`flex items-center gap-6 p-5 rounded-xl border ${getScoreBg(result.overallScore)}`}>
            {/* Circular score */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  className={getScoreRingColour(result.overallScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(result.overallScore / 100) * 264} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getScoreColour(result.overallScore)}`}>
                  {result.overallScore}
                </span>
              </div>
            </div>

            <div>
              <p className={`text-xl font-bold ${getScoreColour(result.overallScore)}`}>
                {result.overallScore >= 70 ? 'Good' : result.overallScore >= 40 ? 'Needs Work' : 'Poor'} AI Readiness
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {result.overallScore >= 70
                  ? 'Your website is well-optimised for AI discovery.'
                  : result.overallScore >= 40
                    ? 'Some improvements could boost how AI assistants see your site.'
                    : 'Significant improvements needed for AI visibility.'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Audited {new Date(result.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} &middot; {result.websiteUrl}
              </p>
            </div>
          </div>

          {/* TendorAI Schema Detection */}
          {result.tendoraiSchemaDetected === true && (
            <a href="#schema-generator" className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-green-700">TendorAI Schema detected on your website</span>
            </a>
          )}
          {result.tendoraiSchemaDetected === false && (
            <a href="#schema-generator" className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium text-amber-700">TendorAI Schema not installed — add it below</span>
            </a>
          )}

          {/* Check list */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Audit Checklist</h4>
            <div className="space-y-2">
              {result.checks.map((check) => (
                <div
                  key={check.key}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCheck(expandedCheck === check.key ? null : check.key)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    {getCheckIcon(check.passed)}
                    <span className="flex-1 text-sm font-medium text-gray-900">{check.name}</span>
                    <span className={`text-sm font-semibold ${check.score >= 7 ? 'text-green-600' : check.score >= 4 ? 'text-amber-500' : 'text-red-500'}`}>
                      {check.score}/{check.maxScore}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedCheck === check.key ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCheck === check.key && (
                    <div className="px-3 pb-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mt-2">{check.details}</p>
                      {check.key === 'speed' && check.score < 10 ? (
                        <SpeedFixWizard
                          details={check.details}
                          score={check.score}
                          onRerun={() => { runAudit(); setExpandedCheck(null); }}
                          loading={loading}
                        />
                      ) : check.key === 'social' && check.score < 10 ? (
                        <SocialFixWizard
                          details={check.details}
                          platform={socialPlatform}
                          setPlatform={setSocialPlatform}
                          onRerun={() => { runAudit(); setExpandedCheck(null); setSocialPlatform(null); }}
                          loading={loading}
                        />
                      ) : check.recommendation ? (
                        <p className="text-sm text-purple-700 mt-2 bg-purple-50 rounded p-2">
                          {check.recommendation}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top recommendations */}
          {result.recommendations.length > 0 && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Top Recommendations</h4>
              <ul className="space-y-1.5">
                {result.recommendations.slice(0, 5).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-purple-800">
                    <span className="text-purple-400 mt-0.5">&#8226;</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* No result yet — show explanation */}
      {!result && !loading && !error && (
        <div className="text-center py-6 text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="font-medium text-gray-700">No AI Visibility (AEO) audit yet</p>
          <p className="text-sm mt-1">Enter your website URL above and run your first audit.</p>
        </div>
      )}
    </div>
  );
}
