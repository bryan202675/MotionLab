"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export const controlStudyVariants = [
  "step-dial", "snap-range", "pulse-switch", "pressure-pad", "sequence-key", "hold-meter",
  "angle-controller", "velocity-handle", "latch-action", "orbit-choice", "repeat-button",
  "scrub-rail", "range-duo",
] as const;
export type ControlStudyVariant = (typeof controlStudyVariants)[number];

export interface ControlStudyProps {
  label?: string;
  accent?: string;
  intensity?: number;
  pace?: number;
  variant: ControlStudyVariant;
}

export function ControlStudy({
  label = "Tune response",
  accent = "var(--acid, #dfff00)",
  intensity = 12,
  pace = 1,
  variant,
}: ControlStudyProps) {
  const [value, setValue] = useState(42);
  const [rangeStart, setRangeStart] = useState(24);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const spring = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 340 * pace, damping: 24 };
  const buttonStyle = { border: "2px solid currentColor", background: active ? accent : "transparent", color: "var(--ink, #101010)", padding: "10px 14px", font: "700 12px var(--font-mono, monospace)", cursor: "pointer" };

  if (["snap-range", "angle-controller", "velocity-handle", "scrub-rail"].includes(variant)) {
    return (
      <label style={{ display: "grid", gap: 10, width: "min(100%, 280px)", color: "var(--ink, #101010)", font: "700 11px var(--font-mono, monospace)" }}>
        <span style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>{label}</span><output>{variant === "angle-controller" ? `${Math.round(value * 3.6)}°` : value}</output></span>
        <input aria-label={label} type="range" min="0" max="100" step={variant === "snap-range" ? 10 : 1} value={value} onChange={(event) => setValue(Number(event.target.value))} style={{ width: "100%", accentColor: accent }} />
      </label>
    );
  }

  if (variant === "range-duo") {
    return (
      <fieldset style={{ display: "grid", gap: 8, width: "min(100%, 280px)", border: 0, padding: 0, color: "var(--ink, #101010)" }}>
        <legend style={{ font: "700 11px var(--font-mono, monospace)" }}>{label} <output>{rangeStart}—{value}</output></legend>
        <input aria-label={`${label} start`} type="range" min="0" max={value - 1} value={rangeStart} onChange={(event) => setRangeStart(Math.min(Number(event.target.value), value - 1))} style={{ accentColor: accent }} />
        <input aria-label={`${label} end`} type="range" min={rangeStart + 1} max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} style={{ accentColor: accent }} />
      </fieldset>
    );
  }

  if (variant === "step-dial" || variant === "orbit-choice") {
    const choices = variant === "step-dial" ? ["−", "+"] : ["A", "B", "C", "D"];
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink, #101010)" }}>
        {choices.map((choice, index) => (
          <button key={choice} type="button" aria-label={variant === "step-dial" ? `${choice === "+" ? "Increase" : "Decrease"} ${label}` : `${label} option ${choice}`} onClick={() => setValue((current) => variant === "step-dial" ? Math.max(0, Math.min(100, current + (choice === "+" ? 1 : -1))) : index * 25)} style={{ ...buttonStyle, borderRadius: variant === "step-dial" ? 999 : 0, background: variant === "orbit-choice" && value === index * 25 ? accent : "transparent" }}>{choice}</button>
        ))}
        <output aria-live="polite" style={{ font: "800 18px var(--font-mono, monospace)" }}>{variant === "step-dial" ? value : choices[Math.round(value / 25)]}</output>
      </div>
    );
  }

  if (variant === "repeat-button") {
    return <button type="button" onClick={() => setValue((current) => current + 1)} style={buttonStyle}>{label} <motion.span key={value} initial={reduceMotion ? false : { y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={spring}>{value}</motion.span></button>;
  }

  if (variant === "hold-meter") {
    return <button type="button" onPointerDown={() => setActive(true)} onPointerUp={() => setActive(false)} onPointerLeave={() => setActive(false)} onKeyDown={(event) => { if (event.key === " " || event.key === "Enter") setActive(true); }} onKeyUp={() => setActive(false)} aria-pressed={active} style={{ ...buttonStyle, position: "relative", overflow: "hidden" }}><motion.span aria-hidden="true" style={{ position: "absolute", inset: 0, background: accent, transformOrigin: "left", zIndex: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ duration: active ? 0.7 / Math.max(0.25, pace) : 0.12 }} /><span style={{ position: "relative", zIndex: 1 }}>{active ? "HOLDING…" : label}</span></button>;
  }

  const toggle = variant === "pulse-switch" || variant === "latch-action" || variant === "pressure-pad";
  const text = active ? (variant === "sequence-key" ? "SEQUENCE LIVE" : "ENGAGED") : label.toUpperCase();
  return (
    <button type="button" aria-pressed={toggle ? active : undefined} onClick={() => { setActive((current) => !current); setValue((current) => (current + 1) % 100); }} onPointerMove={(event) => { if (variant === "pressure-pad" && event.buttons) setActive(true); }} onPointerLeave={() => { if (variant === "pressure-pad") setActive(false); }} style={{ ...buttonStyle, minWidth: 150, minHeight: 56, position: "relative", overflow: "hidden", boxShadow: active ? `inset 0 0 0 ${Math.min(8, intensity / 2)}px ${accent}` : "none" }}>
      <motion.span aria-hidden="true" style={{ position: "absolute", width: 10, height: 10, borderRadius: "50%", background: accent, left: 8, top: 8 }} animate={{ scale: active ? 4 : 1, opacity: active ? 0.35 : 1 }} transition={spring} />
      <span style={{ position: "relative" }}>{text}</span>
    </button>
  );
}
