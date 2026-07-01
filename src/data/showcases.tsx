import type { ComponentType } from "react";

import Accordion          from "@/components/showcase/Accordion";
import AudioVisualizer    from "@/components/showcase/AudioVisualizer";
import AuroraBackground   from "@/components/showcase/AuroraBackground";
import BarChart           from "@/components/showcase/BarChart";
import BentoGrid        from "@/components/showcase/BentoGrid";
import BlurReveal       from "@/components/showcase/BlurReveal";
import CardStack        from "@/components/showcase/CardStack";
import Carousel         from "@/components/showcase/Carousel";
import CharacterMorph   from "@/components/showcase/CharacterMorph";
import ColorPicker        from "@/components/showcase/ColorPicker";
import Combobox           from "@/components/showcase/Combobox";
import CommandPalette     from "@/components/showcase/CommandPalette";
import Confetti           from "@/components/showcase/Confetti";
import ContextMenu        from "@/components/showcase/ContextMenu";
import CopyButton         from "@/components/showcase/CopyButton";
import CounterAnimation   from "@/components/showcase/CounterAnimation";
import CursorFollower     from "@/components/showcase/CursorFollower";
import DatePicker         from "@/components/showcase/DatePicker";
import DonutChart         from "@/components/showcase/DonutChart";
import DragAndDrop        from "@/components/showcase/DragAndDrop";
import DrawingCanvas      from "@/components/showcase/DrawingCanvas";
import Fireworks          from "@/components/showcase/Fireworks";
import FlipClock          from "@/components/showcase/FlipClock";
import FloatingLabel      from "@/components/showcase/FloatingLabel";
import Glassmorphism    from "@/components/showcase/Glassmorphism";
import GradientText     from "@/components/showcase/GradientText";
import HolographicCard  from "@/components/showcase/HolographicCard";
import InfiniteMarquee    from "@/components/showcase/InfiniteMarquee";
import InfiniteScroll     from "@/components/showcase/InfiniteScroll";
import InfiniteZoom       from "@/components/showcase/InfiniteZoom";
import LikeButton         from "@/components/showcase/LikeButton";
import LineChart          from "@/components/showcase/LineChart";
import LiquidButton       from "@/components/showcase/LiquidButton";
import LongPress          from "@/components/showcase/LongPress";
import MagneticButton   from "@/components/showcase/MagneticButton";
import MasonryGrid      from "@/components/showcase/MasonryGrid";
import MatrixRain       from "@/components/showcase/MatrixRain";
import MorphingBlob     from "@/components/showcase/MorphingBlob";
import MorphingButton   from "@/components/showcase/MorphingButton";
import NeonGlow         from "@/components/showcase/NeonGlow";
import NoiseBackground    from "@/components/showcase/NoiseBackground";
import NumberTicker       from "@/components/showcase/NumberTicker";
import OTPInput           from "@/components/showcase/OTPInput";
import ParticleField      from "@/components/showcase/ParticleField";
import PasswordStrength   from "@/components/showcase/PasswordStrength";
import PerlinNoise        from "@/components/showcase/PerlinNoise";
import ProgressBar        from "@/components/showcase/ProgressBar";
import RangeSlider        from "@/components/showcase/RangeSlider";
import RatingStars        from "@/components/showcase/RatingStars";
import ReadingProgress    from "@/components/showcase/ReadingProgress";
import RevealOnScroll     from "@/components/showcase/RevealOnScroll";
import RippleEffect       from "@/components/showcase/RippleEffect";
import ScrollParallax     from "@/components/showcase/ScrollParallax";
import ScrollProgressBar  from "@/components/showcase/ScrollProgressBar";
import ScrollSnap         from "@/components/showcase/ScrollSnap";
import SideDrawer         from "@/components/showcase/SideDrawer";
import SkeletonLoader     from "@/components/showcase/SkeletonLoader";
import SnakeGame          from "@/components/showcase/SnakeGame";
import Stepper            from "@/components/showcase/Stepper";
import StickyHeader       from "@/components/showcase/StickyHeader";
import SwipeToDelete      from "@/components/showcase/SwipeToDelete";
import SpotlightCard    from "@/components/showcase/SpotlightCard";
import SpotlightText    from "@/components/showcase/SpotlightText";
import SplitTextReveal  from "@/components/showcase/SplitTextReveal";
import SVGPathDraw      from "@/components/showcase/SVGPathDraw";
import Tabs             from "@/components/showcase/Tabs";
import TextScramble     from "@/components/showcase/TextScramble";
import ThreeDCard       from "@/components/showcase/ThreeDCard";
import ThreeDCube       from "@/components/showcase/ThreeDCube";
import ThreeDText       from "@/components/showcase/ThreeDText";
import Timeline         from "@/components/showcase/Timeline";
import ToastNotification from "@/components/showcase/ToastNotification";
import ToggleSwitch     from "@/components/showcase/ToggleSwitch";
import TooltipShowcase  from "@/components/showcase/Tooltip";
import Typewriter       from "@/components/showcase/Typewriter";
import WaveAnimation    from "@/components/showcase/WaveAnimation";

export interface ShowcaseMeta {
  title: string;
  description: string;
  category: string;
  component: ComponentType;
}

export const showcases: Record<string, ShowcaseMeta> = {
  "3d-card":            { title: "3D Card",            category: "3D",               component: ThreeDCard,       description: "Card that tilts in 3D space following the cursor using CSS perspective and rotateX/rotateY transforms." },
  "3d-cube":            { title: "3D Cube",            category: "3D",               component: ThreeDCube,       description: "Six-faced CSS cube using preserve-3d — auto-spins and supports drag rotation." },
  "3d-text":            { title: "3D Text",            category: "3D",               component: ThreeDText,       description: "Extruded depth effect from stacked CSS text-shadows — no WebGL, no libraries." },
  "holographic-card":   { title: "Holographic Card",   category: "3D",               component: HolographicCard,  description: "3D tilt card with a cursor-tracked iridescent rainbow gradient and shimmer lines." },

  "aurora-background":  { title: "Aurora Background",  category: "Animation",        component: AuroraBackground, description: "Animated aurora borealis built with CSS blur blobs and keyframe translate animations." },
  "blur-reveal":        { title: "Blur Reveal",        category: "Animation",        component: BlurReveal,       description: "Content starts blurred and scales in with staggered CSS filter transitions." },
  "character-morph":    { title: "Character Morph",    category: "Animation",        component: CharacterMorph,   description: "Each character scrambles through a random charset before settling into the next word." },
  "counter-animation":  { title: "Counter Animation",  category: "Animation",        component: CounterAnimation, description: "Numbers animate up from zero using requestAnimationFrame with ease-out, triggered by IntersectionObserver." },
  "flip-clock":         { title: "Flip Clock",         category: "Animation",        component: FlipClock,        description: "Live real-time clock where each digit flips with a 3D perspective animation every second." },
  "gradient-text":      { title: "Gradient Text",      category: "Animation",        component: GradientText,     description: "Animated background-position sweep, diagonal gradient, and chrome metallic text effects." },
  "infinite-marquee":   { title: "Infinite Marquee",   category: "Animation",        component: InfiniteMarquee,  description: "Seamlessly looping horizontal ticker using pure CSS animation and a fade mask on both edges." },
  "morphing-blob":      { title: "Morphing Blob",      category: "Animation",        component: MorphingBlob,     description: "CSS border-radius animated between organic shapes — four color presets." },
  "neon-glow":          { title: "Neon Glow",          category: "Animation",        component: NeonGlow,         description: "Neon light effect via layered text-shadow and box-shadow with a CSS flicker keyframe." },
  "number-ticker":      { title: "Number Ticker",      category: "Animation",        component: NumberTicker,     description: "Numbers animate smoothly to new values with ease-out-quart easing via requestAnimationFrame." },
  "split-text-reveal":  { title: "Split Text Reveal",  category: "Animation",        component: SplitTextReveal,  description: "Words fly in with staggered spring transforms — triggered on mount with a replay button." },
  "svg-path-draw":      { title: "SVG Path Draw",      category: "Animation",        component: SVGPathDraw,      description: "Stroke-dashoffset animation draws each SVG path when it enters the viewport." },
  "text-scramble":      { title: "Text Scramble",      category: "Animation",        component: TextScramble,     description: "Characters randomize through a charset before revealing the final text — triggered on hover." },
  "typewriter":         { title: "Typewriter",         category: "Animation",        component: Typewriter,       description: "Text types and deletes character by character, cycling through phrases with a blinking cursor." },

  "confetti":           { title: "Confetti",           category: "Canvas",           component: Confetti,         description: "Canvas confetti burst with physics — launch from the button or click the canvas." },
  "donut-chart":        { title: "Donut Chart",        category: "Canvas",           component: DonutChart,       description: "SVG donut chart with animated stroke-dasharray segments and interactive legend." },
  "drawing-canvas":     { title: "Drawing Canvas",     category: "Canvas",           component: DrawingCanvas,    description: "Freehand whiteboard with color palette, brush size slider, and eraser tool." },
  "fireworks":          { title: "Fireworks",          category: "Canvas",           component: Fireworks,        description: "Click anywhere to launch a particle burst with gravity, spread, and color trails." },
  "infinite-zoom":      { title: "Infinite Zoom",      category: "Canvas",           component: InfiniteZoom,     description: "Canvas modular-scale shapes that create a seamless infinite zoom-in illusion." },
  "line-chart":         { title: "Line Chart",         category: "Canvas",           component: LineChart,        description: "SVG cubic-bezier path animated via stroke-dashoffset with hover data tooltips." },
  "matrix-rain":        { title: "Matrix Rain",        category: "Canvas",           component: MatrixRain,       description: "Digital katakana rain rendered on canvas — bright head character with fading trail." },
  "noise-background":   { title: "Noise Background",   category: "Canvas",           component: NoiseBackground,  description: "SVG feTurbulence with animated baseFrequency creates a living noise texture over a gradient." },
  "particle-field":     { title: "Particle Field",     category: "Canvas",           component: ParticleField,    description: "Canvas-based particles that move, connect with lines, and are attracted by the cursor." },
  "wave-animation":       { title: "Wave Animation",       category: "Canvas",            component: WaveAnimation,     description: "Four overlapping sine waves with gradient fill, animated in real time on canvas." },
  "bar-chart":            { title: "Bar Chart",            category: "Canvas",            component: BarChart,          description: "Animated bars grow from zero on mount with staggered delay — three switchable datasets." },
  "audio-visualizer":     { title: "Audio Visualizer",     category: "Canvas",            component: AudioVisualizer,   description: "Web Audio API oscillator feeds an AnalyserNode; FFT frequency bins rendered as a color-shifting bar chart." },
  "perlin-noise":         { title: "Noise Field",          category: "Canvas",            component: PerlinNoise,       description: "Per-pixel sine-wave noise rendered to a downscaled canvas — plasma, terrain, and flow palettes." },
  "snake-game":           { title: "Snake Game",           category: "Canvas",            component: SnakeGame,         description: "Classic snake game on a 20×20 canvas grid with D-pad controls and keyboard support." },

  "cursor-follower":    { title: "Cursor Follower",    category: "Micro-interaction",component: CursorFollower,   description: "A dot that snaps instantly and a ring that lerps smoothly behind the cursor using rAF." },
  "drag-and-drop":      { title: "Drag & Drop",        category: "Micro-interaction",component: DragAndDrop,      description: "Reorderable list using the native HTML5 Drag API with visual drop target feedback." },
  "liquid-button":      { title: "Liquid Button",      category: "Micro-interaction",component: LiquidButton,     description: "SVG goo filter (feGaussianBlur + feColorMatrix threshold) merges blobs with the button on hover." },
  "magnetic-button":    { title: "Magnetic Button",    category: "Micro-interaction",component: MagneticButton,   description: "Buttons shift toward the cursor with a magnetic pull, then spring back smoothly on mouse leave." },
  "morphing-button":    { title: "Morphing Button",    category: "Micro-interaction",component: MorphingButton,   description: "Button morphs through idle → loading spinner → success/error state with auto-reset." },
  "rating-stars":       { title: "Rating Stars",       category: "Micro-interaction",component: RatingStars,      description: "Hover to preview a rating, click to set — emoji and label feedback below." },
  "ripple-effect":      { title: "Ripple Effect",      category: "Micro-interaction",component: RippleEffect,     description: "Material-design ripple burst spawned at the exact click position inside the button." },
  "spotlight-card":     { title: "Spotlight Card",     category: "Micro-interaction",component: SpotlightCard,    description: "Radial gradient spotlight that follows the cursor inside each card using CSS custom properties." },
  "spotlight-text":       { title: "Spotlight Text",       category: "Micro-interaction", component: SpotlightText,     description: "Cursor-tracking CSS mask-image reveals the bright text layer beneath the dim one." },
  "like-button":          { title: "Like Button",          category: "Micro-interaction", component: LikeButton,        description: "Twitter-style heart button with particle burst, ring pulse, and spring scale on click." },
  "long-press":           { title: "Long Press",           category: "Micro-interaction", component: LongPress,         description: "Hold-to-confirm button with an SVG circular progress ring driven by requestAnimationFrame." },
  "swipe-to-delete":      { title: "Swipe to Delete",      category: "Micro-interaction", component: SwipeToDelete,     description: "Slide list items left past a threshold to delete — Pointer Events capture with spring snap-back." },
  "context-menu":         { title: "Context Menu",         category: "Micro-interaction", component: ContextMenu,       description: "Right-click custom menu with edge-aware positioning, separators, and Escape/click dismiss." },

  "scroll-parallax":      { title: "Scroll Parallax",      category: "Scroll",            component: ScrollParallax,    description: "Multi-layer depth effect where each element moves at a different speed driven by scroll position." },
  "scroll-progress":      { title: "Scroll Progress Bar",  category: "Scroll",            component: ScrollProgressBar, description: "Thin gradient bar tracks how far the user has scrolled through a content area." },
  "sticky-header":        { title: "Sticky Header",        category: "Scroll",            component: StickyHeader,      description: "Navigation header shrinks and gains a frosted-glass backdrop when the page scrolls past a threshold." },
  "reveal-on-scroll":     { title: "Reveal on Scroll",     category: "Scroll",            component: RevealOnScroll,    description: "Elements slide in from different directions as they enter the viewport via IntersectionObserver." },
  "scroll-snap":          { title: "Scroll Snap",          category: "Scroll",            component: ScrollSnap,        description: "Full-height sections snap into place on scroll using CSS scroll-snap-type with dot navigation." },
  "reading-progress":     { title: "Reading Progress",     category: "Scroll",            component: ReadingProgress,   description: "SVG circular progress ring tracks how much of an article has been read." },

  "accordion":          { title: "Accordion",          category: "UI",               component: Accordion,        description: "Smooth expand/collapse using the grid-template-rows 0fr → 1fr trick — no max-height hacks." },
  "bento-grid":         { title: "Bento Grid",         category: "UI",               component: BentoGrid,        description: "Asymmetric CSS grid layout with mixed card sizes, inspired by Apple's product pages." },
  "card-stack":         { title: "Card Stack",         category: "UI",               component: CardStack,        description: "Stacked cards with depth perspective — drag to cycle through the deck." },
  "carousel":           { title: "Carousel",           category: "UI",               component: Carousel,         description: "Drag-to-swipe slider with auto-play, arrow buttons, dot indicators, and spring ease." },
  "color-picker":       { title: "Color Picker",       category: "UI",               component: ColorPicker,      description: "HSV picker — saturation/value square and hue strip rendered on canvas, with hex copy." },
  "command-palette":    { title: "Command Palette",    category: "UI",               component: CommandPalette,   description: "Cmd+K modal with live search, grouped categories, and full keyboard navigation." },
  "copy-button":        { title: "Copy Button",        category: "UI",               component: CopyButton,       description: "Code snippet rows with Clipboard API copy, animated feedback, and error state." },
  "floating-label":     { title: "Floating Label",     category: "UI",               component: FloatingLabel,    description: "Material design input where the label transitions up and shrinks on focus or fill." },
  "glassmorphism":      { title: "Glassmorphism",      category: "UI",               component: Glassmorphism,    description: "Frosted glass cards using backdrop-filter blur layered over a vibrant gradient background." },
  "masonry-grid":       { title: "Masonry Grid",       category: "UI",               component: MasonryGrid,      description: "Pinterest-style uneven column layout using CSS columns and break-inside-avoid." },
  "otp-input":          { title: "OTP Input",          category: "UI",               component: OTPInput,         description: "Six-digit code input with auto-advance, backspace navigation, paste support, and shake on error." },
  "password-strength":  { title: "Password Strength",  category: "UI",               component: PasswordStrength, description: "Live password meter with animated strength bars and a per-rule validation checklist." },
  "progress-bar":       { title: "Progress Bar",       category: "UI",               component: ProgressBar,      description: "Bars animate in from zero when entering the viewport via IntersectionObserver." },
  "side-drawer":        { title: "Side Drawer",        category: "UI",               component: SideDrawer,       description: "Slide-in panel from left or right with backdrop overlay and smooth CSS transition." },
  "skeleton-loader":    { title: "Skeleton Loader",    category: "UI",               component: SkeletonLoader,   description: "Animated shimmer placeholder cards shown while content is loading." },
  "tabs":               { title: "Tabs",               category: "UI",               component: Tabs,             description: "Tab bar with a sliding active indicator driven by offsetLeft and offsetWidth." },
  "timeline":           { title: "Timeline",           category: "UI",               component: Timeline,         description: "Vertical alternating timeline with staggered entry animations on mount." },
  "toast-notification": { title: "Toast Notification", category: "UI",               component: ToastNotification,description: "Stacked auto-dismissing toasts with progress bar, four types, and slide-in animation." },
  "toggle-switch":      { title: "Toggle Switch",      category: "UI",               component: ToggleSwitch,     description: "Three toggle variants (pill, iOS-style, square) with smooth CSS transitions." },
  "tooltip":              { title: "Tooltip",              category: "UI",                component: TooltipShowcase,   description: "Floating tooltip that auto-flips direction when near the top edge of the viewport." },
  "date-picker":          { title: "Date Picker",          category: "UI",                component: DatePicker,        description: "Month-view calendar built with the Date API — no library, with today highlight and selection." },
  "range-slider":         { title: "Range Slider",         category: "UI",                component: RangeSlider,       description: "Dual-handle price range slider using Pointer Events with a min-gap constraint between handles." },
  "stepper":              { title: "Stepper",              category: "UI",                component: Stepper,           description: "Multi-step form with an animated progress track, staggered step indicators, and slide-in content." },
  "combobox":             { title: "Combobox",             category: "UI",                component: Combobox,          description: "Multi-select searchable dropdown with keyboard navigation, chip removal, and Backspace to undo." },
  "infinite-scroll":      { title: "Infinite Scroll",      category: "UI",                component: InfiniteScroll,    description: "Scroll sentinel triggers async load via IntersectionObserver — loads 8 items per page up to 36." },
};

export const categoryColors: Record<string, string> = {
  "3D":               "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Micro-interaction": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Animation:           "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Scroll:              "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  UI:                  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Canvas:              "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};
