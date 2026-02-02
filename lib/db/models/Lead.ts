import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILead extends Document {
  _id: mongoose.Types.ObjectId;
  vendor: mongoose.Types.ObjectId;
  service: string;
  timeline: 'urgent' | 'soon' | 'planning' | 'future';
  budgetRange?: string;
  customer: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    postcode?: string;
    message?: string;
  };
  requirements?: {
    monthlyVolume?: number;
    features?: string[];
    paperSize?: string;
    colourRequired?: boolean;
  };
  source: {
    page?: string;
    referrer?: string;
    utm?: {
      source?: string;
      medium?: string;
      campaign?: string;
    };
  };
  status: 'pending' | 'contacted' | 'quoted' | 'won' | 'lost' | 'spam';
  notes?: string;
  respondedAt?: Date;
  quotedAt?: Date;
  closedAt?: Date;
  closedReason?: string;
  value?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ILeadModel extends Model<ILead> {}

const leadSchema = new Schema<ILead>(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      index: true,
    },
    service: {
      type: String,
      required: true,
      enum: ['CCTV', 'Photocopiers', 'IT', 'Telecoms', 'Security', 'Software'],
    },
    timeline: {
      type: String,
      enum: ['urgent', 'soon', 'planning', 'future'],
      default: 'planning',
    },
    budgetRange: { type: String },
    customer: {
      companyName: { type: String, required: true, trim: true },
      contactName: { type: String, required: true, trim: true },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please provide a valid email address'],
      },
      phone: { type: String, required: true, trim: true },
      postcode: { type: String, trim: true },
      message: { type: String, trim: true },
    },
    requirements: {
      monthlyVolume: { type: Number },
      features: [{ type: String }],
      paperSize: { type: String },
      colourRequired: { type: Boolean },
    },
    source: {
      page: { type: String },
      referrer: { type: String },
      utm: {
        source: { type: String },
        medium: { type: String },
        campaign: { type: String },
      },
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'quoted', 'won', 'lost', 'spam'],
      default: 'pending',
    },
    notes: { type: String },
    respondedAt: { type: Date },
    quotedAt: { type: Date },
    closedAt: { type: Date },
    closedReason: { type: String },
    value: { type: Number },
  },
  {
    timestamps: true,
    collection: 'vendorleads',
  }
);

// Indexes
leadSchema.index({ vendor: 1, createdAt: -1 });
leadSchema.index({ status: 1 });
leadSchema.index({ 'customer.email': 1 });
leadSchema.index({ service: 1 });
leadSchema.index({ createdAt: -1 });

const Lead = (mongoose.models.Lead as ILeadModel) || mongoose.model<ILead, ILeadModel>('Lead', leadSchema);

export default Lead;
