import { SVGProps } from "react";

interface CodeIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  leftBracketColor?: string;
  rightBracketColor?: string;
  slashColor?: string;
  strokeWidth?: number;
  bracketSpread?: number;
  className?: string;
}

export function CodeIcon({
  size = 24,
  leftBracketColor = "currentColor",
  rightBracketColor = "currentColor",
  slashColor = "currentColor",
  strokeWidth = 2,
  bracketSpread = 4,
  className = "",
  ...props
}: CodeIconProps) {
  const leftX = 8 - bracketSpread * 0.25;
  const rightX = 16 + bracketSpread * 0.25;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`text-neutral-200 ${className}`}
      {...props}
    >
      <path
        d={`M${leftX} 6 L4 12 L${leftX} 18`}
        stroke={leftBracketColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <line
        x1="14"
        y1="4"
        x2="10"
        y2="20"
        stroke={slashColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <path
        d={`M${rightX} 6 L20 12 L${rightX} 18`}
        stroke={rightBracketColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
