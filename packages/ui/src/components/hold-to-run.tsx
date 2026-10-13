"use client";

import { useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, KeyboardEvent, PointerEvent } from "react";
import { useReducedMotion } from "motion/react";

export interface HoldToRunProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  duration?: number;
  label?: string;
  completeLabel?: string;
  onComplete?: () => void;
}

export function HoldToRun({
  duration = 850,
  label = "Hold to run",
  completeLabel = "Sequence started",
  onComplete,
  style,
  ...props
}: HoldToRunProps) {
  const [holding, setHolding] = useState(false);
  const [complete, setComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);
  const safeDuration = Number.isFinite(duration) ? Math.max(200, duration) : 850;
  const reduceMotion = useReducedMotion();

  const cancel = () => {
    activeRef.current = false;
    setHolding(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };
  const begin = () => {
    if (activeRef.current || complete) return;
    activeRef.current = true;
    setHolding(true);
    timerRef.current = setTimeout(() => {
      activeRef.current = false;
      timerRef.current = null;
      setHolding(false);
      setComplete(true);
      onComplete?.();
    }, safeDuration);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const pointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    props.onPointerDown?.(event);
    if (event.defaultPrevented) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    begin();
  };
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    props.onKeyDown?.(event);
    if (event.defaultPrevented || (event.key !== " " && event.key !== "Enter")) return;
    event.preventDefault();
    begin();
  };
  const keyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    props.onKeyUp?.(event);
    if (event.key === " " || event.key === "Enter") cancel();
  };

  return (
    <button
      {...props}
      type="button"
      aria-label={
        complete ? completeLabel : `${label}, press and hold for ${safeDuration} milliseconds`
      }
      disabled={complete || props.disabled}
      onPointerDown={pointerDown}
      onPointerUp={cancel}
      onPointerCancel={cancel}
      onLostPointerCapture={cancel}
      onKeyDown={keyDown}
      onKeyUp={keyUp}
      onBlur={cancel}
      style={{
        position: "relative",
        overflow: "hidden",
        minWidth: 170,
        padding: "13px 18px",
        border: "2px solid var(--ink, #101010)",
        background: "var(--paper, #f4f2ec)",
        color: holding || complete ? "var(--acid-ink, #101010)" : "var(--ink, #101010)",
        boxShadow: "4px 4px 0 var(--ink, #101010)",
        font: "700 11px var(--font-mono, monospace)",
        textTransform: "uppercase",
        cursor: complete ? "default" : "pointer",
        touchAction: "none",
        opacity: complete ? 0.7 : 1,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: holding ? "100%" : "0%",
          background: "var(--acid, #dfff00)",
          transition: reduceMotion
            ? "none"
            : `width ${holding ? safeDuration : 120}ms ${holding ? "linear" : "ease-out"}`,
        }}
      />
      <span style={{ position: "relative" }}>
        {complete ? completeLabel : holding ? "Keep holding…" : label}
      </span>
    </button>
  );
}
