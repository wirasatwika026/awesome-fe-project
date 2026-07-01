"use client";

import { useEffect, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?";

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let progress = 0;
    const id = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor(progress)) return char;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join(""),
      );
      progress += 0.35;
      if (progress > text.length) {
        clearInterval(id);
        setDisplay(text);
      }
    }, 28);
    return () => clearInterval(id);
  }, [text]);

  return <>{display}</>;
}

const phrases = [
  { text: "Hello, World.", hint: "classic" },
  { text: "Frontend Magic.", hint: "creative" },
  { text: "CSS is art.", hint: "opinion" },
  { text: "Ship fast.", hint: "mantra" },
];

function ScrambleBlock({ text, hint }: { text: string; hint: string }) {
  const [key, setKey] = useState(0);

  return (
    <div
      onMouseEnter={() => setKey((k) => k + 1)}
      className="group px-6 py-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-default hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-200"
    >
      <p className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight min-h-[1.75rem]">
        {key === 0 ? text : <ScrambleText key={key} text={text} />}
      </p>
      <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 font-mono">
        #{hint} — hover to scramble
      </p>
    </div>
  );
}

export default function TextScramble() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {phrases.map(({ text, hint }) => (
        <ScrambleBlock key={text} text={text} hint={hint} />
      ))}
    </div>
  );
}
