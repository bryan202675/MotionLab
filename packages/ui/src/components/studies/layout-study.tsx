"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export const layoutStudyVariants = [
  "step-track", "focus-rail", "folder-tabs", "menu-matrix", "progress-path", "split-stage",
  "sequence-grid", "scroll-chapter", "switchboard", "stage-selector", "flow-lane",
  "chapter-marker", "pane-snap", "breadcrumb-trail", "pagination-strip", "filter-chips", "accordion-stack",
  "side-index", "command-switcher", "view-switcher", "timeline-stops", "anchor-index", "radial-menu",
  "stepper-rail", "pill-navigation", "tab-underline", "view-pager", "workspace-rail", "chapter-dots",
  "split-navigation", "focus-steps", "rail-tabs", "mode-switchboard",
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
  const labels = variant === "folder-tabs" ? ["LAYERS", "TIMING", "OUTPUT"] : variant === "breadcrumb-trail" ? ["WORKSPACE", "PROJECT", "CURRENT"] : variant === "pagination-strip" ? ["01", "02", "03"] : variant === "filter-chips" ? ["ALL ITEMS", "TYPE", "INTERACTION"] : variant === "view-switcher" ? ["GRID VIEW", "LIST VIEW", "FOCUS"] : variant === "radial-menu" ? ["STUDIO", "ASSETS", "EXPORT"] : variant === "accordion-stack" ? ["LAYOUT", "MOTION", "ACCESS"] : ["FRAME 01", "FRAME 02", "FRAME 03"];
  const vertical = ["focus-rail", "chapter-marker", "side-index", "stepper-rail", "anchor-index", "workspace-rail", "rail-tabs", "focus-steps"].includes(variant);
  const compact = ["menu-matrix", "sequence-grid", "chapter-dots", "radial-menu"].includes(variant);
  const spring = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 320 * pace, damping: 26 };
  const pill = ["filter-chips", "pill-navigation", "view-switcher", "mode-switchboard"].includes(variant);
  const itemStyle = { position: "relative" as const, border: variant === "tab-underline" ? 0 : "1px solid currentColor", borderBottom: variant === "tab-underline" ? "2px solid currentColor" : undefined, background: "transparent", color: "var(--ink, #101010)", borderRadius: pill ? 999 : variant === "radial-menu" ? 999 : 0, padding: compact ? "10px" : "9px 12px", minWidth: compact ? 72 : undefined, textAlign: "left" as const, font: "700 10px var(--font-mono, monospace)", cursor: "pointer" };

  if (variant === "breadcrumb-trail") {
    return <nav aria-label={label} style={{ color: "var(--ink, #101010)", font: "700 11px var(--font-mono, monospace)" }}><ol style={{ display: "flex", alignItems: "center", gap: 9, listStyle: "none", margin: 0, padding: 0 }}>{labels.map((item, index) => <li key={item} style={{ display: "flex", alignItems: "center", gap: 9 }}><button type="button" aria-current={active === index ? "page" : undefined} onClick={() => setActive(index)} style={{ border: 0, padding: 0, background: "transparent", color: active === index ? accent : "inherit", font: "inherit", cursor: "pointer" }}>{item}</button>{index < labels.length - 1 ? <span aria-hidden="true">/</span> : null}</li>)}</ol></nav>;
  }

  if (variant === "pagination-strip") {
    return <nav aria-label={label} style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink, #101010)", font: "700 11px var(--font-mono, monospace)" }}><button type="button" aria-label="Previous page" disabled={active === 0} onClick={() => setActive((current) => Math.max(0, current - 1))} style={itemStyle}>←</button>{labels.map((item, index) => <button key={item} type="button" aria-current={active === index ? "page" : undefined} onClick={() => setActive(index)} style={{ ...itemStyle, background: active === index ? accent : "transparent" }}>{item}</button>)}<button type="button" aria-label="Next page" disabled={active === labels.length - 1} onClick={() => setActive((current) => Math.min(labels.length - 1, current + 1))} style={itemStyle}>→</button></nav>;
  }

  if (variant === "accordion-stack") {
    return <section aria-label={label} style={{ display: "grid", gap: 6, width: "min(100%, 340px)", color: "var(--ink, #101010)" }}>{labels.map((item, index) => <div key={item} style={{ border: "1px solid currentColor" }}><button type="button" aria-expanded={active === index} aria-controls={`${id}-accordion-${index}`} onClick={() => setActive(active === index ? -1 : index)} style={{ ...itemStyle, display: "flex", width: "100%", justifyContent: "space-between", border: 0 }}>{item}<span aria-hidden="true">{active === index ? "−" : "+"}</span></button>{active === index ? <div id={`${id}-accordion-${index}`} style={{ padding: "4px 12px 12px", font: "12px/1.5 var(--font-mono, monospace)" }}>A measured panel opens below its heading.</div> : null}</div>)}</section>;
  }

  return (
    <section aria-label={label} style={{ display: "grid", gap: 12, width: "min(100%, 350px)", color: "var(--ink, #101010)" }}>
      <div role="tablist" aria-label={label} style={{ display: "flex", flexDirection: vertical ? "column" : "row", flexWrap: "wrap", gap: compact ? 8 : 6, alignItems: "stretch", borderBottom: variant === "tab-underline" ? "1px solid currentColor" : undefined, padding: variant === "radial-menu" ? 8 : undefined, borderRadius: variant === "radial-menu" ? 999 : undefined, background: variant === "radial-menu" ? "color-mix(in srgb, var(--paper, #f3f0e8) 88%, transparent)" : undefined }}>
        {labels.map((item, index) => (
          <button key={item} id={`${id}-tab-${index}`} type="button" role="tab" aria-controls={`${id}-panel`} aria-selected={active === index} onClick={() => setActive(index)} style={{ ...itemStyle, flex: compact ? "0 1 30%" : 1, borderColor: active === index ? accent : "currentColor", borderBottomColor: active === index ? accent : undefined, background: active === index ? accent : "transparent", boxShadow: active === index && variant !== "tab-underline" ? `${Math.min(5, intensity / 3)}px ${Math.min(5, intensity / 3)}px currentColor` : "none", transform: active === index && variant === "radial-menu" ? "translateY(-3px)" : undefined }}>
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
