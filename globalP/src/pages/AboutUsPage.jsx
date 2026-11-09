import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Globe2, 
  Layers, 
  Users, 
  Clock, 
  Compass, 
  Check 
} from 'lucide-react';
import { SOURCE_PLATFORMS } from '../data/internships';

export const AboutUsPage = () => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-b from-blue-50/70 via-white to-slate-50 py-16 border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
            <Sparkles size={14} /> Our Mission & Vision
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            One Platform. Every Internship Opportunity.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            InternHub was born out of a simple observation: finding an internship shouldn't feel like a full-time job. We unite scattered listings into one clean, unbiased, student-first platform.
          </p>
        </div>
      </section>

      {/* 2. The Problem We Solve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              The Problem Students Face
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Scattered Job Portals, Missed Deadlines, and Tab Overload
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Currently, college students must continuously visit separate platforms like <strong>Internshala, LinkedIn, Indeed, Wellfound, Naukri</strong>, and dozens of individual tech company career pages just to find relevant internship listings.
            </p>

            <ul className="space-y-2.5 pt-2">
              <li className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✕</span>
                <span>Having to create and maintain accounts on 6+ different platforms</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✕</span>
                <span>Repetitive, duplicate job listings across different websites</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✕</span>
                <span>Hidden or undisclosed stipends and unclear eligibility criteria</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✕</span>
                <span>Missed application deadlines due to lack of a centralized dashboard</span>
              </li>
            </ul>
          </div>

          {/* Contrast Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-blue-600/20 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              The InternHub Solution
            </span>
            <h3 className="text-2xl font-bold tracking-tight">
              A Single Organized Discovery Hub
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              InternHub normalizes titles, companies, locations, work modes, and stipends into one high-performance interface. One click takes you directly to the original portal to submit your application.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-300 flex-shrink-0" />
                <span className="text-sm font-medium">All major portals indexed in real-time</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-300 flex-shrink-0" />
                <span className="text-sm font-medium">Transparent monthly stipends displayed upfront</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-300 flex-shrink-0" />
                <span className="text-sm font-medium">100% Free: No fees for students, ever</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core Pillars */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Our Core Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Built with Students at the Center
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Unbiased Discovery</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We don't favor proprietary job postings or charge companies for priority placement. Opportunities are ranked purely based on relevance and quality.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Zero Spam & Verified Links</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every listing is verified against original company sources. We filter out unpaid scam listings or "pay-to-intern" programs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Lightbulb size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Skills-First Matching</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our filtering allows you to search directly by technical stack (e.g., React, PyTorch, Docker, Figma) rather than generic keywords.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Aggregated Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Where Do InternHub Opportunities Come From?
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          We aggregate verified openings from across the entire student hiring ecosystem:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
          {SOURCE_PLATFORMS.map((portal) => (
            <div
              key={portal.name}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center"
            >
              <div
                className="w-3.5 h-3.5 rounded-full mb-2"
                style={{ backgroundColor: portal.color }}
              />
              <span className="font-bold text-sm text-slate-900">{portal.name}</span>
              <span className="text-[11px] text-slate-400 mt-0.5">Aggregated Source</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Is InternHub completely free to use?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Yes, 100%. InternHub is designed as a student discovery portal. You can search, filter, bookmark, and click through to original application portals without paying anything.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Do I apply directly on InternHub?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              InternHub acts as an aggregator. When you click <em>Apply on [Source]</em>, you are securely transferred to the official application page (such as the company's career portal, LinkedIn job post, or Internshala listing).
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">How does bookmarking work without a backend?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              In this frontend prototype, your bookmarks and profile state are preserved locally using HTML5 LocalStorage in your browser, meaning they persist even if you refresh or reopen the tab.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="bg-blue-600 rounded-3xl p-8 text-white space-y-4 shadow-lg shadow-blue-500/20">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Start Exploring Opportunities Today
          </h2>
          <p className="text-blue-100 text-sm max-w-lg mx-auto">
            Find the right internship that matches your skills, batch, and career aspirations in seconds.
          </p>
          <div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 shadow-sm transition-all"
            >
              <span>Explore All Internships</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
