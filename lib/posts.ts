import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { createHighlighter, type Highlighter } from "shiki";

const DIR = path.join(process.cwd(), "content", "posts");
const LANGS = ["ts", "tsx", "js", "jsx", "json", "bash", "css", "html", "sql", "md"];

export type Post = { slug: string; title: string; date: string; description: string; tags: string[]; minutes: number; draft: boolean; content: string };

function read(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? file),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    minutes: Math.max(1, Math.round(content.trim().split(/\s+/).length / 200)),
    draft: data.draft === true,
    content,
  };
}

// Drafts show in development only, so an unfinished post never ships.
export function getAllPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).map(read)
    .filter((p) => process.env.NODE_ENV !== "production" || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

let hl: Promise<Highlighter> | undefined;

export async function renderMarkdown(src: string): Promise<string> {
  hl ??= createHighlighter({ themes: ["github-light"], langs: LANGS });
  const h = await hl;
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      code({ text, lang }) {
        return h.codeToHtml(text, { lang: lang && LANGS.includes(lang) ? lang : "text", theme: "github-light" });
      },
    },
  });
  return md.parse(src) as string;
}
