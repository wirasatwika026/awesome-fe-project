import Link from "next/link";
import { showcases, categoryColors } from "@/data/showcases";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ShowcasePage({ params }: Props) {
  const { slug } = await params;
  const showcase = showcases[slug];

  if (!showcase) {
    return (
      <main className="min-h-screen px-6 py-16 font-sans max-w-5xl mx-auto">
        <BackLink />
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
          Coming Soon
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">This component is on the roadmap.</p>
        <div className="mt-12 flex items-center justify-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 h-64 text-zinc-400 dark:text-zinc-600 text-sm">
          Work in progress
        </div>
      </main>
    );
  }

  const { title, description, category, component: Component } = showcase;

  return (
    <main className="min-h-screen px-6 py-16 font-sans max-w-5xl mx-auto">
      <BackLink />

      <header className="mb-10">
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${categoryColors[category] ?? ""}`}>
          {category}
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
          {title}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg">{description}</p>
      </header>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div
          className="relative p-8 bg-zinc-50 dark:bg-zinc-950"
          style={{
            backgroundImage: "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <Component />
        </div>
      </div>
    </main>
  );
}

function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-12"
    >
      &larr; Back
    </Link>
  );
}