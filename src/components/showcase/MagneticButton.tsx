"use client";

import { useRef, useState } from "react";

interface MagBtnProps {
  children: React.ReactNode;
  variant?: "filled" | "outline" | "ghost";
  strength?: number;
}

function MagneticBtn({ children, variant = "filled", strength = 0.38 }: MagBtnProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isResting = offset.x === 0 && offset.y === 0;

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (left + width / 2)) * strength,
      y: (e.clientY - (top + height / 2)) * strength,
    });
  }

  function onMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const variantClass = {
    filled:
      "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900",
    outline:
      "border-2 border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50",
    ghost:
      "text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800",
  }[variant];

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: isResting
          ? "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)"
          : "transform 80ms ease-out",
      }}
      className={`px-8 py-4 rounded-full font-semibold text-sm tracking-wide select-none cursor-pointer ${variantClass}`}
    >
      {children}
    </button>
  );
}

export default function MagneticButton() {
  return (
    <div className="flex flex-col items-center gap-12 py-12 w-full">
      <div className="flex flex-wrap gap-10 items-center justify-center">
        <MagneticBtn variant="filled">Get Started</MagneticBtn>
        <MagneticBtn variant="outline" strength={0.45}>Learn More</MagneticBtn>
        <MagneticBtn variant="ghost" strength={0.5}>Explore</MagneticBtn>
      </div>
      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        move cursor slowly near each button
      </p>
    </div>
  );
}
