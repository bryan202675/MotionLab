"use client";

import { useState } from "react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface PhaseItem {
  id: string;
  label: string;
  description?: string;
}

export interface PhaseRailProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: PhaseItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
}

export function PhaseRail({
  items,
  value,
  defaultValue,
  onValueChange,
  style,
  ...props
}: PhaseRailProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.id ?? "");
  const selectedId = value ?? internalValue;
  const selectedIndex = items.findIndex((item) => item.id === selectedId);
  const reduceMotion = useReducedMotion();
  const select = (id: string) => {
    if (value === undefined) setInternalValue(id);
    onValueChange?.(id);
  };
  const current = items[selectedIndex];

  return (
    <section
      {...props}
      aria-label="Experiment phases"
      style={{ width: "min(100%, 560px)", color: "var(--ink, #101010)", ...style }}
    >
      <ol
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, minmax(0, 1fr))`,
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {items.map((item, index) => {
          const active = item.id === selectedId;
          const complete = index < selectedIndex;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={active ? "step" : undefined}
                onClick={() => select(item.id)}
                style={{
                  display: "grid",
                  justifyItems: "start",
                  gap: 7,
                  width: "100%",
                  padding: "0 8px 10px 0",
                  border: 0,
                  borderBottom: `2px solid ${active ? "var(--ink, #101010)" : "rgba(16,16,16,.2)"}`,
                  background: "transparent",
                  color: "inherit",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 23,
                    height: 23,
                    border: "1px solid var(--ink, #101010)",
                    background: active || complete ? "var(--acid, #dfff00)" : "transparent",
                    color: active || complete ? "var(--acid-ink, #101010)" : "inherit",
                    font: "700 10px var(--font-mono, monospace)",
                    transition: reduceMotion ? "none" : "background-color 160ms ease",
                  }}
                >
                  {complete ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    font: "700 10px var(--font-mono, monospace)",
                    textTransform: "uppercase",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {current?.description && (
        <p
          aria-live="polite"
          style={{ margin: "12px 0 0", font: "12px/1.5 var(--font-mono, monospace)", opacity: 0.7 }}
        >
          {current.description}
        </p>
      )}
    </section>
  );
}
