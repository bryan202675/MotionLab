"use client";

import { motion } from "motion/react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface BlurTextProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
}

export function BlurText({
  text,
  delay = 0.04,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
  ...props
}: BlurTextProps) {
  const reduceMotion = useReducedMotion();
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(12px)", opacity: 0, y: -20 }
      : { filter: "blur(12px)", opacity: 0, y: 20 };

  const defaultTo = { filter: "blur(0px)", opacity: 1, y: 0 };

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: animateBy === "words" ? "0.3em" : "0.02em",
        ...style,
      }}
      {...props}
    >
      {elements.map((el, i) => (
        <motion.span
          key={`${el}-${i}`}
          initial={reduceMotion ? { opacity: 1 } : defaultFrom}
          animate={defaultTo}
          transition={{
            duration: 0.6,
            delay: i * delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
        >
          {el === " " ? "\u00A0" : el}
        </motion.span>
      ))}
    </span>
  );
}
