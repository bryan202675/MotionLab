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

export const docsNavigationEn = [
  { slug: "installation", title: "Installation" },
  { slug: "quick-start", title: "Quick start" },
  { slug: "customization", title: "Customization" },
  { slug: "animation", title: "Animation" },
  { slug: "accessibility", title: "Accessibility" },
  { slug: "performance", title: "Performance" },
  { slug: "contributing", title: "Contributing" },
] as const;

export const docsNavigationEs = [
  { slug: "installation", title: "Instalación" },
  { slug: "quick-start", title: "Inicio rápido" },
  { slug: "customization", title: "Personalización" },
  { slug: "animation", title: "Animación" },
  { slug: "accessibility", title: "Accesibilidad" },
  { slug: "performance", title: "Rendimiento" },
  { slug: "contributing", title: "Contribuir" },
] as const;

export const docsNavigation = docsNavigationEn;

export const docsPagesEn: DocPage[] = [
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
        code: "pnpm lint\npnpm typecheck\npnpm test\npnpm build\npnpm test:e2e",
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

export const docsPagesEs: DocPage[] = [
  {
    slug: "installation",
    title: "Instala el código fuente.",
    eyebrow: "EMPIEZA AQUÍ / 01",
    description: "Añade un componente individual de MotionLab a tu proyecto React y hazlo tuyo.",
    sections: [
      {
        id: "requirements",
        title: "Antes de comenzar",
        paragraphs: [
          "Los componentes de MotionLab son archivos fuente en React y TypeScript. Usan Motion para React cuando una animación requiere un motor de cinemática; los patrones basados solo en CSS no tienen dependencias adicionales.",
        ],
        bullets: [
          "React 18.2 o superior",
          "Un proyecto configurado con TypeScript",
          "Motion instalado para componentes animados: pnpm add motion",
        ],
      },
      {
        id: "registry",
        title: "Instalación desde el registro",
        paragraphs: [
          "MotionLab incluye un registro compatible con Shadcn CLI. Ejecuta el sitio localmente o usa su URL pública para instalar un componente individual.",
        ],
        code: "pnpm dlx shadcn@latest add http://localhost:3000/r/magnetic-button.json",
        bullets: [
          "Inicia MotionLab con pnpm dev antes de ejecutar la instalación local.",
          "La CLI copia el código fuente en tu directorio de componentes configurado.",
          "Revisa el archivo generado e instala las dependencias declaradas.",
          "Configura NEXT_PUBLIC_SITE_URL antes del despliegue para usar la URL pública del registro.",
        ],
      },
      {
        id: "local",
        title: "Uso local del código",
        paragraphs: [
          "Durante el desarrollo de MotionLab, puedes importar directamente desde el paquete del workspace.",
        ],
        code: 'import { MagneticButton } from "@motionlab/ui/magnetic-button";\n\n<MagneticButton>Explorar componentes ↗</MagneticButton>',
      },
      {
        id: "next",
        title: "Notas para Next.js",
        paragraphs: [
          "Los componentes animados son Client Components e incluyen su propia directiva 'use client'. Mantén la sección interactiva dentro de un límite de cliente al pasar manejadores de eventos o estado controlado.",
        ],
      },
    ],
  },
  {
    slug: "quick-start",
    title: "Da el primer paso.",
    eyebrow: "EMPIEZA AQUÍ / 02",
    description: "El camino más corto desde un componente instalado hasta una interacción en funcionamiento.",
    sections: [
      {
        id: "install",
        title: "Instala Motion",
        paragraphs: ["Los componentes animados importan desde el punto de entrada público motion/react."],
        code: "pnpm add motion",
      },
      {
        id: "import",
        title: "Importa un componente",
        paragraphs: [
          "La compilación del workspace expone cada componente como un subpath independiente para que tu empaquetador cargue únicamente lo que la pantalla necesita.",
        ],
        code: 'import { KineticHeadline } from "@motionlab/ui/kinetic-headline";\n\nexport function Hero() {\n  return <KineticHeadline text="Make it move." />;\n}',
      },
      {
        id: "tune",
        title: "Ajusta la entrada",
        paragraphs: [
          "Usa las propiedades del componente para calibrar el ritmo y la distancia. Respeta el comportamiento predeterminado de movimiento reducido a menos que tu producto requiera una alternativa específica.",
        ],
        code: '<KineticHeadline text="Make it move." stagger={0.06} distance={18} />',
      },
    ],
  },
  {
    slug: "customization",
    title: "Hazlo totalmente tuyo.",
    eyebrow: "EL MANUAL / 03",
    description: "Cada componente es código fuente que puedes editar, componer y reestilizar libremente.",
    sections: [
      {
        id: "props",
        title: "Comienza con las propiedades",
        paragraphs: [
          "La API del componente expone comportamientos ajustables: distancia, temporización, color, límites y estado controlado. Consulta la tabla de API en la página de cada componente.",
        ],
      },
      {
        id: "styles",
        title: "Estiliza la superficie",
        paragraphs: [
          "Los componentes aceptan className o style donde corresponde y evitan sistemas de diseño ocultos. Usa los tokens de color y tipografía de tu propio proyecto.",
        ],
      },
      {
        id: "ownership",
        title: "Sé dueño del código fuente",
        paragraphs: [
          "La instalación por registro deposita archivos TSX editables directamente en tu proyecto. Modifica el marcado o la animación según los requerimientos de tu producto.",
        ],
      },
    ],
  },
  {
    slug: "animation",
    title: "Movimiento con intención.",
    eyebrow: "EL MANUAL / 04",
    description: "Elige una animación porque explica, guía o recompensa una interacción, nunca como relleno decorativo.",
    sections: [
      {
        id: "tokens",
        title: "Tiempos y resortes",
        paragraphs: [
          "Usa duraciones cortas para retroalimentación y resortes para asentamiento espacial. Evita bucles decorativos cuando la sección está fuera de pantalla.",
        ],
      },
      {
        id: "reduced",
        title: "Movimiento reducido",
        paragraphs: [
          "Los componentes animados comprueban la preferencia de movimiento reducido del sistema operativo para eliminar o simplificar el movimiento automáticamente.",
        ],
      },
      {
        id: "states",
        title: "Transiciones de estado",
        paragraphs: [
          "Vincula la animación a un cambio de estado real: presionado, seleccionado, expandido, copiado o cargado. No animes un control que no realiza ninguna acción.",
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "La accesibilidad es parte del movimiento.",
    eyebrow: "EL MANUAL / 05",
    description: "Controles semánticos, foco visible y una alternativa serena son el estándar fundamental de MotionLab.",
    sections: [
      {
        id: "semantic",
        title: "Usa el elemento correcto",
        paragraphs: [
          "Los botones son botones reales, los switches exponen role y checked, las pestañas admiten teclas de flecha y los acordeones exponen expanded y un aria-controls nombrado.",
        ],
      },
      {
        id: "keyboard",
        title: "Comportamiento del teclado",
        paragraphs: [
          "Navega con Tab y Shift+Tab. SlidingTabs admite flechas, Inicio y Fin. RevealMenu contiene el foco mientras está abierto y se cierra con Escape.",
        ],
      },
      {
        id: "motion",
        title: "Movimiento reducido",
        paragraphs: [
          "Los componentes verifican la preferencia del sistema operativo. El contenido permanece 100% visible y utilizable cuando se desactiva el movimiento.",
        ],
      },
      {
        id: "contrast",
        title: "Contraste y etiquetas",
        paragraphs: [
          "Proporciona etiquetas accesibles para switches, pestañas, docks y acciones de solo icono. No dependas únicamente del color de acento para indicar estado.",
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: "Gestiona los fotogramas con rigor.",
    eyebrow: "EL MANUAL / 06",
    description:
      "MotionLab mantiene las operaciones de puntero fuera del estado de React y pausa efectos costosos fuera de pantalla.",
    sections: [
      {
        id: "pointer",
        title: "Efectos de puntero",
        paragraphs: [
          "TiltCard y SpotlightCard actualizan variables CSS o estilos directamente sin provocar re-renders de React en cada movimiento del puntero.",
        ],
      },
      {
        id: "canvas",
        title: "Ciclo de vida en Canvas",
        paragraphs: [
          "CursorTrail limita el pixel ratio del dispositivo y las partículas activas, observa la visibilidad y desconecta eventos y requestAnimationFrame al desmontarse.",
        ],
      },
      {
        id: "bundle",
        title: "Carga solo lo que usas",
        paragraphs: [
          "Cada módulo es importable independientemente y la instalación por registro copia solo el componente seleccionado. Las vistas previas del laboratorio se cargan dinámicamente.",
        ],
      },
    ],
  },
  {
    slug: "contributing",
    title: "Contribuye con intención.",
    eyebrow: "EL MANUAL / 07",
    description: "Mantén los experimentos originales, pequeños, accesibles y útiles más allá de la galería.",
    sections: [
      {
        id: "changes",
        title: "Propón un cambio",
        paragraphs: [
          "Abre un issue antes de una funcionalidad grande para discutir la interacción, API y accesibilidad. Las correcciones pequeñas pueden comenzar con un pull request.",
        ],
      },
      {
        id: "quality",
        title: "Antes de enviar un pull request",
        paragraphs: [
          "Ejecuta lint, typecheck, tests unitarios, build de producción y pruebas e2e de Playwright. Incluye verificación de movimiento reducido.",
        ],
        code: "pnpm lint\npnpm typecheck\npnpm test\npnpm build\npnpm test:e2e",
      },
      {
        id: "license",
        title: "Licencia y originalidad",
        paragraphs: [
          "Las contribuciones se publican bajo la licencia MIT del proyecto. No portes ni empaquetes código de librerías cuya licencia prohíba la redistribución.",
        ],
      },
    ],
  },
];

export const docsPages = docsPagesEn;

export function getDoc(slug: string, lang: "es" | "en" = "en") {
  const pages = lang === "es" ? docsPagesEs : docsPagesEn;
  return pages.find((page) => page.slug === slug);
}
