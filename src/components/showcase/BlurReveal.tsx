"use client";

import { useState } from "react";

const CARDS = [
  {
    title: "Revenue",
    value: "$128,430",
    sub: "+24% this month",
    color: "from-violet-600 to-indigo-700",
  },
  {
    title: "Active users",
    value: "56,023",
    sub: "+12% this week",
    color: "from-sky-600 to-blue-700",
  },
  {
    title: "Conversion",
    value: "3.87%",
    sub: "+0.4pp vs last quarter",
    color: "from-emerald-600 to-teal-700",
  },
];

export default function BlurReveal() {
  const [revealed, setRevealed] = useState(false);
  const [key, setKey] = useState(0);

  function reveal() {
    setRevealed(true);
    setKey((k) => k + 1);
  }

  function reset() {
    setRevealed(false);
  }

  return (
    <div className="flex flex-col items-center gap-8 py-10 w-full">
      <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            className={`rounded-2xl bg-gradient-to-br ${card.color} p-5 transition-all duration-700`}
            style={{
              filter: revealed ? "blur(0px)" : "blur(16px)",
              opacity: revealed ? 1 : 0.2,
              transform: revealed ? "scale(1)" : "scale(0.95)",
              transitionDelay: revealed ? `${i * 120}ms` : "0ms",
            }}
          >
            <p className="text-white/60 text-xs font-mono mb-2">{card.title}</p>
            <p className="text-white text-2xl font-black">{card.value}</p>
            <p className="text-white/50 text-xs mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* content block */}
      <div
        className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 transition-all duration-700"
        style={{
          filter: revealed ? "blur(0px)" : "blur(12px)",
          opacity: revealed ? 1 : 0.15,
          transitionDelay: revealed ? "360ms" : "0ms",
        }}
      >
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Q1 Analyst Summary</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Strong growth across all key metrics this quarter. Revenue exceeded projections by 18%,
          driven primarily by expansion in the enterprise segment and improved conversion from organic channels.
          Customer acquisition cost decreased 11% YoY as content-led growth matured.
        </p>
      </div>

      <div className="flex gap-3">
        {!revealed ? (
          <button
            onClick={reveal}
            className="px-6 py-2.5 rounded-full bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/20"
          >
            Reveal report
          </button>
        ) : (
          <button
            onClick={reset}
            className="text-xs font-mono text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            ↺ reset
          </button>
        )}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        CSS filter blur → 0 · staggered delay · scale transition
      </p>
    </div>
  );
}
