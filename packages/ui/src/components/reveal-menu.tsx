"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export interface RevealMenuItem {
  label: string;
  href: string;
}

export interface RevealMenuProps {
  items: RevealMenuItem[];
  label?: string;
  className?: string;
}

export function RevealMenu({ items, label = "Open navigation menu", className }: RevealMenuProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTarget = dialogRef.current?.querySelector<HTMLElement>("a, button");
    focusTarget?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") setOpen(false);
    if (event.key !== "Tab" || !dialogRef.current) return;
    const targets = [
      ...dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)"),
    ];
    const first = targets[0];
    const last = targets.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <div className={className}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        style={{
          border: "2px solid currentColor",
          background: "transparent",
          padding: "10px 14px",
          cursor: "pointer",
        }}
      >
        MENU <span aria-hidden="true">↗</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onKeyDown={trapFocus}
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              zIndex: 100,
              inset: 0,
              overflow: "auto",
              padding: "8vh 8vw",
              background: "#dfff00",
              color: "#101010",
            }}
          >
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                padding: 12,
                border: "2px solid currentColor",
                background: "transparent",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              CLOSE ×
            </button>
            <nav aria-label="Main navigation" style={{ display: "grid", gap: 8 }}>
              {items.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: "clamp(2.8rem, 9vw, 8rem)",
                    fontWeight: 900,
                    letterSpacing: "-.08em",
                    textDecoration: "none",
                  }}
                >
                  <small
                    style={{ font: "12px monospace", verticalAlign: "middle", marginRight: 16 }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </small>
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
