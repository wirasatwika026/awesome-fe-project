"use client";

import { useState } from "react";

const LEVELS = [
  { label: "Too weak", color: "bg-red-500",    textColor: "text-red-500",    bars: 1 },
  { label: "Weak",     color: "bg-orange-500", textColor: "text-orange-500", bars: 2 },
  { label: "Fair",     color: "bg-yellow-500", textColor: "text-yellow-500", bars: 3 },
  { label: "Strong",   color: "bg-emerald-500",textColor: "text-emerald-500",bars: 4 },
];

function getScore(pwd: string): number {
  if (!pwd) return -1;
  let s = 0;
  if (pwd.length >= 8)          s++;
  if (/[A-Z]/.test(pwd))        s++;
  if (/[0-9]/.test(pwd))        s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s - 1; // 0–3
}

const RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter",       test: (p: string) => /[A-Z]/.test(p) },
  { label: "Number",                 test: (p: string) => /[0-9]/.test(p) },
  { label: "Special character",      test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function PasswordStrength() {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const score = getScore(pwd);
  const level = score >= 0 ? LEVELS[score] : null;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-5 py-10">
      {/* input */}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Enter a password"
          className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 focus:border-violet-500 outline-none transition-colors text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-300 dark:placeholder-zinc-600"
        />
        <button
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-xs font-mono transition-colors"
        >
          {show ? "hide" : "show"}
        </button>
      </div>

      {/* strength bars */}
      <div className="flex gap-1.5">
        {LEVELS.map((l, i) => (
          <div
            key={l.label}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              level && i <= score ? l.color : "bg-zinc-200 dark:bg-zinc-800"
            }`}
          />
        ))}
      </div>

      {/* label */}
      {level && (
        <p className={`text-sm font-semibold -mt-2 transition-all ${level.textColor}`}>
          {level.label}
        </p>
      )}

      {/* rules checklist */}
      {pwd.length > 0 && (
        <div className="flex flex-col gap-2">
          {RULES.map((r) => {
            const ok = r.test(pwd);
            return (
              <div key={r.label} className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all duration-200 ${
                    ok ? "bg-emerald-500 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {ok ? "✓" : ""}
                </span>
                <span className={`text-xs transition-colors ${ok ? "text-zinc-600 dark:text-zinc-400" : "text-zinc-400 dark:text-zinc-600"}`}>
                  {r.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        regex rules · animated strength bars · live feedback
      </p>
    </div>
  );
}
