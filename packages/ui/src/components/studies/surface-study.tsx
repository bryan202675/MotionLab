"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export const surfaceStudyVariants = [
  "tilt-pane", "flip-panel", "peel-surface", "stacked-deck", "spring-carousel", "depth-shelf",
  "gallery-frame", "perspective-window", "focus-tile", "overlap-editor", "follow-card",
  "bounce-gallery", "drift-panel",
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
  const hover = variant === "peel-surface" ? { rotateX: -4, rotateY: 8, y: -4 } : variant === "depth-shelf" ? { rotateX: 5, rotateY: -7, z: 24, scale: 1.03 } : variant === "bounce-gallery" ? { y: -12, rotateZ: -2, scale: 1.04 } : variant === "drift-panel" ? { y: -8, rotateZ: 1.5 } : variant === "focus-tile" ? { scale: 1.06, z: 14 } : { y: -6, scale: 1.025 };
  const cardStyle = { display: "grid", alignContent: "space-between", gap: 24, width: "min(100%, 260px)", minHeight: 148, padding: 20, background: accent, color: "var(--ink, #101010)", border: "2px solid currentColor", boxShadow: "6px 6px currentColor", transformStyle: "preserve-3d" as const, cursor: variant === "flip-panel" ? "pointer" : "default" };

  if (variant === "stacked-deck" || variant === "overlap-editor") {
    return <div style={{ position: "relative", width: 240, height: 170, perspective: 800 }}>{[2, 1, 0].map((depth) => <motion.div key={depth} aria-hidden={depth !== 0} animate={{ y: depth * 8, x: depth * 7, scale: 1 - depth * 0.06 }} whileHover={depth === 0 ? hover : undefined} transition={transition} style={{ ...cardStyle, position: "absolute", inset: 0, zIndex: 3 - depth, opacity: 1 - depth * 0.2, boxShadow: `${5 + depth}px ${5 + depth}px currentColor` }}><span style={{ font: "700 10px var(--font-mono, monospace)" }}>LAYER / {String(3 - depth).padStart(2, "0")}</span><strong style={{ fontSize: 20 }}>{depth === 0 ? label : `Study ${depth}`}</strong></motion.div>)}</div>;
  }

  if (variant === "spring-carousel") {
    return <div style={{ display: "grid", justifyItems: "center", gap: 12 }}><motion.div whileHover={hover} transition={transition} style={cardStyle}><span style={{ font: "700 10px var(--font-mono, monospace)" }}>MOTION / {flipped ? "B" : "A"}</span><strong style={{ fontSize: 22 }}>{flipped ? "Second frame" : label}</strong></motion.div><button type="button" aria-label="Advance card" onClick={() => setFlipped((current) => !current)} style={{ border: "1px solid currentColor", background: "transparent", padding: "7px 12px", cursor: "pointer" }}>NEXT FRAME ↗</button></div>;
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
