"use client";

import { useEffect, useRef, useState } from "react";

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

type Mode = "plasma" | "terrain" | "flow";

export default function PerlinNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("plasma");
  const modeRef = useRef<Mode>(mode);

  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const W = 100, H = 75;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    let t = 0;
    let raf: number;

    function field(x: number, y: number, time: number, m: Mode) {
      if (m === "plasma") {
        return (
          Math.sin(x * 0.12 + time) * 0.25 +
          Math.sin(y * 0.12 + time * 0.7) * 0.25 +
          Math.sin((x + y) * 0.08 + time * 0.5) * 0.25 +
          Math.sin(Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2) * 0.12 - time) * 0.25
        );
      }
      if (m === "terrain") {
        return (
          Math.sin(x * 0.14 + time * 0.2) * 0.4 +
          Math.sin(y * 0.1 + time * 0.15) * 0.35 +
          Math.sin((x * 0.07 + y * 0.05) + time * 0.1) * 0.25
        );
      }
      return (
        Math.sin(x * 0.1 + time + y * 0.04) * 0.55 +
        Math.sin(y * 0.09 - time * 0.9 + x * 0.02) * 0.45
      );
    }

    function draw() {
      const img = ctx.createImageData(W, H);
      const m = modeRef.current;

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const v = (field(x, y, t, m) + 1) / 2;
          const idx = (y * W + x) * 4;
          let r = 0, g = 0, b = 0;

          if (m === "plasma") {
            r = Math.sin(v * Math.PI * 2 + 0) * 127 + 128;
            g = Math.sin(v * Math.PI * 2 + 2) * 127 + 128;
            b = Math.sin(v * Math.PI * 2 + 4) * 127 + 128;
          } else if (m === "terrain") {
            if (v < 0.38) { r = 30; g = 80 + v * 200; b = 180; }
            else if (v < 0.48) { r = 194; g = 178; b = 128; }
            else if (v < 0.7) { r = 34 + v * 80; g = 120 + v * 60; b = 34; }
            else { r = 200 + v * 55; g = 200 + v * 55; b = 210 + v * 45; }
          } else {
            [r, g, b] = hslToRgb(v, 0.85, 0.45 + v * 0.2);
          }

          img.data[idx] = r;
          img.data[idx + 1] = g;
          img.data[idx + 2] = b;
          img.data[idx + 3] = 255;
        }
      }

      ctx.putImageData(img, 0, 0);
      t += 0.018;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <canvas
        ref={canvasRef}
        className="w-full rounded-xl"
        style={{ imageRendering: "pixelated", height: 200 }}
      />

      <div className="flex gap-2">
        {(["plasma", "terrain", "flow"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              mode === m
                ? "bg-violet-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        sine-field noise · per-pixel canvas · {100 * 75} pixels · 3 palettes
      </p>
    </div>
  );
}
