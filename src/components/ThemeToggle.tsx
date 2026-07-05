"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";

const CYCLE: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const ICON: Record<Theme, string> = {
  system: "◐",
  light: "☀",
  dark: "☾",
};

const LABEL: Record<Theme, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

function apply(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  // false on the server and during hydration, true after — keeps the first
  // client render identical to the server HTML without a setState-in-effect
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [storedTheme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  });
  const theme: Theme | null = mounted ? storedTheme : null;

  // Follow OS changes while in system mode
  useEffect(() => {
    if (storedTheme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [storedTheme]);

  function cycle() {
    if (!theme) return;
    const nextTheme = CYCLE[theme];
    setTheme(nextTheme);
    if (nextTheme === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", nextTheme);
    apply(nextTheme);
  }

  return (
    <button
      onClick={cycle}
      title={theme ? LABEL[theme] : "Theme"}
      aria-label={theme ? LABEL[theme] : "Theme"}
      className="fixed top-5 right-5 z-40 flex items-center gap-1.5 h-9 px-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <span aria-hidden>{theme ? ICON[theme] : "◐"}</span>
      {theme === "system" && (
        <span className="text-[10px] font-mono uppercase tracking-widest">
          auto
        </span>
      )}
    </button>
  );
}
