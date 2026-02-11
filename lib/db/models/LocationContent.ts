import mongoose from 'mongoose';

export interface ILocationContent {
  _id: string;
  category: string;
  location: string;
  slug: string;
  content: string;
  wordCount?: number;
  generatedAt: Date;
  model: string;
}

const locationContentSchema = new mongoose.Schema({
  category: { type: String, required: true, index: true },
  location: { type: String, required: true, index: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  wordCount: { type: Number },
  generatedAt: { type: Date, default: Date.now },
  model: { type: String, default: 'gpt-4o-mini' },
}, {
  timestamps: true,
});

locationContentSchema.index({ category: 1, location: 1 }, { unique: true });

export const LocationContent = mongoose.models.LocationContent ||
  mongoose.model('LocationContent', locationContentSchema);
