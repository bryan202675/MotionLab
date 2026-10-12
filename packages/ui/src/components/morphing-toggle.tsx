"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface MorphingToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
}

export function MorphingToggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
}: MorphingToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const reduceMotion = useReducedMotion();
  const isChecked = checked ?? internalChecked;
  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (checked === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={label}
      disabled={disabled}
      onClick={toggle}
      style={{
        width: 64,
        height: 36,
        padding: 4,
        border: "2px solid #101010",
        borderRadius: 999,
        background: isChecked ? "#dfff00" : "#aaa9a1",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <motion.span
        animate={{ x: isChecked ? 28 : 0, borderRadius: isChecked ? "50% 50% 38% 50%" : "50%" }}
        transition={
          reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 20 }
        }
        style={{ display: "block", width: 24, height: 24, background: "#101010" }}
      />
    </button>
  );
}
