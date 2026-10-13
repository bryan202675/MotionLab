"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { FocusEvent, ReactNode } from "react";

export interface InfiniteMarqueeProps {
  children: ReactNode;
  duration?: number;
  direction?: "left" | "right";
  gap?: number;
  pauseOnHover?: boolean;
  className?: string;
  repeat?: number;
}

export function InfiniteMarquee({
  children,
  duration = 22,
  direction = "left",
  gap = 48,
  pauseOnHover = true,
  className,
  repeat = 4,
}: InfiniteMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const toggleFocus = (event: FocusEvent<HTMLDivElement>, value: boolean) => {
    if (pauseOnHover && !event.currentTarget.contains(event.relatedTarget as Node | null))
      setPaused(value);
  };
  return (
    <div
      className={className}
      style={{ overflow: "hidden", maxWidth: "100%" }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onFocusCapture={(event) => toggleFocus(event, true)}
      onBlurCapture={(event) => toggleFocus(event, false)}
    >
      <motion.div
        animate={
          reduceMotion || paused
            ? undefined
            : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={{ duration, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", width: "max-content", gap, willChange: "transform" }}
      >
        {[0, 1].map((half) => (
          <div
            key={half}
            aria-hidden={half > 0}
            inert={half > 0}
            style={{ display: "flex", gap, flexShrink: 0 }}
          >
            {Array.from({ length: Math.max(1, repeat) }).map((_, i) => (
              <span
                key={i}
                style={{ display: "inline-flex", gap, alignItems: "center", flexShrink: 0 }}
              >
                {children}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
