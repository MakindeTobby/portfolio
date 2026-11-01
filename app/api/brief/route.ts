import { site } from "@/lib/site";

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .trim()
    .slice(0, max);
const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Bot traps: a hidden field humans never fill, and forms submitted impossibly fast. Pretend success.
  if (clean(body.website, 50) || Number(body.t) < 2500)
    return Response.json({ ok: true });

  const name = clean(body.name, 120),
    email = clean(body.email, 200),
    details = clean(body.details, 4000);
  if (!name || !emailOk(email) || !details)
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key)
    return Response.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Need: ${clean(body.need, 80)}`,
    `Budget: ${clean(body.budget, 80)}`,
    `Timeline: ${clean(body.timeline, 80)}`,
  ];
  const plan = clean(body.plan, 400);
  if (plan) lines.push(`Plan: ${plan}`);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.BRIEF_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.BRIEF_TO_EMAIL ?? site.email],
      reply_to: email,
      subject: `New project brief from ${name}`,
      text: [...lines, "", details].join("\n"),
    }),
  });
  return res.ok
    ? Response.json({ ok: true })
    : Response.json({ ok: false, error: "send_failed" }, { status: 502 });
}
