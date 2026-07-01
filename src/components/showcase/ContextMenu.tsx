"use client";

import { useEffect, useRef, useState } from "react";

type MenuItem =
  | { type: "item"; label: string; shortcut: string; danger?: boolean; icon?: string }
  | { type: "sep" };

const MENU: MenuItem[] = [
  { type: "item", label: "Open",       shortcut: "Enter",  icon: "↵" },
  { type: "item", label: "Copy",       shortcut: "Ctrl+C", icon: "⌘" },
  { type: "item", label: "Duplicate",  shortcut: "Ctrl+D", icon: "⧉" },
  { type: "sep" },
  { type: "item", label: "Rename",     shortcut: "F2"                },
  { type: "item", label: "Share",      shortcut: "⇧⌘S"               },
  { type: "sep" },
  { type: "item", label: "Move to Trash", shortcut: "⌦", danger: true },
];

export default function ContextMenu() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function onContext(e: React.MouseEvent) {
    e.preventDefault();
    const rect = areaRef.current!.getBoundingClientRect();
    const MW = 210, MH = 220;
    const x = Math.min(e.clientX - rect.left, rect.width  - MW - 8);
    const y = Math.min(e.clientY - rect.top,  rect.height - MH - 8);
    setPos({ x: Math.max(4, x), y: Math.max(4, y) });
  }

  useEffect(() => {
    function close() { setPos(null); }
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setPos(null); }
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        ref={areaRef}
        onContextMenu={onContext}
        className="relative w-full h-64 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 select-none overflow-hidden"
      >
        {/* placeholder files */}
        <div className="p-4 grid grid-cols-3 gap-3">
          {["project.tsx", "globals.css", "layout.tsx", "README.md", "package.json", "tsconfig.json"].map((f) => (
            <div key={f} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-default transition-colors">
              <div className="w-10 h-12 rounded bg-zinc-200 dark:bg-zinc-700 flex items-end justify-center pb-1">
                <span className="text-[8px] font-mono text-zinc-400">{f.split(".")[1]}</span>
              </div>
              <span className="text-[10px] text-zinc-500 text-center leading-tight">{f}</span>
            </div>
          ))}
        </div>

        <p className="absolute bottom-3 right-4 text-[10px] font-mono text-zinc-400">right-click anywhere</p>

        {/* menu */}
        {pos && (
          <div
            ref={menuRef}
            className="absolute z-50 w-52 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl py-1.5 overflow-hidden"
            style={{ left: pos.x, top: pos.y }}
            onClick={(e) => e.stopPropagation()}
          >
            {MENU.map((item, i) =>
              item.type === "sep" ? (
                <div key={i} className="my-1 h-px bg-zinc-100 dark:bg-zinc-800 mx-2" />
              ) : (
                <button
                  key={i}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-sm transition-colors ${
                    item.danger
                      ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                  onClick={() => setPos(null)}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <span className="text-zinc-400 text-xs w-4">{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">{item.shortcut}</span>
                </button>
              )
            )}
          </div>
        )}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        contextmenu event · edge-aware position clamp · Escape/click dismiss
      </p>
    </div>
  );
}
