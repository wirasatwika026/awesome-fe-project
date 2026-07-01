"use client";

import { useEffect, useRef, useState } from "react";

const bars = [
  { label: "React & Next.js",  value: 92, color: "bg-sky-500"    },
  { label: "TypeScript",       value: 85, color: "bg-blue-500"   },
  { label: "CSS & Animations", value: 88, color: "bg-violet-500" },
  { label: "Three.js / WebGL", value: 62, color: "bg-emerald-500"},
  { label: "Canvas API",       value: 55, color: "bg-amber-500"  },
];

function Bar({ label, value, color }: (typeof bars)[number]) {
  const ref  = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(value);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
        <span className="text-xs tabular-nums text-zinc-400 dark:text-zinc-500">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-[width] duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function ProgressBar() {
  return (
    <div className="w-full space-y-5">
      {bars.map((b) => (
        <Bar key={b.label} {...b} />
      ))}
    </div>
  );
}
