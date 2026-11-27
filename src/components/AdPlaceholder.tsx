import React from 'react';
import { AdUnit } from './AdUnit';

interface AdPlaceholderProps {
  format?: 'leaderboard' | 'rectangle';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'leaderboard',
  className = ''
}) => {
  return (
    <AdUnit
      format={format === 'rectangle' ? 'rectangle' : 'horizontal'}
      className={className}
    />
  );
};
