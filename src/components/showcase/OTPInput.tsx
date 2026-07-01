"use client";

import { useRef, useState } from "react";

const LENGTH = 6;

export default function OTPInput() {
  const [values, setValues] = useState<string[]>(Array(LENGTH).fill(""));
  const [verified, setVerified] = useState(false);
  const [shake, setShake]   = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const filled = values.every((v) => v !== "");
  const code = values.join("");

  function focus(i: number) {
    refs.current[i]?.focus();
  }

  function onChange(i: number, raw: string) {
    const char = raw.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[i] = char;
    setValues(next);
    setVerified(false);
    if (char && i < LENGTH - 1) focus(i + 1);
  }

  function onKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace") {
      if (values[i]) {
        const next = [...values];
        next[i] = "";
        setValues(next);
      } else if (i > 0) {
        focus(i - 1);
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      focus(i - 1);
    } else if (e.key === "ArrowRight" && i < LENGTH - 1) {
      focus(i + 1);
    }
  }

  function onPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    const next = [...Array(LENGTH).fill("")];
    text.split("").forEach((ch, i) => { next[i] = ch; });
    setValues(next);
    focus(Math.min(text.length, LENGTH - 1));
  }

  function verify() {
    if (code === "123456") {
      setVerified(true);
    } else {
      setShake(true);
      setValues(Array(LENGTH).fill(""));
      focus(0);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 w-full">
      <div className="text-center">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Enter verification code</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">Try <span className="font-mono font-bold text-violet-500">123456</span> to verify</p>
      </div>

      <div
        className="flex gap-3"
        style={{ animation: shake ? "shake 0.4s ease-in-out" : undefined }}
      >
        {values.map((v, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={v}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            className={`w-11 h-14 text-center text-xl font-bold font-mono rounded-2xl border-2 outline-none transition-all duration-150 bg-white dark:bg-zinc-900 ${
              verified
                ? "border-emerald-400 text-emerald-600 dark:text-emerald-400"
                : shake
                ? "border-red-400 text-red-500"
                : v
                ? "border-violet-500 text-violet-700 dark:text-violet-300"
                : "border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 focus:border-violet-400"
            }`}
          />
        ))}
      </div>

      {verified ? (
        <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
          <span className="text-lg">✓</span> Identity verified
        </div>
      ) : (
        <button
          onClick={verify}
          disabled={!filled}
          className="px-8 py-2.5 rounded-full bg-violet-600 text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors"
        >
          Verify
        </button>
      )}

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        auto-advance · backspace · paste support · keyboard nav
      </p>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
