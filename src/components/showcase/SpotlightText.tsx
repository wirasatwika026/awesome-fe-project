"use client";

import { useRef, useState } from "react";

const TEXT = "Move your cursor here to reveal the hidden message";

export default function SpotlightText() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  return (
    <div className="flex flex-col items-center gap-8 py-6 w-full">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="relative w-full rounded-2xl overflow-hidden cursor-none select-none"
        style={{ minHeight: 200 }}
      >
        {/* dim layer */}
        <div className="flex items-center justify-center p-10">
          <p className="text-4xl font-black text-zinc-200 dark:text-zinc-800 text-center leading-snug">
            {TEXT}
          </p>
        </div>

        {/* revealed layer — masked to spotlight */}
        <div
          className="absolute inset-0 flex items-center justify-center p-10"
          style={{
            maskImage: active
              ? `radial-gradient(circle 130px at ${pos.x}% ${pos.y}%, black 0%, transparent 100%)`
              : "none",
            WebkitMaskImage: active
              ? `radial-gradient(circle 130px at ${pos.x}% ${pos.y}%, black 0%, transparent 100%)`
              : "none",
          }}
        >
          <p className="text-4xl font-black text-zinc-900 dark:text-zinc-50 text-center leading-snug">
            {TEXT}
          </p>
        </div>

        {/* cursor dot */}
        {active && (
          <div
            className="absolute w-5 h-5 rounded-full border-2 border-violet-500 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          />
        )}
      </div>

      {/* second example: color version */}
      <div
        className="relative w-full rounded-2xl overflow-hidden cursor-none select-none bg-zinc-950"
        style={{ minHeight: 120 }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
      >
        <div className="flex items-center justify-center p-8">
          <p className="text-3xl font-black text-zinc-800 text-center">
            ✦ Hover to illuminate ✦
          </p>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center p-8"
          style={{
            maskImage: active
              ? `radial-gradient(circle 100px at ${pos.x}% ${pos.y}%, black 0%, transparent 100%)`
              : "none",
            WebkitMaskImage: active
              ? `radial-gradient(circle 100px at ${pos.x}% ${pos.y}%, black 0%, transparent 100%)`
              : "none",
            background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, #c4b5fd, #818cf8)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <p className="text-3xl font-black text-center">✦ Hover to illuminate ✦</p>
        </div>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        CSS mask-image · radial-gradient · cursor tracking
      </p>
    </div>
  );
}
