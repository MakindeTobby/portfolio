"use client";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

export default function Badge() {
  const root = useRef<HTMLDivElement>(null);
  const sway = useRef<HTMLDivElement>(null);
  const s = useRef({ a: 5, v: 0, drag: false, raf: 0 });

  const loop = () => {
    const o = s.current;
    cancelAnimationFrame(o.raf);
    const tick = () => {
      if (!o.drag) { o.v += -o.a * 0.014; o.v *= 0.985; o.a += o.v; }
      if (sway.current) sway.current.style.transform = `rotate(${o.a}deg)`;
      if (o.drag || Math.abs(o.a) > 0.03 || Math.abs(o.v) > 0.03) o.raf = requestAnimationFrame(tick);
    };
    o.raf = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) s.current.a = 0;
    loop();
    return () => cancelAnimationFrame(s.current.raf);
  }, []);

  const down = (e: React.PointerEvent) => { s.current.drag = true; e.currentTarget.setPointerCapture(e.pointerId); loop(); };
  const move = (e: React.PointerEvent) => {
    const o = s.current;
    if (!o.drag || !root.current) return;
    const r = root.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = Math.max(60, e.clientY - r.top);
    const next = Math.max(-40, Math.min(40, -(Math.atan2(dx, dy) * 180) / Math.PI));
    o.v = Math.max(-8, Math.min(8, next - o.a));
    o.a = next;
  };
  const up = () => { s.current.drag = false; loop(); };

  return (
    <div ref={root} className="drop relative mx-auto h-[570px] w-[300px] select-none">
      <div ref={sway} style={{ transformOrigin: "50% 0" }} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} className="cursor-grab touch-pan-y active:cursor-grabbing">
        <div className="mx-auto h-24 w-6 rounded-b-md border-2 border-t-0 border-ink bg-pink" />
        <div className="mx-auto -mt-px h-5 w-12 rounded-md border-2 border-ink bg-surface" />
        <div className="card !rounded-3xl !p-4">
          <p className="text-xs font-semibold">{site.role}</p>
          <div className="mt-3 grid aspect-square place-items-center overflow-hidden rounded-2xl border-2 border-ink bg-blue text-white">
            {site.portrait ? <img src={site.portrait} alt={site.name} draggable={false} className="h-full w-full object-cover" /> : <span className="font-display text-7xl font-extrabold">{site.initials}</span>}
          </div>
          <p className="mt-4 font-display text-3xl font-extrabold leading-none">{site.name}</p>
          <p className="mt-3 flex items-center gap-2 rounded-lg bg-paper px-3 py-2 text-xs font-semibold"><i className="dot" />{site.status}</p>
          <div className="mt-4 flex items-end justify-between text-xs"><span className="font-mono">{site.location}</span><span className="barcode" /></div>
        </div>
      </div>
      <p className="absolute bottom-0 w-full text-center text-sm text-ink-soft">Give the badge a swing.</p>
    </div>
  );
}
