"use client";

import { useEffect, useRef, useState } from "react";

const OPTIONS = [
  "React","Next.js","Vue","Nuxt","Svelte","SvelteKit",
  "Angular","Astro","Remix","Solid","Qwik","Ember",
  "TypeScript","JavaScript","Tailwind CSS","CSS Modules","Sass",
];

export default function Combobox() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [hi, setHi] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = OPTIONS.filter(
    (o) => o.toLowerCase().includes(query.toLowerCase()) && !selected.includes(o)
  );

  useEffect(() => { const t = setTimeout(() => setHi(0), 0); return () => clearTimeout(t); }, [query]);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  function pick(opt: string) {
    setSelected((s) => [...s, opt]);
    setQuery("");
    setOpen(true);
    inputRef.current?.focus();
  }

  function remove(opt: string) {
    setSelected((s) => s.filter((x) => x !== opt));
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { setHi((h) => Math.min(h + 1, filtered.length - 1)); e.preventDefault(); }
    if (e.key === "ArrowUp")   { setHi((h) => Math.max(h - 1, 0)); e.preventDefault(); }
    if (e.key === "Enter" && filtered[hi]) { pick(filtered[hi]); e.preventDefault(); }
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Backspace" && !query && selected.length) remove(selected[selected.length - 1]);
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
      <div ref={wrapRef} className="relative">
        {/* input box */}
        <div
          className={`flex flex-wrap gap-1.5 px-3 py-2 min-h-[46px] rounded-xl border bg-white dark:bg-zinc-900 cursor-text transition-shadow ${
            open
              ? "border-violet-500 ring-2 ring-violet-200 dark:ring-violet-900"
              : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
          }`}
          onClick={() => { inputRef.current?.focus(); setOpen(true); }}
        >
          {selected.map((s) => (
            <span key={s} className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-medium">
              {s}
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => { e.stopPropagation(); remove(s); }}
                className="opacity-60 hover:opacity-100 leading-none"
              >
                ×
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKey}
            className="flex-1 min-w-20 bg-transparent outline-none text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
            placeholder={selected.length === 0 ? "Search frameworks…" : ""}
          />
        </div>

        {/* dropdown */}
        {open && filtered.length > 0 && (
          <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl py-1.5 max-h-52 overflow-y-auto">
            {filtered.map((opt, i) => (
              <button
                key={opt}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(opt)}
                onMouseEnter={() => setHi(i)}
                className={`w-full text-left px-3.5 py-2 text-sm transition-colors ${
                  i === hi
                    ? "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {open && filtered.length === 0 && query && (
          <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl py-3 text-center text-sm text-zinc-400">
            No results for &quot;{query}&quot;
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <p className="text-xs font-mono text-zinc-400">{selected.length} selected · Backspace to remove last</p>
      )}

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        multi-select · keyboard navigation · ↑↓ Enter · Backspace remove
      </p>
    </div>
  );
}
