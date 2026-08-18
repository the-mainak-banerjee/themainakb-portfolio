import { SVGProps } from "react";

interface HeadphoneIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  bandColor?: string;
  leftCupColor?: string;
  rightCupColor?: string;
  bandThickness?: number;
  cupRadius?: number;
  className?: string;
}

export function HeadphoneIcon({
  size = 64,
  bandColor = "currentColor",
  leftCupColor = "currentColor",
  rightCupColor = "currentColor",
  bandThickness = 6,
  cupRadius = 6,
  className = "",
  ...props
}: HeadphoneIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`text-neutral-200 ${className}`}
      {...props}
    >
      <path
        d="M14 30 V26 C14 14.954 22.954 6 34 6 H30 C41.046 6 50 14.954 50 26 V30"
        stroke={bandColor}
        strokeWidth={bandThickness}
        strokeLinecap="round"
        fill="none"
      />

      <rect
        x="10"
        y="30"
        width="14"
        height="22"
        rx={cupRadius}
        fill={leftCupColor}
      />

      <rect
        x="40"
        y="30"
        width="14"
        height="22"
        rx={cupRadius}
        fill={rightCupColor}
      />
    </svg>
  );
}