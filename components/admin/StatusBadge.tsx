import React from "react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = (status || "").toUpperCase();

  let styles = "bg-stone-100 text-stone-700 border-stone-200";
  let label = status;

  switch (normalized) {
    case "PUBLISHED":
      styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
      label = "Published";
      break;
    case "DRAFT":
      styles = "bg-amber-50 text-amber-700 border-amber-200";
      label = "Draft";
      break;
    case "NEW":
      styles = "bg-rose-50 text-rose-700 border-rose-200 font-semibold";
      label = "New Lead";
      break;
    case "CONTACTED":
      styles = "bg-sky-50 text-sky-700 border-sky-200";
      label = "Contacted";
      break;
    case "SCHEDULED":
      styles = "bg-amber-50 text-amber-800 border-amber-300";
      label = "Scheduled";
      break;
    case "IN_PROGRESS":
      styles = "bg-purple-50 text-purple-700 border-purple-200";
      label = "In Progress";
      break;
    case "CLOSED":
      styles = "bg-emerald-50 text-emerald-800 border-emerald-300 font-medium";
      label = "Closed / Won";
      break;
    case "LOST":
      styles = "bg-stone-100 text-stone-600 border-stone-300";
      label = "Lost / Archived";
      break;
    default:
      label = status.replace(/_/g, " ");
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}
    >
      {label}
    </span>
  );
};

