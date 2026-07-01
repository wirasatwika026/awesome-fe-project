"use client";

import { useState } from "react";

function FloatField({
  label,
  type = "text",
  hint,
}: {
  label: string;
  type?: string;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const raised = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-4 pt-6 pb-2.5 rounded-2xl border-2 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-50 outline-none transition-colors duration-200 ${
          focused
            ? "border-violet-500"
            : "border-zinc-200 dark:border-zinc-700"
        }`}
      />
      <label
        className="absolute left-4 pointer-events-none transition-all duration-200 origin-left font-medium"
        style={{
          top: raised ? "8px" : "50%",
          transform: raised ? "none" : "translateY(-50%)",
          fontSize: raised ? "10px" : "14px",
          color: focused ? "#8b5cf6" : raised ? "#a1a1aa" : "#a1a1aa",
          letterSpacing: raised ? "0.05em" : undefined,
        }}
      >
        {label}
      </label>
      {hint && (
        <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-600 px-1">{hint}</p>
      )}
    </div>
  );
}

export default function FloatingLabel() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-4 py-8">
      <FloatField label="Full name" />
      <FloatField label="Email address" type="email" />
      <FloatField label="Password" type="password" hint="Minimum 8 characters" />
      <FloatField label="Company (optional)" />

      <button
        onClick={() => { setSubmitted(true); setTimeout(() => setSubmitted(false), 2000); }}
        className={`mt-2 w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
          submitted
            ? "bg-emerald-500 text-white"
            : "bg-violet-600 hover:bg-violet-700 text-white"
        }`}
      >
        {submitted ? "✓ Submitted" : "Create account"}
      </button>

      <p className="text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
        floating label · focus state · smooth transition
      </p>
    </div>
  );
}
