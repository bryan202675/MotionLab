"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface StarBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color?: string;
  speed?: string;
  thickness?: number;
}

export function StarBorder({
  children,
  color = "#5038ff",
  speed = "5s",
  thickness = 2,
  style,
  ...props
}: StarBorderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      {...props}
      style={{
        position: "relative",
        display: "inline-block",
        padding: `${thickness}px`,
        overflow: "hidden",
        border: "1px solid rgba(128, 128, 128, 0.2)",
        background: "transparent",
        ...style,
      }}
    >
      {!reduceMotion && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "300%",
            height: "300%",
            top: "-100%",
            left: "-100%",
            background: `conic-gradient(from 0deg, transparent 0 340deg, ${color} 360deg)`,
            animation: `ml-star-spin ${speed} linear infinite`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "var(--paper, #f4f2ec)",
          color: "var(--ink, #101010)",
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes ml-star-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
