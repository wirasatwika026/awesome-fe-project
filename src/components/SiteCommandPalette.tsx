"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  showcaseList,
  CATEGORY_ORDER,
  categoryDot,
} from "@/data/showcase-meta";

export default function SiteCommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    const matches =
      q === ""
        ? showcaseList
        : showcaseList.filter(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.description.toLowerCase().includes(q) ||
              s.slug.includes(q),
          );
    // Keep results grouped in category order
    return [...matches].sort(
      (a, b) =>
        CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category),
    );
  }, [q]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        // reset on every toggle so the palette always opens fresh
        setQuery("");
        setActive(0);
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // focus after the modal renders
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function go(slug: string) {
    setOpen(false);
    router.push(`/showcase/${slug}`);
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].slug);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm -z-10" />

      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-zinc-400 dark:text-zinc-600 text-sm">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Search components…"
            className="flex-1 bg-transparent py-3.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none"
          />
          <kbd className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-400 dark:text-zinc-600">
              No results for “{query.trim()}”
            </p>
          ) : (
            results.map((item, i) => {
              const showHeading =
                i === 0 || results[i - 1].category !== item.category;
              return (
                <div key={item.slug}>
                  {showHeading && (
                    <p className="px-3 pt-3 pb-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                      {item.category}
                    </p>
                  )}
                  <button
                    data-active={i === active}
                    onClick={() => go(item.slug)}
                    onMouseMove={() => setActive(i)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      i === active
                        ? "bg-zinc-100 dark:bg-zinc-800"
                        : "bg-transparent"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[item.category] ?? "bg-zinc-400"}`}
                    />
                    <span className="text-sm text-zinc-900 dark:text-zinc-50 shrink-0">
                      {item.title}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-600 truncate">
                      {item.description}
                    </span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
