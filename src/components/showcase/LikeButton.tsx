"use client";

import { useState } from "react";

const PARTICLES = [
  { tx: -38, ty: -52, delay: 0   },
  { tx:  38, ty: -52, delay: 40  },
  { tx: -55, ty: -12, delay: 20  },
  { tx:  55, ty: -12, delay: 60  },
  { tx: -22, ty: -68, delay: 50  },
  { tx:  22, ty: -68, delay: 15  },
  { tx: -48, ty:  10, delay: 70  },
  { tx:  48, ty:  10, delay: 35  },
];

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(2_847);
  const [burst, setBurst] = useState(false);
  const [pressed, setPressed] = useState(false);

  function toggle() {
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    if (next) {
      setBurst(true);
      setPressed(true);
      setTimeout(() => setPressed(false), 120);
      setTimeout(() => setBurst(false), 700);
    }
  }

  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <div className="relative">
        {/* burst particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full pointer-events-none"
            style={{
              backgroundColor: i % 2 === 0 ? "#f43f5e" : "#fb923c",
              opacity: burst ? 0 : 1,
              transform: burst
                ? `translate(calc(-50% + ${p.tx}px), calc(-50% + ${p.ty}px)) scale(0)`
                : `translate(-50%, -50%) scale(1)`,
              transition: burst
                ? `transform 550ms cubic-bezier(0.16,1,0.3,1) ${p.delay}ms, opacity 450ms ease ${p.delay + 100}ms`
                : "none",
            }}
          />
        ))}

        {/* ring */}
        <span
          className="absolute inset-0 m-auto rounded-full border-2 pointer-events-none"
          style={{
            width: 48, height: 48,
            borderColor: "#f43f5e",
            transform: burst ? "scale(2.8)" : "scale(0.5)",
            opacity: burst ? 0 : (liked ? 0 : 0),
            transition: burst ? "transform 500ms ease-out, opacity 400ms ease 100ms" : "none",
          }}
        />

        {/* main button */}
        <button
          onClick={toggle}
          className="relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-medium text-sm transition-colors select-none"
          style={{
            transform: pressed ? "scale(0.88)" : "scale(1)",
            transition: "transform 100ms ease, background 200ms ease",
            backgroundColor: liked ? "rgb(255,241,242)" : "rgb(244,244,245)",
            color: liked ? "#f43f5e" : "#71717a",
          }}
        >
          {/* heart */}
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill={liked ? "#f43f5e" : "none"}
            stroke={liked ? "#f43f5e" : "currentColor"}
            strokeWidth="2"
            style={{ transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1)", transform: liked ? "scale(1.2)" : "scale(1)" }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="tabular-nums">{count.toLocaleString()}</span>
        </button>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        CSS particle burst · ring pulse · spring scale · click to toggle
      </p>
    </div>
  );
}
