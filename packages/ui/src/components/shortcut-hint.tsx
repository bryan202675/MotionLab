import type { HTMLAttributes } from "react";

export interface ShortcutHintProps extends HTMLAttributes<HTMLSpanElement> {
  keys: string[];
  label?: string;
  platform?: "mac" | "windows";
}

const platformKeys: Record<string, string> = {
  shift: "⇧",
  alt: "⌥",
  enter: "↵",
  escape: "esc",
  space: "space",
  arrowup: "↑",
  arrowdown: "↓",
  arrowleft: "←",
  arrowright: "→",
};

export function ShortcutHint({
  keys,
  label,
  platform = "mac",
  style,
  ...props
}: ShortcutHintProps) {
  const spokenKeys = keys.join(" + ");
  return (
    <span
      {...props}
      aria-label={label ? `${label}: ${spokenKeys}` : spokenKeys}
      style={{ display: "inline-flex", alignItems: "center", gap: 5, ...style }}
    >
      {keys.map((key, index) => {
        const normalized = key.toLowerCase();
        const display =
          normalized === "mod"
            ? platform === "mac"
              ? "⌘"
              : "Ctrl"
            : (platformKeys[normalized] ?? key);
        return (
          <span
            key={`${key}-${index}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
          >
            {index > 0 && (
              <span aria-hidden="true" style={{ opacity: 0.45 }}>
                +
              </span>
            )}
            <kbd
              aria-hidden="true"
              style={{
                minWidth: 22,
                padding: "4px 6px",
                border: "1px solid rgba(16,16,16,.2)",
                boxShadow: "0 2px 0 rgba(16,16,16,.16)",
                background: "var(--paper, #f4f2ec)",
                color: "var(--ink, #101010)",
                font: "600 11px/1 var(--font-mono, monospace)",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {display}
            </kbd>
          </span>
        );
      })}
    </span>
  );
}
