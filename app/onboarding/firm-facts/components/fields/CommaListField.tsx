'use client';

import { useEffect, useState } from 'react';
import type { SaveState } from '../../types';
import { FieldSaveIndicator } from './FieldSaveIndicator';

interface CommaListFieldProps {
  id: string;
  label: string;
  helperText?: string;
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
  saveState?: SaveState;
  placeholder?: string;
}

function parseList(text: string): string[] {
  return text
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

export function CommaListField({
  id,
  label,
  helperText,
  value,
  onChange,
  required,
  saveState,
  placeholder,
}: CommaListFieldProps) {
  // Local buffer so typing (including stray commas/spaces) is not clobbered;
  // the parsed array is only emitted on blur.
  const joined = value.join(', ');
  const [text, setText] = useState(joined);

  useEffect(() => {
    setText(joined);
  }, [joined]);

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
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => onChange(parseList(text))}
        placeholder={placeholder}
        className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
          saveState === 'error' ? 'border-red-500' : ''
        }`}
      />
      <FieldSaveIndicator state={saveState} />
    </div>
  );
}
