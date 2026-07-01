const items = [
  {
    id: "a",
    title: "Ship faster.",
    description: "Build and deploy beautiful interfaces in record time with modern tooling.",
    style: { gridColumn: "1 / 3", gridRow: "1 / 3" },
    className: "bg-gradient-to-br from-violet-600 to-indigo-700 text-white",
    dark: true,
    large: true,
  },
  {
    id: "b",
    title: "100 Lighthouse",
    description: "Optimized for performance by default.",
    style: { gridColumn: "3 / 4", gridRow: "1 / 2" },
    className: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
    dark: true,
    large: false,
  },
  {
    id: "c",
    title: "Dark Mode",
    description: "Looks great in any theme.",
    style: { gridColumn: "3 / 4", gridRow: "2 / 3" },
    className: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
    dark: false,
    large: false,
  },
  {
    id: "d",
    title: "Accessible",
    description: "WCAG compliant.",
    style: { gridColumn: "1 / 2", gridRow: "3 / 4" },
    className: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
    dark: false,
    large: false,
  },
  {
    id: "e",
    title: "Fluid Animation",
    description: "Motion that guides and delights without distraction.",
    style: { gridColumn: "2 / 4", gridRow: "3 / 4" },
    className: "bg-gradient-to-br from-amber-500 to-orange-500 text-white",
    dark: true,
    large: false,
  },
];

export default function BentoGrid() {
  return (
    <div
      className="grid w-full gap-3"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        height: "420px",
      }}
    >
      {items.map(({ id, title, description, style, className, dark, large }) => (
        <div
          key={id}
          className={`relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between ${className}`}
          style={style}
        >
          {/* decorative circle on dark cards */}
          {dark && (
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
          )}
          <div>
            <h3
              className={`font-bold leading-tight mb-1.5 ${
                large ? "text-2xl" : "text-base"
              } ${dark ? "text-white" : "text-zinc-900 dark:text-zinc-50"}`}
            >
              {title}
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                dark ? "text-white/65" : "text-zinc-500 dark:text-zinc-400"
              } ${large ? "max-w-[220px]" : ""}`}
            >
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
