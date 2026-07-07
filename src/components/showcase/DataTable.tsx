"use client";

import { useMemo, useState } from "react";

interface Row {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Invited" | "Suspended";
  joined: string;
}

const ROWS: Row[] = [
  { id: 1, name: "Ayu Lestari", role: "Frontend", status: "Active", joined: "2024-02-11" },
  { id: 2, name: "Budi Santoso", role: "Backend", status: "Active", joined: "2023-11-03" },
  { id: 3, name: "Citra Dewi", role: "Designer", status: "Invited", joined: "2025-01-22" },
  { id: 4, name: "Dimas Prasetyo", role: "DevOps", status: "Active", joined: "2022-06-30" },
  { id: 5, name: "Eka Putri", role: "QA", status: "Suspended", joined: "2024-09-14" },
  { id: 6, name: "Fajar Nugroho", role: "Backend", status: "Active", joined: "2023-04-19" },
  { id: 7, name: "Gita Ramadhani", role: "Frontend", status: "Invited", joined: "2025-03-02" },
  { id: 8, name: "Hendra Wijaya", role: "PM", status: "Active", joined: "2021-12-08" },
  { id: 9, name: "Indah Kurnia", role: "Designer", status: "Active", joined: "2024-07-27" },
  { id: 10, name: "Joko Setiawan", role: "DevOps", status: "Suspended", joined: "2022-10-05" },
  { id: 11, name: "Kirana Sari", role: "QA", status: "Active", joined: "2023-08-16" },
  { id: 12, name: "Lukman Hakim", role: "Backend", status: "Invited", joined: "2025-05-09" },
  { id: 13, name: "Mira Anggraini", role: "Frontend", status: "Active", joined: "2024-01-30" },
  { id: 14, name: "Nanda Pratama", role: "PM", status: "Active", joined: "2022-03-21" },
  { id: 15, name: "Oki Firmansyah", role: "Designer", status: "Suspended", joined: "2023-12-12" },
  { id: 16, name: "Putri Handayani", role: "QA", status: "Invited", joined: "2025-02-18" },
];

type SortKey = keyof Pick<Row, "name" | "role" | "status" | "joined">;
type SortDir = "asc" | "desc";

const PAGE_SIZE = 6;

const STATUS_STYLE: Record<Row["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Invited: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Suspended: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function DataTable() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(0);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  }

  const sorted = useMemo(() => {
    const copy = [...ROWS];
    copy.sort((a, b) => {
      const cmp = a[sortKey].localeCompare(b[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [sortKey, sortDir]);

  const pageCount = Math.ceil(sorted.length / PAGE_SIZE);
  const pageRows = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const columns: { key: SortKey; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "joined", label: "Joined" },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-2.5">
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {col.label}
                    <span className="text-[10px] w-3">
                      {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
              >
                <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-50">
                  {row.name}
                </td>
                <td className="px-4 py-2.5 text-zinc-500 dark:text-zinc-400">{row.role}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_STYLE[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-zinc-400 dark:text-zinc-600">
                  {row.joined}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
          page {page + 1} of {pageCount} · {sorted.length} rows
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page >= pageCount - 1}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
