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
    priceLabel: '£0/forever',
    description: 'Claim your profile. Get listed in the TendorAI directory and visible to AI crawlers with your basic SRA/FCA details.',
    features: [
      { text: 'Company listing', included: true },
      { text: 'Up to 3 products/services', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score (number only)', included: true },
      { text: 'AI Mentions tracking', included: false },
      { text: 'Visibility breakdown & tips', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Unlimited products/services', included: false },
      { text: '+15 visibility score points', included: false },
      { text: 'Verified badge', included: false },
    ],
    cta: 'Claim Your Free Profile',
    popular: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 149,
    priceLabel: '£149/mo',
    originalPrice: 299,
    description: 'Stand out from unclaimed profiles. Add your pricing, specialisms, and services so AI can recommend you with detail. Includes monthly AI Visibility (AEO) report.',
    features: [
      { text: 'Company listing', included: true },
      { text: 'Unlimited products/services', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score + breakdown', included: true },
      { text: 'AI Mentions tracking', included: true },
      { text: 'Actionable visibility tips', included: true },
      { text: 'Full analytics dashboard', included: true },
      { text: '+15 visibility score points', included: true },
      { text: 'Monthly AI Visibility (AEO) report', included: true },
      { text: 'Verified badge + priority ranking', included: false },
    ],
    cta: 'Start Starter',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    priceLabel: '£299/mo',
    originalPrice: 499,
    description: 'Get recommended first. We install AI-optimised data directly on your website, track your AI visibility weekly, and give you a Verified badge.',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'We install AI visibility code on your website', included: true },
      { text: 'Your website and TendorAI stay in sync automatically', included: true },
      { text: 'Weekly AI visibility reports', included: true },
      { text: 'AI mention tracking — see when AI talks about you', included: true },
      { text: 'TendorAI Verified badge', included: true },
      { text: 'Google Business Profile optimisation checklist', included: true },
      { text: 'Full AI Visibility (AEO) audit of your website', included: true },
      { text: 'Unlimited products and services', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Pro',
    popular: true,
  },
];
