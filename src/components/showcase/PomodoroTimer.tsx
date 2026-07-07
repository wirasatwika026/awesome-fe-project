"use client";

import { useEffect, useState } from "react";

type Mode = "work" | "break";

const DURATIONS: Record<Mode, number> = {
  work: 25 * 60,
  break: 5 * 60,
};

const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("work");
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS.work);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        setMode((prevMode) => {
          const nextMode: Mode = prevMode === "work" ? "break" : "work";
          setSecondsLeft(DURATIONS[nextMode]);
          return nextMode;
        });
        return 0;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  function toggleRunning() {
    setRunning((r) => !r);
  }

  function reset() {
    setRunning(false);
    setSecondsLeft(DURATIONS[mode]);
  }

  function switchMode(next: Mode) {
    setRunning(false);
    setMode(next);
    setSecondsLeft(DURATIONS[next]);
  }

  const progress = secondsLeft / DURATIONS[mode];
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="w-full flex flex-col items-center gap-5 py-6">
      <div className="flex gap-2 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
        {(["work", "break"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              mode === m
                ? "bg-violet-600 text-white"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="relative w-48 h-48">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            className="stroke-zinc-100 dark:stroke-zinc-800"
          />
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="stroke-violet-500 transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-mono tabular-nums text-zinc-800 dark:text-zinc-100">
            {formatTime(secondsLeft)}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mt-1">
            {mode}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={toggleRunning}
          className="px-6 py-2 rounded-full text-xs font-medium bg-violet-600 hover:bg-violet-700 text-white transition-colors"
        >
          {running ? "Pause" : "Start"}
        </button>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        25/5 work-break cycle · SVG progress ring · auto-switches at zero
      </p>
    </div>
  );
}
