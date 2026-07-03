import type { IconSvgProps } from "./types";

function MotionIcon({ color = "currentColor", ...props }: IconSvgProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        d="m9.071 7.5-4.747 9H0l3.707-7.027C4.28 8.383 5.715 7.5 6.909 7.5zm10.605 2.25c0-1.243.968-2.25 2.162-2.25S24 8.507 24 9.75 23.032 12 21.838 12s-2.162-1.007-2.162-2.25M9.882 7.5h4.324l-4.747 9H5.135zm5.107 0h4.324l-3.705 7.028c-.575 1.09-2.01 1.972-3.204 1.972h-2.162z"
        fill={color}
      />
    </svg>
  );
}

export default MotionIcon;
