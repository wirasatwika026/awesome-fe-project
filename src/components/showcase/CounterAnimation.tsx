"use client";

import { useEffect, useRef, useState } from "react";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    startRef.current = null;

    function tick(now: number) {
      if (!startRef.current) startRef.current = now;
      const t = Math.min((now - startRef.current) / duration, 1);
      setValue(Math.round(easeOut(t) * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return value;
}

const stats = [
  { value: 2847, suffix: "+",  label: "Active users",  duration: 1800 },
  { value: 99,   suffix: "%",  label: "Uptime",        duration: 1200 },
  { value: 142,  suffix: "ms", label: "Avg response",  duration: 1600 },
  { value: 48,   suffix: "k+", label: "Downloads",     duration: 2000 },
];

function StatCard({ value, suffix, label, duration }: (typeof stats)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCounter(value, duration, active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
    >
      <p className="text-4xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50 tracking-tight">
        {count.toLocaleString()}
        <span className="text-violet-500">{suffix}</span>
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}

export default function CounterAnimation() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
