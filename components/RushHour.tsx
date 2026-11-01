"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";

const W = 360, H = 480, LW = W / 3, PY = H - 96;
type Item = { lane: number; y: number; ticket: boolean };

export default function RushHour() {
  const cv = useRef<HTMLCanvasElement>(null);
  const g = useRef({ lane: 1, items: [] as Item[], score: 0, t: 0, next: 0, raf: 0, run: false });
  const [phase, setPhase] = useState<"idle" | "play" | "over">("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const draw = useCallback(() => {
    const c = cv.current?.getContext("2d");
    if (!c) return;
    const s = g.current;
    c.fillStyle = "#0e1330"; c.fillRect(0, 0, W, H);
    c.strokeStyle = "#ffc933"; c.lineWidth = 3; c.setLineDash([18, 18]); c.lineDashOffset = -s.t;
    [1, 2].forEach((i) => { c.beginPath(); c.moveTo(i * LW, 0); c.lineTo(i * LW, H); c.stroke(); });
    c.setLineDash([]);
    s.items.forEach((it) => {
      const x = it.lane * LW + LW / 2;
      if (it.ticket) {
        c.fillStyle = "#9ae3c3"; c.beginPath(); c.arc(x, it.y + 20, 18, 0, 7); c.fill();
        c.fillStyle = "#0e1330"; c.font = "bold 20px sans-serif"; c.textAlign = "center"; c.fillText("✦", x, it.y + 27);
      } else {
        c.fillStyle = "#ff5c8a"; c.beginPath(); c.roundRect(x - 22, it.y, 44, 64, 8); c.fill();
        c.fillStyle = "#0e1330"; c.fillRect(x - 16, it.y + 10, 32, 14);
      }
    });
    const px = s.lane * LW + LW / 2;
    c.fillStyle = "#ffc933"; c.beginPath(); c.roundRect(px - 24, PY, 48, 76, 10); c.fill();
    c.fillStyle = "#2b3cff"; c.fillRect(px - 18, PY + 8, 36, 16); c.fillRect(px - 18, PY + 30, 36, 12);
  }, []);

  const end = useCallback((final: number) => {
    g.current.run = false;
    cancelAnimationFrame(g.current.raf);
    let b = final;
    try { b = Math.max(final, Number(localStorage.getItem("rush-best") ?? 0)); localStorage.setItem("rush-best", String(b)); } catch {}
    setBest(b);
    setPhase("over");
  }, []);

  const start = useCallback(() => {
    track("Game Start");
    const s = g.current;
    Object.assign(s, { lane: 1, items: [], score: 0, t: 0, next: 30, run: true });
    setScore(0);
    setPhase("play");
    let last = performance.now();
    const step = (now: number) => {
      if (!s.run) return;
      const dt = Math.min(3, (now - last) / 16.667);
      last = now;
      const speed = Math.min(9, 3.2 + s.score * 0.18);
      s.t += speed * dt;
      s.next -= (dt * speed) / 3;
      if (s.next <= 0) {
        const lane = Math.floor(Math.random() * 3);
        s.items.push({ lane, y: -70, ticket: false });
        if (Math.random() < 0.6) s.items.push({ lane: (lane + 1 + Math.floor(Math.random() * 2)) % 3, y: -70, ticket: true });
        s.next = 55 - Math.min(25, s.score);
      }
      s.items.forEach((it) => (it.y += speed * dt));
      for (const it of s.items) {
        if (it.lane === s.lane && it.y + 64 > PY + 6 && it.y < PY + 70) {
          if (it.ticket) { it.y = H + 99; s.score++; setScore(s.score); }
          else { draw(); end(s.score); return; }
        }
      }
      s.items = s.items.filter((it) => it.y < H + 80);
      draw();
      s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  }, [draw, end]);

  useEffect(() => {
    draw();
    try { setBest(Number(localStorage.getItem("rush-best") ?? 0)); } catch {}
    const key = (e: KeyboardEvent) => {
      const s = g.current;
      const dir = ["ArrowLeft", "a"].includes(e.key) ? -1 : ["ArrowRight", "d"].includes(e.key) ? 1 : 0;
      if (!s.run || !dir) return;
      e.preventDefault();
      s.lane = Math.max(0, Math.min(2, s.lane + dir));
    };
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("keydown", key); g.current.run = false; cancelAnimationFrame(g.current.raf); };
  }, [draw]);

  const tap = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = g.current;
    if (!s.run) return;
    const r = e.currentTarget.getBoundingClientRect();
    s.lane = Math.max(0, Math.min(2, s.lane + (e.clientX - r.left < r.width / 2 ? -1 : 1)));
  };

  return (
    <div className="card mx-auto w-full max-w-[380px] !p-3">
      <div className="mb-2 flex justify-between px-1 text-sm font-bold"><span>Tickets: {score}</span><span>Best: {best}</span></div>
      <div className="relative">
        <canvas ref={cv} width={W} height={H} onPointerDown={tap} className="block w-full touch-none rounded-xl border-2 border-ink" aria-label="Rush hour game. Use the left and right arrow keys, or tap the sides, to change lanes." />
        {phase !== "play" && (
          <div className="absolute inset-0 grid place-items-center rounded-xl bg-ink/75 p-6 text-center text-paper">
            <div>
              <p className="font-display text-3xl font-extrabold">{phase === "over" ? `Go-slow! ${score} tickets.` : "Rush hour"}</p>
              <p className="mt-2 text-sm text-paper/80">{phase === "over" && score >= 10 ? "Smooth ride. Got a project that needs the same care? Let’s talk." : "Change lanes, dodge the go-slow, collect tickets."}</p>
              <button type="button" onClick={start} className="btn btn-pink mt-5">{phase === "over" ? "Ride again" : "Start the ride"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
