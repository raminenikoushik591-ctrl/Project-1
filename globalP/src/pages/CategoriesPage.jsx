import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Smartphone, 
  BarChart3, 
  Brain, 
  Palette, 
  Coffee, 
  Terminal, 
  Megaphone, 
  Layers, 
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/internships';
import { useInternships } from '../context/InternshipsContext';

const iconMap = {
  Globe,
  Smartphone,
  BarChart3,
  Brain,
  Palette,
  Coffee,
  Terminal,
  Megaphone,
  Layers
};

export const CategoriesPage = () => {
  const { internships } = useInternships();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate live count from current internships state (including added in admin)
  const categoriesWithLiveCount = CATEGORIES.slice(1).map(cat => {
    const liveCount = internships.filter(item => item.category === cat.name).length;
    return {
      ...cat,
      liveCount
    };
  });

  const filteredCategories = categoriesWithLiveCount.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <Layers size={13} />
          <span>Curated Tech & Business Domains</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Browse Internships by Category
        </h1>
        <p className="text-sm text-slate-600">
          Find student opportunities tailored to your core technical skills, degree background, and career aspirations.
        </p>

        {/* Search within categories */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter categories (e.g. AI, Web, Design)..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredCategories.map((category) => {
          const Icon = iconMap[category.icon] || Layers;
          return (
            <Link
              key={category.id}
              to={`/explore?category=${encodeURIComponent(category.name)}`}
              className="group bg-white rounded-3xl border border-slate-200/90 p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors duration-200 shadow-2xs">
                    <Icon size={28} />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    {category.liveCount} Openings
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {category.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {category.description || "Discover roles with leading companies and tech startups."}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>View All Openings</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50 rounded-3xl border border-blue-200/80 p-8 text-center max-w-3xl mx-auto space-y-3">
        <h3 className="text-lg font-bold text-slate-900">Don't see your exact category?</h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          We aggregate hundreds of dynamic titles daily. Use our free keyword search to find niche positions across all domains.
        </p>
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-blue-700 transition-all"
          >
            <span>Search All Listings</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

    </div>
  );
};
