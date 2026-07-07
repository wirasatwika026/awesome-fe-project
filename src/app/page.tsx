"use client";

import { useEffect, useState } from "react";
import {
  showcaseList as showcases,
  CATEGORY_ORDER,
  categoryDot,
} from "@/data/showcase-meta";
import ShowcaseCard from "@/components/ShowcaseCard";

export default function Home() {
  const [filter, setFilter] = useState(() => {
    if (typeof window !== "undefined")
      return sessionStorage.getItem("home-filter") ?? "All";
    return "All";
  });
  const [query, setQuery] = useState("");

  // Restore scroll position when navigating back
  useEffect(() => {
    const saved = sessionStorage.getItem("home-scroll");
    if (saved) {
      // double rAF ensures layout is complete before scrolling
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(saved), behavior: "instant" });
          sessionStorage.removeItem("home-scroll");
        }),
      );
    }
  }, []);

  function saveState() {
    sessionStorage.setItem("home-scroll", String(window.scrollY));
    sessionStorage.setItem("home-filter", filter);
  }

  const q = query.trim().toLowerCase();
  const filtered = showcases.filter(
    (s) =>
      (filter === "All" || s.category === filter) &&
      (q === "" ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.slug.includes(q)),
  );

  const countFor = (cat: string) =>
    cat === "All"
      ? showcases.length
      : showcases.filter((s) => s.category === cat).length;

  return (
    <main className="min-h-screen px-6 py-16 font-sans max-w-5xl mx-auto">
      {/* header */}
      <header className="mb-10">
        <p className="text-sm font-mono text-zinc-400 dark:text-zinc-500 mb-3 tracking-widest uppercase">
          Frontend Showcase
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Awesome FE
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
          A collection of beautiful frontend components — 3D, animations, scroll
          effects, and micro-interactions.
        </p>
      </header>

      {/* search */}
      <div className="relative max-w-md mb-5">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 text-sm pointer-events-none">
          ⌕
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components…"
          className="w-full rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-9 pr-16 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
        />
        <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:block text-[10px] font-mono text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5 pointer-events-none">
          Ctrl K
        </kbd>
      </div>

      {/* filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* All */}
        <button
          onClick={() => setFilter("All")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            filter === "All"
              ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-sm"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          }`}
        >
          All
          <span
            className={`text-[10px] tabular-nums ${filter === "All" ? "opacity-60" : "opacity-50"}`}
          >
            {countFor("All")}
          </span>
        </button>

        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              filter === cat
                ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[cat]}`}
            />
            {cat}
            <span
              className={`text-[10px] tabular-nums ${filter === cat ? "opacity-60" : "opacity-50"}`}
            >
              {countFor(cat)}
            </span>
          </button>
        ))}
      </div>

      {/* count line */}
      <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mb-5">
        {filter === "All" && q === "" ? (
          <>
            showing{" "}
            <span className="text-zinc-900 dark:text-zinc-50 font-semibold">
              {showcases.length}
            </span>{" "}
            components
          </>
        ) : (
          <>
            <span className="text-zinc-900 dark:text-zinc-50 font-semibold">
              {filtered.length}
            </span>{" "}
            of {showcases.length}
            {filter !== "All" && <> · {filter}</>}
            {q !== "" && <> · “{query.trim()}”</>}
          </>
        )}
      </p>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <ShowcaseCard key={item.slug} item={item} onNavigate={saveState} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            No components match “{query.trim()}”
            {filter !== "All" && <> in {filter}</>}
          </p>
          <button
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}
