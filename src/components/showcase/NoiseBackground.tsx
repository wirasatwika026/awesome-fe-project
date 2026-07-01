export default function NoiseBackground() {
  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1a0533 0%, #0d1a3f 45%, #001a1a 100%)",
        }}
      />

      {/* noise layer — SVG feTurbulence with animated baseFrequency */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.45, mixBlendMode: "overlay" }}
      >
        <filter id="noise-filter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              values="0.65;0.72;0.65"
              dur="12s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      {/* warm color tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 via-transparent to-transparent pointer-events-none" />

      {/* content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center pointer-events-none">
        <span className="text-[11px] font-mono text-white/30 tracking-[0.3em] uppercase">
          SVG feTurbulence
        </span>
        <h2 className="text-6xl font-bold text-white tracking-tight">
          Noise.
        </h2>
        <p className="text-sm text-white/30 mt-1">
          Animated fractal noise texture
        </p>
      </div>
    </div>
  );
}
