import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-stone-200 p-6 shadow-sm ${
        hoverEffect
          ? "transition-all duration-300 hover:shadow-md hover:border-brand-red/40 hover:-translate-y-0.5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
