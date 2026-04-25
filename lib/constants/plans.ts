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
      { text: 'Company listing in TendorAI directory', included: true },
      { text: 'Up to 3 products/services', included: true },
      { text: 'Receive quote requests', included: true },
      { text: 'AI Visibility Score (number only, no breakdown)', included: true },
      { text: 'Basic profile from regulator data (SRA/ICAEW/FCA/Propertymark)', included: true },
    ],
    cta: 'Claim Your Free Profile',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    priceLabel: '£299/mo',
    description: 'Get recommended first. We install AI-optimised data directly on your website, track your AI visibility weekly, and give you a Verified badge.',
    features: [
      { text: '96-topic pillar library + v7 AI blog writer', included: true },
      { text: 'Schema installed on your website (15-min pair session)', included: true },
      { text: 'Your website and TendorAI stay in sync automatically', included: true },
      { text: 'Weekly AI visibility scans across 6 AI platforms', included: true },
      { text: 'AI mention tracking — know when AI talks about you', included: true },
      { text: 'LinkedIn and Facebook variants of every blog', included: true },
      { text: 'TendorAI Verified badge', included: true },
      { text: '+15 visibility score boost', included: true },
      { text: 'Full AI Visibility Audit of your website', included: true },
      { text: 'Google Business Profile optimisation checklist', included: true },
      { text: 'Unlimited products and services', included: true },
      { text: 'Full analytics dashboard', included: true },
      { text: 'Priority support', included: true },
      { text: "90-day promise — score reviewed and refunded if it isn't moving", included: true },
    ],
    cta: 'Start Pro',
    popular: true,
  },
];
