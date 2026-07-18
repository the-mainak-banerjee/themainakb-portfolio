import React from "react";
import { IconName, iconRegistry } from "./registry";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  color?: string;
}

export function Icon({
  name,
  size = 24,
  color = "currentColor",
  ...props
}: IconProps) {
  const SvgIcon = iconRegistry[name];

  if (!SvgIcon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Icon "${name}" not found in registry.`);
    }
    return null;
  }

  return <SvgIcon width={size} height={size} color={color} {...props} />;
}
