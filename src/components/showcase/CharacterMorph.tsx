"use client";

import { useEffect, useState } from "react";

const WORDS = ["Design", "Build", "Ship", "Scale", "Delight", "Inspire"];
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

function useScramble(target: string, active: boolean) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let rafId: number;
    const totalFrames = 18;

    function tick() {
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * target.length);

      setDisplay(
        target
          .split("")
          .map((ch, i) => {
            if (i < revealed) return ch;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("")
      );

      if (frame < totalFrames) {
        frame++;
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, active]);

  return active ? display : target;
}

export default function CharacterMorph() {
  const [idx, setIdx] = useState(0);
  const [scrambling, setScrambling] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setScrambling(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % WORDS.length);
        setScrambling(false);
      }, 600);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const display = useScramble(WORDS[idx], scrambling);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 w-full">
      <p className="text-sm text-zinc-400 dark:text-zinc-600 font-mono">We help you</p>

      <h2 className="text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 font-mono min-w-[6ch] text-center tabular-nums">
        {display}
      </h2>

      {/* word dots */}
      <div className="flex gap-2 mt-2">
        {WORDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? "w-6 bg-violet-500" : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        character scramble · cycles every 2.2s · click dots to jump
      </p>
    </div>
  );
}
