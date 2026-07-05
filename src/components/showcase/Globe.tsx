"use client";

import { useEffect, useRef } from "react";

const POINTS = 700;
const SIZE = 320;
const RADIUS = 120;
const TILT = 0.35;

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ rotY: 0, vel: 0.004, dragging: false, lastX: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    // Fibonacci sphere: evenly distributed points
    const golden = Math.PI * (1 + Math.sqrt(5));
    const points = Array.from({ length: POINTS }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / POINTS);
      const theta = golden * i;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    });

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    let raf = 0;

    function frame() {
      if (!ctx) return;
      const s = stateRef.current;
      if (!s.dragging) {
        s.rotY += s.vel;
        // ease inertia back to the idle speed
        s.vel += (0.004 - s.vel) * 0.02;
      }

      ctx.clearRect(0, 0, SIZE, SIZE);

      // atmosphere ring
      ctx.beginPath();
      ctx.arc(cx, cy, RADIUS + 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139,92,246,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const cosY = Math.cos(s.rotY);
      const sinY = Math.sin(s.rotY);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);

      for (const p of points) {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        const depth = (z2 + 1) / 2; // 0 = back, 1 = front

        ctx.beginPath();
        ctx.arc(cx + x1 * RADIUS, cy + y2 * RADIUS, 0.7 + depth * 1.5, 0, Math.PI * 2);
        ctx.fillStyle =
          depth > 0.5
            ? `rgba(139,92,246,${0.25 + (depth - 0.5) * 1.5})`
            : `rgba(139,92,246,${0.06 + depth * 0.3})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    stateRef.current.dragging = true;
    stateRef.current.lastX = e.clientX;
  }

  function onPointerMove(e: React.PointerEvent) {
    const s = stateRef.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.rotY += dx * 0.006;
    s.vel = dx * 0.0012; // carry momentum on release
  }

  function endDrag() {
    stateRef.current.dragging = false;
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 w-full">
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ width: SIZE, height: SIZE }}
        className="cursor-grab active:cursor-grabbing touch-none select-none"
      />
      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        fibonacci sphere · drag to spin · inertia
      </p>
    </div>
  );
}
