const ITEMS = [
  { h: "h-48", bg: "from-violet-500 to-indigo-600",  label: "3D Transforms",  sub: "CSS perspective" },
  { h: "h-64", bg: "from-sky-500   to-blue-600",     label: "Animations",     sub: "rAF & CSS" },
  { h: "h-36", bg: "from-emerald-500 to-teal-600",   label: "Canvas",         sub: "WebGL & 2D" },
  { h: "h-56", bg: "from-amber-500  to-orange-600",  label: "Scroll FX",      sub: "IntersectionObserver" },
  { h: "h-32", bg: "from-pink-500   to-rose-600",    label: "Typography",     sub: "Variable fonts" },
  { h: "h-44", bg: "from-fuchsia-600 to-purple-700", label: "Micro UX",       sub: "Haptic-feel" },
  { h: "h-60", bg: "from-cyan-500   to-sky-600",     label: "SVG Filters",    sub: "feGaussianBlur" },
  { h: "h-40", bg: "from-lime-500   to-green-600",   label: "Layout",         sub: "Grid & Flex" },
  { h: "h-52", bg: "from-red-500    to-orange-500",  label: "Gestures",       sub: "Touch & mouse" },
];

export default function MasonryGrid() {
  return (
    <div className="w-full py-4">
      <div className="columns-2 sm:columns-3 gap-3 space-y-3">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className={`break-inside-avoid ${item.h} rounded-2xl bg-gradient-to-br ${item.bg} flex flex-col justify-end p-4 group hover:scale-[1.02] transition-transform duration-200 cursor-default`}
          >
            <p className="text-white/50 text-[10px] font-mono mb-0.5">{item.sub}</p>
            <p className="text-white font-semibold text-sm leading-tight">{item.label}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mt-4">
        CSS columns · break-inside-avoid · no JavaScript
      </p>
    </div>
  );
}
