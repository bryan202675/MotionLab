"use client";

import { useEffect, useState } from "react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface CountUpProps extends HTMLAttributes<HTMLSpanElement> {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  prefix = "",
  suffix = "",
  decimals = 0,
  style,
  ...props
}: CountUpProps) {
  const [value, setValue] = useState(from);
  const reduceMotion = useReducedMotion();
  const displayValue = reduceMotion ? to : value;

  useEffect(() => {
    if (reduceMotion) return;

    let startTime: number | null = null;
    let frameId: number;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const current = from + (to - from) * easedProgress;

      setValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(to);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [to, from, duration, reduceMotion]);

  return (
    <span
      style={{
        display: "inline-block",
        fontVariantNumeric: "tabular-nums",
        fontFamily: "var(--font-mono, monospace)",
        ...style,
      }}
      {...props}
    >
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}
