"use client";

import { useState } from "react";

const ITEMS = [
  { emoji: "📷", label: "Photo" },
  { emoji: "🎵", label: "Music" },
  { emoji: "✏️", label: "Edit" },
  { emoji: "📍", label: "Pin" },
  { emoji: "💬", label: "Chat" },
  { emoji: "⭐", label: "Star" },
];

const DISTANCE = 96;

export default function RadialMenu() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-6 py-10 w-full">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {ITEMS.map((item, i) => {
          const angle = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * DISTANCE;
          const y = Math.sin(angle) * DISTANCE;
          return (
            <button
              key={item.label}
              onClick={() => {
                setSelected(item.label);
                setOpen(false);
              }}
              aria-label={item.label}
              tabIndex={open ? 0 : -1}
              style={{
                transform: open
                  ? `translate(${x}px, ${y}px) scale(1)`
                  : "translate(0px, 0px) scale(0.3)",
                opacity: open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
                transitionDelay: `${(open ? i : ITEMS.length - 1 - i) * 35}ms`,
              }}
              className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md text-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-zinc-400 dark:hover:border-zinc-500 cursor-pointer"
            >
              {item.emoji}
            </button>
          );
        })}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-2xl shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </button>
      </div>

      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        {selected ? `selected: ${selected}` : "tap the button"} · staggered
        spring fan-out
      </p>
    </div>
  );
}
