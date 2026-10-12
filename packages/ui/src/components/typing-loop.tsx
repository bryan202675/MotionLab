"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";

export interface TypingLoopProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  loop?: boolean;
  cursor?: boolean;
  className?: string;
}

export function TypingLoop({
  words,
  typeSpeed = 75,
  deleteSpeed = 38,
  pause = 900,
  loop = true,
  cursor = true,
  className,
}: TypingLoopProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduceMotion = useReducedMotion();
  const safeWords = useMemo(() => words.filter((item) => item.length > 0), [words]);
  const word = safeWords[wordIndex] ?? "";

  useEffect(() => {
    if (!safeWords.length) return;
    if (reduceMotion) {
      const timeout = window.setTimeout(() => setLength(word.length), 0);
      return () => window.clearTimeout(timeout);
    }
    if (!deleting && length === word.length) {
      if (!loop && wordIndex === safeWords.length - 1) return;
      const timeout = window.setTimeout(() => setDeleting(true), pause);
      return () => window.clearTimeout(timeout);
    }
    if (deleting && length === 0) {
      const timeout = window.setTimeout(() => {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % safeWords.length);
      }, 0);
      return () => window.clearTimeout(timeout);
    }
    const timeout = window.setTimeout(
      () => {
        setLength((current) => current + (deleting ? -1 : 1));
      },
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => window.clearTimeout(timeout);
  }, [
    deleteSpeed,
    deleting,
    length,
    loop,
    pause,
    reduceMotion,
    safeWords,
    typeSpeed,
    word.length,
    wordIndex,
  ]);

  const shown = word.slice(0, length);
  return (
    <span className={className}>
      <span className="sr-only" aria-live="polite">
        {word}
      </span>
      <span aria-hidden="true">
        {shown}
        {cursor && <span aria-hidden="true">▍</span>}
      </span>
    </span>
  );
}
