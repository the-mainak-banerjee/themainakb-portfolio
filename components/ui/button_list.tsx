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
}: ButtonHTMLAttributes<HTMLButtonElement> & { strength?: number }) => {
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

export const SecondaryButton = ({
  children,
  ...props
}: HTMLMotionProps<"button">) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className="group bg-accent relative overflow-hidden px-4 py-2"
      variants={{
        initial: {
          scale: 1,
        },
        hover: {
          scale: 1.03,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        },
      }}
      {...props}
    >
      {/* Animated gradient */}
      <motion.div
        className="from-ring/80 to-ring absolute inset-0 bg-linear-to-br"
        variants={{
          initial: {
            opacity: 0,
            scale: 0.95,
          },
          hover: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
        }}
      />

      {/* Gloss sweep */}
      <motion.div
        className="bg-foreground/80 absolute top-0 -left-full h-full w-1/2 -skew-x-12 blur-xl"
        variants={{
          initial: {
            left: "-100%",
          },
          hover: {
            left: "150%",
            transition: {
              duration: 0.7,
              ease: "easeInOut",
            },
          },
        }}
      />

      {/* Text */}
      <motion.span
        className="relative z-10 block"
        variants={{
          initial: {
            y: 0,
          },
          hover: {
            y: -1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
            },
          },
        }}
      >
        {children}
      </motion.span>

      {/* Top Left */}
      <motion.span
        className="border-ring absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2"
        variants={{
          initial: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          },
          hover: {
            opacity: 0,
            scale: 0.5,
            x: -8,
            y: -8,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          },
        }}
      />

      {/* Top Right */}
      <motion.span
        className="border-ring absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2"
        variants={{
          initial: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          },
          hover: {
            opacity: 0,
            scale: 0.5,
            x: 8,
            y: -8,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          },
        }}
      />

      {/* Bottom Left */}
      <motion.span
        className="border-ring absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2"
        variants={{
          initial: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          },
          hover: {
            opacity: 0,
            scale: 0.5,
            x: -8,
            y: 8,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          },
        }}
      />

      {/* Bottom Right */}
      <motion.span
        className="border-ring absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2"
        variants={{
          initial: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          },
          hover: {
            opacity: 0,
            scale: 0.5,
            x: 8,
            y: 8,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          },
        }}
      />
    </motion.button>
  );
};
