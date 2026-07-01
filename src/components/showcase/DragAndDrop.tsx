"use client";

import { useState } from "react";

const INITIAL = [
  { id: "1", text: "Design the system",      dot: "bg-violet-500" },
  { id: "2", text: "Write the code",         dot: "bg-sky-500" },
  { id: "3", text: "Add micro-animations",   dot: "bg-emerald-500" },
  { id: "4", text: "Write tests",            dot: "bg-amber-500" },
  { id: "5", text: "Review & polish",        dot: "bg-pink-500" },
  { id: "6", text: "Deploy to production",   dot: "bg-red-500" },
];

export default function DragAndDrop() {
  const [items, setItems] = useState(INITIAL);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver]     = useState<string | null>(null);

  function onDragStart(id: string) { setDragging(id); }
  function onDragEnd()  { setDragging(null); setOver(null); }
  function onDragOver(e: React.DragEvent, id: string) { e.preventDefault(); setOver(id); }

  function onDrop(targetId: string) {
    if (!dragging || dragging === targetId) { setDragging(null); setOver(null); return; }
    const from = items.findIndex((i) => i.id === dragging);
    const to   = items.findIndex((i) => i.id === targetId);
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    setItems(next);
    setDragging(null);
    setOver(null);
  }

  return (
    <div className="w-full max-w-sm mx-auto py-6 flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => onDragStart(item.id)}
          onDragEnd={onDragEnd}
          onDragOver={(e) => onDragOver(e, item.id)}
          onDrop={() => onDrop(item.id)}
          className={`flex items-center gap-3 p-3.5 rounded-2xl border bg-white dark:bg-zinc-900 cursor-grab active:cursor-grabbing transition-all duration-200 select-none ${
            over === item.id && dragging !== item.id
              ? "border-violet-400 dark:border-violet-500 bg-violet-50 dark:bg-violet-950/30 scale-[1.02]"
              : "border-zinc-200 dark:border-zinc-800"
          } ${dragging === item.id ? "opacity-30 scale-95" : "opacity-100"}`}
        >
          <div className={`w-2 h-6 rounded-full shrink-0 ${item.dot}`} />
          <span className="flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {item.text}
          </span>
          <svg
            className="text-zinc-300 dark:text-zinc-700 shrink-0"
            width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
          >
            <circle cx="5" cy="4" r="1.5" />
            <circle cx="11" cy="4" r="1.5" />
            <circle cx="5" cy="8" r="1.5" />
            <circle cx="11" cy="8" r="1.5" />
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="11" cy="12" r="1.5" />
          </svg>
        </div>
      ))}
      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mt-2">
        HTML5 drag API · reorder list
      </p>
    </div>
  );
}
