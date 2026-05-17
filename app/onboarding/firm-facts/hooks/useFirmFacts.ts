'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import type {
  CompletionState,
  FirmFacts,
  FirmFactsField,
  SaveState,
} from '../types';

const API_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
  'https://ai-procurement-backend-q35u.onrender.com';

const DEBOUNCE_MS = 300;

const DEFAULT_COMPLETION: CompletionState = {
  percentage: 0,
  stage1Complete: false,
  stage2Complete: false,
  missingFields: [],
};

interface UseFirmFactsReturn {
  firmFacts: FirmFacts | null;
  completion: CompletionState;
  loading: boolean;
  error: string | null;
  saveStates: Partial<Record<FirmFactsField, SaveState>>;
  updateField: (fieldName: FirmFactsField, value: unknown) => void;
  refresh: () => Promise<void>;
}

export function useFirmFacts(): UseFirmFactsReturn {
  const { getCurrentToken } = useAuth();
  const [firmFacts, setFirmFacts] = useState<FirmFacts | null>(null);
  const [completion, setCompletion] = useState<CompletionState>(DEFAULT_COMPLETION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStates, setSaveStates] = useState<
    Partial<Record<FirmFactsField, SaveState>>
  >({});

  const debounceTimers = useRef<Partial<Record<FirmFactsField, NodeJS.Timeout>>>({});

  const fetchCompletion = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/firmfacts/me/completion`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCompletion({
          percentage: Number(data.percentage) || 0,
          stage1Complete: Boolean(data.stage1Complete),
          stage2Complete: Boolean(data.stage2Complete),
          missingFields: Array.isArray(data.missingFields)
            ? data.missingFields
            : [],
        });
      }
    } catch (err) {
      console.error('Failed to fetch completion:', err);
    }
  }, [getCurrentToken]);

  const refresh = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/firmfacts/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Failed to load firm facts (${res.status})`);
      }
      const data = await res.json();
      setFirmFacts((data.firmFacts || data) as FirmFacts);
      await fetchCompletion();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load firm facts');
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken, fetchCompletion]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const sendUpdate = useCallback(
    async (fieldName: FirmFactsField, value: unknown) => {
      const token = getCurrentToken();
      if (!token) {
        setSaveStates((s) => ({ ...s, [fieldName]: 'error' }));
        return;
      }
      setSaveStates((s) => ({ ...s, [fieldName]: 'saving' }));
      try {
        const res = await fetch(`${API_URL}/api/firmfacts/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fieldName,
            value,
            source: 'onboarding',
          }),
        });
        if (!res.ok) {
          throw new Error(`Save failed (${res.status})`);
        }
        setSaveStates((s) => ({ ...s, [fieldName]: 'saved' }));
        await fetchCompletion();
      } catch (err) {
        console.error('Failed to save field:', fieldName, err);
        setSaveStates((s) => ({ ...s, [fieldName]: 'error' }));
      }
    },
    [getCurrentToken, fetchCompletion],
  );

  const updateField = useCallback(
    (fieldName: FirmFactsField, value: unknown) => {
      setFirmFacts((prev) => ({ ...(prev || {}), [fieldName]: value }));
      const existing = debounceTimers.current[fieldName];
      if (existing) clearTimeout(existing);
      debounceTimers.current[fieldName] = setTimeout(() => {
        sendUpdate(fieldName, value);
      }, DEBOUNCE_MS);
    },
    [sendUpdate],
  );

  useEffect(() => {
    const timers = debounceTimers.current;
    return () => {
      Object.values(timers).forEach((t) => {
        if (t) clearTimeout(t);
      });
    };
  }, []);

  return {
    firmFacts,
    completion,
    loading,
    error,
    saveStates,
    updateField,
    refresh,
  };
}
