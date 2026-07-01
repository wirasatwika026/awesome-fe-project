const NEONS = [
  {
    text: "NEON",
    color: "#ff2d78",
    shadows: [
      "0 0 7px #fff",
      "0 0 10px #fff",
      "0 0 21px #fff",
      "0 0 42px #ff2d78",
      "0 0 82px #ff2d78",
      "0 0 100px #ff2d78",
    ],
    flicker: true,
  },
  {
    text: "CYBER",
    color: "#00f5ff",
    shadows: [
      "0 0 7px #fff",
      "0 0 10px #00f5ff",
      "0 0 21px #00f5ff",
      "0 0 42px #00f5ff",
      "0 0 82px #00b0ff",
    ],
    flicker: false,
  },
  {
    text: "PULSE",
    color: "#b026ff",
    shadows: [
      "0 0 7px #fff",
      "0 0 10px #b026ff",
      "0 0 21px #b026ff",
      "0 0 42px #b026ff",
      "0 0 82px #7b00ff",
    ],
    flicker: false,
  },
];

export default function NeonGlow() {
  return (
    <div className="w-full rounded-xl bg-zinc-950 py-10 flex flex-col items-center gap-8">
      {NEONS.map(({ text, shadows, flicker }) => (
        <div key={text} className="flex items-center justify-center">
          <span
            className="text-7xl font-black tracking-widest select-none"
            style={{
              color: "#fff",
              textShadow: shadows.join(", "),
              animation: flicker ? "neon-flicker 3s ease-in-out infinite" : undefined,
            }}
          >
            {text}
          </span>
        </div>
      ))}

      {/* neon border box */}
      <div
        className="mt-2 px-6 py-2 text-xs font-mono tracking-widest rounded"
        style={{
          color: "#39ff14",
          border: "1px solid #39ff14",
          boxShadow: "0 0 8px #39ff14, inset 0 0 8px #39ff14, 0 0 20px #39ff14",
          animation: "neon-flicker 4s ease-in-out infinite 1s",
        }}
      >
        CSS text-shadow · box-shadow · flicker keyframe
      </div>
    </div>
  );
}
