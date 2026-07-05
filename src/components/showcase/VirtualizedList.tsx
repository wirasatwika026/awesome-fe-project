"use client";

import { useMemo, useState } from "react";

const TOTAL = 10_000;
const ROW_HEIGHT = 48;
const VIEWPORT = 320;
const OVERSCAN = 5;

const EMOJI = ["📦", "🔧", "🎨", "📊", "🚀", "💡", "🔒", "🌈"];

export default function VirtualizedList() {
  const [scrollTop, setScrollTop] = useState(0);

  const rows = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, i) => ({
        id: i,
        emoji: EMOJI[i % EMOJI.length],
        name: `Item #${String(i + 1).padStart(5, "0")}`,
        meta: `id ${(i * 2654435761) % 100000}`,
      })),
    [],
  );

  const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const end = Math.min(
    TOTAL,
    Math.ceil((scrollTop + VIEWPORT) / ROW_HEIGHT) + OVERSCAN,
  );
  const visible = rows.slice(start, end);

  return (
    <div className="flex flex-col items-center gap-5 py-8 w-full">
      <div
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        style={{ height: VIEWPORT }}
        className="w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
      >
        {/* full-height spacer keeps the scrollbar honest */}
        <div style={{ height: TOTAL * ROW_HEIGHT, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transform: `translateY(${start * ROW_HEIGHT}px)`,
            }}
          >
            {visible.map((row) => (
              <div
                key={row.id}
                style={{ height: ROW_HEIGHT }}
                className="flex items-center gap-3 px-4 border-b border-zinc-100 dark:border-zinc-800"
              >
                <span className="text-lg">{row.emoji}</span>
                <span className="text-sm font-mono text-zinc-900 dark:text-zinc-50">
                  {row.name}
                </span>
                <span className="ml-auto text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
                  {row.meta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        {TOTAL.toLocaleString()} rows · rendering {start + 1}–{end} ·{" "}
        {visible.length} DOM nodes
      </p>
    </div>
  );
}
