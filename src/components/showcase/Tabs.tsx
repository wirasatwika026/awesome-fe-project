"use client";

import { useEffect, useRef, useState } from "react";

const TABS = [
  {
    id: "overview",
    label: "Overview",
    content: {
      heading: "Project Overview",
      body: "A curated showcase of modern frontend techniques — 3D transforms, canvas animations, scroll effects, and polished micro-interactions. Each component is built from scratch with no external UI libraries.",
    },
  },
  {
    id: "components",
    label: "Components",
    content: {
      heading: "39 Components",
      body: "From Matrix Rain to Holographic Cards — every component explores a different browser API or CSS capability. Canvas, SVG, CSS filters, Web Animations, IntersectionObserver, and more.",
    },
  },
  {
    id: "tech",
    label: "Tech Stack",
    content: {
      heading: "Stack",
      body: "Next.js 15 · TypeScript · Tailwind CSS v4 · Zero external UI libraries. All animations are pure CSS or vanilla JS with requestAnimationFrame. No Framer Motion, no GSAP.",
    },
  },
  {
    id: "about",
    label: "About",
    content: {
      heading: "Why Awesome FE?",
      body: "Frontend engineering is a craft. This project exists to prove that stunning interfaces need no special libraries — just deep knowledge of the platform.",
    },
  },
];

export default function Tabs() {
  const [active, setActive] = useState("overview");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [contentKey, setContentKey] = useState("overview");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  function switchTab(id: string) {
    setActive(id);
    setContentKey(id);
  }

  const current = TABS.find((t) => t.id === active)!;

  return (
    <div className="w-full flex flex-col gap-0 py-6">
      {/* tab bar */}
      <div className="relative flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[tab.id] = el; }}
            onClick={() => switchTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors duration-200 relative ${
              active === tab.id
                ? "text-violet-700 dark:text-violet-300"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* sliding indicator */}
        <div
          className="absolute bottom-0 h-0.5 bg-violet-500 rounded-t-full transition-all duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      </div>

      {/* content */}
      <div
        key={contentKey}
        className="p-6 rounded-b-2xl border-x border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        style={{ animation: "tab-slide 0.25s ease-out" }}
      >
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2">{current.content.heading}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{current.content.body}</p>
      </div>

      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mt-5">
        sliding indicator · offsetLeft / offsetWidth · content animation
      </p>
    </div>
  );
}
