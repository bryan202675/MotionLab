import { useId } from "react";
import type { CSSProperties, HTMLAttributes } from "react";

export interface GrainFieldProps extends HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  blendMode?: CSSProperties["mixBlendMode"];
}

export function GrainField({
  opacity = 0.1,
  blendMode = "multiply",
  style,
  ...props
}: GrainFieldProps) {
  const id = useId().replaceAll(":", "");
  return (
    <div
      {...props}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: blendMode,
        ...style,
      }}
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <filter id={`motionlab-grain-${id}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#motionlab-grain-${id})`} opacity="0.7" />
      </svg>
    </div>
  );
}
