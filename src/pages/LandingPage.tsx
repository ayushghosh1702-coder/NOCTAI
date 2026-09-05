import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { AnimatedBackground } from '../components/background/AnimatedBackground';
import { useApp } from '../context/AppContext';
import { useBackground } from '../context/BackgroundContext';
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Cpu,
  MapPin,
  Bot,
  Layers,
  Award,
  TrendingUp,
  FileCode,
  ShieldCheck,
  Zap,
  Users,
  BrainCircuit,
  ExternalLink
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { projects, setActiveProjectId, loginAsDemo } = useApp();
  const navigate = useNavigate();
  const { palette, atmosphere } = useBackground();
  const isDark = atmosphere === 'gothic-dark';

  const featuredProject =
    projects.find((p) => p.id === 'ai-resume-analyzer') || projects[0];

  const stats = [
    { value: '5,000+', label: 'Project Ideas', desc: 'Curated for university evaluation' },
    { value: '20+', label: 'Technology Domains', desc: 'AI/ML, Web3, Cloud, IoT, Systems' },
    { value: '100%', label: 'AI-Powered Guidance', desc: 'Step-by-step technical mentorship' },
    { value: '94%', label: 'Avg. Recommendation Fit', desc: 'Personalized to student skill sets' }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Tell Us About You',
      desc: 'Enter your skills, interests, experience, budget, and timeline in a guided questionnaire.'
    },
    {
      step: '02',
      title: 'AI Finds Your Best Projects',
      desc: 'Our AI analyzes your profile and recommends high-scoring, feasible capstone projects.'
    },
    {
      step: '03',
      title: 'Choose & Plan',
      desc: 'Get modern tech stacks, feature hierarchies, system architecture, and milestone roadmaps.'
    },
    {
      step: '04',
      title: 'Build With Your AI Mentor',
      desc: 'Get continuous 24/7 technical guidance, debugging tips, and viva defense coaching.'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'Smart Project Generation',
      desc: 'Personalized project ideas mathematically mapped to your programming skills and career ambitions.'
    },
    {
      icon: Award,
      title: 'Project Match Score',
      desc: 'Understand how suitable each project is for you with a granular multi-factor feasibility breakdown.'
    },
    {
      icon: Bot,
      title: 'AI Project Mentor',
      desc: 'Ask project-specific technical questions, inspect API code samples, and resolve blockers instantly.'
    },
    {
      icon: Cpu,
      title: 'Technology Recommendations',
      desc: 'Get industry-standard technology stacks with explicit justifications on why to pick each tool.'
    },
    {
      icon: MapPin,
      title: 'Development Roadmap',
      desc: 'Follow a phased step-by-step milestone plan from literature review through final deployment.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      desc: 'Track task completion percentages and milestones directly within your student dashboard.'
    },
    {
      icon: Zap,
      title: 'Project Improvements',
      desc: 'Discover innovative upgrades in security, performance, scalability, and UX to boost marks.'
    },
    {
      icon: BrainCircuit,
      title: 'Viva Preparation',
      desc: 'Prepare for tough external examiner inquiries with AI-scored answers and flashcard rubrics.'
    }
  ];

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500 relative selection:bg-rose-900 selection:text-white"
      style={{
        backgroundColor: isDark ? palette.darkCanvasBg : '#f8fafc',
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next-Gen Capstone Copilot for Final-Year Students</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Turn Your Skills Into Your{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                  Final-Year Project.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Discover personalized project ideas, build practical roadmaps, choose the right technologies, and get AI-powered guidance from idea to implementation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/generate"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 transition-all hover:shadow-indigo-500/35"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate My Project</span>
                </Link>

                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-200/90 shadow-2xs transition-colors"
                >
                  <Compass className="w-4 h-4 text-slate-500" />
                  <span>Explore Projects</span>
                </Link>

                <button
                  onClick={() => {
                    loginAsDemo();
                    navigate('/dashboard');
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-200 transition-colors"
                >
                  <span>Quick Demo Login</span>
                </button>
              </div>

              {/* Mini Social Proof */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200/70 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SRS & Documentation Included</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Viva Voce Defense Prep</span>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Product Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-200/90 ring-1 ring-slate-900/5">
                {/* Mockup Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      Project Blueprint • AI Recommendation
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    94% Match Fit
                  </span>
                </div>

                {/* Featured Project Showcase Card */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 border border-indigo-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                        Top Ranked Recommendation
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                        8 Weeks • ₹3,000
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {featuredProject.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {featuredProject.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {['Python', 'FastAPI', 'React', 'PostgreSQL', 'NLP'].map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Feasibility Breakdown Preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <p className="text-xs font-extrabold text-slate-900">92%</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Skill Fit</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <p className="text-xs font-extrabold text-slate-900">85%</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Time Fit</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <p className="text-xs font-extrabold text-slate-900">95%</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Budget Fit</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <p className="text-xs font-extrabold text-slate-900">90%</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Tech Fit</p>
                    </div>
                  </div>

                  {/* CTA button inside mockup */}
                  <div className="pt-2">
                    <Link
                      to={`/projects/${featuredProject.id}`}
                      onClick={() => setActiveProjectId(featuredProject.id)}
                      className="w-full py-2.5 px-4 text-center text-xs font-bold rounded-xl bg-slate-900 hover:bg-indigo-600 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Inspect Complete Project Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="bg-white py-14 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-left space-y-1 hover:border-indigo-200 transition-colors"
              >
                <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {s.value}
                </p>
                <p className="text-sm font-bold text-slate-800">{s.label}</p>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From Skills to Project. In 4 Clear Steps.
            </h2>
            <p className="text-sm text-slate-600">
              A structured, academic pathway engineered to get final-year students off ground zero and ready for evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-3xl font-black text-indigo-600/30 block mb-3 font-mono">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
                  <span>Step {step.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything Needed for Final-Year Project Success
            </h2>
            <p className="text-sm text-slate-600">
              Comprehensive tools designed to satisfy college rubrics, internal review panels, and external project examiners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl bg-slate-50/60 p-6 border border-slate-200/80 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Project Example Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Sample Blueprint
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Examining a Recommended Project
            </h2>
            <p className="text-sm text-slate-600">
              Here is what a complete ProjectMentor AI recommendation looks like for an intermediate student targeting an AI/ML career.
            </p>
          </div>

          {/* Large Project Card */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Match Score: 94%
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Difficulty: Intermediate
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {featuredProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {featuredProject.description}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-300 shrink-0">
                <p>Duration: <strong className="text-white font-bold">8 weeks</strong></p>
                <p>Budget: <strong className="text-white font-bold">₹3,000</strong></p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Engineered Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'FastAPI', 'React', 'PostgreSQL', 'NLP'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-900">MVP Features</p>
                  <p className="text-xs text-slate-600 mt-1">
                    PDF parsing, skill entity extraction, ATS scoring engine.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-900">System Architecture</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Decoupled FastAPI backend, React SPA, and async NLP worker queue.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-900">Viva Defense</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Pre-generated answers for ASGI throughput, SpaCy models, and security.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Fully customizable roadmap & report generation available.
                </p>
                <Link
                  to={`/projects/${featuredProject.id}`}
                  onClick={() => setActiveProjectId(featuredProject.id)}
                  className="w-full sm:w-auto px-6 py-3 text-center text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Ready for Semester Evaluation?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Stop Guessing. Build a Project That Evaluators Respect.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Enter your skills and timeline, discover your personalized project blueprint, and defend your work with confidence.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/generate"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all"
            >
              Generate My Project Now
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              Explore All Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Background Animated Visuals Engine */}
      <AnimatedBackground />
    </div>
  );
};
