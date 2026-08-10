import React from "react";

export default function BlogLoadingSkeleton() {
  return (
    <div className="py-16 bg-surface-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
      <div className="h-10 bg-stone-200 rounded w-1/3 mx-auto"></div>
      <div className="h-4 bg-stone-200 rounded w-1/2 mx-auto"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-stone-200 p-4 space-y-4">
            <div className="h-48 bg-stone-200 rounded-lg"></div>
            <div className="h-6 bg-stone-200 rounded w-3/4"></div>
            <div className="h-4 bg-stone-200 rounded w-full"></div>
            <div className="h-4 bg-stone-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
