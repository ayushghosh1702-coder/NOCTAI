import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FeasibilityGauge } from '../components/projects/FeasibilityGauge';
import { ArchitectureDiagram } from '../components/projects/ArchitectureDiagram';
import {
  Sparkles,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Clock,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Cpu,
  MapPin,
  Bot,
  Layers,
  TrendingUp,
  FileText,
  Mic,
  Star,
  ExternalLink,
  Target,
  Briefcase
} from 'lucide-react';
import { ProjectFeature } from '../types';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, activeProjectId, setActiveProjectId, savedProjectIds, toggleSaveProject, addToast } =
    useApp();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id) || projects[0];
  const isSaved = savedProjectIds.includes(project.id);
  const isActive = activeProjectId === project.id;

  const [activeFeatureTab, setActiveFeatureTab] = useState<'all' | 'mvp' | 'advanced' | 'industry'>('all');

  const featureTabs = [
    { id: 'all', label: 'All Features' },
    { id: 'mvp', label: 'MVP (Submission Prerequisite)' },
    { id: 'advanced', label: 'Advanced (Higher Marks)' },
    { id: 'industry', label: 'Industry Grade (Placement Prep)' }
  ];

  const filteredFeatures =
    activeFeatureTab === 'all'
      ? project.features
      : project.features.filter((f) => f.tier === activeFeatureTab);

  const handleStartBuilding = () => {
    setActiveProjectId(project.id);
    addToast(`Set "${project.title}" as active workspace project!`, 'success');
    navigate(`/projects/${project.id}/roadmap`);
  };

  return (
    <div className="space-y-8">
      {/* Project Hero Header */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.matchScore}% Match Fit</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                {project.difficulty}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {project.domain}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm font-medium text-slate-600 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <button
              onClick={handleStartBuilding}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Start Building with Roadmap</span>
            </button>

            <button
              onClick={() => toggleSaveProject(project.id)}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                isSaved
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
                  <span>Saved in My Projects</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save for Later</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Meta Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Development Time</p>
            <p className="font-bold text-slate-900 mt-0.5">{project.duration}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Est. Budget</p>
            <p className="font-bold text-slate-900 mt-0.5">{project.budget}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Team Size</p>
            <p className="font-bold text-slate-900 mt-0.5">1-4 Students</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Workspace Status</p>
            <p className="font-bold text-indigo-600 mt-0.5">
              {isActive ? '● Currently Active' : 'Available'}
            </p>
          </div>
        </div>

        {/* Workspace Quick Links */}
        <div className="pt-2 flex flex-wrap gap-2">
          <Link
            to={`/projects/${project.id}/roadmap`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>Roadmap</span>
          </Link>
          <Link
            to={`/projects/${project.id}/mentor`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Mentor</span>
          </Link>
          <Link
            to={`/projects/${project.id}/improvements`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>Improvements</span>
          </Link>
          <Link
            to={`/projects/${project.id}/documentation`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Documentation</span>
          </Link>
          <Link
            to={`/projects/${project.id}/viva`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Mic className="w-3.5 h-3.5 text-purple-600" />
            <span>Viva Preparation</span>
          </Link>
        </div>
      </div>

      {/* Problem Statement & Real-world Application */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Target className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Problem Statement (College Evaluation Standard)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Briefcase className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Real-World Industry Application
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {project.realWorldApplication}
          </p>
        </div>
      </div>

      {/* Feasibility Breakdown */}
      <div>
        <FeasibilityGauge feasibility={project.feasibility} />
      </div>

      {/* Categorized Feature Suggestions */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Feature Specification & Milestone Tiers
            </h3>
            <p className="text-xs text-slate-500">
              Categorized according to academic submission benchmarks and evaluation committees.
            </p>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFeatureTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors border ${
                  activeFeatureTab === tab.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredFeatures.map((feat) => {
            const getTierBadge = (t: ProjectFeature['tier']) => {
              switch (t) {
                case 'mvp':
                  return 'bg-blue-50 text-blue-700 border-blue-200';
                case 'advanced':
                  return 'bg-purple-50 text-purple-700 border-purple-200';
                case 'innovative':
                case 'industry':
                  return 'bg-emerald-50 text-emerald-700 border-emerald-200';
                default:
                  return 'bg-slate-50 text-slate-700 border-slate-200';
              }
            };

            return (
              <div
                key={feat.id}
                className="rounded-2xl bg-white p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${getTierBadge(feat.tier)}`}>
                      {feat.tier.toUpperCase()} TIER
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Phase {feat.phase}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Included in Default Roadmap</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Recommendations Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Technology Stack Justification & Architecture Tradeoffs
          </h3>
          <p className="text-xs text-slate-500">
            Examiners always ask "Why did you choose this technology over alternatives?". Here are your justified choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {project.techRecommendations.map((tech) => (
            <div
              key={tech.layer}
              className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  {tech.layer}
                </span>
                <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {tech.name}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Selection Justification:
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {tech.justification}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Alternatives Evaluated:
                </p>
                <p className="text-xs text-slate-600 font-mono">
                  {tech.alternativesConsidered.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Architecture Section */}
      <div>
        <ArchitectureDiagram
          architecture={project.systemArchitecture}
          projectTitle={project.title}
        />
      </div>

      {/* Bottom CTA to start working */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">Ready to turn this idea into reality?</h3>
          <p className="text-xs text-slate-300">
            Open the Development Roadmap to begin checking off milestone tasks with 24/7 AI mentor assistance.
          </p>
        </div>

        <button
          onClick={handleStartBuilding}
          className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <span>Open Interactive Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
