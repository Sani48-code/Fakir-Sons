"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Ken Burns for hero slides: scale 1 -> 1.08 over 8s. Remount (key) to restart. */
export function SlowZoom({
  children,
  className,
  active = true,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: active ? 1.08 : 1 }}
      transition={{ duration: active ? 8 : 0, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
