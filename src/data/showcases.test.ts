import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  showcaseList,
  CATEGORY_ORDER,
  categoryColors,
  categoryDot,
} from "@/data/showcase-meta";
import { showcases } from "@/data/showcases";
import { previewLoaders } from "@/data/showcase-previews";

describe("showcase data", () => {
  it("has unique slugs", () => {
    const slugs = showcaseList.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has non-empty metadata on every entry", () => {
    for (const s of showcaseList) {
      expect(s.slug, `slug of "${s.title}"`).toMatch(/^[a-z0-9-]+$/);
      expect(s.title.trim(), `title of ${s.slug}`).not.toBe("");
      expect(s.description.trim(), `description of ${s.slug}`).not.toBe("");
      expect(s.details.trim(), `details of ${s.slug}`).not.toBe("");
    }
  });

  it("uses only known categories", () => {
    for (const s of showcaseList) {
      expect(CATEGORY_ORDER, `category of ${s.slug}`).toContain(s.category);
    }
  });

  it("has a registry entry (component + file) for every meta entry", () => {
    for (const s of showcaseList) {
      const entry = showcases[s.slug];
      expect(entry, `registry entry for ${s.slug}`).toBeDefined();
      expect(entry.component, `component of ${s.slug}`).toBeTruthy();
      expect(entry.file, `file of ${s.slug}`).toMatch(/^[A-Za-z]+$/);
    }
  });

  it("points every registry file at an existing source file", () => {
    for (const s of showcaseList) {
      const file = path.join(
        process.cwd(),
        "src",
        "components",
        "showcase",
        `${showcases[s.slug].file}.tsx`,
      );
      expect(fs.existsSync(file), `${showcases[s.slug].file}.tsx`).toBe(true);
    }
  });

  it("has a preview loader for every entry, and no orphans", () => {
    const slugs = new Set(showcaseList.map((s) => s.slug));
    for (const s of showcaseList) {
      expect(previewLoaders[s.slug], `preview loader for ${s.slug}`).toBeTypeOf(
        "function",
      );
    }
    for (const slug of Object.keys(previewLoaders)) {
      expect(slugs.has(slug), `orphan preview loader "${slug}"`).toBe(true);
    }
  });

  it("defines colors and dots for every category", () => {
    for (const cat of CATEGORY_ORDER) {
      expect(categoryColors[cat], `categoryColors for ${cat}`).toBeTruthy();
      expect(categoryDot[cat], `categoryDot for ${cat}`).toBeTruthy();
    }
  });
});
