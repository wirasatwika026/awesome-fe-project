"use client";

import { useState } from "react";

const PRESETS = [
  {
    label: "Fluid",
    gradient: "from-violet-500 to-indigo-600",
    duration: "8s",
    shadow: "shadow-violet-500/30",
  },
  {
    label: "Lava",
    gradient: "from-orange-500 to-red-600",
    duration: "5s",
    shadow: "shadow-orange-500/30",
  },
  {
    label: "Ocean",
    gradient: "from-cyan-400 to-blue-600",
    duration: "11s",
    shadow: "shadow-cyan-500/30",
  },
  {
    label: "Forest",
    gradient: "from-emerald-400 to-teal-600",
    duration: "7s",
    shadow: "shadow-emerald-500/30",
  },
];

export default function MorphingBlob() {
  const [preset, setPreset] = useState(0);
  const { gradient, duration, shadow } = PRESETS[preset];

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10 w-full">
      {/* blob */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
        {/* glow */}
        <div
          className={`absolute inset-4 bg-gradient-to-br ${gradient} blur-2xl opacity-50 ${shadow}`}
          style={{ animation: `blob-morph ${duration} ease-in-out infinite` }}
        />
        {/* main blob */}
        <div
          className={`w-44 h-44 bg-gradient-to-br ${gradient} shadow-2xl ${shadow}`}
          style={{ animation: `blob-morph ${duration} ease-in-out infinite` }}
        />
      </div>

      {/* presets */}
      <div className="flex gap-2">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setPreset(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              i === preset
                ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        CSS border-radius morph · no SVG · no canvas
      </p>
    </div>
  );
}
