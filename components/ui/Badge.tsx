import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "red" | "yellow" | "neutral" | "green";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "red",
  className = "",
}) => {
  const variantStyles = {
    red: "bg-red-100 text-brand-red border border-red-200",
    yellow: "bg-amber-100 text-amber-900 border border-amber-300",
    neutral: "bg-surface-warm text-neutral-text border border-stone-200",
    green: "bg-emerald-100 text-emerald-900 border border-emerald-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono-data font-semibold uppercase tracking-wider ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
