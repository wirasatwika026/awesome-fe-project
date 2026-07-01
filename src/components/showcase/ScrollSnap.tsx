"use client";

import { useRef, useState } from "react";

const SECTIONS = [
  { title: "Welcome",     sub: "Scroll down to explore",    bg: "from-violet-500 to-indigo-600"  },
  { title: "Features",    sub: "Built with pure CSS & JS",  bg: "from-sky-500 to-cyan-500"       },
  { title: "Performance", sub: "Zero external libraries",   bg: "from-emerald-500 to-teal-500"   },
  { title: "Design",      sub: "Pixel-perfect animations",  bg: "from-amber-500 to-orange-500"   },
  { title: "Ship It",     sub: "Start building today",      bg: "from-pink-500 to-rose-600"      },
];

export default function ScrollSnap() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  function onScroll() {
    const el = ref.current!;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    setCurrent(Math.max(0, Math.min(SECTIONS.length - 1, idx)));
  }

  function scrollTo(idx: number) {
    ref.current?.scrollTo({ top: idx * ref.current.clientHeight, behavior: "smooth" });
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative rounded-xl overflow-hidden" style={{ height: 280 }}>
        {/* dot nav */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {SECTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to section ${i + 1}`}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "white",
                opacity: i === current ? 1 : 0.35,
                transform: i === current ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* section counter */}
        <div className="absolute left-4 bottom-4 z-20 font-mono text-[10px] text-white/60">
          {String(current + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
        </div>

        {/* scrollable */}
        <div
          ref={ref}
          onScroll={onScroll}
          className="h-full overflow-y-scroll snap-y snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {SECTIONS.map((s, i) => (
            <div
              key={i}
              className={`h-full snap-start flex flex-col items-center justify-center bg-gradient-to-br ${s.bg} text-white select-none`}
            >
              <h2 className="text-3xl font-bold mb-1">{s.title}</h2>
              <p className="text-sm text-white/70">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        CSS scroll-snap-type: y mandatory · snap-start · dot navigation
      </p>
    </div>
  );
}
