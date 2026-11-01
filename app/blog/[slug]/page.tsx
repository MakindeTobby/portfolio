import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, renderMarkdown, fmt } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.description, openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date } };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const html = await renderMarkdown(post.content);
  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-10 sm:px-8 md:pt-14">
      <Link href="/blog" className="text-sm font-semibold underline underline-offset-4">All posts</Link>
      <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{post.title}</h1>
      <p className="mt-4 text-ink-soft">{fmt(post.date)}, {post.minutes} min read</p>
      <div className="mt-4 flex flex-wrap gap-2">{post.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      <div className="post mt-10" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="card mt-16 flex flex-wrap items-center justify-between gap-4">
        <p className="font-display text-2xl font-extrabold">Need something built?</p>
        <Link href="/#contact" className="btn btn-pink">Let’s talk</Link>
      </div>
    </article>
  );
}
