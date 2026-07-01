"use client";

import { useRef, useState } from "react";

const NAV = ["Home", "Work", "About", "Contact"];

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function onScroll() {
    setScrolled(ref.current!.scrollTop > 50);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 h-72">
        {/* sticky header */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between px-6 transition-all duration-300 ${
            scrolled
              ? "py-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800"
              : "py-5 bg-transparent"
          }`}
        >
          <span
            className={`font-bold tracking-tight transition-all duration-300 text-zinc-900 dark:text-zinc-50 ${
              scrolled ? "text-sm" : "text-lg"
            }`}
          >
            Awesome FE
          </span>
          <nav className="flex gap-5">
            {NAV.map((n) => (
              <span
                key={n}
                className={`text-xs font-medium transition-colors duration-300 cursor-pointer ${
                  scrolled
                    ? "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {n}
              </span>
            ))}
          </nav>
        </div>

        {/* scrollable content */}
        <div
          ref={ref}
          onScroll={onScroll}
          className="absolute inset-0 overflow-y-scroll bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900"
        >
          <div className="h-20" />
          <div className="px-6 pb-8 space-y-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/70 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 p-4"
              >
                <div className="h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full w-1/3 mb-2" />
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        sticky + scrollTop threshold · backdrop-blur · CSS transition
      </p>
    </div>
  );
}
