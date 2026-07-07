"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function hsvToHex(h: number, s: number, v: number): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    const val = v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    return Math.round(val * 255).toString(16).padStart(2, "0");
  };
  return `#${f(5)}${f(3)}${f(1)}`;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function ColorPicker() {
  const sqRef   = useRef<HTMLCanvasElement>(null);
  const hueRef  = useRef<HTMLCanvasElement>(null);

  const [hue, setHue]   = useState(270);
  const [sat, setSat]   = useState(0.8);
  const [val, setVal]   = useState(0.7);
  const [copied, setCopied] = useState(false);

  const hex = hsvToHex(hue, sat, val);
  const { r, g, b } = hexToRgb(hex);

  // Draw saturation/value square
  const drawSquare = useCallback(() => {
    const canvas = sqRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: W, height: H } = canvas;

    const gH = ctx.createLinearGradient(0, 0, W, 0);
    gH.addColorStop(0, "#fff");
    gH.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    ctx.fillStyle = gH;
    ctx.fillRect(0, 0, W, H);

    const gV = ctx.createLinearGradient(0, 0, 0, H);
    gV.addColorStop(0, "rgba(0,0,0,0)");
    gV.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gV;
    ctx.fillRect(0, 0, W, H);
  }, [hue]);

  // Draw hue strip
  useEffect(() => {
    const canvas = hueRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
    for (let i = 0; i <= 360; i += 30) g.addColorStop(i / 360, `hsl(${i},100%,50%)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => { drawSquare(); }, [drawSquare]);

  function pickSquare(e: React.MouseEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setSat(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
    setVal(Math.max(0, Math.min(1, 1 - (e.clientY - r.top) / r.height)));
  }

  function pickHue(e: React.MouseEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setHue(Math.round(Math.max(0, Math.min(360, ((e.clientX - r.left) / r.width) * 360))));
  }

  function copy() {
    navigator.clipboard.writeText(hex.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-col gap-4 py-6 w-full max-w-xs mx-auto">
      {/* SV square */}
      <div className="relative rounded-xl overflow-hidden" style={{ height: 160 }}>
        <canvas
          ref={sqRef}
          width={280}
          height={160}
          className="w-full h-full cursor-crosshair block"
          onClick={pickSquare}
        />
        {/* cursor dot */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%`, background: hex }}
        />
      </div>

      {/* Hue strip */}
      <div className="relative rounded-lg overflow-hidden" style={{ height: 20 }}>
        <canvas
          ref={hueRef}
          width={280}
          height={20}
          className="w-full h-full cursor-crosshair block"
          onClick={pickHue}
        />
        <div
          className="absolute top-0 bottom-0 w-3 rounded-sm border-2 border-white shadow pointer-events-none -translate-x-1/2"
          style={{ left: `${(hue / 360) * 100}%`, background: `hsl(${hue},100%,50%)` }}
        />
      </div>

      {/* Result row */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl shadow-md shrink-0 border border-black/10"
          style={{ background: hex }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xl font-mono font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {hex.toUpperCase()}
          </p>
          <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            rgb({r}, {g}, {b})
          </p>
        </div>
        <button
          onClick={copy}
          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
            copied
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          }`}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
