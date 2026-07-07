"use client";

import { useEffect, useRef, useState } from "react";

export default function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [empty, setEmpty] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#18181b";

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const down = (e: PointerEvent) => {
      drawing.current = true;
      lastPos.current = pos(e);
    };

    const move = (e: PointerEvent) => {
      if (!drawing.current) return;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastPos.current = p;
      setEmpty(false);
    };

    const up = () => {
      drawing.current = false;
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", up);

    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", up);
    };
  }, []);

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setEmpty(true);
    setSaved(false);
  }

  function save() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <canvas
        ref={canvasRef}
        className="w-full h-48 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white cursor-crosshair block touch-none"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={clear}
          className="px-4 py-2 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={save}
          disabled={empty}
          className="px-4 py-2 rounded-full text-xs font-medium bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
        >
          {saved ? "✓ Saved" : "Save PNG"}
        </button>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        canvas 2D · Pointer Events · exported via toDataURL
      </p>
    </div>
  );
}
