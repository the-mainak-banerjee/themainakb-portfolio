"use client";

import {
  useMotionValue,
  useSpring,
  motion,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { MouseEvent, useRef } from "react";

const ROTATE_DEPTH = 15;
const TRANSLATE_DEPTH = 20;

export default function TiltCardSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x);
  const springY = useSpring(y);

  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [`-${ROTATE_DEPTH}deg`, `${ROTATE_DEPTH}deg`],
  );

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [`${ROTATE_DEPTH}deg`, `-${ROTATE_DEPTH}deg`],
  );

  const translateX = useTransform(
    springX,
    [-0.5, 0.5],
    [`-${TRANSLATE_DEPTH}px`, `${TRANSLATE_DEPTH}px`],
  );

  const translateY = useTransform(
    springY,
    [-0.5, 0.5],
    [`-${TRANSLATE_DEPTH}px`, `${TRANSLATE_DEPTH}px`],
  );

  const gradientX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const gradientY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const gradientBg = useMotionTemplate`radial-gradient(circle 200px at ${gradientX}% ${gradientY}%,rgba(200,243,29,0.18),transparent 70%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const mouseXBasedOnContainer = clientX - left;
    const mouseYBasedOnContainer = clientY - top;

    const xPct = mouseXBasedOnContainer / width - 0.5;
    const yPct = mouseYBasedOnContainer / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-distant transform-3d max-md:mx-2">
      <motion.div
        ref={containerRef}
        className="relative h-70 overflow-hidden rounded-[18px] border border-[#2a2a2e] bg-linear-to-br from-[#17171a] to-[#0e0e10]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.02,
          z: 50,
          transition: { duration: 0.2 },
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: gradientBg,
          }}
          transition={{ duration: 0.2 }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-7">
          <span className="w-fit rounded-full border border-[#c8f31d]/30 px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#c8f31d] uppercase">
            Component
          </span>

          <div>
            <h2 className="m-0 text-xl font-semibold text-white">Tilt Card Spotlight</h2>
            <p className="mt-1.5 text-sm text-[#9a9aa0]">
              Cursor-driven 3D tilt with a dynamic spotlight highlight.
            </p>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] text-[#9a9aa0]">
            <span>Framer Motion · React</span>
            <span>move your cursor →</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
