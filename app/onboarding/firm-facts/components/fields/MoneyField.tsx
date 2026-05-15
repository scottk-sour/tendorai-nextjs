'use client';

import type { SaveState } from '../../types';
import { FieldSaveIndicator } from './FieldSaveIndicator';

interface MoneyFieldProps {
  id: string;
  label: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  saveState?: SaveState;
  placeholder?: string;
}

// Pattern hint for fee ranges like "£850–£1,500" or "£850-£1500".
const RANGE_HINT = '£min–£max (e.g. £850–£1,500)';

export function MoneyField({
  id,
  label,
  helperText,
  value,
  onChange,
  onBlur,
  required,
  saveState,
  placeholder = '£850–£1,500',
}: MoneyFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      <input
        id={id}
        type="text"
        inputMode="text"
        pattern="£?\d[\d,]*\s*[–-]\s*£?\d[\d,]*"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
          saveState === 'error' ? 'border-red-500' : ''
        }`}
        aria-describedby={`${id}-hint`}
      />
      <p id={`${id}-hint`} className="text-xs text-gray-400">
        Format: {RANGE_HINT}
      </p>
      <FieldSaveIndicator state={saveState} />
    </div>
  );
}
