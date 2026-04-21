import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Crawler Access Checker — Is Your Site Blocking ChatGPT and Claude? | TendorAI',
  description:
    "Free check: see whether ChatGPT, Claude, Perplexity and Gemini can reach your website. If AI platforms can't crawl you, they can't cite you.",
  alternates: { canonical: '/tools/robots-checker' },
};

export default function RobotsCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
