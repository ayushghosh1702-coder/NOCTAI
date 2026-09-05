import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  color?: 'indigo' | 'emerald' | 'blue' | 'amber';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  color = 'indigo',
  showLabel = false,
  className = ''
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5'
  };

  const colorGradients = {
    indigo: 'from-indigo-600 to-blue-500',
    emerald: 'from-emerald-500 to-teal-500',
    blue: 'from-blue-600 to-cyan-500',
    amber: 'from-amber-500 to-orange-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
          <span>Overall Progress</span>
          <span className="text-slate-900 font-bold">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`h-full bg-gradient-to-r ${colorGradients[color]} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
