"use client";

import { useRef, useState } from "react";

export default function ScrollParallax() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  function onScroll() {
    const el = outerRef.current;
    if (!el) return;
    const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setProgress(Math.max(0, Math.min(1, p)));
  }

  // o goes -0.5 → +0.5 as user scrolls top → bottom
  const o = progress - 0.5;

  return (
    <div
      ref={outerRef}
      onScroll={onScroll}
      className="no-scrollbar relative h-[480px] rounded-xl overflow-y-scroll"
    >
      {/* tall inner creates the scrollable range */}
      <div className="h-[960px]">
        {/* sticky frame — stays fixed while inner scrolls */}
        <div
          className="sticky top-0 h-[480px] overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0f0f14 0%, #15101e 100%)" }}
        >
          {/* ── Layer 1: background blobs (slowest) ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ transform: `translateY(${o * 50}px)` }}
          >
            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-violet-700/25 blur-[80px]" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-indigo-700/20 blur-[80px]" />
          </div>

          {/* ── Layer 2: mid shapes ── */}
          <div
            className="absolute top-8 left-10 w-32 h-32 rounded-3xl border border-violet-500/25 bg-violet-500/10"
            style={{ transform: `translateY(${o * -110}px)` }}
          />
          <div
            className="absolute bottom-10 right-14 w-28 h-28 rounded-3xl border border-sky-500/25 bg-sky-500/10"
            style={{ transform: `translateY(${o * 130}px)` }}
          />
          <div
            className="absolute top-1/2 right-10 w-20 h-20 rounded-2xl border border-emerald-500/25 bg-emerald-500/10"
            style={{ transform: `translateY(${o * -150}px)` }}
          />
          <div
            className="absolute bottom-1/3 left-16 w-16 h-16 rounded-2xl border border-amber-500/25 bg-amber-500/10"
            style={{ transform: `translateY(${o * 120}px)` }}
          />

          {/* ── Layer 3: fast foreground dots ── */}
          <div
            className="absolute top-14 right-1/3 w-5 h-5 rounded-full bg-amber-400/70"
            style={{ transform: `translateY(${o * 240}px)` }}
          />
          <div
            className="absolute bottom-14 left-1/3 w-4 h-4 rounded-full bg-violet-400/70"
            style={{ transform: `translateY(${o * -220}px)` }}
          />
          <div
            className="absolute top-1/3 left-8 w-3 h-3 rounded-full bg-sky-400/80"
            style={{ transform: `translateY(${o * 260}px)` }}
          />
          <div
            className="absolute bottom-1/3 right-8 w-4 h-4 rounded-full bg-emerald-400/70"
            style={{ transform: `translateY(${o * -200}px)` }}
          />
          <div
            className="absolute top-20 left-1/2 w-2 h-2 rounded-full bg-white/30"
            style={{ transform: `translateY(${o * 300}px)` }}
          />
          <div
            className="absolute bottom-20 right-1/2 w-2 h-2 rounded-full bg-white/30"
            style={{ transform: `translateY(${o * -300}px)` }}
          />

          {/* ── Center text (barely moves) ── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center pointer-events-none"
            style={{ transform: `translateY(${o * 20}px)` }}
          >
            <span className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase">
              scroll inside here
            </span>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Layers in motion.
            </h2>
            <p className="text-sm text-white/35 mt-1 max-w-xs leading-relaxed">
              Each element moves at a different speed,
              <br />creating a sense of depth as you scroll.
            </p>
          </div>

          {/* scroll hint — fades out after scrolling starts */}
          <div
            className="absolute bottom-5 left-0 right-0 flex justify-center transition-opacity duration-500 pointer-events-none"
            style={{ opacity: progress < 0.04 ? 1 : 0 }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-px h-7 rounded-full bg-gradient-to-b from-white/0 to-white/30 animate-bounce" />
              <span className="text-[9px] font-mono text-white/25 tracking-[0.3em]">SCROLL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
