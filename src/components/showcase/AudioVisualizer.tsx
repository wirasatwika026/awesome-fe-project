"use client";

import { useEffect, useRef, useState } from "react";

type WaveType = OscillatorType;
const WAVE_TYPES: WaveType[] = ["sine", "sawtooth", "square", "triangle"];

export default function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<{ ctx: AudioContext; osc: OscillatorNode; gain: GainNode } | null>(null);
  const rafRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [wave, setWave] = useState<WaveType>("sawtooth");
  const [freq, setFreq] = useState(220);
  const waveRef = useRef(wave);
  const freqRef = useRef(freq);

  useEffect(() => { waveRef.current = wave; if (audioRef.current?.osc) audioRef.current.osc.type = wave; }, [wave]);
  useEffect(() => { freqRef.current = freq; audioRef.current?.osc.frequency.setValueAtTime(freq, audioRef.current.ctx.currentTime); }, [freq]);

  function start() {
    const ac = new AudioContext();
    const analyser = ac.createAnalyser();
    analyser.fftSize = 256;

    const osc = ac.createOscillator();
    const gain = ac.createGain();
    gain.gain.value = 0.08;
    osc.type = waveRef.current;
    osc.frequency.value = freqRef.current;

    osc.connect(gain);
    gain.connect(analyser);
    analyser.connect(ac.destination);
    osc.start();

    audioRef.current = { ctx: ac, osc, gain };
    setPlaying(true);
    drawLoop(analyser);
  }

  function stop() {
    cancelAnimationFrame(rafRef.current);
    audioRef.current?.osc.stop();
    audioRef.current?.ctx.close();
    audioRef.current = null;
    setPlaying(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawLoop(analyser: AnalyserNode) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const buf = new Uint8Array(analyser.frequencyBinCount);

    const frame = () => {
      analyser.getByteFrequencyData(buf);
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const bw = W / buf.length;
      buf.forEach((v, i) => {
        const h = (v / 255) * H;
        const hue = (i / buf.length) * 240 + 180;
        ctx.fillStyle = `hsla(${hue},80%,60%,0.85)`;
        ctx.fillRect(i * bw, H - h, bw - 1, h);
      });

      rafRef.current = requestAnimationFrame(frame);
    };
    frame();
  }

  useEffect(() => () => stop(), []);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <canvas
        ref={canvasRef}
        width={512}
        height={160}
        className="w-full h-40 rounded-xl bg-zinc-950"
      />

      <div className="flex flex-wrap justify-center gap-3 w-full">
        {/* wave type */}
        <div className="flex gap-1.5">
          {WAVE_TYPES.map((w) => (
            <button
              key={w}
              onClick={() => setWave(w)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                wave === w
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        {/* freq slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-400">freq</span>
          <input
            type="range" min={55} max={880} value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
            className="w-24 accent-violet-600"
          />
          <span className="text-[10px] font-mono text-zinc-400 tabular-nums w-10">{freq}Hz</span>
        </div>
      </div>

      <button
        onClick={playing ? stop : start}
        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
          playing
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-violet-600 hover:bg-violet-700 text-white"
        }`}
      >
        {playing ? "Stop" : "Play & Visualize"}
      </button>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        Web Audio API · OscillatorNode · AnalyserNode · FFT 256 bins
      </p>
    </div>
  );
}
