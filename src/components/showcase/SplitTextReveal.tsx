"use client";

import { useEffect, useState } from "react";

const LINES = [
  { text: "Great interfaces", size: "text-5xl font-black tracking-tighter" },
  { text: "don't just look beautiful —", size: "text-3xl font-semibold tracking-tight text-zinc-500 dark:text-zinc-400" },
  { text: "they feel alive.", size: "text-5xl font-black tracking-tighter" },
  { text: "Every pixel, every transition,", size: "text-sm font-mono text-zinc-400 dark:text-zinc-600 tracking-wide" },
  { text: "every interaction matters.", size: "text-sm font-mono text-zinc-400 dark:text-zinc-600 tracking-wide" },
];

function RevealLine({
  text,
  size,
  startDelay,
}: {
  text: string;
  size: string;
  startDelay: number;
}) {
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  return (
    <div className={`flex flex-wrap gap-x-[0.3em] gap-y-1 ${size}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transform: visible ? "translateY(0) rotate(0deg)" : "translateY(60%) rotate(3deg)",
            opacity: visible ? 1 : 0,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
            transitionDelay: `${i * 70}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export default function SplitTextReveal() {
  const [key, setKey] = useState(0);

  return (
    <div className="w-full flex flex-col gap-6 py-10 px-4">
      <div key={key} className="flex flex-col gap-4">
        {LINES.map((line, i) => (
          <RevealLine
            key={i}
            text={line.text}
            size={line.size}
            startDelay={i * 120 + 200}
          />
        ))}
      </div>

      <button
        onClick={() => setKey((k) => k + 1)}
        className="self-start mt-4 text-xs font-mono text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      >
        ↺ replay
      </button>
    </div>
  );
}
