"use client";

import { useState } from "react";

const items = [
  {
    question: "What is CSS backdrop-filter?",
    answer:
      "backdrop-filter applies graphical effects like blur or brightness to the area behind an element. It's what makes the frosted glass look possible — the element itself can be semi-transparent while the background blurs through it.",
  },
  {
    question: "How does requestAnimationFrame work?",
    answer:
      "requestAnimationFrame schedules a callback before the browser's next repaint, syncing naturally with the display refresh rate (usually 60fps). It's the preferred way to run smooth animations since the browser can pause it when the tab is hidden.",
  },
  {
    question: "What is the grid-template-rows trick?",
    answer:
      "Animating grid-template-rows from 0fr to 1fr achieves a smooth height transition without knowing the element's exact height in advance — a clean modern alternative to the old max-height hack.",
  },
  {
    question: "Why use IntersectionObserver for animations?",
    answer:
      "IntersectionObserver efficiently detects when elements enter the viewport without attaching scroll event listeners, making scroll-triggered animations both performant and battery-friendly.",
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left gap-4 cursor-pointer"
      >
        <span className="font-medium text-zinc-900 dark:text-zinc-50 text-sm leading-relaxed">
          {question}
        </span>
        <span
          className="shrink-0 text-lg text-zinc-400 dark:text-zinc-500 transition-transform duration-300 leading-none"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>

      {/* grid-template-rows trick for smooth height animation */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pb-4">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion() {
  return (
    <div className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5">
      {items.map((item) => (
        <AccordionItem key={item.question} {...item} />
      ))}
    </div>
  );
}
