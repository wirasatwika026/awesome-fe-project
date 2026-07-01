"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

export default function InfiniteZoom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shape, setShape] = useState<"square" | "circle" | "hex">("square");
  const shapeRef = useRef(shape);

  useEffect(() => { shapeRef.current = shape; }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const SCALE = 1.8;
    const N = 10;
    let t = 0;
    let rafId: number;

    function drawShape(x: number, y: number, size: number, color: string, alpha: number) {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.5;

      const s = shapeRef.current;
      if (s === "square") {
        ctx.strokeRect(x - size, y - size, size * 2, size * 2);
      } else if (s === "circle") {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const px = x + size * Math.cos(angle);
          const py = y + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, W, H);

      const BASE = Math.min(W, H) * 0.44;
      const frac = t % 1;

      for (let i = N; i >= 0; i--) {
        const size  = BASE * Math.pow(1 / SCALE, i - frac);
        if (size < 3 || size > BASE * SCALE * 2) continue;

        const alpha = Math.min(1, Math.min(size / 30, (BASE * 1.2 - size) / 60));
        const colorIdx = ((i + Math.floor(t)) % COLORS.length + COLORS.length) % COLORS.length;
        drawShape(cx, cy, size, COLORS[colorIdx], alpha);
      }

      ctx.globalAlpha = 1;
      t += 0.008;
      rafId = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="w-full h-[380px] rounded-xl block"
      />

      {/* controls */}
      <div className="flex gap-2">
        {(["square", "circle", "hex"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              shape === s
                ? "bg-violet-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        canvas · modular scale · continuous zoom illusion
      </p>
    </div>
  );
}
