"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";

export type AddedFieldStudyVariant =
  | "ribbon-mesh" | "wave-grid" | "wireframe-hills" | "contour-drift" | "angular-flow"
  | "radial-loom" | "moire-window" | "petal-array"
  | "dot-migration" | "signal-constellation" | "particle-drift"
  | "beacon-sweep" | "ripple-basin" | "lens-rings"
  | "crosshair-field" | "raster-rain" | "folded-grid" | "soft-gridlight";

const addedFieldStudyVariants = new Set<string>([
  "ribbon-mesh", "wave-grid", "wireframe-hills", "contour-drift", "angular-flow",
  "radial-loom", "moire-window", "petal-array", "dot-migration", "signal-constellation",
  "particle-drift", "beacon-sweep", "ripple-basin", "lens-rings", "crosshair-field",
  "raster-rain", "folded-grid", "soft-gridlight",
]);

export function isAddedFieldStudyVariant(variant: string): variant is AddedFieldStudyVariant {
  return addedFieldStudyVariants.has(variant);
}

interface FieldStudyAdditionProps {
  accent: string;
  animate: boolean;
  duration: number;
  instanceId: string;
  rootStyle: CSSProperties;
  variant: AddedFieldStudyVariant;
}

export function getFieldStudyAddition({
  accent,
  animate,
  duration,
  instanceId,
  rootStyle,
  variant,
}: FieldStudyAdditionProps) {
  const lines = Array.from({ length: 9 }, (_, index) => index);

  if (["ribbon-mesh", "wave-grid", "wireframe-hills", "contour-drift", "angular-flow"].includes(variant)) {
    return (
      <svg aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        {lines.map((index) => {
          const y = 16 + index * 16;
          const path = variant === "wave-grid"
            ? `M-8 ${y} C38 ${y - 22}, 62 ${y + 22}, 108 ${y} S178 ${y - 22}, 224 ${y} S286 ${y + 22}, 328 ${y}`
            : variant === "ribbon-mesh"
              ? `M-8 ${index * 22 - 16} C90 ${index * 16 + 36}, 210 ${140 - index * 14}, 328 ${index * 20}`
              : variant === "wireframe-hills"
                ? `M-8 ${y + 15} Q48 ${y - 25 - index * 2} 102 ${y + 5} T210 ${y - 4} T328 ${y + 10}`
                : variant === "angular-flow"
                  ? `M-8 ${y} H${45 + index * 8} V${y + 15} H${155 + index * 4} V${y - 12} H328`
                  : `M-8 ${y} C72 ${y - 14}, 112 ${y + 18}, 164 ${y} S252 ${y - 18}, 328 ${y + 8}`;
          return (
            <motion.path
              key={index}
              d={path}
              fill="none"
              stroke={accent}
              strokeWidth={index % 3 === 0 ? 1.4 : 0.7}
              strokeOpacity={0.32 + (index % 4) * 0.12}
              animate={animate ? {
                x: [variant === "angular-flow" ? 0 : -5, variant === "angular-flow" ? 0 : 5, 0],
                y: variant === "contour-drift" ? [0, index % 2 ? -5 : 5, 0] : 0,
                pathLength: variant === "angular-flow" ? [0.7, 1, 0.7] : 1,
              } : undefined}
              transition={{ duration: duration + index / 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.08 }}
            />
          );
        })}
      </svg>
    );
  }

  if (["radial-loom", "moire-window", "petal-array"].includes(variant)) {
    return (
      <svg aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        <g transform={variant === "moire-window" ? "translate(18 0)" : undefined}>
          {lines.map((index) => variant === "petal-array" ? (
            <motion.ellipse
              key={index}
              cx="160"
              cy="80"
              rx={10 + index * 5}
              ry={34}
              fill="none"
              stroke={accent}
              strokeOpacity={0.24 + (index % 4) * 0.13}
              transform={`rotate(${index * 20} 160 80)`}
              animate={animate ? { rotate: [index * 20, index * 20 + 360] } : undefined}
              transition={{ duration: duration * 2 + index, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "160px 80px" }}
            />
          ) : (
            <motion.path
              key={index}
              d={variant === "radial-loom"
                ? `M160 80 L${160 + Math.cos(index * Math.PI / 9) * 190} ${80 + Math.sin(index * Math.PI / 9) * 120}`
                : `M${-20 + index * 42} -10 C${65 + index * 16} 35, ${100 + index * 12} 125, ${340 - index * 32} 170`}
              fill="none"
              stroke={accent}
              strokeOpacity={0.22 + (index % 5) * 0.12}
              strokeWidth={variant === "moire-window" ? 1.2 : 0.9}
              animate={animate ? {
                rotate: variant === "radial-loom" ? [index % 2 ? -2 : 2, index % 2 ? 2 : -2] : 0,
                x: variant === "moire-window" ? [0, index % 2 ? -4 : 4, 0] : 0,
              } : undefined}
              transition={{ duration: duration + index / 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "160px 80px" }}
            />
          ))}
        </g>
      </svg>
    );
  }

  if (["dot-migration", "signal-constellation", "particle-drift"].includes(variant)) {
    const points = Array.from({ length: 12 }, (_, index) => ({
      x: 24 + ((index * 71) % 270),
      y: 18 + ((index * 47) % 124),
    }));
    return (
      <svg aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        {variant === "signal-constellation" ? points.slice(0, 8).map((point, index) => {
          const target = points[(index + 3) % 8];
          return target ? <line key={`edge-${index}`} x1={point.x} y1={point.y} x2={target.x} y2={target.y} stroke={accent} strokeOpacity=".3" /> : null;
        }) : null}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={variant === "signal-constellation" ? 2.5 : 1.8 + index % 2}
            fill={accent}
            animate={animate ? {
              cx: variant === "particle-drift"
                ? [point.x, point.x + (index % 2 ? 8 : -8), point.x]
                : [point.x, point.x + (index % 3 - 1) * 6, point.x],
              cy: [point.y, point.y + (index % 2 ? -5 : 5), point.y],
              opacity: [0.2, 0.9, 0.2],
            } : undefined}
            transition={{ duration: duration + index / 2, repeat: Infinity, delay: index * 0.13 }}
          />
        ))}
      </svg>
    );
  }

  if (["beacon-sweep", "ripple-basin", "lens-rings"].includes(variant)) {
    return (
      <svg aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        {variant === "beacon-sweep" ? (
          <>
            <circle cx="160" cy="80" r="4" fill={accent} />
            <circle cx="160" cy="80" r="62" fill="none" stroke={accent} strokeOpacity=".45" />
            {[0, 1].map((index) => (
              <motion.path
                key={index}
                d="M160 80 L160 18 A62 62 0 0 1 204 36 Z"
                fill={accent}
                fillOpacity={index ? ".08" : ".2"}
                style={{ transformOrigin: "160px 80px" }}
                animate={animate ? { rotate: 360 } : undefined}
                transition={{ duration: duration * (index + 1), repeat: Infinity, ease: "linear" }}
              />
            ))}
          </>
        ) : lines.slice(0, 7).map((index) => (
          <motion.circle
            key={index}
            cx={variant === "lens-rings" ? 160 + (index % 2 ? 12 : -12) : 160 + (index % 3 - 1) * 12}
            cy={80 + (index % 2 ? 5 : -5)}
            r={12 + index * 10}
            fill="none"
            stroke={accent}
            strokeWidth={variant === "lens-rings" ? 1.2 : 1}
            strokeOpacity={0.58 - index * 0.055}
            animate={animate ? {
              r: variant === "ripple-basin" ? [12 + index * 9, 18 + index * 9, 12 + index * 9] : [12 + index * 10, 15 + index * 10, 12 + index * 10],
              opacity: [0.16, 0.7, 0.16],
            } : undefined}
            transition={{ duration: duration + index * 0.42, repeat: Infinity, delay: index * 0.17 }}
          />
        ))}
      </svg>
    );
  }

  if (["crosshair-field", "raster-rain", "folded-grid", "soft-gridlight"].includes(variant)) {
    if (variant === "soft-gridlight") {
      return (
        <svg aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
          <defs><radialGradient id={`light-${instanceId}`}><stop stopColor={accent} stopOpacity=".48" /><stop offset="1" stopColor={accent} stopOpacity="0" /></radialGradient></defs>
          <path d="M0 20H320M0 60H320M0 100H320M0 140H320M40 0V160M100 0V160M160 0V160M220 0V160M280 0V160" stroke={accent} strokeOpacity=".16" />
          <motion.circle r="72" fill={`url(#light-${instanceId})`} animate={animate ? { cx: [60, 250, 60], cy: [48, 118, 48] } : { cx: 160, cy: 80 }} transition={{ duration: duration * 2, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
      );
    }
    return (
      <svg aria-hidden="true" viewBox="0 0 320 160" preserveAspectRatio="none" style={rootStyle}>
        {variant === "folded-grid" ? (
          <g fill="none" stroke={accent} strokeOpacity=".55">
            {Array.from({ length: 9 }, (_, index) => <path key={index} d={`M${index * 40} 0 L160 80 L${index * 40} 160 M${index * 40} 0 L${160 + (index - 4) * 18} 80 L${320 - index * 40} 160`} />)}
          </g>
        ) : Array.from({ length: variant === "raster-rain" ? 32 : 16 }, (_, index) => variant === "crosshair-field" ? (
          <g key={index} transform={`translate(${(index * 83) % 320} ${(index * 47) % 160})`}>
            <path d="M-4 0H4M0 -4V4" stroke={accent} strokeOpacity=".7" />
            <circle r="7" fill="none" stroke={accent} strokeOpacity=".18" />
          </g>
        ) : (
          <motion.rect
            key={index}
            x={(index * 29) % 320}
            width={index % 4 === 0 ? 2 : 1}
            height={4 + index % 7}
            fill={accent}
            animate={animate ? { y: [-10, 170], opacity: [0, 0.8, 0] } : undefined}
            transition={{ duration: duration / 2 + index * 0.08, repeat: Infinity, delay: index * 0.09, ease: "linear" }}
          />
        ))}
      </svg>
    );
  }

  return null;
}
