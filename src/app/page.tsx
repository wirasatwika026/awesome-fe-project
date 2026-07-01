"use client";

import { useEffect, useState } from "react";

const showcases = [
  // ── Batch 1 ──────────────────────────────────────────────────
  { slug: "3d-card",           title: "3D Card",             description: "Card tilts in 3D space following the cursor using CSS perspective.",                                    category: "3D"               },
  { slug: "spotlight-card",    title: "Spotlight Card",      description: "Radial gradient spotlight that tracks the cursor on each card.",                                        category: "Micro-interaction" },
  { slug: "magnetic-button",   title: "Magnetic Button",     description: "Button shifts toward the cursor with a magnetic pull effect.",                                          category: "Micro-interaction" },
  { slug: "cursor-follower",   title: "Cursor Follower",     description: "A dot that snaps and a ring that lerps behind the cursor.",                                             category: "Micro-interaction" },
  { slug: "infinite-marquee",  title: "Infinite Marquee",    description: "Seamlessly looping horizontal ticker with fade mask on edges.",                                         category: "Animation"         },
  { slug: "text-scramble",     title: "Text Scramble",       description: "Characters randomize through a charset before revealing the final text.",                               category: "Animation"         },
  { slug: "counter-animation", title: "Counter Animation",   description: "Numbers animate up from zero when entering the viewport.",                                              category: "Animation"         },
  { slug: "typewriter",        title: "Typewriter",          description: "Text types and deletes character by character, cycling phrases.",                                       category: "Animation"         },
  { slug: "scroll-parallax",   title: "Scroll Parallax",     description: "Multi-layer depth effect, each element moves at a different speed.",                                    category: "Scroll"            },
  { slug: "scroll-progress",   title: "Scroll Progress Bar", description: "Thin gradient bar that tracks scroll progress through a content area.",                                    category: "Scroll"            },
  { slug: "sticky-header",     title: "Sticky Header",       description: "Header that shrinks and gains a frosted-glass backdrop when scrolled past a threshold.",                   category: "Scroll"            },
  { slug: "reveal-on-scroll",  title: "Reveal on Scroll",    description: "Elements slide in from different directions as they enter the viewport.",                                   category: "Scroll"            },
  { slug: "scroll-snap",       title: "Scroll Snap",         description: "Full-height sections that snap into place on scroll via CSS scroll-snap.",                                  category: "Scroll"            },
  { slug: "reading-progress",  title: "Reading Progress",    description: "Circular SVG progress ring that tracks how much of an article has been read.",                              category: "Scroll"            },
  { slug: "glassmorphism",     title: "Glassmorphism",       description: "Frosted glass cards using backdrop-filter blur over a gradient.",                                       category: "UI"                },
  { slug: "bento-grid",        title: "Bento Grid",          description: "Asymmetric CSS grid layout with mixed card sizes.",                                                     category: "UI"                },
  { slug: "skeleton-loader",   title: "Skeleton Loader",     description: "Animated shimmer placeholder shown while content is loading.",                                          category: "UI"                },
  { slug: "accordion",         title: "Accordion",           description: "Smooth expand/collapse sections with CSS height transition.",                                           category: "UI"                },
  { slug: "progress-bar",      title: "Progress Bar",        description: "Animated progress indicators triggered by IntersectionObserver.",                                       category: "UI"                },
  { slug: "ripple-effect",     title: "Ripple Effect",       description: "Material-design ripple burst animation triggered on click.",                                            category: "Micro-interaction" },
  { slug: "tooltip",           title: "Tooltip",             description: "Floating tooltip with auto-flip based on edge proximity.",                                              category: "UI"                },
  { slug: "svg-path-draw",     title: "SVG Path Draw",       description: "Stroke-dashoffset animation draws SVG paths when entering viewport.",                                  category: "Animation"         },
  { slug: "flip-clock",        title: "Flip Clock",          description: "Live clock with retro digit-flip animation every second.",                                              category: "Animation"         },
  { slug: "particle-field",    title: "Particle Field",      description: "Canvas-based dots that connect and react to cursor movement.",                                          category: "Canvas"            },
  { slug: "noise-background",  title: "Noise Background",    description: "Animated SVG feTurbulence fractal noise layered over a gradient.",                                      category: "Canvas"            },
  { slug: "liquid-button",     title: "Liquid Button",       description: "CSS goo filter merges blobs with the button for a liquid effect.",                                      category: "Micro-interaction" },
  { slug: "command-palette",   title: "Command Palette",     description: "Cmd+K search modal with keyboard navigation and grouped results.",                                      category: "UI"                },

  // ── Batch 2 ──────────────────────────────────────────────────
  { slug: "matrix-rain",       title: "Matrix Rain",         description: "Digital katakana rain rendered on canvas with a glowing head character.",                              category: "Canvas"            },
  { slug: "fireworks",         title: "Fireworks",           description: "Click anywhere to launch a colorful particle burst with gravity and trails.",                          category: "Canvas"            },
  { slug: "wave-animation",    title: "Wave Animation",      description: "Four overlapping sine waves animated with phase offsets on a canvas.",                                 category: "Canvas"            },
  { slug: "3d-cube",           title: "3D Cube",             description: "CSS preserve-3d cube with 6 gradient faces — auto-spins and drag to rotate.",                         category: "3D"               },
  { slug: "gradient-text",     title: "Gradient Text",       description: "Animated rainbow sweep, diagonal gradient, and chrome metallic text effects.",                         category: "Animation"         },
  { slug: "split-text-reveal", title: "Split Text Reveal",   description: "Words fly in with a spring transform, staggered per word with configurable delay.",                   category: "Animation"         },
  { slug: "character-morph",   title: "Character Morph",     description: "Characters scramble through a random charset before revealing the next word.",                         category: "Animation"         },
  { slug: "masonry-grid",      title: "Masonry Grid",        description: "Pinterest-style multi-column layout using CSS columns and break-inside-avoid.",                        category: "UI"                },
  { slug: "card-stack",        title: "Card Stack",          description: "Stacked cards you can drag to cycle — spring bounce and depth perspective.",                           category: "UI"                },
  { slug: "timeline",          title: "Timeline",            description: "Vertical alternating timeline with staggered mount animations.",                                        category: "UI"                },
  { slug: "drawing-canvas",    title: "Drawing Canvas",      description: "Freehand whiteboard with color palette, adjustable brush size, and eraser.",                          category: "Canvas"            },
  { slug: "color-picker",      title: "Color Picker",        description: "HSV color space picker: saturation/value square + hue strip + hex copy.",                             category: "UI"                },
  { slug: "drag-and-drop",     title: "Drag & Drop",         description: "Sortable list using the native HTML5 Drag API with drop target highlight.",                           category: "Micro-interaction" },
  { slug: "rating-stars",      title: "Rating Stars",        description: "Hover to preview, click to rate — animated fill with emoji feedback.",                                 category: "Micro-interaction" },
  { slug: "toggle-switch",     title: "Toggle Switch",       description: "Three toggle variants: pill, iOS-style, and square — all CSS transitions.",                           category: "UI"                },
  { slug: "copy-button",       title: "Copy Button",         description: "Code snippet cards with Clipboard API copy and animated state feedback.",                              category: "UI"                },
  { slug: "confetti",          title: "Confetti",            description: "Canvas confetti burst with physics — launch from button or click the canvas.",                         category: "Canvas"            },
  { slug: "bar-chart",         title: "Bar Chart",           description: "Animated bars grow from zero with staggered delay — three switchable datasets.",                            category: "Canvas"            },
  { slug: "audio-visualizer",  title: "Audio Visualizer",    description: "Web Audio API oscillator feeds AnalyserNode; FFT bins rendered as a color-shifting bar chart.",            category: "Canvas"            },
  { slug: "perlin-noise",      title: "Noise Field",         description: "Per-pixel sine-wave noise on a downscaled canvas — plasma, terrain, and flow palettes.",                  category: "Canvas"            },
  { slug: "snake-game",        title: "Snake Game",          description: "Classic snake on a 20×20 canvas grid — keyboard and D-pad support.",                                       category: "Canvas"            },

  // ── Batch 3 ──────────────────────────────────────────────────
  { slug: "aurora-background", title: "Aurora Background",  description: "Animated aurora borealis using CSS blur blobs with keyframe movement.",                                category: "Animation"         },
  { slug: "morphing-blob",     title: "Morphing Blob",      description: "CSS border-radius morph animation cycling through organic shapes.",                                     category: "Animation"         },
  { slug: "neon-glow",         title: "Neon Glow",          description: "Neon light effect using layered text-shadow and box-shadow with a flicker keyframe.",                  category: "Animation"         },
  { slug: "toast-notification",title: "Toast Notification", description: "Stacked dismissible toasts with type variants and an animated progress bar.",                          category: "UI"                },
  { slug: "otp-input",         title: "OTP Input",          description: "Six-digit code input with auto-advance, backspace nav, paste support, and shake on error.",            category: "UI"                },
  { slug: "floating-label",    title: "Floating Label",     description: "Material design input where the label floats up on focus or when filled.",                             category: "UI"                },
  { slug: "password-strength", title: "Password Strength",  description: "Live strength meter with animated bars and a checklist of validation rules.",                          category: "UI"                },
  { slug: "morphing-button",   title: "Morphing Button",    description: "Button transitions from idle → loading spinner → success/error state and auto-resets.",               category: "Micro-interaction" },
  { slug: "number-ticker",     title: "Number Ticker",      description: "Numbers animate to new values with ease-out-quart easing using requestAnimationFrame.",               category: "Animation"         },
  { slug: "spotlight-text",    title: "Spotlight Text",     description: "Cursor-tracking radial mask that reveals the bright layer of text beneath.",                           category: "Micro-interaction" },
  { slug: "like-button",       title: "Like Button",        description: "Twitter-style heart with particle burst, ring pulse, and spring scale animation.",                          category: "Micro-interaction" },
  { slug: "long-press",        title: "Long Press",         description: "Hold-to-confirm button with SVG circular progress ring driven by requestAnimationFrame.",                  category: "Micro-interaction" },
  { slug: "swipe-to-delete",   title: "Swipe to Delete",    description: "Slide list items left past a threshold to delete — Pointer Events with spring snap-back.",                category: "Micro-interaction" },
  { slug: "context-menu",      title: "Context Menu",       description: "Right-click custom menu with edge-aware positioning and keyboard dismiss.",                                 category: "Micro-interaction" },
  { slug: "blur-reveal",       title: "Blur Reveal",        description: "Content starts blurred and scales in with a staggered CSS filter transition.",                         category: "Animation"         },
  { slug: "donut-chart",       title: "Donut Chart",        description: "SVG donut chart with animated stroke-dasharray segments and hover highlight.",                         category: "Canvas"            },
  { slug: "line-chart",        title: "Line Chart",         description: "SVG cubic-bezier path that animates in via stroke-dashoffset with hover tooltips.",                    category: "Canvas"            },
  { slug: "carousel",          title: "Carousel",           description: "Drag-to-swipe slider with auto-play, dot indicators, and spring easing.",                             category: "UI"                },
  { slug: "side-drawer",       title: "Side Drawer",        description: "Slide-in panel from left or right with overlay, nav items, and smooth transition.",                   category: "UI"                },
  { slug: "tabs",              title: "Tabs",               description: "Smooth tab switching with a sliding indicator bar that moves via offsetLeft.",                         category: "UI"                },
  { slug: "holographic-card",  title: "Holographic Card",   description: "Credit card with 3D tilt and a cursor-tracked iridescent rainbow overlay.",                           category: "3D"               },
  { slug: "3d-text",           title: "3D Text",            description: "Extruded text depth effect built by stacking CSS text-shadows — no 3D library.",                      category: "3D"               },
  { slug: "infinite-zoom",     title: "Infinite Zoom",      description: "Canvas modular-scale shapes create a continuous infinite zoom-in illusion.",                           category: "Canvas"            },
  { slug: "date-picker",       title: "Date Picker",        description: "Month-view calendar with the Date API — no library, today highlight, month navigation.",                  category: "UI"                },
  { slug: "range-slider",      title: "Range Slider",       description: "Dual-handle range slider using Pointer Events with a min-gap constraint.",                                 category: "UI"                },
  { slug: "stepper",           title: "Stepper",            description: "Multi-step form with animated progress track, step indicators, and slide-in content.",                     category: "UI"                },
  { slug: "combobox",          title: "Combobox",           description: "Multi-select searchable dropdown with keyboard nav, chips, and Backspace to remove.",                      category: "UI"                },
  { slug: "infinite-scroll",   title: "Infinite Scroll",    description: "Scroll sentinel triggers async load via IntersectionObserver — 8 items per page.",                         category: "UI"                },
];

const CATEGORY_ORDER = ["3D", "Animation", "Canvas", "Micro-interaction", "Scroll", "UI"];

const categoryColors: Record<string, string> = {
  "3D":              "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Micro-interaction":"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Animation:         "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Scroll:            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  UI:                "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Canvas:            "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
};

const categoryDot: Record<string, string> = {
  "3D":              "bg-violet-500",
  "Micro-interaction":"bg-sky-500",
  Animation:         "bg-amber-500",
  Scroll:            "bg-emerald-500",
  UI:                "bg-pink-500",
  Canvas:            "bg-orange-500",
};

export default function Home() {
  const [filter, setFilter] = useState(() => {
    if (typeof window !== "undefined") return sessionStorage.getItem("home-filter") ?? "All";
    return "All";
  });

  // Restore scroll position when navigating back
  useEffect(() => {
    const saved = sessionStorage.getItem("home-scroll");
    if (saved) {
      // double rAF ensures layout is complete before scrolling
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(saved), behavior: "instant" });
          sessionStorage.removeItem("home-scroll");
        })
      );
    }
  }, []);

  function saveState() {
    sessionStorage.setItem("home-scroll", String(window.scrollY));
    sessionStorage.setItem("home-filter", filter);
  }

  const filtered =
    filter === "All" ? showcases : showcases.filter((s) => s.category === filter);

  const countFor = (cat: string) =>
    cat === "All"
      ? showcases.length
      : showcases.filter((s) => s.category === cat).length;

  return (
    <main className="min-h-screen px-6 py-16 font-sans max-w-5xl mx-auto">
      {/* header */}
      <header className="mb-10">
        <p className="text-sm font-mono text-zinc-400 dark:text-zinc-500 mb-3 tracking-widest uppercase">
          Frontend Showcase
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Awesome FE
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
          A collection of beautiful frontend components — 3D, animations, scroll effects, and micro-interactions.
        </p>
      </header>

      {/* filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* All */}
        <button
          onClick={() => setFilter("All")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            filter === "All"
              ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-sm"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          }`}
        >
          All
          <span className={`text-[10px] tabular-nums ${filter === "All" ? "opacity-60" : "opacity-50"}`}>
            {countFor("All")}
          </span>
        </button>

        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              filter === cat
                ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[cat]}`} />
            {cat}
            <span className={`text-[10px] tabular-nums ${filter === cat ? "opacity-60" : "opacity-50"}`}>
              {countFor(cat)}
            </span>
          </button>
        ))}
      </div>

      {/* count line */}
      <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mb-5">
        {filter === "All" ? (
          <>showing <span className="text-zinc-900 dark:text-zinc-50 font-semibold">{showcases.length}</span> components</>
        ) : (
          <>
            <span className="text-zinc-900 dark:text-zinc-50 font-semibold">{filtered.length}</span> of {showcases.length} · {filter}
          </>
        )}
      </p>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <a
            key={item.slug}
            href={`/showcase/${item.slug}`}
            onClick={saveState}
            className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-200"
          >
            <div className="mb-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[item.category] ?? ""}`}>
                {item.category}
              </span>
            </div>
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {item.title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
