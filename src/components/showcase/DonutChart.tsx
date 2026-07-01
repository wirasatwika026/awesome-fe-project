"use client";

import { useEffect, useState } from "react";

const DATA = [
  { label: "Design",      value: 35, color: "#8b5cf6" },
  { label: "Development", value: 40, color: "#3b82f6" },
  { label: "Testing",     value: 15, color: "#10b981" },
  { label: "Deploy",      value: 10, color: "#f59e0b" },
];

const R = 42;
const CX = 60;
const CY = 60;
const STROKE_W = 14;
const C = 2 * Math.PI * R;

const DATA_TOTAL = DATA.reduce((s, d) => s + d.value, 0);
const DATA_STARTS = (() => {
  let a = 0;
  return DATA.map((seg) => {
    const start = a;
    a += (seg.value / DATA_TOTAL) * 360;
    return start;
  });
})();

export default function DonutChart() {
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, [key]);

  return (
    <div className="flex flex-col items-center gap-8 py-8 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-10">
        {/* chart */}
        <div className="relative" style={{ width: 160, height: 160 }}>
          <svg width={120} height={120} viewBox="0 0 120 120" className="w-40 h-40 -rotate-90">
            {/* track */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor"
              className="text-zinc-100 dark:text-zinc-800" strokeWidth={STROKE_W} />

            {DATA.map((seg, i) => {
              const frac = seg.value / DATA_TOTAL;
              const arcLen = frac * C;
              const start = DATA_STARTS[i];

              const dashLen = animated ? arcLen : 0;
              const isHovered = hovered === i;

              return (
                <circle
                  key={seg.label}
                  cx={CX} cy={CY} r={R}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? STROKE_W + 3 : STROKE_W}
                  strokeDasharray={`${dashLen} ${C - dashLen}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  transform={`rotate(${start} ${CX} ${CY})`}
                  style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1), stroke-width 0.2s ease", transitionDelay: `${i * 150}ms` }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                />
              );
            })}
          </svg>

          {/* center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {hovered !== null ? (
              <>
                <p className="text-xl font-black text-zinc-900 dark:text-zinc-50">{DATA[hovered].value}%</p>
                <p className="text-[10px] font-mono text-zinc-400">{DATA[hovered].label}</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50">{DATA_TOTAL}%</p>
                <p className="text-[10px] font-mono text-zinc-400">Total</p>
              </>
            )}
          </div>
        </div>

        {/* legend */}
        <div className="flex flex-col gap-3">
          {DATA.map((seg, i) => (
            <div
              key={seg.label}
              className={`flex items-center gap-3 cursor-pointer transition-opacity duration-200 ${hovered !== null && hovered !== i ? "opacity-40" : "opacity-100"}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-3 h-3 rounded-full shrink-0" style={{ background: seg.color }} />
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 w-24">{seg.label}</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">{seg.value}%</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => { setAnimated(false); setTimeout(() => { setKey(k => k + 1); }, 50); }}
        className="text-xs font-mono text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
      >
        ↺ replay
      </button>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        SVG stroke-dasharray · animated segments · hover highlight
      </p>
    </div>
  );
}
