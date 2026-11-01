"use client";
import { useRef, useState } from "react";
import { projects } from "@/lib/site";

export default function WorkSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const last = projects.length - 1;

  const go = (n: number) => {
    const el = ref.current;
    if (el)
      el.scrollTo({
        left: (el.children[Math.max(0, Math.min(last, n))] as HTMLElement)
          .offsetLeft,
        behavior: "smooth",
      });
  };
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setI(
      atEnd
        ? last
        : Math.round(
            el.scrollLeft / ((el.children[0] as HTMLElement).offsetWidth + 24),
          ),
    );
  };

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, n) => (
          <article
            key={p.name}
            className="grid w-[92%] shrink-0 snap-start overflow-hidden rounded-3xl border-2 border-ink bg-surface text-ink shadow-[6px_6px_0_var(--color-ink)] md:grid-cols-[1.2fr_1fr]"
          >
            <div
              className={`flex min-h-[300px] flex-col border-b-2 border-ink md:min-h-[540px] md:border-b-0 md:border-r-2 ${p.tone}`}
            >
              <div
                className="flex gap-1.5 border-b-2 border-ink bg-surface/80 px-4 py-3"
                aria-hidden
              >
                <i className="h-3 w-3 rounded-full bg-pink" />
                <i className="h-3 w-3 rounded-full bg-butter" />
                <i className="h-3 w-3 rounded-full bg-mint" />
              </div>
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className={`min-h-0 w-full flex-1 ${p.fit === "contain" ? "object-contain p-4" : "object-cover object-top"}`}
                />
              ) : (
                <div className="grid flex-1 place-items-center p-8 text-center">
                  <span className="font-display text-5xl font-extrabold leading-none md:text-7xl">
                    {p.name}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
              <p className="font-mono text-sm">
                {String(n + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>
              <h3 className="font-display text-4xl font-extrabold leading-none md:text-5xl">
                {p.name}
              </h3>
              <p className="text-lg text-ink-soft">{p.tagline}</p>
              <div className="flex flex-wrap gap-2">
                <span className="chip !bg-pink">{p.role}</span>
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="font-bold text-blue">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              {p.result && (
                <p className="font-semibold text-blue">{p.result}</p>
              )}
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ink self-start"
                >
                  Visit project
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-4">
        <button
          type="button"
          aria-label="Previous project"
          disabled={i === 0}
          onClick={() => go(i - 1)}
          className="btn btn-white !px-4 !py-2 disabled:opacity-40"
        >
          ←
        </button>
        <div className="flex gap-2" role="group" aria-label="Choose a project">
          {projects.map((p, n) => (
            <button
              key={p.name}
              type="button"
              aria-label={p.name}
              aria-current={n === i}
              onClick={() => go(n)}
              className={`h-3.5 w-3.5 rounded-full border-2 border-ink ${n === i ? "bg-butter" : "bg-surface"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next project"
          disabled={i === last}
          onClick={() => go(i + 1)}
          className="btn btn-white !px-4 !py-2 disabled:opacity-40"
        >
          → {">"}
        </button>
        <p className="ml-auto text-sm text-white/80">
          {i + 1} of {projects.length}
        </p>
      </div>
    </div>
  );
}
