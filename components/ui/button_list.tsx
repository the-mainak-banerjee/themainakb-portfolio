"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";
import { ButtonHTMLAttributes, MouseEvent, useRef, useState } from "react";

// export const PrimaryButton = ({
//   children,
//   className,
//   ...props
// }: ComponentProps<"button">) => {
//   return (
//     <button className={cn("group relative inline-block", className)} {...props}>
//       <span className="border-ring absolute inset-0 h-1/2 w-1/6 border-t-2 border-l-2 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-active:scale-95" />
//       <span className="border-ring absolute -right-3 -bottom-3 h-1/2 w-1/6 border-r-2 border-b-2 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-active:scale-95" />

//       <span className="border-foreground/80 dark:from-foreground/40 from-foreground/60 to-foreground text-secondary group-hover:dark:from-foreground group-hover:dark:to-foreground/40 group-hover:from-foreground group-hover:to-foreground/60 text-shadow-accent relative block border-2 bg-linear-to-br px-4 py-2 font-medium transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-active:scale-95">
//         {children}
//       </span>
//     </button>
//   );
// };

export const PrimaryButton = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"button">) => {
  return (
    <motion.button
      className={cn("relative inline-block", className)}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.span
        className="border-ring absolute inset-0 h-1/2 w-1/6 border-t-2 border-l-2"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <motion.span
        className="border-ring absolute -right-3 -bottom-3 h-1/2 w-1/6 border-r-2 border-b-2"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <motion.span
        className="border-foreground/80 dark:from-foreground/40 from-foreground/60 to-foreground text-shadow-accent hover:dark:from-foreground hover:dark:to-foreground/40 hover:from-foreground hover:to-foreground/60 text-secondary relative block border-2 bg-linear-to-br px-4 py-2 font-medium"
        variants={{
          initial: {
            x: 0,
            y: 0,
          },
          hover: {
            x: 6,
            y: 6,
          },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};


export const MagneticButton = ({
  children,
  className,
  strength = 0.2,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { strength?: number}) => {
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
        "w-fit rounded-md border border-dashed transition-colors duration-150",
        hasMoved ? "border-ring" : "border-transparent",
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
            "dark:from-foreground/40 from-foreground/60 to-foreground text-secondary hover:dark:from-foreground hover:dark:to-foreground/40 hover:from-foreground hover:to-foreground/60 rounded-lg bg-linear-to-br px-4 py-2 font-medium backdrop-blur transition-all duration-150 active:scale-95",
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
