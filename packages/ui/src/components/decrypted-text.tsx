"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface DecryptedTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  trigger?: "hover" | "mount";
}

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
  trigger = "hover",
  style,
  onMouseEnter,
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reduceMotion = useReducedMotion();

  const startDecryption = useCallback(() => {
    if (reduceMotion) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / (maxIterations / text.length)) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(""),
      );

      iteration += 1;
      if (iteration > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  }, [characters, maxIterations, reduceMotion, speed, text]);

  useEffect(() => {
    if (trigger !== "mount" || reduceMotion) return;
    const timeoutId = window.setTimeout(startDecryption, 0);
    return () => {
      window.clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reduceMotion, startDecryption, trigger]);

  return (
    <span
      {...props}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (trigger === "hover") startDecryption();
      }}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono, monospace)",
        ...style,
      }}
    >
      {displayText}
    </span>
  );
}
