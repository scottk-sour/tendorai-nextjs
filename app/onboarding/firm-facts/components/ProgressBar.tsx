'use client';

interface ProgressBarProps {
  percentage: number;
  stage1Complete: boolean;
}

export function ProgressBar({ percentage, stage1Complete }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));
  return (
    <div className="space-y-2">
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute inset-y-0 left-0 bg-blue-600 transition-[width] duration-300"
          style={{ width: `${clamped}%` }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-900">
          {clamped}%
        </div>
      </div>
      <p className="text-sm text-gray-600">
        {stage1Complete
          ? 'Stage 1 complete ✓'
          : 'Stage 1: 5 minutes of essential setup'}
      </p>
    </div>
  );
}
