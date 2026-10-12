"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

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
      <PressableButton variant="acid" style={{ background: accent }}>
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
      <RippleButton style={{ background: accent }}>{label}</RippleButton>
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
          color: "white",
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
      <BrutalistAccordion
        items={[{ id: "motion", title: label, content: <p>Precise motion, useful by default.</p> }]}
      />
    ),
  })),
);
const Dock = dynamic<DemoProps>(() =>
  import("@motionlab/ui/motion-dock").then(({ MotionDock }) => ({
    default: ({ label }) => (
      <MotionDock
        label="Experiment shortcuts"
        items={[
          { id: "a", label, icon: "↗", href: "#components" },
          { id: "b", label: "Open docs", icon: "⌘", href: "/docs" },
          { id: "c", label: "Playground", icon: "✳", href: "/playground" },
        ]}
      />
    ),
  })),
);
const Menu = dynamic<DemoProps>(() =>
  import("@motionlab/ui/reveal-menu").then(({ RevealMenu }) => ({
    default: ({ label }) => (
      <RevealMenu
        items={[
          { label, href: "/components" },
          { label: "Playground", href: "/playground" },
          { label: "Docs", href: "/docs" },
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
};

export const defaultDemoProps: DemoProps = {
  label: "Make it move",
  pace: 1,
  intensity: 12,
  accent: "#dfff00",
};

export function ComponentDemo({ slug, ...overrides }: Partial<DemoProps> & { slug: string }) {
  const Demo = demos[slug];
  if (!Demo) return <p role="status">Preview unavailable for this component.</p>;
  return <Demo {...defaultDemoProps} {...overrides} />;
}
