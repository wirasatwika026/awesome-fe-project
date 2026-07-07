import type { ComponentType } from "react";

import Accordion          from "@/components/showcase/Accordion";
import AudioVisualizer    from "@/components/showcase/AudioVisualizer";
import AuroraBackground   from "@/components/showcase/AuroraBackground";
import BarChart           from "@/components/showcase/BarChart";
import BentoGrid        from "@/components/showcase/BentoGrid";
import BlurReveal       from "@/components/showcase/BlurReveal";
import BorderBeam       from "@/components/showcase/BorderBeam";
import CalendarHeatmap  from "@/components/showcase/CalendarHeatmap";
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
import DataTable          from "@/components/showcase/DataTable";
import DatePicker         from "@/components/showcase/DatePicker";
import Dock               from "@/components/showcase/Dock";
import DonutChart         from "@/components/showcase/DonutChart";
import DragAndDrop        from "@/components/showcase/DragAndDrop";
import DrawingCanvas      from "@/components/showcase/DrawingCanvas";
import FileUpload         from "@/components/showcase/FileUpload";
import Fireworks          from "@/components/showcase/Fireworks";
import FlipClock          from "@/components/showcase/FlipClock";
import FloatingLabel      from "@/components/showcase/FloatingLabel";
import GameOfLife       from "@/components/showcase/GameOfLife";
import Glassmorphism    from "@/components/showcase/Glassmorphism";
import Globe            from "@/components/showcase/Globe";
import GradientText     from "@/components/showcase/GradientText";
import HolographicCard  from "@/components/showcase/HolographicCard";
import ImageComparison  from "@/components/showcase/ImageComparison";
import InfiniteMarquee    from "@/components/showcase/InfiniteMarquee";
import InfiniteScroll     from "@/components/showcase/InfiniteScroll";
import InfiniteZoom       from "@/components/showcase/InfiniteZoom";
import KanbanBoard        from "@/components/showcase/KanbanBoard";
import LikeButton         from "@/components/showcase/LikeButton";
import LineChart          from "@/components/showcase/LineChart";
import LiquidButton       from "@/components/showcase/LiquidButton";
import LongPress          from "@/components/showcase/LongPress";
import MagneticButton   from "@/components/showcase/MagneticButton";
import MarkdownPreview  from "@/components/showcase/MarkdownPreview";
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
import PomodoroTimer      from "@/components/showcase/PomodoroTimer";
import ProgressBar        from "@/components/showcase/ProgressBar";
import RadialMenu         from "@/components/showcase/RadialMenu";
import RangeSlider        from "@/components/showcase/RangeSlider";
import RatingStars        from "@/components/showcase/RatingStars";
import ReadingProgress    from "@/components/showcase/ReadingProgress";
import ResizableSplitPane from "@/components/showcase/ResizableSplitPane";
import RevealOnScroll     from "@/components/showcase/RevealOnScroll";
import RippleEffect       from "@/components/showcase/RippleEffect";
import ScrollParallax     from "@/components/showcase/ScrollParallax";
import ScrollProgressBar  from "@/components/showcase/ScrollProgressBar";
import ScrollSnap         from "@/components/showcase/ScrollSnap";
import SideDrawer         from "@/components/showcase/SideDrawer";
import SignaturePad       from "@/components/showcase/SignaturePad";
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
import VirtualizedList  from "@/components/showcase/VirtualizedList";
import WaveAnimation    from "@/components/showcase/WaveAnimation";

import { showcaseList, type ShowcaseMetaItem } from "./showcase-meta";

interface ComponentEntry {
  component: ComponentType;
  /** Basename of the source file in src/components/showcase (without .tsx) */
  file: string;
}

export interface ShowcaseMeta extends ShowcaseMetaItem, ComponentEntry {}

/** Maps each slug to its component; all other metadata lives in showcase-meta.ts */
const registry: Record<string, ComponentEntry> = {
  "3d-card":           { component: ThreeDCard, file: "ThreeDCard" },
  "3d-cube":           { component: ThreeDCube, file: "ThreeDCube" },
  "3d-text":           { component: ThreeDText, file: "ThreeDText" },
  "holographic-card":  { component: HolographicCard, file: "HolographicCard" },
  "aurora-background": { component: AuroraBackground, file: "AuroraBackground" },
  "blur-reveal":       { component: BlurReveal, file: "BlurReveal" },
  "character-morph":   { component: CharacterMorph, file: "CharacterMorph" },
  "counter-animation": { component: CounterAnimation, file: "CounterAnimation" },
  "flip-clock":        { component: FlipClock, file: "FlipClock" },
  "gradient-text":     { component: GradientText, file: "GradientText" },
  "infinite-marquee":  { component: InfiniteMarquee, file: "InfiniteMarquee" },
  "morphing-blob":     { component: MorphingBlob, file: "MorphingBlob" },
  "neon-glow":         { component: NeonGlow, file: "NeonGlow" },
  "number-ticker":     { component: NumberTicker, file: "NumberTicker" },
  "split-text-reveal": { component: SplitTextReveal, file: "SplitTextReveal" },
  "svg-path-draw":     { component: SVGPathDraw, file: "SVGPathDraw" },
  "text-scramble":     { component: TextScramble, file: "TextScramble" },
  "typewriter":        { component: Typewriter, file: "Typewriter" },
  "confetti":          { component: Confetti, file: "Confetti" },
  "donut-chart":       { component: DonutChart, file: "DonutChart" },
  "drawing-canvas":    { component: DrawingCanvas, file: "DrawingCanvas" },
  "fireworks":         { component: Fireworks, file: "Fireworks" },
  "infinite-zoom":     { component: InfiniteZoom, file: "InfiniteZoom" },
  "line-chart":        { component: LineChart, file: "LineChart" },
  "matrix-rain":       { component: MatrixRain, file: "MatrixRain" },
  "noise-background":  { component: NoiseBackground, file: "NoiseBackground" },
  "particle-field":    { component: ParticleField, file: "ParticleField" },
  "wave-animation":    { component: WaveAnimation, file: "WaveAnimation" },
  "bar-chart":         { component: BarChart, file: "BarChart" },
  "audio-visualizer":  { component: AudioVisualizer, file: "AudioVisualizer" },
  "perlin-noise":      { component: PerlinNoise, file: "PerlinNoise" },
  "snake-game":        { component: SnakeGame, file: "SnakeGame" },
  "cursor-follower":   { component: CursorFollower, file: "CursorFollower" },
  "drag-and-drop":     { component: DragAndDrop, file: "DragAndDrop" },
  "liquid-button":     { component: LiquidButton, file: "LiquidButton" },
  "magnetic-button":   { component: MagneticButton, file: "MagneticButton" },
  "morphing-button":   { component: MorphingButton, file: "MorphingButton" },
  "rating-stars":      { component: RatingStars, file: "RatingStars" },
  "ripple-effect":     { component: RippleEffect, file: "RippleEffect" },
  "spotlight-card":    { component: SpotlightCard, file: "SpotlightCard" },
  "spotlight-text":    { component: SpotlightText, file: "SpotlightText" },
  "like-button":       { component: LikeButton, file: "LikeButton" },
  "long-press":        { component: LongPress, file: "LongPress" },
  "swipe-to-delete":   { component: SwipeToDelete, file: "SwipeToDelete" },
  "context-menu":      { component: ContextMenu, file: "ContextMenu" },
  "scroll-parallax":   { component: ScrollParallax, file: "ScrollParallax" },
  "scroll-progress":   { component: ScrollProgressBar, file: "ScrollProgressBar" },
  "sticky-header":     { component: StickyHeader, file: "StickyHeader" },
  "reveal-on-scroll":  { component: RevealOnScroll, file: "RevealOnScroll" },
  "scroll-snap":       { component: ScrollSnap, file: "ScrollSnap" },
  "reading-progress":  { component: ReadingProgress, file: "ReadingProgress" },
  "accordion":         { component: Accordion, file: "Accordion" },
  "bento-grid":        { component: BentoGrid, file: "BentoGrid" },
  "card-stack":        { component: CardStack, file: "CardStack" },
  "carousel":          { component: Carousel, file: "Carousel" },
  "color-picker":      { component: ColorPicker, file: "ColorPicker" },
  "command-palette":   { component: CommandPalette, file: "CommandPalette" },
  "copy-button":       { component: CopyButton, file: "CopyButton" },
  "floating-label":    { component: FloatingLabel, file: "FloatingLabel" },
  "glassmorphism":     { component: Glassmorphism, file: "Glassmorphism" },
  "masonry-grid":      { component: MasonryGrid, file: "MasonryGrid" },
  "otp-input":         { component: OTPInput, file: "OTPInput" },
  "password-strength": { component: PasswordStrength, file: "PasswordStrength" },
  "progress-bar":      { component: ProgressBar, file: "ProgressBar" },
  "side-drawer":       { component: SideDrawer, file: "SideDrawer" },
  "skeleton-loader":   { component: SkeletonLoader, file: "SkeletonLoader" },
  "tabs":              { component: Tabs, file: "Tabs" },
  "timeline":          { component: Timeline, file: "Timeline" },
  "toast-notification":{ component: ToastNotification, file: "ToastNotification" },
  "toggle-switch":     { component: ToggleSwitch, file: "ToggleSwitch" },
  "tooltip":           { component: TooltipShowcase, file: "Tooltip" },
  "date-picker":       { component: DatePicker, file: "DatePicker" },
  "range-slider":      { component: RangeSlider, file: "RangeSlider" },
  "stepper":           { component: Stepper, file: "Stepper" },
  "combobox":          { component: Combobox, file: "Combobox" },
  "infinite-scroll":   { component: InfiniteScroll, file: "InfiniteScroll" },
  "dock":              { component: Dock, file: "Dock" },
  "image-comparison":  { component: ImageComparison, file: "ImageComparison" },
  "border-beam":       { component: BorderBeam, file: "BorderBeam" },
  "file-upload":       { component: FileUpload, file: "FileUpload" },
  "globe":             { component: Globe, file: "Globe" },
  "kanban-board":      { component: KanbanBoard, file: "KanbanBoard" },
  "virtualized-list":  { component: VirtualizedList, file: "VirtualizedList" },
  "radial-menu":       { component: RadialMenu, file: "RadialMenu" },
  "signature-pad":     { component: SignaturePad, file: "SignaturePad" },
  "data-table":        { component: DataTable, file: "DataTable" },
  "calendar-heatmap":  { component: CalendarHeatmap, file: "CalendarHeatmap" },
  "markdown-preview":  { component: MarkdownPreview, file: "MarkdownPreview" },
  "pomodoro-timer":    { component: PomodoroTimer, file: "PomodoroTimer" },
  "game-of-life":      { component: GameOfLife, file: "GameOfLife" },
  "resizable-split-pane": { component: ResizableSplitPane, file: "ResizableSplitPane" },
};

export const showcases: Record<string, ShowcaseMeta> = Object.fromEntries(
  showcaseList.flatMap((m) => {
    const entry = registry[m.slug];
    return entry ? [[m.slug, { ...m, ...entry }]] : [];
  }),
);
