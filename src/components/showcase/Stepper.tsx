"use client";

import { useState } from "react";

const STEPS = [
  { title: "Account",     desc: "Basic credentials"             },
  { title: "Profile",     desc: "Tell us about yourself"        },
  { title: "Preferences", desc: "Customize your experience"     },
  { title: "Confirm",     desc: "Review and finish"             },
];

export default function Stepper() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const pct = (step / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full flex flex-col gap-7">
      {/* step track */}
      <div className="relative flex items-center px-2">
        <div className="absolute h-0.5 inset-x-6 bg-zinc-200 dark:bg-zinc-800" />
        <div className="absolute h-0.5 left-6 bg-violet-500 transition-all duration-500" style={{ width: `calc(${pct}% - 0px)` }} />

        {STEPS.map((s, i) => (
          <div key={i} className="relative z-10 flex-1 flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                i < step
                  ? "bg-violet-600 border-violet-600 text-white"
                  : i === step
                  ? "bg-white dark:bg-zinc-950 border-violet-500 text-violet-600 dark:text-violet-400 ring-4 ring-violet-100 dark:ring-violet-900"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700 text-zinc-400"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] font-medium hidden sm:block transition-colors ${i === step ? "text-violet-600 dark:text-violet-400" : "text-zinc-400"}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* content */}
      {!done ? (
        <div key={step} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5" style={{ animation: "float-up 0.22s ease-out" }}>
          <p className="font-semibold text-zinc-800 dark:text-zinc-200 mb-0.5">{STEPS[step].title}</p>
          <p className="text-xs text-zinc-400 mb-5 font-mono">{STEPS[step].desc}</p>

          <div className="space-y-3">
            {step === 0 && (
              <>
                <input className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Email address" />
                <input className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" type="password" placeholder="Password" />
              </>
            )}
            {step === 1 && (
              <>
                <input className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Display name" />
                <textarea className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Short bio (optional)" rows={2} />
              </>
            )}
            {step === 2 && (
              <div className="space-y-2.5">
                {["Email notifications", "Weekly digest", "Product updates", "Security alerts"].map((p) => (
                  <label key={p} className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer">
                    <input type="checkbox" className="rounded accent-violet-600" defaultChecked /> {p}
                  </label>
                ))}
              </div>
            )}
            {step === 3 && (
              <div className="space-y-2.5">
                {["Account info saved", "Profile complete", "Preferences set"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-center shrink-0">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-10" style={{ animation: "float-up 0.25s ease-out" }}>
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">Setup complete!</p>
          <button onClick={() => { setStep(0); setDone(false); }} className="text-xs text-zinc-400 underline hover:text-zinc-600 transition-colors">
            Start over
          </button>
        </div>
      )}

      {/* nav */}
      {!done && (
        <div className="flex justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-5 py-2 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 disabled:opacity-30 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => step === STEPS.length - 1 ? setDone(true) : setStep((s) => s + 1)}
            className="px-6 py-2 rounded-full text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white transition-colors"
          >
            {step === STEPS.length - 1 ? "Finish" : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
}
