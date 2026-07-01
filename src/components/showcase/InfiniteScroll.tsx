"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AVATARS = ["🧑‍💻","👩‍🎨","🧑‍🔬","👨‍💼","👩‍🏫","🧑‍🎤","👨‍🍳","👩‍🚀"];
const TAGS = ["React","Next.js","TypeScript","CSS","Canvas","WebGL","Node","Rust","Go"];

function makeItems(start: number, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const id = start + i;
    return {
      id,
      name: `User #${id + 1}`,
      avatar: AVATARS[id % AVATARS.length],
      tag: TAGS[id % TAGS.length],
      time: `${(id % 23) + 1}h ago`,
    };
  });
}

const MAX = 36;
const PAGE = 8;

export default function InfiniteScroll() {
  const [items, setItems] = useState(() => makeItems(0, PAGE));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        if (prev.length >= MAX) { setHasMore(false); return prev; }
        const next = makeItems(prev.length, Math.min(PAGE, MAX - prev.length));
        if (prev.length + next.length >= MAX) setHasMore(false);
        return [...prev, ...next];
      });
      loadingRef.current = false;
      setLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !loadingRef.current) loadMore(); },
      { root: containerRef.current, threshold: 0.1 }
    );
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [loadMore]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
        <span>{items.length} / {MAX} items</span>
        {!hasMore && <span className="text-emerald-500">✓ all loaded</span>}
      </div>

      <div
        ref={containerRef}
        className="h-72 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800"
      >
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <span className="text-2xl shrink-0">{item.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.name}</p>
              <p className="text-[10px] text-zinc-400 font-mono">{item.time}</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
              {item.tag}
            </span>
          </div>
        ))}

        {/* sentinel */}
        <div ref={sentinelRef} className="flex items-center justify-center py-4">
          {loading && (
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          )}
          {!loading && !hasMore && (
            <p className="text-[10px] font-mono text-zinc-400">— end of list —</p>
          )}
        </div>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        IntersectionObserver · scroll sentinel · simulated async load · {PAGE} per page
      </p>
    </div>
  );
}
