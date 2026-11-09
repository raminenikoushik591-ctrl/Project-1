import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Banknote, ExternalLink, ArrowRight, Building2 } from 'lucide-react';
import { SourceBadge, WorkModeBadge } from './Badge';
import { BookmarkButton } from './BookmarkButton';
import { getRelativeTime } from '../../utils/helpers';

export const InternshipCard = ({ internship, viewMode = "grid" }) => {
  const {
    id,
    title,
    company,
    companyLogo,
    companyColor = "#2563eb",
    location,
    workMode,
    stipend,
    duration,
    skills = [],
    source,
    applicationUrl,
    postedDate,
    status
  } = internship;

  // Initial for fallback avatar
  const companyInitial = company ? company.charAt(0).toUpperCase() : "I";

  if (viewMode === "list") {
    return (
      <div className="group relative bg-white border border-slate-200/90 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div 
              className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white shadow-sm overflow-hidden"
              style={{ backgroundColor: companyColor }}
            >
              {companyLogo ? (
                <img 
                  src={companyLogo} 
                  alt={company} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              ) : null}
              <span className="text-base font-semibold">{companyInitial}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Link 
                  to={`/internship/${id}`} 
                  className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors"
                >
                  {title}
                </Link>
                <WorkModeBadge mode={workMode} />
                <SourceBadge source={source} size="xs" />
              </div>
              <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <span className="font-semibold text-slate-800">{company}</span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <MapPin size={14} /> {location}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-400">{getRelativeTime(postedDate)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
            <div className="text-left md:text-right">
              <div className="text-sm font-bold text-blue-700">{stipend}</div>
              <div className="text-xs text-slate-500 flex items-center md:justify-end gap-1">
                <Calendar size={12} /> {duration}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BookmarkButton internshipId={id} />
              <Link
                to={`/internship/${id}`}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-150"
              >
                Details
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Skills footer */}
        {skills.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 mr-1">Skills:</span>
            {skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md"
              >
                {skill}
              </span>
            ))}
            {skills.length > 5 && (
              <span className="text-xs text-slate-400 font-medium">
                +{skills.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Grid Card
  return (
    <div className="group relative bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top bar: Company & Logo & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-sm overflow-hidden flex-shrink-0"
              style={{ backgroundColor: companyColor }}
            >
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt={company}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : null}
              <span className="text-base font-semibold">{companyInitial}</span>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Building2 size={13} /> {company}
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                <Link to={`/internship/${id}`} className="focus:outline-none">
                  {title}
                </Link>
              </h3>
            </div>
          </div>

          <BookmarkButton internshipId={id} />
        </div>

        {/* Location & Work Mode */}
        <div className="flex items-center gap-2 flex-wrap mb-4 text-xs">
          <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
            <MapPin size={13} className="text-slate-400" />
            <span className="truncate max-w-[130px]">{location}</span>
          </span>
          <span className="text-slate-300">•</span>
          <WorkModeBadge mode={workMode} />
        </div>

        {/* Key Metrics: Stipend & Duration */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl mb-4 text-xs border border-slate-100">
          <div>
            <span className="text-slate-400 block text-[11px] mb-0.5 font-medium">STIPEND</span>
            <span className="font-bold text-slate-900 line-clamp-1">{stipend}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] mb-0.5 font-medium">DURATION</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <Calendar size={12} className="text-slate-400" /> {duration}
            </span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-xs text-slate-400 font-medium px-1">
              +{skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Source Badge & Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <SourceBadge source={source} size="xs" />

        <div className="flex items-center gap-2">
          <Link
            to={`/internship/${id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-150"
          >
            Details
            <ArrowRight size={13} />
          </Link>
          <a
            href={applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Direct application on source portal"
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};
