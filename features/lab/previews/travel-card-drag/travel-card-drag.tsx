"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import { Typography } from "@/components/ui/typography";

export const INDIAN_PLACES = [
  {
    title: "Taj Mahal",
    image: "/images/labs/tajmahal.jpg",
  },
  {
    title: "Jaipur",
    image: "/images/labs/jaipur.jpg",
  },
  {
    title: "Goa",
    image: "/images/labs/goa.jpg",
  },
  {
    title: "Kerala Backwaters",
    image: "/images/labs/kerala.jpg",
  },
  {
    title: "Ladakh",
    image: "/images/labs/ladakh.jpg",
  },
  {
    title: "Darjeeling",
    image: "/images/labs/darjeeling.jpg",
  },
  {
    title: "India Gate",
    image: "/images/labs/indiagate.jpg",
  },
  {
    title: "Mumbai",
    image: "/images/labs/mumbai.jpg",
  },
];

interface CardProps {
  item: (typeof INDIAN_PLACES)[number];
  index: number;
  total: number;
  handleDragEnd?: () => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};

function Card({ item, index, total, handleDragEnd }: CardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ zIndex: total - index, x, rotate }}
      animate={{ y: `${-index * 6}%`, scale: 1 - index * 0.05 }}
      drag="x"
      dragConstraints={{
        left: -200,
        right: 200,
      }}
      dragElastic={0.08}
      dragSnapToOrigin={true}
      onDragEnd={() => {
        if (x.get() > -80 && x.get() < 80) return;
        animate(x, 0, springTransition);
        handleDragEnd?.();
      }}
      transition={springTransition}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="288px"
          className="pointer-events-none object-cover"
        />
      </div>
      <p className="font-inter absolute top-6 left-4 z-20 text-lg font-bold uppercase">
        {item.title}
      </p>
      <div className="absolute inset-0 h-full w-full rounded-md bg-black/30 mask-b-from-20%" />
    </motion.div>
  );
}

function TravelCardDrag() {
  const [places, setPlaces] = useState(INDIAN_PLACES);
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="relative flex h-96 w-72 items-center justify-center">
        {places.map((item, index) => {
          return (
            <Card
              key={item.title}
              item={item}
              index={index}
              total={places.length}
              handleDragEnd={() =>
                setPlaces((prev) => {
                  return index === 0
                    ? [...prev.slice(1), prev[0]]
                    : [
                        prev[index],
                        ...prev.filter(
                          (prevItem) => prevItem.title !== item.title,
                        ),
                      ];
                })
              }
            />
          );
        })}
      </div>
      <Typography variant="caption-sm" className="text-xs absolute top-4 right-0">
        Drag any card to interact with the stack.
      </Typography>
    </div>
  );
}

export default TravelCardDrag;
