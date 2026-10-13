"use client";

import { useRef } from "react";
import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface BorderGlowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glowColor?: string;
  glowSize?: number;
  borderRadius?: string;
}

export function BorderGlow({
  children,
  glowColor = "#5038ff",
  glowSize = 250,
  borderRadius = "0px",
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    if (reduceMotion || !containerRef.current || !glowRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glowRef.current.style.opacity = "1";
    glowRef.current.style.transform = `translate(${x - glowSize / 2}px, ${y - glowSize / 2}px)`;
  };

  const handlePointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      {...props}
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: "relative",
        padding: "2px",
        overflow: "hidden",
        borderRadius,
        backgroundColor: "var(--ink, #101010)",
        ...style,
      }}
    >
      {!reduceMotion && (
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: 0,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "var(--paper, #f4f2ec)",
          color: "var(--ink, #101010)",
          borderRadius: borderRadius !== "0px" ? `calc(${borderRadius} - 2px)` : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
