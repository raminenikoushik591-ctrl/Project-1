import React from 'react';
import { getSourceBadgeInfo, getWorkModeBadgeClass } from '../../utils/helpers';

export const SourceBadge = ({ source, size = "sm" }) => {
  const info = getSourceBadgeInfo(source);
  const sizeClasses = size === "xs" 
    ? "text-[11px] px-2 py-0.5" 
    : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${info.tagClass} ${sizeClasses} transition-colors`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${info.accentBg}`} />
      {source}
    </span>
  );
};

export const WorkModeBadge = ({ mode }) => {
  const badgeClass = getWorkModeBadgeClass(mode);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${badgeClass}`}>
      {mode}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  let color = "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Closing Soon") {
    color = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (status === "Expired") {
    color = "bg-rose-50 text-rose-700 border-rose-200";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${color}`}>
      {status}
    </span>
  );
};
