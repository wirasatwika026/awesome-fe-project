"use client";

import { useEffect, useRef, useState } from "react";

interface UploadItem {
  id: number;
  name: string;
  size: number;
  progress: number; // 0–100
  done: boolean;
}

let nextId = 1;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function iconFor(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) return "🖼️";
  if (["mp4", "mov", "webm"].includes(ext)) return "🎬";
  if (["mp3", "wav", "flac"].includes(ext)) return "🎵";
  if (["zip", "rar", "7z"].includes(ext)) return "🗜️";
  if (["pdf"].includes(ext)) return "📕";
  return "📄";
}

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // Simulated upload: advance progress on a timer
  useEffect(() => {
    if (!items.some((i) => !i.done)) return;
    const timer = setInterval(() => {
      setItems((prev) =>
        prev.map((i) => {
          if (i.done) return i;
          const progress = Math.min(100, i.progress + 4 + Math.random() * 10);
          return { ...i, progress, done: progress >= 100 };
        }),
      );
    }, 180);
    return () => clearInterval(timer);
  }, [items]);

  function addFiles(files: FileList | null) {
    if (!files) return;
    setItems((prev) => [
      ...prev,
      ...[...files].map((f) => ({
        id: nextId++,
        name: f.name,
        size: f.size,
        progress: 0,
        done: false,
      })),
    ]);
  }

  return (
    <div className="flex flex-col items-center gap-5 py-8 w-full">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`w-full max-w-md flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 cursor-pointer transition-colors ${
          dragOver
            ? "border-zinc-900 dark:border-zinc-50 bg-zinc-100 dark:bg-zinc-800"
            : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
        }`}
      >
        <span className="text-3xl">{dragOver ? "📂" : "📁"}</span>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {dragOver ? "Drop to upload" : "Drop files here or click to browse"}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          upload is simulated — nothing leaves the browser
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {items.length > 0 && (
        <ul className="w-full max-w-md flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3"
            >
              <span className="text-xl shrink-0">{iconFor(item.name)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="text-sm text-zinc-900 dark:text-zinc-50 truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 shrink-0">
                    {formatSize(item.size)}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    style={{ width: `${item.progress}%` }}
                    className={`h-full rounded-full transition-[width] duration-200 ${
                      item.done ? "bg-emerald-500" : "bg-zinc-900 dark:bg-zinc-50"
                    }`}
                  />
                </div>
              </div>
              <button
                onClick={() =>
                  setItems((prev) => prev.filter((i) => i.id !== item.id))
                }
                aria-label={item.done ? "Remove" : "Cancel"}
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs text-zinc-400 dark:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                {item.done ? "✓" : "✕"}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        File API · drag & drop · simulated progress
      </p>
    </div>
  );
}
