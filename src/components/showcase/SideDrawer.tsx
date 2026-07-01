"use client";

import { useState } from "react";

const NAV = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "◈", label: "Analytics" },
  { icon: "⊕", label: "Projects" },
  { icon: "◎", label: "Team" },
  { icon: "⚙", label: "Settings" },
];

export default function SideDrawer() {
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [side, setSide]     = useState<"left" | "right">("left");

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950" style={{ height: 360 }}>
      {/* page content */}
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex gap-3">
          <button
            onClick={() => { setSide("left"); setOpen(true); }}
            className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            ← Open Left
          </button>
          <button
            onClick={() => { setSide("right"); setOpen(true); }}
            className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            Open Right →
          </button>
        </div>
        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">click to open drawer</p>
      </div>

      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
      />

      {/* drawer */}
      <div
        className="absolute top-0 bottom-0 w-64 bg-white dark:bg-zinc-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out"
        style={{
          [side]: 0,
          transform: open
            ? "translateX(0)"
            : side === "left" ? "translateX(-100%)" : "translateX(100%)",
        }}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Menu</p>
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 py-3 px-3">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActive(item.label); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors mb-0.5 ${
                active === item.label
                  ? "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-medium"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* footer */}
        <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">Awesome FE v2.0</p>
        </div>
      </div>
    </div>
  );
}
