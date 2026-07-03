import type { IconSvgProps } from "./types";

function ShadcnIcon({ color = "currentColor", ...props }: IconSvgProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden {...props}>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="m208 128-80 80M192 40 40 192"
      />
    </svg>
  );
}

export default ShadcnIcon;
