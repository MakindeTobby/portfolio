"use client";
import { useState } from "react";
import { packages, intents } from "@/lib/site";

export default function PackageGrid() {
  const [pick, setPick] = useState<number | null>(null);
  const target = pick === null ? null : intents[pick].pkg;

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3" role="group" aria-label="Where are you right now?">
        {intents.map((it, i) => (
          <button key={it.label} type="button" aria-pressed={pick === i} onClick={() => setPick(pick === i ? null : i)} className={`btn !py-2 ${pick === i ? "btn-ink" : "btn-white"}`}>
            {it.label}
          </button>
        ))}
      </div>
      <div className="grid gap-7 md:grid-cols-3">
        {packages.map((p, i) => {
          const hit = target === i;
          const dim = target !== null && target !== -1 && !hit;
          return (
            <article key={p.name} className={`ticket ${p.tone} transition-all duration-300 ${dim ? "scale-[0.97] opacity-40" : ""} ${hit ? "-translate-y-2 !shadow-[8px_8px_0_var(--color-blue)]" : ""}`}>
              {hit && <span className="stamp absolute -top-4 right-4">Best fit</span>}
              <p className="font-mono text-xs">{p.fare}</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold leading-none">{p.name}</h3>
              <div className="cut" />
              <dl className="space-y-3 text-sm">
                <div className="rounded-xl border-2 border-ink/25 bg-paper/60 p-3"><dt className="text-xs font-bold text-ink-soft">From</dt><dd>{p.before}</dd></div>
                <div className="rounded-xl border-2 border-ink bg-surface p-3"><dt className="text-xs font-bold text-blue">To</dt><dd className="font-semibold">{p.after}</dd></div>
              </dl>
              <ul className="mt-5 space-y-1.5 text-sm">{p.includes.map((x) => <li key={x} className="flex gap-2"><span className="font-bold">✓</span>{x}</li>)}</ul>
              <a href="#contact" className="btn btn-ink mt-6 w-full plausible-event-name=Book+Route">Book this route</a>
            </article>
          );
        })}
      </div>
    </>
  );
}
