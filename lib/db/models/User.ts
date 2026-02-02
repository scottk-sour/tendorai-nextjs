import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin' | 'vendor';
  company?: string;
  phone?: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
  };
  isActive: boolean;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin: Date;
  loginCount: number;
  profilePicture?: string;
  dashboardSettings: {
    theme: 'light' | 'dark';
    language: string;
    timezone: string;
    defaultView: 'dashboard' | 'quotes' | 'vendors';
  };
  businessInfo: {
    industry?: string;
    companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
    annualVolume?: number;
    preferredVendors?: string[];
  };
  createdAt: Date;
  updatedAt: Date;

  // Virtuals
  fullName: string;

  // Methods
  toSafeObject(): Partial<IUser>;
  isAdmin(): boolean;
  isVendor(): boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, default: 'User' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    role: {
      type: String,
      enum: ['user', 'admin', 'vendor'],
      default: 'user',
    },
    company: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      zipCode: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
      marketingEmails: { type: Boolean, default: true },
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    lastLogin: { type: Date, default: Date.now },
    loginCount: { type: Number, default: 0 },
    profilePicture: { type: String, default: null },
    dashboardSettings: {
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      language: { type: String, default: 'en' },
      timezone: { type: String, default: 'UTC' },
      defaultView: { type: String, enum: ['dashboard', 'quotes', 'vendors'], default: 'dashboard' },
    },
    businessInfo: {
      industry: { type: String, default: '' },
      companySize: { type: String, enum: ['1-10', '11-50', '51-200', '201-500', '500+'], default: '1-10' },
      annualVolume: { type: Number, default: 0 },
      preferredVendors: [{ type: String }],
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.name || 'User';
});

// Pre-save middleware for password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Pre-save middleware to update login count
userSchema.pre('save', function (next) {
  if (this.isModified('lastLogin')) {
    this.loginCount += 1;
  }
  next();
});

// Method to get safe user data (without password)
userSchema.methods.toSafeObject = function (): Partial<IUser> {
  const user = this.toObject();
  delete user.password;
  delete user.verificationToken;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpires;
  return user;
};

// Method to check if user is admin
userSchema.methods.isAdmin = function (): boolean {
  return this.role === 'admin';
};

// Method to check if user is a vendor
userSchema.methods.isVendor = function (): boolean {
  return this.role === 'vendor';
};

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = (mongoose.models.User as IUserModel) || mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
