import React from 'react';
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
  ArrowRight 
} from 'lucide-react';

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

export const CategoryCard = ({ category }) => {
  const IconComponent = iconMap[category.icon] || Layers;

  return (
    <Link
      to={`/explore?category=${encodeURIComponent(category.name)}`}
      className="group bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors duration-200">
            <IconComponent size={24} />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
            {category.count} Openings
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700">
        <span>Explore Roles</span>
        <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
