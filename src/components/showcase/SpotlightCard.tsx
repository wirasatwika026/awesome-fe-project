"use client";

import { useRef } from "react";

const cards = [
  {
    accent: "bg-violet-500",
    title: "Performance First",
    description:
      "Optimize for Core Web Vitals with lazy loading, code splitting, and efficient rendering strategies.",
  },
  {
    accent: "bg-sky-500",
    title: "Design Systems",
    description:
      "Build consistent UIs with shared design tokens, composable components, and clear interaction patterns.",
  },
  {
    accent: "bg-emerald-500",
    title: "Accessibility",
    description:
      "Create inclusive interfaces with proper semantics, ARIA roles, and full keyboard navigation support.",
  },
  {
    accent: "bg-amber-500",
    title: "Fluid Animation",
    description:
      "Add purposeful motion that guides attention and brings your interface to life without distraction.",
  },
];

type CardProps = (typeof cards)[number];

function Card({ accent, title, description }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top } = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - left}px`);
    el.style.setProperty("--y", `${e.clientY - top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 cursor-default"
    >
      {/* top border gradient line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* radial spotlight overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle 180px at var(--x, -200px) var(--y, -200px), rgba(139,92,246,0.12) 0%, transparent 100%)",
        }}
      />

      <div className="relative">
        <div className={`w-8 h-8 rounded-lg ${accent} mb-4 opacity-90`} />
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SpotlightCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {cards.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
}
