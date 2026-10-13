"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

export interface SquaresProps extends HTMLAttributes<HTMLCanvasElement> {
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
}

export function Squares({
  squareSize = 40,
  borderColor = "rgba(16, 16, 16, 0.12)",
  hoverFillColor = "rgba(223, 255, 0, 0.25)",
  style,
  ...props
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const hoveredSquares = new Map<string, number>();
    let animationId: number;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / squareSize);
      const row = Math.floor(y / squareSize);
      hoveredSquares.set(`${col},${row}`, 1.0);
    };

    canvas.parentElement?.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / squareSize);
      const rows = Math.ceil(height / squareSize);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * squareSize;
          const y = r * squareSize;
          const key = `${c},${r}`;
          const intensity = hoveredSquares.get(key);

          if (intensity !== undefined && intensity > 0.01) {
            ctx.fillStyle = hoverFillColor;
            ctx.globalAlpha = intensity;
            ctx.fillRect(x, y, squareSize, squareSize);
            ctx.globalAlpha = 1;
            hoveredSquares.set(key, intensity * 0.94);
          } else if (intensity !== undefined) {
            hoveredSquares.delete(key);
          }

          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMouseMove);
    };
  }, [squareSize, borderColor, hoverFillColor]);

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
