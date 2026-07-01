export default function GradientText() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10 w-full">
      {/* animated rainbow sweep */}
      <div className="text-center">
        <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mb-3 tracking-widest uppercase">
          Animated sweep
        </p>
        <h2
          className="text-6xl font-black tracking-tighter leading-none"
          style={{
            background:
              "linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6, #06b6d4, #10b981, #f59e0b)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-sweep 3s linear infinite",
          }}
        >
          Awesome FE
        </h2>
      </div>

      {/* diagonal static gradient */}
      <div className="text-center">
        <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mb-3 tracking-widest uppercase">
          Diagonal gradient
        </p>
        <h3
          className="text-4xl font-extrabold tracking-tight"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f64f59 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Beautiful Interfaces
        </h3>
      </div>

      {/* metallic / chrome gradient */}
      <div className="text-center">
        <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 mb-3 tracking-widest uppercase">
          Chrome metallic
        </p>
        <h3
          className="text-5xl font-black tracking-tighter"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #a8a8a8 40%, #ffffff 60%, #6e6e6e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          CHROME
        </h3>
      </div>
    </div>
  );
}
