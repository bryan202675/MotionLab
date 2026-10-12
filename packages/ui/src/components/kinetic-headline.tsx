"use client";

import { motion, useReducedMotion } from "motion/react";

export interface KineticHeadlineProps {
  text: string;
  stagger?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function KineticHeadline({
  text,
  stagger = 0.08,
  duration = 0.55,
  distance = 24,
  className,
}: KineticHeadlineProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div role="heading" aria-level={2} aria-label={text} className={className}>
      <span aria-hidden="true">
        {text.split(/\s+/).map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: distance, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 30,
              delay: reduceMotion ? 0 : index * stagger,
              duration: reduceMotion ? 0 : duration,
            }}
            style={{ display: "inline-block", marginInlineEnd: ".22em" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </div>
  );
}
