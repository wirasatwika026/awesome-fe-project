"use client";

import { useRef, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  progress: number;
}

const CONFIG: Record<ToastType, { icon: string; bar: string; ring: string; title: string }> = {
  success: { icon: "✓", bar: "bg-emerald-500", ring: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400", title: "text-emerald-700 dark:text-emerald-400" },
  error:   { icon: "✕", bar: "bg-red-500",     ring: "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400",             title: "text-red-700 dark:text-red-400"     },
  info:    { icon: "i", bar: "bg-blue-500",    ring: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",          title: "text-blue-700 dark:text-blue-400"   },
  warning: { icon: "!", bar: "bg-amber-500",   ring: "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",      title: "text-amber-700 dark:text-amber-400" },
};

const MESSAGES: Record<ToastType, { title: string; message: string }> = {
  success: { title: "Saved!",     message: "Your changes have been saved." },
  error:   { title: "Error",      message: "Something went wrong. Try again." },
  info:    { title: "Update",     message: "A new version is available." },
  warning: { title: "Warning",    message: "Storage is almost full." },
};

const DURATION = 3000;

export default function ToastNotification() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  function add(type: ToastType) {
    const id = ++nextId.current;
    const { title, message } = MESSAGES[type];
    setToasts((t) => [...t, { id, type, title, message, progress: 100 }]);

    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const pct = Math.max(0, 100 - ((ts - startTime) / DURATION) * 100);
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, progress: pct } : x)));
      if (pct > 0) requestAnimationFrame(tick);
      else setToasts((t) => t.filter((x) => x.id !== id));
    };
    requestAnimationFrame(tick);
  }

  function dismiss(id: number) {
    setToasts((t) => t.filter((x) => x.id !== id));
  }

  return (
    <div className="relative w-full flex flex-col items-center gap-6 py-10" style={{ minHeight: 360 }}>
      {/* trigger buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {(["success", "error", "info", "warning"] as ToastType[]).map((type) => (
          <button
            key={type}
            onClick={() => add(type)}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors capitalize"
          >
            {type}
          </button>
        ))}
      </div>

      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">click to spawn · auto-dismiss · progress bar</p>

      {/* toast stack — bottom-right of container */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2" style={{ width: 280 }}>
        {toasts.map((toast) => {
          const c = CONFIG[toast.type];
          return (
            <div
              key={toast.id}
              className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden"
              style={{ animation: "float-up 0.25s ease-out" }}
            >
              <div className="flex items-start gap-3 p-3.5">
                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${c.ring}`}>
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${c.title}`}>{toast.title}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{toast.message}</p>
                </div>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="shrink-0 text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-400 text-lg leading-none"
                >
                  ×
                </button>
              </div>
              {/* progress bar */}
              <div className={`absolute bottom-0 left-0 h-0.5 ${c.bar} transition-none`}
                style={{ width: `${toast.progress}%` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
