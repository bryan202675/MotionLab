"use client";

import { useState } from "react";
import { Monitor, RotateCcw, Smartphone, Tablet } from "lucide-react";
import type { ComponentEntry } from "@/lib/component-registry";
import { ComponentDemo } from "./component-demo";

const canvases = [
  { id: "wide", label: "Wide preview", icon: Monitor, width: "100%" },
  { id: "tablet", label: "Tablet preview", icon: Tablet, width: "768px" },
  { id: "mobile", label: "Mobile preview", icon: Smartphone, width: "375px" },
] as const;

export function LivePreview({ component }: { component: ComponentEntry }) {
  const [label, setLabel] = useState(
    component.name
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toUpperCase(),
  );
  const [canvas, setCanvas] = useState<(typeof canvases)[number]["id"]>("wide");
  const [background, setBackground] = useState("#dfff00");
  const [version, setVersion] = useState(0);
  const activeCanvas = canvases.find((item) => item.id === canvas) ?? canvases[0];
  return (
    <section className="live-lab" aria-label={`${component.name} live preview`}>
      <div className="live-lab-toolbar">
        <span className="mono">
          <i className="status-dot" /> LIVE PREVIEW
        </span>
        <div className="canvas-tools" aria-label="Preview width">
          {canvases.map(({ id, label: toolLabel, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-label={toolLabel}
              aria-pressed={canvas === id}
              onClick={() => setCanvas(id)}
            >
              <Icon size={15} />
            </button>
          ))}
          <button
            type="button"
            aria-label="Restart preview"
            onClick={() => setVersion((current) => current + 1)}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
      <div className="live-canvas-wrap">
        <div className="live-canvas" style={{ width: activeCanvas.width, background }}>
          <ComponentDemo
            key={`${component.slug}-${version}`}
            slug={component.slug}
            label={label}
            pace={1}
            intensity={12}
            accent={background}
          />
        </div>
      </div>
      <div className="live-controls">
        <label>
          <span className="mono">DEMO LABEL</span>
          <input value={label} onChange={(event) => setLabel(event.target.value)} maxLength={44} />
        </label>
        <fieldset>
          <legend className="mono">CANVAS</legend>
          {["#dfff00", "#5038ff", "#f4f2ec"].map((color) => (
            <button
              key={color}
              aria-label={`Canvas color ${color}`}
              type="button"
              aria-pressed={background === color}
              onClick={() => setBackground(color)}
              style={{ background: color }}
            />
          ))}
        </fieldset>
      </div>
    </section>
  );
}
