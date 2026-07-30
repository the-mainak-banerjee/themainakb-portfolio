"use client";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const GooeyFilter = () => {
  return (
    <svg aria-hidden="true" className="absolute hidden h-0 w-0">
      <defs>
        <filter id="goo-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const ACTION_WIDTH = 96;
const ITEMS_GAP = 8;
const ARM_RATIO = 0.6;

function SwipeActionCard() {
  const cardRef = useRef<HTMLButtonElement>(null);
  const armTimerRef = useRef<NodeJS.Timeout>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [showEditButton, setShowEditButton] = useState(false);
  const ARM_THRESHOLD = cardWidth * ARM_RATIO || 220;

  const [scope, animate] = useAnimate();
  const cardX = useMotionValue(0);
  const deleteButtonLabelOpacity = useTransform(
    cardX,
    [-16, -ACTION_WIDTH],
    [0, 1],
  );
  const editButtonLabelOpacity = useTransform(
    cardX,
    [-(ACTION_WIDTH + 16), -(ACTION_WIDTH * 2)],
    [0, 1],
  );

  const deleteButtonWidthRaw = useTransform(cardX, (latest) => {
    const dragged = Math.abs(latest);
    if (dragged < ARM_THRESHOLD) {
      return ACTION_WIDTH;
    }

    return Math.max(ACTION_WIDTH, dragged - ITEMS_GAP);
  });

  const deleteButtonWidth = useSpring(deleteButtonWidthRaw, {
    stiffness: 400,
    damping: 30,
    mass: 1,
  });

  useMotionValueEvent(cardX, "change", (latest) => {
    const dragged = Math.abs(latest);
    const hidePoint = ARM_THRESHOLD - 1;

    if (dragged >= hidePoint && showEditButton) {
      setShowEditButton(false);
    } else if (dragged <= hidePoint && !showEditButton) {
      setShowEditButton(true);
    }
  });

  const runActionSequence = () => {
    animate(
      scope.current,
      { opacity: 0, marginBottom: 0, x: -500 },
      { duration: 0.5, ease: "easeInOut" },
    );
  };

  const clearArmTimer = useCallback(() => {
    if (armTimerRef.current) {
      clearTimeout(armTimerRef.current);
      armTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearArmTimer, [clearArmTimer]);

  const handleDrag = () => {
    const current = Math.abs(cardX.get());
    const actionThreshold = cardWidth * (ARM_RATIO + 0.2);
    if (current > actionThreshold) {
      if (!armTimerRef.current) {
        armTimerRef.current = setTimeout(() => {
          armTimerRef.current = null;
          if (Math.abs(cardX.get()) > actionThreshold) {
            runActionSequence();
          }
        }, 555);
      }
    } else if (armTimerRef.current) {
      clearArmTimer();
    }
  };

  const handleDragEnd = () => {
    const current = Math.abs(cardX.get());
    const shouldOpen = current > ACTION_WIDTH / 2;
    const target = shouldOpen ? -(ACTION_WIDTH * 2 + ITEMS_GAP * 2 + 2) : 0;
    animate(cardX, target, { ease: "easeInOut", duration: 0.3 });
  };

  const handleClick = () => {
    const current = cardX.get();

    if (current !== 0) {
      animate(cardX, 0, { ease: "easeInOut", duration: 0.3 });
    }
  };

  useEffect(() => {
    if (!cardRef.current) return;
    const measure = () =>
      setCardWidth(cardRef.current?.getBoundingClientRect().width ?? 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      ref={scope}
      className="relative p-2"
      style={{ filter: "url(#goo-effect)" }}
    >
      <GooeyFilter />
      <AnimatePresence initial={false}>
        {showEditButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            style={{
              width: ACTION_WIDTH,
              right: ITEMS_GAP + ACTION_WIDTH + 10,
            }}
            className="absolute z-10 top-2 py-6 px-6 rounded-2xl bg-[#304cff] text-white h-[calc(100%-1rem)]"
          >
            <motion.span style={{ opacity: editButtonLabelOpacity }}>
              Edit
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
      <motion.button
        style={{ width: deleteButtonWidth }}
        className="absolute top-2 right-2.5 z-20 py-6 px-6 rounded-2xl bg-[#FF3B30] text-white h-[calc(100%-1rem)]"
      >
        <motion.span style={{ opacity: deleteButtonLabelOpacity }}>
          Delete
        </motion.span>
      </motion.button>
      <motion.button
        ref={cardRef}
        drag="x"
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        dragConstraints={{ right: 0, left: -384 }}
        dragElastic={0.1}
        style={{ x: cardX }}
        className="inline-block w-96 py-6 px-6 rounded-2xl bg-white text-[#1C1C1E] z-50 relative shadow-sm shadow-black/5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E5E5EA] rounded-full"></div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-[#1C1C1E]">John Doe</h3>
            <p className="text-sm text-[#8E8E93]">john.doe@example.com</p>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

export default SwipeActionCard;
