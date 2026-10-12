export interface DocSection {
  id: string;
  title: string;
  paragraphs: string[];
  code?: string;
  bullets?: string[];
}

export interface DocPage {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  sections: DocSection[];
}

export const docsNavigation = [
  { slug: "installation", title: "Installation" },
  { slug: "quick-start", title: "Quick start" },
  { slug: "customization", title: "Customization" },
  { slug: "animation", title: "Animation" },
  { slug: "accessibility", title: "Accessibility" },
  { slug: "performance", title: "Performance" },
  { slug: "contributing", title: "Contributing" },
] as const;

export const docsPages: DocPage[] = [
  {
    slug: "installation",
    title: "Install the source.",
    eyebrow: "START HERE / 01",
    description: "Add an individual MotionLab component to a React project and make it yours.",
    sections: [
      {
        id: "requirements",
        title: "Before you begin",
        paragraphs: [
          "MotionLab components are React and TypeScript source files. They use Motion for React when an animation needs a runtime engine; CSS-only patterns have no runtime dependency.",
        ],
        bullets: [
          "React 18.2 or later",
          "A TypeScript project",
          "Motion installed for animated components: pnpm add motion",
        ],
      },
      {
        id: "registry",
        title: "Install from the registry",
        paragraphs: [
          "MotionLab serves a shadcn-compatible registry. Run the site locally or use its deployed public URL to install a single component.",
        ],
        code: "pnpm dlx shadcn@latest add http://localhost:3000/r/magnetic-button.json",
        bullets: [
          "Start MotionLab with pnpm dev before running the local install command.",
          "The CLI copies source into your configured components directory.",
          "Review the generated file and install its declared runtime dependencies.",
          "Set NEXT_PUBLIC_SITE_URL before deployment so copied commands use the public registry URL.",
        ],
      },
      {
        id: "local",
        title: "Use the source locally",
        paragraphs: [
          "While developing MotionLab, import from the workspace package. The consumer fixture also exercises the built registry payload over a local URL.",
        ],
        code: 'import { MagneticButton } from "@motionlab/ui/magnetic-button";\n\n<MagneticButton>Explore components ↗</MagneticButton>',
      },
      {
        id: "next",
        title: "Next.js notes",
        paragraphs: [
          "Animated components are client components and include their own client boundary. Keep the importing interactive section inside a client boundary when passing event handlers or controlled state.",
        ],
      },
    ],
  },
  {
    slug: "quick-start",
    title: "Make the first move.",
    eyebrow: "START HERE / 02",
    description: "A short path from an installed component to a working interaction.",
    sections: [
      {
        id: "install",
        title: "Install Motion",
        paragraphs: ["Animated components import from the public motion/react entry point."],
        code: "pnpm add motion",
      },
      {
        id: "import",
        title: "Import a component",
        paragraphs: [
          "The workspace build exposes each component as an independent subpath so bundlers can load only what the screen uses.",
        ],
        code: 'import { KineticHeadline } from "@motionlab/ui/kinetic-headline";\n\nexport function Hero() {\n  return <KineticHeadline text="Make it move." />;\n}',
      },
      {
        id: "tune",
        title: "Tune the entrance",
        paragraphs: [
          "Use the component props to set the pacing and distance. Respect the default reduced-motion behavior unless your product has a carefully considered alternative.",
        ],
        code: '<KineticHeadline text="Make it move." stagger={0.06} distance={18} />',
      },
    ],
  },
  {
    slug: "customization",
    title: "Make it yours.",
    eyebrow: "THE MANUAL / 03",
    description: "Every component is source you can edit, compose, and restyle.",
    sections: [
      {
        id: "props",
        title: "Start with props",
        paragraphs: [
          "The component API exposes behavior that should be tuned often: distance, timing, color, bounds, and controlled state. Read the API table on each component page for its actual contract.",
        ],
      },
      {
        id: "styles",
        title: "Style the surface",
        paragraphs: [
          "Components accept className or style where appropriate and avoid a hidden global design system. Use your project’s own tokens for color and type.",
        ],
      },
      {
        id: "ownership",
        title: "Own the source",
        paragraphs: [
          "Registry installs place editable TSX in your project. Change its markup or animation directly when a product needs a more specific behavior.",
        ],
      },
    ],
  },
  {
    slug: "animation",
    title: "Motion with intent.",
    eyebrow: "THE MANUAL / 04",
    description: "Choose an animation because it explains, directs, or rewards an interaction.",
    sections: [
      {
        id: "tokens",
        title: "Timing and springs",
        paragraphs: [
          "Use shorter durations for feedback and springs for spatial settling. Avoid running decorative loops when the section is offscreen.",
        ],
      },
      {
        id: "reduced",
        title: "Reduced motion",
        paragraphs: [
          "Animated components use Motion’s reduced-motion preference hook to remove or simplify movement. CSS-only effects also include a project-wide reduced-motion media query.",
        ],
      },
      {
        id: "states",
        title: "State transitions",
        paragraphs: [
          "Tie feedback to a real state change: pressed, selected, expanded, copied, or loaded. Do not animate a control that does not do anything.",
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Access is part of the motion.",
    eyebrow: "THE MANUAL / 05",
    description: "Semantic controls, visible focus, and a calm alternative are baseline behavior.",
    sections: [
      {
        id: "semantic",
        title: "Use the right element",
        paragraphs: [
          "Buttons remain buttons, switches expose role and checked state, tabs support arrow keys, and disclosures expose expanded state and a named region.",
        ],
      },
      {
        id: "keyboard",
        title: "Keyboard behavior",
        paragraphs: [
          "Navigate with Tab and Shift+Tab. SlidingTabs supports arrow keys, Home, and End. RevealMenu traps focus while open, closes with Escape, and returns focus to its trigger.",
        ],
      },
      {
        id: "motion",
        title: "Reduced motion",
        paragraphs: [
          "The components check the operating system’s reduced-motion preference. Content stays available when movement is removed.",
        ],
      },
      {
        id: "contrast",
        title: "Contrast and labels",
        paragraphs: [
          "Provide meaningful labels for switches, tabs, docks, and icon-only actions. Do not rely on accent color alone to indicate state.",
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: "Spend frames carefully.",
    eyebrow: "THE MANUAL / 06",
    description:
      "MotionLab keeps pointer work out of React state and pauses expensive effects offscreen.",
    sections: [
      {
        id: "pointer",
        title: "Pointer effects",
        paragraphs: [
          "TiltCard and SpotlightCard update element styles or CSS variables directly instead of causing React renders on every pointer move.",
        ],
      },
      {
        id: "canvas",
        title: "Canvas lifecycle",
        paragraphs: [
          "CursorTrail caps device pixel ratio and active particles, observes visibility, and disconnects its pointer, resize, intersection, and animation-frame work on cleanup.",
        ],
      },
      {
        id: "bundle",
        title: "Load what you use",
        paragraphs: [
          "Each source module is independently importable and registry installation copies only the selected component. Playground previews are dynamically loaded.",
        ],
      },
    ],
  },
  {
    slug: "contributing",
    title: "Contribute with intent.",
    eyebrow: "THE MANUAL / 07",
    description: "Keep experiments original, small, accessible, and useful outside the gallery.",
    sections: [
      {
        id: "changes",
        title: "Propose a change",
        paragraphs: [
          "Open an issue before a large feature so the interaction, API, and accessibility behavior can be discussed. Small bug fixes can start with a pull request.",
        ],
      },
      {
        id: "quality",
        title: "Before you open a pull request",
        paragraphs: [
          "Run lint, typecheck, component tests, production build, registry validation, and the relevant Playwright flow. Include a reduced-motion check and mobile screenshots for visual changes.",
        ],
        code: "pnpm lint\npnpm typecheck\npnpm test\npnpm build\npnpm registry:check\npnpm test:e2e",
      },
      {
        id: "license",
        title: "License and originality",
        paragraphs: [
          "Contributions are released under the project’s MIT license. Do not port or package code from libraries whose license forbids redistribution of their components.",
        ],
      },
    ],
  },
];

export function getDoc(slug: string) {
  return docsPages.find((page) => page.slug === slug);
}
