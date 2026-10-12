"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export const surfaceStudyVariants = [
  "tilt-pane", "flip-panel", "peel-surface", "stacked-deck", "spring-carousel", "depth-shelf",
  "gallery-frame", "perspective-window", "focus-tile", "overlap-editor", "follow-card",
  "bounce-gallery", "drift-panel", "magnetic-surface", "curtain-card", "window-stack", "edge-lift",
  "depth-frame", "shutter-tile", "hinge-panel", "magazine-spread", "spring-tile", "depth-window",
  "parallax-board", "corner-fold", "focus-aperture", "suspended-card", "deck-shuffle", "elastic-frame",
  "spotlight-surface", "stack-reveal", "perspective-deck", "tension-panel",
] as const;
export type SurfaceStudyVariant = (typeof surfaceStudyVariants)[number];

export interface SurfaceStudyProps {
  label?: string;
  accent?: string;
  intensity?: number;
  pace?: number;
  variant: SurfaceStudyVariant;
}

export function SurfaceStudy({
  label = "Surface study",
  accent = "var(--acid, #dfff00)",
  intensity = 12,
  pace = 1,
  variant,
}: SurfaceStudyProps) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 25 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 25 });
  const rotateY = useTransform(x, [-0.5, 0.5], [intensity, -intensity]);
  const rotateX = useTransform(y, [-0.5, 0.5], [-intensity, intensity]);
  const transition = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 280 * pace, damping: 24 };
  const hover = variant === "peel-surface" || variant === "corner-fold" ? { rotateX: -5, rotateY: 9, y: -4 } : variant === "depth-shelf" || variant === "depth-frame" || variant === "depth-window" ? { rotateX: 5, rotateY: -7, z: 24, scale: 1.03 } : variant === "bounce-gallery" || variant === "spring-tile" ? { y: -12, rotateZ: -2, scale: 1.04 } : variant === "drift-panel" || variant === "suspended-card" ? { y: -8, rotateZ: 1.5 } : variant === "focus-tile" ? { scale: 1.06, z: 14 } : variant === "hinge-panel" || variant === "magazine-spread" ? { rotateY: -14, x: 5 } : variant === "shutter-tile" || variant === "curtain-card" ? { clipPath: "inset(0 0 0 0 round 0px)", scale: 1.025 } : variant === "focus-aperture" ? { clipPath: "circle(72% at 50% 50%)", scale: 1.035 } : variant === "elastic-frame" || variant === "tension-panel" ? { scaleX: 1.035, scaleY: 0.98, rotateZ: 0.5 } : { y: -6, scale: 1.025 };
  const cardStyle = { display: "grid", alignContent: "space-between", gap: 24, width: "min(100%, 260px)", minHeight: 148, padding: 20, background: variant === "spotlight-surface" ? `radial-gradient(circle at 28% 25%, ${accent}, #f3f0e8 78%)` : accent, color: "var(--ink, #101010)", border: "2px solid currentColor", borderRadius: variant === "focus-aperture" ? 24 : variant === "spring-tile" ? 18 : 0, boxShadow: "6px 6px currentColor", transformStyle: "preserve-3d" as const, clipPath: variant === "focus-aperture" ? "circle(58% at 50% 50%)" : undefined, cursor: variant === "flip-panel" ? "pointer" : "default" };

  if (variant === "stacked-deck" || variant === "overlap-editor" || variant === "window-stack" || variant === "stack-reveal" || variant === "perspective-deck") {
    return <div style={{ position: "relative", width: 240, height: 170, perspective: 800 }}>{[2, 1, 0].map((depth) => <motion.div key={depth} aria-hidden={depth !== 0} animate={{ y: depth * 8, x: depth * 7, scale: 1 - depth * 0.06 }} whileHover={depth === 0 ? hover : undefined} transition={transition} style={{ ...cardStyle, position: "absolute", inset: 0, zIndex: 3 - depth, opacity: 1 - depth * 0.2, boxShadow: `${5 + depth}px ${5 + depth}px currentColor` }}><span style={{ font: "700 10px var(--font-mono, monospace)" }}>LAYER / {String(3 - depth).padStart(2, "0")}</span><strong style={{ fontSize: 20 }}>{depth === 0 ? label : `Study ${depth}`}</strong></motion.div>)}</div>;
  }

  if (variant === "spring-carousel" || variant === "deck-shuffle") {
    return <div style={{ display: "grid", justifyItems: "center", gap: 12 }}><motion.div key={flipped ? 1 : 0} initial={reduceMotion ? false : { opacity: 0.5, x: flipped ? 16 : -16, rotateZ: flipped ? 2 : -2 }} animate={{ opacity: 1, x: 0, rotateZ: 0 }} whileHover={hover} transition={transition} style={cardStyle}><span style={{ font: "700 10px var(--font-mono, monospace)" }}>{variant === "deck-shuffle" ? "DECK / " : "MOTION / "}{flipped ? "B" : "A"}</span><strong style={{ fontSize: 22 }}>{flipped ? "Second frame" : label}</strong><span style={{ font: "600 10px var(--font-mono, monospace)" }}>{variant === "deck-shuffle" ? "02 SELECTED" : "FRAME 01"}</span></motion.div><button type="button" aria-label="Advance card" onClick={() => setFlipped((current) => !current)} style={{ border: "1px solid currentColor", background: "transparent", padding: "7px 12px", cursor: "pointer" }}>{variant === "deck-shuffle" ? "SHUFFLE DECK ↗" : "NEXT FRAME ↗"}</button></div>;
  }

  if (variant === "magazine-spread") {
    return <div style={{ display: "flex", width: "min(100%, 300px)", minHeight: 150, perspective: 700, color: "var(--ink, #101010)" }}><motion.div whileHover={{ rotateY: -10, x: -3 }} transition={transition} style={{ ...cardStyle, width: "50%", minHeight: 150, background: "#f3f0e8", transformOrigin: "right center", boxShadow: "3px 5px currentColor" }}><span style={{ font: "700 10px var(--font-mono, monospace)" }}>ISSUE / 01</span><strong style={{ fontSize: 18 }}>Open the frame.</strong></motion.div><motion.div whileHover={{ rotateY: 10, x: 3 }} transition={transition} style={{ ...cardStyle, width: "50%", minHeight: 150, background: accent, transformOrigin: "left center", boxShadow: "3px 5px currentColor" }}><span style={{ font: "700 10px var(--font-mono, monospace)" }}>MOTION / 02</span><strong style={{ fontSize: 18 }}>{label}</strong></motion.div></div>;
  }

  return (
    <motion.div
      role={variant === "flip-panel" ? "button" : undefined}
      tabIndex={variant === "flip-panel" ? 0 : undefined}
      aria-label={variant === "flip-panel" ? `${label}, ${flipped ? "back" : "front"}` : undefined}
      aria-pressed={variant === "flip-panel" ? flipped : undefined}
      onClick={variant === "flip-panel" ? () => setFlipped((current) => !current) : undefined}
      onKeyDown={variant === "flip-panel" ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setFlipped((current) => !current); } } : undefined}
      onPointerMove={(event) => { if (reduceMotion || !event.currentTarget.matches(":hover")) return; const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left) / rect.width - 0.5); y.set((event.clientY - rect.top) / rect.height - 0.5); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      whileHover={reduceMotion ? undefined : hover}
      whileTap={variant === "flip-panel" ? undefined : { scale: 0.985 }}
      animate={variant === "flip-panel" ? { rotateY: flipped ? 180 : 0 } : undefined}
      transition={transition}
      style={{ ...cardStyle, perspective: 900, rotateX: variant === "tilt-pane" || variant === "follow-card" ? rotateX : undefined, rotateY: variant === "tilt-pane" || variant === "follow-card" ? rotateY : undefined }}
    >
      <span style={{ font: "700 10px var(--font-mono, monospace)" }}>{variant.replaceAll("-", " ").toUpperCase()} / 01</span>
      <strong style={{ fontSize: 21 }}>{variant === "flip-panel" && flipped ? "Turn the idea over." : label}</strong>
      <span style={{ font: "600 10px var(--font-mono, monospace)" }}>MOVE TO INSPECT ↗</span>
    </motion.div>
  );
}
