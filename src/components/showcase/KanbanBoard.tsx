"use client";

import { useState } from "react";

type ColumnId = "todo" | "doing" | "done";

interface Card {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
}

const COLUMNS: { id: ColumnId; title: string; dot: string }[] = [
  { id: "todo", title: "To Do", dot: "bg-zinc-400" },
  { id: "doing", title: "In Progress", dot: "bg-amber-400" },
  { id: "done", title: "Done", dot: "bg-emerald-400" },
];

const INITIAL: Record<ColumnId, Card[]> = {
  todo: [
    { id: 1, title: "Design landing hero", tag: "design", tagColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
    { id: 2, title: "Write API docs", tag: "docs", tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" },
    { id: 3, title: "Fix mobile nav overflow", tag: "bug", tagColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  ],
  doing: [
    { id: 4, title: "Dark mode toggle", tag: "feature", tagColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
    { id: 5, title: "Refactor auth flow", tag: "chore", tagColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
  ],
  done: [
    { id: 6, title: "Set up CI pipeline", tag: "infra", tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  ],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(INITIAL);
  const [overColumn, setOverColumn] = useState<ColumnId | null>(null);

  function onDrop(target: ColumnId, e: React.DragEvent) {
    e.preventDefault();
    setOverColumn(null);
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!id) return;
    setColumns((prev) => {
      const from = (Object.keys(prev) as ColumnId[]).find((col) =>
        prev[col].some((c) => c.id === id),
      );
      if (!from || from === target) return prev;
      const card = prev[from].find((c) => c.id === id)!;
      return {
        ...prev,
        [from]: prev[from].filter((c) => c.id !== id),
        [target]: [...prev[target], card],
      };
    });
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => {
              e.preventDefault();
              setOverColumn(col.id);
            }}
            onDragLeave={() => setOverColumn(null)}
            onDrop={(e) => onDrop(col.id, e)}
            className={`rounded-2xl border p-3 min-h-52 transition-colors ${
              overColumn === col.id
                ? "border-zinc-400 dark:border-zinc-500 bg-zinc-100 dark:bg-zinc-800"
                : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
            }`}
          >
            <div className="flex items-center gap-2 px-1 mb-3">
              <span className={`w-2 h-2 rounded-full ${col.dot}`} />
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                {col.title}
              </span>
              <span className="ml-auto text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
                {columns[col.id].length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {columns[col.id].map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", String(card.id))
                  }
                  className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 cursor-grab active:cursor-grabbing active:opacity-60 shadow-sm"
                >
                  <p className="text-sm text-zinc-900 dark:text-zinc-50 mb-2">
                    {card.title}
                  </p>
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${card.tagColor}`}
                  >
                    {card.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        drag cards between columns · HTML5 Drag API
      </p>
    </div>
  );
}
