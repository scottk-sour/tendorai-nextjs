'use client';

import type { SaveState } from '../../types';
import { FieldSaveIndicator } from './FieldSaveIndicator';

interface NumericFieldProps {
  id: string;
  label: string;
  helperText?: string;
  value: number | undefined;
  onChange: (value: number) => void;
  onBlur?: () => void;
  required?: boolean;
  saveState?: SaveState;
  min?: number;
  max?: number;
  placeholder?: string;
}

export function NumericField({
  id,
  label,
  helperText,
  value,
  onChange,
  onBlur,
  required,
  saveState,
  min = 0,
  max,
  placeholder,
}: NumericFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value === undefined || value === 0 ? '' : value}
        onChange={(e) => {
          const next = e.target.value === '' ? 0 : Number(e.target.value);
          onChange(Number.isNaN(next) ? 0 : next);
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
          saveState === 'error' ? 'border-red-500' : ''
        }`}
      />
      <FieldSaveIndicator state={saveState} />
    </div>
  );
}
