import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, ExternalLink, ShieldCheck, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { SOURCE_PLATFORMS, CATEGORIES } from '../../data/internships';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Overview (2 cols on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Briefcase size={22} className="stroke-[2.2]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Intern<span className="text-blue-400">Hub</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-slate-200">One Platform. Every Internship Opportunity.</strong>
              <br />
              Centralizing verified internships from Internshala, LinkedIn, Indeed, Wellfound, Naukri, and leading tech career sites into one cohesive student-first discovery portal.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/60 text-blue-300 border border-blue-700/50">
                <Sparkles size={13} /> Aggregator Prototype
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/50 text-emerald-300 border border-emerald-700/40">
                <CheckCircle2 size={13} /> 100% Free for Students
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-slate-400 hover:text-white transition-colors">
                  Explore Internships
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-400 hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link to="/saved" className="text-slate-400 hover:text-white transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us & Mission
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1">
                  <ShieldCheck size={14} /> Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Popular Tracks
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(1, 7).map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/explore?category=${encodeURIComponent(cat.id)}`}
                    className="text-slate-400 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                      {cat.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Aggregated Sources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Indexed Portals
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {SOURCE_PLATFORMS.map(portal => (
                <span
                  key={portal.name}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-medium"
                >
                  {portal.name}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              InternHub acts strictly as an aggregator. When you click Apply, you are directed straight to the original verified listing source.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} InternHub. Designed & Built for ambitious students worldwide.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400 transition-colors">Terms of Aggregation</Link>
            <Link to="/about" className="hover:text-slate-400 transition-colors">Privacy Notice</Link>
            <Link to="/admin" className="hover:text-blue-400 transition-colors">Admin Prototype</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
