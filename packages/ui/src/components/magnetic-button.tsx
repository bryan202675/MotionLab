"use client";

import type { PointerEvent, PointerEventHandler } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export interface MagneticButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "onPointerMove" | "onPointerLeave"
> {
  strength?: number;
  radius?: number;
  onPointerMove?: PointerEventHandler<HTMLButtonElement>;
  onPointerLeave?: PointerEventHandler<HTMLButtonElement>;
}

export function MagneticButton({
  strength = 0.22,
  radius = 120,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 420, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 420, damping: 30 });
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerMove?.(event);
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    const ratio = Math.min(1, radius / Math.max(Math.hypot(dx, dy), 1));
    x.set(dx * strength * ratio);
    y.set(dy * strength * ratio);
  };
  const leave = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerLeave?.(event);
    x.set(0);
    y.set(0);
  };
  return (
    <motion.button
      {...props}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ ...style, x, y }}
      whileTap={{ scale: 0.97 }}
      transition={reduceMotion ? { duration: 0 } : undefined}
    />
  );
}
