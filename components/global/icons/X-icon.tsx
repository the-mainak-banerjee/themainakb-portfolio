import type { IconSvgProps } from "./types";

export default function XIcon({ color = "currentColor", ...props }: IconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <path
        d="M27.5391 20.6484L44.7891 0.9375H40.6734L25.7016 18.1547L13.7484 0.9375H0L18.0984 26.9016L0 47.6156H4.11563L19.9219 29.4141L32.5453 47.6156H46.2938L27.5391 20.6484ZM21.9422 26.9391L20.1 24.3563L5.55938 3.86719H11.8172L23.5406 20.5031L25.3781 23.0859L40.6781 44.8125H34.4203L21.9422 26.9391Z"
        fill={color}
      />
    </svg>
  );
}
