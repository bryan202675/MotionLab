import type { CSSProperties, HTMLAttributes } from "react";

export interface DotMatrixProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  spacing?: number;
  size?: number;
  opacity?: number;
}

export function DotMatrix({
  color = "currentColor",
  spacing = 18,
  size = 1.5,
  opacity = 0.35,
  style,
  ...props
}: DotMatrixProps) {
  const matrixStyle: CSSProperties = {
    backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
    backgroundSize: `${spacing}px ${spacing}px`,
    opacity,
    pointerEvents: "none",
    ...style,
  };
  return <div aria-hidden="true" {...props} style={matrixStyle} />;
}
