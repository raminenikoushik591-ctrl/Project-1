import React from 'react';
import { Bookmark } from 'lucide-react';
import { useInternships } from '../../context/InternshipsContext';

export const BookmarkButton = ({ internshipId, className = "", size = 20, showText = false }) => {
  const { isBookmarked, toggleBookmark } = useInternships();
  const bookmarked = isBookmarked(internshipId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(internshipId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={bookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
      className={`inline-flex items-center justify-center gap-1.5 transition-all duration-200 rounded-lg p-2 ${
        bookmarked
          ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
          : "text-slate-400 hover:text-blue-600 hover:bg-slate-100"
      } ${className}`}
    >
      <Bookmark
        size={size}
        className={`transition-transform duration-200 ${bookmarked ? "fill-blue-600 scale-105" : "hover:scale-110"}`}
      />
      {showText && (
        <span className="text-sm font-medium">
          {bookmarked ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
};
