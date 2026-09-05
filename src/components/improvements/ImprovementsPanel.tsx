import React, { useState } from 'react';
import { Project, ProjectImprovement, ImprovementCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Zap,
  ShieldCheck,
  Smartphone,
  Server,
  Plus,
  Check,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ImprovementsPanelProps {
  project: Project;
}

export const ImprovementsPanel: React.FC<ImprovementsPanelProps> = ({ project }) => {
  const { addImprovementToRoadmap } = useApp();
  const [activeCategory, setActiveCategory] = useState<ImprovementCategory | 'all'>('all');

  const categories: { label: string; value: ImprovementCategory | 'all'; icon: React.ElementType }[] = [
    { label: 'All Improvements', value: 'all', icon: Sparkles },
    { label: 'Innovation', value: 'innovation', icon: TrendingUp },
    { label: 'Performance', value: 'performance', icon: Zap },
    { label: 'Security', value: 'security', icon: ShieldCheck },
    { label: 'UX', value: 'ux', icon: Smartphone },
    { label: 'Scalability', value: 'scalability', icon: Server }
  ];

  const getCategoryIcon = (category: ImprovementCategory) => {
    switch (category) {
      case 'innovation':
        return TrendingUp;
      case 'performance':
        return Zap;
      case 'security':
        return ShieldCheck;
      case 'ux':
        return Smartphone;
      case 'scalability':
        return Server;
      default:
        return Sparkles;
    }
  };

  const getImpactBadge = (impact: ProjectImprovement['impact']) => {
    switch (impact) {
      case 'High':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getDifficultyBadge = (diff: ProjectImprovement['difficulty']) => {
    switch (diff) {
      case 'Hard':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200';
    }
  };

  const filtered =
    activeCategory === 'all'
      ? project.improvements
      : project.improvements.filter((i) => i.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Architectural Enhancements
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              Scoring Boosters
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Make Your Project Better
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Upgrade your project from a standard college submission into a top-grade portfolio piece. Select enhancements to automatically schedule into your development roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 shrink-0">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>{project.improvements.length} Curated Upgrades Available</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => {
          const Icon = getCategoryIcon(item.category);

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-colors"
            >
              <div className="space-y-3">
                {/* Header & Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getImpactBadge(
                        item.impact
                      )}`}
                    >
                      Impact: {item.impact}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getDifficultyBadge(
                        item.difficulty
                      )}`}
                    >
                      {item.difficulty}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Technical Steps */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Implementation Plan
                  </p>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {item.technicalSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => addImprovementToRoadmap(project.id, item.id)}
                  disabled={item.addedToRoadmap}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    item.addedToRoadmap
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-2xs'
                  }`}
                >
                  {item.addedToRoadmap ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Added to Roadmap Tasks</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Roadmap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
