import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const items = getAllPosts()
    .map((p) => `<item><title>${esc(p.title)}</title><link>${base}/blog/${p.slug}</link><guid>${base}/blog/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)}</title><link>${base}/blog</link><description>Notes on building software, automation and AI.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
