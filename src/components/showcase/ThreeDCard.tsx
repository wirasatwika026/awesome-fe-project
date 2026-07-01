"use client";

import { useRef } from "react";

export default function ThreeDCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    el.style.transition = "transform 60ms ease-out";
    el.style.transform = `perspective(900px) rotateY(${x * 22}deg) rotateX(${y * -22}deg) scale(1.02)`;

    // glare position
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  }

  function onMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 500ms cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative w-72 h-96 rounded-2xl cursor-pointer select-none overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
        }}
      >
        {/* static inner highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent" />

        {/* dynamic glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle 160px at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.18) 0%, transparent 70%)",
          }}
        />

        {/* card content */}
        <div className="relative h-full flex flex-col justify-between p-7">
          {/* top */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm" />
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <div className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>

          {/* middle decoration */}
          <div className="space-y-2">
            <div className="h-1.5 rounded-full bg-white/25 w-full" />
            <div className="h-1.5 rounded-full bg-white/25 w-4/5" />
            <div className="h-1.5 rounded-full bg-white/15 w-3/5" />
          </div>

          {/* bottom */}
          <div>
            <p className="text-white/60 text-xs font-mono mb-1 tracking-widest uppercase">
              Frontend Engineer
            </p>
            <h3 className="text-white font-bold text-2xl tracking-tight">
              Awesome FE
            </h3>
            <p className="text-white/50 text-sm mt-1 font-mono">2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
