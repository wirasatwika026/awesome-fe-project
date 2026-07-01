"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Frontend Engineer.",
  "Animation Nerd.",
  "CSS Enthusiast.",
  "UI Craftsman.",
];

export default function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const [blink, setBlink]         = useState(true);

  // typing logic
  useEffect(() => {
    const current = phrases[phraseIdx];
    let delay: number;

    if (!deleting && charIdx === current.length) {
      delay = 1800; // pause at full text
    } else if (deleting && charIdx === 0) {
      delay = 400;  // pause before next phrase
    } else {
      delay = deleting ? 45 : 90;
    }

    const id = setTimeout(() => {
      if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx === 0) {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      } else {
        setCharIdx((c) => c + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(id);
  }, [charIdx, deleting, phraseIdx]);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 w-full">
      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 tracking-[0.25em] uppercase">
        I am a
      </p>

      <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 min-h-[1.2em] flex items-center">
        {phrases[phraseIdx].slice(0, charIdx)}
        <span
          className="ml-0.5 inline-block w-[3px] h-[1em] bg-violet-500 align-middle rounded-sm"
          style={{ opacity: blink ? 1 : 0, transition: "opacity 80ms" }}
        />
      </h2>

      {/* phrase indicator dots */}
      <div className="flex gap-2 mt-2">
        {phrases.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-400 bg-violet-500"
            style={{
              width: i === phraseIdx ? "1.5rem" : "0.375rem",
              opacity: i === phraseIdx ? 1 : 0.25,
            }}
          />
        ))}
      </div>
    </div>
  );
}
