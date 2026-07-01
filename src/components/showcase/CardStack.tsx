"use client";

import { useRef, useState } from "react";

const CARDS = [
  {
    id: 1,
    title: "Next.js 15",
    sub: "The React framework",
    bg: "from-zinc-900 to-zinc-800",
    accent: "#a78bfa",
    emoji: "⚡",
  },
  {
    id: 2,
    title: "TypeScript",
    sub: "Typed at any scale",
    bg: "from-blue-900 to-blue-800",
    accent: "#60a5fa",
    emoji: "🔷",
  },
  {
    id: 3,
    title: "Tailwind CSS",
    sub: "Utility-first CSS",
    bg: "from-sky-800 to-sky-900",
    accent: "#38bdf8",
    emoji: "🌊",
  },
  {
    id: 4,
    title: "Framer Motion",
    sub: "Animation for the web",
    bg: "from-fuchsia-900 to-purple-900",
    accent: "#e879f9",
    emoji: "✨",
  },
  {
    id: 5,
    title: "Vercel",
    sub: "Deploy with zero config",
    bg: "from-zinc-950 to-zinc-900",
    accent: "#f4f4f5",
    emoji: "▲",
  },
];

export default function CardStack() {
  const [stack, setStack] = useState(CARDS);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  const visible = stack.slice(0, 5);

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    start.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    setOffset({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  }

  function onPointerUp() {
    dragging.current = false;
    if (Math.abs(offset.x) > 90) {
      setStack((s) => [...s.slice(1), s[0]]);
    }
    setOffset({ x: 0, y: 0 });
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-8 w-full">
      <div className="relative" style={{ width: 300, height: 190 }}>
        {visible.map((card, stackPos) => {
          const isTop = stackPos === 0;
          const depth = stackPos;

          return (
            <div
              key={card.id}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.bg} flex flex-col justify-between p-6 border border-white/5 shadow-2xl ${
                isTop ? "cursor-grab active:cursor-grabbing" : ""
              }`}
              style={{
                transform: isTop
                  ? `translate(${offset.x}px, ${offset.y * 0.3}px) rotate(${offset.x * 0.06}deg)`
                  : `translateY(${depth * 10}px) scale(${1 - depth * 0.05})`,
                transition: isTop && (offset.x !== 0 || offset.y !== 0) ? "none" : "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                zIndex: 10 - stackPos,
                opacity: 1 - depth * 0.15,
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{card.emoji}</span>
                <span
                  className="text-xs font-mono px-2 py-1 rounded-full"
                  style={{ background: card.accent + "22", color: card.accent }}
                >
                  {stackPos === 0 ? "swipe →" : `+${stackPos}`}
                </span>
              </div>
              <div>
                <p className="text-white/40 text-xs font-mono mb-1">{card.sub}</p>
                <h3 className="text-white font-bold text-xl">{card.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        drag left or right · pointer events · spring animation
      </p>
    </div>
  );
}
