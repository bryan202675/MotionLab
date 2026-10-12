"use client";

import { useRef } from "react";
import type { HTMLAttributes, PointerEvent } from "react";
import { useReducedMotion } from "motion/react";

export interface GridWarpProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  spacing?: number;
  intensity?: number;
}

export function GridWarp({
  color = "rgba(16,16,16,.32)",
  spacing = 40,
  intensity = 5,
  style,
  onPointerMove,
  ...props
}: GridWarpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const move = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale(1.04)`;
    ref.current.style.backgroundPosition = `${x * 12}px ${y * 12}px`;
  };
  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
      ref.current.style.backgroundPosition = "center";
    }
  };
  return (
    <div
      {...props}
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        transition: "transform .25s ease-out, background-position .25s ease-out",
        transformStyle: "preserve-3d",
        ...style,
      }}
    />
  );
}
