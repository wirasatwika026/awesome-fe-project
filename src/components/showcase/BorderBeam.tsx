"use client";

interface BeamCardProps {
  title: string;
  body: string;
  color: string;
  tail: string;
  duration: string;
}

function BeamCard({ title, body, color, tail, duration }: BeamCardProps) {
  return (
    <div className="relative rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      {/* beam ring: conic gradient orbits via the registered --beam-angle property,
          masked to only show inside the 2px padding ring */}
      <div
        aria-hidden
        style={{
          background: `conic-gradient(from var(--beam-angle), transparent 0% 78%, ${tail} 92%, ${color} 98%, transparent 100%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 2,
          animation: `beam-spin ${duration} linear infinite`,
        }}
        className="absolute -inset-px rounded-2xl pointer-events-none"
      />
      <div className="p-6">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}

export default function BorderBeam() {
  return (
    <div className="flex flex-col items-center gap-10 py-10 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl">
        <BeamCard
          title="Violet"
          body="A single beam orbits the border on a conic gradient."
          color="#8b5cf6"
          tail="rgba(139,92,246,0.25)"
          duration="4s"
        />
        <BeamCard
          title="Cyan"
          body="Same trick, faster orbit and a longer fading tail."
          color="#06b6d4"
          tail="rgba(6,182,212,0.25)"
          duration="2.5s"
        />
        <BeamCard
          title="Amber"
          body="Mask compositing keeps the inside fully transparent."
          color="#f59e0b"
          tail="rgba(245,158,11,0.25)"
          duration="6s"
        />
      </div>
      <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
        @property --beam-angle · conic-gradient · mask-composite
      </p>
    </div>
  );
}
