"use client";

import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface LayerStackItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface LayerStackProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: LayerStackItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
}

export function LayerStack({
  items,
  value,
  defaultValue,
  onValueChange,
  style,
  ...props
}: LayerStackProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.id ?? "");
  const selectedId = value ?? internalValue;
  const selectedIndex = items.findIndex((item) => item.id === selectedId);
  const selected = items[selectedIndex];
  const reduceMotion = useReducedMotion();
  const select = (id: string) => {
    if (value === undefined) setInternalValue(id);
    onValueChange?.(id);
  };

  return (
    <div {...props} style={{ width: "min(100%, 360px)", color: "var(--ink, #101010)", ...style }}>
      <div
        role="group"
        aria-label="Choose a layer"
        style={{ display: "grid", gap: 5, marginBottom: 10 }}
      >
        {items.map((item, index) => {
          const active = item.id === selectedId;
          const offset = Math.abs(index - selectedIndex);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => select(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 11px",
                transform: reduceMotion ? "none" : `translateX(${Math.min(offset, 4) * 3}px)`,
                transition: reduceMotion
                  ? "none"
                  : "transform 180ms ease, background-color 180ms ease",
                border: `1px solid ${active ? "var(--ink, #101010)" : "rgba(16,16,16,.18)"}`,
                background: active ? "var(--acid, #dfff00)" : "var(--paper, #f4f2ec)",
                color: "inherit",
                textAlign: "left",
                font: "700 10px var(--font-mono, monospace)",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              <span aria-hidden="true" style={{ opacity: 0.55 }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="region"
        aria-label={selected ? `${selected.label} layer` : "Selected layer"}
        style={{
          minHeight: 92,
          padding: 16,
          border: "2px solid var(--ink, #101010)",
          background: "var(--paper, #f4f2ec)",
          boxShadow: "5px 5px 0 var(--ink, #101010)",
        }}
      >
        {selected?.content}
      </div>
    </div>
  );
}
