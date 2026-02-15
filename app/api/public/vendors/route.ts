import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { Vendor, VendorProduct } from '@/lib/db/models';
import { getServiceFromSlug, calculatePriorityScore, getDisplayTier } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const skip = (page - 1) * limit;

    // Build query - include active verified + unclaimed vendors
    const conditions: Record<string, unknown>[] = [
      {
        $or: [
          { 'account.status': 'active', 'account.verificationStatus': 'verified' },
          { listingStatus: 'unclaimed' },
        ],
      },
    ];

    if (category) {
      const serviceName = getServiceFromSlug(category);
      if (serviceName) {
        conditions.push({ services: { $regex: new RegExp(serviceName, 'i') } });
      }
    }

    if (location) {
      conditions.push({
        $or: [
          { 'location.coverage': { $regex: new RegExp(location, 'i') } },
          { 'location.city': { $regex: new RegExp(location, 'i') } },
          { 'location.region': { $regex: new RegExp(location, 'i') } },
        ],
      });
    }

    const query: Record<string, unknown> = conditions.length === 1 ? conditions[0] : { $and: conditions };

    // Count total
    const total = await Vendor.countDocuments(query);

    // Fetch vendors
    const vendors = await Vendor.find(query)
      .select({
        company: 1,
        name: 1,
        services: 1,
        location: 1,
        performance: 1,
        businessProfile: 1,
        brands: 1,
        tier: 1,
        contactInfo: 1,
        showPricing: 1,
        listingStatus: 1,
        'account.loginCount': 1,
      })
      .lean();

    // Get product counts
    const vendorIds = vendors.map((v) => v._id);
    const productCounts = await VendorProduct.aggregate([
      { $match: { vendorId: { $in: vendorIds }, isActive: { $ne: false } } },
      { $group: { _id: '$vendorId', count: { $sum: 1 } } },
    ]);

    const productCountMap: Record<string, number> = {};
    productCounts.forEach((p: { _id: { toString(): string }; count: number }) => {
      productCountMap[p._id.toString()] = p.count;
    });

    // Sort and paginate
    const sortedVendors = vendors
      .map((v) => ({
        ...v,
        productCount: productCountMap[v._id.toString()] || 0,
        priorityScore: calculatePriorityScore({
          tier: v.tier,
          company: v.company,
          contactInfo: v.contactInfo,
          email: '',
          businessProfile: v.businessProfile,
          brands: v.brands,
          location: v.location,
          hasProducts: (productCountMap[v._id.toString()] || 0) > 0,
        }),
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(skip, skip + limit);

    // Format response
    const publicVendors = sortedVendors.map((v) => {
      const displayTier = getDisplayTier(v.tier);
      const showPricing = displayTier !== 'free' || v.showPricing;

      const ls = (v.listingStatus || 'unclaimed').toLowerCase();
      const hasPhone = !!(v.contactInfo?.phone);
      const hasRating = (v.performance?.rating || 0) > 0;
      const isPaid = displayTier !== 'free';
      const accountClaimed = ls === 'claimed' || ls === 'verified' || hasPhone || isPaid || hasRating || (v.account?.loginCount || 0) > 0;

      return {
        id: v._id.toString(),
        company: v.company,
        name: v.name,
        services: v.services || [],
        location: {
          city: v.location?.city,
          region: v.location?.region,
          coverage: v.location?.coverage || [],
        },
        rating: v.performance?.rating || 0,
        reviewCount: v.performance?.reviewCount || 0,
        tier: displayTier,
        description: v.businessProfile?.description,
        accreditations: v.businessProfile?.accreditations || [],
        yearsInBusiness: v.businessProfile?.yearsInBusiness,
        brands: v.brands || [],
        productCount: v.productCount,
        website: v.contactInfo?.website,
        showPricing,
        accountClaimed,
        // Schema.org metadata
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        areaServed: v.location?.coverage || [],
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        vendors: publicVendors,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: skip + limit < total,
        },
        filters: {
          category: category || null,
          location: location || null,
        },
      },
    });
  } catch (error) {
    console.error('Public vendors API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendors' },
      { status: 500 }
    );
  }
}
