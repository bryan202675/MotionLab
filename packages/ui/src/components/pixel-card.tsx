"use client";

import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pixelSize?: number;
  gap?: number;
  pixelColor?: string;
  speed?: number;
}

export function PixelCard({
  children,
  pixelSize = 6,
  gap = 2,
  pixelColor = "#dfff00",
  speed = 40,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = containerRef.current.clientWidth);
    let height = (canvas.height = containerRef.current.clientHeight);

    let intervalId: NodeJS.Timeout | null = null;

    const drawPixels = () => {
      ctx.clearRect(0, 0, width, height);
      if (!isHovered || reduceMotion) return;

      const cols = Math.floor(width / (pixelSize + gap));
      const rows = Math.floor(height / (pixelSize + gap));

      ctx.fillStyle = pixelColor;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (Math.random() < 0.08) {
            ctx.globalAlpha = Math.random() * 0.7 + 0.2;
            ctx.fillRect(
              c * (pixelSize + gap),
              r * (pixelSize + gap),
              pixelSize,
              pixelSize,
            );
          }
        }
      }
    };

    if (isHovered && !reduceMotion) {
      intervalId = setInterval(drawPixels, speed);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, pixelSize, gap, pixelColor, speed, reduceMotion]);

  return (
    <div
      {...props}
      ref={containerRef}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        border: "2px solid var(--ink, #101010)",
        backgroundColor: "var(--paper, #f4f2ec)",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
