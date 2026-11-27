import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  slot?: string; // ad unit ID from AdSense
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slot = '4589217032',
  format = 'auto',
  className = '',
}) => {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blocker or script not loaded; silent fallback
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full max-w-4xl mx-auto my-6 min-h-[90px] flex items-center justify-center overflow-hidden ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', width: '100%' }}
        data-ad-client="ca-pub-3890743631653804"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
};
