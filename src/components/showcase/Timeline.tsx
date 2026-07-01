"use client";

import { useEffect, useRef, useState } from "react";

const EVENTS = [
  { year: "2020", title: "First commit", desc: "Started the journey with HTML, CSS, and plain JavaScript.", color: "bg-violet-500", glow: "shadow-violet-500/30" },
  { year: "2021", title: "React era",    desc: "Discovered components, hooks, and the beauty of declarative UI.", color: "bg-sky-500", glow: "shadow-sky-500/30" },
  { year: "2022", title: "Full-stack",   desc: "Node.js, databases, REST APIs — the whole picture clicks.", color: "bg-emerald-500", glow: "shadow-emerald-500/30" },
  { year: "2023", title: "TypeScript",   desc: "Never going back. Type safety changed everything.", color: "bg-amber-500", glow: "shadow-amber-500/30" },
  { year: "2024", title: "AI tooling",   desc: "Integrated LLMs into the development workflow.", color: "bg-pink-500", glow: "shadow-pink-500/30" },
  { year: "2025", title: "Awesome FE",   desc: "This showcase — Next.js 15, Tailwind v4, zero external UI libs.", color: "bg-fuchsia-500", glow: "shadow-fuchsia-500/30" },
];

function TimelineItem({
  year, title, desc, color, glow, index, totalDelay,
}: (typeof EVENTS)[0] & { index: number; totalDelay: number }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const t = setTimeout(() => setVis(true), totalDelay);
    return () => clearTimeout(t);
  }, [totalDelay]);

  return (
    <div ref={ref} className={`flex items-start gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
      {/* Content card */}
      <div
        className={`flex-1 ${isLeft ? "pr-6 text-right" : "pl-6 text-left"} transition-all duration-500 ease-out`}
        style={{
          transform: vis ? "translateX(0)" : isLeft ? "translateX(-30px)" : "translateX(30px)",
          opacity: vis ? 1 : 0,
          transitionDelay: "0ms",
        }}
      >
        <div className="inline-block p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
          <span className={`text-xs font-mono font-bold ${color.replace("bg-", "text-")}`}>{year}</span>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mt-1 text-sm">{title}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Center spine + dot */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 20 }}>
        <div
          className={`w-4 h-4 rounded-full ${color} shadow-lg ${glow} transition-all duration-300 shrink-0`}
          style={{
            transform: vis ? "scale(1)" : "scale(0)",
            transitionDelay: "100ms",
          }}
        />
      </div>

      {/* Opposite side spacer */}
      <div className="flex-1" />
    </div>
  );
}

export default function Timeline() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full py-4">
      {/* center spine line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

      <div className="flex flex-col gap-6">
        {EVENTS.map((e, i) => (
          <TimelineItem
            key={e.year}
            {...e}
            index={i}
            totalDelay={started ? i * 150 + 200 : 99999}
          />
        ))}
      </div>

      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mt-8">
        staggered mount animation · alternating layout
      </p>
    </div>
  );
}
