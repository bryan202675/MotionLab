"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";

export interface SlidingTab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface SlidingTabsProps {
  tabs: SlidingTab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label: string;
  className?: string;
}

export function SlidingTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  label,
  className,
}: SlidingTabsProps) {
  const [local, setLocal] = useState(defaultValue ?? tabs[0]?.id ?? "");
  const id = useId();
  const refs = useRef(new Map<string, HTMLButtonElement>());
  const reduceMotion = useReducedMotion();
  const selected = value ?? local;
  const active = tabs.find((tab) => tab.id === selected) ?? tabs[0];
  const select = (next: string) => {
    if (value === undefined) setLocal(next);
    onValueChange?.(next);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = tabs.findIndex((tab) => tab.id === event.currentTarget.dataset.value);
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : event.key === "ArrowLeft"
          ? (index - 1 + tabs.length) % tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    const tab = tabs[nextIndex];
    if (!tab) return;
    select(tab.id);
    refs.current.get(tab.id)?.focus();
  };
  if (!active) return null;
  return (
    <div className={className}>
      <LayoutGroup id={id}>
        <div
          role="tablist"
          aria-label={label}
          style={{ display: "flex", borderBottom: "2px solid currentColor", gap: 6 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(node) => {
                if (node) refs.current.set(tab.id, node);
                else refs.current.delete(tab.id);
              }}
              type="button"
              role="tab"
              id={`${id}-${tab.id}`}
              data-value={tab.id}
              aria-selected={selected === tab.id}
              aria-controls={`${id}-panel`}
              tabIndex={selected === tab.id ? 0 : -1}
              onClick={() => select(tab.id)}
              onKeyDown={onKeyDown}
              style={{
                position: "relative",
                padding: "12px 16px",
                border: 0,
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {tab.label}
              {selected === tab.id && (
                <motion.span
                  layoutId={`${id}-indicator`}
                  aria-hidden="true"
                  transition={
                    reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 34 }
                  }
                  style={{
                    position: "absolute",
                    height: 4,
                    background: "#dfff00",
                    left: 0,
                    right: 0,
                    bottom: -2,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </LayoutGroup>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${active.id}`}
        tabIndex={0}
        style={{ paddingBlock: 20 }}
      >
        {active.content}
      </div>
    </div>
  );
}
