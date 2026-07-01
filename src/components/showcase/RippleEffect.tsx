"use client";

import { useRef } from "react";

function RippleBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = ref.current;
    if (!btn) return;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const size = Math.max(width, height) * 2;
    const x    = e.clientX - left - size / 2;
    const y    = e.clientY - top  - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.35);
      animation: ripple 600ms ease-out forwards;
      pointer-events: none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`relative overflow-hidden select-none cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export default function RippleEffect() {
  return (
    <div className="flex flex-col items-center gap-8 py-10 w-full">
      <div className="flex flex-wrap gap-4 justify-center">
        <RippleBtn className="px-7 py-3 rounded-full bg-violet-600 text-white font-semibold text-sm">
          Click me
        </RippleBtn>
        <RippleBtn className="px-7 py-3 rounded-full bg-sky-500 text-white font-semibold text-sm">
          Ripple
        </RippleBtn>
        <RippleBtn className="px-7 py-3 rounded-full bg-emerald-500 text-white font-semibold text-sm">
          Effect
        </RippleBtn>
        <RippleBtn className="px-7 py-3 rounded-full bg-amber-500 text-white font-semibold text-sm">
          Try me
        </RippleBtn>
      </div>

      <RippleBtn className="w-full max-w-sm py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold">
        Wide button — click anywhere
      </RippleBtn>

      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        click any button to see the ripple
      </p>
    </div>
  );
}
