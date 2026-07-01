const row1 = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Framer Motion", "Three.js", "WebGL", "GSAP",
];

const row2 = [
  "CSS Animations", "SVG", "Canvas API", "Web Components",
  "Vite", "Storybook", "Radix UI", "shadcn/ui",
];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  const animStyle = {
    animation: reverse
      ? "marquee-reverse 30s linear infinite"
      : "marquee 22s linear infinite",
  };

  return (
    <div className="marquee-mask overflow-hidden">
      <div className="flex gap-3 w-max" style={animStyle}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-600 dark:text-zinc-300 whitespace-nowrap select-none"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function InfiniteMarquee() {
  return (
    <div className="flex flex-col gap-4 py-8 w-full">
      <Row items={row1} />
      <Row items={row2} reverse />
      <Row items={[...row1].reverse()} />
    </div>
  );
}
