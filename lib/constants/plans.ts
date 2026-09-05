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
    name: 'AI Visibility Growth Programme',
    price: 1499,
    priceLabel: '£1,499/mo',
    description: 'A managed programme. We install AI-optimised data on your website, measure your AI visibility monthly, and verify your profile.',
    features: [
      { text: 'Monthly measurement across ChatGPT, Google AI Overviews and Perplexity', included: true },
      { text: 'AI mention tracking — know when AI talks about you', included: true },
      { text: 'Schema installed on your website (15-min pair session)', included: true },
      { text: 'Your website and TendorAI stay in sync automatically', included: true },
      { text: 'AI-optimised articles written for your firm — integrity-checked and approved by you before publishing', included: true },
      { text: 'LinkedIn and Facebook variants of every article', included: true },
      { text: 'TendorAI Verified badge', included: true },
      { text: 'Full AI Visibility Audit of your website', included: true },
      { text: 'Initial three-month term. Founding rate of £999/mo for the first 3 solicitor firms, held for 12 months.', included: true },
    ],
    cta: 'Book a call',
    popular: false,
  },
];
