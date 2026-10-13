"use client";

import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export type ViewportPreset = "wide" | "square" | "portrait";

export interface ViewportFrameProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  children: ReactNode;
  value?: ViewportPreset;
  defaultValue?: ViewportPreset;
  onValueChange?: (value: ViewportPreset) => void;
  label?: string;
}

const presets: { id: ViewportPreset; label: string; ratio: string }[] = [
  { id: "wide", label: "16:9", ratio: "16 / 9" },
  { id: "square", label: "1:1", ratio: "1 / 1" },
  { id: "portrait", label: "9:16", ratio: "9 / 16" },
];

export function ViewportFrame({
  children,
  value,
  defaultValue = "wide",
  onValueChange,
  label = "Preview size",
  style,
  ...props
}: ViewportFrameProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = value ?? internalValue;
  const ratio = presets.find((item) => item.id === selected)?.ratio ?? "16 / 9";
  const frameWidth =
    selected === "portrait"
      ? "min(100%, 168.75px)"
      : selected === "square"
        ? "min(100%, 300px)"
        : "100%";
  const reduceMotion = useReducedMotion();
  const select = (next: ViewportPreset) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <div {...props} style={{ display: "grid", gap: 10, width: "min(100%, 450px)", ...style }}>
      <div
        role="group"
        aria-label={label}
        style={{ display: "flex", justifyContent: "end", gap: 4 }}
      >
        {presets.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === item.id}
            onClick={() => select(item.id)}
            style={{
              padding: "5px 8px",
              border: `1px solid ${selected === item.id ? "var(--ink, #101010)" : "rgba(16,16,16,.2)"}`,
              background: selected === item.id ? "var(--acid, #dfff00)" : "var(--paper, #f4f2ec)",
              color: selected === item.id ? "var(--acid-ink, #101010)" : "var(--ink, #101010)",
              font: "700 9px var(--font-mono, monospace)",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        style={{
          justifySelf: "center",
          width: frameWidth,
          maxHeight: 300,
          aspectRatio: ratio,
          overflow: "auto",
          border: "2px solid var(--ink, #101010)",
          background: "var(--paper, #f4f2ec)",
          transition: reduceMotion ? "none" : "aspect-ratio 220ms ease, width 220ms ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
