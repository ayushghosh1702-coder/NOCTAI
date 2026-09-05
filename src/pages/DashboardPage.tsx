import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useBackground } from '../context/BackgroundContext';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ProjectCard } from '../components/projects/ProjectCard';
import engineeringLabBanner from '../assets/images/engineering_lab_banner_1788586156748.jpg';
import kuchuPuchuAvatar from '../assets/images/kuchu_puchu_avatar_1788586131006.jpg';
import {
  Sparkles,
  Bot,
  MapPin,
  Mic,
  ArrowRight,
  TrendingUp,
  FolderGit2,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  Award
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, activeProject, projects, setActiveProjectId } = useApp();
  const navigate = useNavigate();
  const { palette, atmosphere } = useBackground();
  const isDark = atmosphere === 'gothic-dark';

  // Calculate task counts for active project
  let totalTasks = 0;
  let completedTasks = 0;
  activeProject.roadmap.forEach((ph) => {
    ph.tasks.forEach((t) => {
      totalTasks++;
      if (t.status === 'completed') completedTasks++;
    });
  });

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : activeProject.progress || 68;

  // Recommended other projects
  const recommendations = projects.filter((p) => p.id !== activeProject.id).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Student Welcome Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b transition-colors"
        style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(226, 232, 240, 0.8)' }}
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Welcome back, {user?.name?.split(' ')[0] || 'Ayush'} 👋
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            {user?.branch || 'Computer Science & Engineering'} • Final Year •{' '}
            <span
              className="font-bold"
              style={{ color: isDark ? palette.secondary : palette.primary }}
            >
              {user?.college || 'PARUL UNIVERSITY'}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/generate"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate New Project</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-2xs transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Browse Library</span>
          </Link>
        </div>
      </div>

      {/* Active Project Hero Banner with Photorealistic Background */}
      <div className="rounded-3xl relative text-white p-6 sm:p-8 shadow-xl border border-slate-800 overflow-hidden">
        {/* Photorealistic Engineering Lab Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeProject.imageUrl || engineeringLabBanner}
            alt="Engineering Lab"
            className="w-full h-full object-cover object-center scale-105 filter brightness-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-indigo-950/75" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1.5 backdrop-blur-xs">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-300" />
                Active Capstone Project
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 backdrop-blur-xs">
                {activeProject.matchScore}% Match
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-xs">
              {activeProject.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              {activeProject.description}
            </p>

            {/* Next Milestone Box */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/15 max-w-xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  <strong className="text-indigo-200 font-bold">Next Milestone:</strong>{' '}
                  <span className="text-slate-200">{activeProject.nextMilestone || 'Connect AI model to FastAPI backend'}</span>
                </span>
              </div>
              <Link
                to={`/projects/${activeProject.id}/roadmap`}
                className="text-xs font-bold text-indigo-300 hover:text-white shrink-0"
              >
                Go to Task →
              </Link>
            </div>
          </div>

          {/* Right Progress Gauges */}
          <div className="lg:col-span-5 bg-slate-900/70 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Sprint Progress
                </p>
                <p className="text-3xl font-black text-white mt-0.5">
                  {progress}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Tasks Finished
                </p>
                <p className="text-xl font-bold text-emerald-400 mt-0.5">
                  {completedTasks} / {totalTasks || 18}
                </p>
              </div>
            </div>

            <ProgressBar progress={progress} size="md" color="indigo" />

            <div className="pt-2 flex items-center justify-between gap-2">
              <Link
                to={`/projects/${activeProject.id}`}
                className="flex-1 py-2 px-3 text-center text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
              >
                Open Blueprint
              </Link>
              <Link
                to={`/projects/${activeProject.id}/mentor`}
                className="flex-1 py-2 px-3 text-center text-xs font-bold rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors border border-white/20"
              >
                Ask Kuchu Puchu
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Kuchu Puchu Dedicated AI Mentor Spotlight Card */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-5 border border-indigo-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative h-14 w-14 rounded-2xl overflow-hidden ring-2 ring-indigo-400 shadow-md shrink-0 bg-white">
            <img
              src={kuchuPuchuAvatar}
              alt="Kuchu Puchu AI Mentor"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Kuchu Puchu's Daily Capstone Advice</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white uppercase tracking-wider">
                AI Project Mentor
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
              "External examiners love seeing your <strong>System Architecture Diagram</strong> before lines of code. Make sure you can explain why data flows between each node!"
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <Link
            to={`/projects/${activeProject.id}/mentor`}
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Consult Kuchu Puchu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Capstone Quick Actions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/generate"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Generate Project
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Input new skills or explore alternate domain ideas.
              </p>
            </div>
          </Link>

          <Link
            to={`/projects/${activeProject.id}/mentor`}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-indigo-300 shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={kuchuPuchuAvatar}
                alt="Kuchu Puchu"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Kuchu Puchu Mentor
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Resolve coding errors, API design, & defense prep.
              </p>
            </div>
          </Link>

          <Link
            to={`/projects/${activeProject.id}/roadmap`}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                View Roadmap
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Check off sprints and monitor timeline completion.
              </p>
            </div>
          </Link>

          <Link
            to={`/projects/${activeProject.id}/viva`}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Prepare for Viva
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate examiner defense questions & scoring.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recommended Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Recommended for Your Profile
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              High-scoring alternatives aligned with your skill set ({user?.skills.slice(0, 3).join(', ')}).
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendations.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </div>
  );
};
