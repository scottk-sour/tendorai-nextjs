'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { ProgressBar } from './components/ProgressBar';
import { Stage1Form } from './components/Stage1Form';
import { useFirmFacts } from './hooks/useFirmFacts';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

type GateState = 'checking' | 'unauthenticated' | 'free-tier' | 'allowed';

function FirmFactsOnboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { auth, getCurrentToken } = useAuth();
  const [gate, setGate] = useState<GateState>('checking');
  const [stageComplete, setStageComplete] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);

  const fromStripe = searchParams?.get('source') === 'stripe';

  useEffect(() => {
    let cancelled = false;
    async function check() {
      if (auth.isLoading) return;
      if (!auth.isAuthenticated) {
        if (!cancelled) setGate('unauthenticated');
        router.replace('/vendor-login?redirect=/onboarding/firm-facts');
        return;
      }
      const token = getCurrentToken();
      if (!token) {
        if (!cancelled) setGate('unauthenticated');
        router.replace('/vendor-login?redirect=/onboarding/firm-facts');
        return;
      }
      try {
        const res = await fetch(`${API_URL}/api/vendors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const tier = (data.vendor?.tier || data.tier || 'free') as string;
          if (tier === 'free') {
            if (!cancelled) setGate('free-tier');
            router.replace('/vendor-dashboard?error=pro-required');
            return;
          }
        }
      } catch (err) {
        console.error('Failed to verify tier:', err);
      }
      if (!cancelled) setGate('allowed');
    }
    check();
    return () => {
      cancelled = true;
    };
  }, [auth.isAuthenticated, auth.isLoading, getCurrentToken, router]);

  const handleStageComplete = useCallback(() => {
    setStageComplete(true);
  }, []);

  const handleContinueToStage2 = useCallback(() => {
    setComingSoon(true);
    window.setTimeout(() => setComingSoon(false), 2500);
  }, []);

  if (gate !== 'allowed') {
    return (
      <div className="text-sm text-gray-600">Checking your account…</div>
    );
  }

  return (
    <OnboardingBody
      fromStripe={fromStripe}
      stageComplete={stageComplete}
      comingSoon={comingSoon}
      onStageComplete={handleStageComplete}
      onContinueToStage2={handleContinueToStage2}
    />
  );
}

interface OnboardingBodyProps {
  fromStripe: boolean;
  stageComplete: boolean;
  comingSoon: boolean;
  onStageComplete: () => void;
  onContinueToStage2: () => void;
}

function OnboardingBody({
  fromStripe,
  stageComplete,
  comingSoon,
  onStageComplete,
  onContinueToStage2,
}: OnboardingBodyProps) {
  const {
    firmFacts,
    completion,
    loading,
    error,
    saveStates,
    updateField,
  } = useFirmFacts();

  return (
    <div className="space-y-8">
      {fromStripe && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          Welcome to TendorAI Pro! Let&apos;s get your firm set up.
        </div>
      )}

      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Your firm facts</h1>
        <p className="text-sm text-gray-600">
          Eight quick fields so our agents can write content that uses your real
          numbers, not generic placeholders.
        </p>
      </header>

      <ProgressBar
        percentage={completion.percentage}
        stage1Complete={completion.stage1Complete}
      />

      <Stage1Form
        firmFacts={firmFacts}
        loading={loading}
        error={error}
        saveStates={saveStates}
        backendStage1Complete={completion.stage1Complete}
        updateField={updateField}
        onStageComplete={onStageComplete}
      />

      {stageComplete && (
        <div className="space-y-3 rounded-md border border-green-200 bg-green-50 p-5">
          <p className="text-sm font-medium text-green-900">
            Stage 1 complete — your articles will now use your real numbers.
          </p>
          <p className="text-sm text-green-800">
            Stage 2 adds operational and brand identity facts so AI assistants
            can recommend your firm with confidence.
          </p>
          <button
            type="button"
            onClick={onContinueToStage2}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Continue to Stage 2
          </button>
          {comingSoon && (
            <p role="status" className="text-sm text-blue-900">
              Stage 2 is coming soon — we&apos;ll let you know.
            </p>
          )}
        </div>
      )}

      <footer className="border-t border-gray-200 pt-6 text-sm text-gray-500">
        <Link
          href="/vendor-dashboard"
          className="text-blue-600 hover:underline"
        >
          ← Back to dashboard
        </Link>
      </footer>
    </div>
  );
}

export default function FirmFactsOnboardingPage() {
  return (
    <Suspense
      fallback={<div className="text-sm text-gray-600">Loading…</div>}
    >
      <FirmFactsOnboarding />
    </Suspense>
  );
}
