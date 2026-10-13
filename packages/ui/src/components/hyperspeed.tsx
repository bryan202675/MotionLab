"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

export interface HyperspeedProps extends HTMLAttributes<HTMLCanvasElement> {
  starCount?: number;
  speed?: number;
  color?: string;
}

export function Hyperspeed({
  starCount = 180,
  speed = 4,
  color = "#dfff00",
  style,
  ...props
}: HyperspeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    interface Star {
      x: number;
      y: number;
      z: number;
      pz: number;
    }

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: Math.random() * width,
    }));

    let animationId: number;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", resize);

    const cx = width / 2;
    const cy = height / 2;

    const draw = () => {
      ctx.fillStyle = "rgba(16, 16, 16, 0.35)";
      ctx.fillRect(0, 0, width, height);

      const currentSpeed = reduceMotion ? 0.4 : speed;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= currentSpeed * 2;

        if (s.z <= 0) {
          s.z = width;
          s.pz = width;
          s.x = (Math.random() - 0.5) * width * 2;
          s.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        const pk = 250 / s.pz;
        const ppx = s.x * pk + cx;
        const ppy = s.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1 - s.z / width) * 1.5);
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = color;
          ctx.lineWidth = Math.max(1, (1 - s.z / width) * 3);
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [starCount, speed, color, reduceMotion]);

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
