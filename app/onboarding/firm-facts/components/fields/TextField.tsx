'use client';

import type { SaveState } from '../../types';
import { FieldSaveIndicator } from './FieldSaveIndicator';

interface TextFieldProps {
  id: string;
  label: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  saveState?: SaveState;
  placeholder?: string;
  readOnly?: boolean;
}

export function TextField({
  id,
  label,
  helperText,
  value,
  onChange,
  onBlur,
  required,
  saveState,
  placeholder,
  readOnly,
}: TextFieldProps) {
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
          readOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
        } ${saveState === 'error' ? 'border-red-500' : ''}`}
      />
      <FieldSaveIndicator state={saveState} />
    </div>
  );
}
