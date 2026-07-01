const cards = [
  { title: "Performance",  value: "98",   unit: "/100", sub: "Lighthouse score"  },
  { title: "Downloads",    value: "48k",  unit: "+",    sub: "Total installs"    },
  { title: "Uptime",       value: "99.9", unit: "%",    sub: "Last 90 days"      },
];

function GlassCard({ title, value, unit, sub }: (typeof cards)[number]) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-4">
        {title}
      </p>
      <p className="text-white text-3xl font-bold leading-none">
        {value}
        <span className="text-white/40 text-lg font-normal ml-0.5">{unit}</span>
      </p>
      <p className="text-white/35 text-xs mt-2">{sub}</p>
    </div>
  );
}

export default function Glassmorphism() {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden p-8"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 55%, #f093fb 100%)",
      }}
    >
      {/* decorative blobs behind the glass */}
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-pink-300/20 blur-2xl pointer-events-none" />

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <GlassCard key={c.title} {...c} />
        ))}
      </div>
    </div>
  );
}
