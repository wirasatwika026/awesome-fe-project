"use client";

import { useState } from "react";

const SNIPPETS = [
  {
    label: "Install",
    lang: "bash",
    code: "npm install @awesome-fe/components",
  },
  {
    label: "Import",
    lang: "tsx",
    code: 'import { Button, Card } from "@awesome-fe/components";',
  },
  {
    label: "Usage",
    lang: "tsx",
    code: '<Button variant="primary" onClick={handleClick}>Launch →</Button>',
  },
  {
    label: "Theme",
    lang: "css",
    code: "--color-primary: oklch(65% 0.25 280);",
  },
];

function CopyBtn({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      onClick={copy}
      className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 ${
        state === "copied"
          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 scale-95"
          : state === "error"
          ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
      }`}
    >
      <span
        className="inline-block transition-transform duration-200"
        style={{ transform: state === "copied" ? "scale(1.2)" : "scale(1)" }}
      >
        {state === "copied" ? "✓" : state === "error" ? "✕" : "⧉"}
      </span>
      {state === "copied" ? "Copied!" : state === "error" ? "Failed" : "Copy"}
    </button>
  );
}

export default function CopyButton() {
  return (
    <div className="w-full flex flex-col gap-3 py-4">
      {SNIPPETS.map(({ label, lang, code }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-3"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-mono font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                {label}
              </span>
              <span className="text-[9px] font-mono text-violet-400 dark:text-violet-500">{lang}</span>
            </div>
            <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300 truncate">{code}</p>
          </div>
          <CopyBtn text={code} />
        </div>
      ))}

      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mt-1">
        Clipboard API · animated feedback · error state
      </p>
    </div>
  );
}
