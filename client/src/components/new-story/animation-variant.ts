import type { Variants } from "motion/react";

export const formVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.3, ease: "easeOut" },
      scale: { type: "spring", damping: 12, stiffness: 180 },
      y: { type: "spring", damping: 20, stiffness: 100 },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};
