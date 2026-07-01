"use client";

import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

function Btn({
  label,
  loadingLabel,
  successLabel,
  variant,
}: {
  label: string;
  loadingLabel: string;
  successLabel: string;
  variant: "primary" | "ghost" | "danger";
}) {
  const [state, setState] = useState<State>("idle");

  function click() {
    if (state !== "idle") return;
    setState("loading");
    const success = variant !== "danger";
    setTimeout(() => setState(success ? "success" : "error"), 1600);
    setTimeout(() => setState("idle"), 3200);
  }

  const base =
    "relative flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 min-w-[160px]";

  const styles: Record<typeof variant, Record<State, string>> = {
    primary: {
      idle:    "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/20",
      loading: "bg-violet-400 text-white cursor-wait",
      success: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
      error:   "bg-red-500 text-white shadow-lg shadow-red-500/20",
    },
    ghost: {
      idle:    "border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-violet-400 hover:text-violet-600",
      loading: "border-2 border-zinc-200 dark:border-zinc-800 text-zinc-400 cursor-wait",
      success: "border-2 border-emerald-400 text-emerald-600 dark:text-emerald-400",
      error:   "border-2 border-red-400 text-red-600",
    },
    danger: {
      idle:    "bg-red-600 text-white hover:bg-red-700",
      loading: "bg-red-400 text-white cursor-wait",
      success: "bg-red-600 text-white",
      error:   "bg-zinc-500 text-white",
    },
  };

  return (
    <button onClick={click} className={`${base} ${styles[variant][state]}`}>
      {/* spinner */}
      {state === "loading" && (
        <span
          className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
          style={{ animation: "spin 0.7s linear infinite" }}
        />
      )}
      <span
        className="transition-all duration-300"
        style={{
          transform: state !== "idle" ? "none" : "none",
          opacity: 1,
        }}
      >
        {state === "idle"    ? label
         : state === "loading" ? loadingLabel
         : state === "success" ? successLabel
         : "✕ Failed"}
      </span>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}

export default function MorphingButton() {
  return (
    <div className="flex flex-col items-center gap-6 py-12 w-full">
      <Btn label="Deploy to production" loadingLabel="Deploying…" successLabel="✓ Deployed!" variant="primary" />
      <Btn label="Save changes"         loadingLabel="Saving…"    successLabel="✓ Saved!"    variant="ghost"   />
      <Btn label="Delete account"       loadingLabel="Deleting…"  successLabel="Deleted"     variant="danger"  />

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mt-2">
        idle → loading → success · CSS transitions · auto-reset
      </p>
    </div>
  );
}
