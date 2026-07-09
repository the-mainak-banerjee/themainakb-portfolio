"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, MouseEvent, useRef, useState } from "react";
import { motion } from "motion/react";

export type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
};

export const MagneticButton = ({
  children,
  className,
  strength = 0.2,
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { width, height, top, left } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const { clientX, clientY } = e;
    const x_position = clientX - centerX;
    const y_position = clientY - centerY;
    setPosition({ x: x_position * strength, y: y_position * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const hasMoved = position.x !== 0 || position.y !== 0;
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "w-fit border border-dashed transition-colors duration-150",
        hasMoved ? "border-ring bg-ring/30" : "border-transparent",
      )}
    >
      <motion.div
        ref={ref}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.3 }}
        className="w-fit"
      >
        <button
          className={cn(
            "bg-foreground hover:from-ring/60 hover:to-ring text-secondary hover:dark:text-foreground px-4 py-2 font-medium backdrop-blur transition-all duration-150 hover:bg-linear-to-br active:scale-95",
            className,
          )}
          {...props}
        >
          {children}
        </button>
      </motion.div>
    </div>
  );
};
