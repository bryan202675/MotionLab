import type { HTMLAttributes } from "react";

export interface EasingCurveProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  values: [number, number, number, number];
  duration?: number;
  accent?: string;
}

export function EasingCurve({
  name,
  values,
  duration = 0.6,
  accent = "var(--acid, #dfff00)",
  style,
  ...props
}: EasingCurveProps) {
  const [x1, y1, x2, y2] = values;
  const path = `M 0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`;
  return (
    <div
      {...props}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 16,
        width: "min(100%, 360px)",
        padding: 16,
        border: "1px solid rgba(16,16,16,.2)",
        background: "var(--paper, #f4f2ec)",
        color: "var(--ink, #101010)",
        ...style,
      }}
    >
      <div>
        <strong
          style={{
            display: "block",
            marginBottom: 5,
            font: "700 12px var(--font-mono, monospace)",
            textTransform: "uppercase",
          }}
        >
          {name}
        </strong>
        <code style={{ font: "10px var(--font-mono, monospace)", opacity: 0.65 }}>
          cubic-bezier({values.map((item) => Number(item.toFixed(2))).join(", ")}) · {duration}s
        </code>
      </div>
      <svg
        aria-label={`${name} easing curve`}
        role="img"
        viewBox="0 0 100 100"
        width="60"
        height="60"
        style={{ overflow: "visible" }}
      >
        <path
          d="M 0 100 H 100 M 0 100 V 0"
          fill="none"
          stroke="rgba(16,16,16,.2)"
          strokeDasharray="2 3"
        />
        <path d={path} fill="none" stroke={accent} strokeWidth="5" strokeLinecap="square" />
        <circle cx={x1 * 100} cy={100 - y1 * 100} r="3" fill="var(--ink, #101010)" />
        <circle cx={x2 * 100} cy={100 - y2 * 100} r="3" fill="var(--ink, #101010)" />
      </svg>
    </div>
  );
}
