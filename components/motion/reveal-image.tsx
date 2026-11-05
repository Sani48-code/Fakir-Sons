"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";
import { EASE } from "./reveal";

/**
 * Large editorial image uncovered by a clip-path wipe from the bottom
 * (900ms) with a slight 1.06 -> 1 scale. Wrap an <Img>.
 *
 * The in-view observer watches the outer, unclipped wrapper. (Observing the
 * clipped element itself never fires, which left the image invisible.)
 */
export function RevealImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: inView ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.06 }}
          animate={{ scale: inView ? 1 : 1.06 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
