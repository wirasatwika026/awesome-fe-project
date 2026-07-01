"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { dir: "up",    color: "from-violet-500/20 to-violet-500/5",   border: "border-violet-200 dark:border-violet-900",   label: "Fade Up"    },
  { dir: "right", color: "from-sky-500/20 to-sky-500/5",         border: "border-sky-200 dark:border-sky-900",         label: "Fade Right" },
  { dir: "left",  color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-200 dark:border-emerald-900", label: "Fade Left"  },
  { dir: "up",    color: "from-amber-500/20 to-amber-500/5",     border: "border-amber-200 dark:border-amber-900",     label: "Fade Up"    },
  { dir: "scale", color: "from-pink-500/20 to-pink-500/5",       border: "border-pink-200 dark:border-pink-900",       label: "Scale In"   },
  { dir: "right", color: "from-orange-500/20 to-orange-500/5",   border: "border-orange-200 dark:border-orange-900",   label: "Fade Right" },
  { dir: "left",  color: "from-indigo-500/20 to-indigo-500/5",   border: "border-indigo-200 dark:border-indigo-900",   label: "Fade Left"  },
  { dir: "scale", color: "from-rose-500/20 to-rose-500/5",       border: "border-rose-200 dark:border-rose-900",       label: "Scale In"   },
];

function initialTransform(dir: string) {
  if (dir === "up")    return "translateY(28px)";
  if (dir === "down")  return "translateY(-28px)";
  if (dir === "left")  return "translateX(-28px)";
  if (dir === "right") return "translateX(28px)";
  if (dir === "scale") return "scale(0.88)";
  return "translateY(28px)";
}

export default function RevealOnScroll() {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = parseInt(e.target.getAttribute("data-idx") ?? "0");
          if (e.isIntersecting) setVisible((s) => new Set([...s, idx]));
        });
      },
      { root: containerRef.current, threshold: 0.25 }
    );
    itemRefs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        ref={containerRef}
        className="h-72 overflow-y-scroll rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3"
      >
        {ITEMS.map((item, i) => {
          const revealed = visible.has(i);
          return (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              data-idx={i}
              className={`flex items-center justify-between rounded-xl p-4 bg-gradient-to-r ${item.color} border ${item.border}`}
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "none" : initialTransform(item.dir),
                transition: `opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)`,
                transitionDelay: `${i * 40}ms`,
              }}
            >
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {item.label} — element {i + 1}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{item.dir}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        IntersectionObserver · staggered delay · per-direction transform
      </p>
    </div>
  );
}
