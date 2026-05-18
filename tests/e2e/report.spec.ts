import { test, expect, type Page } from '@playwright/test';

/**
 * E2E coverage for the AI Visibility Intelligence Report.
 *
 * The backend (ai-procurement-backend) is not available in test, so every
 * `/api/**` call is intercepted with fixtures. Auth is seeded into
 * localStorage + cookies so AuthContext resolves an authenticated vendor.
 *
 * Run: npx playwright install && npm run test:e2e
 */

const VENDOR_ID = 'test-vendor-1';
const REPORT_ID = 'report-abc-123';

// A fully-populated report — 3 live + 3 coming-soon platforms, inaccurate
// claims present, so the section-specific assertions are meaningful.
const FIXTURE_REPORT = {
  _id: REPORT_ID,
  vendorId: VENDOR_ID,
  weekStartDate: '2026-05-04T00:00:00.000Z',
  weekEndDate: '2026-05-10T00:00:00.000Z',
  reportNumber: 'TR-2026-W19',
  generatedAt: '2026-05-11T08:00:00.000Z',
  status: 'sent',
  scoreHeader: {
    currentScore: 62,
    previousScore: 57,
    weeklyChange: 5,
    rankInCity: 4,
    totalFirmsInCity: 28,
    competitorsAhead: 3,
    monthlyOpportunityLoss: { min: 4200, max: 9800 },
    trendSparkline: [48, 51, 53, 52, 55, 57, 59, 62],
  },
  boardSummary:
    'Visibility climbed five points this week as two new directory listings went live.',
  shareOfVoice: [
    { platform: 'ChatGPT', platformStatus: 'live', yourSharePercent: 18, competitorAvgPercent: 27, gap: -9 },
    { platform: 'Perplexity', platformStatus: 'live', yourSharePercent: 24, competitorAvgPercent: 21, gap: 3 },
    { platform: 'Claude', platformStatus: 'live', yourSharePercent: 15, competitorAvgPercent: 19, gap: -4 },
    { platform: 'Gemini', platformStatus: 'coming_q3_2026', yourSharePercent: 0, competitorAvgPercent: 0, gap: 0 },
    { platform: 'Grok', platformStatus: 'coming_q3_2026', yourSharePercent: 0, competitorAvgPercent: 0, gap: 0 },
    { platform: 'Google AI Overviews', platformStatus: 'coming_q4_2026', yourSharePercent: 0, competitorAvgPercent: 0, gap: 0 },
  ],
  competitors: [
    { firmName: 'Your Firm', visibilityScore: 62, weeklyChange: 5, trendDirection: 'up', isYou: true, citationCount: 12 },
    { firmName: 'Rival A', visibilityScore: 71, weeklyChange: 1, trendDirection: 'up', isYou: false, citationCount: 19 },
    { firmName: 'Rival B', visibilityScore: 68, weeklyChange: -2, trendDirection: 'down', isYou: false, citationCount: 16 },
    { firmName: 'Rival C', visibilityScore: 55, weeklyChange: 0, trendDirection: 'flat', isYou: false, citationCount: 9 },
  ],
  competitorHeadline: 'Rival A pulled further ahead this week — they out-cite you 19 to 12.',
  revenueExposure: {
    monthlyMin: 4200,
    monthlyMax: 9800,
    methodology: { estimatedMonthlyAIQueries: 1400, citationRateGap: 9, averageTransactionValue: 780 },
  },
  promptAnalysis: [
    {
      prompt: 'best conveyancing solicitor in Cardiff',
      enginesCited: ['ChatGPT', 'Perplexity'],
      citedFirms: ['Rival A', 'Rival B'],
      citedSources: ['lawsociety.org.uk'],
      youCited: false,
      reasoning: 'Your firm lacks a conveyancing-specific landing page.',
    },
  ],
  authorityGraph: {
    directoriesConnected: ['Google Business Profile', 'Yell'],
    directoriesMissing: ['ThreeBestRated', 'FreeIndex'],
    schemaCoverage: { connected: 4, total: 7 },
    reviewPlatformsConnected: ['Google Reviews'],
    reviewPlatformsMissing: ['Trustpilot'],
    contentFootprintPages: 11,
    authorityScore: 58,
  },
  perceptionAnalysis: {
    positiveAssociations: ['responsive', 'local expertise'],
    missingAssociations: ['fixed-fee pricing'],
    competitorAssociations: ['award-winning'],
    inaccurateClaimsDetected: [
      { claim: 'Closed on weekends', sourceEngine: 'ChatGPT', truth: 'Open Saturdays 9-1.', severity: 'high' },
      { claim: 'No legal aid', sourceEngine: 'Gemini', truth: 'Legal aid is offered.', severity: 'medium' },
    ],
  },
  projections: {
    historicalScores: [48, 51, 53, 52, 55, 57, 59, 62],
    projectedScores: [64, 66, 69, 71],
    projectionMethod: 'linear_regression_8week',
  },
  opportunityFeed: [
    {
      detectedQuery: 'fixed fee conveyancing Cardiff',
      competitorsCited: ['Rival A'],
      youCited: false,
      suggestedAction: 'Publish a fixed-fee conveyancing page.',
      estimatedImpact: 6,
    },
  ],
  recommendedActions: [
    { title: 'Add LegalService schema', description: 'Deploy schema markup.', estimatedImpact: 8, severity: 'high', approvalId: 'appr-1' },
    { title: 'Claim ThreeBestRated', description: 'Submit your listing.', estimatedImpact: 4, severity: 'medium' },
  ],
  whatsNext: [
    { dayLabel: 'Monday', eventLabel: 'Reconnaissance scan', vendorImpact: 'Fresh visibility data.' },
    { dayLabel: 'Wednesday', eventLabel: 'Writer drafts content', vendorImpact: 'New draft to approve.' },
  ],
};

const FIXTURE_LIST = [
  {
    _id: REPORT_ID,
    vendorId: VENDOR_ID,
    reportNumber: 'TR-2026-W19',
    weekStartDate: '2026-05-04T00:00:00.000Z',
    weekEndDate: '2026-05-10T00:00:00.000Z',
    status: 'sent',
    scoreHeader: { currentScore: 62, weeklyChange: 5 },
  },
  {
    _id: 'report-def-456',
    vendorId: VENDOR_ID,
    reportNumber: 'TR-2026-W18',
    weekStartDate: '2026-04-27T00:00:00.000Z',
    weekEndDate: '2026-05-03T00:00:00.000Z',
    status: 'viewed',
    scoreHeader: { currentScore: 57, weeklyChange: -1 },
  },
];

// Seed an authenticated vendor session before any app script runs.
async function authenticate(page: Page) {
  await page.context().addCookies([
    { name: 'token', value: 'test-token', domain: 'localhost', path: '/' },
    { name: 'role', value: 'vendor', domain: 'localhost', path: '/' },
  ]);
  await page.addInitScript((vendorId) => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'vendor');
    localStorage.setItem('vendorId', vendorId);
  }, VENDOR_ID);
}

// Intercept every backend call. `reportsList` lets a test force the empty state.
async function mockApi(page: Page, opts: { reportsList?: unknown[] } = {}) {
  const list = opts.reportsList ?? FIXTURE_LIST;
  await page.route('**/api/**', async (route) => {
    const url = route.request().url();
    const json = (body: unknown) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });

    if (url.includes('/api/vendors/verify')) {
      return json({ valid: true, vendor: { vendorId: VENDOR_ID, company: 'Test Firm' } });
    }
    if (url.includes('/api/vendors/profile')) {
      return json({ vendor: { vendorId: VENDOR_ID, company: 'Test Firm', tier: 'managed' } });
    }
    if (url.includes(`/reports/${REPORT_ID}/pdf-generated`)) {
      return json({ ok: true });
    }
    if (url.includes(`/reports/${REPORT_ID}`)) {
      return json({ report: FIXTURE_REPORT });
    }
    if (/\/reports\/?($|\?)/.test(url)) {
      return json({ reports: list });
    }
    return json({});
  });
}

test.describe('AI Visibility Intelligence Report', () => {
  test('report page renders all 12 sections', async ({ page }) => {
    await authenticate(page);
    await mockApi(page);
    await page.goto(`/vendor-dashboard/reports/${REPORT_ID}`);

    await expect(page.getByTestId('report-page')).toBeVisible();
    await expect(page.locator('[data-report-section]')).toHaveCount(12);
  });

  test('donut chart shows 3 slices, not 6', async ({ page }) => {
    await authenticate(page);
    await mockApi(page);
    await page.goto(`/vendor-dashboard/reports/${REPORT_ID}`);

    const donut = page.getByTestId('sov-donut');
    await expect(donut).toBeVisible();
    // Recharts renders one <path class="recharts-sector"> per slice.
    await expect(donut.locator('path.recharts-sector')).toHaveCount(3);
  });

  test('competitor headline is visible above the competitor table', async ({ page }) => {
    await authenticate(page);
    await mockApi(page);
    await page.goto(`/vendor-dashboard/reports/${REPORT_ID}`);

    const headline = page.getByTestId('competitor-headline');
    await expect(headline).toBeVisible();
    await expect(headline).toContainText('Rival A');

    const section = page.locator('[data-report-section="4"]');
    const headlineBox = await section.getByTestId('competitor-headline').boundingBox();
    const tableBox = await section.locator('table').boundingBox();
    expect(headlineBox && tableBox).toBeTruthy();
    expect((headlineBox!.y)).toBeLessThan(tableBox!.y);
  });

  test('inaccurate claims section renders red badges when claims present', async ({ page }) => {
    await authenticate(page);
    await mockApi(page);
    await page.goto(`/vendor-dashboard/reports/${REPORT_ID}`);

    const claims = page.getByTestId('inaccurate-claims');
    await expect(claims).toBeVisible();
    await expect(page.getByTestId('inaccurate-claim-badge')).toHaveCount(2);
  });

  test('Download PDF button triggers a download', async ({ page }) => {
    await authenticate(page);
    await mockApi(page);
    await page.goto(`/vendor-dashboard/reports/${REPORT_ID}`);

    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('download-pdf').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('TendorAI-Report');
  });

  test('reports list page renders rows', async ({ page }) => {
    await authenticate(page);
    await mockApi(page);
    await page.goto('/vendor-dashboard/reports');

    await expect(page.getByTestId('reports-list-page')).toBeVisible();
    await expect(page.getByTestId('report-row')).toHaveCount(2);
  });

  test('reports list shows an empty state when there are no reports', async ({ page }) => {
    await authenticate(page);
    await mockApi(page, { reportsList: [] });
    await page.goto('/vendor-dashboard/reports');

    await expect(page.getByTestId('reports-empty')).toBeVisible();
    await expect(page.getByTestId('report-row')).toHaveCount(0);
  });
});
