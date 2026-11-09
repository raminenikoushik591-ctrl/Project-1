import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  variant = "numbers" // "numbers" or "loadMore"
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (variant === "loadMore") {
    const hasMore = currentPage < totalPages;
    return (
      <div className="flex flex-col items-center justify-center gap-3 pt-6">
        <p className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{endItem}</span> of{" "}
          <span className="font-bold text-slate-800">{totalItems}</span> internships
        </p>
        {hasMore && (
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            className="px-6 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-sm shadow-xs transition-colors"
          >
            Load More Internships
          </button>
        )}
      </div>
    );
  }

  // Standard numbered pagination
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
      <p className="text-xs text-slate-500 font-medium">
        Showing <span className="font-bold text-slate-800">{startItem}</span> -{" "}
        <span className="font-bold text-slate-800">{endItem}</span> of{" "}
        <span className="font-bold text-slate-800">{totalItems}</span> listings
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
              p === currentPage
                ? "bg-blue-600 text-white shadow-xs"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
