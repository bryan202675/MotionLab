"use client";

import { useState } from "react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface ModeOption {
  value: string;
  label: string;
}

export interface ModeSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: ModeOption[];
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function ModeSelector({
  options,
  label,
  value,
  defaultValue,
  onValueChange,
  style,
  ...props
}: ModeSelectorProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const selected = value ?? internalValue;
  const reduceMotion = useReducedMotion();
  const select = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <div
      {...props}
      role="group"
      aria-label={label}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: 4,
        padding: 4,
        border: "1px solid rgba(16,16,16,.18)",
        background: "rgba(16,16,16,.04)",
        ...style,
      }}
    >
      {options.map((option) => {
        const active = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => select(option.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid",
              borderColor: active ? "var(--ink, #101010)" : "transparent",
              background: active ? "var(--acid, #dfff00)" : "transparent",
              color: "var(--ink, #101010)",
              font: "700 11px var(--font-mono, monospace)",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: reduceMotion
                ? "none"
                : "background-color 140ms ease, border-color 140ms ease",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
