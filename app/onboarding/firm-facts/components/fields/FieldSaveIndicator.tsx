'use client';

import type { SaveState } from '../../types';

export function FieldSaveIndicator({ state }: { state?: SaveState }) {
  if (!state || state === 'idle') {
    return <p className="text-xs text-transparent select-none">&nbsp;</p>;
  }
  if (state === 'saving') {
    return <p className="text-xs text-gray-500">Saving…</p>;
  }
  if (state === 'saved') {
    return <p className="text-xs text-green-600">Saved ✓</p>;
  }
  return <p className="text-xs text-red-600">Error — retry</p>;
}
