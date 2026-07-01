"use client";

import { useState } from "react";

function Toggle({
  label,
  sub,
  defaultOn = false,
  variant = "pill",
}: {
  label: string;
  sub?: string;
  defaultOn?: boolean;
  variant?: "pill" | "ios" | "square";
}) {
  const [on, setOn] = useState(defaultOn);

  const trackCls =
    variant === "ios"
      ? `w-14 h-8 rounded-full ${on ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`
      : variant === "square"
      ? `w-12 h-6 rounded-lg ${on ? "bg-violet-500" : "bg-zinc-300 dark:bg-zinc-700"}`
      : `w-12 h-6 rounded-full ${on ? "bg-violet-500" : "bg-zinc-300 dark:bg-zinc-700"}`;

  const thumbCls =
    variant === "ios"
      ? `w-6 h-6 rounded-full bg-white shadow-md`
      : variant === "square"
      ? `w-4 h-4 rounded-md bg-white shadow`
      : `w-5 h-5 rounded-full bg-white shadow`;

  const thumbLeft = on
    ? variant === "ios"
      ? "calc(100% - 28px)"
      : variant === "square"
      ? "calc(100% - 20px)"
      : "calc(100% - 23px)"
    : "3px";

  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex items-center justify-between w-full py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 group"
    >
      <div className="text-left">
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</p>
        {sub && <p className="text-xs text-zinc-400 dark:text-zinc-600">{sub}</p>}
      </div>
      <div
        className={`relative shrink-0 transition-colors duration-250 ${trackCls}`}
        role="switch"
        aria-checked={on}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-250 ${thumbCls}`}
          style={{ left: thumbLeft }}
        />
      </div>
    </button>
  );
}

export default function ToggleSwitch() {
  return (
    <div className="w-full max-w-sm mx-auto py-4 px-2">
      <Toggle label="Dark mode"        sub="Switch to dark theme"       defaultOn variant="pill"   />
      <Toggle label="Notifications"    sub="Receive push alerts"        defaultOn variant="ios"    />
      <Toggle label="Analytics"        sub="Send anonymous usage data"            variant="square" />
      <Toggle label="Auto-save"        sub="Save every 30 seconds"      defaultOn variant="pill"   />
      <Toggle label="Beta features"    sub="Early access to new tools"            variant="ios"    />
    </div>
  );
}
