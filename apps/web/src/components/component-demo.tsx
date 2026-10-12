"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { ComponentType } from "react";
import { getComponent } from "@/lib/component-registry";
import { StudyPreview } from "./study-preview";

export interface DemoProps {
  label: string;
  pace: number;
  intensity: number;
  accent: string;
}

const Kinetic = dynamic<DemoProps>(() =>
  import("@motionlab/ui/kinetic-headline").then(({ KineticHeadline }) => ({
    default: ({ label, pace }) => <KineticHeadline text={label} stagger={0.08 / pace} />,
  })),
);
const Split = dynamic<DemoProps>(() =>
  import("@motionlab/ui/split-reveal").then(({ SplitReveal }) => ({
    default: ({ label, pace }) => (
      <SplitReveal text={label.replaceAll(" ", "\n")} stagger={0.12 / pace} />
    ),
  })),
);
const Scramble = dynamic<DemoProps>(() =>
  import("@motionlab/ui/scramble-text").then(({ ScrambleText }) => ({
    default: ({ label, pace }) => (
      <ScrambleText text={label.toUpperCase()} duration={800 / pace} trigger="hover" />
    ),
  })),
);
const Typing = dynamic<DemoProps>(() =>
  import("@motionlab/ui/typing-loop").then(({ TypingLoop }) => ({
    default: ({ label, pace }) => (
      <TypingLoop words={[label, "BUILT TO MOVE"]} typeSpeed={75 / pace} deleteSpeed={40 / pace} />
    ),
  })),
);
const Letters = dynamic<DemoProps>(() =>
  import("@motionlab/ui/letter-cascade").then(({ LetterCascade }) => ({
    default: ({ label, pace }) => (
      <LetterCascade text={label.toUpperCase()} stagger={0.03 / pace} />
    ),
  })),
);
const Marquee = dynamic<DemoProps>(() =>
  import("@motionlab/ui/infinite-marquee").then(({ InfiniteMarquee }) => ({
    default: ({ label, pace }) => (
      <InfiniteMarquee duration={24 / pace}>
        <strong>{label.toUpperCase()} —</strong>
        <strong>NO BORING UI —</strong>
      </InfiniteMarquee>
    ),
  })),
);
const Magnetic = dynamic<DemoProps>(() =>
  import("@motionlab/ui/magnetic-button").then(({ MagneticButton }) => ({
    default: ({ label, intensity, accent }) => (
      <MagneticButton
        strength={(0.18 * intensity) / 12}
        style={{
          padding: "14px 20px",
          border: "2px solid #101010",
          background: accent,
          color: "#101010",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        {label}
      </MagneticButton>
    ),
  })),
);
const Pressable = dynamic<DemoProps>(() =>
  import("@motionlab/ui/pressable-button").then(({ PressableButton }) => ({
    default: ({ label, accent }) => (
      <PressableButton variant="acid" style={{ background: accent, color: "#101010" }}>
        {label}
      </PressableButton>
    ),
  })),
);
const Glitch = dynamic<DemoProps>(() =>
  import("@motionlab/ui/glitch-button").then(({ GlitchButton }) => ({
    default: ({ label, accent }) => <GlitchButton label={label} color={accent} />,
  })),
);
const Ripple = dynamic<DemoProps>(() =>
  import("@motionlab/ui/ripple-button").then(({ RippleButton }) => ({
    default: ({ label, accent }) => (
      <RippleButton style={{ background: accent, color: "#101010" }}>{label}</RippleButton>
    ),
  })),
);
const Morph = dynamic<DemoProps>(() =>
  import("@motionlab/ui/morphing-toggle").then(({ MorphingToggle }) => ({
    default: ({ label }) => <MorphingToggle label={label} defaultChecked />,
  })),
);
const Elastic = dynamic<DemoProps>(() =>
  import("@motionlab/ui/elastic-switch").then(({ ElasticSwitch }) => ({
    default: ({ label }) => <ElasticSwitch label={label} />,
  })),
);
const Tilt = dynamic<DemoProps>(() =>
  import("@motionlab/ui/tilt-card").then(({ TiltCard }) => ({
    default: ({ label, intensity, accent }) => (
      <TiltCard
        intensity={intensity}
        style={{
          padding: 24,
          width: 220,
          minHeight: 130,
          background: accent,
          color: "#101010",
          border: "2px solid #101010",
          boxShadow: "6px 6px #101010",
        }}
      >
        <strong>{label}</strong>
      </TiltCard>
    ),
  })),
);
const Spotlight = dynamic<DemoProps>(() =>
  import("@motionlab/ui/spotlight-card").then(({ SpotlightCard }) => ({
    default: ({ label, accent }) => (
      <SpotlightCard
        color={`${accent}66`}
        style={{
          width: 230,
          minHeight: 132,
          padding: 24,
          color: "var(--ink, #101010)",
          border: "2px solid #101010",
        }}
      >
        <strong>{label}</strong>
      </SpotlightCard>
    ),
  })),
);
const Expandable = dynamic<DemoProps>(() =>
  import("@motionlab/ui/expandable-card").then(({ ExpandableCard }) => ({
    default: ({ label }) => (
      <ExpandableCard title={label} summary="Click to inspect">
        <p>Built for interaction. Ready to ship.</p>
      </ExpandableCard>
    ),
  })),
);
const Draggable = dynamic<DemoProps>(() =>
  import("@motionlab/ui/draggable-card").then(({ DraggableCard }) => ({
    default: ({ label, accent }) => (
      <DraggableCard
        bounds={70}
        style={{
          padding: 24,
          background: accent,
          color: "#101010",
          border: "2px solid #101010",
          boxShadow: "5px 5px #101010",
        }}
      >
        {label}
      </DraggableCard>
    ),
  })),
);
const Tabs = dynamic<DemoProps>(() =>
  import("@motionlab/ui/sliding-tabs").then(({ SlidingTabs }) => ({
    default: ({ label, accent }) => (
      <SlidingTabs
        label="Experiment preview"
        tabs={[
          { id: "one", label: "01", content: <strong>{label}</strong> },
          {
            id: "two",
            label: "02",
            content: <strong style={{ color: accent }}>Tuned to move.</strong>,
          },
        ]}
      />
    ),
  })),
);
const Accordion = dynamic<DemoProps>(() =>
  import("@motionlab/ui/brutalist-accordion").then(({ BrutalistAccordion }) => ({
    default: ({ label }) => (
      <div style={{ width: "min(100%, 320px)" }}>
        <BrutalistAccordion
          items={[
            {
              id: "item-1",
              title: label,
              content: "Spring-backed accordion designed with tactile resistance.",
            },
            {
              id: "item-2",
              title: "Source first",
              content: "Own the component. Adapt it to your design tokens.",
            },
          ]}
        />
      </div>
    ),
  })),
);
const Dock = dynamic<DemoProps>(() =>
  import("@motionlab/ui/motion-dock").then(({ MotionDock }) => ({
    default: () => (
      <MotionDock
        label="Workspace dock"
        items={[
          { id: "1", label: "Play", icon: "▶" },
          { id: "2", label: "Pause", icon: "⏸" },
          { id: "3", label: "Stop", icon: "⏹" },
          { id: "4", label: "Loop", icon: "↺" },
        ]}
      />
    ),
  })),
);
const Menu = dynamic<DemoProps>(() =>
  import("@motionlab/ui/reveal-menu").then(({ RevealMenu }) => ({
    default: () => (
      <RevealMenu
        items={[
          { label: "Components", href: "/components" },
          { label: "Playground", href: "/playground" },
          { label: "Manual", href: "/docs" },
        ]}
      />
    ),
  })),
);
const Dots = dynamic<DemoProps>(() =>
  import("@motionlab/ui/dot-matrix").then(({ DotMatrix }) => ({
    default: ({ accent }) => (
      <DotMatrix color={accent} style={{ position: "absolute", inset: 0 }} />
    ),
  })),
);
const Grid = dynamic<DemoProps>(() =>
  import("@motionlab/ui/grid-warp").then(({ GridWarp }) => ({
    default: ({ accent, intensity }) => (
      <GridWarp
        color={`${accent}66`}
        intensity={intensity}
        style={{ position: "absolute", inset: 0 }}
      />
    ),
  })),
);
const Trail = dynamic<DemoProps>(() =>
  import("@motionlab/ui/cursor-trail").then(({ CursorTrail }) => ({
    default: ({ accent }) => <CursorTrail color={accent} />,
  })),
);
const Grain = dynamic<DemoProps>(() =>
  import("@motionlab/ui/grain-field").then(({ GrainField }) => ({
    default: () => <GrainField style={{ position: "absolute" }} />,
  })),
);

const MetricDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/metric-counter").then(({ MetricCounter }) => ({
    default: () => <MetricCounter value={98.6} label="Frame stability" decimals={1} suffix="%" style={{ fontSize: 34, fontWeight: 800 }} />,
  })),
);
const ShortcutDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/shortcut-hint").then(({ ShortcutHint }) => ({
    default: () => <ShortcutHint keys={["mod", "shift", "p"]} label="Open command panel" />,
  })),
);
const ModeDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/mode-selector").then(({ ModeSelector }) => ({
    default: () => <ModeSelector label="Preview mode" options={[{ value: "edit", label: "Edit" }, { value: "play", label: "Play" }, { value: "inspect", label: "Inspect" }]} />,
  })),
);
const RunDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/run-control").then(({ RunControl }) => ({ default: () => <RunControl /> })),
);
const HoldDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/hold-to-run").then(({ HoldToRun }) => ({ default: () => <HoldToRun /> })),
);
const AxisDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/axis-pad").then(({ AxisPad }) => ({
    default: function AxisPreview({ accent }: DemoProps) {
      const [value, setValue] = useState({ x: 24, y: -18 });
      return <AxisPad value={value} onValueChange={setValue} accent={accent} />;
    },
  })),
);
const EasingDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/easing-curve").then(({ EasingCurve }) => ({
    default: () => <EasingCurve name="Overshoot" values={[0.2, 0.9, 0.25, 1]} duration={0.72} />,
  })),
);
const PresetsDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/motion-presets").then(({ MotionPresets }) => ({
    default: () => <MotionPresets presets={[{ id: "quiet", label: "Quiet", duration: 180, easing: "ease-out" }, { id: "balanced", label: "Balanced", duration: 360, easing: "cubic-bezier(.2,.8,.2,1)" }, { id: "overshoot", label: "Overshoot", duration: 520, easing: "cubic-bezier(.34,1.56,.64,1)" }]} />,
  })),
);
const PhaseDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/phase-rail").then(({ PhaseRail }) => ({
    default: () => <PhaseRail items={[{ id: "scope", label: "Scope", description: "Define the motion objective." }, { id: "shape", label: "Shape", description: "Tune the timing and response." }, { id: "ship", label: "Ship", description: "Carry the selected behavior into your interface." }]} />,
  })),
);
const LayerDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/layer-stack").then(({ LayerStack }) => ({
    default: () => <LayerStack items={[{ id: "surface", label: "Surface", content: <strong>Paper layer / z 01</strong> }, { id: "signal", label: "Signal", content: <strong>Signal layer / z 02</strong> }, { id: "type", label: "Typography", content: <strong>Type layer / z 03</strong> }]} />,
  })),
);
const SpecimenDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/specimen-frame").then(({ SpecimenFrame }) => ({
    default: ({ label }) => <SpecimenFrame index="014" title="Elastic response" category="Interaction" status="Stable"><p style={{ margin: 0 }}>{label}</p></SpecimenFrame>,
  })),
);
const ViewportDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/viewport-frame").then(({ ViewportFrame }) => ({
    default: ({ label }) => <ViewportFrame><div style={{ display: "grid", placeItems: "center", height: "100%", font: "700 12px var(--font-mono, monospace)" }}>{label}</div></ViewportFrame>,
  })),
);
const TimelineDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/timeline-scrubber").then(({ TimelineScrubber }) => ({
    default: function TimelinePreview() {
      const [value, setValue] = useState(3.4);
      return <TimelineScrubber value={value} max={8} step={0.1} markers={[{ value: 1.2, label: "Intro" }, { value: 5.6, label: "Peak" }]} onValueChange={setValue} />;
    },
  })),
);
const ScopeDemo = dynamic<DemoProps>(() =>
  import("@motionlab/ui/signal-scope").then(({ SignalScope }) => ({
    default: () => <SignalScope label="Impact envelope" samples={[0, 0.1, 0.24, 0.18, -0.15, -0.42, -0.12, 0.36, 0.62, 0.28, -0.08, -0.2, 0.12, 0.4, 0.12, 0]} />,
  })),
);

const demos: Record<string, ComponentType<DemoProps>> = {
  "kinetic-headline": Kinetic,
  "split-reveal": Split,
  "scramble-text": Scramble,
  "typing-loop": Typing,
  "letter-cascade": Letters,
  "infinite-marquee": Marquee,
  "magnetic-button": Magnetic,
  "pressable-button": Pressable,
  "glitch-button": Glitch,
  "ripple-button": Ripple,
  "morphing-toggle": Morph,
  "elastic-switch": Elastic,
  "tilt-card": Tilt,
  "spotlight-card": Spotlight,
  "expandable-card": Expandable,
  "draggable-card": Draggable,
  "sliding-tabs": Tabs,
  "brutalist-accordion": Accordion,
  "motion-dock": Dock,
  "reveal-menu": Menu,
  "dot-matrix": Dots,
  "grid-warp": Grid,
  "cursor-trail": Trail,
  "grain-field": Grain,

  "metric-counter": MetricDemo,
  "shortcut-hint": ShortcutDemo,
  "mode-selector": ModeDemo,
  "run-control": RunDemo,
  "hold-to-run": HoldDemo,
  "axis-pad": AxisDemo,
  "easing-curve": EasingDemo,
  "motion-presets": PresetsDemo,
  "phase-rail": PhaseDemo,
  "layer-stack": LayerDemo,
  "specimen-frame": SpecimenDemo,
  "viewport-frame": ViewportDemo,
  "timeline-scrubber": TimelineDemo,
  "signal-scope": ScopeDemo,
};

export const defaultDemoProps: DemoProps = {
  label: "Make it move",
  pace: 1,
  intensity: 12,
  accent: "#dfff00",
};

export function ComponentDemo({ slug, ...overrides }: Partial<DemoProps> & { slug: string }) {
  const Demo = demos[slug];
  if (!Demo) {
    const study = getComponent(slug)?.study;
    if (study) return <StudyPreview study={study} {...defaultDemoProps} {...overrides} />;
    return <p role="status">Preview unavailable for this component.</p>;
  }
  return <Demo {...defaultDemoProps} {...overrides} />;
}
