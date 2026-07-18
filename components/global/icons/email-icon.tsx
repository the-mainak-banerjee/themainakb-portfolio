import type { IconSvgProps } from "./types";

function EmailIcon({ color = "currentColor", ...props }: IconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <path
        d="M4.5 9H43.5C44.7 9 45.75 10.05 45.75 11.25V36.75C45.75 37.95 44.7 39 43.5 39H4.5C3.3 39 2.25 37.95 2.25 36.75V11.25C2.25 10.05 3.3 9 4.5 9ZM4.5 12.375V13.6031L24 26.55L43.5 13.6031V12.375H4.5ZM4.5 17.475V36.75H43.5V17.475L24 30.4219L4.5 17.475Z"
        fill={color}
      />
    </svg>
  );
}

export default EmailIcon