"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
}

export function RippleButton({
  rippleColor = "rgba(255,255,255,.45)",
  children,
  onPointerDown,
  style,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const reduceMotion = useReducedMotion();
  const createRipple = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerDown?.(event);
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = {
      id: Date.now() + Math.random(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((items) => [...items.slice(-2), ripple]);
  };
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      onPointerDown={createRipple}
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        border: 0,
        padding: "14px 20px",
        background: "#5038ff",
        color: "white",
        fontWeight: 800,
        cursor: "pointer",
        ...style,
      }}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          initial={{ opacity: 0.7, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          onAnimationComplete={() =>
            setRipples((items) => items.filter((item) => item.id !== ripple.id))
          }
          style={{
            position: "absolute",
            zIndex: 0,
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            background: rippleColor,
            pointerEvents: "none",
          }}
        />
      ))}
    </button>
  );
}
