"use client";

import { useEffect, useRef, useState } from "react";

interface PathProps {
  d: string;
  delay?: number;
  stroke?: string;
  strokeWidth?: number;
}

function AnimatedPath({ d, delay = 0, stroke = "#8b5cf6", strokeWidth = 1.5 }: PathProps) {
  const ref    = useRef<SVGPathElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    obs.observe(path);
    return () => obs.disconnect();
  }, []);

  return (
    <path
      ref={ref}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: active
          ? `stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`
          : "none",
        strokeDashoffset: active ? "0" : undefined,
      }}
    />
  );
}

// Geometric compass/target composition — viewBox 0 0 480 320, center (240,160)
const cx = 240;
const cy = 160;
const R  = [130, 80, 30, 8];

function circle(r: number) {
  return `M ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
}

const paths: PathProps[] = [
  { d: circle(R[0]),                                                          delay: 0,    stroke: "#8b5cf6", strokeWidth: 1.5 },
  { d: `M ${cx - R[0]} ${cy} L ${cx + R[0]} ${cy}`,                         delay: 400,  stroke: "#7c3aed", strokeWidth: 1   },
  { d: `M ${cx} ${cy - R[0]} L ${cx} ${cy + R[0]}`,                         delay: 500,  stroke: "#7c3aed", strokeWidth: 1   },
  { d: `M ${cx - 92} ${cy - 92} L ${cx + 92} ${cy + 92}`,                   delay: 600,  stroke: "#6d28d9", strokeWidth: 1   },
  { d: `M ${cx + 92} ${cy - 92} L ${cx - 92} ${cy + 92}`,                   delay: 700,  stroke: "#6d28d9", strokeWidth: 1   },
  { d: circle(R[1]),                                                          delay: 900,  stroke: "#a78bfa", strokeWidth: 1.5 },
  { d: circle(R[2]),                                                          delay: 1100, stroke: "#c4b5fd", strokeWidth: 2   },
  { d: circle(R[3]),                                                          delay: 1300, stroke: "#ede9fe", strokeWidth: 3   },
];

export default function SVGPathDraw() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-zinc-950 py-2">
      <svg viewBox="0 0 480 320" className="w-full">
        {paths.map((p, i) => (
          <AnimatedPath key={i} {...p} />
        ))}
      </svg>
    </div>
  );
}
