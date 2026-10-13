"use client";

import { useRef } from "react";
import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface ClickSparkProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkCount?: number;
  duration?: number;
}

export function ClickSpark({
  children,
  sparkColor = "#dfff00",
  sparkSize = 10,
  sparkCount = 8,
  duration = 450,
  style,
  onClick,
  ...props
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    if (reduceMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement("span");
      const angle = (i * 2 * Math.PI) / sparkCount;
      const distance = 25 + Math.random() * 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      spark.style.position = "absolute";
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${sparkSize}px`;
      spark.style.height = "2px";
      spark.style.backgroundColor = sparkColor;
      spark.style.borderRadius = "1px";
      spark.style.pointerEvents = "none";
      spark.style.zIndex = "999";
      spark.style.transformOrigin = "left center";
      spark.style.transform = `rotate(${angle}rad) scaleX(0)`;
      spark.style.transition = `transform ${duration}ms cubic-bezier(0.1, 1, 0.1, 1), opacity ${duration}ms ease-out`;

      containerRef.current.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${tx}px, ${ty}px) rotate(${angle}rad) scaleX(1)`;
        spark.style.opacity = "0";
      });

      setTimeout(() => {
        spark.remove();
      }, duration);
    }
  };

  return (
    <div
      {...props}
      ref={containerRef}
      onClick={handleClick}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
