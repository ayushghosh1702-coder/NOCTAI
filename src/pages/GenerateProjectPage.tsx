import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { aiService } from '../services/aiService';
import { Project, ExperienceLevel } from '../types';
import { ProjectCard } from '../components/projects/ProjectCard';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Cpu,
  Clock,
  Users,
  IndianRupee,
  Briefcase,
  Layers,
  ArrowRight,
  CheckCircle2,
  Check,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  RefreshCw,
  FolderGit2
} from 'lucide-react';

export const GenerateProjectPage: React.FC = () => {
  const { user, projects, activeProjectId, setActiveProjectId, savedProjectIds, toggleSaveProject, addToast } =
    useApp();
  const navigate = useNavigate();

  // Form State initialized from user profile
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    user?.skills || ['Python', 'FastAPI', 'React', 'PostgreSQL', 'NLP']
  );
  const [skillInput, setSkillInput] = useState('');
  const [domain, setDomain] = useState(user?.preferredDomain || 'AI/ML');
  const [experience, setExperience] = useState<ExperienceLevel>(
    user?.experienceLevel || 'Intermediate'
  );
  const [timeWeeks, setTimeWeeks] = useState<number>(user?.availableTimeWeeks || 8);
  const [teamSize, setTeamSize] = useState<number>(user?.teamSize || 3);
  const [budget, setBudget] = useState<string>(user?.budget || '₹3,000');
  const [careerGoal, setCareerGoal] = useState<string>(
    user?.careerGoal || 'AI/ML Engineer at a high-growth tech company'
  );

  // Generation loading states
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [generatedResults, setGeneratedResults] = useState<Project[] | null>(null);

  const loadingMessages = [
    'Analyzing your programming skills and coursework...',
    'Evaluating project feasibility and semester time constraints...',
    'Generating industry-grade project architectures...',
    'Calibrating match scores and career relevance...'
  ];

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const availableSkillSuggestions = [
    'Python', 'React', 'Java', 'Node.js', 'FastAPI', 'PostgreSQL', 'Docker',
    'NLP', 'Computer Vision', 'PyTorch', 'TypeScript', 'Tailwind CSS', 'AWS',
    'Solidity', 'Go', 'Flutter', 'MongoDB', 'Redis'
  ];

  const domains = [
    'AI/ML', 'Cybersecurity', 'Healthcare', 'FinTech', 'Web Development',
    'Mobile Apps', 'Blockchain', 'IoT', 'Agriculture', 'Autonomous Systems'
  ];

  const careerGoals = [
    'Software Engineer', 'Data Scientist', 'ML Engineer', 'Full Stack Developer',
    'DevOps Engineer', 'Cybersecurity Analyst', 'Cloud Solutions Architect'
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      setSelectedSkills([...selectedSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedResults(null);

    try {
      const results = await aiService.generateProjectRecommendations({
        skills: selectedSkills,
        domain,
        experienceLevel: experience,
        availableTimeWeeks: timeWeeks,
        teamSize,
        budget,
        careerGoal
      });

      setGeneratedResults(results);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      addToast('Generated 3 curated project recommendations!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to complete AI synthesis. Please retry.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Project Recommendation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Generate Your Final-Year Project
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Tell us your technical preferences, constraints, and target career goals. Our AI will synthesize evaluation-ready project blueprints with full feasibility analyses.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm">
        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Skills Multi-select / Tags */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>Known Skills & Technologies (Select or add)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {selectedSkills.length} skills selected
              </span>
            </div>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap gap-1.5">
              {availableSkillSuggestions.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input */}
            <div className="flex gap-2 max-w-md pt-1">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSkill(e))}
                placeholder="Type other skill (e.g. OpenCV, GraphQL) and press Enter"
                className="flex-1 text-xs rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Add
              </button>
            </div>
          </div>

          {/* Domain & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Preferred Domain
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as ExperienceLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperience(lvl)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                      experience === lvl
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time, Team Size, Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Available Development Time</span>
              </label>
              <select
                value={timeWeeks}
                onChange={(e) => setTimeWeeks(Number(e.target.value))}
                className="w-full text-xs rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value={4}>4 Weeks (Rapid Prototype)</option>
                <option value={8}>8 Weeks (Standard Term)</option>
                <option value={12}>12 Weeks (Full Semester)</option>
                <option value={16}>16 Weeks (Multi-Phase Project)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Team Size</span>
              </label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full text-xs rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value={1}>1 Student (Solo)</option>
                <option value={2}>2 Students (Pair)</option>
                <option value={3}>3 Students (Standard Team)</option>
                <option value={4}>4 Students (Full Squad)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-indigo-600" />
                <span>Approximate Budget</span>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="₹0 (Free tier only)">Free ($0) / Zero Budget</option>
                <option value="Under ₹1,500">Under ₹1,500 (Basic APIs)</option>
                <option value="₹3,000">₹3,000 (Standard Cloud / GPU)</option>
                <option value="Flexible (₹5,000+)">Flexible ($100+ / Hardware)</option>
              </select>
            </div>
          </div>

          {/* Primary Career Goal */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Primary Career Goal</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {careerGoals.map((cg) => (
                <button
                  key={cg}
                  type="button"
                  onClick={() => setCareerGoal(cg)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                    careerGoal.includes(cg)
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {cg}
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isGenerating || selectedSkills.length === 0}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Project Recommendations</span>
            </button>
          </div>
        </form>
      </div>

      {/* AI Loading State Animation */}
      {isGenerating && (
        <div className="rounded-3xl bg-white p-10 sm:p-14 border border-indigo-200 shadow-xl text-center space-y-6 animate-in fade-in">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg font-extrabold text-slate-900">
              Synthesizing Optimal Project Architecture
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 transition-all duration-300">
              {loadingMessages[loadingTextIndex]}
            </p>
          </div>

          <div className="max-w-xs mx-auto flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}

      {/* Results Section */}
      {generatedResults && !isGenerating && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                AI Synthesis Complete
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Top 3 Curated Project Recommendations
              </h2>
            </div>
            <button
              onClick={() => setGeneratedResults(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Modify Parameters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {generatedResults.map((project, index) => {
              const isSaved = savedProjectIds.includes(project.id);
              const isActive = activeProjectId === project.id;

              return (
                <div
                  key={project.id}
                  className={`rounded-3xl bg-white p-6 border flex flex-col justify-between transition-all relative ${
                    index === 0
                      ? 'border-indigo-300 ring-2 ring-indigo-500/20 shadow-lg'
                      : 'border-slate-200 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badge header */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-lg border ${
                          project.matchScore >= 90
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        {project.matchScore}% Match
                      </span>

                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {project.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Meta stats */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 py-2 border-y border-slate-100">
                      <div>
                        <span>Duration: </span>
                        <strong className="text-slate-800 font-bold">{project.duration}</strong>
                      </div>
                      <div>
                        <span>Budget: </span>
                        <strong className="text-slate-800 font-bold">{project.budget}</strong>
                      </div>
                    </div>

                    {/* Why this fits you box */}
                    <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                        Why this fits your profile:
                      </p>
                      <p className="text-xs text-indigo-900 leading-snug">
                        {project.whyFitsYou}
                      </p>
                    </div>

                    {/* Career relevance */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Career Relevance:
                      </p>
                      <p className="text-xs text-slate-700 font-medium">
                        {project.careerRelevance}
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Recommended Technologies:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveProjectId(project.id);
                          navigate(`/projects/${project.id}`);
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => toggleSaveProject(project.id)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isSaved
                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                        title={isSaved ? 'Saved' : 'Save for later'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Set as Active Button */}
                    <button
                      onClick={() => {
                        setActiveProjectId(project.id);
                        addToast(`Set "${project.title}" as active workspace!`, 'success');
                      }}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 cursor-default'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isActive ? '✓ Active Workspace Project' : 'Select as Active Workspace'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
