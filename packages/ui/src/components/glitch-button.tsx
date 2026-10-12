"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

export interface GlitchButtonProps extends HTMLMotionProps<"button"> {
  label: string;
  color?: string;
}

export function GlitchButton({ label, color = "#dfff00", style, ...props }: GlitchButtonProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      {...props}
      type={props.type ?? "button"}
      style={{
        position: "relative",
        border: "2px solid currentColor",
        padding: "14px 20px",
        fontFamily: "monospace",
        fontWeight: 800,
        background: "transparent",
        color: "inherit",
        cursor: "pointer",
        ...style,
      }}
      whileHover={{ x: [0, -2, 2, -1, 0], skewX: [0, -3, 2, 0] }}
      transition={{
        duration: reduceMotion ? 0 : 0.26,
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          color,
          opacity: 0,
          pointerEvents: "none",
        }}
        className="ml-glitch-echo"
      >
        {label}
      </span>
    </motion.button>
  );
}
