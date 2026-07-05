import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { codeToHtml } from "shiki";
import { showcases } from "@/data/showcases";
import { showcaseList, categoryColors } from "@/data/showcase-meta";
import SourceCode from "@/components/SourceCode";

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerender every showcase at build time — source files are read from disk,
// which is only possible during the build in the standalone Docker image.
export function generateStaticParams() {
  return Object.keys(showcases).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const showcase = showcases[slug];
  if (!showcase) return { title: "Coming Soon" };
  return {
    title: showcase.title,
    description: showcase.details,
    openGraph: {
      title: showcase.title,
      description: showcase.details,
    },
    twitter: {
      card: "summary_large_image",
      title: showcase.title,
      description: showcase.details,
    },
  };
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

  const { title, details, category, component: Component, file } = showcase;

  const fileName = `${file}.tsx`;
  const code = await fs.readFile(
    path.join(process.cwd(), "src", "components", "showcase", fileName),
    "utf8",
  );
  const html = await codeToHtml(code, {
    lang: "tsx",
    themes: { light: "github-light", dark: "github-dark" },
  });

  const idx = showcaseList.findIndex((s) => s.slug === slug);
  const prev =
    idx >= 0
      ? showcaseList[(idx - 1 + showcaseList.length) % showcaseList.length]
      : null;
  const next = idx >= 0 ? showcaseList[(idx + 1) % showcaseList.length] : null;
  // Rotate the same-category list so each page suggests the items after it
  const catItems = showcaseList.filter((s) => s.category === category);
  const catIdx = catItems.findIndex((s) => s.slug === slug);
  const others = catItems.filter((s) => s.slug !== slug);
  const related =
    catIdx > 0
      ? [...others.slice(catIdx), ...others.slice(0, catIdx)].slice(0, 3)
      : others.slice(0, 3);

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
        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg">{details}</p>
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

      <SourceCode html={html} code={code} fileName={fileName} />

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
            More in {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/showcase/${item.slug}`}
                className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-200"
              >
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {prev && next && (
        <nav className="mt-14 flex items-stretch gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <Link
            href={`/showcase/${prev.slug}`}
            className="group flex-1 min-w-0 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-1">
              &larr; Previous
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {prev.title}
            </p>
          </Link>
          <Link
            href={`/showcase/${next.slug}`}
            className="group flex-1 min-w-0 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-right hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-1">
              Next &rarr;
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {next.title}
            </p>
          </Link>
        </nav>
      )}
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