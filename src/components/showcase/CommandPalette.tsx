"use client";

import { useEffect, useRef, useState } from "react";

const commands = [
  { id: "1", icon: "→", label: "Go to Home",           category: "Navigation", kbd: ["G", "H"] },
  { id: "2", icon: "◎", label: "Browse Showcase",       category: "Navigation", kbd: ["G", "S"] },
  { id: "3", icon: "◐", label: "Toggle Dark Mode",      category: "Settings",   kbd: ["⌘", "T"] },
  { id: "4", icon: "⊕", label: "New Component",         category: "Actions",    kbd: ["⌘", "N"] },
  { id: "5", icon: "↗", label: "View Source on GitHub", category: "Actions"                      },
  { id: "6", icon: "⊙", label: "Copy Link",             category: "Actions",    kbd: ["⌘", "C"] },
  { id: "7", icon: "⟳", label: "Reload Page",           category: "Actions",    kbd: ["⌘", "R"] },
];

export default function CommandPalette() {
  const [open, setOpen]         = useState(false);
  const [query, setQuery]       = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  const categories = [...new Set(filtered.map((c) => c.category))];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        setSelected(0);
      });
    } else {
      t = setTimeout(() => setQuery(""), 0);
    }
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (!open) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Escape")    setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered.length]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-12 gap-5">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-400 dark:text-zinc-500 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors w-60 cursor-pointer"
      >
        <span className="text-zinc-300 dark:text-zinc-600 text-sm">⌘</span>
        <span className="flex-1 text-left text-zinc-400 dark:text-zinc-500">Search commands...</span>
        <kbd className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
          K
        </kbd>
      </button>
      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
        click or press ⌘K / Ctrl+K
      </p>

      {/* Overlay + palette */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 px-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-400 dark:text-zinc-600 text-base leading-none">⌕</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none"
                />
                <kbd className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 shrink-0">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="py-2 max-h-72 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="text-sm text-zinc-400 dark:text-zinc-600 text-center py-8">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  categories.map((cat) => (
                    <div key={cat}>
                      <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-4 pt-3 pb-1">
                        {cat}
                      </p>
                      {filtered
                        .filter((c) => c.category === cat)
                        .map((cmd) => {
                          const idx = filtered.indexOf(cmd);
                          return (
                            <div
                              key={cmd.id}
                              onMouseEnter={() => setSelected(idx)}
                              onClick={() => setOpen(false)}
                              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                                idx === selected
                                  ? "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300"
                                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                              }`}
                            >
                              <span className="w-4 text-center text-xs text-zinc-400 dark:text-zinc-600 shrink-0">
                                {cmd.icon}
                              </span>
                              <span className="flex-1 text-sm">{cmd.label}</span>
                              {cmd.kbd && (
                                <div className="flex gap-1 shrink-0">
                                  {cmd.kbd.map((k) => (
                                    <kbd
                                      key={k}
                                      className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700"
                                    >
                                      {k}
                                    </kbd>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hints */}
              <div className="flex items-center gap-5 px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC close</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
