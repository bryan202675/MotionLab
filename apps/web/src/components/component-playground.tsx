"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, Download, Pause, Play, RotateCcw, Share2 } from "lucide-react";
import { categories, componentRegistry, getComponent } from "@/lib/component-registry";
import { ComponentDemo } from "./component-demo";
import { CopyButton } from "./copy-button";
import { useLanguage } from "./language-provider";

interface PlaygroundSettings {
  component: string;
  label: string;
  pace: number;
  intensity: number;
  accent: string;
}

const defaults: PlaygroundSettings = {
  component: "magnetic-button",
  label: "MAKE IT MOVE",
  pace: 1,
  intensity: 12,
  accent: "#dfff00",
};
const accents = ["#dfff00", "#5038ff", "#ff5638", "#f4f2ec"];

function quote(value: string) {
  return JSON.stringify(value);
}

function settingsFrom(value: unknown): Partial<PlaygroundSettings> {
  if (!value || typeof value !== "object") return {};
  const record = value as Record<string, unknown>;
  return {
    ...(typeof record.component === "string" && getComponent(record.component)
      ? { component: record.component }
      : {}),
    ...(typeof record.label === "string" ? { label: record.label.slice(0, 44) } : {}),
    ...(typeof record.pace === "number" && Number.isFinite(record.pace)
      ? { pace: Math.min(1.8, Math.max(0.5, record.pace)) }
      : {}),
    ...(typeof record.intensity === "number" && Number.isFinite(record.intensity)
      ? { intensity: Math.min(24, Math.max(4, record.intensity)) }
      : {}),
    ...(typeof record.accent === "string" && accents.includes(record.accent)
      ? { accent: record.accent }
      : {}),
  };
}

const PLAYGROUND_KEY = "motionlab-playground-v1";
const PLAYGROUND_EVENT = "motionlab-playground-change";

function getPlaygroundSnapshot() {
  if (typeof window === "undefined") return "";
  let saved = "";
  try {
    saved = window.localStorage.getItem(PLAYGROUND_KEY) ?? "";
  } catch {
    // Query configuration remains available when storage is denied.
  }
  return `${window.location.search}\n${saved}`;
}

function subscribePlayground(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(PLAYGROUND_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(PLAYGROUND_EVENT, onChange);
  };
}

function settingsFromSnapshot(snapshot: string): PlaygroundSettings {
  const separator = snapshot.indexOf("\n");
  const search = separator < 0 ? "" : snapshot.slice(0, separator);
  const raw = separator < 0 ? "" : snapshot.slice(separator + 1);
  let saved: Partial<PlaygroundSettings> = {};
  try {
    if (raw) saved = settingsFrom(JSON.parse(raw));
  } catch {
    // Invalid local settings fall back to defaults and URL settings.
  }
  const params = new URLSearchParams(search);
  const shared = settingsFrom({
    component: params.get("component"),
    label: params.get("label"),
    pace: params.has("pace") ? Number(params.get("pace")) : undefined,
    intensity: params.has("intensity") ? Number(params.get("intensity")) : undefined,
    accent: params.get("accent"),
  });
  return { ...defaults, ...saved, ...shared };
}

function buildCode(settings: PlaygroundSettings) {
  const entry = getComponent(settings.component);
  if (!entry) return "";
  const label = quote(settings.label);
  const pace = Number(settings.pace.toFixed(2));
  const intensity = Number(settings.intensity.toFixed(1));
  const accent = quote(settings.accent);
  const examples: Record<string, string> = {
    "kinetic-headline": `<KineticHeadline text={${label}} stagger={${(0.08 / pace).toFixed(3)}} />`,
    "split-reveal": `<SplitReveal text={${label}.replaceAll(" ", "\\n")} />`,
    "scramble-text": `<ScrambleText text={${label}} trigger="hover" duration={${Math.round(800 / pace)}} />`,
    "typing-loop": `<TypingLoop words={[${label}, "BUILT TO MOVE"]} typeSpeed={${Math.round(75 / pace)}} />`,
    "letter-cascade": `<LetterCascade text={${label}} stagger={${(0.03 / pace).toFixed(3)}} />`,
    "infinite-marquee": `<InfiniteMarquee duration={${(24 / pace).toFixed(1)}}>{${label}}</InfiniteMarquee>`,
    "magnetic-button": `<MagneticButton strength={${((0.18 * intensity) / 12).toFixed(2)}} style={{ background: ${accent} }}>{${label}}</MagneticButton>`,
    "pressable-button": `<PressableButton variant="acid" style={{ background: ${accent} }}>{${label}}</PressableButton>`,
    "glitch-button": `<GlitchButton label={${label}} color={${accent}} />`,
    "ripple-button": `<RippleButton style={{ background: ${accent} }}>{${label}}</RippleButton>`,
    "morphing-toggle": `<MorphingToggle label={${label}} defaultChecked />`,
    "elastic-switch": `<ElasticSwitch label={${label}} />`,
    "tilt-card": `<TiltCard intensity={${intensity}} style={{ background: ${accent} }}>{${label}}</TiltCard>`,
    "spotlight-card": `<SpotlightCard color={${quote(`${settings.accent}66`)}}>{${label}}</SpotlightCard>`,
    "expandable-card": `<ExpandableCard title={${label}}><p>Details go here.</p></ExpandableCard>`,
    "draggable-card": `<DraggableCard bounds={${Math.round(intensity * 6)}}>{${label}}</DraggableCard>`,
    "sliding-tabs": `<SlidingTabs label="Preview" tabs={[{ id: "one", label: "01", content: ${label} }]} />`,
    "brutalist-accordion": `<BrutalistAccordion items={[{ id: "one", title: ${label}, content: "Details" }]} />`,
    "motion-dock": `<MotionDock label="Actions" items={[{ id: "home", label: ${label}, icon: "↗", href: "/" }]} />`,
    "reveal-menu": `<RevealMenu items={[{ label: ${label}, href: "/" }]} />`,
    "dot-matrix": `<DotMatrix color={${accent}} spacing={18} />`,
    "grid-warp": `<GridWarp color={${quote(`${settings.accent}66`)}} intensity={${intensity}} />`,
    "cursor-trail": `<CursorTrail color={${accent}} particleCount={22} />`,
    "grain-field": `<GrainField opacity={0.08} />`,
    "metric-counter": `<MetricCounter value={98.6} label="Frame stability" decimals={1} suffix="%" />`,
    "shortcut-hint": `<ShortcutHint keys={["mod", "shift", "p"]} label="Open command panel" />`,
    "mode-selector": `<ModeSelector label="Preview mode" options={[{ value: "edit", label: "Edit" }, { value: "play", label: "Play" }]} />`,
    "run-control": `<RunControl onRunningChange={setRunning} />`,
    "hold-to-run": `<HoldToRun duration={900} onComplete={startSequence} />`,
    "axis-pad": `<AxisPad value={point} onValueChange={setPoint} />`,
    "easing-curve": `<EasingCurve name="Overshoot" values={[0.2, 0.9, 0.25, 1]} duration={0.72} />`,
    "motion-presets": `<MotionPresets presets={[{ id: "quiet", label: "Quiet", duration: 180, easing: "ease-out" }]} />`,
    "phase-rail": `<PhaseRail items={[{ id: "scope", label: "Scope" }, { id: "shape", label: "Shape" }, { id: "ship", label: "Ship" }]} />`,
    "layer-stack": `<LayerStack items={[{ id: "surface", label: "Surface", content: <p>Paper layer</p> }]} />`,
    "specimen-frame": `<SpecimenFrame index="014" title="Elastic response"><p>{${label}}</p></SpecimenFrame>`,
    "viewport-frame": `<ViewportFrame><Preview /></ViewportFrame>`,
    "timeline-scrubber": `<TimelineScrubber value={time} max={8} onValueChange={setTime} />`,
    "signal-scope": `<SignalScope label="Impact envelope" samples={[0, 0.2, -0.4, 0.6, 0]} />`,
  };
  return `import { ${entry.name} } from "@/components/ui/${entry.slug}";\n\nexport function Experiment() {\n  return (\n    ${examples[entry.slug] ?? entry.example}\n  );\n}`;
}

export function ComponentPlayground() {
  const { t, language } = useLanguage();
  const settingsSnapshot = useSyncExternalStore(
    subscribePlayground,
    getPlaygroundSnapshot,
    () => "",
  );
  const externalSettings = useMemo(
    () => settingsFromSnapshot(settingsSnapshot),
    [settingsSnapshot],
  );
  const [draft, setDraft] = useState<{ snapshot: string; settings: PlaygroundSettings } | null>(
    null,
  );
  const settings = draft?.snapshot === settingsSnapshot ? draft.settings : externalSettings;
  const [canvas, setCanvas] = useState<"wide" | "tablet" | "mobile">("wide");
  const [paused, setPaused] = useState(false);
  const [revision, setRevision] = useState(0);
  const [message, setMessage] = useState("");
  const selected = getComponent(settings.component) ?? componentRegistry[0];

  const updateSettings = (next: PlaygroundSettings) => {
    setDraft({ snapshot: settingsSnapshot, settings: next });
    try {
      localStorage.setItem(PLAYGROUND_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(PLAYGROUND_EVENT));
    } catch {
      setMessage("This browser blocked local storage. Settings remain available for this session.");
    }
  };

  const code = useMemo(() => buildCode(settings), [settings]);
  if (!selected)
    return (
      <div role="status" className="page-wrap">
        The component registry is empty.
      </div>
    );
  const setValue = <K extends keyof PlaygroundSettings>(key: K, value: PlaygroundSettings[K]) =>
    updateSettings({ ...settings, [key]: value });
  const supported = (name: string) => selected.props.some((prop) => prop.name === name);
  const share = async () => {
    const params = new URLSearchParams({
      component: settings.component,
      label: settings.label,
      pace: String(settings.pace),
      intensity: String(settings.intensity),
      accent: settings.accent,
    });
    const url = `${window.location.origin}/playground?${params.toString()}`;
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(PLAYGROUND_EVENT));
    try {
      await navigator.clipboard.writeText(url);
      setMessage(t.playground.linkCopied);
    } catch {
      setMessage("Share link is in the address bar. Clipboard permission was unavailable.");
    }
  };
  const exportJson = () => {
    const validated = { ...settings, schemaVersion: 1 };
    if (
      !getComponent(validated.component) ||
      !Number.isFinite(validated.pace) ||
      !Number.isFinite(validated.intensity) ||
      !accents.includes(validated.accent) ||
      validated.label.length > 44
    ) {
      setMessage("Configuration is invalid and was not exported.");
      return;
    }
    const blob = new Blob([JSON.stringify(validated, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `motionlab-${settings.component}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Configuration exported.");
  };

  return (
    <div className="playground page-wrap">
      <div className="playground-heading">
        <span className="section-kicker">{t.playground.kicker}</span>
        <h1 className="display">
          {language === "es" ? (
            <>
              EL
              <br />
              <span>LABORATORIO.</span>
            </>
          ) : (
            <>
              THE
              <br />
              <span>MOTION LAB.</span>
            </>
          )}
        </h1>
        <p>{t.playground.desc}</p>
      </div>
      <div className="playground-toolbar">
        <span className="mono">
          <i className="status-dot" /> {language === "es" ? "SESIÓN EN VIVO / GUARDADO LOCAL" : "LIVE SESSION / LOCAL SAVE"}
        </span>
        <div>
          <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
            {paused ? <Play size={14} /> : <Pause size={14} />}
            {paused ? t.playground.resume : t.playground.pause}
          </button>
          <button
            type="button"
            onClick={() => {
              updateSettings(defaults);
              setPaused(false);
              setRevision((value) => value + 1);
              setMessage(t.playground.defaultsRestored);
            }}
          >
            <RotateCcw size={14} /> {t.playground.reset}
          </button>
          <button type="button" onClick={share}>
            <Share2 size={14} /> {t.playground.share}
          </button>
          <button type="button" onClick={exportJson}>
            <Download size={14} /> {t.playground.exportJson}
          </button>
        </div>
      </div>
      <div className="playground-workspace">
        <aside className="playground-list" data-lenis-prevent>
          <div className="panel-label mono">
            {t.playground.components} <span>{String(componentRegistry.length).padStart(2, "0")}</span>
          </div>
          {categories.map((category) => (
            <section key={category}>
              <h2 className="mono">{t.categories[category] ?? category}</h2>
              {componentRegistry
                .filter((item) => item.category === category)
                .map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    className={item.slug === selected.slug ? "is-selected" : ""}
                    onClick={() => {
                      setValue("component", item.slug);
                      setPaused(false);
                      setRevision((value) => value + 1);
                    }}
                  >
                    <span>{String(componentRegistry.indexOf(item) + 1).padStart(2, "0")}</span>
                    {item.name}
                  </button>
                ))}
            </section>
          ))}
        </aside>
        <section className="playground-main" aria-label="Component preview and generated code">
          <div className="canvas-toolbar">
            <span className="mono">{t.playground.preview} / {selected.slug.toUpperCase()}</span>
            <div>
              {(["wide", "tablet", "mobile"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={canvas === value}
                  onClick={() => setCanvas(value)}
                >
                  {value.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="playground-canvas-scroll" data-lenis-prevent>
            <div
              className={`playground-canvas is-${canvas}`}
              key={`${selected.slug}-${revision}`}
            >
              {paused ? (
                <p className="mono">{t.playground.previewPaused}</p>
              ) : (
                <ComponentDemo
                  slug={selected.slug}
                  label={settings.label}
                  pace={settings.pace}
                  intensity={settings.intensity}
                  accent={settings.accent}
                />
              )}
            </div>
          </div>
          <div className="generated-code" data-lenis-prevent>
            <div className="code-panel-head mono">
              <span>{t.playground.generatedCode}</span>
              <CopyButton value={code} label={t.playground.copyCode} className="copy-button" />
            </div>
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        </section>
        <aside className="property-inspector" data-lenis-prevent>
          <div className="panel-label mono">
            {t.playground.inspector} <span>03</span>
          </div>
          <div className="selected-component">
            <span className="mono">{t.categories[selected.category] ?? selected.category}</span>
            <h2>{selected.name}</h2>
            <p>{(language === "es" && t.componentDescriptions[selected.slug]) || selected.description}</p>
            <Link href={`/components/${selected.slug}`}>
              {language === "es" ? "VER DOCUMENTACIÓN API" : "OPEN API REFERENCE"} <ArrowUpRight size={13} />
            </Link>
          </div>
          <label className="inspector-control">
            <span>
              <span className="mono">{t.playground.demoCopy}</span>
              <small>{settings.label.length}/44</small>
            </span>
            <input
              aria-label={t.playground.demoCopy}
              value={settings.label}
              maxLength={44}
              onChange={(event) => setValue("label", event.target.value)}
            />
          </label>
          {(supported("stagger") || supported("duration") || supported("typeSpeed")) && (
            <label className="inspector-control">
              <span>
                <span className="mono">PACE</span>
                <small>{settings.pace.toFixed(1)}×</small>
              </span>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={settings.pace}
                onChange={(event) => setValue("pace", Number(event.target.value))}
              />
            </label>
          )}
          {(supported("intensity") || supported("strength") || supported("radius")) && (
            <label className="inspector-control">
              <span>
                <span className="mono">{t.playground.response}</span>
                <small>{settings.intensity}</small>
              </span>
              <input
                type="range"
                min="4"
                max="24"
                step="1"
                value={settings.intensity}
                onChange={(event) => setValue("intensity", Number(event.target.value))}
              />
            </label>
          )}
          <fieldset className="inspector-control">
            <legend className="mono">{t.playground.componentAccent}</legend>
            <div className="color-swatches">
              {["#dfff00", "#5038ff", "#ff5638", "#f4f2ec"].map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Choose ${color}`}
                  aria-pressed={settings.accent === color}
                  style={{ background: color }}
                  onClick={() => setValue("accent", color)}
                />
              ))}
            </div>
          </fieldset>
          <div className="property-list">
            <span className="mono">{t.playground.exposedProps}</span>
            {selected.props.map((prop) => (
              <div key={prop.name}>
                <code>{prop.name}</code>
                <small>{prop.type}</small>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <p className="playground-live-message" role="status">
        {message}
      </p>
    </div>
  );
}
