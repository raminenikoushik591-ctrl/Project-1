import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  Grid, 
  List, 
  ArrowUpDown, 
  Frown, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useInternships } from '../context/InternshipsContext';
import { InternshipCard } from '../components/common/InternshipCard';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { Pagination } from '../components/common/Pagination';
import { LOCATIONS } from '../data/internships';

const ITEMS_PER_PAGE = 9;

export const ExplorePage = () => {
  const { internships } = useInternships();
  const [searchParams, setSearchParams] = useSearchParams();

  // Mobile filter drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);

  // Read URL query params or defaults
  const queryParam = searchParams.get('q') || '';
  const locParam = searchParams.get('loc') || 'All Locations';
  const catParam = searchParams.get('category') || 'all';

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedLocation, setSelectedLocation] = useState(locParam);
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'oldest' | 'highestStipend' | 'lowestStipend'

  const [filters, setFilters] = useState({
    category: catParam,
    workMode: 'All Modes',
    stipendMin: 0,
    duration: 'All Durations',
    experience: 'All Levels',
    source: 'all',
    location: locParam
  });

  // Sync state if URL search params change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const loc = searchParams.get('loc') || 'All Locations';
    const cat = searchParams.get('category') || 'all';
    
    setSearchQuery(q);
    setSelectedLocation(loc);
    setFilters(prev => ({
      ...prev,
      category: cat,
      location: loc
    }));
    setCurrentPage(1);
  }, [searchParams]);

  // Handler for updating a single filter field
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);

    // Sync category or location to URL if applicable
    const newParams = new URLSearchParams(searchParams);
    if (key === 'category') {
      if (value === 'all') newParams.delete('category');
      else newParams.set('category', value);
      setSearchParams(newParams);
    }
    if (key === 'location') {
      if (value === 'All Locations') newParams.delete('loc');
      else newParams.set('loc', value);
      setSearchParams(newParams);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      workMode: 'All Modes',
      stipendMin: 0,
      duration: 'All Durations',
      experience: 'All Levels',
      source: 'all',
      location: 'All Locations'
    });
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSearchParams(new URLSearchParams());
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set('q', searchQuery.trim());
    } else {
      newParams.delete('q');
    }
    if (selectedLocation && selectedLocation !== 'All Locations') {
      newParams.set('loc', selectedLocation);
    } else {
      newParams.delete('loc');
    }
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredInternships = useMemo(() => {
    return internships.filter(item => {
      // Search query (Role, Company, Skills, Description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCompany = item.company.toLowerCase().includes(q);
        const matchesSkills = item.skills?.some(s => s.toLowerCase().includes(q));
        const matchesCategory = item.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesCategory) {
          return false;
        }
      }

      // Location
      if (filters.location && filters.location !== 'All Locations') {
        if (filters.location === 'Remote') {
          if (item.workMode !== 'Remote') return false;
        } else if (!item.location.toLowerCase().includes(filters.location.toLowerCase().split(',')[0])) {
          return false;
        }
      }

      // Category
      if (filters.category && filters.category !== 'all') {
        if (item.category !== filters.category) return false;
      }

      // Work Mode
      if (filters.workMode && filters.workMode !== 'All Modes') {
        if (item.workMode !== filters.workMode) return false;
      }

      // Stipend
      if (filters.stipendMin > 0) {
        if ((item.stipendAmount || 0) < filters.stipendMin) return false;
      }

      // Duration
      if (filters.duration && filters.duration !== 'All Durations') {
        if (filters.duration === '1-2 Months' && (item.durationMonths > 2)) return false;
        if (filters.duration === '3 Months' && item.durationMonths !== 3) return false;
        if (filters.duration === '4-5 Months' && (item.durationMonths < 4 || item.durationMonths > 5)) return false;
        if (filters.duration === '6 Months' && item.durationMonths !== 6) return false;
      }

      // Experience Level
      if (filters.experience && filters.experience !== 'All Levels') {
        if (item.experienceLevel !== filters.experience) return false;
      }

      // Source Platform
      if (filters.source && filters.source !== 'all') {
        if (item.source !== filters.source) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'highestStipend') {
        return (b.stipendAmount || 0) - (a.stipendAmount || 0);
      }
      if (sortBy === 'lowestStipend') {
        return (a.stipendAmount || 0) - (b.stipendAmount || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.postedDate) - new Date(b.postedDate);
      }
      // default 'latest'
      return new Date(b.postedDate) - new Date(a.postedDate);
    });
  }, [internships, searchQuery, filters, sortBy]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredInternships.length / ITEMS_PER_PAGE);
  const paginatedInternships = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredInternships.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredInternships, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* 1. Header Bar: Breadcrumbs & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Internships
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Aggregated real-time opportunities across top verified tech portals
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-slate-200/70 p-1 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-label="List View"
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Search & Location Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Query input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or skills (e.g. React, Python, Bangalore)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 placeholder-slate-400 transition-all font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('q');
                  setSearchParams(newParams);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Location dropdown */}
          <div className="relative min-w-[200px]">
            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                handleFilterChange('location', e.target.value);
              }}
              aria-label="Filter internships by location"
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 appearance-none font-medium cursor-pointer"
            >
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Search size={16} />
            <span>Search</span>
          </button>

          {/* Mobile Filter Trigger Button */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </button>
        </form>
      </div>

      {/* 3. Results Bar & Sort Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-slate-900">
            {filteredInternships.length} Internships Available
          </span>
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {filters.category}
              <button 
                type="button" 
                onClick={() => handleFilterChange('category', 'all')}
                aria-label="Remove category filter"
                className="hover:text-blue-900"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {filters.workMode !== 'All Modes' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {filters.workMode}
              <button 
                type="button" 
                onClick={() => handleFilterChange('workMode', 'All Modes')}
                aria-label="Remove work mode filter"
                className="hover:text-indigo-900"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {filters.source !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              {filters.source}
              <button 
                type="button" 
                onClick={() => handleFilterChange('source', 'all')}
                aria-label="Remove source portal filter"
                className="hover:text-amber-900"
              >
                <X size={12} />
              </button>
            </span>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-internships" className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <ArrowUpDown size={13} /> Sort by:
          </label>
          <select
            id="sort-internships"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-2xs cursor-pointer"
          >
            <option value="latest">Latest Posted</option>
            <option value="oldest">Oldest Posted</option>
            <option value="highestStipend">Highest Stipend</option>
            <option value="lowestStipend">Lowest Stipend</option>
          </select>
        </div>
      </div>

      {/* 4. Main Body: Sidebar + Internship List Grid */}
      <div className="flex items-start gap-8">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            totalResults={filteredInternships.length}
          />
        </div>

        {/* Internship List Area */}
        <div className="flex-1 min-w-0">
          
          {paginatedInternships.length > 0 ? (
            <div className="space-y-6">
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-4"}>
                {paginatedInternships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                totalItems={filteredInternships.length}
                pageSize={ITEMS_PER_PAGE}
              />
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-4">
                <Frown size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No matching internships found
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                We couldn't find any opportunities matching your specific combination of filters. Try broadening your keywords or clearing selected filters.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all"
              >
                <RotateCcw size={16} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* 5. Mobile Filter Modal Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs md:hidden animate-in fade-in duration-200">
          <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Filter Internships</h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              totalResults={filteredInternships.length}
              isMobile={true}
              onCloseMobile={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
