"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export interface DockItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  onSelect?: () => void;
}

export interface MotionDockProps {
  items: DockItem[];
  label: string;
  className?: string;
  magnification?: number;
}

export function MotionDock({ items, label, className, magnification = 0.4 }: MotionDockProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const nodes = ref.current.querySelectorAll<HTMLElement>("[data-dock-item]");
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const proximity = Math.max(0, 1 - distance / 110);
      node.style.transform = `translateY(${-proximity * magnification * 18}px) scale(${1 + proximity * magnification})`;
    });
  };
  const reset = () =>
    ref.current?.querySelectorAll<HTMLElement>("[data-dock-item]").forEach((node) => {
      node.style.transform = "translateY(0) scale(1)";
    });
  return (
    <nav
      ref={ref}
      aria-label={label}
      onPointerMove={move}
      onPointerLeave={reset}
      className={className}
      style={{
        display: "flex",
        alignItems: "end",
        gap: 10,
        padding: 12,
        border: "2px solid currentColor",
        width: "fit-content",
      }}
    >
      {items.map((item) => {
        const common = {
          "data-dock-item": true,
          title: item.label,
          "aria-label": item.label,
          style: {
            width: 48,
            height: 48,
            display: "grid",
            placeItems: "center",
            border: "1px solid currentColor",
            background: "#dfff00",
            color: "#101010",
            transition: "transform 140ms ease-out",
            transformOrigin: "bottom center",
          },
        };
        return item.href ? (
          <a key={item.id} {...common} href={item.href}>
            {item.icon}
          </a>
        ) : (
          <button key={item.id} {...common} type="button" onClick={item.onSelect}>
            {item.icon}
          </button>
        );
      })}
    </nav>
  );
}
