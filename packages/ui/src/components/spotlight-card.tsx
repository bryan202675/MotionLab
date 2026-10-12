"use client";

import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color?: string;
  radius?: number;
}

export function SpotlightCard({
  children,
  color = "rgba(223,255,0,.2)",
  radius = 180,
  onPointerMove,
  style,
  ...props
}: SpotlightCardProps) {
  const reduceMotion = useReducedMotion();
  const move = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };
  return (
    <div
      {...props}
      onPointerMove={move}
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        backgroundImage: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 70%)`,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: -1, background: "#131313" }}
      />
      {children}
    </div>
  );
}
