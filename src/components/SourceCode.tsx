"use client";

import { useState } from "react";

interface Props {
  /** Shiki-highlighted HTML of the source */
  html: string;
  /** Raw source code, used for the copy button */
  code: string;
  fileName: string;
}

const COLLAPSED_HEIGHT = 360;

export default function SourceCode({ html, code, fileName }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const lineCount = code.split("\n").length;
  const collapsible = lineCount > 24;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    setTimeout(() => setCopyState("idle"), 2000);
  }

  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300 truncate">
              {fileName}
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-600 shrink-0">
              {lineCount} lines
            </span>
          </div>
          <button
            onClick={copy}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              copyState === "copied"
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                : copyState === "error"
                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {copyState === "copied" ? "✓ Copied!" : copyState === "error" ? "✕ Failed" : "⧉ Copy"}
          </button>
        </div>

        <div className="relative bg-white dark:bg-zinc-950">
          <div
            className="overflow-x-auto text-sm [&_pre]:p-4 [&_pre]:min-w-max"
            style={
              collapsible && !expanded
                ? { maxHeight: COLLAPSED_HEIGHT, overflowY: "hidden" }
                : undefined
            }
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {collapsible && !expanded && (
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none" />
          )}
        </div>

        {collapsible && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full py-2.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-colors"
          >
            {expanded ? "Collapse ↑" : "Show full source ↓"}
          </button>
        )}
      </div>
    </section>
  );
}
