"use client";

import { useRef, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  function onScroll() {
    const el = ref.current!;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setProgress(Math.round(pct * 100));
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full"
          style={{ width: `${progress}%`, transition: "width 80ms linear" }}
        />
      </div>

      <div className="flex justify-between text-[11px] font-mono text-zinc-400">
        <span>scroll progress</span>
        <span>{progress}%</span>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="h-64 overflow-y-scroll rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full w-3/4" />
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
            <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-5/6" />
            <p className="text-xs text-zinc-400 dark:text-zinc-500 pt-1">
              Section {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        scrollTop / (scrollHeight − clientHeight) · linear fill
      </p>
    </div>
  );
}
