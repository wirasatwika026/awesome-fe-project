"use client";

import { useRef, useState } from "react";

const ARTICLE = [
  "Frontend engineering sits at the intersection of design and computer science, where visual creativity meets algorithmic precision.",
  "Every pixel rendered in a browser is the result of a complex rendering pipeline — layout, paint, compositing — each step affecting perceived performance.",
  "CSS transforms and animations, when applied correctly, bypass the layout and paint phases entirely, operating exclusively on the compositor thread.",
  "The browser's event loop processes JavaScript, handles I/O, and schedules rendering tasks — understanding this prevents jank and dropped frames.",
  "Modern web APIs continue to expand browser capabilities: from WebGL and WebGPU to the Web Audio API and Pointer Events.",
  "Performance budgets help teams maintain fast, accessible experiences — setting limits on bundle size, time-to-interactive, and layout shift.",
  "The cascade in CSS is both a feature and a source of complexity — specificity, inheritance, and the order of declarations all play a role.",
  "Canvas 2D and WebGL unlock GPU-accelerated graphics, making immersive visualizations possible directly in any browser window.",
  "The best frontend engineers understand not just how to use the tools, but why the browser behaves the way it does under the hood.",
  "Accessibility is not an afterthought — semantic HTML, ARIA roles, focus management, and color contrast are fundamental engineering concerns.",
];

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  function onScroll() {
    const el = ref.current!;
    const pct = Math.min(100, Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100));
    setProgress(pct);
  }

  const R = 22;
  const C = 2 * Math.PI * R;
  const dash = (progress / 100) * C;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* indicator */}
      <div className="flex items-center gap-4 px-1">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r={R} fill="none" stroke="currentColor" strokeWidth="3.5" className="text-zinc-200 dark:text-zinc-800" />
          <circle
            cx="30" cy="30" r={R}
            fill="none" strokeWidth="3.5"
            stroke={progress === 100 ? "#10b981" : "#8b5cf6"}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            transform="rotate(-90 30 30)"
            style={{ transition: "stroke-dasharray 120ms linear, stroke 0.3s ease" }}
          />
          <text x="30" y="35" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor" className="text-zinc-700 dark:text-zinc-300">
            {progress}%
          </text>
        </svg>
        <div>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {progress === 100 ? "Article complete!" : "Reading Progress"}
          </p>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            {progress === 0 ? "Scroll the article below" : progress === 100 ? "✓ Finished" : `${progress}% read`}
          </p>
        </div>
      </div>

      {/* article */}
      <div
        ref={ref}
        onScroll={onScroll}
        className="h-56 overflow-y-scroll rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4"
      >
        <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-base leading-snug">
          The Art of Frontend Engineering
        </h3>
        {ARTICLE.map((para, i) => (
          <p key={i} className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        SVG stroke-dasharray · circular progress · smooth transition
      </p>
    </div>
  );
}
