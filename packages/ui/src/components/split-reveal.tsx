"use client";

import { motion, useReducedMotion } from "motion/react";

export interface SplitRevealProps {
  text: string;
  stagger?: number;
  once?: boolean;
  className?: string;
}

export function SplitReveal({ text, stagger = 0.12, once = true, className }: SplitRevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-label={text.replaceAll("\n", " ")} className={className}>
      <span aria-hidden="true">
        {text.split("\n").map((line, index) => (
          <span key={`${line}-${index}`} style={{ display: "block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "block" }}
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once, amount: 0.4 }}
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
