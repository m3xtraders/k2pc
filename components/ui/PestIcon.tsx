import React from "react";

export type PestIconName = "ant" | "rodent" | "cockroach" | "bed-bug" | "wasp" | "spider" | "mosquito";

interface PestIconProps extends React.SVGProps<SVGSVGElement> {
  name: PestIconName | string;
  size?: number;
  className?: string;
}

export const PestIcon: React.FC<PestIconProps> = ({
  name,
  size = 32,
  className = "",
  ...props
}) => {
  const strokeColor = "currentColor";
  const strokeWidth = 2;

  const renderIconContent = () => {
    switch (name) {
      case "ant":
        return (
          <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            {/* Ant Body - Head, Thorax, Abdomen */}
            <circle cx="12" cy="7" r="2.5" />
            <ellipse cx="12" cy="13" rx="2" ry="2.5" />
            <ellipse cx="12" cy="20" rx="3.5" ry="4" />
            {/* Legs */}
            <path d="M10 12L4 10M14 12L20 10" />
            <path d="M10 14L4 16M14 14L20 16" />
            <path d="M9 19L3 22M15 19L21 22" />
            {/* Antennae */}
            <path d="M10.5 5.5L7 3M13.5 5.5L17 3" />
          </g>
        );

      case "rodent":
        return (
          <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            {/* Mouse Body & Ears */}
            <ellipse cx="13" cy="15" rx="7" ry="5" />
            <circle cx="8" cy="11" r="3" />
            <circle cx="12" cy="9" r="2.5" />
            {/* Snout & Whiskers */}
            <path d="M6 15L3 16" />
            <circle cx="3" cy="16" r="0.75" fill={strokeColor} />
            <path d="M4 14L1 13M4 17L1 18" />
            {/* Long Tail */}
            <path d="M20 15C22 15 23 18 22 21C21.5 22.5 19 23 18 21.5" />
          </g>
        );

      case "cockroach":
        return (
          <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            {/* Oval Segmented Body */}
            <ellipse cx="12" cy="14" rx="5" ry="7" />
            <path d="M12 7V21" strokeDasharray="1 1" />
            <path d="M8 11H16M7.5 15H16.5M8 18H16" />
            {/* Small Head */}
            <path d="M10 7C10 5.5 14 5.5 14 7" />
            {/* Long Antennae */}
            <path d="M11 6C9 2 4 2 2 3M13 6C15 2 20 2 22 3" />
            {/* 6 Spiky Legs */}
            <path d="M7 10L3 8M17 10L21 8" />
            <path d="M7 14L2 14M17 14L22 14" />
            <path d="M7 18L3 20M17 18L21 20" />
          </g>
        );

      case "bed-bug":
        return (
          <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            {/* Broad Flat Oval Body */}
            <ellipse cx="12" cy="15" rx="7.5" ry="6" />
            {/* Abdominal Striations */}
            <path d="M5 12C8 13.5 16 13.5 19 12" />
            <path d="M4.8 15C8 16.5 16 16.5 19.2 15" />
            <path d="M5.5 18C8 19 16 19 18.5 18" />
            {/* Small Head & Antennae */}
            <path d="M9.5 9C9.5 7.5 14.5 7.5 14.5 9" />
            <path d="M10 8L7 5M14 8L17 5" />
            {/* Short Legs */}
            <path d="M5 11L2 10M19 11L22 10" />
            <path d="M4.5 15L1.5 16M19.5 15L22.5 16" />
            <path d="M6 19L3 21M18 19L21 21" />
          </g>
        );

      case "wasp":
        return (
          <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            {/* Head, Thorax, Striped Pointed Abdomen */}
            <circle cx="12" cy="5" r="2" />
            <ellipse cx="12" cy="10" rx="2" ry="2.5" />
            <path d="M12 12.5C14.5 15 14.5 19 12 22C9.5 19 9.5 15 12 12.5Z" />
            {/* Stinger */}
            <path d="M12 22V24" strokeWidth={2.5} />
            {/* Abdomen Stripes */}
            <path d="M10 15H14M9.5 18H14.5" />
            {/* Pointed Wings */}
            <path d="M10 9C6 5 2 6 4 11C6.5 11.5 9.5 10 10 9Z" />
            <path d="M14 9C18 5 22 6 20 11C17.5 11.5 14.5 10 14 9Z" />
          </g>
        );

      case "mosquito":
        return (
          <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            {/* Long needle-like proboscis */}
            <path d="M7 8L2 5" strokeWidth={1.75} />
            {/* Head & Antennae */}
            <circle cx="8.5" cy="9" r="1.75" />
            <path d="M8 7.5L6 4M9.5 7.5L9 3.5" strokeWidth={1.5} />
            {/* Thorax */}
            <ellipse cx="12" cy="12" rx="2" ry="2.2" />
            {/* Long Slender Abdomen */}
            <path d="M13.5 13.5C16 16 19 18 22 19" strokeWidth={2.5} />
            {/* Extended Translucent Wings */}
            <path d="M11.5 10C10 5 13 2 15.5 4.5C16.5 6.5 14.5 9 12 10.5Z" />
            <path d="M13 9.5C13.5 5 17 3 19 5.5C19.5 7.5 17 9.5 13.5 10.5Z" />
            {/* Long Angular Insect Legs */}
            <path d="M10 12L6 15L4 20" />
            <path d="M12 13L11 17L10 22" />
            <path d="M14 13L16 17L19 21" />
          </g>
        );

      case "spider":
        return (
          <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            {/* Cephalothorax & Round Abdomen */}
            <circle cx="12" cy="9" r="2.5" />
            <circle cx="12" cy="16" r="4.5" />
            {/* 8 Angular Legs */}
            <path d="M10 8C7 4 3 5 2 8" />
            <path d="M14 8C17 4 21 5 22 8" />
            <path d="M9.5 9.5C6 7 2 9 1 12" />
            <path d="M14.5 9.5C18 7 22 9 23 12" />
            <path d="M9.5 11C6 11 3 14 2 17" />
            <path d="M14.5 11C18 11 21 14 22 17" />
            <path d="M10 12.5C7 15 4 19 3 22" />
            <path d="M14 12.5C17 15 20 19 21 22" />
          </g>
        );

      default:
        return (
          <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8V12L15 15" />
          </g>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${className}`}
      {...props}
    >
      {renderIconContent()}
    </svg>
  );
};
