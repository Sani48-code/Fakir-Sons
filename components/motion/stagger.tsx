"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "./reveal";

const MAX_STAGGERED = 8;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const instant = { hidden: {}, show: {} };
// Same keys as `item` so the server-rendered transform is also reset.
const instantItem = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Children appear 60ms apart. Only the first 8 are staggered; the rest are instant. */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  // Always the same element on server and client (see Reveal). Reduced motion = instant.
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={reduce ? instant : container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (index >= MAX_STAGGERED) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Comp className={className} variants={reduce ? instantItem : item}>
      {children}
    </Comp>
  );
}
