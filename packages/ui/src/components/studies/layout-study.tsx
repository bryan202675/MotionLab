"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export const layoutStudyVariants = [
  "step-track", "focus-rail", "folder-tabs", "menu-matrix", "progress-path", "split-stage",
  "sequence-grid", "scroll-chapter", "switchboard", "stage-selector", "flow-lane",
  "chapter-marker", "pane-snap",
] as const;
export type LayoutStudyVariant = (typeof layoutStudyVariants)[number];

export interface LayoutStudyProps {
  label?: string;
  accent?: string;
  intensity?: number;
  pace?: number;
  variant: LayoutStudyVariant;
}

export function LayoutStudy({
  label = "Choose a frame",
  accent = "var(--electric, #5038ff)",
  intensity = 12,
  pace = 1,
  variant,
}: LayoutStudyProps) {
  const [active, setActive] = useState(0);
  const id = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const labels = variant === "folder-tabs" ? ["LAYERS", "TIMING", "OUTPUT"] : ["FRAME 01", "FRAME 02", "FRAME 03"];
  const vertical = variant === "focus-rail" || variant === "chapter-marker";
  const compact = variant === "menu-matrix" || variant === "sequence-grid";
  const spring = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 320 * pace, damping: 26 };
  const itemStyle = { position: "relative" as const, border: "1px solid currentColor", background: "transparent", color: "var(--ink, #101010)", padding: compact ? "10px" : "9px 12px", minWidth: compact ? 72 : undefined, textAlign: "left" as const, font: "700 10px var(--font-mono, monospace)", cursor: "pointer" };

  return (
    <section aria-label={label} style={{ display: "grid", gap: 12, width: "min(100%, 350px)", color: "var(--ink, #101010)" }}>
      <div role="tablist" aria-label={label} style={{ display: "flex", flexDirection: vertical ? "column" : "row", flexWrap: "wrap", gap: 6, alignItems: "stretch" }}>
        {labels.map((item, index) => (
          <button key={item} id={`${id}-tab-${index}`} type="button" role="tab" aria-controls={`${id}-panel`} aria-selected={active === index} onClick={() => setActive(index)} style={{ ...itemStyle, flex: compact ? "0 1 30%" : 1, borderColor: active === index ? accent : "currentColor", background: active === index ? accent : "transparent", boxShadow: active === index ? `${Math.min(5, intensity / 3)}px ${Math.min(5, intensity / 3)}px currentColor` : "none" }}>
            <span style={{ position: "relative", zIndex: 1 }}>{item}</span>
            {active === index && !reduceMotion ? <motion.span aria-hidden="true" layoutId={`layout-study-${variant}`} transition={spring} style={{ position: "absolute", inset: 0, background: accent, zIndex: 0 }} /> : null}
          </button>
        ))}
      </div>
      <motion.div key={active} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} initial={reduceMotion ? false : { opacity: 0, x: variant === "pane-snap" ? 10 : 0, y: variant === "pane-snap" ? 0 : 6 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={spring} style={{ minHeight: 54, borderTop: "2px solid currentColor", padding: "12px 2px", display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "center", gap: 12 }}>
        <span style={{ color: accent, font: "800 22px var(--font-mono, monospace)" }}>0{active + 1}</span>
        <span style={{ font: "700 12px var(--font-mono, monospace)" }}>{active === 0 ? label : `${labels[active]} / READY`}</span>
      </motion.div>
    </section>
  );
}
