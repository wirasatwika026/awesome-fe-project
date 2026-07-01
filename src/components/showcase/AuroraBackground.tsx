export default function AuroraBackground() {
  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-zinc-950">
      {/* aurora blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[420px] h-[420px] rounded-full bg-violet-600/35"
          style={{ filter: "blur(80px)", top: "5%", left: "5%", animation: "aurora-1 9s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[360px] h-[360px] rounded-full bg-sky-500/30"
          style={{ filter: "blur(80px)", top: "15%", right: "5%", animation: "aurora-2 12s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[320px] h-[320px] rounded-full bg-emerald-500/25"
          style={{ filter: "blur(80px)", bottom: "5%", left: "25%", animation: "aurora-3 10s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[280px] h-[280px] rounded-full bg-fuchsia-500/30"
          style={{ filter: "blur(80px)", bottom: "20%", right: "15%", animation: "aurora-4 8s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[200px] h-[200px] rounded-full bg-amber-400/20"
          style={{ filter: "blur(60px)", top: "40%", left: "45%", animation: "aurora-1 14s ease-in-out infinite reverse" }}
        />
      </div>

      {/* subtle noise overlay */}
      <div className="absolute inset-0 bg-zinc-950/20" />

      {/* content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="text-[10px] font-mono text-white/30 tracking-[0.4em] uppercase">animated</span>
        <h2 className="text-7xl font-black text-white tracking-tighter">Aurora</h2>
        <p className="text-sm text-white/30">CSS blur blobs · no canvas</p>
      </div>
    </div>
  );
}
