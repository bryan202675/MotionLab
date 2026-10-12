"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export const fieldStudyVariants = [
  "orbit-field", "contour-paper", "scan-matrix", "ripple-grid", "spark-cloud", "ribbon-vector",
  "chromatic-fan", "star-chart", "line-topography", "signal-horizon", "color-loom", "shard-field",
] as const;
export type FieldStudyVariant = (typeof fieldStudyVariants)[number];

export interface FieldStudyProps {
  label?: string;
  accent?: string;
  intensity?: number;
  pace?: number;
  variant: FieldStudyVariant;
}

export function FieldStudy({ accent = "var(--electric, #5038ff)", intensity = 12, pace = 1, variant }: FieldStudyProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(rootRef, { amount: 0.1 });
  const reduceMotion = useReducedMotion() ?? false;
  const animate = !reduceMotion && isInView;
  const duration = Math.max(2.5, 9 / Math.max(0.25, pace));
  const strength = Math.max(0.15, Math.min(1, intensity / 16));
  const lines = Array.from({ length: 9 }, (_, index) => index);
  const rootStyle = { width: "100%", height: 180, display: "block", position: "relative" as const, opacity: strength };

  if (variant === "orbit-field" || variant === "star-chart") {
    return (
      <svg ref={rootRef} aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        <g fill="none" stroke={accent} strokeWidth="1">
          {lines.slice(0, 5).map((index) => (
            <motion.ellipse key={index} cx="160" cy="80" rx={24 + index * 17} ry={10 + index * 8}
              animate={animate ? { rotate: index % 2 ? 360 : -360 } : undefined}
              transition={{ duration: duration + index, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "160px 80px" }} />
          ))}
        </g>
        {lines.map((index) => {
          const angle = (index / 9) * Math.PI * 2;
          const cx = 160 + Math.cos(angle) * (38 + index * 11);
          const cy = 80 + Math.sin(angle) * (15 + index * 7);
          return <motion.circle key={index} cx={cx} cy={cy} r={2 + index % 3} fill={accent}
            animate={animate ? { opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] } : undefined}
            transition={{ duration: duration / 2, repeat: Infinity, delay: index * 0.13 }} />;
        })}
      </svg>
    );
  }

  if (variant === "scan-matrix" || variant === "signal-horizon") {
    return (
      <svg ref={rootRef} aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        <defs><pattern id={`scan-${variant}`} width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 11.5H12" stroke={accent} strokeOpacity=".32" /></pattern></defs>
        <rect width="320" height="160" fill={`url(#scan-${variant})`} />
        <motion.rect width="320" height="2" fill={accent}
          animate={animate ? { y: [0, 158, 0], opacity: [0, 0.9, 0] } : undefined}
          transition={{ duration, repeat: Infinity, ease: "linear" }} />
        <path d="M0 114 Q40 82 80 114 T160 114 T240 114 T320 114" fill="none" stroke={accent} strokeWidth="2" />
      </svg>
    );
  }

  if (variant === "shard-field") {
    return (
      <svg ref={rootRef} aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" style={rootStyle}>
        {lines.map((index) => <motion.polygon key={index}
          points={`${index * 40},0 ${index * 40 + 32},${30 + index * 9} ${index * 40 + 8},160`}
          fill="none" stroke={accent} strokeWidth="1.5"
          animate={animate ? { x: [0, 10, 0], opacity: [0.24, 0.9, 0.24] } : undefined}
          transition={{ duration: duration + index / 3, repeat: Infinity, delay: index * 0.12 }} />)}
      </svg>
    );
  }

  if (variant === "ribbon-vector" || variant === "color-loom" || variant === "line-topography") {
    return (
      <svg ref={rootRef} aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        {lines.map((index) => <motion.path key={index}
          d={variant === "line-topography"
            ? `M-10 ${15 + index * 17} C70 ${-10 + index * 20}, 90 ${170 - index * 8}, 170 ${75 + index * 4} S260 ${index * 16}, 330 ${30 + index * 13}`
            : `M-10 ${20 + index * 16} C80 ${130 - index * 10}, 140 ${-20 + index * 13}, 330 ${20 + index * 14}`}
          fill="none" stroke={accent} strokeWidth={index % 3 === 0 ? 1.5 : 0.75}
          strokeOpacity={0.3 + (index % 4) * 0.14}
          strokeDasharray={variant === "ribbon-vector" ? "5 8" : undefined}
          animate={animate ? { pathLength: [0.35, 1, 0.35], x: [-8, 8, -8] } : undefined}
          transition={{ duration: duration + index / 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.11 }} />)}
      </svg>
    );
  }

  if (variant === "chromatic-fan") {
    return (
      <svg ref={rootRef} aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        {lines.map((index) => <motion.path key={index} d={`M160 190 L${-40 + index * 50} -20`}
          stroke={accent} strokeWidth="12" strokeOpacity=".12"
          animate={animate ? { rotate: [index % 2 ? -9 : 9, index % 2 ? 9 : -9] } : undefined}
          transition={{ duration: duration + index / 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          style={{ transformOrigin: "160px 80px" }} />)}
      </svg>
    );
  }

  return (
    <svg ref={rootRef} aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
      {variant === "ripple-grid"
        ? lines.map((index) => <motion.circle key={index} cx={40 + (index % 5) * 60} cy={30 + Math.floor(index / 5) * 65} r="16" fill="none" stroke={accent} strokeWidth="1.5"
          animate={animate ? { r: [5, 28, 5], opacity: [0.8, 0.05, 0.8] } : undefined}
          transition={{ duration, repeat: Infinity, delay: index * 0.2 }} />)
        : lines.map((index) => <motion.circle key={index} cx={(index * 43) % 320} cy={(index * 67) % 160} r={2 + index % 3} fill={accent}
          animate={animate ? { cy: [20 + (index * 11) % 120, 140 - (index * 9) % 100, 20 + (index * 11) % 120], opacity: [0.2, 0.9, 0.2] } : undefined}
          transition={{ duration: duration + index / 3, repeat: Infinity, delay: index * 0.17 }} />)}
    </svg>
  );
}
