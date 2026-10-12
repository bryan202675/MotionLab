"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export interface ScrambleTextProps {
  text: string;
  alphabet?: string;
  duration?: number;
  trigger?: "mount" | "hover";
  onComplete?: () => void;
  className?: string;
}

const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function ScrambleText({
  text,
  alphabet = DEFAULT_ALPHABET,
  duration = 800,
  trigger = "mount",
  onComplete,
  className,
}: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const [animation, setAnimation] = useState<{ text: string; visible: string } | null>(null);
  const timerRef = useRef<number | null>(null);
  const visible = animation?.text === text ? animation.visible : trigger === "hover" ? text : "";
  const reveal = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    if (reduceMotion) {
      setAnimation({ text, visible: text });
      onComplete?.();
      return;
    }
    const started = Date.now();
    let resolved = false;
    timerRef.current = window.setInterval(() => {
      const progress = Math.min((Date.now() - started) / Math.max(duration, 1), 1);
      const stable = Math.floor(progress * text.length);
      const output = [...text].map((char, index) => {
        if (index < stable || char === " ") return char;
        return alphabet[Math.floor(Math.random() * alphabet.length)] ?? char;
      });
      setAnimation({ text, visible: output.join("") });
      if (progress === 1 && !resolved) {
        resolved = true;
        if (timerRef.current !== null) window.clearInterval(timerRef.current);
        timerRef.current = null;
        setAnimation({ text, visible: text });
        onComplete?.();
      }
    }, 32);
  }, [alphabet, duration, onComplete, reduceMotion, text]);

  useEffect(() => {
    if (trigger !== "mount") return;
    const timeout = window.setTimeout(reveal, 0);
    return () => {
      window.clearTimeout(timeout);
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [reveal, text, trigger]);

  return (
    <span className={className} onMouseEnter={trigger === "hover" ? reveal : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{visible || " "}</span>
    </span>
  );
}
