"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
}

export function ShinyButton({
  children,
  shimmerColor = "rgba(255, 255, 255, 0.4)",
  shimmerSize = "0.15em",
  borderRadius = "0px",
  shimmerDuration = "3s",
  style,
  ...props
}: ShinyButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      {...props}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 24px",
        font: "700 13px var(--font-mono, monospace)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--ink, #101010)",
        backgroundColor: "var(--paper, #f4f2ec)",
        border: "2px solid var(--ink, #101010)",
        borderRadius,
        cursor: "pointer",
        overflow: "hidden",
        boxShadow: "4px 4px 0 var(--ink, #101010)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {children}
      </span>
      {!reduceMotion && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateX(-100%)",
            background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
            animation: `ml-shimmer ${shimmerDuration} infinite`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
      <style>{`
        @keyframes ml-shimmer {
          0% {
            transform: translateX(-100%);
          }
          40%, 100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </button>
  );
}
