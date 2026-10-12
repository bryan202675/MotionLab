"use client";

import type { CSSProperties, HTMLAttributes } from "react";

export interface AxisValue {
  x: number;
  y: number;
}

export interface AxisPadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: AxisValue;
  onValueChange: (value: AxisValue) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  accent?: string;
}

export function AxisPad({
  value,
  onValueChange,
  label = "Position controls",
  min = -100,
  max = 100,
  step = 1,
  accent = "var(--electric, #5038ff)",
  style,
  ...props
}: AxisPadProps) {
  const inputStyle: CSSProperties = { width: "100%", accentColor: accent, cursor: "ew-resize" };
  return (
    <div
      {...props}
      role="group"
      aria-label={label}
      style={{
        display: "grid",
        gap: 12,
        width: "min(100%, 300px)",
        padding: 16,
        border: "1px solid rgba(16,16,16,.2)",
        background: "var(--paper, #f4f2ec)",
        color: "var(--ink, #101010)",
        ...style,
      }}
    >
      {(["x", "y"] as const).map((axis) => (
        <label
          key={axis}
          style={{
            display: "grid",
            gridTemplateColumns: "20px 1fr 42px",
            alignItems: "center",
            gap: 10,
            font: "700 11px var(--font-mono, monospace)",
            textTransform: "uppercase",
          }}
        >
          <span>{axis}</span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[axis]}
            aria-label={`${label} ${axis.toUpperCase()}`}
            onChange={(event) =>
              onValueChange({ ...value, [axis]: Number(event.currentTarget.value) })
            }
            style={inputStyle}
          />
          <output style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
            {value[axis]}
          </output>
        </label>
      ))}
      <div aria-hidden="true" style={{ height: 1, background: "rgba(16,16,16,.12)" }} />
      <p style={{ margin: 0, font: "10px var(--font-mono, monospace)", opacity: 0.65 }}>
        X {value.x} / Y {value.y}
      </p>
    </div>
  );
}
