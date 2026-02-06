export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Listed',
    price: 0,
    priceLabel: 'Free',
    description: 'Basic listing for new vendors',
    features: [
      { text: 'Company listing', included: true },
      { text: 'Up to 3 products', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score (number only)', included: true },
      { text: 'AI Mentions tracking', included: false },
      { text: 'Visibility breakdown & tips', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Up to 10 products', included: false },
      { text: '+15 visibility score points', included: false },
      { text: 'Verified badge', included: false },
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    id: 'visible',
    name: 'Visible',
    price: 99,
    priceLabel: '£99/mo',
    description: 'Get discovered by AI assistants',
    features: [
      { text: 'Company listing', included: true },
      { text: 'Up to 10 products', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score + breakdown', included: true },
      { text: 'AI Mentions tracking', included: true },
      { text: 'Actionable visibility tips', included: true },
      { text: 'Full analytics dashboard', included: true },
      { text: '+15 visibility score points', included: true },
      { text: 'Unlimited products', included: false },
      { text: 'Verified badge + priority ranking', included: false },
    ],
    cta: 'Upgrade to Visible',
    popular: true,
  },
  {
    id: 'verified',
    name: 'Verified',
    price: 149,
    priceLabel: '£149/mo',
    description: 'Maximum visibility & trust',
    features: [
      { text: 'Everything in Visible', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'Verified Supplier badge', included: true },
      { text: 'Priority in AI recommendations', included: true },
      { text: '+30 visibility score points (max 100)', included: true },
      { text: 'Detailed AI query analytics', included: true },
      { text: 'Featured placement', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Upgrade to Verified',
    popular: false,
  },
];
