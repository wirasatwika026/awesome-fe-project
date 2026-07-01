"use client";

import { useRef, useState } from "react";

export default function RangeSlider() {
  const [lo, setLo] = useState(20);
  const [hi, setHi] = useState(75);
  const trackRef = useRef<HTMLDivElement>(null);

  function drag(side: "lo" | "hi") {
    return (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      function move(ev: PointerEvent) {
        const rect = trackRef.current!.getBoundingClientRect();
        const p = Math.round(Math.max(0, Math.min(100, ((ev.clientX - rect.left) / rect.width) * 100)));
        if (side === "lo") setLo(Math.min(p, hi - 5));
        else setHi(Math.max(p, lo + 5));
      }
      function up() {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      }
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
  }

  return (
    <div className="w-full flex flex-col gap-10 py-6 px-4">
      {/* label */}
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-zinc-700 dark:text-zinc-300">Price range</span>
        <span className="text-violet-600 dark:text-violet-400 font-mono">${lo} – ${hi}</span>
      </div>

      {/* slider */}
      <div ref={trackRef} className="relative h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 mx-2">
        {/* fill */}
        <div
          className="absolute h-full rounded-full bg-violet-500"
          style={{ left: `${lo}%`, width: `${hi - lo}%` }}
        />

        {/* low handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-2 border-violet-500 shadow-md cursor-grab active:cursor-grabbing active:scale-110 transition-transform z-10"
          style={{ left: `${lo}%` }}
          onPointerDown={drag("lo")}
        >
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-500 whitespace-nowrap">
            ${lo}
          </div>
        </div>

        {/* high handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-2 border-violet-500 shadow-md cursor-grab active:cursor-grabbing active:scale-110 transition-transform z-10"
          style={{ left: `${hi}%` }}
          onPointerDown={drag("hi")}
        >
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-500 whitespace-nowrap">
            ${hi}
          </div>
        </div>
      </div>

      {/* tick labels */}
      <div className="flex justify-between text-[10px] font-mono text-zinc-400 px-0 mt-2">
        {[0, 25, 50, 75, 100].map((v) => (
          <span key={v}>${v}</span>
        ))}
      </div>

      {/* result summary */}
      <div className="rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 p-3 text-center">
        <p className="text-sm text-violet-700 dark:text-violet-300">
          Showing items priced <span className="font-bold">${lo}</span> to <span className="font-bold">${hi}</span>
        </p>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        Pointer Events · setPointerCapture · dual-handle · min gap constraint
      </p>
    </div>
  );
}
