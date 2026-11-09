import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { LOCATIONS } from '../../data/internships';

export const SearchBar = ({ 
  initialQuery = "", 
  initialLocation = "All Locations", 
  onSearch, 
  variant = "hero", 
  className = "" 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query, location });
    } else {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (location && location !== 'All Locations') params.set('loc', location);
      navigate(`/explore?${params.toString()}`);
    }
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex items-center gap-2 w-full ${className}`}>
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role, company or skills (e.g. React, Python, CRED)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-800 placeholder-slate-400 shadow-xs"
          />
        </div>

        <div className="relative min-w-[160px] hidden sm:block">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Filter by location"
            className="w-full pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-800 appearance-none shadow-xs cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-1.5 flex-shrink-0"
        >
          <Search size={16} />
          <span>Find</span>
        </button>
      </form>
    );
  }

  // Hero variant: large, prominent, dual input card
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl shadow-blue-900/10 border border-slate-200/90 flex flex-col md:flex-row items-stretch md:items-center gap-2"
      >
        {/* Keyword Search */}
        <div className="relative flex-1 flex items-center min-w-0 px-3 py-2 sm:py-1">
          <Search size={22} className="text-blue-600 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Internship title, company, or tech stack (e.g. React, AI, CRED)..."
            className="w-full text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-none bg-transparent font-medium"
          />
        </div>

        {/* Divider on desktop */}
        <div className="hidden md:block w-px h-10 bg-slate-200" />

        {/* Location Selector */}
        <div className="relative flex items-center min-w-[210px] px-3 py-2 sm:py-1 border-t md:border-t-0 border-slate-100">
          <MapPin size={20} className="text-blue-500 mr-2.5 flex-shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Select location"
            className="w-full text-slate-800 text-sm sm:text-base focus:outline-none bg-transparent font-medium cursor-pointer appearance-none pr-6"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 flex-shrink-0 text-sm sm:text-base"
        >
          <span>Search Internships</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
};
