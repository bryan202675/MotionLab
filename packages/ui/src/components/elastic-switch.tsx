"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface ElasticSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
}

export function ElasticSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
}: ElasticSwitchProps) {
  const [local, setLocal] = useState(defaultChecked);
  const reduceMotion = useReducedMotion();
  const value = checked ?? local;
  const handleClick = () => {
    if (disabled) return;
    const next = !value;
    if (checked === undefined) setLocal(next);
    onCheckedChange?.(next);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      style={{
        width: 72,
        height: 40,
        border: "2px solid #101010",
        borderRadius: 8,
        padding: 4,
        background: value ? "#5038ff" : "#dedcd4",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <motion.span
        animate={{ x: value ? 30 : 0, scaleX: value ? 1.15 : 1 }}
        transition={
          reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 16 }
        }
        style={{
          display: "block",
          width: 30,
          height: 28,
          background: "#fff",
          border: "2px solid #101010",
          borderRadius: 5,
        }}
      />
    </button>
  );
}
