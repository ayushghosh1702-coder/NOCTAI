import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  to = '/',
  showTagline = false
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-lg font-extrabold tracking-tight',
    lg: 'text-2xl font-extrabold tracking-tight'
  };

  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative shrink-0">
        <div className={`${iconSizes[size]} rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20`}>
          <GraduationCap className="w-5/9 h-5/9" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center border-2 border-white shadow-xs">
          <Sparkles className="w-2.5 h-2.5 fill-amber-950" />
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <span className={`text-slate-900 ${textSizes[size]}`}>
            ProjectMentor<span className="text-indigo-600 ml-0.5">AI</span>
          </span>
        </div>
        {showTagline && (
          <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
            From Skills to Project
          </p>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};
