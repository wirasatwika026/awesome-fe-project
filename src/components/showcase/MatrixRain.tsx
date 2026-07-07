"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const FONT_SIZE = 14;
    const CHARS =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

    let cols = Math.floor(canvas.width / FONT_SIZE);
    let drops = new Array(cols).fill(1);

    let rafId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];

        // bright head character
        ctx.fillStyle = drops[i] < 3 ? "#aaffaa" : "#00ff41";
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);

        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      resize();
      cols = Math.floor(canvas.width / FONT_SIZE);
      drops = new Array(cols).fill(1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-[420px] rounded-xl bg-black block"
      />
      <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-mono text-[#00ff41]/30 pointer-events-none">
        canvas · requestAnimationFrame · falling katakana
      </p>
    </div>
  );
}
