'use client';

import type { SaveState } from '../../types';
import { FieldSaveIndicator } from './FieldSaveIndicator';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownFieldProps {
  id: string;
  label: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: DropdownOption[];
  required?: boolean;
  saveState?: SaveState;
  placeholder?: string;
}

export function DropdownField({
  id,
  label,
  helperText,
  value,
  onChange,
  onBlur,
  options,
  required,
  saveState,
  placeholder = 'Select…',
}: DropdownFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
          saveState === 'error' ? 'border-red-500' : ''
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <FieldSaveIndicator state={saveState} />
    </div>
  );
}
