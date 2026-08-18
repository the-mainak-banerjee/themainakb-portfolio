"use client";
import { useMotionValue, useTransform, motion, useSpring, SVGMotionProps } from "motion/react";
import { MouseEvent, useRef } from "react";

interface BandConfig {
  colorClassName?: string;
  thickness?: number;
}

interface CupConfig {
  colorClassName?: string;
  radius?: number;
}

interface MonitorConfig {
  borderColorClassName?: string;
  fillColorClassName?: string;
  strokeWidth?: number;
  radius?: number;
  width?: number;
  height?: number;
}

interface CodeMarkConfig {
  colorClassName?: string;
  strokeWidth?: number;
  scale?: number;
}

interface DevHeadphoneIconProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
  className?: string;
  band?: BandConfig;
  leftCup?: CupConfig;
  rightCup?: CupConfig;
  monitor?: MonitorConfig;
  code?: CodeMarkConfig;
  isHomePage?: boolean;
}

const defaultBand: Required<BandConfig> = {
  colorClassName: "text-accent",
  thickness: 4,
};

const defaultLeftCup: Required<CupConfig> = {
  colorClassName: "text-accent",
  radius: 4,
};

const defaultRightCup: Required<CupConfig> = {
  colorClassName: "text-accent",
  radius: 4,
};

const defaultMonitor: Required<MonitorConfig> = {
  borderColorClassName: "text-accent",
  fillColorClassName: "text-background",
  strokeWidth: 2,
  radius: 3,
  width: 18,
  height: 14,
};

const defaultCode: Required<CodeMarkConfig> = {
  colorClassName: "text-foreground",
  strokeWidth: 2,
  scale: 0.4,
};

const tiltConfig = {
  maxRotate: 10,
  deadZone: 0.15,
  stiffness: 400,
  damping: 15,
  mass: 0.5,
};

export function DevHeadphoneIcon({
  size = 56,
  className = "",
  band,
  leftCup,
  rightCup,
  monitor,
  code,
  isHomePage,
  ...props
}: DevHeadphoneIconProps) {
  const bandCfg = { ...defaultBand, ...band };
  const leftCupCfg = { ...defaultLeftCup, ...leftCup };
  const rightCupCfg = { ...defaultRightCup, ...rightCup };
  const monitorCfg = { ...defaultMonitor, ...monitor };
  const codeCfg = { ...defaultCode, ...code };

  const gapCenterX = 32;
  const gapCenterY = 40;
  const monitorX = gapCenterX - monitorCfg.width / 2;
  const monitorY = gapCenterY - monitorCfg.height / 2;

  const ref = useRef<SVGSVGElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, {
    stiffness: tiltConfig.stiffness,
    damping: tiltConfig.damping,
    mass: tiltConfig.mass,
  });
  const rotate = useTransform(
    springX,
    [-1, 1],
    [tiltConfig.maxRotate, -tiltConfig.maxRotate],
  );

  const handleMouseEnter = (e: MouseEvent) => {
    if (!ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    const { clientX } = e;
    const normalizedX = ((clientX - left) / width) * 2 - 1;
    const valueX =
      Math.abs(normalizedX) < tiltConfig.deadZone ? 0 : normalizedX;
    rawX.set(valueX);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: isHomePage ? 1 : 0.95 }}
      {...props}
    >
      <motion.g style={{ rotate: rotate }}>
        <path
          d="M14 30 V26 C14 14.954 22.954 7 32 7 H30 C41.046 6 50 14.954 50 26 V30"
          className={bandCfg.colorClassName}
          stroke="currentColor"
          strokeWidth={bandCfg.thickness}
          strokeLinecap="round"
          fill="none"
        />

        <rect
          x="10"
          y="30"
          width="12"
          height="20"
          rx={leftCupCfg.radius}
          className={leftCupCfg.colorClassName}
          fill="currentColor"
        />

        <rect
          x="42"
          y="30"
          width="12"
          height="20"
          rx={rightCupCfg.radius}
          className={rightCupCfg.colorClassName}
          fill="currentColor"
        />
      </motion.g>

      <rect
        x={monitorX}
        y={monitorY}
        width={monitorCfg.width}
        height={monitorCfg.height}
        rx={monitorCfg.radius}
        className={monitorCfg.fillColorClassName}
        fill="currentColor"
      />
      <rect
        x={monitorX}
        y={monitorY}
        width={monitorCfg.width}
        height={monitorCfg.height}
        rx={monitorCfg.radius}
        className={monitorCfg.borderColorClassName}
        stroke="currentColor"
        strokeWidth={monitorCfg.strokeWidth}
        fill="none"
      />

      <g
        transform={`translate(${gapCenterX}, ${gapCenterY}) scale(${codeCfg.scale}) translate(-12, -12)`}
        className={codeCfg.colorClassName}
      >
        <motion.path
          d="M9 6 L3 12 L9 18"
          stroke="currentColor"
          strokeWidth={codeCfg.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="14"
          y1="4"
          x2="10"
          y2="20"
          stroke="currentColor"
          strokeWidth={codeCfg.strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M15 6 L21 12 L15 18"
          stroke="currentColor"
          strokeWidth={codeCfg.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </motion.svg>
  );
}
