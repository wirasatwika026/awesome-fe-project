"use client";

import { useRef, useState } from "react";

const MIN_PERCENT = 15;
const MAX_PERCENT = 85;

export default function ResizableSplitPane() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(50);
  const [dragging, setDragging] = useState(false);

  function updateFromClientX(clientX: number) {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, percent)));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div
        ref={containerRef}
        className="w-full h-56 flex rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 select-none"
      >
        <div
          style={{ width: `${splitPercent}%` }}
          className="h-full bg-violet-50 dark:bg-violet-950/30 p-4 overflow-hidden"
        >
          <p className="text-xs font-mono text-violet-600 dark:text-violet-400 font-semibold mb-1">
            Panel A
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Drag the divider to resize this panel.
          </p>
        </div>

        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`w-1.5 shrink-0 h-full cursor-col-resize flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 hover:bg-violet-400 dark:hover:bg-violet-600 transition-colors ${
            dragging ? "bg-violet-500 dark:bg-violet-500" : ""
          }`}
        >
          <div className="w-0.5 h-6 rounded-full bg-white/70" />
        </div>

        <div
          style={{ width: `${100 - splitPercent}%` }}
          className="h-full bg-zinc-50 dark:bg-zinc-900 p-4 overflow-hidden"
        >
          <p className="text-xs font-mono text-zinc-600 dark:text-zinc-300 font-semibold mb-1">
            Panel B
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Content reflows as the split changes.
          </p>
        </div>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        Pointer Events + setPointerCapture · {Math.round(splitPercent)}% / {Math.round(100 - splitPercent)}%
      </p>
    </div>
  );
}
