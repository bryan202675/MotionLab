"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes } from "react";

export interface RunControlProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  running?: boolean;
  defaultRunning?: boolean;
  runLabel?: string;
  stopLabel?: string;
  onRunningChange?: (running: boolean) => void;
}

export function RunControl({
  running,
  defaultRunning = false,
  runLabel = "Run experiment",
  stopLabel = "Stop experiment",
  onRunningChange,
  onClick,
  style,
  ...props
}: RunControlProps) {
  const [internalRunning, setInternalRunning] = useState(defaultRunning);
  const isRunning = running ?? internalRunning;
  const toggle = () => {
    const next = !isRunning;
    if (running === undefined) setInternalRunning(next);
    onRunningChange?.(next);
  };

  return (
    <button
      {...props}
      type="button"
      aria-pressed={isRunning}
      onClick={(event) => {
        toggle();
        onClick?.(event);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        border: "2px solid var(--ink, #101010)",
        background: isRunning ? "var(--signal, #ff5638)" : "var(--acid, #dfff00)",
        color: "var(--ink, #101010)",
        boxShadow: "4px 4px 0 var(--ink, #101010)",
        font: "700 12px var(--font-mono, monospace)",
        textTransform: "uppercase",
        cursor: "pointer",
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 9,
          height: 9,
          border: "1.5px solid currentColor",
          background: isRunning ? "transparent" : "currentColor",
        }}
      />
      {isRunning ? stopLabel : runLabel}
    </button>
  );
}
