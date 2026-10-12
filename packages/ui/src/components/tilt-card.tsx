"use client";

import { useRef } from "react";
import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  intensity?: number;
  scale?: number;
  perspective?: number;
  disabled?: boolean;
}

export function TiltCard({
  children,
  intensity = 10,
  scale = 1.02,
  perspective = 900,
  disabled = false,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const move = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (disabled || reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale(${scale})`;
  };
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);
    if (ref.current)
      ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
  };
  return (
    <div
      {...props}
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 180ms cubic-bezier(.22,1,.36,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
