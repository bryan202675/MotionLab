"use client";

import { useRef, useState, useEffect } from "react";
import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  intensity?: number;
  scale?: number;
  perspective?: number;
  disabled?: boolean;
  glare?: boolean;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  intensity = 12,
  scale = 1.02,
  perspective = 900,
  disabled = false,
  glare = true,
  glareOpacity = 0.25,
  onPointerMove,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  style,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isInteracting, setIsInteracting] = useState(false);
  const rafRef = useRef<number | null>(null);

  const updateTransform = (clientX: number, clientY: number, target: HTMLElement) => {
    if (disabled || reduceMotion || !cardRef.current) return;
    const rect = target.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.transition = "none";
      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare && glareRef.current) {
        const glareX = ((x + 0.5) * 100).toFixed(1);
        const glareY = ((y + 0.5) * 100).toFixed(1);
        glareRef.current.style.opacity = `${glareOpacity}`;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 65%)`;
      }
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    updateTransform(event.clientX, event.clientY, event.currentTarget);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event);
    setIsInteracting(true);
    updateTransform(event.clientX, event.clientY, event.currentTarget);
  };

  const reset = (event?: PointerEvent<HTMLDivElement>) => {
    if (event) onPointerLeave?.(event);
    setIsInteracting(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)";
      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
    if (glare && glareRef.current) {
      glareRef.current.style.transition = "opacity 450ms cubic-bezier(0.22, 1, 0.36, 1)";
      glareRef.current.style.opacity = "0";
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    onPointerUp?.(event);
    reset();
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(event);
    reset();
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      {...props}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={reset}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        willChange: isInteracting ? "transform" : "auto",
        touchAction: "pan-y",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
      {glare && !reduceMotion && !disabled && (
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0,
            mixBlendMode: "overlay",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
