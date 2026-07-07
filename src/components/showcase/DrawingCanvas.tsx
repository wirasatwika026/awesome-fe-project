"use client";

import { useEffect, useRef, useState } from "react";

const PALETTE = [
  "#8b5cf6", "#ef4444", "#f59e0b", "#10b981",
  "#3b82f6", "#ec4899", "#f97316", "#1a1a1a",
];

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // use refs so event handlers always see latest values without re-initialising the canvas
  const colorRef = useRef("#8b5cf6");
  const sizeRef = useRef(4);
  const toolRef = useRef<"pen" | "eraser">("pen");

  const [color, setColor] = useState("#8b5cf6");
  const [size, setSize] = useState(4);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");

  function setColorVal(c: string) { colorRef.current = c; setColor(c); toolRef.current = "pen"; setTool("pen"); }
  function setSizeVal(s: number)  { sizeRef.current = s; setSize(s); }
  function setToolVal(t: "pen" | "eraser") { toolRef.current = t; setTool(t); }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const pos = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const down = (e: MouseEvent) => {
      drawing.current = true;
      lastPos.current = pos(e);
    };

    const move = (e: MouseEvent) => {
      if (!drawing.current) return;
      const p = pos(e);
      ctx.beginPath();
      ctx.strokeStyle = toolRef.current === "eraser" ? "#fafafa" : colorRef.current;
      ctx.lineWidth = toolRef.current === "eraser" ? sizeRef.current * 5 : sizeRef.current;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastPos.current = p;
    };

    const up = () => { drawing.current = false; };

    canvas.addEventListener("mousedown", down);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", up);
    canvas.addEventListener("mouseleave", up);

    return () => {
      canvas.removeEventListener("mousedown", down);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseup", up);
      canvas.removeEventListener("mouseleave", up);
    };
  }, []);

  function clear() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* toolbar */}
      <div className="flex items-center gap-3 flex-wrap px-1">
        {PALETTE.map((c) => (
          <button
            key={c}
            onClick={() => setColorVal(c)}
            className="w-6 h-6 rounded-full transition-all duration-150 hover:scale-110"
            style={{
              background: c,
              outline: color === c && tool === "pen" ? `2px solid ${c}` : "2px solid transparent",
              outlineOffset: "2px",
            }}
          />
        ))}

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700 mx-1" />

        <button
          onClick={() => setToolVal(tool === "eraser" ? "pen" : "eraser")}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
            tool === "eraser"
              ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 border-transparent"
              : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
          }`}
        >
          eraser
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">size</span>
          <input
            type="range"
            min={1}
            max={24}
            value={size}
            onChange={(e) => setSizeVal(Number(e.target.value))}
            className="w-16 accent-violet-500"
          />
          <span className="text-[10px] font-mono text-zinc-400 w-4">{size}</span>
        </div>

        <button
          onClick={clear}
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
        >
          clear
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-72 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 cursor-crosshair block"
      />

      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        canvas 2D · freehand drawing · color palette · eraser
      </p>
    </div>
  );
}
