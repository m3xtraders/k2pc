import React from "react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toUpperCase();

  let styles = "bg-stone-100 text-stone-700 border-stone-200";

  switch (normalized) {
    case "PUBLISHED":
      styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case "DRAFT":
      styles = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "NEW":
      styles = "bg-rose-50 text-rose-700 border-rose-200 font-semibold";
      break;
    case "CONTACTED":
      styles = "bg-sky-50 text-sky-700 border-sky-200";
      break;
    case "CLOSED":
      styles = "bg-stone-100 text-stone-600 border-stone-200";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}
    >
      {status}
    </span>
  );
};
