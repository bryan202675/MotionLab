"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface WavesProps extends HTMLAttributes<HTMLCanvasElement> {
  lineColor?: string;
  waveCount?: number;
  waveSpeed?: number;
  amplitude?: number;
}

export function Waves({
  lineColor = "rgba(80, 56, 255, 0.3)",
  waveCount = 5,
  waveSpeed = 0.02,
  amplitude = 25,
  style,
  ...props
}: WavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let step = 0;
    let animationId: number;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!reduceMotion) step += waveSpeed;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = lineColor;

        const baseHeight = height / 2 + (i - waveCount / 2) * 20;

        for (let x = 0; x < width; x += 4) {
          const y =
            baseHeight +
            Math.sin(x * 0.008 + step + i * 0.5) * amplitude +
            Math.sin(x * 0.015 + step * 1.5) * (amplitude * 0.3);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [lineColor, waveCount, waveSpeed, amplitude, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        ...style,
      }}
      {...props}
    />
  );
}
