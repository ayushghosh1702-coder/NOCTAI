import React from 'react';
import { FeasibilityBreakdown } from '../../types';
import { CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface FeasibilityGaugeProps {
  feasibility: FeasibilityBreakdown;
  className?: string;
}

export const FeasibilityGauge: React.FC<FeasibilityGaugeProps> = ({
  feasibility,
  className = ''
}) => {
  const metrics = [
    { label: 'Skill Fit', value: feasibility.skillFit, desc: 'Overlap with candidate programming background' },
    { label: 'Time Fit', value: feasibility.timeFit, desc: 'Completion within allotted academic semester weeks' },
    { label: 'Budget Fit', value: feasibility.budgetFit, desc: 'Free-tier and open-source tooling alignment' },
    { label: 'Team Fit', value: feasibility.teamFit, desc: 'Task allocation for specified student team size' },
    { label: 'Technology Fit', value: feasibility.technologyFit, desc: 'Ecosystem maturity and documentation depth' }
  ];

  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-emerald-600 bg-emerald-500';
    if (val >= 80) return 'text-indigo-600 bg-indigo-500';
    return 'text-amber-600 bg-amber-500';
  };

  return (
    <div className={`rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs ${className}`}>
      {/* Header: Score and Verdict */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              AI Feasibility Analysis
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Viable
            </span>
          </div>
          <p className="text-sm text-slate-600 max-w-xl">
            {feasibility.verdict}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200/80">
          <div className="text-right">
            <p className="text-3xl font-extrabold text-slate-900 leading-none">
              {feasibility.overall}%
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
              Feasible Score
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-lg shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((item) => (
          <div key={item.label} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">{item.label}</span>
              <span className="text-xs font-extrabold text-slate-900">{item.value}%</span>
            </div>
            
            <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${getScoreColor(item.value).split(' ')[1]}`}
                style={{ width: `${item.value}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-500 leading-tight">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Key Challenge Callout */}
      {feasibility.keyChallenge && (
        <div className="mt-5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-900">Key Engineering Challenge to Address</p>
            <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
              {feasibility.keyChallenge}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
