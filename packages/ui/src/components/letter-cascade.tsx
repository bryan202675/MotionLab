"use client";

import { motion, useReducedMotion } from "motion/react";

export interface LetterCascadeProps {
  text: string;
  stagger?: number;
  direction?: "up" | "down";
  className?: string;
}

export function LetterCascade({
  text,
  stagger = 0.025,
  direction = "up",
  className,
}: LetterCascadeProps) {
  const reduceMotion = useReducedMotion();
  return (
    <span className={className} role="img" aria-label={text}>
      <span aria-hidden="true">
        {[...text].map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            initial={{
              y: direction === "up" ? 18 : -18,
              rotate: direction === "up" ? 8 : -8,
              opacity: 0,
            }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 480,
              damping: 24,
              delay: reduceMotion ? 0 : index * stagger,
              duration: reduceMotion ? 0 : undefined,
            }}
            style={{ display: "inline-block", whiteSpace: letter === " " ? "pre" : undefined }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
