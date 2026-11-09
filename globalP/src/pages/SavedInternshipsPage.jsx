import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Search, ArrowRight, Trash2, ExternalLink, Frown, Sparkles } from 'lucide-react';
import { useInternships } from '../context/InternshipsContext';
import { InternshipCard } from '../components/common/InternshipCard';

export const SavedInternshipsPage = () => {
  const { getSavedInternships, bookmarkedIds } = useInternships();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const savedList = getSavedInternships();

  // Filter within saved internships
  const filteredSaved = useMemo(() => {
    return savedList.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCompany = item.company.toLowerCase().includes(q);
        const matchesSkills = item.skills?.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
      }

      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [savedList, searchQuery, selectedCategory]);

  const uniqueCategories = Array.from(new Set(savedList.map(item => item.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Bookmark className="text-blue-600 fill-blue-600" size={26} />
            <span>Saved Internships</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Keep track of open positions you're preparing to apply for. Saved in your browser local storage.
          </p>
        </div>

        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
        >
          <span>Find More Roles</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {savedList.length > 0 ? (
        <div className="space-y-6">
          
          {/* Search & Category Filter within saved */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter saved roles by title, company, or skills..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium"
              />
            </div>

            {uniqueCategories.length > 1 && (
              <div className="min-w-[180px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium cursor-pointer"
                >
                  <option value="all">All Saved Categories</option>
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          {filteredSaved.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSaved.map(item => (
                <InternshipCard key={item.id} internship={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-500">No saved internships matched your search filter.</p>
            </div>
          )}

        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-4">
            <Bookmark size={30} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No bookmarks yet</h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Whenever you see an interesting internship opening, click the bookmark icon on the card to save it here for quick access later.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <Sparkles size={16} />
            <span>Browse Internships</span>
          </Link>
        </div>
      )}

    </div>
  );
};
