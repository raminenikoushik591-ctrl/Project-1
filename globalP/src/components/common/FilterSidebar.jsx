import React, { useState } from 'react';
import { 
  Filter, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  MapPin, 
  Banknote, 
  Calendar, 
  Globe2, 
  GraduationCap 
} from 'lucide-react';
import { 
  CATEGORIES, 
  WORK_MODES, 
  STIPEND_RANGES, 
  DURATIONS, 
  EXPERIENCE_LEVELS, 
  SOURCE_PLATFORMS 
} from '../../data/internships';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults = 0,
  isMobile = false,
  onCloseMobile
}) => {
  // Collapsible state for filter groups
  const [collapsed, setCollapsed] = useState({
    category: false,
    workMode: false,
    stipend: false,
    duration: false,
    experience: false,
    source: false
  });

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Count how many filters are active
  const activeFilterCount = [
    filters.category !== 'all',
    filters.workMode !== 'All Modes',
    filters.stipendMin > 0,
    filters.duration !== 'All Durations',
    filters.experience !== 'All Levels',
    filters.source !== 'all',
    filters.location && filters.location !== 'All Locations'
  ].filter(Boolean).length;

  return (
    <aside className={`bg-white rounded-2xl border border-slate-200/90 p-5 ${isMobile ? 'w-full' : 'w-72 flex-shrink-0 sticky top-24'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline focus:outline-none"
          >
            <RotateCcw size={13} />
            Reset all
          </button>
        )}
      </div>

      <div className="space-y-5 text-sm">

        {/* 1. Category Filter */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between font-bold text-slate-800 text-xs uppercase tracking-wider mb-2"
          >
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} className="text-slate-400" /> Category
            </span>
            {collapsed.category ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          {!collapsed.category && (
            <div className="space-y-1 mt-2 max-h-48 overflow-y-auto pr-1">
              <label className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === 'all'}
                  onChange={() => onFilterChange('category', 'all')}
                  className="text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="text-xs font-medium text-slate-700">All Categories</span>
              </label>

              {CATEGORIES.slice(1).map(cat => (
                <label key={cat.id} className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === cat.name}
                      onChange={() => onFilterChange('category', cat.name)}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-xs font-medium text-slate-700">{cat.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">{cat.count}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 2. Work Mode Filter */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('workMode')}
            className="w-full flex items-center justify-between font-bold text-slate-800 text-xs uppercase tracking-wider mb-2"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" /> Work Mode
            </span>
            {collapsed.workMode ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          {!collapsed.workMode && (
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {WORK_MODES.map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onFilterChange('workMode', mode)}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${
                    filters.workMode === mode
                      ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Stipend Range */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('stipend')}
            className="w-full flex items-center justify-between font-bold text-slate-800 text-xs uppercase tracking-wider mb-2"
          >
            <span className="flex items-center gap-1.5">
              <Banknote size={14} className="text-slate-400" /> Minimum Stipend
            </span>
            {collapsed.stipend ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          {!collapsed.stipend && (
            <div className="space-y-1 mt-2">
              {STIPEND_RANGES.map((range, idx) => (
                <label key={idx} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="stipend"
                    checked={filters.stipendMin === range.min}
                    onChange={() => onFilterChange('stipendMin', range.min)}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-xs font-medium text-slate-700">{range.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 4. Duration */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('duration')}
            className="w-full flex items-center justify-between font-bold text-slate-800 text-xs uppercase tracking-wider mb-2"
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" /> Duration
            </span>
            {collapsed.duration ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          {!collapsed.duration && (
            <div className="space-y-1 mt-2">
              {DURATIONS.map((dur) => (
                <label key={dur} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    checked={filters.duration === dur}
                    onChange={() => onFilterChange('duration', dur)}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-xs font-medium text-slate-700">{dur}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 5. Source Platform */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('source')}
            className="w-full flex items-center justify-between font-bold text-slate-800 text-xs uppercase tracking-wider mb-2"
          >
            <span className="flex items-center gap-1.5">
              <Globe2 size={14} className="text-slate-400" /> Source Portal
            </span>
            {collapsed.source ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          {!collapsed.source && (
            <div className="space-y-1 mt-2">
              <label className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="source"
                  checked={filters.source === 'all'}
                  onChange={() => onFilterChange('source', 'all')}
                  className="text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="text-xs font-medium text-slate-700">All Sources</span>
              </label>

              {SOURCE_PLATFORMS.map(portal => (
                <label key={portal.name} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="source"
                    checked={filters.source === portal.name}
                    onChange={() => onFilterChange('source', portal.name)}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: portal.color }} />
                    {portal.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 6. Experience Level */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('experience')}
            className="w-full flex items-center justify-between font-bold text-slate-800 text-xs uppercase tracking-wider mb-2"
          >
            <span className="flex items-center gap-1.5">
              <GraduationCap size={14} className="text-slate-400" /> Experience Level
            </span>
            {collapsed.experience ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          {!collapsed.experience && (
            <div className="space-y-1 mt-2">
              {EXPERIENCE_LEVELS.map(level => (
                <label key={level} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    checked={filters.experience === level}
                    onChange={() => onFilterChange('experience', level)}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-xs font-medium text-slate-700">{level}</span>
                </label>
              ))}
            </div>
          )}
        </div>

      </div>

      {isMobile && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
          <button
            type="button"
            onClick={onClearFilters}
            className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-1/2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm"
          >
            Apply ({totalResults})
          </button>
        </div>
      )}
    </aside>
  );
};
