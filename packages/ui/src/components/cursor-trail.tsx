"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export interface CursorTrailProps {
  color?: string;
  particleCount?: number;
  size?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  alpha: number;
  radius: number;
}

export function CursorTrail({
  color = "#5038ff",
  particleCount = 22,
  size = 5,
  className,
}: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (
      !canvas ||
      !parent ||
      !context ||
      reduceMotion ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;
    let visible = false;
    let frame = 0;
    let particles: Particle[] = [];
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const render = () => {
      if (!visible) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((particle) => particle.alpha > 0.03);
      for (const particle of particles) {
        context.globalAlpha = particle.alpha;
        context.fillStyle = color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        particle.alpha *= 0.91;
        particle.radius *= 0.985;
      }
      context.globalAlpha = 1;
      if (particles.length) frame = window.requestAnimationFrame(render);
      else frame = 0;
    };
    const pointerMove = (event: PointerEvent) => {
      if (!visible || event.pointerType !== "mouse") return;
      const rect = parent.getBoundingClientRect();
      particles.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        alpha: 0.8,
        radius: size,
      });
      if (particles.length > particleCount) particles.splice(0, particles.length - particleCount);
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) parent.addEventListener("pointermove", pointerMove);
      else {
        parent.removeEventListener("pointermove", pointerMove);
        particles = [];
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
    resize();
    observer.observe(parent);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      parent.removeEventListener("pointermove", pointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [color, particleCount, reduceMotion, size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
    />
  );
}
