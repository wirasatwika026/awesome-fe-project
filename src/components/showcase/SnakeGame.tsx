"use client";

import { useEffect, useRef, useState } from "react";

const GRID = 20;
const CELL = 14;
const W = GRID * CELL;

type P = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";
const OPP: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };

function randFood(snake: P[]): P {
  let p: P;
  do { p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }; }
  while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }] as P[],
    dir: "right" as Dir,
    next: "right" as Dir,
    food: { x: 15, y: 10 } as P,
    running: false,
    score: 0,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");

  function render() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const s = stateRef.current;
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, W, W);

    // grid dots
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let x = 0; x < GRID; x++)
      for (let y = 0; y < GRID; y++)
        ctx.fillRect(x * CELL + CELL / 2 - 0.5, y * CELL + CELL / 2 - 0.5, 1, 1);

    // food
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(s.food.x * CELL + CELL / 2, s.food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // snake
    s.snake.forEach((seg, i) => {
      const alpha = Math.max(0.3, 1 - (i / s.snake.length) * 0.7);
      ctx.fillStyle = i === 0 ? `rgba(167,139,250,1)` : `rgba(139,92,246,${alpha})`;
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }

  function tick() {
    const s = stateRef.current;
    s.dir = s.next;
    const head = { ...s.snake[0] };
    if (s.dir === "right") head.x++;
    else if (s.dir === "left")  head.x--;
    else if (s.dir === "up")    head.y--;
    else head.y++;

    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
        s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
      clearInterval(intervalRef.current!);
      s.running = false;
      setStatus("over");
      return;
    }

    s.snake.unshift(head);
    if (head.x === s.food.x && head.y === s.food.y) {
      s.score++;
      setScore(s.score);
      s.food = randFood(s.snake);
    } else {
      s.snake.pop();
    }
    render();
  }

  function start() {
    clearInterval(intervalRef.current!);
    const s = stateRef.current;
    s.snake = [{ x: 10, y: 10 }];
    s.dir = "right"; s.next = "right";
    s.food = { x: 15, y: 10 };
    s.score = 0; s.running = true;
    setScore(0); setStatus("running");
    intervalRef.current = setInterval(tick, 130);
    render();
  }

  function move(dir: Dir) {
    const s = stateRef.current;
    if (s.running && s.dir !== OPP[dir]) s.next = dir;
  }

  useEffect(() => {
    render();
    function onKey(e: KeyboardEvent) {
      const map: Record<string, Dir> = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" };
      const d = map[e.key];
      if (d) { move(d); e.preventDefault(); }
    }
    window.addEventListener("keydown", onKey);
    return () => { clearInterval(intervalRef.current!); window.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-[280px]">
        <span className="text-sm font-mono text-zinc-400">
          Score: <span className="text-zinc-900 dark:text-zinc-50 font-bold">{score}</span>
        </span>
        {status === "over" && <span className="text-sm font-medium text-red-500">Game Over</span>}
        {status === "idle" && <span className="text-xs text-zinc-400">Press Start</span>}
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={W}
        className="rounded-xl border border-zinc-800 cursor-default"
      />

      {/* D-pad */}
      <div className="grid grid-cols-3 gap-1">
        {([
          [null, "up", null],
          ["left", null, "right"],
          [null, "down", null],
        ] as (Dir | null)[][]).map((row, ri) =>
          row.map((dir, ci) =>
            dir ? (
              <button
                key={`${ri}-${ci}`}
                onPointerDown={(e) => { e.preventDefault(); move(dir); }}
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:scale-90 text-white text-base flex items-center justify-center transition-all select-none"
              >
                {{ up: "↑", down: "↓", left: "←", right: "→" }[dir]}
              </button>
            ) : <div key={`${ri}-${ci}`} className="w-10 h-10" />
          )
        )}
      </div>

      <button
        onClick={start}
        className="px-6 py-2 rounded-full text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white transition-colors"
      >
        {status === "idle" ? "Start" : "Restart"}
      </button>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        canvas 2D · setInterval game loop · {GRID}×{GRID} grid · arrow keys
      </p>
    </div>
  );
}
