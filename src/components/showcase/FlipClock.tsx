"use client";

import { useEffect, useRef, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function FlipDigit({ value }: { value: string }) {
  const [animKey, setAnimKey] = useState(0);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value !== prevRef.current) {
      prevRef.current = value;
      setAnimKey((k) => k + 1);
    }
  }, [value]);

  return (
    <div className="relative w-14 h-20 flex items-center justify-center bg-zinc-800 dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden select-none">
      {/* fold crease */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-black/40 z-10" />
      {/* top half slightly darker */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-black/10" />

      <span
        key={animKey}
        className="text-5xl font-bold font-mono text-white tabular-nums leading-none"
        style={{ animation: animKey > 0 ? "flip-in 0.35s ease-out" : "none" }}
      >
        {value}
      </span>
    </div>
  );
}

function FlipPair({ value }: { value: string }) {
  return (
    <div className="flex gap-1.5">
      <FlipDigit value={value[0]} />
      <FlipDigit value={value[1]} />
    </div>
  );
}

function Colon() {
  return (
    <div className="flex flex-col gap-2 self-center mb-1">
      <div className="w-2 h-2 rounded-full bg-zinc-500 dark:bg-zinc-600" />
      <div className="w-2 h-2 rounded-full bg-zinc-500 dark:bg-zinc-600" />
    </div>
  );
}

export default function FlipClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 w-full">
      <div className="flex items-center gap-3">
        <FlipPair value={pad(time.getHours())}   />
        <Colon />
        <FlipPair value={pad(time.getMinutes())} />
        <Colon />
        <FlipPair value={pad(time.getSeconds())} />
      </div>

      <div className="flex gap-8 text-[10px] font-mono text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
        <span>Hours</span>
        <span>Minutes</span>
        <span>Seconds</span>
      </div>

      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
        live clock — digit flips every second
      </p>
    </div>
  );
}
