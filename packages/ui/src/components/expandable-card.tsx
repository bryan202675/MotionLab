"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export interface ExpandableCardProps {
  title: string;
  summary?: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
}

export function ExpandableCard({
  title,
  summary,
  children,
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  className,
}: ExpandableCardProps) {
  const [local, setLocal] = useState(defaultExpanded);
  const id = useId();
  const reduceMotion = useReducedMotion();
  const isExpanded = expanded ?? local;
  const toggle = () => {
    const next = !isExpanded;
    if (expanded === undefined) setLocal(next);
    onExpandedChange?.(next);
  };
  return (
    <article className={className} style={{ border: "2px solid currentColor" }}>
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={id}
        onClick={toggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          padding: 20,
          border: 0,
          background: "transparent",
          color: "inherit",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span>
          <strong>{title}</strong>
          {summary && <span style={{ display: "block", marginTop: 6 }}>{summary}</span>}
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 28 }
          }
          aria-hidden="true"
        >
          ＋
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={id}
            role="region"
            aria-label={`${title} details`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 20px 20px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
