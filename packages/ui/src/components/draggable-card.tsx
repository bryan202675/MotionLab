"use client";

import { useMotionValue } from "motion/react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface DraggableCardProps {
  children: ReactNode;
  bounds?: number;
  axis?: "x" | "y" | "both";
  className?: string;
  style?: CSSProperties;
  label?: string;
  onPositionChange?: (x: number, y: number) => void;
}

export function DraggableCard({
  children,
  bounds = 100,
  axis = "both",
  className,
  style,
  label = "Draggable card",
  onPositionChange,
}: DraggableCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const keyboardMove = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 20 : 8;
    let changed = true;
    if (event.key === "ArrowRight" && axis !== "y") x.set(Math.min(bounds, x.get() + step));
    else if (event.key === "ArrowLeft" && axis !== "y") x.set(Math.max(-bounds, x.get() - step));
    else if (event.key === "ArrowDown" && axis !== "x") y.set(Math.min(bounds, y.get() + step));
    else if (event.key === "ArrowUp" && axis !== "x") y.set(Math.max(-bounds, y.get() - step));
    else changed = false;
    if (changed) {
      event.preventDefault();
      onPositionChange?.(x.get(), y.get());
    }
  };
  return (
    <motion.div
      drag={axis === "both" ? true : axis}
      dragConstraints={{ top: -bounds, right: bounds, bottom: bounds, left: -bounds }}
      dragElastic={0.18}
      dragMomentum={!reduceMotion}
      onDragEnd={() => onPositionChange?.(x.get(), y.get())}
      onKeyDown={keyboardMove}
      tabIndex={0}
      aria-roledescription="draggable card"
      role="group"
      aria-label={label}
      className={className}
      style={{
        x,
        y,
        touchAction: axis === "x" ? "pan-y" : axis === "y" ? "pan-x" : "none",
        cursor: "grab",
        ...style,
      }}
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}
