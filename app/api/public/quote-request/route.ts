import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { Vendor, Lead } from '@/lib/db/models';
import { getServiceFromSlug, canReceiveQuotes } from '@/lib/constants';

export const dynamic = 'force-dynamic';

interface QuoteRequestBody {
  vendorId: string;
  service: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  postcode?: string;
  message?: string;
  timeline?: string;
  budgetRange?: string;
  monthlyVolume?: number;
  requirements?: string[];
  referralSource?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequestBody = await request.json();

    // Validate required fields
    const requiredFields = ['vendorId', 'service', 'companyName', 'contactName', 'email', 'phone'];
    const missingFields = requiredFields.filter((field) => !body[field as keyof QuoteRequestBody]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: missingFields.map((field) => `${field} is required`),
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify vendor exists and can receive quotes
    const vendor = await Vendor.findById(body.vendorId);
    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Supplier not found' },
        { status: 404 }
      );
    }

    const vendorCanReceiveQuotes = canReceiveQuotes(vendor.tier) || vendor.showPricing;
    if (!vendorCanReceiveQuotes) {
      return NextResponse.json(
        {
          success: false,
          error: 'This supplier is not currently accepting quote requests',
        },
        { status: 403 }
      );
    }

    // Normalize service name
    const normalizedService = getServiceFromSlug(body.service.toLowerCase()) || body.service;

    // Create lead
    const lead = new Lead({
      vendor: body.vendorId,
      service: normalizedService,
      timeline: body.timeline || 'planning',
      budgetRange: body.budgetRange,
      customer: {
        companyName: body.companyName.trim(),
        contactName: body.contactName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        postcode: body.postcode?.trim(),
        message: body.message?.trim(),
      },
      requirements: body.monthlyVolume
        ? {
            monthlyVolume: body.monthlyVolume,
            features: body.requirements,
          }
        : undefined,
      source: {
        page: 'public-api',
        referrer: body.referralSource || 'website',
        utm: {
          source: body.referralSource || 'direct',
          medium: 'api',
          campaign: body.referralSource,
        },
      },
      status: 'pending',
    });

    await lead.save();

    return NextResponse.json({
      success: true,
      data: {
        quoteId: lead._id.toString(),
        message: 'Quote request submitted successfully. The supplier will contact you shortly.',
        supplierName: vendor.company,
        expectedResponse: '1-2 business days',
      },
    });
  } catch (error) {
    console.error('Quote request API error:', error);

    if ((error as Error).name === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: Object.values((error as { errors: Record<string, { message: string }> }).errors).map(
            (e) => e.message
          ),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit quote request' },
      { status: 500 }
    );
  }
}
