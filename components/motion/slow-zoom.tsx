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
  // Same element on server and client (see Reveal); reduced motion = no zoom.
  const zoom = active && !reduce;
  return (
    <motion.div
      className={className}
      initial={{ scale: 1 }}
      animate={{ scale: zoom ? 1.08 : 1 }}
      transition={{ duration: zoom ? 8 : 0, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
