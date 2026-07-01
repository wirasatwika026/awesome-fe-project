"use client";

import { useEffect, useRef } from "react";

const WAVES = [
  { amp: 38, freq: 0.018, speed: 1.2, color: "#8b5cf6", opacity: 0.7, yShift: 20 },
  { amp: 28, freq: 0.022, speed: 0.8, color: "#6366f1", opacity: 0.55, yShift: -10 },
  { amp: 45, freq: 0.013, speed: 1.5, color: "#a78bfa", opacity: 0.45, yShift: 40 },
  { amp: 20, freq: 0.03,  speed: 2.0, color: "#c4b5fd", opacity: 0.35, yShift: 0 },
];

export default function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    let rafId: number;

    function draw(ts: number) {
      const W = canvas.width;
      const H = canvas.height;
      const t = ts / 1000;

      ctx.clearRect(0, 0, W, H);

      // dark background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#0c0416");
      bg.addColorStop(1, "#0a0a1a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      for (const wave of WAVES) {
        ctx.beginPath();
        ctx.moveTo(0, H);

        for (let x = 0; x <= W; x++) {
          const y =
            H / 2 +
            wave.yShift +
            wave.amp * Math.sin(x * wave.freq + t * wave.speed) +
            (wave.amp / 2) * Math.sin(x * wave.freq * 2.3 + t * wave.speed * 0.7);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, wave.color + Math.round(wave.opacity * 255).toString(16).padStart(2, "0"));
        grad.addColorStop(1, wave.color + "10");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-[420px] rounded-xl block"
      />
      <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-mono text-white/20 pointer-events-none">
        canvas · overlapping sine waves · gradient fill
      </p>
    </div>
  );
}
