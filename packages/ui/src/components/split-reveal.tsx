"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";

export interface SplitRevealProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  stagger?: number;
  once?: boolean;
}

export function SplitReveal({
  text,
  stagger = 0.12,
  once = true,
  className,
  style,
  ...props
}: SplitRevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      {...props}
      aria-label={text.replaceAll("\n", " ")}
      className={className}
      style={{
        display: "inline-block",
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ display: "block" }}>
        {text.split("\n").map((line, index) => (
          <span key={`${line}-${index}`} style={{ display: "block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "block" }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : index * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  );
}
