"use client";

import { useRef, useState } from "react";

const INITIAL = [
  { id: 1, title: "Design system update",       tag: "Design"   },
  { id: 2, title: "API integration review",     tag: "Backend"  },
  { id: 3, title: "Performance audit",          tag: "DevOps"   },
  { id: 4, title: "Mobile responsive fixes",    tag: "Frontend" },
  { id: 5, title: "Accessibility improvements", tag: "A11y"     },
];

const TAG_COLOR: Record<string, string> = {
  Design:   "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Backend:  "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  DevOps:   "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Frontend: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  A11y:     "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

const THRESHOLD = 90;

export default function SwipeToDelete() {
  const [items, setItems] = useState(INITIAL);
  const [active, setActive] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const startX = useRef(0);

  function onDown(e: React.PointerEvent, id: number) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    setActive(id);
    setOffset(0);
  }

  function onMove(e: React.PointerEvent) {
    if (active === null) return;
    setOffset(Math.min(0, e.clientX - startX.current));
  }

  function onUp() {
    if (active === null) return;
    if (offset < -THRESHOLD) {
      setItems((prev) => prev.filter((i) => i.id !== active));
    }
    setActive(null);
    setOffset(0);
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-[11px] font-mono text-zinc-400 mb-1">← swipe left to delete</p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-10 text-zinc-400">
          <p className="text-sm">All items deleted</p>
          <button
            onClick={() => setItems(INITIAL)}
            className="text-xs px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Restore
          </button>
        </div>
      ) : (
        items.map((item) => {
          const isActive = active === item.id;
          const dx = isActive ? offset : 0;
          const progress = Math.min(1, Math.abs(dx) / THRESHOLD);

          return (
            <div key={item.id} className="relative overflow-hidden rounded-xl">
              {/* delete bg */}
              <div
                className="absolute inset-0 bg-red-500 flex items-center justify-end pr-5"
                style={{ opacity: progress }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                </svg>
              </div>

              {/* item */}
              <div
                className="relative flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3.5 cursor-grab active:cursor-grabbing select-none"
                style={{
                  transform: `translateX(${dx}px)`,
                  transition: isActive ? "none" : "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                onPointerDown={(e) => onDown(e, item.id)}
                onPointerMove={onMove}
                onPointerUp={onUp}
              >
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.title}</p>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${TAG_COLOR[item.tag]}`}>
                  {item.tag}
                </span>
              </div>
            </div>
          );
        })
      )}

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mt-1">
        Pointer Events API · setPointerCapture · translateX · delete threshold
      </p>
    </div>
  );
}
