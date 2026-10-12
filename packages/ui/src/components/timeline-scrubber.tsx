"use client";

import type { HTMLAttributes } from "react";

export interface TimelineMarker {
  value: number;
  label: string;
}

export interface TimelineScrubberProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  min?: number;
  max: number;
  step?: number;
  markers?: TimelineMarker[];
  onValueChange: (value: number) => void;
  label?: string;
}

export function TimelineScrubber({
  value,
  min = 0,
  max,
  step = 1,
  markers = [],
  onValueChange,
  label = "Timeline position",
  style,
  ...props
}: TimelineScrubberProps) {
  const range = max - min || 1;
  const percent = Math.min(100, Math.max(0, ((value - min) / range) * 100));
  return (
    <div
      {...props}
      style={{
        width: "min(100%, 420px)",
        padding: 14,
        border: "1px solid rgba(16,16,16,.2)",
        background: "var(--paper, #f4f2ec)",
        color: "var(--ink, #101010)",
        ...style,
      }}
    >
      <label style={{ display: "grid", gap: 10 }}>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            font: "700 10px var(--font-mono, monospace)",
            textTransform: "uppercase",
          }}
        >
          <span>{label}</span>
          <output aria-live="polite" style={{ fontVariantNumeric: "tabular-nums" }}>
            {value.toFixed(2)}s
          </output>
        </span>
        <span style={{ position: "relative", display: "block", height: 18 }}>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 8,
              left: 0,
              right: 0,
              height: 2,
              background: "rgba(16,16,16,.18)",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 8,
              left: 0,
              width: `${percent}%`,
              height: 2,
              background: "var(--electric, #5038ff)",
            }}
          />
          {markers.map((marker) => (
            <span
              key={`${marker.value}-${marker.label}`}
              title={marker.label}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 4,
                left: `${Math.min(100, Math.max(0, ((marker.value - min) / range) * 100))}%`,
                width: 1,
                height: 10,
                background: "var(--ink, #101010)",
              }}
            />
          ))}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-label={label}
            onChange={(event) => onValueChange(Number(event.currentTarget.value))}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: 18,
              margin: 0,
              background: "transparent",
              accentColor: "var(--electric, #5038ff)",
              cursor: "ew-resize",
            }}
          />
        </span>
      </label>
      {markers.length > 0 && (
        <div
          aria-label="Timeline markers"
          style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}
        >
          {markers.map((marker) => (
            <button
              key={`${marker.value}-${marker.label}`}
              type="button"
              onClick={() => onValueChange(marker.value)}
              style={{
                padding: "4px 6px",
                border: "1px solid rgba(16,16,16,.2)",
                background: "transparent",
                color: "inherit",
                font: "9px var(--font-mono, monospace)",
                cursor: "pointer",
              }}
            >
              {marker.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
