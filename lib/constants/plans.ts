export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  originalPrice?: number;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceLabel: 'Free',
    description: 'Basic listing for new vendors',
    features: [
      { text: 'Company listing', included: true },
      { text: 'Up to 3 products/services', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score (number only)', included: true },
      { text: 'AI Mentions tracking', included: false },
      { text: 'Visibility breakdown & tips', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Up to 10 products/services', included: false },
      { text: '+15 visibility score points', included: false },
      { text: 'Verified badge', included: false },
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 149,
    priceLabel: '£149/mo',
    originalPrice: 299,
    description: 'Early adopter pricing — normally £299/mo',
    features: [
      { text: 'Company listing', included: true },
      { text: 'Up to 10 products/services', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score + breakdown', included: true },
      { text: 'AI Mentions tracking', included: true },
      { text: 'Actionable visibility tips', included: true },
      { text: 'Full analytics dashboard', included: true },
      { text: '+15 visibility score points', included: true },
      { text: 'Monthly AEO visibility report', included: true },
      { text: 'Verified badge + priority ranking', included: false },
    ],
    cta: 'Upgrade to Starter',
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    priceLabel: '£299/mo',
    originalPrice: 499,
    description: 'Early adopter pricing — normally £499/mo',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Unlimited products/services', included: true },
      { text: 'Verified Supplier badge', included: true },
      { text: 'Priority in AI recommendations', included: true },
      { text: '+30 visibility score points (max 100)', included: true },
      { text: 'Weekly AEO visibility report', included: true },
      { text: 'Detailed AI query analytics', included: true },
      { text: 'Featured placement', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Upgrade to Pro',
    popular: false,
  },
];
