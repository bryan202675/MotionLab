"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export const textStudyVariants = [
  "rivet-title", "foldline", "echo-stack", "glyph-climb", "stencil-shift", "word-steps",
  "vertical-flip", "ink-wash", "axis-caption", "type-pulse", "letter-wave", "baseline-drift",
  "counterwheel",
] as const;
export type TextStudyVariant = (typeof textStudyVariants)[number];

export interface TextStudyProps {
  label?: string;
  accent?: string;
  intensity?: number;
  pace?: number;
  variant: TextStudyVariant;
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
  const loop = canAnimate && ["type-pulse", "letter-wave", "baseline-drift", "counterwheel"].includes(variant);

  return (
    <span ref={rootRef} role="text" aria-label={label} style={{ display: "inline-flex", flexWrap: "wrap", fontWeight: 850, lineHeight: 1.05 }}>
      {glyphs.map((glyph, index) => {
        const visible = { opacity: 1, y: 0, rotateX: 0, rotateZ: 0, scale: 1, filter: "blur(0px)" };
        const animation = !canAnimate
          ? visible
          : variant === "foldline"
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
                                : { opacity: [0, 1], y: [distance, 0], rotateZ: [2, 0] };
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
