"use client";

import { useEffect, useRef, useState } from "react";

interface Piece {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  color: string;
  size: number;
  rot: number;
  rotSpeed: number;
  shape: "rect" | "circle";
}

const COLORS = ["#f59e0b", "#ef4444", "#8b5cf6", "#10b981", "#3b82f6", "#ec4899", "#f97316", "#06b6d4"];

function createPiece(cx: number, cy: number): Piece {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 9 + 2;
  return {
    x: cx, y: cy,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 5,
    life: 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 9 + 4,
    rot: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 12,
    shape: Math.random() > 0.4 ? "rect" : "circle",
  };
}

export default function Confetti() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const piecesRef  = useRef<Piece[]>([]);
  const rafRef     = useRef<number>(0);
  const runningRef = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function launch(fromX?: number, fromY?: number) {
    const canvas = canvasRef.current!;
    const cx = fromX ?? canvas.width  / 2;
    const cy = fromY ?? canvas.height / 2;

    for (let i = 0; i < 120; i++) {
      piecesRef.current.push(createPiece(cx, cy));
    }

    setCount((c) => c + 1);

    if (!runningRef.current) {
      runningRef.current = true;
      animate();
    }
  }

  function animate() {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    piecesRef.current = piecesRef.current.filter((p) => p.life > 0 && p.y < canvas.height + 60);

    for (const p of piecesRef.current) {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.22;
      p.vx *= 0.99;
      p.rot += p.rotSpeed;
      p.life -= 0.012;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle   = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);

      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size / 2, p.size / 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    if (piecesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      runningRef.current = false;
    }
  }

  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    launch(e.clientX - r.left, e.clientY - r.top);
  }

  return (
    <div className="relative w-full flex flex-col items-center gap-6 py-8">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 cursor-crosshair block"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={() => launch()}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          🎉 Launch Confetti
        </button>
        {count > 0 && (
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
            {count}× launched
          </span>
        )}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        canvas · click button or anywhere in the canvas · gravity physics
      </p>
    </div>
  );
}
