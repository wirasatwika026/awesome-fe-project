"use client";

import { useState } from "react";

const EXAMPLES = [
  {
    label: "Violet extrude",
    text: "3D",
    color: "#c4b5fd",
    depth: 20,
    hue: 260,
  },
  {
    label: "Gold chrome",
    text: "GOLD",
    color: "#fbbf24",
    depth: 15,
    hue: 45,
  },
  {
    label: "Neon green",
    text: "GLITCH",
    color: "#4ade80",
    depth: 12,
    hue: 140,
  },
];

function buildShadow(depth: number, hue: number) {
  return Array.from({ length: depth }, (_, i) => {
    const d = i + 1;
    const lightness = Math.max(20, 45 - i * 1.5);
    return `${d}px ${d}px 0 hsl(${hue}, 70%, ${lightness}%)`;
  }).join(", ");
}

export default function ThreeDText() {
  const [idx, setIdx] = useState(0);
  const ex = EXAMPLES[idx];

  return (
    <div className="flex flex-col items-center gap-10 py-10 w-full bg-zinc-950 rounded-xl">
      {/* main text */}
      <div className="flex items-center justify-center" style={{ minHeight: 180 }}>
        <h2
          key={idx}
          className="font-black select-none"
          style={{
            fontSize: ex.text.length <= 4 ? "clamp(72px, 15vw, 120px)" : "clamp(42px, 8vw, 72px)",
            color: ex.color,
            textShadow: buildShadow(ex.depth, ex.hue),
            letterSpacing: "0.04em",
            animation: "float-up 0.4s ease-out",
          }}
        >
          {ex.text}
        </h2>
      </div>

      {/* presets */}
      <div className="flex gap-2 flex-wrap justify-center">
        {EXAMPLES.map((e, i) => (
          <button
            key={e.label}
            onClick={() => setIdx(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              i === idx
                ? "bg-zinc-200 text-zinc-900"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-600">
        CSS text-shadow stacking · depth = {ex.depth} layers · no SVG
      </p>
    </div>
  );
}
