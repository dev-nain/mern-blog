import { motion } from "motion/react";
import { useLocation } from "react-router";
import type { PropsWithChildren } from "react";

type Props = {
  className?: string;
} & PropsWithChildren;

export default function PageTransition({ children, className }: Props) {
  const location = useLocation();

  return (
    <motion.div
      className={className}
      key={location.pathname}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
