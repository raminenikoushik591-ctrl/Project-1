import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Briefcase, 
  Building2, 
  Globe2, 
  ShieldCheck, 
  Search, 
  TrendingUp, 
  Users, 
  Zap, 
  Award, 
  ExternalLink 
} from 'lucide-react';
import { SearchBar } from '../components/common/SearchBar';
import { CategoryCard } from '../components/common/CategoryCard';
import { InternshipCard } from '../components/common/InternshipCard';
import { useInternships } from '../context/InternshipsContext';
import { CATEGORIES, SOURCE_PLATFORMS } from '../data/internships';

export const HomePage = () => {
  const { internships } = useInternships();
  const [featuredTab, setFeaturedTab] = useState('all');
  const navigate = useNavigate();

  // Filter featured internships based on selected tab
  const featuredList = internships.filter(item => {
    if (featuredTab === 'remote') return item.workMode === 'Remote';
    if (featuredTab === 'highStipend') return item.stipendAmount >= 40000;
    if (featuredTab === 'design') return item.category === 'UI/UX Design';
    return item.isFeatured;
  }).slice(0, 6);

  const quickTags = [
    { label: "React Developer", query: "React" },
    { label: "AI / Machine Learning", query: "AI/ML" },
    { label: "UI/UX Design", query: "UI/UX" },
    { label: "Remote Work", query: "Remote" },
    { label: "Python Backend", query: "Python" },
    { label: "Bangalore", location: "Bangalore, India" }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200/60">
        
        {/* Background decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-400/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs sm:text-sm font-bold border border-blue-200 shadow-xs mb-6">
            <Sparkles size={15} className="text-blue-600 animate-pulse" />
            <span>One Platform. Every Internship Opportunity.</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
            Find Your Dream Internship <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              in One Centralized Place
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            Stop switching between 10 different job boards. InternHub aggregates verified openings from Internshala, LinkedIn, Indeed, Wellfound, Naukri, and company career pages into one unified dashboard.
          </p>

          {/* Search Bar Component */}
          <div className="mb-6">
            <SearchBar variant="hero" />
          </div>

          {/* Quick Search Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Popular Searches:</span>
            {quickTags.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (tag.location) {
                    navigate(`/explore?loc=${encodeURIComponent(tag.location)}`);
                  } else {
                    navigate(`/explore?q=${encodeURIComponent(tag.query)}`);
                  }
                }}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 border border-slate-200 text-slate-600 font-medium transition-all shadow-2xs"
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Platform Trust Stats Strip */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">15,000+</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Internships Aggregated</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">500+</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Verified Tech Companies</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">6 Major</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Portals Synchronized</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100% Free</div>
              <div className="text-xs text-slate-500 font-medium mt-1">For All Students</div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Browse by Specialization
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Popular Internship Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.slice(1, 9).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>


      {/* 3. FEATURED INTERNSHIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Curated Opportunities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Internships This Week
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'remote', label: '100% Remote' },
              { id: 'highStipend', label: 'High Stipend (₹40k+)' },
              { id: 'design', label: 'Design & UI' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFeaturedTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  featuredTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredList.map((item) => (
            <InternshipCard key={item.id} internship={item} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
          >
            <span>Explore All {internships.length} Internships</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>


      {/* 4. WHY CHOOSE INTERNHUB */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              The Smarter Way to Discover
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
              Why InternHub is Better for Students
            </h2>
            <p className="text-sm text-slate-600">
              Traditional job hunting means maintaining multiple accounts, repeating resume uploads, and suffering through endless duplicate listings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Globe2 size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                No More 10+ Open Tabs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We aggregate listings from LinkedIn, Internshala, Indeed, Wellfound, and direct company careers into a single clean search feed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Direct Official Links
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zero spam and zero middlemen fees. We send you straight to the original employer application link with one click.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Transparent Stipends
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Compare pay upfront. Filter easily by minimum stipend, work mode (remote/hybrid/on-site), and program duration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Student Profile & Saved
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bookmark exciting positions, organize deadlines, and keep track of your internship application roadmap with LocalStorage persistence.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* 5. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Streamlined 3-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            How InternHub Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center mb-5 shadow-md shadow-blue-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Search & Filter
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Type your desired tech stack, location, or favorite company. Apply precise filters for stipend range, work mode, and experience.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center mb-5 shadow-md shadow-indigo-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Compare Opportunities
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Inspect eligibility criteria, duration, benefits, and source platform credibility across multiple openings without bouncing between sites.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center mb-5 shadow-md shadow-emerald-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Apply on Original Portals
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Click Apply to jump straight to the company's verified application page or official portal. No extra account creation required.
            </p>
          </div>

        </div>
      </section>


      {/* 6. AGGREGATED PORTALS SHOWCASE */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Opportunities Aggregated From Leading Portals
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-10">
            We continuously organize postings from the top job aggregators so you never miss an opening.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SOURCE_PLATFORMS.map((portal) => (
              <div
                key={portal.name}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center justify-center text-center hover:bg-slate-800 transition-colors"
              >
                <div
                  className="w-4 h-4 rounded-full mb-2"
                  style={{ backgroundColor: portal.color }}
                />
                <span className="font-bold text-sm text-slate-200">{portal.name}</span>
                <span className="text-[11px] text-slate-400 mt-1">Direct Aggregation</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Ready to Kickstart Your Career?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl">
              Join thousands of college students discovering internships with top tech startups and MNCs every week on InternHub.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Link
              to="/explore"
              className="px-6 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 shadow-md transition-all text-sm whitespace-nowrap"
            >
              Start Searching Now
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3.5 bg-blue-800/80 hover:bg-blue-900 text-white font-bold rounded-xl border border-blue-400/30 transition-all text-sm whitespace-nowrap"
            >
              Create Free Profile
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
