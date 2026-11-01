"use client";
import { useEffect, useRef } from "react";

// The road is both the drawing and the track the vehicles follow. Draw your own path
// in Figma or Illustrator (pen tool), copy its "d" attribute here, and the vehicles follow it.
const PATH = "M-80 200 C 200 175, 380 215, 640 195 S 1060 178, 1520 205";
const KINDS = ["danfo", "keke", "danfo", "okada"] as const;
// ---- Skyline. Deterministic data (no randomness), so server and browser render the same city.
type B = { w: number; h: number; top?: "spire" | "tank" | "step" | "slant" };
type P = B & { x: number };
const row = (list: B[], x0: number, gap = 4): P[] => { let x = x0; return list.map((b) => { const p = { ...b, x }; x += b.w + gap; return p; }); };

const FAR = row(Array.from({ length: 22 }, (_, i): B => ({ w: [70, 50, 90, 60, 80, 55, 100][i % 7], h: [84, 120, 70, 150, 100, 130, 90][(i * 5) % 7], top: i % 5 === 2 ? "spire" : undefined })), -10, 8);
const MID = row(Array.from({ length: 14 }, (_, i): B => ({ w: [64, 52, 80, 58, 72, 50, 66][i % 7], h: [96, 130, 84, 112, 140, 92, 120][(i * 3) % 7], top: i % 4 === 1 ? "tank" : undefined })), 20, 6);
const FRONT = [
  ...row([{ w: 58, h: 100 }, { w: 70, h: 156, top: "spire" }, { w: 46, h: 86, top: "tank" }, { w: 82, h: 128, top: "step" }, { w: 58, h: 170, top: "slant" }, { w: 70, h: 114 }, { w: 46, h: 142, top: "tank" }, { w: 58, h: 100 }], 0),
  ...row([{ w: 58, h: 128, top: "step" }, { w: 46, h: 170, top: "spire" }, { w: 70, h: 100 }, { w: 58, h: 142, top: "slant" }], 724),
];
const BIRDS = [
  { x: 300, y: -28, s: 1, dur: 50, delay: 5, flap: 0.55 }, { x: 332, y: -19, s: 0.85, dur: 50, delay: 5, flap: 0.5 },
  { x: 900, y: 6, s: 0.9, dur: 64, delay: 20, flap: 0.6 }, { x: 700, y: -44, s: 1.1, dur: 58, delay: 31, flap: 0.65 },
  { x: 1100, y: -14, s: 0.8, dur: 70, delay: 44, flap: 0.5 }, { x: 120, y: 10, s: 0.95, dur: 62, delay: 12, flap: 0.58 },
  { x: 1250, y: -38, s: 1, dur: 56, delay: 3, flap: 0.52 },
];

function Tile({ id, lit }: { id: string; lit: number[] }) {
  return (
    <pattern id={id} width="48" height="70" patternUnits="userSpaceOnUse">
      {Array.from({ length: 20 }, (_, k) => {
        const on = lit.includes(k);
        return <rect key={k} x={(k % 4) * 12 + 3} y={Math.floor(k / 4) * 14 + 3} width="6" height="8" rx="1" fill={on ? "#ffc933" : "#cfcaff"} fillOpacity={on ? 1 : 0.2} />;
      })}
    </pattern>
  );
}

function Tower({ b, fill, win }: { b: P; fill: string; win?: string }) {
  const { x, w, h, top } = b;
  const y = 150 - h, mid = x + w / 2;
  const wy = top === "slant" ? 26 : 8;
  const cols = Math.floor((w - 10) / 12), rows = Math.floor((h - wy - 8) / 14);
  return (
    <g fill={fill}>
      {top === "slant" ? <path d={`M${x} ${y + 24}L${x + w} ${y}V150H${x}Z`} /> : <rect x={x} y={y} width={w} height={h} />}
      {top === "step" && <rect x={x + 10} y={y - 20} width={w - 20} height="20" />}
      {top === "spire" && <path d={`M${mid} ${y}v-30`} stroke={fill} strokeWidth="3" fill="none" />}
      {top === "tank" && <rect x={x + 8} y={y - 11} width="16" height="11" rx="2" />}
      {win && cols > 0 && rows > 0 && (
        <svg x={x + (w - cols * 12) / 2} y={y + wy} width={cols * 12} height={rows * 14}><rect width="100%" height="100%" fill={`url(#${win})`} /></svg>
      )}
    </g>
  );
}

// A nod to the National Theatre, Iganmu: a wide cap-shaped roof on a low base.
function Theatre() {
  return (
    <g>
      <rect x="524" y="122" width="190" height="28" fill="var(--color-ink)" />
      <svg x="532" y="128" width="168" height="14"><rect width="100%" height="100%" fill="url(#winA)" /></svg>
      <path d="M524 122C556 62 682 62 714 122Z" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M542 108C568 80 670 80 696 108" fill="none" stroke="var(--color-ink)" strokeWidth="2" opacity=".45" />
    </g>
  );
}

function Wheel({ x, r }: { x: number; r: number }) {
  return (
    <g transform={`translate(${x} ${-r + 1})`}>
      <g className="wheel">
        <circle r={r} fill="var(--color-ink)" />
        <circle r={r * 0.62} fill="none" stroke="var(--color-lilac)" strokeWidth="1.6" opacity=".5" />
        <path d={`M${-r * 0.55} 0h${r * 1.1}M0 ${-r * 0.55}v${r * 1.1}`} stroke="var(--color-lilac)" strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
        <circle r={r * 0.2} fill="var(--color-butter)" />
      </g>
    </g>
  );
}

function Danfo() {
  return (
    <g>
      <rect x="-46" y="-40" width="92" height="32" rx="7" fill="var(--color-butter)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <rect x="-46" y="-24" width="92" height="6" fill="var(--color-ink)" />
      {[-36, -20, -4, 12].map((x) => <rect key={x} x={x} y="-36" width="12" height="9" rx="2" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />)}
      <rect x="30" y="-36" width="11" height="9" rx="2" fill="var(--color-blue)" />
      <Wheel x={-28} r={9} /><Wheel x={28} r={9} />
    </g>
  );
}

function Keke() {
  return (
    <g>
      <path d="M-26 -10V-34Q-26 -42-18 -42H8Q16 -42 19 -34L28 -22V-10Z" fill="var(--color-butter)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="-28" y="-47" width="38" height="6" rx="3" fill="var(--color-ink)" />
      <rect x="-20" y="-36" width="20" height="12" rx="2" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path d="M8 -36L19 -26H8Z" fill="var(--color-blue)" />
      <Wheel x={-14} r={7} /><Wheel x={20} r={7} />
    </g>
  );
}

function Okada() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M-4 -24 8 -19 12 -10" fill="none" stroke="var(--color-ink)" strokeWidth="4.5" />
      <path d="M-6 -26 6 -42" stroke="var(--color-ink)" strokeWidth="12" />
      <path d="M-6 -26 6 -42" stroke="var(--color-blue)" strokeWidth="8" />
      <path d="M5 -40 15 -31" stroke="var(--color-blue)" strokeWidth="4" fill="none" />
      <circle cx="9" cy="-50" r="6.5" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="2.2" />
      <path d="M-22 -8 -8 -22H10L24 -8" fill="none" stroke="var(--color-ink)" strokeWidth="3.5" />
      <rect x="-13" y="-28" width="21" height="9" rx="4.5" fill="var(--color-butter)" stroke="var(--color-ink)" strokeWidth="2" />
      <rect x="-23" y="-27" width="13" height="5" rx="2.5" fill="var(--color-ink)" />
      <path d="M24 -8 19 -30 12 -32" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
      <Wheel x={-22} r={9} /><Wheel x={24} r={9} />
    </g>
  );
}

export default function CityRoad() {
  const box = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const cars = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const p = path.current;
    if (!p) return;
    const len = p.getTotalLength();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lanes = [{ d: 260, v: 80 }, { d: 720, v: 125 }, { d: 1180, v: 68 }, { d: 1480, v: 150 }];

    const place = () =>
      lanes.forEach((c, i) => {
        const a = p.getPointAtLength(c.d % len);
        const b = p.getPointAtLength((c.d + 3) % len);
        const bob = reduce ? 0 : Math.sin(c.d / 9) * 0.8;
        const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
        cars.current[i]?.setAttribute("transform", `translate(${a.x} ${a.y + bob}) rotate(${deg})`);
      });
    place();
    if (reduce || !box.current) return;

    let raf = 0, last = performance.now(), sy = scrollY, boost = 0, visible = false;
    const tick = (now: number) => {
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const vel = Math.abs(scrollY - sy) / Math.max(dt, 0.001); // scroll speed in px/s
      sy = scrollY;
      boost += (Math.min(3, vel / 800) - boost) * 0.08;          // scrolling makes traffic speed up
      lanes.forEach((c) => (c.d += c.v * dt * (1 + boost)));
      place();
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); }
    });
    io.observe(box.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={box} aria-hidden className="overflow-hidden">
      <svg viewBox="0 -64 1440 304" className="relative left-1/2 block w-[max(100%,900px)] -translate-x-1/2">
        <defs>
          <Tile id="winA" lit={[1, 6, 8, 11, 14, 17]} />
          <Tile id="winB" lit={[3, 4, 9, 13, 15, 18]} />
          <pattern id="winM" width="12" height="14" patternUnits="userSpaceOnUse"><rect x="3" y="3" width="6" height="8" rx="1" fill="#ffffff" fillOpacity=".4" /></pattern>
        </defs>
        {FAR.map((b, i) => <Tower key={`f${i}`} b={b} fill="#cfcaff" />)}
        {MID.map((b, i) => <Tower key={`m${i}`} b={b} fill={i === 5 ? "var(--color-pink)" : "#8c96fd"} win="winM" />)}
        {FRONT.map((b, i) => <Tower key={`t${i}`} b={b} fill="var(--color-ink)" win={i % 2 ? "winA" : "winB"} />)}
        <Theatre />
        <path d="M1170 150 1180 18 1190 150Z" fill="var(--color-ink)" />
        <path d="M1180 30 1010 148M1180 30 1070 148M1180 30 1125 148M1180 30 1235 148M1180 30 1290 148M1180 30 1350 148" stroke="var(--color-ink)" strokeWidth="1.5" fill="none" />
        <rect x="990" y="146" width="420" height="6" fill="var(--color-ink)" />
        {BIRDS.map((b, i) => (
          <g key={i} className="fly" style={{ animationDuration: `${b.dur}s`, animationDelay: `-${b.delay}s` }}>
            <g transform={`translate(${b.x} ${b.y}) scale(${b.s})`}>
              <path className="flap" d="M-8 0Q-4 -7 0 0Q4 -7 8 0" fill="none" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinecap="round" style={{ animationDuration: `${b.flap}s` }} />
            </g>
          </g>
        ))}
        <path d={PATH} fill="none" stroke="var(--color-ink)" strokeWidth="44" strokeLinecap="round" />
        <path ref={path} d={PATH} fill="none" stroke="var(--color-butter)" strokeWidth="3" strokeDasharray="14 12" />
        {KINDS.map((k, i) => (
          <g key={i} ref={(el) => { cars.current[i] = el; }} transform="translate(-200 0)">{k === "keke" ? <Keke /> : k === "okada" ? <Okada /> : <Danfo />}</g>
        ))}
      </svg>
    </div>
  );
}
