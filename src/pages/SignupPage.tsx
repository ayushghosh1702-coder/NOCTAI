import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/ui/Logo';
import {
  User,
  GraduationCap,
  Building,
  Calendar,
  Mail,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('Ayush');
  const [college, setCollege] = useState('PARUL UNIVERSITY');
  const [degree, setDegree] = useState('B.Tech in Computer Engineering');
  const [gradYear, setGradYear] = useState('2025');
  const [email, setEmail] = useState('ayush@paruluniversity.ac.in');
  const [password, setPassword] = useState('password123');

  const { registerUser } = useApp();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({
      name,
      college,
      branch: degree,
      graduationYear: gradYear,
      email
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-block mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Create Your Student Account
        </h2>
        <p className="mt-1.5 text-xs text-slate-600">
          Set up your academic profile and begin generating your final-year capstone.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl shadow-xl border border-slate-200/90 space-y-6">
          <form onSubmit={handleSignup} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                College / University Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Pune Institute of Computer Technology"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Degree & Branch
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.Tech CS / IT"
                    className="w-full pl-9 pr-2.5 py-2.5 text-xs rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Grad Year
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <select
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full pl-9 pr-2.5 py-2.5 text-xs rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                College Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Create Account & Setup Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
