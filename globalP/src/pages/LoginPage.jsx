import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, Mail, Lock, ArrowRight, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginAsStudentDemo, loginAsAdminDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    if (password.length < 4) {
      setError('Password should be at least 4 characters for this demo.');
      return;
    }

    const res = login(email, password);
    if (res.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate(redirectPath);
    }
  };

  const handleDemoStudent = () => {
    loginAsStudentDemo();
    navigate('/dashboard');
  };

  const handleDemoAdmin = () => {
    loginAsAdminDemo();
    navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xl shadow-slate-200/50 space-y-6">
        
        {/* Brand & Heading */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Briefcase size={22} className="stroke-[2.2]" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Intern<span className="text-blue-600">Hub</span>
            </span>
          </Link>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access your saved internships and customized recommendations
          </p>
        </div>

        {/* Demo Fast-Login Strip */}
        <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/80 space-y-2 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-700">
            <Sparkles size={14} /> One-Click Demo Access
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoStudent}
              className="py-2 px-3 bg-white hover:bg-blue-100/70 border border-blue-200 text-blue-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <UserCheck size={14} /> Student Demo
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="py-2 px-3 bg-white hover:bg-indigo-100/70 border border-indigo-200 text-indigo-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <ShieldAlert size={14} /> Admin Demo
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="e.g. rahul@college.edu"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 font-medium transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have an account yet?{" "}
          <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
            Create Free Account
          </Link>
        </div>

      </div>
    </div>
  );
};
