"use client";

import { useEffect, useRef, useState } from "react";

const DATASETS = [
  {
    label: "Monthly Revenue",
    unit: "k",
    data: [42, 68, 55, 78, 91, 64, 87, 73, 96, 52, 83, 70],
    keys: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    color: "#8b5cf6",
  },
  {
    label: "Weekly Active Users",
    unit: "",
    data: [30, 55, 40, 62, 74, 58, 80],
    keys: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    color: "#06b6d4",
  },
  {
    label: "Q1 Performance",
    unit: "%",
    data: [72, 85, 68, 91, 77, 88],
    keys: ["Design","Dev","QA","PM","DevOps","Sales"],
    color: "#f59e0b",
  },
];

export default function BarChart() {
  const [dsIdx, setDsIdx] = useState(0);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimated(false), 0);
    const t2 = setTimeout(() => setAnimated(true), 50);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [dsIdx]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const ds = DATASETS[dsIdx];
  const max = Math.max(...ds.data);

  return (
    <div ref={ref} className="w-full flex flex-col gap-5">
      {/* header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{ds.label}</p>
        <div className="flex gap-1.5">
          {DATASETS.map((d, i) => (
            <button
              key={i}
              onClick={() => setDsIdx(i)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                i === dsIdx
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {d.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* bars */}
      <div className="flex items-end gap-1.5 h-44 px-1">
        {ds.data.map((val, i) => (
          <div key={`${dsIdx}-${i}`} className="flex flex-col items-center gap-1 flex-1">
            {animated && (
              <span className="text-[9px] font-mono text-zinc-400 tabular-nums">
                {val}{ds.unit}
              </span>
            )}
            <div
              className="w-full rounded-t-md"
              style={{
                height: animated ? `${(val / max) * 140}px` : "0px",
                backgroundColor: ds.color,
                opacity: 0.7 + (i / ds.data.length) * 0.3,
                transition: `height 600ms cubic-bezier(0.16,1,0.3,1) ${i * 40}ms, opacity 0.3s ease`,
              }}
            />
            <span className="text-[9px] font-mono text-zinc-400 truncate w-full text-center">
              {ds.keys[i]}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        CSS height transition · staggered delay · IntersectionObserver trigger
      </p>
    </div>
  );
}
