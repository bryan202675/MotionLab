import type { HTMLAttributes } from "react";

export interface SignalScopeProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  samples: number[];
  label?: string;
  color?: string;
  min?: number;
  max?: number;
}

export function SignalScope({
  samples,
  label = "Signal preview",
  color = "var(--electric, #5038ff)",
  min = -1,
  max = 1,
  style,
  ...props
}: SignalScopeProps) {
  const range = max - min || 1;
  const points = samples
    .map((sample, index) => {
      const x = samples.length < 2 ? 50 : (index / (samples.length - 1)) * 100;
      const y = 90 - ((sample - min) / range) * 80;
      return `${x.toFixed(2)},${Math.min(100, Math.max(0, y)).toFixed(2)}`;
    })
    .join(" ");
  return (
    <div
      {...props}
      style={{
        width: "min(100%, 460px)",
        padding: 12,
        border: "2px solid var(--ink, #101010)",
        background: "var(--paper, #f4f2ec)",
        color: "var(--ink, #101010)",
        boxShadow: "5px 5px 0 var(--ink, #101010)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 8,
          font: "700 9px var(--font-mono, monospace)",
          textTransform: "uppercase",
        }}
      >
        <span>{label}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <i
            aria-hidden="true"
            style={{ width: 7, height: 7, background: "var(--signal, #ff5638)" }}
          />
          {samples.length} samples
        </span>
      </div>
      <svg
        role="img"
        aria-label={`${label}, ${samples.length} data points`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: 108,
          backgroundImage:
            "linear-gradient(rgba(16,16,16,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(16,16,16,.08) 1px, transparent 1px)",
          backgroundSize: "10% 25%",
        }}
      >
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke="rgba(16,16,16,.22)"
          strokeDasharray="1 2"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
