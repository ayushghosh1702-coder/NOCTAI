import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { Bookmark, BookmarkCheck, Clock, IndianRupee, Sparkles, ArrowRight, Gauge } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  const { savedProjectIds, toggleSaveProject, setActiveProjectId } = useApp();
  const navigate = useNavigate();
  const isSaved = savedProjectIds.includes(project.id);

  const getMatchScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 80) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Intermediate':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-white transition-all duration-200 border overflow-hidden ${
        featured
          ? 'border-indigo-200 ring-2 ring-indigo-500/10 shadow-md hover:shadow-xl'
          : 'border-slate-200/90 hover:border-indigo-300/80 shadow-xs hover:shadow-md'
      }`}
    >
      <div>
        {/* Project Realistic Preview Image */}
        {project.imageUrl ? (
          <div className="relative h-44 w-full overflow-hidden bg-slate-100">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSaveProject(project.id);
                }}
                className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
                  isSaved
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/90 hover:bg-white text-slate-700 hover:scale-105'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save project'}
                aria-label="Save project"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 fill-white" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-xs ${
                project.difficulty === 'Beginner'
                  ? 'bg-teal-500/90 text-white'
                  : project.difficulty === 'Intermediate'
                  ? 'bg-indigo-600/90 text-white'
                  : 'bg-purple-600/90 text-white'
              }`}>
                {project.difficulty}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white/95 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
                {project.domain}
              </span>
              <span className="text-[11px] font-bold text-white px-2.5 py-1 rounded-lg bg-indigo-600/90 backdrop-blur-md border border-indigo-400/30 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {project.matchScore}% Match
              </span>
            </div>
          </div>
        ) : null}

        <div className="p-5 sm:p-6">
          {/* Fallback header if no image */}
          {!project.imageUrl && (
            <div className="flex items-center justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border ${getMatchScoreBadge(
                    project.matchScore
                  )}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{project.matchScore}% Match</span>
                </span>

                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getDifficultyBadge(project.difficulty)}`}>
                  {project.difficulty}
                </span>

                <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                  {project.domain}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSaveProject(project.id);
                }}
                className={`p-1.5 rounded-lg transition-colors border ${
                  isSaved
                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                    : 'bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save project'}
                aria-label="Save project"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          )}

          {/* Title & Tagline */}
          <div className="mb-3">
            <Link
              to={`/projects/${project.id}`}
              onClick={() => setActiveProjectId(project.id)}
              className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors inline-block line-clamp-1"
            >
              {project.title}
            </Link>
            <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metadata stats: Duration & Budget */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4 pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
              <span>Budget: {project.budget}</span>
            </div>
          </div>

          {/* Technologies Pills */}
          <div className="space-y-1.5 mb-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Key Technologies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                  +{project.technologies.length - 5} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA buttons */}
      <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
        <Link
          to={`/projects/${project.id}`}
          onClick={() => setActiveProjectId(project.id)}
          className="w-full py-2.5 px-3 text-center text-xs font-semibold rounded-xl bg-slate-900 hover:bg-indigo-600 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>View Project Blueprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
