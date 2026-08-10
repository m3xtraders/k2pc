import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-tight rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px] cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-2 min-h-[44px]",
    md: "px-5 py-3 text-base gap-2 min-h-[48px]",
    lg: "px-7 py-4 text-lg gap-3 min-h-[52px]",
  };

  const variantStyles = {
    // Primary Action Yellow: high contrast dark ink text on yellow fill
    primary:
      "bg-action-yellow text-ink hover:bg-[#E2AB04] active:bg-[#C99803] focus-visible:ring-brand-red shadow-md hover:shadow-lg transform active:scale-[0.98]",
    // Secondary Brand Red
    secondary:
      "bg-brand-red text-white hover:bg-brand-red-dark active:bg-[#721513] focus-visible:ring-action-yellow shadow-md hover:shadow-lg transform active:scale-[0.98]",
    // Outline Red
    outline:
      "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white active:bg-brand-red-dark focus-visible:ring-brand-red",
    // Ghost
    ghost:
      "bg-transparent text-ink hover:bg-surface-warm active:bg-neutral-200 focus-visible:ring-brand-red",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
