"use client";

import { useEffect, useRef, useState } from "react";

function useTicker(target: number, duration = 900) {
  const [value, setValue] = useState(target);
  const prev = useRef(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === prev.current) return;
    const from = prev.current;
    const to = target;
    prev.current = target;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(from + (to - from) * ease));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

function Ticker({
  value,
  label,
  prefix = "",
  suffix = "",
  color,
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color: string;
}) {
  const display = useTicker(value);

  return (
    <div className="flex flex-col items-center gap-1">
      <p className={`text-5xl font-black tabular-nums tracking-tight ${color}`}>
        {prefix}{display.toLocaleString()}{suffix}
      </p>
      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">{label}</p>
    </div>
  );
}

const DATASETS = [
  { users: 12840,  revenue: 98400,  uptime: 99,  orders: 3217 },
  { users: 24190,  revenue: 187600, uptime: 100, orders: 7541 },
  { users: 56023,  revenue: 432100, uptime: 99,  orders: 18330 },
];

export default function NumberTicker() {
  const [idx, setIdx] = useState(0);
  const d = DATASETS[idx];

  return (
    <div className="flex flex-col items-center gap-10 py-10 w-full">
      <div className="grid grid-cols-2 gap-x-16 gap-y-8">
        <Ticker value={d.users}   label="Active users"    prefix="" suffix=""  color="text-violet-600 dark:text-violet-400" />
        <Ticker value={d.revenue} label="Revenue ($)"     prefix="$" suffix="" color="text-emerald-600 dark:text-emerald-400" />
        <Ticker value={d.uptime}  label="Uptime (%)"      prefix="" suffix="%" color="text-sky-600 dark:text-sky-400" />
        <Ticker value={d.orders}  label="Orders shipped"  prefix="" suffix=""  color="text-amber-600 dark:text-amber-500" />
      </div>

      <div className="flex gap-2">
        {DATASETS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
              i === idx
                ? "bg-violet-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            Period {i + 1}
          </button>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        rAF easing · ease-out-quart · toLocaleString
      </p>
    </div>
  );
}
