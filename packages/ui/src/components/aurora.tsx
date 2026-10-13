"use client";

import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface AuroraProps extends HTMLAttributes<HTMLDivElement> {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

export function Aurora({
  colorStops = ["#5038ff", "#dfff00", "#ff5638"],
  amplitude = 1.2,
  blend = 0.65,
  speed = 12,
  style,
  ...props
}: AuroraProps) {
  const reduceMotion = useReducedMotion();

  const c1 = colorStops[0] ?? "#5038ff";
  const c2 = colorStops[1] ?? "#dfff00";
  const c3 = colorStops[2] ?? "#ff5638";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "transparent",
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage: `
            radial-gradient(ellipse 60% 45% at 20% 30%, ${c1} 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 75% 65%, ${c2} 0%, transparent 60%),
            radial-gradient(ellipse 70% 35% at 50% 85%, ${c3} 0%, transparent 60%)
          `,
          filter: `blur(${40 * amplitude}px)`,
          opacity: blend,
          animation: reduceMotion ? "none" : `aurora-spin ${speed}s ease-in-out infinite alternate`,
          pointerEvents: "none",
        }}
      />
      <style>{`
        @keyframes aurora-spin {
          0% {
            transform: translate3d(-4%, -6%, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate3d(5%, 3%, 0) rotate(12deg) scale(1.08);
          }
          100% {
            transform: translate3d(-3%, 7%, 0) rotate(-10deg) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
