"use client";

import { useEffect, useRef, useState } from "react";

const DATASETS = {
  Revenue: {
    values: [30, 45, 38, 60, 52, 78, 65, 82, 74, 91, 83, 100],
    color:  "#8b5cf6",
    fill:   "#8b5cf620",
  },
  Users: {
    values: [20, 35, 55, 40, 70, 60, 85, 72, 90, 78, 95, 88],
    color:  "#06b6d4",
    fill:   "#06b6d420",
  },
  Orders: {
    values: [50, 42, 60, 55, 45, 68, 58, 75, 62, 80, 70, 92],
    color:  "#10b981",
    fill:   "#10b98120",
  },
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const W = 500;
const H = 180;
const PAD = { t: 16, r: 16, b: 30, l: 36 };

function toPoints(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values.map((v, i) => ({
    x: PAD.l + (i / (values.length - 1)) * (W - PAD.l - PAD.r),
    y: PAD.t + (1 - (v - min) / range) * (H - PAD.t - PAD.b),
    v,
  }));
}

function smooth(pts: { x: number; y: number }[]) {
  return pts.map((p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (p.x - prev.x) / 3;
    const cp2x = p.x - (p.x - prev.x) / 3;
    return `C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
  }).join(" ");
}

export default function LineChart() {
  const [active, setActive] = useState<keyof typeof DATASETS>("Revenue");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const [pathLen, setPathLen] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const pts = toPoints(DATASETS[active].values);
  const linePath = smooth(pts);
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${H - PAD.b} L ${pts[0].x} ${H - PAD.b} Z`;

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimated(false);
      setTimeout(() => {
        if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
        setAnimated(true);
      }, 50);
    }, 0);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="w-full flex flex-col gap-4 py-6">
      {/* tabs */}
      <div className="flex gap-2">
        {(Object.keys(DATASETS) as (keyof typeof DATASETS)[]).map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              active === k
                ? "text-white shadow"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
            style={active === k ? { background: DATASETS[k].color } : {}}
          >
            {k}
          </button>
        ))}
      </div>

      {/* chart */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* grid lines */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              x1={PAD.l} x2={W - PAD.r}
              y1={PAD.t + f * (H - PAD.t - PAD.b)}
              y2={PAD.t + f * (H - PAD.t - PAD.b)}
              stroke="currentColor" strokeWidth={0.5}
              className="text-zinc-100 dark:text-zinc-800"
            />
          ))}

          {/* area */}
          <path d={areaPath} fill={DATASETS[active].fill} />

          {/* line */}
          <path
            ref={pathRef}
            d={linePath}
            fill="none"
            stroke={DATASETS[active].color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={pathLen}
            strokeDashoffset={animated ? 0 : pathLen}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)" }}
          />

          {/* dots + hover targets */}
          {pts.map((p, i) => (
            <g key={i} onMouseEnter={() => setHoverIdx(i)}>
              <rect x={p.x - 20} y={PAD.t} width={40} height={H - PAD.t - PAD.b} fill="transparent" />
              {hoverIdx === i && (
                <>
                  <line x1={p.x} x2={p.x} y1={PAD.t} y2={H - PAD.b}
                    stroke={DATASETS[active].color} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
                  <circle cx={p.x} cy={p.y} r={5} fill={DATASETS[active].color} />
                  <circle cx={p.x} cy={p.y} r={9} fill={DATASETS[active].color} opacity={0.2} />
                  <rect x={p.x - 22} y={p.y - 26} width={44} height={20} rx={6} fill={DATASETS[active].color} />
                  <text x={p.x} y={p.y - 11} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
                    {p.v}
                  </text>
                </>
              )}
            </g>
          ))}

          {/* x labels */}
          {pts.filter((_, i) => i % 3 === 0 || i === pts.length - 1).map((p) => {
            const i = pts.indexOf(p);
            return (
              <text key={i} x={p.x} y={H - 6} textAnchor="middle" fontSize={9}
                className="fill-zinc-400 dark:fill-zinc-600" fontFamily="monospace">
                {MONTHS[i]}
              </text>
            );
          })}
        </svg>
      </div>

      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        SVG cubic bezier · animated stroke-dashoffset · hover tooltip
      </p>
    </div>
  );
}
