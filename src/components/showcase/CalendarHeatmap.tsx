"use client";

import { useMemo, useState } from "react";

const WEEKS = 20;
const DAYS = 7;
const TOTAL = WEEKS * DAYS;

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// deterministic LCG-style pseudo-random so server and client render identical levels
function levelFor(i: number) {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  if (r < 0.35) return 0;
  if (r < 0.55) return 1;
  if (r < 0.72) return 2;
  if (r < 0.88) return 3;
  return 4;
}

const LEVEL_COLOR = [
  "bg-zinc-100 dark:bg-zinc-800",
  "bg-emerald-200 dark:bg-emerald-900",
  "bg-emerald-300 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-500",
  "bg-emerald-700 dark:bg-emerald-300",
];

// fixed anchor (not "today") so server-rendered and hydrated markup always match
const END_UTC = Date.UTC(2026, 6, 7);
const DAY_MS = 24 * 60 * 60 * 1000;

interface Cell {
  index: number;
  level: number;
  dateLabel: string;
  month: number;
}

export default function CalendarHeatmap() {
  const [hover, setHover] = useState<number | null>(null);

  const weeks = useMemo(() => {
    const cells: Cell[] = Array.from({ length: TOTAL }, (_, i) => {
      const offsetDays = TOTAL - 1 - i;
      const d = new Date(END_UTC - offsetDays * DAY_MS);
      return {
        index: i,
        level: levelFor(i),
        dateLabel: `${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCDate()}`,
        month: d.getUTCMonth(),
      };
    });

    const cols: Cell[][] = [];
    for (let w = 0; w < WEEKS; w++) cols.push(cells.slice(w * DAYS, w * DAYS + DAYS));
    return cols;
  }, []);

  const monthLabels = useMemo(() => {
    let last = -1;
    return weeks.map((week) => {
      const m = week[0].month;
      if (m === last) return "";
      last = m;
      return MONTH_NAMES[m];
    });
  }, [weeks]);

  const allCells = weeks.flat();
  const total = allCells.reduce((s, c) => s + c.level, 0);
  const hovered = hover !== null ? allCells.find((c) => c.index === hover) ?? null : null;

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <div className="flex items-center justify-between w-full">
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Contribution activity
        </p>
        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
          {hovered ? `${hovered.dateLabel} · level ${hovered.level}` : `${total} total`}
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex flex-col gap-1 w-max">
          <div className="flex gap-[3px]">
            {monthLabels.map((label, i) => (
              <span
                key={i}
                className="w-[11px] text-[9px] font-mono text-zinc-400 dark:text-zinc-600 whitespace-nowrap"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((cell) => (
                  <div
                    key={cell.index}
                    onMouseEnter={() => setHover(cell.index)}
                    onMouseLeave={() => setHover((h) => (h === cell.index ? null : h))}
                    className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLOR[cell.level]} transition-colors`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 self-end">
        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">Less</span>
        {LEVEL_COLOR.map((c, i) => (
          <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${c}`} />
        ))}
        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">More</span>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        {WEEKS}-week grid · seeded pseudo-random levels · hover a cell
      </p>
    </div>
  );
}
