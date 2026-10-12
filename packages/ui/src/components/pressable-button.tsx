"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

export interface PressableButtonProps extends HTMLMotionProps<"button"> {
  variant?: "ink" | "acid" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const palette = {
  ink: { background: "#101010", color: "#f4f2ec" },
  acid: { background: "#dfff00", color: "#101010" },
  outline: { background: "transparent", color: "inherit" },
} as const;

const spacing = {
  sm: { padding: "8px 12px", fontSize: 12 },
  md: { padding: "12px 18px", fontSize: 14 },
  lg: { padding: "16px 24px", fontSize: 16 },
} as const;

export function PressableButton({
  variant = "ink",
  size = "md",
  loading = false,
  disabled,
  style,
  children,
  ...props
}: PressableButtonProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      {...props}
      type={props.type ?? "button"}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      style={{
        ...palette[variant],
        ...spacing[size],
        border: "2px solid currentColor",
        fontWeight: 800,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        ...style,
      }}
      whileHover={{ y: -2, x: -2, boxShadow: "4px 4px 0 currentColor" }}
      whileTap={{ y: 2, x: 2, boxShadow: "0 0 0 currentColor" }}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 30 }}
    >
      {loading ? <span role="status">Working…</span> : children}
    </motion.button>
  );
}
