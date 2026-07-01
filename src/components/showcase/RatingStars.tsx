"use client";

import { useState } from "react";

const LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];
const EMOJIS = ["", "😕", "😐", "🙂", "😄", "🤩"];

export default function RatingStars() {
  const [rating, setRating] = useState(0);
  const [hover, setHover]   = useState(0);

  const active = hover || rating;

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 w-full">
      {/* Stars */}
      <div
        className="flex gap-2"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n === rating ? 0 : n)}
            onMouseEnter={() => setHover(n)}
            className="relative text-5xl leading-none cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-95"
          >
            {/* base star (grey) */}
            <span className="text-zinc-200 dark:text-zinc-700">★</span>
            {/* filled overlay */}
            <span
              className="absolute inset-0 text-amber-400 overflow-hidden transition-all duration-200"
              style={{
                opacity: n <= active ? 1 : 0,
                transform: n <= active ? "scale(1)" : "scale(0.5)",
              }}
            >
              ★
            </span>
          </button>
        ))}
      </div>

      {/* Feedback */}
      <div className="flex flex-col items-center gap-1 h-16 justify-center">
        {active > 0 ? (
          <>
            <span className="text-4xl transition-all duration-300">{EMOJIS[active]}</span>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">{LABELS[active]}</p>
            {rating > 0 && (
              <p className="text-xs text-zinc-400 dark:text-zinc-600">
                You rated {rating} / 5
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-zinc-400 dark:text-zinc-600">Hover to preview · click to rate</p>
        )}
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        hover preview · click to set · click again to clear
      </p>
    </div>
  );
}
