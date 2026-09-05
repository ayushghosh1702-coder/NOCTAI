import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Sparkles,
  Code2,
  Heart,
  Settings,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Check,
  Building,
  Users,
  Clock,
  IndianRupee,
  Briefcase
} from 'lucide-react';
import { ExperienceLevel } from '../types';

export const ProfileOnboardingPage: React.FC = () => {
  const { user, updateUserProfile, addToast } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Academic & Career
  const [college, setCollege] = useState(user?.college || 'PARUL UNIVERSITY');
  const [branch, setBranch] = useState(user?.branch || 'B.Tech in Computer Engineering');
  const [gradYear, setGradYear] = useState(user?.graduationYear || '2025');
  const [careerGoal, setCareerGoal] = useState(user?.careerGoal || 'AI/ML Engineer at a high-growth tech company');

  // Step 2: Skills & Experience Level
  const [skills, setSkills] = useState<string[]>(
    user?.skills || ['Python', 'FastAPI', 'React', 'PostgreSQL', 'NLP', 'Docker']
  );
  const [newSkillInput, setNewSkillInput] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    user?.experienceLevel || 'Intermediate'
  );

  // Step 3: Interests & Domains
  const [interests, setInterests] = useState<string[]>(
    user?.interests || ['Artificial Intelligence', 'Natural Language Processing', 'Microservices', 'ATS Systems']
  );
  const [newInterestInput, setNewInterestInput] = useState('');
  const [preferredDomain, setPreferredDomain] = useState(user?.preferredDomain || 'AI/ML');

  // Step 4: Project Constraints
  const [teamSize, setTeamSize] = useState<number>(user?.teamSize || 3);
  const [budget, setBudget] = useState<string>(user?.budget || '₹3,000');
  const [availableWeeks, setAvailableWeeks] = useState<number>(user?.availableTimeWeeks || 8);

  const availableDomains = [
    'AI/ML',
    'Cybersecurity',
    'Healthcare',
    'FinTech',
    'EdTech',
    'Agriculture',
    'Blockchain',
    'IoT & Embedded',
    'Cloud Computing',
    'Autonomous Systems'
  ];

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddInterest = () => {
    if (newInterestInput.trim() && !interests.includes(newInterestInput.trim())) {
      setInterests([...interests, newInterestInput.trim()]);
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter((i) => i !== interestToRemove));
  };

  const handleSaveProfile = () => {
    updateUserProfile({
      college,
      branch,
      graduationYear: gradYear,
      careerGoal,
      skills,
      experienceLevel,
      interests,
      preferredDomain,
      teamSize,
      budget,
      availableTimeWeeks: availableWeeks
    });

    addToast('Profile preferences updated successfully!', 'success');
    navigate('/generate');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Onboarding & Engineering Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Personalize Your Capstone Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Our AI uses these attributes to calculate Feasibility Match Scores and construct targeted development roadmaps.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { num: 1, label: 'Academic & Career' },
            { num: 2, label: 'Skills & Level' },
            { num: 3, label: 'Interests & Domain' },
            { num: 4, label: 'Constraints' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                currentStep === s.num
                  ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                  : currentStep > s.num
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                  : 'bg-white/60 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold">Step {s.num}</span>
                {currentStep > s.num && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <p className="text-[11px] font-bold text-slate-800 truncate mt-0.5">
                {s.label}
              </p>
            </button>
          ))}
        </div>

        {/* Step Card Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
          {/* STEP 1: ACADEMIC DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Step 1: Academic Details & Career Ambition
                </h3>
                <p className="text-xs text-slate-500">
                  Provide your collegiate credentials and the professional role you want this project to showcase.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College / Institute
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Degree & Branch
                    </label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Graduation Year
                    </label>
                    <select
                      value={gradYear}
                      onChange={(e) => setGradYear(e.target.value)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Career Goal / Dream Job
                  </label>
                  <input
                    type="text"
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    placeholder="e.g. AI/ML Research Engineer, Full Stack Cloud Architect, Cybersecurity Analyst"
                    className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Projects will be tailored to generate impressive portfolio bullet points for interviews.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SKILLS */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Step 2: Technical Skills & Experience Level
                </h3>
                <p className="text-xs text-slate-500">
                  Specify technologies you already know or feel comfortable learning during the semester.
                </p>
              </div>

              {/* Experience Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Self-Assessed Experience Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Beginner', 'Intermediate', 'Advanced'] as ExperienceLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setExperienceLevel(lvl)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        experienceLevel === lvl
                          ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <p className="text-xs font-bold">{lvl}</p>
                      <p
                        className={`text-[10px] mt-0.5 ${
                          experienceLevel === lvl ? 'text-indigo-100' : 'text-slate-500'
                        }`}
                      >
                        {lvl === 'Beginner'
                          ? 'Fundamentals'
                          : lvl === 'Intermediate'
                          ? 'Built small apps'
                          : 'Production ready'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Tag Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Skills & Frameworks
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Type a skill (e.g. PyTorch, Next.js, Redis, Flutter) and hit Enter or Add"
                    className="flex-1 text-xs sm:text-sm rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-indigo-400 hover:text-indigo-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INTERESTS & DOMAINS */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Step 3: Preferred Domain & Research Interests
                </h3>
                <p className="text-xs text-slate-500">
                  Choose the industry vertical you are passionate about exploring.
                </p>
              </div>

              {/* Preferred Domain Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Primary Preferred Domain
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableDomains.map((dom) => (
                    <button
                      key={dom}
                      type="button"
                      onClick={() => setPreferredDomain(dom)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                        preferredDomain === dom
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests Tags */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Special Topics of Interest
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInterestInput}
                    onChange={(e) => setNewInterestInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                    placeholder="e.g. Computer Vision, Medical Imaging, Zero Knowledge Proofs..."
                    className="flex-1 text-xs sm:text-sm rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddInterest}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200"
                    >
                      <span>{interest}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="text-blue-400 hover:text-blue-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONSTRAINTS */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Step 4: Project Constraints & Resources
                </h3>
                <p className="text-xs text-slate-500">
                  Realistic constraints guarantee your project is 100% deliverable before college submission deadlines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Team Size Counter */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-indigo-600">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Team Size</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">
                    {teamSize} {teamSize === 1 ? 'Student' : 'Students'}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTeamSize(Math.max(1, teamSize - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-xs text-slate-500">Member count</span>
                    <button
                      type="button"
                      onClick={() => setTeamSize(Math.min(6, teamSize + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Available Weeks */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-indigo-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Timeline</span>
                    </div>
                    <span className="text-xs font-black text-slate-900">{availableWeeks} Weeks</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={24}
                    step={2}
                    value={availableWeeks}
                    onChange={(e) => setAvailableWeeks(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>4 weeks (Rapid)</span>
                    <span>16+ wks (2 Semesters)</span>
                  </div>
                </div>

                {/* Budget */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-indigo-600">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Est. Budget</span>
                  </div>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-300 p-2.5 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <option value="₹0 (Free tier only)">₹0 (Free tier only)</option>
                    <option value="₹1,500">₹1,500 (Basic APIs)</option>
                    <option value="₹3,000">₹3,000 (Standard Cloud / GPU)</option>
                    <option value="₹5,000+">₹5,000+ (Sensors / Hardware / Dedicated GPUs)</option>
                  </select>
                  <p className="text-[10px] text-slate-500">
                    AI prioritizes open-source weights and generous student cloud credits.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveProfile}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-extrabold shadow-md shadow-indigo-500/25 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save Profile & Generate Projects</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
