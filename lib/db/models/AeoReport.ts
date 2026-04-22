import mongoose, { Document, Model } from 'mongoose';

export interface IAeoReport extends Document {
  companyName: string;
  category: string;
  customIndustry?: string | null;
  city: string;
  email?: string;
  aiMentioned: boolean;
  aiPosition?: number | null;
  aiRecommendations: Array<{
    name: string;
    description: string;
    reason: string;
  }>;
  competitorsOnTendorAI: number;
  ipAddress?: string;
  createdAt: Date;
  reportType: 'basic' | 'full';
  score?: number | null;
  scoreBreakdown?: {
    websiteOptimisation?: number | null;
    contentAuthority?: number | null;
    directoryPresence?: number | null;
    reviewSignals?: number | null;
    structuredData?: number | null;
    competitivePosition?: number | null;
  };
  searchedCompany?: {
    website?: string | null;
    hasReviews?: boolean | null;
    hasPricing?: boolean | null;
    hasStructuredData?: boolean | null;
    hasDetailedServices?: boolean | null;
    hasSocialMedia?: boolean | null;
    hasGoogleBusiness?: boolean | null;
    googleBusinessDetail?: {
      state: 'pass' | 'amber' | 'fail';
      summary: string;
    } | null;
    summary?: string | null;
  };
  competitors: Array<{
    name: string;
    description: string;
    reason: string;
    website?: string | null;
    strengths: string[];
  }>;
  gaps: Array<{
    title: string;
    explanation: string;
  }>;
  gapsIdentified?: number;
  pdfBuffer?: Buffer | null;
  platformResults?: Array<{
    platform: string;
    platformLabel: string;
    mentioned: boolean;
    position?: number | null;
    snippet?: string | null;
    competitors: string[];
    error?: string | null;
  }>;
  tier?: string | null;
}

const aeoReportSchema = new mongoose.Schema<IAeoReport>({
  companyName: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  customIndustry: { type: String, trim: true, default: null },
  city: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  aiMentioned: { type: Boolean, required: true },
  aiPosition: { type: Number, default: null },
  aiRecommendations: [
    {
      name: String,
      description: String,
      reason: String,
    },
  ],
  competitorsOnTendorAI: { type: Number, default: 0 },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
  reportType: { type: String, enum: ['basic', 'full'], default: 'basic' },
  score: { type: Number, min: 0, max: 100, default: null },
  scoreBreakdown: {
    websiteOptimisation: { type: Number, default: null },
    contentAuthority: { type: Number, default: null },
    directoryPresence: { type: Number, default: null },
    reviewSignals: { type: Number, default: null },
    structuredData: { type: Number, default: null },
    competitivePosition: { type: Number, default: null },
  },
  searchedCompany: {
    website: { type: String, default: null },
    hasReviews: { type: Boolean, default: null },
    hasPricing: { type: Boolean, default: null },
    hasStructuredData: { type: Boolean, default: null },
    hasDetailedServices: { type: Boolean, default: null },
    hasSocialMedia: { type: Boolean, default: null },
    hasGoogleBusiness: { type: Boolean, default: null },
    googleBusinessDetail: {
      type: {
        state: { type: String, enum: ['pass', 'amber', 'fail'], required: true },
        summary: { type: String, required: true },
      },
      default: null,
      _id: false,
    },
    summary: { type: String, default: null },
  },
  competitors: [
    {
      name: String,
      description: String,
      reason: String,
      website: { type: String, default: null },
      strengths: [String],
    },
  ],
  gaps: [
    {
      title: String,
      explanation: String,
    },
  ],
  gapsIdentified: { type: Number, default: null },
  pdfBuffer: { type: Buffer, default: null },
  platformResults: [{
    platform: { type: String, enum: ['perplexity', 'chatgpt', 'claude', 'gemini', 'grok', 'meta'] },
    platformLabel: String,
    mentioned: Boolean,
    position: { type: Number, default: null },
    snippet: { type: String, default: null },
    competitors: [String],
    error: { type: String, default: null },
  }],
  tier: { type: String, enum: ['free', 'starter', 'pro', 'enterprise', null], default: null },
});

aeoReportSchema.index({ createdAt: -1 });
aeoReportSchema.index({ email: 1 }, { sparse: true });
aeoReportSchema.index({ reportType: 1, createdAt: -1 });

const AeoReport: Model<IAeoReport> =
  mongoose.models.AeoReport || mongoose.model<IAeoReport>('AeoReport', aeoReportSchema);
export default AeoReport;
