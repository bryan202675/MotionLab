"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface BrutalistAccordionProps {
  items: AccordionItem[];
  mode?: "single" | "multiple";
  className?: string;
}

export function BrutalistAccordion({ items, mode = "single", className }: BrutalistAccordionProps) {
  const [open, setOpen] = useState<string[]>([]);
  const id = useId();
  const reduceMotion = useReducedMotion();
  const toggle = (id: string) =>
    setOpen((current) => {
      const isOpen = current.includes(id);
      if (mode === "single") return isOpen ? [] : [id];
      return isOpen ? current.filter((value) => value !== id) : [...current, id];
    });
  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = open.includes(item.id);
        const panelId = `${id}-panel-${item.id}`;
        return (
          <section key={item.id} style={{ borderTop: "2px solid currentColor" }}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                style={{
                  width: "100%",
                  padding: "18px 0",
                  display: "grid",
                  gridTemplateColumns: "54px 1fr auto",
                  alignItems: "center",
                  textAlign: "left",
                  border: 0,
                  background: "transparent",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <span style={{ font: "12px monospace", color: "#5038ff" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={
                    reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 460, damping: 28 }
                  }
                  aria-hidden="true"
                >
                  ＋
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-label={item.title}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 0 20px 54px" }}>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}
    </div>
  );
}
