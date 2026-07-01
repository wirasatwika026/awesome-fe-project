"use client";

import { useRef, useState } from "react";

export default function HolographicCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ x: (y - 0.5) * -22, y: (x - 0.5) * 22 });
    setGlare({ x: x * 100, y: y * 100 });
    setActive(true);
  }

  function onLeave() {
    setTilt({ x: 0, y: 0 });
    setActive(false);
  }

  return (
    <div className="flex flex-col items-center gap-8 py-10 w-full">
      <div style={{ perspective: "800px" }}>
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative rounded-3xl overflow-hidden cursor-pointer select-none"
          style={{
            width: 240,
            height: 340,
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            transition: active ? "transform 0.05s ease-out" : "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: active
              ? `0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)`
              : `0 10px 30px rgba(0,0,0,0.2)`,
          }}
        >
          {/* base */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950" />

          {/* holographic rainbow overlay */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-200"
            style={{
              opacity: active ? 0.55 : 0,
              background: `
                radial-gradient(circle at ${glare.x}% ${glare.y}%,
                  hsla(${glare.x * 3.6}, 100%, 80%, 0.8) 0%,
                  hsla(${glare.x * 3.6 + 60}, 100%, 70%, 0.6) 20%,
                  hsla(${glare.x * 3.6 + 120}, 100%, 70%, 0.4) 40%,
                  hsla(${glare.x * 3.6 + 180}, 100%, 70%, 0.2) 60%,
                  transparent 80%
                )
              `,
              mixBlendMode: "overlay",
            }}
          />

          {/* shimmer lines */}
          <div
            className="absolute inset-0"
            style={{
              opacity: active ? 0.15 : 0,
              background: `repeating-linear-gradient(
                ${glare.x * 1.8}deg,
                transparent,
                transparent 4px,
                rgba(255,255,255,0.08) 4px,
                rgba(255,255,255,0.08) 5px
              )`,
              transition: "opacity 0.2s ease",
            }}
          />

          {/* glare spot */}
          <div
            className="absolute inset-0"
            style={{
              opacity: active ? 0.3 : 0,
              background: `radial-gradient(circle 80px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.5), transparent)`,
              transition: active ? "none" : "opacity 0.4s ease",
            }}
          />

          {/* card content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-start justify-between">
              <div
                className="w-10 h-10 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #c4b5fd, #818cf8, #6366f1)",
                  boxShadow: "0 0 20px rgba(139,92,246,0.5)",
                }}
              />
              <span className="text-white/30 text-xs font-mono">HOLO</span>
            </div>

            <div>
              <p className="text-white/40 text-[10px] font-mono tracking-widest mb-1">AWESOME FE</p>
              <p className="text-white font-bold text-lg tracking-wider">**** **** **** 2025</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-white/50 text-xs font-mono">VALID THRU 12/27</p>
                <p className="text-white font-bold text-sm tracking-widest">WIRA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        CSS perspective tilt · radial-gradient overlay · shimmer lines
      </p>
    </div>
  );
}
