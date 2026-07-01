"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { bg: "from-violet-600 to-indigo-700", label: "01", title: "Design Systems",  sub: "Consistent, scalable UI" },
  { bg: "from-sky-600   to-blue-700",    label: "02", title: "Motion Design",    sub: "Bring interfaces to life" },
  { bg: "from-emerald-600 to-teal-700",  label: "03", title: "Data Visualization", sub: "Make data beautiful" },
  { bg: "from-amber-500  to-orange-600", label: "04", title: "Micro-interactions", sub: "Delight in the details" },
  { bg: "from-pink-500   to-rose-600",   label: "05", title: "3D on the Web",    sub: "CSS & WebGL techniques" },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const n = SLIDES.length;
  const prev = () => setCurrent((c) => (c - 1 + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, current]);

  function onPointerDown(e: React.PointerEvent) {
    setDragging(true);
    setStartX(e.clientX);
    setAutoplay(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragging) return;
    setDragging(false);
    const dx = e.clientX - startX;
    if (dx < -40) next();
    else if (dx > 40) prev();
  }

  return (
    <div className="w-full flex flex-col gap-5 py-4">
      {/* slider */}
      <div
        className="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
        style={{ height: 220 }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${current * 100}%)`, width: `${n * 100}%` }}
        >
          {SLIDES.map((s) => (
            <div
              key={s.label}
              className={`h-full bg-gradient-to-br ${s.bg} flex flex-col items-start justify-end p-8 select-none`}
              style={{ width: `${100 / n}%` }}
            >
              <span className="text-white/30 text-xs font-mono mb-1">{s.label} / 0{n}</span>
              <h2 className="text-2xl font-black text-white">{s.title}</h2>
              <p className="text-white/60 text-sm mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); setAutoplay(false); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors text-sm"
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); setAutoplay(false); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors text-sm"
        >
          ›
        </button>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setAutoplay(false); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-violet-500" : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>

      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        drag to swipe · auto-play · dot nav · spring ease
      </p>
    </div>
  );
}
