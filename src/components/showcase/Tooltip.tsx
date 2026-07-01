"use client";

import { useRef, useState } from "react";

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [dir, setDir]   = useState<"top" | "bottom">("top");

  function onEnter() {
    if (ref.current) {
      const { top } = ref.current.getBoundingClientRect();
      setDir(top < 120 ? "bottom" : "top");
    }
    setShow(true);
  }

  const isTop = dir === "top";

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={onEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      {/* tooltip bubble */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1.5 rounded-lg
          bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-xs font-medium
          pointer-events-none z-20 transition-all duration-150
          ${isTop ? "bottom-full mb-2.5" : "top-full mt-2.5"}
          ${show
            ? "opacity-100 translate-y-0"
            : isTop ? "opacity-0 translate-y-1" : "opacity-0 -translate-y-1"
          }`}
      >
        {label}
        {/* arrow */}
        <span
          className={`absolute left-1/2 -translate-x-1/2 w-0 h-0
            border-l-[5px] border-r-[5px] border-l-transparent border-r-transparent
            ${isTop
              ? "top-full border-t-[5px] border-t-zinc-900 dark:border-t-zinc-50"
              : "bottom-full border-b-[5px] border-b-zinc-900 dark:border-b-zinc-50"
            }`}
        />
      </div>
    </div>
  );
}

const examples = [
  { label: "Edit your profile",      text: "Profile"       },
  { label: "View notifications",     text: "Alerts"        },
  { label: "Toggle dark mode",       text: "Theme"         },
  { label: "Download source code",   text: "Source"        },
  { label: "Share this page",        text: "Share"         },
  { label: "Report an issue",        text: "Report"        },
];

export default function TooltipShowcase() {
  return (
    <div className="flex flex-col items-center gap-8 py-10 w-full">
      <div className="flex flex-wrap gap-3 justify-center">
        {examples.map(({ label, text }) => (
          <Tooltip key={text} label={label}>
            <button className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors cursor-pointer">
              {text}
            </button>
          </Tooltip>
        ))}
      </div>
      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">hover any button</p>
    </div>
  );
}
