"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  trail: { x: number; y: number }[];
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const COLORS = [
      "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff",
      "#c77dff", "#ff9f1c", "#ff4ff8", "#00f5d4",
    ];

    function burst(x: number, y: number) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 80 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 5 + 2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
          size: Math.random() * 2.5 + 1,
          trail: [],
        });
      }
    }

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;
        p.vx *= 0.99;
        p.life -= 0.017;

        // trail
        for (let t = 0; t < p.trail.length - 1; t++) {
          ctx.beginPath();
          ctx.strokeStyle =
            p.color + Math.floor((t / p.trail.length) * p.life * 80).toString(16).padStart(2, "0");
          ctx.lineWidth = p.size * (t / p.trail.length);
          ctx.moveTo(p.trail[t].x, p.trail[t].y);
          ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      burst(e.clientX - rect.left, e.clientY - rect.top);
    }

    // auto launch a burst on mount for immediate wow-factor
    setTimeout(() => burst(canvas.width / 2, canvas.height / 2), 200);
    setTimeout(() => burst(canvas.width * 0.3, canvas.height * 0.4), 600);
    setTimeout(() => burst(canvas.width * 0.7, canvas.height * 0.35), 900);

    canvas.addEventListener("click", onClick);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-[420px] rounded-xl bg-zinc-950 cursor-crosshair block"
      />
      <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-mono text-white/20 pointer-events-none">
        click anywhere · canvas · gravity · particle trails
      </p>
    </div>
  );
}
