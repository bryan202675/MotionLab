"use client";

import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface MetricCounterProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function MetricCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 900,
  style,
  ...props
}: MetricCounterProps) {
  const [displayed, setDisplayed] = useState(value);
  const displayedRef = useRef(value);
  const reduceMotion = useReducedMotion();
  const safeDuration = Number.isFinite(duration) ? duration : 0;
  const precision = Number.isFinite(decimals) ? Math.min(20, Math.max(0, Math.floor(decimals))) : 0;

  useEffect(() => {
    if (!Number.isFinite(value)) return;
    if (reduceMotion || safeDuration <= 0) {
      displayedRef.current = value;
      return;
    }

    const start = displayedRef.current;
    const startedAt = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / safeDuration);
      const eased = 1 - (1 - progress) ** 3;
      const next = start + (value - start) * eased;
      displayedRef.current = next;
      setDisplayed(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, safeDuration, value]);

  const visibleValue = reduceMotion || safeDuration <= 0 ? value : displayed;
  const formatted = visibleValue.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
  const finalValue = value.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  return (
    <span {...props} style={{ display: "inline-grid", gap: 4, ...style }}>
      <span aria-hidden="true" style={{ fontVariantNumeric: "tabular-nums" }}>
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only" aria-live="polite">
        {label}: {prefix}
        {finalValue}
        {suffix}
      </span>
      <span
        aria-hidden="true"
        style={{
          font: "600 10px/1.2 var(--font-mono, monospace)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          opacity: 0.65,
        }}
      >
        {label}
      </span>
    </span>
  );
}
