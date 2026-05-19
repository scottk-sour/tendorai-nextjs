import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const VALID_SERVICES = ['CCTV', 'Photocopiers', 'IT', 'Telecoms', 'Security', 'Software', 'Solicitors', 'Accountants', 'Mortgage Advisors', 'Estate Agents'];

export interface IVendor extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  company: string;
  email: string;
  password: string;
  services: string[];
  location: {
    address?: string;
    city?: string;
    postcode?: string;
    region?: string;
    coverage?: string[];
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
  contactInfo: {
    phone?: string;
    website?: string;
    linkedIn?: string;
    alternativeContact?: {
      name?: string;
      email?: string;
      phone?: string;
    };
  };
  businessProfile: {
    yearsInBusiness?: number;
    companySize?: string;
    numEmployees?: number;
    specializations?: string[];
    certifications?: string[];
    accreditations?: string[];
    description?: string;
    logoUrl?: string;
  };
  brands?: string[];
  postcodeAreas?: string[];
  performance: {
    rating?: number;
    reviewCount?: number;
    averageResponseTime?: number;
    completionRate?: number;
    customerSatisfaction?: number;
    onTimeDelivery?: number;
  };
  serviceCapabilities: {
    responseTime?: string;
    supportHours?: string;
    installationService?: boolean;
    maintenanceService?: boolean;
    trainingProvided?: boolean;
    remoteSupport?: boolean;
    emergencySupport?: boolean;
  };
  commercial: {
    creditRating?: string;
    paymentTerms?: string;
    minimumOrderValue?: number;
    discountThresholds?: Array<{
      volumeThreshold?: number;
      discountPercentage?: number;
    }>;
    preferredLeasePartners?: string[];
  };
  account: {
    status?: string;
    verificationStatus?: string;
    tier?: string;
    lastLogin?: Date;
    loginCount?: number;
    agreementsSigned?: Array<{
      type?: string;
      signedAt?: Date;
      version?: string;
    }>;
  };
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  tier: string;
  subscriptionStatus?: string;
  subscriptionEndDate?: Date;
  subscriptionCurrentPeriodEnd?: Date;
  integration: {
    apiKey?: string;
    webhookUrl?: string;
    autoQuoteGeneration?: boolean;
    productCatalogUrl?: string;
    pricingUpdateFrequency?: string;
  };
  notes?: Array<{
    note: string;
    addedBy?: mongoose.Types.ObjectId;
    addedAt?: Date;
    type?: string;
    priority?: string;
  }>;
  vendorType?: string;
  sraNumber?: string;
  icaewFirmNumber?: string;
  fcaNumber?: string;
  propertymarkNumber?: string;
  propertymarkQualification?: string;
  regulatoryBody?: string;
  practiceAreas?: string[];
  organisationType?: string;
  companyNumber?: string;
  officeCount?: number;
  fixedFees?: Array<{ service: string; fee: string }>;
  languages?: string[];
  legalAid?: boolean;
  lenderPanels?: string[];
  individualSolicitors?: Array<{ name: string; role: string; specialisms: string; qualifications: string }>;
  softwareUsed?: string[];
  industrySpecialisms?: string[];
  mtdCompliant?: boolean;
  accreditations?: string[];
  source?: string;
  claimed?: boolean;
  listingStatus?: string;
  claimedAt?: Date;
  claimedBy?: mongoose.Types.ObjectId;
  importedAt?: Date;
  importSource?: string;
  showPricing?: boolean;
  slug?: string;
  previousSlugs?: string[];
  firmFacts?: {
    clientTypes?: string[];
    uniqueSellingPoints?: string[];
    partners?: Array<{
      name?: string;
      role?: string;
      qualifications?: string;
      yearsAtFirm?: number;
    }>;
    feeEarnerCount?: number;
    yearFounded?: number;
    additionalOffices?: Array<{ city?: string; postcode?: string }>;
    awards?: string[];
    memberships?: string[];
    toneOfVoice?: 'formal' | 'approachable' | 'plain-english' | 'expert';
    brandKeywords?: string[];
    competitors?: string[];
  };
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  updateLastLogin(): Promise<IVendor>;
  isActive(): boolean;
}

interface IVendorModel extends Model<IVendor> {
  findByService(service: string): mongoose.Query<IVendor[], IVendor>;
  findByRegion(region: string): mongoose.Query<IVendor[], IVendor>;
}

const vendorSchema = new Schema<IVendor>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please provide a valid email address'],
    },
    password: { type: String, required: true, minlength: 6 },

    services: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length > 0 && arr.every((s) => VALID_SERVICES.includes(s)),
        message: `Must provide at least one valid service. Allowed: ${VALID_SERVICES.join(', ')}`,
      },
    },

    location: {
      address: { type: String, trim: true, default: '' },
      city: { type: String, trim: true, default: '' },
      postcode: { type: String, trim: true, default: '' },
      region: { type: String, trim: true, default: '' },
      coverage: [{ type: String, trim: true }],
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },

    contactInfo: {
      phone: { type: String, default: '' },
      website: { type: String, trim: true, default: '' },
      linkedIn: { type: String, trim: true, default: '' },
      alternativeContact: {
        name: { type: String, trim: true, default: '' },
        email: { type: String, trim: true, default: '' },
        phone: { type: String, trim: true, default: '' },
      },
    },

    businessProfile: {
      yearsInBusiness: { type: Number, min: 0, max: 100, default: 0 },
      companySize: {
        type: String,
        enum: ['Startup', 'Small (1-50)', 'Medium (51-200)', 'Large (201-1000)', 'Enterprise (1000+)', ''],
        default: 'Small (1-50)',
      },
      numEmployees: { type: Number, default: 0 },
      specializations: [{ type: String, trim: true }],
      certifications: [{ type: String, trim: true }],
      accreditations: [{ type: String, trim: true }],
      description: { type: String, trim: true, default: '' },
      logoUrl: { type: String, trim: true },
    },

    brands: [{ type: String, trim: true }],
    postcodeAreas: [{ type: String, uppercase: true, trim: true }],

    performance: {
      rating: { type: Number, default: 0, min: 0, max: 5 },
      reviewCount: { type: Number, default: 0 },
      averageResponseTime: { type: Number, default: 0 },
      completionRate: { type: Number, default: 0 },
      customerSatisfaction: { type: Number, default: 0 },
      onTimeDelivery: { type: Number, default: 0 },
    },

    serviceCapabilities: {
      responseTime: {
        type: String,
        enum: ['4hr', '8hr', 'Next day', '48hr', '3-5 days'],
        default: 'Next day',
      },
      supportHours: {
        type: String,
        enum: ['9-5', '8-6', '24/7', 'Extended hours'],
        default: '9-5',
      },
      installationService: { type: Boolean, default: true },
      maintenanceService: { type: Boolean, default: true },
      trainingProvided: { type: Boolean, default: false },
      remoteSupport: { type: Boolean, default: false },
      emergencySupport: { type: Boolean, default: false },
    },

    commercial: {
      creditRating: {
        type: String,
        enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Unknown'],
        default: 'Unknown',
      },
      paymentTerms: {
        type: String,
        enum: ['Net 30', 'Net 60', 'COD', 'Advance payment'],
        default: 'Net 30',
      },
      minimumOrderValue: { type: Number, default: 0 },
      discountThresholds: [
        {
          volumeThreshold: { type: Number },
          discountPercentage: { type: Number },
        },
      ],
      preferredLeasePartners: [{ type: String, trim: true }],
    },

    account: {
      status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'active', 'inactive', 'suspended', 'rejected'],
      },
      verificationStatus: {
        type: String,
        default: 'unverified',
        enum: ['unverified', 'pending', 'verified', 'rejected'],
      },
      tier: {
        type: String,
        default: 'standard',
        enum: ['bronze', 'silver', 'gold', 'platinum', 'standard'],
      },
      lastLogin: { type: Date },
      loginCount: { type: Number, default: 0 },
      agreementsSigned: [
        {
          type: { type: String },
          signedAt: { type: Date },
          version: { type: String },
        },
      ],
    },

    stripeCustomerId: { type: String, sparse: true, index: true },
    stripeSubscriptionId: { type: String, sparse: true },
    tier: {
      type: String,
      default: 'free',
      enum: ['free', 'basic', 'managed', 'enterprise', 'listed', 'visible', 'verified'],
    },
    subscriptionStatus: {
      type: String,
      default: 'none',
      enum: ['none', 'active', 'past_due', 'cancelled', 'trialing', 'incomplete'],
    },
    subscriptionEndDate: { type: Date },
    subscriptionCurrentPeriodEnd: { type: Date },

    integration: {
      apiKey: { type: String },
      webhookUrl: { type: String, trim: true },
      autoQuoteGeneration: { type: Boolean, default: false },
      productCatalogUrl: { type: String, trim: true },
      pricingUpdateFrequency: {
        type: String,
        enum: ['Manual', 'Daily', 'Weekly', 'Monthly'],
        default: 'Manual',
      },
    },

    notes: [
      {
        note: { type: String, required: true },
        addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        addedAt: { type: Date, default: Date.now },
        type: { type: String, enum: ['admin', 'system', 'vendor'], default: 'admin' },
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
      },
    ],

    vendorType: { type: String, enum: ['office-equipment', 'solicitor', 'accountant', 'mortgage-advisor', 'estate-agent'], default: 'office-equipment' },
    sraNumber: { type: String, trim: true },
    icaewFirmNumber: { type: String, trim: true },
    fcaNumber: { type: String, trim: true },
    propertymarkNumber: { type: String, trim: true },
    propertymarkQualification: { type: String, trim: true },
    regulatoryBody: { type: String, trim: true },
    practiceAreas: [{ type: String, trim: true }],
    organisationType: { type: String, trim: true },
    companyNumber: { type: String, trim: true },
    officeCount: { type: Number },
    fixedFees: [{
      service: { type: String, trim: true },
      fee: { type: String, trim: true },
    }],
    languages: [{ type: String, trim: true }],
    legalAid: { type: Boolean, default: false },
    lenderPanels: [{ type: String, trim: true }],
    individualSolicitors: [{
      name: { type: String, trim: true },
      role: { type: String, trim: true },
      specialisms: { type: String, trim: true },
      qualifications: { type: String, trim: true },
    }],
    softwareUsed: [{ type: String, trim: true }],
    industrySpecialisms: [{ type: String, trim: true }],
    mtdCompliant: { type: Boolean, default: false },
    accreditations: [{ type: String, trim: true }],
    source: { type: String, trim: true },
    claimed: { type: Boolean, default: false },
    listingStatus: {
      type: String,
      enum: ['unclaimed', 'claimed', 'verified', 'suspended'],
      default: 'unclaimed',
    },
    claimedAt: { type: Date },
    claimedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    importedAt: { type: Date },
    importSource: { type: String, trim: true },
    showPricing: { type: Boolean, default: false },
    slug: { type: String, unique: true, sparse: true, trim: true, lowercase: true, index: true },
    // Historical slugs migrated by backend PR #77 — old profile URLs
    // resolve through these and 307-redirect to the canonical `slug`.
    previousSlugs: { type: [String], default: [], index: true },

    firmFacts: {
      clientTypes: [{ type: String, trim: true }],
      uniqueSellingPoints: [{ type: String, trim: true }],
      partners: [{
        name: { type: String, trim: true },
        role: { type: String, trim: true },
        qualifications: { type: String, trim: true },
        yearsAtFirm: { type: Number, min: 0 },
      }],
      feeEarnerCount: { type: Number, min: 0 },
      yearFounded: { type: Number, min: 1700, max: new Date().getFullYear() + 1 },
      additionalOffices: [{
        city: { type: String, trim: true },
        postcode: { type: String, trim: true },
      }],
      awards: [{ type: String, trim: true }],
      memberships: [{ type: String, trim: true }],
      toneOfVoice: {
        type: String,
        enum: ['formal', 'approachable', 'plain-english', 'expert'],
      },
      brandKeywords: [{ type: String, trim: true }],
      competitors: [{ type: String, trim: true }],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
vendorSchema.virtual('productCount', {
  ref: 'VendorProduct',
  localField: '_id',
  foreignField: 'vendorId',
  count: true,
});

// Pre-save middleware
vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

vendorSchema.pre('save', function (next) {
  if (this.contactInfo?.website) {
    let url = this.contactInfo.website.trim();
    if (url && !url.match(/^https?:\/\//i)) {
      this.contactInfo.website = 'https://' + url;
    }
  }
  next();
});

vendorSchema.pre('save', function (next) {
  const accountStatus = this.account?.status;
  const hasApiKey = this.integration?.apiKey;

  if (!hasApiKey && accountStatus === 'active') {
    if (!this.integration) {
      this.integration = {};
    }
    this.integration.apiKey = crypto.randomBytes(32).toString('hex');
  }
  next();
});

// Instance methods
vendorSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

vendorSchema.methods.updateLastLogin = function (): Promise<IVendor> {
  this.account.lastLogin = new Date();
  this.account.loginCount = (this.account.loginCount || 0) + 1;
  return this.save();
};

vendorSchema.methods.isActive = function (): boolean {
  return this.account?.status === 'active' && this.account?.verificationStatus === 'verified';
};

// Static methods
vendorSchema.statics.findByService = function (service: string) {
  return this.find({
    services: service,
    'account.status': 'active',
    'account.verificationStatus': 'verified',
  });
};

vendorSchema.statics.findByRegion = function (region: string) {
  return this.find({
    'location.coverage': region,
    'account.status': 'active',
  });
};

// Indexes
vendorSchema.index({ email: 1 }, { unique: true });
vendorSchema.index({ company: 1 });
vendorSchema.index({ services: 1 });
vendorSchema.index({ 'location.coverage': 1 });
vendorSchema.index({ 'account.status': 1, 'account.verificationStatus': 1 });
vendorSchema.index({ 'performance.rating': -1 });
vendorSchema.index({ 'integration.apiKey': 1 }, { sparse: true });
vendorSchema.index({ listingStatus: 1 });
vendorSchema.index({ postcodeAreas: 1 });
vendorSchema.index({ brands: 1 });
vendorSchema.index({ tier: 1 });
vendorSchema.index({ vendorType: 1 });
vendorSchema.index({ sraNumber: 1 }, { sparse: true });
vendorSchema.index({ practiceAreas: 1 });
vendorSchema.index({ vendorType: 1, 'location.city': 1 });

// Prevent model recompilation in development
const Vendor = (mongoose.models.Vendor as IVendorModel) || mongoose.model<IVendor, IVendorModel>('Vendor', vendorSchema);

export default Vendor;
