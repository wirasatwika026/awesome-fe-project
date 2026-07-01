"use client";

import { useEffect, useRef } from "react";

const FACES = [
  { label: "FRONT",  transform: "translateZ(90px)",                  bg: "from-violet-600 to-indigo-700" },
  { label: "BACK",   transform: "translateZ(-90px) rotateY(180deg)", bg: "from-sky-600    to-blue-700"   },
  { label: "LEFT",   transform: "translateX(-90px) rotateY(-90deg)", bg: "from-emerald-600 to-teal-700"  },
  { label: "RIGHT",  transform: "translateX(90px)  rotateY(90deg)",  bg: "from-amber-500  to-orange-600" },
  { label: "TOP",    transform: "translateY(-90px) rotateX(90deg)",  bg: "from-pink-500   to-rose-600"   },
  { label: "BOTTOM", transform: "translateY(90px)  rotateX(-90deg)", bg: "from-fuchsia-600 to-purple-700"},
];

export default function ThreeDCube() {
  const cubeRef  = useRef<HTMLDivElement>(null);
  const rotRef   = useRef({ x: 20, y: 30 });
  const dragRef  = useRef({ active: false, sx: 0, sy: 0, rx: 20, ry: 30 });
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const cube = cubeRef.current!;

    function applyTransform() {
      cube.style.transform = `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
    }

    function autoRotate() {
      if (!dragRef.current.active) {
        rotRef.current.y += 0.35;
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(autoRotate);
    }

    function onDown(e: MouseEvent) {
      dragRef.current = {
        active: true,
        sx: e.clientX,
        sy: e.clientY,
        rx: rotRef.current.x,
        ry: rotRef.current.y,
      };
      e.preventDefault();
    }

    function onMove(e: MouseEvent) {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.sx;
      const dy = e.clientY - dragRef.current.sy;
      rotRef.current.x = dragRef.current.rx - dy * 0.6;
      rotRef.current.y = dragRef.current.ry + dx * 0.6;
      applyTransform();
    }

    function onUp() {
      dragRef.current.active = false;
    }

    const container = cube.parentElement!;
    container.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    rafRef.current = requestAnimationFrame(autoRotate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-8 w-full select-none">
      <div
        className="cursor-grab active:cursor-grabbing"
        style={{ perspective: "700px", width: 180, height: 180 }}
      >
        <div
          ref={cubeRef}
          style={{
            width: 180,
            height: 180,
            transformStyle: "preserve-3d",
            transform: "rotateX(20deg) rotateY(30deg)",
          }}
        >
          {FACES.map(({ label, transform, bg }) => (
            <div
              key={label}
              className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br ${bg} border border-white/20 shadow-xl`}
              style={{ transform }}
            >
              <span className="text-white font-black text-xs tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
        CSS preserve-3d · drag to rotate · auto-spin
      </p>
    </div>
  );
}
