"use client";

import { useEffect, useRef, useState } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CursorFollower() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef       = useRef<HTMLDivElement>(null);
  const ringRef      = useRef<HTMLDivElement>(null);
  const mouseRef     = useRef({ x: -200, y: -200 });
  const ringPosRef   = useRef({ x: -200, y: -200 });
  const rafRef       = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onMouseMove(e: MouseEvent) {
      const { left, top } = container!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - left, y: e.clientY - top };
      setVisible(true);
    }

    function onMouseLeave() {
      setVisible(false);
    }

    function animate() {
      const { x, y } = mouseRef.current;

      // ring lerps toward dot position (lags behind)
      ringPosRef.current.x = lerp(ringPosRef.current.x, x, 0.1);
      ringPosRef.current.y = lerp(ringPosRef.current.y, y, 0.1);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] rounded-xl overflow-hidden cursor-none select-none"
      style={{ background: "linear-gradient(135deg, #0f0f14 0%, #1a1025 100%)" }}
    >
      {/* dot — snaps instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-0 left-0 w-2 h-2 rounded-full bg-white z-20 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* ring — lerps behind the dot */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-0 left-0 w-10 h-10 rounded-full border border-violet-400/60 z-20 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* subtle gradient that follows cursor (via CSS var) */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle 300px at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.08), transparent 70%)",
        }}
      />

      {/* content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center pointer-events-none">
        <span className="text-[11px] font-mono text-white/25 tracking-[0.3em] uppercase">
          move cursor inside
        </span>
        <h2 className="text-4xl font-bold text-white tracking-tight">
          Follow the cursor.
        </h2>
        <p className="text-sm text-white/30 mt-1">
          Dot snaps instantly &nbsp;·&nbsp; Ring lerps behind
        </p>
      </div>

      {/* hint when cursor not inside */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: visible ? 0 : 1 }}
      >
        <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5">
          <span className="text-xs text-white/30 font-mono tracking-widest">HOVER HERE</span>
        </div>
      </div>
    </div>
  );
}
