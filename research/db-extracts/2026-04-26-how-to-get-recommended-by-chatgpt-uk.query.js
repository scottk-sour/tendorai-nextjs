/**
 * Data extract for blog: "How to get recommended by ChatGPT UK"
 * Generated: 2026-04-26
 * Run: node 2026-04-26-how-to-get-recommended-by-chatgpt-uk.query.js > 2026-04-26-how-to-get-recommended-by-chatgpt-uk.json
 *
 * Requires: MONGODB_URI in env. Pulls schema-accurate completeness signals
 * from the Vendor collection — used as proxies for "AI-readiness" because
 * the Vendor model does NOT store aeoScore or hasSchema. AI Visibility
 * Scores live in AeoReport (per-scan), so true top/bottom-decile comparison
 * requires joining on company name + most-recent scan, which this script
 * does in the final block.
 */

const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URI;
if (!URI) {
  console.error('MONGODB_URI not set');
  process.exit(1);
}

const REGULATED = ['solicitor', 'accountant', 'mortgage-advisor', 'estate-agent'];

(async () => {
  const client = new MongoClient(URI);
  await client.connect();
  const db = client.db();
  const Vendor = db.collection('vendors');
  const AeoReport = db.collection('aeoreports');

  const out = { generatedAt: new Date().toISOString(), prompt: 'How to get recommended by ChatGPT UK' };

  // 1. Total regulated firm count + per-vertical breakdown
  out.totalRegulated = await Vendor.countDocuments({ vendorType: { $in: REGULATED } });
  out.byVertical = await Vendor.aggregate([
    { $match: { vendorType: { $in: REGULATED } } },
    { $group: { _id: '$vendorType', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]).toArray();

  // 2. Completeness signals (the proxies for AI-readiness)
  const signal = (filter) => Vendor.countDocuments({ vendorType: { $in: REGULATED }, ...filter });
  out.signals = {
    hasWebsite: await signal({ 'contactInfo.website': { $exists: true, $ne: '' } }),
    hasFixedFees: await signal({ 'fixedFees.0': { $exists: true } }),
    hasAccreditations: await signal({ 'accreditations.0': { $exists: true } }),
    hasPracticeAreas: await signal({ 'practiceAreas.0': { $exists: true } }),
    hasIndividualSolicitors: await signal({ 'individualSolicitors.0': { $exists: true } }),
    hasIndustrySpecialisms: await signal({ 'industrySpecialisms.0': { $exists: true } }),
    claimed: await signal({ claimed: true }),
    verified: await signal({ 'account.verificationStatus': 'verified' }),
    paidTier: await signal({ tier: { $nin: ['free', 'listed'] } }),
    hasRegisterNumber: await signal({
      $or: [
        { sraNumber: { $exists: true, $ne: '' } },
        { icaewFirmNumber: { $exists: true, $ne: '' } },
        { fcaNumber: { $exists: true, $ne: '' } },
        { propertymarkNumber: { $exists: true, $ne: '' } },
      ],
    }),
  };
  // Convert to %
  out.signalsPct = Object.fromEntries(
    Object.entries(out.signals).map(([k, v]) => [k, +(v / out.totalRegulated * 100).toFixed(1)])
  );

  // 3. Per-vertical completeness (the table for the blog)
  out.byVerticalCompleteness = await Vendor.aggregate([
    { $match: { vendorType: { $in: REGULATED } } },
    {
      $group: {
        _id: '$vendorType',
        total: { $sum: 1 },
        hasWebsite: { $sum: { $cond: [{ $and: [{ $ne: ['$contactInfo.website', null] }, { $ne: ['$contactInfo.website', ''] }] }, 1, 0] } },
        hasFixedFees: { $sum: { $cond: [{ $gt: [{ $size: { $ifNull: ['$fixedFees', []] } }, 0] }, 1, 0] } },
        hasAccreditations: { $sum: { $cond: [{ $gt: [{ $size: { $ifNull: ['$accreditations', []] } }, 0] }, 1, 0] } },
        hasPracticeAreas: { $sum: { $cond: [{ $gt: [{ $size: { $ifNull: ['$practiceAreas', []] } }, 0] }, 1, 0] } },
        claimed: { $sum: { $cond: ['$claimed', 1, 0] } },
      },
    },
    { $sort: { total: -1 } },
  ]).toArray();

  // 4. Top 20 cities by firm count (regulated only)
  out.topCities = await Vendor.aggregate([
    { $match: { vendorType: { $in: REGULATED }, 'location.city': { $exists: true, $ne: '' } } },
    { $group: { _id: '$location.city', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]).toArray();

  // 5. AeoReport-joined: top vs bottom decile by AI visibility score
  // Match AeoReport.companyName ~ Vendor.company (most recent scan per company).
  // This only works for firms that have been audited via /aeo-report. Sample
  // size will be smaller than totalRegulated.
  out.scoredSample = await AeoReport.aggregate([
    { $match: { score: { $ne: null }, reportType: 'full' } },
    { $sort: { createdAt: -1 } },
    { $group: { _id: '$companyName', latestScore: { $first: '$score' }, latestCity: { $first: '$city' }, latestCategory: { $first: '$category' } } },
    { $count: 'n' },
  ]).toArray();

  const decileSize = async () => {
    const total = await AeoReport.aggregate([
      { $match: { score: { $ne: null }, reportType: 'full' } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: '$companyName', score: { $first: '$score' } } },
      { $count: 'n' },
    ]).toArray();
    return total[0] ? Math.floor(total[0].n * 0.1) : 0;
  };
  const slice = await decileSize();

  out.topDecile = await AeoReport.aggregate([
    { $match: { score: { $ne: null }, reportType: 'full' } },
    { $sort: { createdAt: -1 } },
    { $group: { _id: '$companyName', score: { $first: '$score' } } },
    { $sort: { score: -1 } },
    { $limit: slice },
    { $group: { _id: null, avgScore: { $avg: '$score' }, n: { $sum: 1 } } },
  ]).toArray();

  out.bottomDecile = await AeoReport.aggregate([
    { $match: { score: { $ne: null }, reportType: 'full' } },
    { $sort: { createdAt: -1 } },
    { $group: { _id: '$companyName', score: { $first: '$score' } } },
    { $sort: { score: 1 } },
    { $limit: slice },
    { $group: { _id: null, avgScore: { $avg: '$score' }, n: { $sum: 1 } } },
  ]).toArray();

  // 6. AeoReport searchedCompany flag distribution (top decile only)
  // Tells us what % of TOP performers have schema/reviews/pricing.
  out.topDecileFlagBreakdown = await AeoReport.aggregate([
    { $match: { score: { $gte: 60 }, reportType: 'full', 'searchedCompany.summary': { $exists: true } } },
    {
      $group: {
        _id: null,
        n: { $sum: 1 },
        hasReviews: { $sum: { $cond: ['$searchedCompany.hasReviews', 1, 0] } },
        hasPricing: { $sum: { $cond: ['$searchedCompany.hasPricing', 1, 0] } },
        hasStructuredData: { $sum: { $cond: ['$searchedCompany.hasStructuredData', 1, 0] } },
        hasDetailedServices: { $sum: { $cond: ['$searchedCompany.hasDetailedServices', 1, 0] } },
        hasSocialMedia: { $sum: { $cond: ['$searchedCompany.hasSocialMedia', 1, 0] } },
        hasGoogleBusiness: { $sum: { $cond: ['$searchedCompany.hasGoogleBusiness', 1, 0] } },
      },
    },
  ]).toArray();

  out.bottomDecileFlagBreakdown = await AeoReport.aggregate([
    { $match: { score: { $lt: 25 }, reportType: 'full', 'searchedCompany.summary': { $exists: true } } },
    {
      $group: {
        _id: null,
        n: { $sum: 1 },
        hasReviews: { $sum: { $cond: ['$searchedCompany.hasReviews', 1, 0] } },
        hasPricing: { $sum: { $cond: ['$searchedCompany.hasPricing', 1, 0] } },
        hasStructuredData: { $sum: { $cond: ['$searchedCompany.hasStructuredData', 1, 0] } },
        hasDetailedServices: { $sum: { $cond: ['$searchedCompany.hasDetailedServices', 1, 0] } },
        hasSocialMedia: { $sum: { $cond: ['$searchedCompany.hasSocialMedia', 1, 0] } },
        hasGoogleBusiness: { $sum: { $cond: ['$searchedCompany.hasGoogleBusiness', 1, 0] } },
      },
    },
  ]).toArray();

  // 7. AeoReport score distribution buckets (sample-wide)
  out.scoreBuckets = await AeoReport.aggregate([
    { $match: { score: { $ne: null }, reportType: 'full' } },
    { $sort: { createdAt: -1 } },
    { $group: { _id: '$companyName', score: { $first: '$score' } } },
    {
      $bucket: {
        groupBy: '$score',
        boundaries: [0, 26, 51, 76, 101],
        default: 'unknown',
        output: { count: { $sum: 1 } },
      },
    },
  ]).toArray();

  console.log(JSON.stringify(out, null, 2));
  await client.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
