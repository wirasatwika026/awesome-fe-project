"use client";

import { useState } from "react";

export default function LiquidButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-14 w-full">
      {/* Hidden SVG goo filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo-effect">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Button + blobs wrapped in goo filter */}
      <div
        className="relative flex items-center justify-center"
        style={{ filter: "url(#goo-effect)", width: 280, height: 100 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button className="relative z-10 px-9 py-3.5 bg-violet-600 text-white font-semibold rounded-full text-sm cursor-pointer select-none">
          Hover me
        </button>

        {/* Blob 1 — top right */}
        <div
          className="absolute bg-violet-600 rounded-full transition-all duration-500 ease-in-out"
          style={{
            width:  hovered ? "80px"  : "6px",
            height: hovered ? "80px"  : "6px",
            top:    hovered ? "-10px" : "calc(50% - 3px)",
            left:   hovered ? "165px" : "calc(50% - 3px)",
          }}
        />
        {/* Blob 2 — bottom left */}
        <div
          className="absolute bg-violet-600 rounded-full transition-all duration-500 ease-in-out delay-75"
          style={{
            width:  hovered ? "64px" : "6px",
            height: hovered ? "64px" : "6px",
            top:    hovered ? "40px" : "calc(50% - 3px)",
            left:   hovered ? "12px" : "calc(50% - 3px)",
          }}
        />
        {/* Blob 3 — bottom right */}
        <div
          className="absolute bg-violet-600 rounded-full transition-all duration-500 ease-in-out delay-150"
          style={{
            width:  hovered ? "44px" : "6px",
            height: hovered ? "44px" : "6px",
            top:    hovered ? "55px" : "calc(50% - 3px)",
            left:   hovered ? "150px": "calc(50% - 3px)",
          }}
        />
      </div>

      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
        CSS goo filter — feGaussianBlur + feColorMatrix alpha threshold
      </p>
    </div>
  );
}
