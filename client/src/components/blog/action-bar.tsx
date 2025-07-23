import {
  BookmarkIcon,
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";
import { motion, type Variants } from "motion/react";

const variants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      opacity: { duration: 0.1, ease: "easeOut" },
      y: { type: "spring", damping: 18, stiffness: 100 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 0.05, ease: "easeInOut" },
  },
};

export function ActionBar() {
  return (
    <motion.div
      key="actionbar"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="sticky bottom-0 left-1/2 -translate-x-1/2 z-50 border w-fit bg-white shadow border-gray-200 rounded-full p-3"
    >
      <ul className="flex divide-x-1 divide-neutral-200">
        <li className="px-4">
          <HeartIcon className="w-6 h-6 text-black font-[100]" />
        </li>
        <li className="px-4">
          <MessageCircleIcon className="w-6 h-6 text-black font-light" />
        </li>
        <li className="px-4">
          <BookmarkIcon className="w-6 h-6 text-black font-light" />
        </li>
        <li className="px-4">
          <ShareIcon className="w-6 h-6 text-black font-light" />
        </li>
      </ul>
    </motion.div>
  );
}
