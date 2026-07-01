"use client";

import { useRef, useState } from "react";

const DURATION = 1500;

export default function LongPress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "holding" | "done">("idle");
  const startRef = useRef(0);
  const rafRef = useRef(0);

  function begin() {
    if (status === "done") return;
    // eslint-disable-next-line react-hooks/purity
    startRef.current = performance.now();
    setStatus("holding");
    step();
  }

  function step() {
    // eslint-disable-next-line react-hooks/purity
    const pct = Math.min(1, (performance.now() - startRef.current) / DURATION);
    setProgress(pct);
    if (pct < 1) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      setStatus("done");
    }
  }

  function cancel() {
    if (status === "done") return;
    cancelAnimationFrame(rafRef.current);
    setStatus("idle");
    setProgress(0);
  }

  function reset() {
    setStatus("idle");
    setProgress(0);
  }

  const R = 38;
  const C = 2 * Math.PI * R;
  const dash = progress * C;

  return (
    <div className="flex flex-col items-center gap-10 py-6">
      {status === "done" ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Action confirmed!</p>
          <button
            onClick={reset}
            className="text-xs text-zinc-400 underline hover:text-zinc-600 transition-colors"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="relative flex items-center justify-center" style={{ width: 112, height: 112 }}>
          <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90 absolute">
            <circle cx="56" cy="56" r={R} fill="none" stroke="currentColor" strokeWidth="4" className="text-zinc-200 dark:text-zinc-800" />
            <circle
              cx="56" cy="56" r={R}
              fill="none"
              stroke={status === "holding" ? "#8b5cf6" : "#d1d5db"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${C}`}
              style={{ transition: status === "holding" ? "none" : "stroke-dasharray 0.3s ease" }}
            />
          </svg>

          <button
            onMouseDown={begin}
            onMouseUp={cancel}
            onMouseLeave={cancel}
            onTouchStart={(e) => { e.preventDefault(); begin(); }}
            onTouchEnd={cancel}
            className="w-20 h-20 rounded-full text-xs font-bold select-none transition-colors duration-200 z-10"
            style={{
              backgroundColor: status === "holding" ? "#8b5cf6" : "#18181b",
              color: "white",
              transform: status === "holding" ? "scale(0.96)" : "scale(1)",
              transition: "transform 100ms ease, background-color 200ms ease",
            }}
          >
            {status === "holding" ? `${Math.round(progress * 100)}%` : "Hold"}
          </button>
        </div>
      )}

      {status !== "done" && (
        <p className="text-xs text-zinc-400 font-mono">
          {status === "idle" ? "Hold the button for 1.5s to confirm" : "Keep holding…"}
        </p>
      )}

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        requestAnimationFrame · SVG stroke-dasharray · hold-to-confirm UX
      </p>
    </div>
  );
}
