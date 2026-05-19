'use client';

import type { LoopCardProps } from './types';
import { formatLongDate } from './types';
import MeasureCard from './MeasureCard';
import DiagnoseCard from './DiagnoseCard';
import FixCard from './FixCard';
import DeployCard from './DeployCard';
import TrackCard from './TrackCard';

function RightArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center text-gray-300 px-1" aria-hidden>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
      </svg>
    </div>
  );
}

function DownArrow() {
  return (
    <div className="lg:hidden flex items-center justify-center text-gray-300 py-1" aria-hidden>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m14-7l-7 7-7-7" />
      </svg>
    </div>
  );
}

export default function Loop(props: LoopCardProps) {
  const cardProps = props;
  const isHistorical = props.mode === 'historical';
  const weekStartingIso =
    props.weekStarting instanceof Date
      ? props.weekStarting.toISOString().slice(0, 10)
      : String(props.weekStarting);
  const markerCopy = isHistorical
    ? `This loop ran the week of ${formatLongDate(weekStartingIso)}`
    : 'Continues every Monday';

  return (
    <div>
      {/* Desktop: Row 1 — Measure, Diagnose, Fix */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-3 lg:items-stretch">
        <MeasureCard {...cardProps} />
        <RightArrow />
        <DiagnoseCard {...cardProps} />
        <RightArrow />
        <FixCard {...cardProps} />
      </div>

      {/* Desktop: Row 2 — Deploy, Track (centred under row 1) */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-3 lg:items-stretch lg:max-w-2xl lg:mx-auto lg:mt-4">
        <DeployCard {...cardProps} />
        <RightArrow />
        <TrackCard {...cardProps} />
      </div>

      {/* Desktop: loop-back indicator */}
      <div className="hidden lg:flex items-center mt-6" aria-hidden>
        <div className="flex-1 border-t-2 border-dashed border-gray-300" />
        <span className="px-3 text-xs text-gray-500 font-medium flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {markerCopy}
        </span>
        <div className="flex-1 border-t-2 border-dashed border-gray-300" />
      </div>

      {/* Mobile: vertical stack with down arrows; each card gets a 4px purple left border */}
      <div className="lg:hidden flex flex-col gap-2">
        <div className="border-l-4 border-purple-600 rounded-l-xl">
          <MeasureCard {...cardProps} />
        </div>
        <DownArrow />
        <div className="border-l-4 border-purple-600 rounded-l-xl">
          <DiagnoseCard {...cardProps} />
        </div>
        <DownArrow />
        <div className="border-l-4 border-purple-600 rounded-l-xl">
          <FixCard {...cardProps} />
        </div>
        <DownArrow />
        <div className="border-l-4 border-purple-600 rounded-l-xl">
          <DeployCard {...cardProps} />
        </div>
        <DownArrow />
        <div className="border-l-4 border-purple-600 rounded-l-xl">
          <TrackCard {...cardProps} />
        </div>

        {/* Mobile loop-back marker */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2" aria-hidden>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {markerCopy}
        </div>
      </div>
    </div>
  );
}
