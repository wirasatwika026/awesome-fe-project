"use client";

import { useState, type ComponentType } from "react";
import {
  categoryColors,
  categoryDot,
  type ShowcaseMetaItem,
} from "@/data/showcase-meta";
import { previewLoaders } from "@/data/showcase-previews";

interface Props {
  item: ShowcaseMetaItem;
  onNavigate: () => void;
}

export default function ShowcaseCard({ item, onNavigate }: Props) {
  const [Preview, setPreview] = useState<ComponentType | null>(null);
  const [hovered, setHovered] = useState(false);

  function loadPreview() {
    setHovered(true);
    if (Preview) return;
    previewLoaders[item.slug]?.().then((mod) => setPreview(() => mod.default));
  }

  return (
    <div
      onMouseEnter={loadPreview}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-200"
    >
      {/* stretched link: whole card is clickable without wrapping preview content
          (which may render its own <a>/interactive elements) in a nested <a> */}
      <a
        href={`/showcase/${item.slug}`}
        onClick={onNavigate}
        aria-label={item.title}
        className="absolute inset-0 z-10 rounded-xl"
      />

      {/* preview panel: placeholder blob, live component while hovered */}
      <div
        aria-hidden
        className="relative h-36 mb-4 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(161,161,170,0.25) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        {hovered && Preview ? (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              style={{
                width: "200%",
                height: "200%",
                transform: "scale(0.5)",
                transformOrigin: "top left",
              }}
              className="flex items-center justify-center"
            >
              <Preview />
            </div>
          </div>
        ) : (
          <>
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-2xl opacity-40 ${categoryDot[item.category] ?? "bg-zinc-400"}`}
            />
            <span className="absolute bottom-2 right-3 text-[9px] font-mono text-zinc-300 dark:text-zinc-700 uppercase tracking-widest">
              hover to preview
            </span>
          </>
        )}
      </div>

      <div className="mb-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[item.category] ?? ""}`}
        >
          {item.category}
        </span>
      </div>
      <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
        {item.title}
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
