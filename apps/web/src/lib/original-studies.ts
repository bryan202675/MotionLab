export type StudyFamily = "text" | "control" | "surface" | "layout" | "field";
export type StudyCategory =
  | "Text motion"
  | "Interactive elements"
  | "Motion cards"
  | "Navigation & layout"
  | "Backgrounds & experiments";

export interface OriginalStudy {
  slug: string;
  name: string;
  category: StudyCategory;
  description: string;
  tags: string[];
  family: StudyFamily;
  variant: string;
}

type StudyRow = readonly [string, string, string, string, readonly string[]];

const textRows: StudyRow[] = [
  ["rivet-title", "RivetTitle", "rivet-title", "A compact wordmark lands in offset layers with a measured, letter-by-letter settle.", ["type", "stagger", "editorial"]],
  ["foldline", "Foldline", "foldline", "Lines of copy hinge open from a shared baseline, like a sheet unfolding on a table.", ["type", "3d", "reveal"]],
  ["echo-stack", "EchoStack", "echo-stack", "A short sequence of ghosted glyphs tightens into a crisp headline.", ["type", "echo", "stagger"]],
  ["glyph-climb", "GlyphClimb", "glyph-climb", "Characters rise in a compact register with alternating micro-rotation.", ["type", "glyphs", "spring"]],
  ["stencil-shift", "StencilShift", "stencil-shift", "Paired text fragments slide from opposite edges and lock into one title.", ["type", "mask", "offset"]],
  ["word-steps", "WordSteps", "word-steps", "Words enter on a deliberate vertical cadence for short editorial statements.", ["type", "words", "stagger"]],
  ["vertical-flip", "VerticalFlip", "vertical-flip", "A title turns forward around its center line, with reduced motion respected.", ["type", "flip", "perspective"]],
  ["ink-wash", "InkWash", "ink-wash", "A soft-focus phrase resolves into sharp type without moving the surrounding layout.", ["type", "blur", "focus"]],
  ["axis-caption", "AxisCaption", "axis-caption", "Caption glyphs expand from a narrow measurement line into readable type.", ["type", "scale", "caption"]],
  ["type-pulse", "TypePulse", "type-pulse", "A restrained baseline pulse keeps a short status phrase visibly alive.", ["type", "loop", "status"]],
  ["letter-wave", "LetterWave", "letter-wave", "A low-amplitude wave passes through a label while preserving its line box.", ["type", "loop", "wave"]],
  ["baseline-drift", "BaselineDrift", "baseline-drift", "Letters drift around a steady typographic baseline for a quiet ambient accent.", ["type", "loop", "ambient"]],
  ["counterwheel", "Counterwheel", "counterwheel", "A glyph wheel turns each character into place for compact changing labels.", ["type", "number", "flip"]],
];

const controlRows: StudyRow[] = [
  ["step-dial", "StepDial", "step-dial", "A keyboard-friendly increment dial with explicit one-step controls and a live value.", ["input", "keyboard", "step"]],
  ["snap-range", "SnapRange", "snap-range", "A native range input that moves through clear, repeatable intervals.", ["input", "range", "snap"]],
  ["pulse-switch", "PulseSwitch", "pulse-switch", "A binary control gives a brief visual pulse when its state changes.", ["toggle", "state", "feedback"]],
  ["pressure-pad", "PressurePad", "pressure-pad", "A broad press target responds to pointer contact and remains a semantic button.", ["button", "pointer", "press"]],
  ["sequence-key", "SequenceKey", "sequence-key", "A single action control makes an active sequence state clear at a glance.", ["button", "state", "sequence"]],
  ["hold-meter", "HoldMeter", "hold-meter", "A hold action fills its track while the pointer or activation key stays down.", ["button", "hold", "progress"]],
  ["angle-controller", "AngleController", "angle-controller", "A range control presents its value as a normalized angle.", ["input", "range", "angle"]],
  ["velocity-handle", "VelocityHandle", "velocity-handle", "A fine-grain slider reports a stable scalar for tuning motion response.", ["input", "range", "velocity"]],
  ["latch-action", "LatchAction", "latch-action", "A persistent action latch exposes its state through both color and pressed semantics.", ["button", "toggle", "state"]],
  ["orbit-choice", "OrbitChoice", "orbit-choice", "A compact set of discrete choices can be selected without pointer-only gestures.", ["choice", "keyboard", "control"]],
  ["repeat-button", "RepeatButton", "repeat-button", "An increment action animates each new value while keeping the number readable.", ["button", "counter", "feedback"]],
  ["scrub-rail", "ScrubRail", "scrub-rail", "A broad native slider turns continuous input into a clear position readout.", ["input", "timeline", "range"]],
  ["range-duo", "RangeDuo", "range-duo", "Two coordinated range inputs define a low and high boundary.", ["input", "range", "pair"]],
];

const surfaceRows: StudyRow[] = [
  ["tilt-pane", "TiltPane", "tilt-pane", "A framed surface tilts toward the pointer and resets cleanly on exit.", ["card", "pointer", "depth"]],
  ["flip-panel", "FlipPanel", "flip-panel", "A keyboard-operable panel turns to reveal a second face.", ["card", "flip", "keyboard"]],
  ["peel-surface", "PeelSurface", "peel-surface", "A printed panel lifts from one edge to suggest a tactile sheet.", ["card", "hover", "surface"]],
  ["stacked-deck", "StackedDeck", "stacked-deck", "Three layered specimens separate just enough to communicate their depth order.", ["card", "layers", "depth"]],
  ["spring-carousel", "SpringCarousel", "spring-carousel", "A single-frame carousel advances through content with direct previous and next controls.", ["gallery", "carousel", "keyboard"]],
  ["depth-shelf", "DepthShelf", "depth-shelf", "A shelf-like preview gains perspective and lifts its focal object on hover.", ["card", "3d", "hover"]],
  ["gallery-frame", "GalleryFrame", "gallery-frame", "A bold mat and registration marks frame a media specimen.", ["gallery", "frame", "editorial"]],
  ["perspective-window", "PerspectiveWindow", "perspective-window", "A viewport panel leans through a bounded perspective response.", ["card", "viewport", "depth"]],
  ["focus-tile", "FocusTile", "focus-tile", "A selectable tile enlarges its own signal without shifting adjacent content.", ["tile", "focus", "hover"]],
  ["overlap-editor", "OverlapEditor", "overlap-editor", "A small card deck exposes its top layer while preserving the stack beneath it.", ["card", "layers", "editorial"]],
  ["follow-card", "FollowCard", "follow-card", "A surface follows the pointer through spring values instead of React frame state.", ["card", "pointer", "spring"]],
  ["bounce-gallery", "BounceGallery", "bounce-gallery", "Gallery artwork rises and settles with a bounded press and hover response.", ["gallery", "spring", "hover"]],
  ["drift-panel", "DriftPanel", "drift-panel", "A light panel floats a few pixels to mark a featured motion specimen.", ["card", "ambient", "hover"]],
];

const layoutRows: StudyRow[] = [
  ["step-track", "StepTrack", "step-track", "A compact progression bar links named stages to an animated detail panel.", ["steps", "navigation", "progress"]],
  ["focus-rail", "FocusRail", "focus-rail", "A vertical choice rail keeps its active destination and supporting copy in view.", ["navigation", "list", "focus"]],
  ["folder-tabs", "FolderTabs", "folder-tabs", "Tabbed panels use a folder-like edge treatment and native button semantics.", ["tabs", "navigation", "panels"]],
  ["menu-matrix", "MenuMatrix", "menu-matrix", "A small grid of destinations adapts without hiding keyboard focus.", ["menu", "grid", "navigation"]],
  ["progress-path", "ProgressPath", "progress-path", "A three-point path shows the selected stage and its neighboring steps.", ["steps", "progress", "navigation"]],
  ["split-stage", "SplitStage", "split-stage", "A two-part layout keeps navigation and changing stage content in balance.", ["layout", "tabs", "panels"]],
  ["sequence-grid", "SequenceGrid", "sequence-grid", "Numbered cells provide direct access to a short sequence of scenes.", ["sequence", "grid", "keyboard"]],
  ["scroll-chapter", "ScrollChapter", "scroll-chapter", "Chapter markers expose a concise, directly selectable reading sequence.", ["navigation", "chapters", "list"]],
  ["switchboard", "Switchboard", "switchboard", "A three-position switchboard makes the current workspace mode explicit.", ["navigation", "modes", "selection"]],
  ["stage-selector", "StageSelector", "stage-selector", "A horizontal stage selector pairs a live index with its active title.", ["navigation", "steps", "selection"]],
  ["flow-lane", "FlowLane", "flow-lane", "A lane of connected phases uses a moving marker to show current flow.", ["flow", "steps", "navigation"]],
  ["chapter-marker", "ChapterMarker", "chapter-marker", "A narrow vertical index offers direct access to named sections.", ["navigation", "chapters", "rail"]],
  ["pane-snap", "PaneSnap", "pane-snap", "A panel switch uses a short directional handoff between adjacent views.", ["panels", "transition", "layout"]],
];

const fieldRows: StudyRow[] = [
  ["orbit-field", "OrbitField", "orbit-field", "An orbital diagram layers slowly rotating tracks and low-key signal points.", ["background", "svg", "orbit"]],
  ["contour-paper", "ContourPaper", "contour-paper", "Fine contour paths drift over the canvas like a measured elevation drawing.", ["background", "lines", "topography"]],
  ["scan-matrix", "ScanMatrix", "scan-matrix", "A technical scan line crosses a quiet matrix of calibration marks.", ["background", "scan", "grid"]],
  ["ripple-grid", "RippleGrid", "ripple-grid", "Circular pulses travel through a loose grid without blocking page interaction.", ["background", "ripple", "svg"]],
  ["spark-cloud", "SparkCloud", "spark-cloud", "A sparse field of flecks wanders at different speeds across a surface.", ["background", "particles", "ambient"]],
  ["ribbon-vector", "RibbonVector", "ribbon-vector", "Fine vector strands weave across the frame in a restrained looping pattern.", ["background", "lines", "ribbon"]],
  ["chromatic-fan", "ChromaticFan", "chromatic-fan", "A fan of translucent rays rotates around a fixed optical center.", ["background", "rays", "color"]],
  ["star-chart", "StarChart", "star-chart", "Orbit paths and signal nodes assemble into a navigational star chart.", ["background", "diagram", "orbit"]],
  ["line-topography", "LineTopography", "line-topography", "Nested paths create a living contour map from a small set of vector strokes.", ["background", "lines", "map"]],
  ["signal-horizon", "SignalHorizon", "signal-horizon", "A horizon trace and scanning beam suggest a live instrument display.", ["background", "signal", "scan"]],
  ["color-loom", "ColorLoom", "color-loom", "Crossing threads breathe in and out like a woven color study.", ["background", "lines", "color"]],
  ["shard-field", "ShardField", "shard-field", "Outlined geometric shards shift by a few pixels to form an angular backdrop.", ["background", "geometry", "svg"]],
];

const collect = (rows: StudyRow[], family: StudyFamily, category: StudyCategory): OriginalStudy[] =>
  rows.map(([slug, name, _variant, description, tags]) => ({ slug, name, category, description, tags: [...tags], family, variant: _variant }));

export const originalStudies: OriginalStudy[] = [
  ...collect(textRows, "text", "Text motion"),
  ...collect(controlRows, "control", "Interactive elements"),
  ...collect(surfaceRows, "surface", "Motion cards"),
  ...collect(layoutRows, "layout", "Navigation & layout"),
  ...collect(fieldRows, "field", "Backgrounds & experiments"),
];
