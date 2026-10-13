"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface RotatingTextProps extends HTMLAttributes<HTMLSpanElement> {
  words: string[];
  duration?: number;
  color?: string;
}

export function RotatingText({
  words,
  duration = 2400,
  color,
  style,
  ...props
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || words.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration, reduceMotion]);

  return (
    <span
      {...props}
      style={{
        display: "inline-flex",
        position: "relative",
        verticalAlign: "top",
        overflow: "hidden",
        height: "1.2em",
        ...style,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, rotateX: -60 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-100%", opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "inline-block",
            color: color ?? "inherit",
            transformOrigin: "center bottom",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
