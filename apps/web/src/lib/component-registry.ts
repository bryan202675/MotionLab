export const categories = [
  "Text motion",
  "Interactive elements",
  "Motion cards",
  "Navigation & layout",
  "Backgrounds & experiments",
] as const;

export type ComponentCategory = (typeof categories)[number];

export interface ComponentEntry {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  tags: string[];
  dependencies: string[];
  props: { name: string; type: string; defaultValue: string; description: string }[];
  example: string;
}

export const componentRegistry: ComponentEntry[] = [
  {
    slug: "kinetic-headline",
    name: "KineticHeadline",
    category: "Text motion",
    description: "A word-by-word headline with a spring-set entrance.",
    tags: ["type", "spring", "stagger"],
    dependencies: ["motion"],
    props: [
      { name: "text", type: "string", defaultValue: "—", description: "Headline copy." },
      {
        name: "stagger",
        type: "number",
        defaultValue: "0.08",
        description: "Delay between words, in seconds.",
      },
      {
        name: "distance",
        type: "number",
        defaultValue: "24",
        description: "Vertical travel in pixels.",
      },
    ],
    example: '<KineticHeadline text="Make it move." />',
  },
  {
    slug: "split-reveal",
    name: "SplitReveal",
    category: "Text motion",
    description: "Line-by-line mask reveal that starts as the text enters view.",
    tags: ["type", "scroll", "mask"],
    dependencies: ["motion"],
    props: [
      {
        name: "text",
        type: "string",
        defaultValue: "—",
        description: "Use line breaks to set the reveal rhythm.",
      },
      {
        name: "once",
        type: "boolean",
        defaultValue: "true",
        description: "Reveal once or whenever it re-enters view.",
      },
    ],
    example: '<SplitReveal text={"Static\\nis not\\nenough."} />',
  },
  {
    slug: "scramble-text",
    name: "ScrambleText",
    category: "Text motion",
    description: "Letters resolve from a configurable alphabet into a final phrase.",
    tags: ["type", "hover", "random"],
    dependencies: ["motion"],
    props: [
      { name: "text", type: "string", defaultValue: "—", description: "The final text." },
      {
        name: "trigger",
        type: '"mount" | "hover"',
        defaultValue: '"mount"',
        description: "Choose when the reveal begins.",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "800",
        description: "Reveal time in milliseconds.",
      },
    ],
    example: '<ScrambleText text="Signal acquired" trigger="hover" />',
  },
  {
    slug: "typing-loop",
    name: "TypingLoop",
    category: "Text motion",
    description: "Types, pauses, and erases a set of phrases with clean timer teardown.",
    tags: ["type", "loop", "timer"],
    dependencies: ["motion"],
    props: [
      {
        name: "words",
        type: "string[]",
        defaultValue: "—",
        description: "Phrases to cycle through.",
      },
      {
        name: "typeSpeed",
        type: "number",
        defaultValue: "75",
        description: "Milliseconds per typed character.",
      },
      {
        name: "loop",
        type: "boolean",
        defaultValue: "true",
        description: "Repeat after the final phrase.",
      },
    ],
    example: '<TypingLoop words={["Build", "Break", "Ship"]} />',
  },
  {
    slug: "letter-cascade",
    name: "LetterCascade",
    category: "Text motion",
    description: "Individual glyphs settle into place with a measured spring cascade.",
    tags: ["type", "letters", "spring"],
    dependencies: ["motion"],
    props: [
      { name: "text", type: "string", defaultValue: "—", description: "The phrase to cascade." },
      {
        name: "stagger",
        type: "number",
        defaultValue: "0.025",
        description: "Delay between glyphs.",
      },
      {
        name: "direction",
        type: '"up" | "down"',
        defaultValue: '"up"',
        description: "Entry direction.",
      },
    ],
    example: '<LetterCascade text="Motion studies" />',
  },
  {
    slug: "infinite-marquee",
    name: "InfiniteMarquee",
    category: "Text motion",
    description: "A continuous ticker with duplicated content and a reduced-motion fallback.",
    tags: ["ticker", "loop", "hover"],
    dependencies: ["motion"],
    props: [
      {
        name: "children",
        type: "ReactNode",
        defaultValue: "—",
        description: "Content repeated across the track.",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "22",
        description: "One loop duration in seconds.",
      },
      {
        name: "pauseOnHover",
        type: "boolean",
        defaultValue: "true",
        description: "Pause when a pointer hovers the ticker.",
      },
    ],
    example: "<InfiniteMarquee>NO BORING UI —</InfiniteMarquee>",
  },
  {
    slug: "magnetic-button",
    name: "MagneticButton",
    category: "Interactive elements",
    description: "A spring-driven cursor pull that never intercepts keyboard or touch behavior.",
    tags: ["button", "pointer", "spring"],
    dependencies: ["motion"],
    props: [
      {
        name: "strength",
        type: "number",
        defaultValue: "0.22",
        description: "How far the button follows the pointer.",
      },
      {
        name: "radius",
        type: "number",
        defaultValue: "120",
        description: "Maximum pull range in pixels.",
      },
    ],
    example: "<MagneticButton>Explore components ↗</MagneticButton>",
  },
  {
    slug: "pressable-button",
    name: "PressableButton",
    category: "Interactive elements",
    description: "A tactile button with hover, press, loading, disabled, size, and tone states.",
    tags: ["button", "feedback", "states"],
    dependencies: ["motion"],
    props: [
      {
        name: "variant",
        type: '"ink" | "acid" | "outline"',
        defaultValue: '"ink"',
        description: "Color treatment.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Hit area and type size.",
      },
      {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        description: "Exposes a live busy state.",
      },
    ],
    example: '<PressableButton variant="acid">Run experiment</PressableButton>',
  },
  {
    slug: "glitch-button",
    name: "GlitchButton",
    category: "Interactive elements",
    description: "A short, restrained type distortion on hover.",
    tags: ["button", "hover", "type"],
    dependencies: ["motion"],
    props: [
      { name: "label", type: "string", defaultValue: "—", description: "Button copy." },
      {
        name: "color",
        type: "string",
        defaultValue: "#dfff00",
        description: "Accent color for the echo layer.",
      },
    ],
    example: '<GlitchButton label="Trigger signal" />',
  },
  {
    slug: "ripple-button",
    name: "RippleButton",
    category: "Interactive elements",
    description: "A bounded interaction wave that cleans up completed ripples.",
    tags: ["button", "pointer", "ripple"],
    dependencies: ["motion"],
    props: [
      {
        name: "rippleColor",
        type: "string",
        defaultValue: "rgba(255,255,255,.45)",
        description: "Wave fill color.",
      },
    ],
    example: "<RippleButton onClick={save}>Save preset</RippleButton>",
  },
  {
    slug: "morphing-toggle",
    name: "MorphingToggle",
    category: "Interactive elements",
    description: "A controlled or uncontrolled switch with a geometric thumb transition.",
    tags: ["switch", "controlled", "aria"],
    dependencies: ["motion"],
    props: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "uncontrolled",
        description: "Optional controlled value.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        defaultValue: "false",
        description: "Initial uncontrolled value.",
      },
      { name: "label", type: "string", defaultValue: "—", description: "Accessible name." },
    ],
    example: '<MorphingToggle label="Enable motion" defaultChecked />',
  },
  {
    slug: "elastic-switch",
    name: "ElasticSwitch",
    category: "Interactive elements",
    description: "An accessible switch with a fast, elastic thumb response.",
    tags: ["switch", "touch", "spring"],
    dependencies: ["motion"],
    props: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "uncontrolled",
        description: "Optional controlled value.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Prevents state changes.",
      },
      { name: "label", type: "string", defaultValue: "—", description: "Accessible name." },
    ],
    example: '<ElasticSwitch label="Enable sound" />',
  },
  {
    slug: "tilt-card",
    name: "TiltCard",
    category: "Motion cards",
    description:
      "An imperative pointer tilt with bounded transforms and a stable React render count.",
    tags: ["card", "3d", "pointer"],
    dependencies: ["motion"],
    props: [
      {
        name: "intensity",
        type: "number",
        defaultValue: "10",
        description: "Maximum rotation in degrees.",
      },
      {
        name: "scale",
        type: "number",
        defaultValue: "1.02",
        description: "Scale at pointer focus.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Turn off pointer response.",
      },
    ],
    example: "<TiltCard intensity={8}>Experiment 013</TiltCard>",
  },
  {
    slug: "spotlight-card",
    name: "SpotlightCard",
    category: "Motion cards",
    description:
      "A radial light follows the pointer through CSS variables without React state updates.",
    tags: ["card", "spotlight", "css"],
    dependencies: ["motion"],
    props: [
      {
        name: "color",
        type: "string",
        defaultValue: "rgba(223,255,0,.2)",
        description: "Spotlight tint.",
      },
      {
        name: "radius",
        type: "number",
        defaultValue: "180",
        description: "Light radius in pixels.",
      },
    ],
    example: "<SpotlightCard>Live surface</SpotlightCard>",
  },
  {
    slug: "expandable-card",
    name: "ExpandableCard",
    category: "Motion cards",
    description: "A content card that expands from its own semantic button trigger.",
    tags: ["card", "layout", "disclosure"],
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        defaultValue: "—",
        description: "Visible disclosure label.",
      },
      {
        name: "expanded",
        type: "boolean",
        defaultValue: "uncontrolled",
        description: "Optional controlled state.",
      },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Expanded content." },
    ],
    example: '<ExpandableCard title="How it works">Details</ExpandableCard>',
  },
  {
    slug: "draggable-card",
    name: "DraggableCard",
    category: "Motion cards",
    description:
      "A pointer and touch draggable surface with elastic bounds and arrow-key movement.",
    tags: ["card", "drag", "keyboard"],
    dependencies: ["motion"],
    props: [
      {
        name: "bounds",
        type: "number",
        defaultValue: "100",
        description: "Maximum movement in pixels.",
      },
      {
        name: "axis",
        type: '"x" | "y" | "both"',
        defaultValue: '"both"',
        description: "Movement direction.",
      },
    ],
    example: "<DraggableCard bounds={80}>Move me</DraggableCard>",
  },
  {
    slug: "sliding-tabs",
    name: "SlidingTabs",
    category: "Navigation & layout",
    description: "A keyboard-operable tab list with a shared animated active marker.",
    tags: ["tabs", "keyboard", "layout"],
    dependencies: ["motion"],
    props: [
      {
        name: "tabs",
        type: "SlidingTab[]",
        defaultValue: "—",
        description: "Tab id, label, and panel content.",
      },
      {
        name: "value",
        type: "string",
        defaultValue: "uncontrolled",
        description: "Optional active tab id.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: "—",
        description: "Accessible tab list name.",
      },
    ],
    example: '<SlidingTabs tabs={tabs} label="Preview mode" />',
  },
  {
    slug: "brutalist-accordion",
    name: "BrutalistAccordion",
    category: "Navigation & layout",
    description: "A numbered disclosure list with single or multiple open panels.",
    tags: ["accordion", "keyboard", "disclosure"],
    dependencies: ["motion"],
    props: [
      {
        name: "items",
        type: "AccordionItem[]",
        defaultValue: "—",
        description: "Disclosure headings and content.",
      },
      {
        name: "mode",
        type: '"single" | "multiple"',
        defaultValue: '"single"',
        description: "Number of panels that may stay open.",
      },
    ],
    example: '<BrutalistAccordion items={principles} mode="multiple" />',
  },
  {
    slug: "motion-dock",
    name: "MotionDock",
    category: "Navigation & layout",
    description: "A proximity-scaled action dock with native buttons and links.",
    tags: ["dock", "navigation", "pointer"],
    dependencies: ["motion"],
    props: [
      {
        name: "items",
        type: "DockItem[]",
        defaultValue: "—",
        description: "Labeled links or action buttons.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: "—",
        description: "Accessible navigation name.",
      },
      {
        name: "magnification",
        type: "number",
        defaultValue: "0.4",
        description: "Maximum scale contribution.",
      },
    ],
    example: '<MotionDock items={actions} label="Workspace actions" />',
  },
  {
    slug: "reveal-menu",
    name: "RevealMenu",
    category: "Navigation & layout",
    description: "An animated full-screen navigation with Escape, focus loop, and scroll lock.",
    tags: ["menu", "modal", "focus"],
    dependencies: ["motion"],
    props: [
      {
        name: "items",
        type: "RevealMenuItem[]",
        defaultValue: "—",
        description: "Navigation labels and URLs.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: '"Open navigation menu"',
        description: "Trigger accessible name.",
      },
    ],
    example: "<RevealMenu items={links} />",
  },
  {
    slug: "dot-matrix",
    name: "DotMatrix",
    category: "Backgrounds & experiments",
    description: "A lightweight, static dot field for editorial surfaces.",
    tags: ["background", "css", "pattern"],
    dependencies: [],
    props: [
      {
        name: "spacing",
        type: "number",
        defaultValue: "18",
        description: "Distance between dots.",
      },
      { name: "size", type: "number", defaultValue: "1.5", description: "Dot radius in pixels." },
      {
        name: "opacity",
        type: "number",
        defaultValue: "0.35",
        description: "Overall pattern opacity.",
      },
    ],
    example: '<DotMatrix aria-hidden="true" />',
  },
  {
    slug: "grid-warp",
    name: "GridWarp",
    category: "Backgrounds & experiments",
    description: "A CSS grid plane that leans subtly toward a fine pointer.",
    tags: ["background", "grid", "pointer"],
    dependencies: ["motion"],
    props: [
      {
        name: "color",
        type: "string",
        defaultValue: "rgba(16,16,16,.32)",
        description: "Grid line color.",
      },
      { name: "spacing", type: "number", defaultValue: "40", description: "Grid cell size." },
      {
        name: "intensity",
        type: "number",
        defaultValue: "5",
        description: "Maximum grid-plane rotation.",
      },
    ],
    example: '<GridWarp style={{ position: "absolute", inset: 0 }} />',
  },
  {
    slug: "cursor-trail",
    name: "CursorTrail",
    category: "Backgrounds & experiments",
    description: "An intersection-aware Canvas 2D pointer trail with capped particles and cleanup.",
    tags: ["canvas", "pointer", "performance"],
    dependencies: ["motion"],
    props: [
      { name: "color", type: "string", defaultValue: "#5038ff", description: "Particle color." },
      {
        name: "particleCount",
        type: "number",
        defaultValue: "22",
        description: "Maximum active particles.",
      },
      { name: "size", type: "number", defaultValue: "5", description: "Initial particle radius." },
    ],
    example: '<div style={{ position: "relative" }}><CursorTrail /></div>',
  },
  {
    slug: "grain-field",
    name: "GrainField",
    category: "Backgrounds & experiments",
    description:
      "A static SVG turbulence overlay that adds a quiet print texture without an animation loop.",
    tags: ["background", "svg", "texture"],
    dependencies: [],
    props: [
      { name: "opacity", type: "number", defaultValue: "0.1", description: "Texture strength." },
      {
        name: "blendMode",
        type: 'CSSProperties["mixBlendMode"]',
        defaultValue: '"multiply"',
        description: "CSS blend mode.",
      },
    ],
    example: "<GrainField opacity={0.08} />",
  },
];

export function getComponent(slug: string): ComponentEntry | undefined {
  return componentRegistry.find((component) => component.slug === slug);
}
