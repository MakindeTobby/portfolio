---
title: "Welcome: how this blog works"
date: 2026-11-01
description: "A starter post that shows the formatting. Replace it or delete it when you publish your first real article."
tags: [meta]
draft: true
---

This is a sample post. It is marked `draft: true`, so it only appears while you run `pnpm dev`, never on your live site.

## Add a post

Create a Markdown file in `content/posts/`. The file name becomes the address, so `my-first-post.md` lives at `/blog/my-first-post`.

```md
---
title: "Why I build with Next.js and Supabase"
date: 2026-11-10
description: "One sentence that shows in the list and in link previews."
tags: [nextjs, supabase]
draft: false
---

Your writing goes here.
```

## What you can write

Normal paragraphs, **bold**, *italic*, [links](https://nextjs.org), lists:

- Code blocks with syntax colors
- Quotes and tables
- Images saved in `/public`

```ts
export async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
```

> Set `draft: false` when a post is ready to go live.
