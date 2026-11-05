"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./reveal";

/**
 * Headline split into lines; each slides up from behind a mask, 80ms apart.
 * Pass `lines` (one string per visual line). Hero and page titles only.
 * `trigger="mount"` plays on mount (hero), "view" plays when scrolled into view.
 */
export function TextLines({
  lines,
  as: Tag = "h1",
  className,
  lineClassName,
  trigger = "view",
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  trigger?: "mount" | "view";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.08em]">
          {reduce ? (
            <span className={lineClassName ? `block ${lineClassName}` : "block"}>{line}</span>
          ) : (
            <motion.span
              className={lineClassName ? `block ${lineClassName}` : "block"}
              initial={{ y: "105%" }}
              {...(trigger === "mount"
                ? { animate: { y: 0 } }
                : { whileInView: { y: 0 }, viewport: { once: true, amount: 0.6 } })}
              transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.08 }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}
