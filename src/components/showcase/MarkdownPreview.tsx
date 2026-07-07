"use client";

import { Fragment, useState, type ReactNode } from "react";

const SAMPLE = `# Markdown Live Preview

Type on the left, see it rendered on the **right**.

- Supports *italic*, **bold**, and \`inline code\`
- Also supports [links](https://example.com)
- And ordered lists:

1. First
2. Second
3. Third

> Blockquotes look like this.
`;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyPrefix}-${i++}`;
    if (match[1] !== undefined) {
      nodes.push(<strong key={key}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={key}>{match[2]}</em>);
    } else if (match[3] !== undefined) {
      nodes.push(
        <code
          key={key}
          className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 font-mono text-[0.9em]"
        >
          {match[3]}
        </code>,
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      nodes.push(
        <a
          key={key}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-600 dark:text-violet-400 underline underline-offset-2"
        >
          {match[4]}
        </a>,
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdown(source: string): ReactNode[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const content = renderInline(heading[2], `h${key}`);
      const sizes = ["text-2xl", "text-xl", "text-lg"];
      blocks.push(
        <p key={key++} className={`${sizes[level - 1]} font-bold mt-0 mb-2`}>
          {content}
        </p>,
      );
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoted: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoted.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={key++}
          className="border-l-4 border-violet-400 dark:border-violet-600 pl-3 italic text-zinc-500 dark:text-zinc-400 my-2"
        >
          {renderInline(quoted.join(" "), `bq${key}`)}
        </blockquote>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-5 my-2 space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item, `ul${key}-${idx}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="list-decimal pl-5 my-2 space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item, `ol${key}-${idx}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() !== "") {
      paragraph.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-2 leading-relaxed">
        {renderInline(paragraph.join(" "), `p${key}`)}
      </p>,
    );
  }

  return blocks;
}

export default function MarkdownPreview() {
  const [source, setSource] = useState(SAMPLE);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          spellCheck={false}
          className="w-full h-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 font-mono text-xs text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <div className="w-full h-64 overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-sm text-zinc-700 dark:text-zinc-300">
          {renderMarkdown(source).map((node, idx) => (
            <Fragment key={idx}>{node}</Fragment>
          ))}
        </div>
      </div>

      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 text-center">
        hand-rolled markdown subset · headings, bold/italic, code, links, lists, blockquotes
      </p>
    </div>
  );
}
