"use client";

import { useState } from "react";
import type { HTMLAttributes } from "react";

export interface MotionPreset {
  id: string;
  label: string;
  duration: number;
  easing: string;
}

export interface MotionPresetsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  presets: MotionPreset[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (preset: MotionPreset) => void;
}

export function MotionPresets({
  presets,
  value,
  defaultValue,
  onValueChange,
  style,
  ...props
}: MotionPresetsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? presets[0]?.id ?? "");
  const selectedId = value ?? internalValue;
  const selected = presets.find((preset) => preset.id === selectedId);
  const choose = (preset: MotionPreset) => {
    if (value === undefined) setInternalValue(preset.id);
    onValueChange?.(preset);
  };

  return (
    <div
      {...props}
      style={{
        width: "min(100%, 370px)",
        padding: 14,
        border: "1px solid rgba(16,16,16,.2)",
        background: "var(--paper, #f4f2ec)",
        color: "var(--ink, #101010)",
        ...style,
      }}
    >
      <div
        role="group"
        aria-label="Motion presets"
        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
      >
        {presets.map((preset) => {
          const active = selectedId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(preset)}
              style={{
                padding: "7px 10px",
                border: `1px solid ${active ? "var(--ink, #101010)" : "rgba(16,16,16,.18)"}`,
                background: active ? "var(--acid, #dfff00)" : "transparent",
                color: "inherit",
                font: "700 10px var(--font-mono, monospace)",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
      {selected && (
        <p
          aria-live="polite"
          style={{
            margin: "12px 0 0",
            font: "10px/1.6 var(--font-mono, monospace)",
            overflowWrap: "anywhere",
          }}
        >
          {selected.duration}ms · {selected.easing}
        </p>
      )}
    </div>
  );
}
