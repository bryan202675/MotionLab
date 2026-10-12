"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export const controlStudyVariants = [
  "step-dial", "snap-range", "pulse-switch", "pressure-pad", "sequence-key", "hold-meter",
  "angle-controller", "velocity-handle", "latch-action", "orbit-choice", "repeat-button",
  "scrub-rail", "range-duo", "tempo-fader", "gain-rail", "balance-control", "segmented-switch",
  "swatch-selector", "stepper-control", "press-ripple", "confirm-toggle", "hold-confirm", "volume-knob",
  "range-marker", "mode-pills", "playback-key", "copy-confirm", "disclosure-key", "reaction-meter",
  "precision-scrub", "keycap-grid", "toggle-bank", "meter-trigger",
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
  const [copyStatus, setCopyStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const reduceMotion = useReducedMotion() ?? false;
  const spring = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 340 * pace, damping: 24 };
  const buttonStyle = { border: "2px solid currentColor", background: active ? accent : "transparent", color: "var(--ink, #101010)", padding: "10px 14px", font: "700 12px var(--font-mono, monospace)", cursor: "pointer" };

  if (["snap-range", "angle-controller", "velocity-handle", "scrub-rail", "tempo-fader", "gain-rail", "balance-control", "range-marker", "reaction-meter"].includes(variant)) {
    const output = variant === "angle-controller"
      ? `${Math.round(value * 3.6)}°`
      : variant === "tempo-fader"
        ? `${Math.round(60 + value * 1.8)} BPM`
        : variant === "gain-rail"
          ? `${Math.round(value * 0.24 - 12)} dB`
          : variant === "balance-control"
            ? value < 47 ? `L ${47 - value}` : value > 53 ? `R ${value - 53}` : "CENTER"
            : variant === "reaction-meter"
              ? value < 50 ? `${50 - value}% LEFT` : `${value - 50}% RIGHT`
              : `${value}${variant === "velocity-handle" ? " px/s" : ""}`;
    return (
      <label style={{ display: "grid", gap: 10, width: "min(100%, 280px)", color: "var(--ink, #101010)", font: "700 11px var(--font-mono, monospace)" }}>
        <span style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>{label}</span><output aria-live="polite">{output}</output></span>
        {variant === "range-marker" ? <span aria-hidden="true" style={{ display: "flex", justifyContent: "space-between", fontSize: 9, opacity: 0.7 }}><span>MIN</span><span>REFERENCE</span><span>MAX</span></span> : null}
        <input aria-label={label} type="range" min="0" max="100" step={variant === "snap-range" || variant === "tempo-fader" ? 10 : 1} value={value} onChange={(event) => setValue(Number(event.target.value))} style={{ width: "100%", accentColor: accent }} />
      </label>
    );
  }

  if (variant === "precision-scrub") {
    return <div style={{ display: "grid", gap: 12, width: "min(100%, 280px)", color: "var(--ink, #101010)", font: "700 11px var(--font-mono, monospace)" }}><span>{label} <output>{value.toFixed(0)}.0</output></span><label style={{ display: "grid", gap: 5 }}>COARSE<input aria-label={`${label} coarse adjustment`} type="range" min="0" max="100" step="10" value={Math.round(value / 10) * 10} onChange={(event) => setValue(Number(event.target.value))} style={{ accentColor: accent }} /></label><label style={{ display: "grid", gap: 5 }}>FINE<input aria-label={`${label} fine adjustment`} type="range" min="0" max="100" step="1" value={value} onChange={(event) => setValue(Number(event.target.value))} style={{ accentColor: accent }} /></label></div>;
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

  if (variant === "volume-knob") {
    return (
      <label style={{ display: "grid", justifyItems: "center", gap: 10, color: "var(--ink, #101010)", font: "700 11px var(--font-mono, monospace)" }}>
        <span>{label} <output aria-live="polite">{value}%</output></span>
        <div aria-hidden="true" style={{ display: "grid", placeItems: "center", width: 88, height: 88, border: `2px solid ${accent}`, borderRadius: "50%", background: `conic-gradient(${accent} ${value * 3.6}deg, transparent 0)` }}>
          <motion.div animate={{ rotate: value * 2.7 - 135 }} transition={spring} style={{ display: "grid", placeItems: "start center", width: 68, height: 68, paddingTop: 9, border: "2px solid currentColor", borderRadius: "50%", background: "var(--paper, #f3f0e8)" }}>
            <span style={{ width: 3, height: 14, background: accent }} />
          </motion.div>
        </div>
        <input aria-label={label} type="range" min="0" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} style={{ width: 130, accentColor: accent }} />
      </label>
    );
  }

  if (variant === "step-dial" || variant === "orbit-choice" || variant === "segmented-switch" || variant === "swatch-selector" || variant === "mode-pills" || variant === "keycap-grid") {
    const choices = variant === "step-dial" ? ["−", "+"] : variant === "swatch-selector" ? ["#5038FF", "#DFFF00", "#F3F0E8", "#F05A37"] : variant === "keycap-grid" ? ["⌘", "⇧", "⌥", "⌃"] : variant === "orbit-choice" ? ["A", "B", "C", "D"] : ["A", "B", "C"];
    const selected = Math.round(value / (variant === "step-dial" ? 100 : 100 / (choices.length - 1)));
    return (
      <div role={variant === "step-dial" ? undefined : "group"} aria-label={label} style={{ display: "flex", alignItems: "center", gap: variant === "swatch-selector" ? 8 : 5, color: "var(--ink, #101010)" }}>
        {choices.map((choice, index) => (
          <button key={choice} type="button" aria-label={variant === "step-dial" ? `${choice === "+" ? "Increase" : "Decrease"} ${label}` : `${label} option ${choice}`} aria-pressed={variant !== "step-dial" ? selected === index : undefined} onClick={() => setValue((current) => variant === "step-dial" ? Math.max(0, Math.min(100, current + (choice === "+" ? 1 : -1))) : index * (100 / (choices.length - 1)))} style={{ ...buttonStyle, minWidth: variant === "swatch-selector" ? 30 : undefined, width: variant === "swatch-selector" ? 30 : undefined, height: variant === "swatch-selector" ? 30 : undefined, padding: variant === "swatch-selector" ? 0 : undefined, color: variant === "swatch-selector" ? choice : undefined, borderRadius: variant === "step-dial" ? 999 : variant === "mode-pills" ? 999 : 0, background: selected === index && variant !== "step-dial" ? accent : variant === "swatch-selector" ? choice : "transparent", boxShadow: selected === index && variant !== "step-dial" ? `0 0 0 2px var(--paper, #f3f0e8), 0 0 0 4px ${accent}` : undefined }}>{variant === "swatch-selector" ? <span className="sr-only">{choice}</span> : choice}</button>
        ))}
        {variant === "step-dial" ? <output aria-live="polite" style={{ font: "800 18px var(--font-mono, monospace)" }}>{value}</output> : <output aria-live="polite" className="sr-only">{choices[selected]}</output>}
      </div>
    );
  }

  if (variant === "stepper-control") {
    return <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: "var(--ink, #101010)", font: "700 11px var(--font-mono, monospace)" }}><span>{label}</span><button type="button" aria-label={`Decrease ${label}`} disabled={value <= 0} onClick={() => setValue((current) => Math.max(0, current - 1))} style={buttonStyle}>−</button><output aria-live="polite" style={{ minWidth: 24, textAlign: "center" }}>{value}</output><button type="button" aria-label={`Increase ${label}`} disabled={value >= 100} onClick={() => setValue((current) => Math.min(100, current + 1))} style={buttonStyle}>+</button></div>;
  }

  if (variant === "toggle-bank") {
    return <fieldset style={{ display: "grid", gap: 8, border: 0, padding: 0, color: "var(--ink, #101010)", font: "700 11px var(--font-mono, monospace)" }}><legend>{label}</legend>{["GRID", "SNAP", "GUIDES"].map((option, index) => <label key={option} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}><span>{option}</span><input type="checkbox" defaultChecked={index === 0} aria-label={`${label}: ${option}`} style={{ accentColor: accent }} /></label>)}</fieldset>;
  }

  if (variant === "disclosure-key") {
    return <div style={{ width: "min(100%, 280px)", color: "var(--ink, #101010)" }}><button type="button" aria-expanded={active} onClick={() => setActive((current) => !current)} style={{ ...buttonStyle, width: "100%", display: "flex", justifyContent: "space-between" }}>{label}<motion.span animate={{ rotate: active ? 180 : 0 }} transition={spring}>⌄</motion.span></button>{active ? <p style={{ margin: 0, padding: 12, border: "1px solid currentColor", font: "12px/1.5 var(--font-mono, monospace)" }}>Details are available when you need them.</p> : null}</div>;
  }

  if (variant === "copy-confirm") {
    return (
      <div style={{ display: "grid", justifyItems: "start", gap: 6 }}>
        <button type="button" onClick={async () => {
          setCopyStatus("pending");
          try {
            await navigator.clipboard.writeText(label);
            setCopyStatus("success");
          } catch {
            setCopyStatus("error");
          }
        }} disabled={copyStatus === "pending"} style={buttonStyle}>
          {copyStatus === "success" ? "✓ COPIED" : copyStatus === "error" ? "COPY UNAVAILABLE" : copyStatus === "pending" ? "COPYING…" : label.toUpperCase()}
        </button>
        <span aria-live="polite" style={{ color: "var(--ink, #101010)", font: "10px var(--font-mono, monospace)" }}>
          {copyStatus === "success" ? `Copied “${label}”.` : copyStatus === "error" ? "Clipboard access was unavailable." : copyStatus === "pending" ? "Copying to clipboard…" : ""}
        </span>
      </div>
    );
  }

  if (variant === "repeat-button") {
    return <button type="button" onClick={() => setValue((current) => current + 1)} style={buttonStyle}>{label} <motion.span key={value} initial={reduceMotion ? false : { y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={spring}>{value}</motion.span></button>;
  }

  if (variant === "hold-meter" || variant === "hold-confirm") {
    return <button type="button" onPointerDown={() => setActive(true)} onPointerUp={() => setActive(false)} onPointerLeave={() => setActive(false)} onKeyDown={(event) => { if (event.key === " " || event.key === "Enter") setActive(true); }} onKeyUp={() => setActive(false)} aria-pressed={active} style={{ ...buttonStyle, position: "relative", overflow: "hidden" }}><motion.span aria-hidden="true" style={{ position: "absolute", inset: 0, background: accent, transformOrigin: "left", zIndex: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ duration: active ? 0.7 / Math.max(0.25, pace) : 0.12 }} /><span style={{ position: "relative", zIndex: 1 }}>{active ? "HOLDING…" : label}</span></button>;
  }

  const toggle = ["pulse-switch", "latch-action", "pressure-pad", "confirm-toggle", "playback-key"].includes(variant);
  const text = active
    ? variant === "sequence-key" ? "SEQUENCE LIVE" : variant === "playback-key" ? "Ⅱ  PAUSE" : variant === "confirm-toggle" ? "CONFIRMED" : "ENGAGED"
    : variant === "playback-key" ? "▶  PLAY" : label.toUpperCase();
  return (
    <button type="button" aria-pressed={toggle ? active : undefined} onClick={() => { setActive((current) => !current); setValue((current) => (current + 1) % 100); }} onPointerMove={(event) => { if (variant === "pressure-pad" && event.buttons) setActive(true); }} onPointerLeave={() => { if (variant === "pressure-pad") setActive(false); }} style={{ ...buttonStyle, minWidth: 150, minHeight: 56, position: "relative", overflow: "hidden", boxShadow: active ? `inset 0 0 0 ${Math.min(8, intensity / 2)}px ${accent}` : "none" }}>
      <motion.span aria-hidden="true" style={{ position: "absolute", width: variant === "meter-trigger" ? "72%" : 10, height: variant === "meter-trigger" ? 5 : 10, borderRadius: variant === "meter-trigger" ? 0 : "50%", background: accent, left: 8, top: variant === "meter-trigger" ? "50%" : 8, transformOrigin: "left center" }} animate={{ scale: active ? variant === "meter-trigger" ? [0.15, 1, 0.4] : variant === "press-ripple" ? 8 : 4 : 1, opacity: active ? variant === "press-ripple" ? 0.16 : 0.35 : 1 }} transition={spring} />
      <span style={{ position: "relative" }}>{text}</span>
    </button>
  );
}
