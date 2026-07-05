"use client";

import { useRef, useState } from "react";

const APPS = [
  { emoji: "🌐", label: "Browser", running: true },
  { emoji: "✉️", label: "Mail", running: false },
  { emoji: "🎵", label: "Music", running: true },
  { emoji: "📷", label: "Photos", running: false },
  { emoji: "🗺️", label: "Maps", running: false },
  { emoji: "💬", label: "Messages", running: true },
  { emoji: "📝", label: "Notes", running: false },
  { emoji: "⚙️", label: "Settings", running: false },
];

const BASE = 44;
const MAX_BOOST = 36;
const RANGE = 130;

const RESTING = APPS.map(() => BASE);

function DockIcon({
  emoji,
  label,
  running,
  size,
  resting,
}: (typeof APPS)[number] & { size: number; resting: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {hovered && (
        <span className="absolute -top-9 px-2.5 py-1 rounded-md bg-zinc-900/90 dark:bg-zinc-50/90 text-white dark:text-zinc-900 text-[11px] font-medium whitespace-nowrap pointer-events-none">
          {label}
        </span>
      )}
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.55,
          transition: resting ? "all 300ms ease-out" : "all 80ms ease-out",
        }}
        className="flex items-end justify-center pb-0.5 rounded-xl bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 shadow-sm select-none cursor-pointer"
      >
        {emoji}
      </button>
      <span
        className={`mt-1 w-1 h-1 rounded-full ${
          running ? "bg-zinc-500 dark:bg-zinc-400" : "bg-transparent"
        }`}
      />
    </div>
  );
}

export default function Dock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<number[]>(RESTING);

  const resting = sizes === RESTING;

  function onMouseMove(e: React.MouseEvent) {
    const container = containerRef.current;
    if (!container) return;
    const buttons = container.querySelectorAll("button");
    setSizes(
      [...buttons].map((btn) => {
        const rect = btn.getBoundingClientRect();
        const dist = Math.abs(e.clientX - (rect.left + rect.width / 2));
        const falloff = Math.max(0, 1 - dist / RANGE);
        return BASE + MAX_BOOST * falloff * falloff;
      }),
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 py-12 w-full">
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setSizes(RESTING)}
        className="flex items-end gap-2 px-3 pt-3 pb-1.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur"
      >
        {APPS.map((app, i) => (
          <DockIcon
            key={app.label}
            {...app}
            size={sizes[i] ?? BASE}
            resting={resting}
          />
        ))}
      </div>
      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        sweep the cursor across the dock
      </p>
    </div>
  );
}
