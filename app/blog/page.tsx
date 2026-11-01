import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, fmt } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog", description: "Notes on building software, automation and AI, written as I ship." };

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <section className="mx-auto w-full max-w-[1480px] px-5 pb-24 pt-10 sm:px-8 md:pt-14 lg:px-12">
      <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">Blog</h1>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">Notes on building software, automation and AI, written as I ship.</p>
      {posts.length === 0 ? (
        <p className="mt-12 text-lg">The first post is on its way.</p>
      ) : (
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card flex flex-col gap-3 transition-transform hover:-translate-y-1">
              <p className="text-sm text-ink-soft">{fmt(p.date)}, {p.minutes} min read</p>
              <h2 className="font-display text-2xl font-extrabold leading-tight">{p.title}</h2>
              <p className="text-ink-soft">{p.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
