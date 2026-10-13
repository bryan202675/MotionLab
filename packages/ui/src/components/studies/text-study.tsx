"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export const textStudyVariants = [
  "rivet-title", "foldline", "echo-stack", "glyph-climb", "stencil-shift", "word-steps",
  "vertical-flip", "ink-wash", "axis-caption", "type-pulse", "letter-wave", "baseline-drift",
  "counterwheel", "soft-landing", "ribbon-type", "signal-stamp", "drift-caption", "split-register",
  "horizon-type", "rake-letters", "focus-pull", "afterimage", "type-lattice", "ink-set",
  "vertical-register", "paper-cut", "ripple-copy", "orbit-label", "glint-caption", "breath-line",
  "stepped-ink", "terminal-resolve", "soft-jitter",
] as const;
export type TextStudyVariant = (typeof textStudyVariants)[number];

export interface TextStudyProps {
  label?: string;
  accent?: string;
  intensity?: number;
  pace?: number;
  variant: TextStudyVariant;
}

function getAdditionalTextMotion(variant: TextStudyVariant, index: number, distance: number) {
  switch (variant) {
    case "soft-landing": return { opacity: [0, 1], y: [distance / 2, 0], filter: ["blur(6px)", "blur(0px)"] };
    case "ribbon-type": return { opacity: [0, 1], rotateZ: [index % 2 ? -18 : 18, 0], y: [index % 2 ? 5 : -5, 0] };
    case "signal-stamp": return { opacity: [0, 1], scale: [0.45, 1.08, 1], rotateZ: [index % 2 ? 7 : -7, 0] };
    case "drift-caption": return { opacity: [0, 1], x: [distance, 0], y: [index % 2 ? 2 : -2, 0] };
    case "split-register": return { opacity: [0, 1], x: [index % 2 ? -distance : distance, 0], y: [index % 2 ? 3 : -3, 0] };
    case "horizon-type": return { opacity: [0, 1], y: [distance, 0], scaleY: [0.7, 1] };
    case "rake-letters": return { opacity: [0, 1], x: [distance * (index % 2 ? -1 : 1), 0], rotateZ: [index % 2 ? -5 : 5, 0] };
    case "focus-pull": return { opacity: [0, 1], scale: [1.3, 1], filter: ["blur(4px)", "blur(0px)"] };
    case "afterimage": return { opacity: [0.15, 1], x: [index % 2 ? 9 : -9, 0], y: [4, 0], scale: [1.14, 1] };
    case "type-lattice": return { opacity: [0, 1], scaleX: [0.2, 1], x: [index % 2 ? 4 : -4, 0] };
    case "ink-set": return { opacity: [0, 1], y: [-distance / 2, 0], rotateZ: [index % 2 ? 2 : -2, 0] };
    case "vertical-register": return { opacity: [0, 1], rotateX: [index % 2 ? 70 : -70, 0], y: [distance / 2, 0] };
    case "paper-cut": return { opacity: [0, 1], x: [distance, 0], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] };
    case "ripple-copy": return { y: [0, index % 2 ? -distance / 2 : distance / 2, 0], opacity: [0.72, 1, 0.72] };
    case "orbit-label": return { opacity: [0, 1], rotateY: [index % 2 ? 80 : -80, 0], z: [-distance, 0] };
    case "glint-caption": return { opacity: [0.7, 1, 0.7], x: [-2, 0, 2] };
    case "breath-line": return { opacity: [0.72, 1, 0.72], scale: [1, 1.025, 1] };
    case "stepped-ink": return { opacity: [0, 1], y: [index % 3 * distance / 2, 0], x: [index % 2 ? -3 : 3, 0] };
    case "terminal-resolve": return { opacity: [0, 1], y: [distance / 3, 0], scaleX: [0.65, 1] };
    case "soft-jitter": return { rotateZ: [0, index % 2 ? 1.2 : -1.2, 0], y: [0, -1.5, 0] };
    default: return null;
  }
}

export function TextStudy({
  label = "Motion in progress",
  accent = "var(--electric, #5038ff)",
  intensity = 12,
  pace = 1,
  variant,
}: TextStudyProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(rootRef, { amount: 0.2 });
  const reduceMotion = useReducedMotion() ?? false;
  const distance = Math.max(2, Math.min(24, intensity));
  const duration = Math.max(0.18, 0.72 / Math.max(0.25, pace));
  const glyphs = Array.from(label);
  const canAnimate = !reduceMotion && isInView;
  const loop = canAnimate && ["type-pulse", "letter-wave", "baseline-drift", "counterwheel", "ripple-copy", "glint-caption", "breath-line", "soft-jitter"].includes(variant);

  return (
    <span ref={rootRef} role="text" aria-label={label} style={{ display: "inline-flex", flexWrap: "wrap", fontWeight: 850, lineHeight: 1.05 }}>
      {glyphs.map((glyph, index) => {
        const visible = { opacity: 1, y: 0, rotateX: 0, rotateZ: 0, scale: 1, filter: "blur(0px)" };
        const extendedAnimation = getAdditionalTextMotion(variant, index, distance);
        const animation = !canAnimate
          ? visible
          : extendedAnimation ??
          (variant === "foldline"
            ? { opacity: [0, 1], rotateX: [72, 0], y: [distance, 0] }
            : variant === "echo-stack"
              ? { opacity: [0.35, 1], x: [distance, 0], y: [distance / 2, 0] }
              : variant === "glyph-climb"
                ? { opacity: [0, 1], y: [distance, 0], rotateZ: [index % 2 ? 4 : -4, 0] }
                : variant === "stencil-shift"
                  ? { opacity: [0, 1], x: [index % 2 ? -distance : distance, 0] }
                  : variant === "vertical-flip"
                    ? { opacity: [0, 1], rotateX: [90, 0] }
                    : variant === "ink-wash"
                      ? { opacity: [0.2, 1], filter: ["blur(8px)", "blur(0px)"] }
                      : variant === "axis-caption"
                        ? { opacity: [0, 1], scaleX: [0.55, 1], y: [distance / 2, 0] }
                        : variant === "type-pulse"
                          ? { opacity: [0.45, 1, 0.45], y: [0, -distance / 3, 0] }
                          : variant === "letter-wave"
                            ? { y: [0, -distance, 0], rotateZ: [0, index % 2 ? 4 : -4, 0] }
                            : variant === "baseline-drift"
                              ? { y: [0, distance / 2, 0], rotateZ: [0, 2, 0] }
                              : variant === "counterwheel"
                                ? { opacity: [0, 1], rotateX: [-80, 0], y: [-distance, 0] }
                                : { opacity: [0, 1], y: [distance, 0], rotateZ: [2, 0] });
        const transition = {
          duration,
          delay: loop ? index * 0.055 : index * 0.035,
          ease: [0.22, 1, 0.36, 1] as const,
          repeat: loop ? Infinity : 0,
          repeatType: "mirror" as const,
          repeatDelay: loop ? 0.08 : 0,
        };

        return (
          <motion.span
            aria-hidden="true"
            key={`${index}-${glyph}`}
            initial={reduceMotion ? false : { opacity: 0, y: distance / 2 }}
            animate={animation}
            transition={transition}
            style={{ display: "inline-block", whiteSpace: "pre", color: accent, transformOrigin: "50% 100%" }}
          >
            {glyph === " " ? "\u00a0" : glyph}
          </motion.span>
        );
      })}
    </span>
  );
}
