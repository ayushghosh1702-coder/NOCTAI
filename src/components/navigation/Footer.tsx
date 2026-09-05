import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Heart, Sparkles, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="md" showTagline />
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering final-year engineering and computer science students to turn skills into robust, evaluation-ready capstone projects with AI guidance.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Engineered for University Standards</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/generate" className="hover:text-indigo-600 transition-colors">
                  Generate My Project
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-indigo-600 transition-colors">
                  Explore Project Library
                </Link>
              </li>
              <li>
                <Link to="/projects/ai-resume-analyzer/roadmap" className="hover:text-indigo-600 transition-colors">
                  Development Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/projects/ai-resume-analyzer/mentor" className="hover:text-indigo-600 transition-colors">
                  AI Technical Mentor
                </Link>
              </li>
              <li>
                <Link to="/projects/ai-resume-analyzer/viva" className="hover:text-indigo-600 transition-colors">
                  Viva Preparation Coach
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Domains */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Popular Domains
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/projects?domain=AI/ML" className="hover:text-indigo-600 transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/projects?domain=Cybersecurity" className="hover:text-indigo-600 transition-colors">
                  Cybersecurity & SIEM
                </Link>
              </li>
              <li>
                <Link to="/projects?domain=Healthcare" className="hover:text-indigo-600 transition-colors">
                  HealthTech & FHIR
                </Link>
              </li>
              <li>
                <Link to="/projects?domain=Blockchain" className="hover:text-indigo-600 transition-colors">
                  Web3 & Decentralized Systems
                </Link>
              </li>
              <li>
                <Link to="/projects?domain=Agriculture" className="hover:text-indigo-600 transition-colors">
                  Smart Agriculture & Edge Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: University / Academic Resources */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Evaluation Kit
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <p className="text-xs font-semibold text-slate-800">
                Final Year Project Defense Checklist
              </p>
              <p className="text-[11px] text-slate-500 leading-snug">
                Includes SRS templates, system architecture diagrams, viva defense flashcards, and presentation slides.
              </p>
              <Link
                to="/projects/ai-resume-analyzer/documentation"
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                <span>Access Reports</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ProjectMentor AI. Built for collegiate engineering excellence.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-700 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 transition-colors cursor-pointer">Academic Guidelines</span>
            <span className="hover:text-slate-700 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
