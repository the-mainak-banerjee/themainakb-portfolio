"use client";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "motion/react";
import {
  Bell,
  Home,
  LucideIcon,
  MessageCircle,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useRef, useState } from "react";

interface MenuItems {
  title: string;
  icon: LucideIcon;
  href: string;
}

const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "#",
  },
  {
    title: "Search",
    icon: Search,
    href: "#",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "#",
  },
  {
    title: "Messages",
    icon: MessageCircle,
    href: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#",
  },
  {
    title: "Profile",
    icon: User,
    href: "#",
  },
];

function FloatingMenu() {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className="mt-6 flex h-dvh flex-col items-center justify-center">
      <div>
        {isMobile ? (
          <FloatingMenuMobile items={menuItems} />
        ) : (
          <FloatingMenuDesktop items={menuItems} />
        )}
      </div>
      <button
        onClick={() => setIsMobile((prev) => !prev)}
        className="my-6 flex cursor-pointer justify-around gap-4 rounded-xl bg-gray-600 text-white px-4 py-2 dark:bg-neutral-800 font-geist-sans"
      >
        {isMobile ? "View Desktop Version" : "View Mobile Version"}
      </button>
    </div>
  );
}

const topVariants: Variants = {
  close: {
    x2: 12,
    y2: 12,
    x1: 28,
    y1: 28,
  },
  open: {
    x1: 10,
    y1: 14,
    x2: 30,
    y2: 14,
  },
};

const bottomVariants: Variants = {
  close: {
    x2: 12,
    y2: 28,
    x1: 28,
    y1: 12,
  },
  open: {
    x1: 10,
    y1: 26,
    x2: 30,
    y2: 26,
  },
};
const menuButtonIconTransition = {
  type: "spring",
  damping: 25,
  stiffness: 300,
} as const;

function FloatingMenuMobile({ items }: { items: MenuItems[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className="absolute inset-x-0 bottom-full mb-2 h-0"
          >
            {items.map((item, idx) => {
              const Icon = item.icon;
              const stackIndex = items.length - 1 - idx;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10, x: 0, filter: "blur(8px)" }}
                  animate={{
                    opacity: 1,
                    y: -stackIndex * 48,
                    x: stackIndex * -2,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    x: 0,
                    filter: "blur(8px)",
                    transition: { delay: idx * 0.05 },
                  }}
                  transition={{
                    delay: stackIndex * 0.05,
                    type: "spring",
                    damping: 30,
                    stiffness: 500,
                  }}
                  className="absolute inset-x-0 bottom-0"
                >
                  <a
                    href={item.href}
                    className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
                  >
                    <Icon />
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
        whileTap={{ scale: 0.8 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
        }}
      >
        <svg viewBox="0 0 40 40" strokeWidth={2} className="stroke-black dark:stroke-white">
          <motion.line
            x1={10}
            y1={14}
            x2={30}
            y2={14}
            animate={isOpen ? "close" : "open"}
            variants={topVariants}
            transition={menuButtonIconTransition}
          />
          <motion.line
            x1={10}
            y1={20}
            x2={30}
            y2={20}
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.2 : 1 }}
            transition={{
              delay: isOpen ? 0 : 0.15,
              ...menuButtonIconTransition,
            }}
          />
          <motion.line
            x1={10}
            y1={26}
            x2={30}
            y2={26}
            animate={isOpen ? "close" : "open"}
            variants={bottomVariants}
            transition={menuButtonIconTransition}
          />
        </svg>
      </motion.button>
    </div>
  );
}
function FloatingMenuDesktop({ items }: { items: MenuItems[] }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex max-h-16 items-end gap-4 rounded-2xl bg-gray-100 px-4 dark:bg-neutral-800"
    >
      {items.map((item) => {
        return <IconContainer key={item.title} mouseX={mouseX} item={item} />;
      })}
    </motion.div>
  );
}

const DISTANCE = 200;
const SIZE = {
  MIN: 40,
  MAX: 80,
};
const ICON_SIZE = {
  MIN: 20,
  MAX: 40,
};
function IconContainer({
  mouseX,
  item,
}: {
  mouseX: MotionValue;
  item: MenuItems;
}) {
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (value) => {
    const bounds = iconContainerRef?.current?.getBoundingClientRect() ?? {
      left: 0,
      width: 0,
    };
    const distanceFromIcon = value - bounds?.left - bounds.width / 2;
    return distanceFromIcon;
  });

  const width = useSpring(
    useTransform(
      distance,
      [-DISTANCE, 0, DISTANCE],
      [SIZE.MIN, SIZE.MAX, SIZE.MIN],
    ),
  );
  const height = useSpring(
    useTransform(
      distance,
      [-DISTANCE, 0, DISTANCE],
      [SIZE.MIN, SIZE.MAX, SIZE.MIN],
    ),
  );

  const iconWidth = useSpring(
    useTransform(
      distance,
      [-DISTANCE, 0, DISTANCE],
      [ICON_SIZE.MIN, ICON_SIZE.MAX, ICON_SIZE.MIN],
    ),
  );
  const iconHeight = useSpring(
    useTransform(
      distance,
      [-DISTANCE, 0, DISTANCE],
      [ICON_SIZE.MIN, ICON_SIZE.MAX, ICON_SIZE.MIN],
    ),
  );

  const Icon = item.icon;

  return (
    <a
      href={item.href}
      className="py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={iconContainerRef}
        key={item.title}
        style={{ width, height }}
        className="relative flex aspect-square cursor-pointer items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-700"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.6 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white dark:bg-white dark:text-black"
            >
              {item.title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="flex items-center justify-center"
          style={{ width: iconWidth, height: iconHeight }}
        >
          <Icon className="h-full w-full" />
        </motion.div>
      </motion.div>
    </a>
  );
}

export default FloatingMenu;
