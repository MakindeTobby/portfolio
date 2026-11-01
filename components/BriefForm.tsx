"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/track";

const needs = ["Web application", "Mobile app", "Automation or AI", "Integrations", "Not sure yet"];
const budgets = ["Under $2k", "$2k to $5k", "$5k to $15k", "$15k and up", "Let’s discuss"]; // TODO set your real bands
const timelines = ["As soon as possible", "Within a month", "1 to 3 months", "Flexible"];

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <select name={name} required defaultValue="" className="field mt-1 font-normal">
        <option value="" disabled>Select one</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

export default function BriefForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [plan, setPlan] = useState("");
  const opened = useRef(Date.now());

  useEffect(() => {
    const h = (e: Event) => setPlan(String((e as CustomEvent).detail));
    window.addEventListener("plan", h);
    return () => window.removeEventListener("plan", h);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/brief", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, plan, t: Date.now() - opened.current }) });
      if (!res.ok) throw new Error("send failed");
      track("Brief Sent");
      form.reset();
      setPlan("");
      setStatus("sent");
    } catch {
      // If the server can't send (for example, email is not set up yet), fall back to the visitor's email app.
      const body = `Name: ${f.name}\nEmail: ${f.email}\nNeed: ${f.need}\nBudget: ${f.budget}\nTimeline: ${f.timeline}${plan ? `\nPlan: ${plan}` : ""}\n\n${f.details}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project brief from ${f.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus("fallback");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-4 sm:grid-cols-2">
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <label className="block text-sm font-semibold">Your name<input name="name" required className="field mt-1 font-normal" /></label>
      <label className="block text-sm font-semibold">Your email<input name="email" type="email" required className="field mt-1 font-normal" /></label>
      <Select name="need" label="What do you need?" options={needs} />
      <Select name="budget" label="Budget" options={budgets} />
      <div className="sm:col-span-2"><Select name="timeline" label="When do you need it?" options={timelines} /></div>
      <label className="block text-sm font-semibold sm:col-span-2">
        About the project
        <textarea name="details" required rows={4} placeholder="What should it do, and who is it for?" className="field mt-1 font-normal" />
      </label>
      {plan && <p className="rounded-xl border-2 border-ink bg-butter px-4 py-3 text-sm font-semibold sm:col-span-2">Attached plan: {plan}</p>}
      <div className="sm:col-span-2">
        <button className="btn btn-blue" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send my brief"}</button>
        {status === "sent" && <p className="mt-3 text-sm font-semibold" role="status">Thanks, your brief is in. I’ll reply with a scoped plan and a fixed quote.</p>}
        {status === "fallback" && <p className="mt-3 text-sm" role="status">I couldn’t send that from here, so your email app is opening with the brief filled in. Press send there to finish.</p>}
      </div>
    </form>
  );
}
