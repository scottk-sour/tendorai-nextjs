/**
 * ChartFrame — the shared border / padding / caption wrapper used by every
 * embedded report figure.
 *
 * Extracted from SolicitorsJuly2026Charts so server-rendered figures can
 * reuse it without pulling a client component into the tree. No 'use client'
 * directive: it renders on the server, and importing it from a client
 * component (as the July charts do) still works.
 *
 * `title` and `subtitle` are optional. Figures that bake their own heading
 * into the artwork — the inline SVGs in SolicitorsAugust2026Charts — pass
 * neither and get the frame with no figcaption. Passing both reproduces the
 * July markup byte-for-byte.
 */

import type { ReactNode } from 'react';

interface ChartFrameProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export default function ChartFrame({ title, subtitle, children }: ChartFrameProps) {
  return (
    <figure className="my-10 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
      {(title || subtitle) && (
        <figcaption className="mb-4">
          {title && <div className="text-base font-semibold text-gray-900">{title}</div>}
          {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
        </figcaption>
      )}
      {children}
    </figure>
  );
}
