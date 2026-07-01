"use client";

import { useState } from "react";

const DAYS_ABBR = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function DatePicker() {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const firstDay  = new Date(view.y, view.m, 1).getDay();
  const daysCount = new Date(view.y, view.m + 1, 0).getDate();

  function prev() {
    setView((v) => v.m === 0 ? { y: v.y - 1, m: 11 } : { ...v, m: v.m - 1 });
  }
  function next() {
    setView((v) => v.m === 11 ? { y: v.y + 1, m: 0 } : { ...v, m: v.m + 1 });
  }

  function isToday(d: number) {
    return d === today.getDate() && view.m === today.getMonth() && view.y === today.getFullYear();
  }
  function isSel(d: number) {
    return !!selected && d === selected.getDate() && view.m === selected.getMonth() && view.y === selected.getFullYear();
  }

  const label = selected
    ? selected.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Pick a date";

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col gap-4">
      {/* trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
      >
        <span className={selected ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-400"}>
          {label}
        </span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400 shrink-0">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {open && (
        <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl p-4" style={{ animation: "float-up 0.2s ease-out" }}>
          {/* month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prev} className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 flex items-center justify-center transition-colors text-lg">
              ‹
            </button>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {MONTHS[view.m]} {view.y}
            </span>
            <button onClick={next} className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 flex items-center justify-center transition-colors text-lg">
              ›
            </button>
          </div>

          {/* weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_ABBR.map((d) => (
              <div key={d} className="text-center text-[10px] font-mono text-zinc-400 py-1">{d}</div>
            ))}
          </div>

          {/* day grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`p-${i}`} />)}
            {Array.from({ length: daysCount }, (_, i) => i + 1).map((d) => (
              <button
                key={d}
                onClick={() => { setSelected(new Date(view.y, view.m, d)); setOpen(false); }}
                className={`mx-auto w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors ${
                  isSel(d)
                    ? "bg-violet-600 text-white"
                    : isToday(d)
                    ? "ring-1 ring-violet-400 text-violet-600 dark:text-violet-400"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {selected && (
            <button
              onClick={() => setSelected(null)}
              className="mt-3 w-full text-center text-[10px] font-mono text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Clear selection
            </button>
          )}
        </div>
      )}

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        pure JS calendar · Date API · no library · month navigation
      </p>
    </div>
  );
}
