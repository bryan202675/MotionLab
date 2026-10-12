"use client";

import { useRef, useEffect } from "react";
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
  intensity = 6,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: GridWarpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const move = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (reduceMotion || !ref.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.style.transition = "none";
      ref.current.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.04, 1.04, 1.04)`;
      ref.current.style.backgroundPosition = `${x * 14}px ${y * 14}px`;
    });
  };

  const reset = (event: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (ref.current) {
      ref.current.style.transition = "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), background-position 400ms cubic-bezier(0.22, 1, 0.36, 1)";
      ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      ref.current.style.backgroundPosition = "center";
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
        transformStyle: "preserve-3d",
        touchAction: "pan-y",
        ...style,
      }}
    />
  );
}
