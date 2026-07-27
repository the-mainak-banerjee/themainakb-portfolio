"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

interface CardItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  text: string;
}

const MotionImage = motion.create(Image);

export const destinations: CardItem[] = [
  {
    title: "Prague",
    subtitle: "The City of a Hundred Spires",
    description:
      "Discover Prague's charming streets, medieval architecture, and breathtaking castle views along the Vltava River.",
    text: "A timeless European destination filled with history, culture, and stunning Gothic landmarks.",
    image: "/images/labs/prague.jpg",
  },
  {
    title: "Tokyo",
    subtitle: "Where Tradition Meets Tomorrow",
    description:
      "Experience Tokyo's vibrant neighborhoods, world-class cuisine, and futuristic skyline alongside ancient temples.",
    text: "From neon-lit streets to peaceful shrines, Tokyo offers an unforgettable blend of old and new.",
    image: "/images/labs/tokyo.jpg",
  },
  {
    title: "Japan",
    subtitle: "Land of Endless Wonders",
    description:
      "Explore Japan's breathtaking landscapes, rich traditions, cherry blossoms, and iconic cultural heritage.",
    text: "A journey through majestic mountains, historic towns, and modern cities that never stop inspiring.",
    image: "/images/labs/japan.jpg",
  },
  {
    title: "Cityscape",
    subtitle: "The Pulse of Modern Living",
    description:
      "Admire towering skyscrapers, glowing city lights, and dynamic urban life from breathtaking viewpoints.",
    text: "An energetic skyline showcasing architectural brilliance and the rhythm of city life.",
    image: "/images/labs/cityspace.jpg",
  },
];

const cardTransition = {
  type: "spring",
  stiffness: 180,
  damping: 28,
  mass: 1.2,
} as const;

function AppStoreGrid() {
  const [selectedDestination, setSelectedDestination] =
    useState<CardItem | null>(null);
  return (
    <div className="w-full px-4 lg:w-4xl lg:mx-auto py-4 space-y-4 relative overflow-auto">
      <h2 className="font-bold text-2xl">Destinations</h2>
      {/* Card Grid Block */}
      <div className="grid md:grid-cols-2 auto-rows-80 gap-4">
        {destinations.map((item) => {
          return (
            <motion.button
              layoutId={`card_item_${item.title}`}
              className="relative text-left cursor-pointer inline-block rounded-lg overflow-hidden"
              key={item.title}
              onClick={() => setSelectedDestination(item)}
              transition={cardTransition}
            >
              <motion.div
                layoutId={`card_image_wrapper_${item.title}`}
                className="w-full h-full relative overflow-hidden aspect-3/4"
                transition={cardTransition}
              >
                <MotionImage
                  layoutId={`card_image_${item.title}`}
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  transition={cardTransition}
                />
              </motion.div>
              <motion.div
                layoutId={`card_semidetails_${item.title}`}
                className="absolute bottom-4 left-4  text-white flex flex-col gap-1"
              >
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="text-sm opacity-80">{item.subtitle}</p>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {selectedDestination && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 h-full w-full bg-white/40 backdrop-blur-sm"
            />
            <div
              className="absolute top-0 left-0 right-0 h-full flex lg:justify-center lg:items-center"
              onClick={() => setSelectedDestination(null)} // This is not a right approch we should use a custom hook for the outside click functionality
            >
              <motion.div
                layoutId={`card_item_${selectedDestination.title}`}
                className="w-full lg:w-3xl relative bg-white lg:bg-transparent lg:rounded-lg overflow-hidden"
                transition={cardTransition}
              >
                <motion.div
                  layoutId={`card_image_wrapper_${selectedDestination.title}`}
                  className="w-full h-96 aspect-3/4 relative overflow-hidden"
                  transition={cardTransition}
                >
                  <MotionImage
                    layoutId={`card_image_${selectedDestination.title}`}
                    src={selectedDestination.image}
                    alt={selectedDestination.title}
                    fill
                    className="object-cover"
                    transition={cardTransition}
                  />
                </motion.div>
                <motion.div
                  layoutId={`card_semidetails_${selectedDestination.title}`}
                  className="absolute top-4 left-4  text-white flex flex-col gap-1"
                >
                  <h4 className="text-xl font-semibold">
                    {selectedDestination.title}
                  </h4>
                  <p className="text-sm opacity-80">
                    {selectedDestination.subtitle}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  className="px-6 py-4 space-y-3 bg-white text-black"
                >
                  <p>{selectedDestination.description}</p>
                  <p>{selectedDestination.text}</p>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white text-black rounded-full p-3 flex items-center justify-center absolute right-4 top-4"
                >
                  <X size={16} />
                </motion.button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AppStoreGrid;
