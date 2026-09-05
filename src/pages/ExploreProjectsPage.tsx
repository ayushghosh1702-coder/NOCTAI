import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Search, Filter, Compass, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ExploreProjectsPage: React.FC = () => {
  const { projects } = useApp();
  const [searchParams] = useSearchParams();
  const initialDomain = searchParams.get('domain') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');

  const domains = [
    'all',
    'AI/ML',
    'Cybersecurity',
    'Healthcare',
    'FinTech',
    'Blockchain',
    'Agriculture',
    'IoT',
    'Cloud Computing'
  ];

  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const durations = ['all', '4 weeks', '8 weeks', '12 weeks', '16 weeks'];
  const popularTechs = ['all', 'Python', 'React', 'FastAPI', 'PostgreSQL', 'NLP', 'PyTorch', 'Docker', 'TypeScript'];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Keyword query match
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query)) ||
        project.domain.toLowerCase().includes(query);

      // Domain filter
      const matchesDomain =
        selectedDomain === 'all' ||
        project.domain.toLowerCase().includes(selectedDomain.toLowerCase());

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;

      // Duration filter
      const matchesDuration =
        selectedDuration === 'all' || project.duration === selectedDuration;

      // Tech filter
      const matchesTech =
        selectedTech === 'all' ||
        project.technologies.some(
          (t) => t.toLowerCase() === selectedTech.toLowerCase()
        );

      return (
        matchesQuery &&
        matchesDomain &&
        matchesDifficulty &&
        matchesDuration &&
        matchesTech
      );
    });
  }, [
    projects,
    searchQuery,
    selectedDomain,
    selectedDifficulty,
    selectedDuration,
    selectedTech
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('all');
    setSelectedDifficulty('all');
    setSelectedDuration('all');
    setSelectedTech('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Academic Project Library</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Explore Projects
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Browse vetted final-year capstone ideas across cutting-edge technology domains with complete architectural specs and evaluation rubrics.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by keyword, technology (e.g. FastAPI, NLP, OpenCV), or domain..."
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Domain
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500"
            >
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d === 'all' ? 'All Domains' : d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Difficulties' : diff}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500"
            >
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur === 'all' ? 'Any Duration' : dur}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Technology
            </label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-slate-50 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500"
            >
              {popularTechs.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Technologies' : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Stats & Reset */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong> verified projects
          </span>
          {(searchQuery || selectedDomain !== 'all' || selectedDifficulty !== 'all' || selectedDuration !== 'all' || selectedTech !== 'all') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-12 text-center border border-slate-200 shadow-xs space-y-3">
          <p className="text-base font-bold text-slate-800">No projects found matching your criteria</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your keyword search or clearing some of the filters to view other projects.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
