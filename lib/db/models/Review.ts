import mongoose, { Document, Model } from 'mongoose';

export interface IReview extends Document {
  vendor: mongoose.Types.ObjectId;
  reviewer: {
    name: string;
    company?: string;
    email?: string;
    isVerified?: boolean;
  };
  rating: number;
  title: string;
  content: string;
  service: string;
  wouldRecommend: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  vendorResponse?: {
    content?: string;
    respondedAt?: Date;
  };
  helpfulVotes: number;
  source: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true, index: true },
    reviewer: {
      name: { type: String, required: true, trim: true },
      company: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
      isVerified: { type: Boolean, default: false },
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    service: {
      type: String,
      enum: ['Photocopiers', 'CCTV', 'IT', 'Telecoms', 'Security', 'Software', 'General'],
      default: 'General',
    },
    wouldRecommend: { type: Boolean, default: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'flagged'], default: 'pending', index: true },
    vendorResponse: {
      content: { type: String, trim: true, maxlength: 1000 },
      respondedAt: Date,
    },
    helpfulVotes: { type: Number, default: 0 },
    source: { type: String, enum: ['website', 'email-request', 'api', 'imported'], default: 'website' },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reviewSchema.index({ vendor: 1, status: 1, createdAt: -1 });

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
export default Review;
