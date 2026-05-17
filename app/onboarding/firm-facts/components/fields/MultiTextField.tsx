'use client';

import { useEffect, useState } from 'react';
import type { SaveState } from '../../types';
import { FieldSaveIndicator } from './FieldSaveIndicator';

interface MultiTextFieldProps {
  id: string;
  label: string;
  helperText?: string;
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
  saveState?: SaveState;
  count?: number;
}

// Pad or trim an array to exactly `count` entries.
function toFixedLength(value: string[], count: number): string[] {
  return Array.from({ length: count }, (_, i) => value[i] ?? '');
}

export function MultiTextField({
  id,
  label,
  helperText,
  value,
  onChange,
  required,
  saveState,
  count = 5,
}: MultiTextFieldProps) {
  const [items, setItems] = useState<string[]>(() =>
    toFixedLength(value, count),
  );

  // Re-sync from the source array when it changes externally.
  const joined = value.join('');
  useEffect(() => {
    setItems(toFixedLength(value, count));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined, count]);

  const handleInput = (index: number, next: string) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = next;
      return updated;
    });
  };

  return (
    <div className="space-y-1">
      <span className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </span>
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      <div className="space-y-2">
        {items.map((item, index) => (
          <input
            key={index}
            id={index === 0 ? id : `${id}-${index}`}
            type="text"
            value={item}
            placeholder={`Selling point ${index + 1}`}
            onChange={(e) => handleInput(index, e.target.value)}
            onBlur={() => onChange(toFixedLength(items, count))}
            className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
              saveState === 'error' ? 'border-red-500' : ''
            }`}
          />
        ))}
      </div>
      <FieldSaveIndicator state={saveState} />
    </div>
  );
}
