export interface ShowcaseMetaItem {
  slug: string;
  title: string;
  description: string;
  /** Longer description shown on the detail page */
  details: string;
  category: string;
}

export const showcaseList: ShowcaseMetaItem[] = [
  // ── Batch 1 ──────────────────────────────────────────────────
  {
    slug: "3d-card",
    title: "3D Card",
    description:
      "Card tilts in 3D space following the cursor using CSS perspective.",
    category: "3D",
    details:
      "Card that tilts in 3D space following the cursor using CSS perspective and rotateX/rotateY transforms.",
  },
  {
    slug: "spotlight-card",
    title: "Spotlight Card",
    description:
      "Radial gradient spotlight that tracks the cursor on each card.",
    category: "Micro-interaction",
    details:
      "Radial gradient spotlight that follows the cursor inside each card using CSS custom properties.",
  },
  {
    slug: "magnetic-button",
    title: "Magnetic Button",
    description: "Button shifts toward the cursor with a magnetic pull effect.",
    category: "Micro-interaction",
    details:
      "Buttons shift toward the cursor with a magnetic pull, then spring back smoothly on mouse leave.",
  },
  {
    slug: "cursor-follower",
    title: "Cursor Follower",
    description: "A dot that snaps and a ring that lerps behind the cursor.",
    category: "Micro-interaction",
    details:
      "A dot that snaps instantly and a ring that lerps smoothly behind the cursor using rAF.",
  },
  {
    slug: "infinite-marquee",
    title: "Infinite Marquee",
    description:
      "Seamlessly looping horizontal ticker with fade mask on edges.",
    category: "Animation",
    details:
      "Seamlessly looping horizontal ticker using pure CSS animation and a fade mask on both edges.",
  },
  {
    slug: "text-scramble",
    title: "Text Scramble",
    description:
      "Characters randomize through a charset before revealing the final text.",
    category: "Animation",
    details:
      "Characters randomize through a charset before revealing the final text — triggered on hover.",
  },
  {
    slug: "counter-animation",
    title: "Counter Animation",
    description: "Numbers animate up from zero when entering the viewport.",
    category: "Animation",
    details:
      "Numbers animate up from zero using requestAnimationFrame with ease-out, triggered by IntersectionObserver.",
  },
  {
    slug: "typewriter",
    title: "Typewriter",
    description:
      "Text types and deletes character by character, cycling phrases.",
    category: "Animation",
    details:
      "Text types and deletes character by character, cycling through phrases with a blinking cursor.",
  },
  {
    slug: "scroll-parallax",
    title: "Scroll Parallax",
    description:
      "Multi-layer depth effect, each element moves at a different speed.",
    category: "Scroll",
    details:
      "Multi-layer depth effect where each element moves at a different speed driven by scroll position.",
  },
  {
    slug: "scroll-progress",
    title: "Scroll Progress Bar",
    description:
      "Thin gradient bar that tracks scroll progress through a content area.",
    category: "Scroll",
    details:
      "Thin gradient bar tracks how far the user has scrolled through a content area.",
  },
  {
    slug: "sticky-header",
    title: "Sticky Header",
    description:
      "Header that shrinks and gains a frosted-glass backdrop when scrolled past a threshold.",
    category: "Scroll",
    details:
      "Navigation header shrinks and gains a frosted-glass backdrop when the page scrolls past a threshold.",
  },
  {
    slug: "reveal-on-scroll",
    title: "Reveal on Scroll",
    description:
      "Elements slide in from different directions as they enter the viewport.",
    category: "Scroll",
    details:
      "Elements slide in from different directions as they enter the viewport via IntersectionObserver.",
  },
  {
    slug: "scroll-snap",
    title: "Scroll Snap",
    description:
      "Full-height sections that snap into place on scroll via CSS scroll-snap.",
    category: "Scroll",
    details:
      "Full-height sections snap into place on scroll using CSS scroll-snap-type with dot navigation.",
  },
  {
    slug: "reading-progress",
    title: "Reading Progress",
    description:
      "Circular SVG progress ring that tracks how much of an article has been read.",
    category: "Scroll",
    details:
      "SVG circular progress ring tracks how much of an article has been read.",
  },
  {
    slug: "glassmorphism",
    title: "Glassmorphism",
    description:
      "Frosted glass cards using backdrop-filter blur over a gradient.",
    category: "UI",
    details:
      "Frosted glass cards using backdrop-filter blur layered over a vibrant gradient background.",
  },
  {
    slug: "bento-grid",
    title: "Bento Grid",
    description: "Asymmetric CSS grid layout with mixed card sizes.",
    category: "UI",
    details:
      "Asymmetric CSS grid layout with mixed card sizes, inspired by Apple's product pages.",
  },
  {
    slug: "skeleton-loader",
    title: "Skeleton Loader",
    description: "Animated shimmer placeholder shown while content is loading.",
    category: "UI",
    details:
      "Animated shimmer placeholder cards shown while content is loading.",
  },
  {
    slug: "accordion",
    title: "Accordion",
    description: "Smooth expand/collapse sections with CSS height transition.",
    category: "UI",
    details:
      "Smooth expand/collapse using the grid-template-rows 0fr → 1fr trick — no max-height hacks.",
  },
  {
    slug: "progress-bar",
    title: "Progress Bar",
    description:
      "Animated progress indicators triggered by IntersectionObserver.",
    category: "UI",
    details:
      "Bars animate in from zero when entering the viewport via IntersectionObserver.",
  },
  {
    slug: "ripple-effect",
    title: "Ripple Effect",
    description: "Material-design ripple burst animation triggered on click.",
    category: "Micro-interaction",
    details:
      "Material-design ripple burst spawned at the exact click position inside the button.",
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "Floating tooltip with auto-flip based on edge proximity.",
    category: "UI",
    details:
      "Floating tooltip that auto-flips direction when near the top edge of the viewport.",
  },
  {
    slug: "svg-path-draw",
    title: "SVG Path Draw",
    description:
      "Stroke-dashoffset animation draws SVG paths when entering viewport.",
    category: "Animation",
    details:
      "Stroke-dashoffset animation draws each SVG path when it enters the viewport.",
  },
  {
    slug: "flip-clock",
    title: "Flip Clock",
    description: "Live clock with retro digit-flip animation every second.",
    category: "Animation",
    details:
      "Live real-time clock where each digit flips with a 3D perspective animation every second.",
  },
  {
    slug: "particle-field",
    title: "Particle Field",
    description: "Canvas-based dots that connect and react to cursor movement.",
    category: "Canvas",
    details:
      "Canvas-based particles that move, connect with lines, and are attracted by the cursor.",
  },
  {
    slug: "noise-background",
    title: "Noise Background",
    description:
      "Animated SVG feTurbulence fractal noise layered over a gradient.",
    category: "Canvas",
    details:
      "SVG feTurbulence with animated baseFrequency creates a living noise texture over a gradient.",
  },
  {
    slug: "liquid-button",
    title: "Liquid Button",
    description:
      "CSS goo filter merges blobs with the button for a liquid effect.",
    category: "Micro-interaction",
    details:
      "SVG goo filter (feGaussianBlur + feColorMatrix threshold) merges blobs with the button on hover.",
  },
  {
    slug: "command-palette",
    title: "Command Palette",
    description:
      "Cmd+K search modal with keyboard navigation and grouped results.",
    category: "UI",
    details:
      "Cmd+K modal with live search, grouped categories, and full keyboard navigation.",
  },

  // ── Batch 2 ──────────────────────────────────────────────────
  {
    slug: "matrix-rain",
    title: "Matrix Rain",
    description:
      "Digital katakana rain rendered on canvas with a glowing head character.",
    category: "Canvas",
    details:
      "Digital katakana rain rendered on canvas — bright head character with fading trail.",
  },
  {
    slug: "fireworks",
    title: "Fireworks",
    description:
      "Click anywhere to launch a colorful particle burst with gravity and trails.",
    category: "Canvas",
    details:
      "Click anywhere to launch a particle burst with gravity, spread, and color trails.",
  },
  {
    slug: "wave-animation",
    title: "Wave Animation",
    description:
      "Four overlapping sine waves animated with phase offsets on a canvas.",
    category: "Canvas",
    details:
      "Four overlapping sine waves with gradient fill, animated in real time on canvas.",
  },
  {
    slug: "3d-cube",
    title: "3D Cube",
    description:
      "CSS preserve-3d cube with 6 gradient faces — auto-spins and drag to rotate.",
    category: "3D",
    details:
      "Six-faced CSS cube using preserve-3d — auto-spins and supports drag rotation.",
  },
  {
    slug: "gradient-text",
    title: "Gradient Text",
    description:
      "Animated rainbow sweep, diagonal gradient, and chrome metallic text effects.",
    category: "Animation",
    details:
      "Animated background-position sweep, diagonal gradient, and chrome metallic text effects.",
  },
  {
    slug: "split-text-reveal",
    title: "Split Text Reveal",
    description:
      "Words fly in with a spring transform, staggered per word with configurable delay.",
    category: "Animation",
    details:
      "Words fly in with staggered spring transforms — triggered on mount with a replay button.",
  },
  {
    slug: "character-morph",
    title: "Character Morph",
    description:
      "Characters scramble through a random charset before revealing the next word.",
    category: "Animation",
    details:
      "Each character scrambles through a random charset before settling into the next word.",
  },
  {
    slug: "masonry-grid",
    title: "Masonry Grid",
    description:
      "Pinterest-style multi-column layout using CSS columns and break-inside-avoid.",
    category: "UI",
    details:
      "Pinterest-style uneven column layout using CSS columns and break-inside-avoid.",
  },
  {
    slug: "card-stack",
    title: "Card Stack",
    description:
      "Stacked cards you can drag to cycle — spring bounce and depth perspective.",
    category: "UI",
    details:
      "Stacked cards with depth perspective — drag to cycle through the deck.",
  },
  {
    slug: "timeline",
    title: "Timeline",
    description:
      "Vertical alternating timeline with staggered mount animations.",
    category: "UI",
    details:
      "Vertical alternating timeline with staggered entry animations on mount.",
  },
  {
    slug: "drawing-canvas",
    title: "Drawing Canvas",
    description:
      "Freehand whiteboard with color palette, adjustable brush size, and eraser.",
    category: "Canvas",
    details:
      "Freehand whiteboard with color palette, brush size slider, and eraser tool.",
  },
  {
    slug: "color-picker",
    title: "Color Picker",
    description:
      "HSV color space picker: saturation/value square + hue strip + hex copy.",
    category: "UI",
    details:
      "HSV picker — saturation/value square and hue strip rendered on canvas, with hex copy.",
  },
  {
    slug: "drag-and-drop",
    title: "Drag & Drop",
    description:
      "Sortable list using the native HTML5 Drag API with drop target highlight.",
    category: "Micro-interaction",
    details:
      "Reorderable list using the native HTML5 Drag API with visual drop target feedback.",
  },
  {
    slug: "rating-stars",
    title: "Rating Stars",
    description:
      "Hover to preview, click to rate — animated fill with emoji feedback.",
    category: "Micro-interaction",
    details:
      "Hover to preview a rating, click to set — emoji and label feedback below.",
  },
  {
    slug: "toggle-switch",
    title: "Toggle Switch",
    description:
      "Three toggle variants: pill, iOS-style, and square — all CSS transitions.",
    category: "UI",
    details:
      "Three toggle variants (pill, iOS-style, square) with smooth CSS transitions.",
  },
  {
    slug: "copy-button",
    title: "Copy Button",
    description:
      "Code snippet cards with Clipboard API copy and animated state feedback.",
    category: "UI",
    details:
      "Code snippet rows with Clipboard API copy, animated feedback, and error state.",
  },
  {
    slug: "confetti",
    title: "Confetti",
    description:
      "Canvas confetti burst with physics — launch from button or click the canvas.",
    category: "Canvas",
    details:
      "Canvas confetti burst with physics — launch from the button or click the canvas.",
  },
  {
    slug: "bar-chart",
    title: "Bar Chart",
    description:
      "Animated bars grow from zero with staggered delay — three switchable datasets.",
    category: "Canvas",
    details:
      "Animated bars grow from zero on mount with staggered delay — three switchable datasets.",
  },
  {
    slug: "audio-visualizer",
    title: "Audio Visualizer",
    description:
      "Web Audio API oscillator feeds AnalyserNode; FFT bins rendered as a color-shifting bar chart.",
    category: "Canvas",
    details:
      "Web Audio API oscillator feeds an AnalyserNode; FFT frequency bins rendered as a color-shifting bar chart.",
  },
  {
    slug: "perlin-noise",
    title: "Noise Field",
    description:
      "Per-pixel sine-wave noise on a downscaled canvas — plasma, terrain, and flow palettes.",
    category: "Canvas",
    details:
      "Per-pixel sine-wave noise rendered to a downscaled canvas — plasma, terrain, and flow palettes.",
  },
  {
    slug: "snake-game",
    title: "Snake Game",
    description:
      "Classic snake on a 20×20 canvas grid — keyboard and D-pad support.",
    category: "Canvas",
    details:
      "Classic snake game on a 20×20 canvas grid with D-pad controls and keyboard support.",
  },

  // ── Batch 3 ──────────────────────────────────────────────────
  {
    slug: "aurora-background",
    title: "Aurora Background",
    description:
      "Animated aurora borealis using CSS blur blobs with keyframe movement.",
    category: "Animation",
    details:
      "Animated aurora borealis built with CSS blur blobs and keyframe translate animations.",
  },
  {
    slug: "morphing-blob",
    title: "Morphing Blob",
    description:
      "CSS border-radius morph animation cycling through organic shapes.",
    category: "Animation",
    details:
      "CSS border-radius animated between organic shapes — four color presets.",
  },
  {
    slug: "neon-glow",
    title: "Neon Glow",
    description:
      "Neon light effect using layered text-shadow and box-shadow with a flicker keyframe.",
    category: "Animation",
    details:
      "Neon light effect via layered text-shadow and box-shadow with a CSS flicker keyframe.",
  },
  {
    slug: "toast-notification",
    title: "Toast Notification",
    description:
      "Stacked dismissible toasts with type variants and an animated progress bar.",
    category: "UI",
    details:
      "Stacked auto-dismissing toasts with progress bar, four types, and slide-in animation.",
  },
  {
    slug: "otp-input",
    title: "OTP Input",
    description:
      "Six-digit code input with auto-advance, backspace nav, paste support, and shake on error.",
    category: "UI",
    details:
      "Six-digit code input with auto-advance, backspace navigation, paste support, and shake on error.",
  },
  {
    slug: "floating-label",
    title: "Floating Label",
    description:
      "Material design input where the label floats up on focus or when filled.",
    category: "UI",
    details:
      "Material design input where the label transitions up and shrinks on focus or fill.",
  },
  {
    slug: "password-strength",
    title: "Password Strength",
    description:
      "Live strength meter with animated bars and a checklist of validation rules.",
    category: "UI",
    details:
      "Live password meter with animated strength bars and a per-rule validation checklist.",
  },
  {
    slug: "morphing-button",
    title: "Morphing Button",
    description:
      "Button transitions from idle → loading spinner → success/error state and auto-resets.",
    category: "Micro-interaction",
    details:
      "Button morphs through idle → loading spinner → success/error state with auto-reset.",
  },
  {
    slug: "number-ticker",
    title: "Number Ticker",
    description:
      "Numbers animate to new values with ease-out-quart easing using requestAnimationFrame.",
    category: "Animation",
    details:
      "Numbers animate smoothly to new values with ease-out-quart easing via requestAnimationFrame.",
  },
  {
    slug: "spotlight-text",
    title: "Spotlight Text",
    description:
      "Cursor-tracking radial mask that reveals the bright layer of text beneath.",
    category: "Micro-interaction",
    details:
      "Cursor-tracking CSS mask-image reveals the bright text layer beneath the dim one.",
  },
  {
    slug: "like-button",
    title: "Like Button",
    description:
      "Twitter-style heart with particle burst, ring pulse, and spring scale animation.",
    category: "Micro-interaction",
    details:
      "Twitter-style heart button with particle burst, ring pulse, and spring scale on click.",
  },
  {
    slug: "long-press",
    title: "Long Press",
    description:
      "Hold-to-confirm button with SVG circular progress ring driven by requestAnimationFrame.",
    category: "Micro-interaction",
    details:
      "Hold-to-confirm button with an SVG circular progress ring driven by requestAnimationFrame.",
  },
  {
    slug: "swipe-to-delete",
    title: "Swipe to Delete",
    description:
      "Slide list items left past a threshold to delete — Pointer Events with spring snap-back.",
    category: "Micro-interaction",
    details:
      "Slide list items left past a threshold to delete — Pointer Events capture with spring snap-back.",
  },
  {
    slug: "context-menu",
    title: "Context Menu",
    description:
      "Right-click custom menu with edge-aware positioning and keyboard dismiss.",
    category: "Micro-interaction",
    details:
      "Right-click custom menu with edge-aware positioning, separators, and Escape/click dismiss.",
  },
  {
    slug: "blur-reveal",
    title: "Blur Reveal",
    description:
      "Content starts blurred and scales in with a staggered CSS filter transition.",
    category: "Animation",
    details:
      "Content starts blurred and scales in with staggered CSS filter transitions.",
  },
  {
    slug: "donut-chart",
    title: "Donut Chart",
    description:
      "SVG donut chart with animated stroke-dasharray segments and hover highlight.",
    category: "Canvas",
    details:
      "SVG donut chart with animated stroke-dasharray segments and interactive legend.",
  },
  {
    slug: "line-chart",
    title: "Line Chart",
    description:
      "SVG cubic-bezier path that animates in via stroke-dashoffset with hover tooltips.",
    category: "Canvas",
    details:
      "SVG cubic-bezier path animated via stroke-dashoffset with hover data tooltips.",
  },
  {
    slug: "carousel",
    title: "Carousel",
    description:
      "Drag-to-swipe slider with auto-play, dot indicators, and spring easing.",
    category: "UI",
    details:
      "Drag-to-swipe slider with auto-play, arrow buttons, dot indicators, and spring ease.",
  },
  {
    slug: "side-drawer",
    title: "Side Drawer",
    description:
      "Slide-in panel from left or right with overlay, nav items, and smooth transition.",
    category: "UI",
    details:
      "Slide-in panel from left or right with backdrop overlay and smooth CSS transition.",
  },
  {
    slug: "tabs",
    title: "Tabs",
    description:
      "Smooth tab switching with a sliding indicator bar that moves via offsetLeft.",
    category: "UI",
    details:
      "Tab bar with a sliding active indicator driven by offsetLeft and offsetWidth.",
  },
  {
    slug: "holographic-card",
    title: "Holographic Card",
    description:
      "Credit card with 3D tilt and a cursor-tracked iridescent rainbow overlay.",
    category: "3D",
    details:
      "3D tilt card with a cursor-tracked iridescent rainbow gradient and shimmer lines.",
  },
  {
    slug: "3d-text",
    title: "3D Text",
    description:
      "Extruded text depth effect built by stacking CSS text-shadows — no 3D library.",
    category: "3D",
    details:
      "Extruded depth effect from stacked CSS text-shadows — no WebGL, no libraries.",
  },
  {
    slug: "infinite-zoom",
    title: "Infinite Zoom",
    description:
      "Canvas modular-scale shapes create a continuous infinite zoom-in illusion.",
    category: "Canvas",
    details:
      "Canvas modular-scale shapes that create a seamless infinite zoom-in illusion.",
  },
  {
    slug: "date-picker",
    title: "Date Picker",
    description:
      "Month-view calendar with the Date API — no library, today highlight, month navigation.",
    category: "UI",
    details:
      "Month-view calendar built with the Date API — no library, with today highlight and selection.",
  },
  {
    slug: "range-slider",
    title: "Range Slider",
    description:
      "Dual-handle range slider using Pointer Events with a min-gap constraint.",
    category: "UI",
    details:
      "Dual-handle price range slider using Pointer Events with a min-gap constraint between handles.",
  },
  {
    slug: "stepper",
    title: "Stepper",
    description:
      "Multi-step form with animated progress track, step indicators, and slide-in content.",
    category: "UI",
    details:
      "Multi-step form with an animated progress track, staggered step indicators, and slide-in content.",
  },
  {
    slug: "combobox",
    title: "Combobox",
    description:
      "Multi-select searchable dropdown with keyboard nav, chips, and Backspace to remove.",
    category: "UI",
    details:
      "Multi-select searchable dropdown with keyboard navigation, chip removal, and Backspace to undo.",
  },
  {
    slug: "infinite-scroll",
    title: "Infinite Scroll",
    description:
      "Scroll sentinel triggers async load via IntersectionObserver — 8 items per page.",
    category: "UI",
    details:
      "Scroll sentinel triggers async load via IntersectionObserver — loads 8 items per page up to 36.",
  },

  // ── Batch 4 ──────────────────────────────────────────────────
  {
    slug: "dock",
    title: "Dock",
    description: "macOS-style dock where icons magnify near the cursor.",
    category: "Micro-interaction",
    details:
      "macOS-style dock — icon sizes follow a distance falloff from the cursor with springy transitions, hover tooltips, and running-app dots.",
  },
  {
    slug: "image-comparison",
    title: "Image Comparison",
    description: "Before/after image slider with a draggable divider handle.",
    category: "UI",
    details:
      "Draggable before/after slider built with Pointer Events and clip-path — compares a grayscale and full-color render of the same image.",
  },
  {
    slug: "border-beam",
    title: "Border Beam",
    description: "A beam of light travels around the card border.",
    category: "Animation",
    details:
      "Animated conic-gradient beam orbiting the card border using a registered @property angle and CSS mask compositing.",
  },
  {
    slug: "file-upload",
    title: "File Upload",
    description: "Drag & drop upload zone with per-file progress bars.",
    category: "UI",
    details:
      "Drag & drop zone using the File API with dragover highlight, simulated per-file upload progress, and cancel/remove controls.",
  },

  // ── Batch 5 ──────────────────────────────────────────────────
  {
    slug: "globe",
    title: "Globe",
    description: "Rotating 3D particle globe on canvas — drag to spin.",
    category: "Canvas",
    details:
      "Fibonacci-sphere point cloud projected onto 2D canvas with Y-axis rotation, depth shading, auto-rotation, and drag-to-spin inertia.",
  },
  {
    slug: "kanban-board",
    title: "Kanban Board",
    description: "Drag cards between kanban columns with drop highlighting.",
    category: "UI",
    details:
      "Three-column kanban using the HTML5 Drag API — cards move between columns with dragover highlighting and live per-column counts.",
  },
  {
    slug: "virtualized-list",
    title: "Virtualized List",
    description: "Scrolls 10,000 rows while keeping ~20 in the DOM.",
    category: "UI",
    details:
      "Windowed list — scroll position computes the visible slice and a translateY offset places it inside a full-height spacer, so 10,000 rows cost a constant number of DOM nodes.",
  },
  {
    slug: "radial-menu",
    title: "Radial Menu",
    description: "Action button that fans options out in a circle.",
    category: "Micro-interaction",
    details:
      "Radial menu — items fan out from a floating action button along a circle with staggered spring transitions and reverse-order collapse.",
  },
];

export const CATEGORY_ORDER = [
  "3D",
  "Animation",
  "Canvas",
  "Micro-interaction",
  "Scroll",
  "UI",
];

export const categoryColors: Record<string, string> = {
  "3D": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Micro-interaction":
    "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Animation:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Scroll:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  UI: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Canvas:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};

export const categoryDot: Record<string, string> = {
  "3D": "bg-violet-500",
  "Micro-interaction": "bg-sky-500",
  Animation: "bg-amber-500",
  Scroll: "bg-emerald-500",
  UI: "bg-pink-500",
  Canvas: "bg-orange-500",
};
