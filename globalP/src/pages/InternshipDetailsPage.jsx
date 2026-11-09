import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Banknote, 
  ExternalLink, 
  Clock, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Gift, 
  Share2, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useInternships } from '../context/InternshipsContext';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { SourceBadge, WorkModeBadge, StatusBadge } from '../components/common/Badge';
import { InternshipCard } from '../components/common/InternshipCard';
import { getRelativeTime } from '../utils/helpers';

export const InternshipDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInternshipById, internships, addToRecentlyViewed } = useInternships();
  const [copiedShare, setCopiedShare] = useState(false);

  const internship = getInternshipById(id);

  // Mark as recently viewed
  useEffect(() => {
    if (internship) {
      addToRecentlyViewed(internship.id);
      window.scrollTo(0, 0);
    }
  }, [id, internship]);

  if (!internship) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Internship Not Found</h2>
        <p className="text-slate-500 mb-6">
          The internship listing you are looking for may have expired or was removed.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm"
        >
          <ArrowLeft size={16} />
          Back to Explore
        </Link>
      </div>
    );
  }

  const {
    title,
    company,
    companyLogo,
    companyColor = "#2563eb",
    location,
    workMode,
    stipend,
    duration,
    skills = [],
    category,
    experienceLevel,
    description,
    responsibilities = [],
    eligibility = [],
    benefits = [],
    source,
    applicationUrl,
    postedDate,
    deadline,
    status
  } = internship;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // Find similar internships
  const similarInternships = internships
    .filter(item => item.id !== internship.id && (item.category === category || item.workMode === workMode))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Breadcrumb & Back Button */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <Link to="/" className="hover:text-blue-600 font-medium whitespace-nowrap">Home</Link>
          <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
          <Link to="/explore" className="hover:text-blue-600 font-medium whitespace-nowrap">Explore</Link>
          <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
          <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors flex-shrink-0"
        >
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      {/* 2. Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          
          {/* Left: Company & Title info */}
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-bold text-white shadow-md overflow-hidden flex-shrink-0"
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
              <span className="text-2xl font-bold">{company.charAt(0)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-600 flex items-center gap-1">
                  <Building2 size={16} className="text-slate-400" /> {company}
                </span>
                <span className="text-slate-300">•</span>
                <WorkModeBadge mode={workMode} />
                <StatusBadge status={status} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h1>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin size={15} className="text-slate-400" /> {location}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Clock size={15} className="text-slate-400" /> Posted {getRelativeTime(postedDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions (Apply & Bookmark & Share) */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 pt-4 md:pt-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                title="Share this internship link"
              >
                <Share2 size={18} />
              </button>

              <BookmarkButton internshipId={internship.id} showText={true} className="border border-slate-200 py-2 px-3" />
            </div>

            {copiedShare && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Link copied to clipboard!
              </span>
            )}

            <a
              href={applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all text-sm whitespace-nowrap"
            >
              <span>Apply on {source}</span>
              <ExternalLink size={16} />
            </a>
          </div>

        </div>

        {/* 4 Key Metric Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Monthly Stipend
            </span>
            <div className="text-base sm:text-lg font-bold text-blue-700 flex items-center gap-1.5">
              <Banknote size={18} className="text-blue-500" />
              <span>{stipend}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Program Duration
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5">
              <Calendar size={18} className="text-slate-400" />
              <span>{duration}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Apply Before
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5">
              <Clock size={18} className="text-amber-500" />
              <span>{deadline || "Open until filled"}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Original Source
            </span>
            <div className="pt-0.5">
              <SourceBadge source={source} size="sm" />
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Content Grid (Left Details + Right Sidebar Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Full Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About Role / Description */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              About the Internship
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {responsibilities.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility Criteria */}
          {eligibility.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Eligibility & Requirements
              </h2>
              <ul className="space-y-3">
                {eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <GraduationCap size={18} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          {skills.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Required Technical Skills
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                {skills.map((skill, idx) => (
                  <Link
                    key={idx}
                    to={`/explore?q=${encodeURIComponent(skill)}`}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs sm:text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    {skill}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Perks & Benefits */}
          {benefits.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Perks & Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                    <Gift size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Aggregator Notice & Company Info */}
        <div className="space-y-6">
          
          {/* Quick Apply Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl border border-blue-200/80 p-6 space-y-4 shadow-xs sticky top-24">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Sparkles size={18} />
              <span>Direct Portal Application</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              InternHub verified this opportunity from <strong>{source}</strong>. You will be redirected to the original application portal to submit your resume.
            </p>

            <a
              href={applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 text-sm transition-all"
            >
              <span>Proceed to Apply</span>
              <ExternalLink size={16} />
            </a>

            <div className="pt-2 border-t border-blue-200/50 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck size={15} /> 100% Free & No Middleman
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle size={15} className="text-slate-400" /> Never pay any application registration fee
              </div>
            </div>
          </div>

          {/* Company Snapshot */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base">Company Snapshot</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p><strong className="text-slate-800">Organization:</strong> {company}</p>
              <p><strong className="text-slate-800">Category:</strong> {category}</p>
              <p><strong className="text-slate-800">Headquarters / Location:</strong> {location}</p>
              <p><strong className="text-slate-800">Work Mode:</strong> {workMode}</p>
              <p><strong className="text-slate-800">Experience:</strong> {experienceLevel}</p>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Similar Internships Section */}
      {similarInternships.length > 0 && (
        <div className="pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Similar Internships You May Like
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Opportunities in {category} or with matching skill requirements
              </p>
            </div>
            <Link
              to={`/explore?category=${encodeURIComponent(category)}`}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarInternships.map(item => (
              <InternshipCard key={item.id} internship={item} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
