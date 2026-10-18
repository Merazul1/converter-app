import React from 'react';

interface AdPlaceholderProps {
  format?: 'leaderboard' | 'rectangle';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'leaderboard',
  className = ''
}) => {
  if (format === 'leaderboard') {
    return (
      <aside
        aria-label="Advertisement"
        className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-2xl bg-slate-100/80 border border-dashed border-slate-300 text-center flex flex-col items-center justify-center min-h-[90px] ${className}`}
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
          Advertisement / Sponsor Space (728x90 Leaderboard)
        </span>
        <p className="text-xs text-slate-500">
          Place your Google AdSense or Mediavine ad unit script here.
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full max-w-md mx-auto my-6 p-6 rounded-2xl bg-slate-100/80 border border-dashed border-slate-300 text-center flex flex-col items-center justify-center min-h-[250px] ${className}`}
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
        Advertisement Slot (300x250 Medium Rectangle)
      </span>
      <p className="text-xs text-slate-500">
        High-performing in-content ad placement for monetization.
      </p>
    </aside>
  );
};
