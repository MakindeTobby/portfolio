"use client";
import { useEffect, useState } from "react";
import { stops } from "@/lib/site";

export default function TransitRail() {
  const [active, setActive] = useState(stops[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    stops.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <nav aria-label="Route" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="relative flex h-[56vh] flex-col items-end justify-between">
        <span aria-hidden className="absolute right-[5px] top-1 bottom-1 w-0.5 bg-ink/20" />
        <span aria-hidden className="absolute right-[5px] top-1 w-0.5 bg-ink" style={{ height: `calc((100% - 0.5rem) * ${progress})` }} />
        {stops.map((s) => {
          const on = s.id === active;
          return (
            <a key={s.id} href={`#${s.id}`} aria-current={on ? "location" : undefined} className="group relative flex items-center gap-3">
              <span className={`chip transition-opacity ${on ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>{s.label}</span>
              <span className={`relative z-10 h-3 w-3 rounded-full border-2 border-ink ${on ? "bg-blue scale-125" : "bg-paper"} transition-transform`} />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
