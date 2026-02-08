import mongoose, { Document } from 'mongoose';

export interface IVendorPost extends Document {
  _id: mongoose.Types.ObjectId;
  vendor: mongoose.Types.ObjectId;
  title: string;
  body: string;
  category: 'news' | 'product' | 'offer' | 'guide' | 'update';
  tags: string[];
  status: 'published' | 'hidden';
  slug: string;
  isDemoVendor: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const vendorPostSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  title: { type: String, required: true, maxlength: 200 },
  body: { type: String, required: true, maxlength: 5000 },
  category: { type: String, enum: ['news', 'product', 'offer', 'guide', 'update'], default: 'news' },
  tags: [{ type: String }],
  status: { type: String, enum: ['published', 'hidden'], default: 'published' },
  slug: { type: String, unique: true },
  isDemoVendor: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.VendorPost || mongoose.model<IVendorPost>('VendorPost', vendorPostSchema);
