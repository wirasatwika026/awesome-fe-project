"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 48;
const ROWS = 28;
const CELL = 9;

function neighborCount(grid: Uint8Array, x: number, y: number) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = (x + dx + COLS) % COLS;
      const ny = (y + dy + ROWS) % ROWS;
      count += grid[ny * COLS + nx];
    }
  }
  return count;
}

function nextGeneration(grid: Uint8Array) {
  const next = new Uint8Array(COLS * ROWS);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const alive = grid[y * COLS + x] === 1;
      const n = neighborCount(grid, x, y);
      next[y * COLS + x] = alive ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
    }
  }
  return next;
}

export default function GameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<Uint8Array>(new Uint8Array(COLS * ROWS));
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grid = gridRef.current;
    ctx.fillStyle = "#7c3aed";
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (grid[y * COLS + x] === 1) {
          ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 1, CELL - 1);
        }
      }
    }
  }

  useEffect(() => {
    draw();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      gridRef.current = nextGeneration(gridRef.current);
      setGeneration((g) => g + 1);
      draw();
    }, 150);
    return () => clearInterval(id);
  }, [running]);

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL);
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return;

    const grid = gridRef.current;
    const idx = y * COLS + x;
    grid[idx] = grid[idx] === 1 ? 0 : 1;
    draw();
  }

  function randomize() {
    const grid = new Uint8Array(COLS * ROWS);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Math.random() < 0.25 ? 1 : 0;
    }
    gridRef.current = grid;
    setGeneration(0);
    draw();
  }

  function clear() {
    gridRef.current = new Uint8Array(COLS * ROWS);
    setRunning(false);
    setGeneration(0);
    draw();
  }

  function step() {
    gridRef.current = nextGeneration(gridRef.current);
    setGeneration((g) => g + 1);
    draw();
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        onClick={handleClick}
        className="w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer"
      />

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-4 py-2 rounded-full text-xs font-medium bg-violet-600 hover:bg-violet-700 text-white transition-colors"
        >
          {running ? "Pause" : "Play"}
        </button>
        <button
          onClick={step}
          disabled={running}
          className="px-4 py-2 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Step
        </button>
        <button
          onClick={randomize}
          className="px-4 py-2 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Randomize
        </button>
        <button
          onClick={clear}
          className="px-4 py-2 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Clear
        </button>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        Conway&apos;s Game of Life · click cells to toggle · generation {generation}
      </p>
    </div>
  );
}
