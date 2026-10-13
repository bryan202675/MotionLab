"use client";

import { useEffect, useRef } from "react";

export interface ParticlesProps {
  particleColors?: string[];
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  moveParticlesOnHover?: boolean;
  alphaParticles?: boolean;
  disableRotation?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export function Particles({
  particleColors = ["#9888ff", "#dfff00"],
  particleCount = 120,
  speed = 0.1,
  particleBaseSize = 100,
  moveParticlesOnHover = true,
  alphaParticles = false,
  className,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight);

    const mouse = { x: -1000, y: -1000, radius: 100 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!moveParticlesOnHover) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const color = particleColors[i % particleColors.length] ?? "#9888ff";
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        size: (Math.random() * 2 + 1) * (particleBaseSize / 100),
        color,
        alpha: alphaParticles ? Math.random() * 0.7 + 0.3 : 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (!p1) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / 80) * 0.2;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles and update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse deflection
        if (moveParticlesOnHover && mouse.x > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 2;
            p.x += (dx / (dist || 1)) * force;
            p.y += (dy / (dist || 1)) * force;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    alphaParticles,
    moveParticlesOnHover,
    particleBaseSize,
    particleColors,
    particleCount,
    speed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: moveParticlesOnHover ? "auto" : "none",
      }}
    />
  );
}
