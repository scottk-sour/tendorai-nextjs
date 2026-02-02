import mongoose, { Schema, Document, Model } from 'mongoose';

// Use 'productModel' in interface to avoid conflict with Document.model
export interface IVendorProduct extends Document {
  _id: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  manufacturer: string;
  productModel: string; // Called 'model' in database
  description?: string;
  category: 'A4 Printers' | 'A4 MFP' | 'A3 MFP' | 'SRA3 MFP';
  speed: number;
  isA3: boolean;
  features: string[];
  minVolume: number;
  maxVolume: number;
  volumeRange: '0-6k' | '6k-13k' | '13k-20k' | '20k-30k' | '30k-40k' | '40k-50k' | '50k+';
  paperSizes: {
    primary: 'A4' | 'A3' | 'SRA3';
    supported: string[];
  };
  costs: {
    machineCost: number;
    installation: number;
    profitMargin: number;
    totalMachineCost: number;
    cpcRates: {
      A4Mono: number;
      A4Colour: number;
      A3Mono?: number;
      A3Colour?: number;
      SRA3Mono?: number;
      SRA3Colour?: number;
    };
  };
  service: {
    level?: 'Basic' | 'Standard' | 'Premium';
    responseTime?: '4hr' | '8hr' | 'Next day';
    quarterlyService?: number;
  };
  availability: {
    inStock: boolean;
    leadTime: number;
  };
  leaseRates: {
    term36?: number;
    term48?: number;
    term60?: number;
    term72?: number;
  };
  minimumQuarterlyCharge: number;
  status: 'active' | 'inactive' | 'draft';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Virtuals
  displayName: string;
  costDisplay: string;
  volumeDisplay: string;
}

interface IVendorProductModel extends Model<IVendorProduct> {
  findMatches(requirements: {
    monthlyVolume?: { total?: number };
    paperSize?: string;
    maxBudget?: number;
    requiredFeatures?: string[];
    urgency?: string;
  }): mongoose.Query<IVendorProduct[], IVendorProduct>;
}

const vendorProductSchema = new Schema<IVendorProduct>(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    manufacturer: { type: String, required: true },
    productModel: { type: String, required: true, alias: 'model' }, // 'model' in DB, 'productModel' in code
    description: { type: String },
    category: {
      type: String,
      enum: ['A4 Printers', 'A4 MFP', 'A3 MFP', 'SRA3 MFP'],
      required: true,
    },
    speed: { type: Number, required: true },
    isA3: { type: Boolean, default: false },
    features: [{ type: String }],
    minVolume: { type: Number, required: true },
    maxVolume: { type: Number, required: true },
    volumeRange: {
      type: String,
      enum: ['0-6k', '6k-13k', '13k-20k', '20k-30k', '30k-40k', '40k-50k', '50k+'],
      required: true,
    },
    paperSizes: {
      primary: {
        type: String,
        enum: ['A4', 'A3', 'SRA3'],
        required: true,
      },
      supported: [
        {
          type: String,
          enum: ['A4', 'A3', 'SRA3', 'A5', 'Letter', 'Legal'],
        },
      ],
    },
    costs: {
      machineCost: { type: Number, required: true },
      installation: { type: Number, default: 250 },
      profitMargin: { type: Number, required: true },
      totalMachineCost: { type: Number, required: true },
      cpcRates: {
        A4Mono: { type: Number, required: true },
        A4Colour: { type: Number, required: true },
        A3Mono: { type: Number },
        A3Colour: { type: Number },
        SRA3Mono: { type: Number },
        SRA3Colour: { type: Number },
      },
    },
    service: {
      level: { type: String, enum: ['Basic', 'Standard', 'Premium'] },
      responseTime: { type: String, enum: ['4hr', '8hr', 'Next day'] },
      quarterlyService: { type: Number },
    },
    availability: {
      inStock: { type: Boolean, default: true },
      leadTime: { type: Number, default: 14 },
    },
    leaseRates: {
      term36: { type: Number },
      term48: { type: Number },
      term60: { type: Number },
      term72: { type: Number },
    },
    minimumQuarterlyCharge: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active',
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
vendorProductSchema.virtual('displayName').get(function () {
  return `${this.manufacturer} ${this.productModel}`;
});

vendorProductSchema.virtual('costDisplay').get(function () {
  const mono = this.costs.cpcRates.A4Mono;
  const colour = this.costs.cpcRates.A4Colour;
  if (colour > 0) {
    return `${mono}p mono, ${colour}p colour`;
  }
  return `${mono}p mono only`;
});

vendorProductSchema.virtual('volumeDisplay').get(function () {
  return `${this.minVolume.toLocaleString()} - ${this.maxVolume.toLocaleString()} pages/month`;
});

// Pre-save middleware
vendorProductSchema.pre('save', function (next) {
  // Calculate total machine cost
  if (this.costs && this.costs.machineCost && this.costs.installation && this.costs.profitMargin) {
    this.costs.totalMachineCost = this.costs.machineCost + this.costs.installation + this.costs.profitMargin;
  }

  // Set volume range
  if (this.maxVolume) {
    if (this.maxVolume <= 6000) this.volumeRange = '0-6k';
    else if (this.maxVolume <= 13000) this.volumeRange = '6k-13k';
    else if (this.maxVolume <= 20000) this.volumeRange = '13k-20k';
    else if (this.maxVolume <= 30000) this.volumeRange = '20k-30k';
    else if (this.maxVolume <= 40000) this.volumeRange = '30k-40k';
    else if (this.maxVolume <= 50000) this.volumeRange = '40k-50k';
    else this.volumeRange = '50k+';
  }

  // Set supported paper sizes
  if (!this.paperSizes?.supported || this.paperSizes.supported.length === 0) {
    if (this.paperSizes?.primary) {
      this.paperSizes.supported = [this.paperSizes.primary];
      if (this.paperSizes.primary === 'SRA3') {
        this.paperSizes.supported.push('A3', 'A4');
      } else if (this.paperSizes.primary === 'A3') {
        this.paperSizes.supported.push('A4');
      }
    }
  }

  next();
});

// Validation
vendorProductSchema.path('minVolume').validate(function (value: number) {
  return value < this.maxVolume;
}, 'minVolume must be less than maxVolume');

// Static methods
vendorProductSchema.statics.findMatches = function (requirements) {
  const { monthlyVolume, paperSize, maxBudget, requiredFeatures, urgency } = requirements;
  const query: Record<string, unknown> = {};

  if (monthlyVolume?.total) {
    query.minVolume = { $lte: monthlyVolume.total };
    query.maxVolume = { $gte: monthlyVolume.total };
  }
  if (paperSize) {
    query['paperSizes.supported'] = paperSize;
  }
  if (maxBudget) {
    query['costs.totalMachineCost'] = { $lte: maxBudget };
  }
  if (requiredFeatures && requiredFeatures.length > 0) {
    query.features = { $all: requiredFeatures };
  }
  if (urgency === 'Immediately') {
    query['availability.inStock'] = true;
    query['availability.leadTime'] = { $lte: 7 };
  }

  return this.find(query)
    .populate('vendorId', 'name company performance.rating')
    .sort({ 'costs.totalMachineCost': 1 });
};

// Indexes
vendorProductSchema.index({ volumeRange: 1, 'paperSizes.primary': 1 });
vendorProductSchema.index({ minVolume: 1, maxVolume: 1 });
vendorProductSchema.index({ vendorId: 1 });
vendorProductSchema.index({ category: 1 });
vendorProductSchema.index({ 'costs.totalMachineCost': 1 });
vendorProductSchema.index({ speed: 1 });
vendorProductSchema.index({ features: 1 });
vendorProductSchema.index({ status: 1, isActive: 1 });

const VendorProduct =
  (mongoose.models.VendorProduct as IVendorProductModel) ||
  mongoose.model<IVendorProduct, IVendorProductModel>('VendorProduct', vendorProductSchema);

export default VendorProduct;
