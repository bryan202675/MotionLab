import type { HTMLAttributes, ReactNode } from "react";

export interface SpecimenFrameProps extends HTMLAttributes<HTMLElement> {
  index: string;
  title: string;
  category?: string;
  status?: string;
  children: ReactNode;
}

export function SpecimenFrame({
  index,
  title,
  category = "Motion study",
  status = "Ready",
  children,
  style,
  ...props
}: SpecimenFrameProps) {
  return (
    <article
      {...props}
      style={{
        display: "grid",
        gap: 16,
        width: "min(100%, 440px)",
        padding: 18,
        border: "2px solid var(--ink, #101010)",
        background: "var(--paper, #f4f2ec)",
        color: "var(--ink, #101010)",
        boxShadow: "6px 6px 0 var(--ink, #101010)",
        ...style,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          gap: 16,
          borderBottom: "1px solid rgba(16,16,16,.2)",
          paddingBottom: 12,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              font: "600 9px var(--font-mono, monospace)",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            {category} / {index}
          </p>
          <h3
            style={{
              margin: "6px 0 0",
              font: "800 18px/1.1 var(--font-display, sans-serif)",
              letterSpacing: "-.03em",
            }}
          >
            {title}
          </h3>
        </div>
        <span
          style={{
            flexShrink: 0,
            padding: "4px 6px",
            background: "var(--acid, #dfff00)",
            color: "var(--acid-ink, #101010)",
            font: "700 9px var(--font-mono, monospace)",
            textTransform: "uppercase",
          }}
        >
          {status}
        </span>
      </header>
      <div>{children}</div>
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          font: "9px var(--font-mono, monospace)",
          textTransform: "uppercase",
          opacity: 0.55,
        }}
      >
        <span>MotionLab / specimen</span>
        <span aria-hidden="true">↗</span>
      </footer>
    </article>
  );
}
