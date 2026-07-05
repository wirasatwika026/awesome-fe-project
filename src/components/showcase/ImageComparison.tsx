"use client";

import { useRef, useState } from "react";

export default function ImageComparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  function updateFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 w-full">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={(e) => dragging && updateFromClientX(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 select-none touch-none cursor-ew-resize"
      >
        {/* before: grayscale */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/love-me.webp"
          alt="Before — grayscale"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-75"
        />
        {/* after: full color, clipped to the slider position */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/love-me.webp"
          alt="After — full color"
          draggable={false}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* divider + handle */}
        <div
          style={{ left: `${pos}%` }}
          className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-zinc-500 text-xs font-bold tracking-tighter">
            ◂▸
          </div>
        </div>

        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-zinc-950/60 text-white text-[10px] font-mono uppercase tracking-widest">
          Before
        </span>
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-zinc-950/60 text-white text-[10px] font-mono uppercase tracking-widest">
          After
        </span>
      </div>

      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        drag the handle · clip-path + pointer events · {Math.round(pos)}%
      </p>
    </div>
  );
}
