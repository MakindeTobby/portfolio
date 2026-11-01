"use client";
import { useState } from "react";
import { track } from "@/lib/track";

const FEATURES: [string, number][] = [["Login & accounts", 3], ["Online database", 4], ["Payments", 6], ["Push notifications", 2], ["Works offline", 5], ["AI features", 6], ["Admin dashboard", 5]];

export default function Estimator() {
  const [on, setOn] = useState<string[]>(["Login & accounts", "Online database"]);
  const [screens, setScreens] = useState(10);

  const featureDays = FEATURES.filter(([n]) => on.includes(n)).reduce((sum, [, d]) => sum + d, 0);
  const days = Math.ceil((featureDays + screens * 0.75) * 1.2); // 20% buffer
  const weeks = Math.max(1, Math.ceil(days / 5));
  const size = days < 15 ? "Small" : days < 35 ? "Medium" : "Large";
  const summary = `About ${weeks} to ${weeks + 1} weeks, ${size.toLowerCase()} project, ${screens} screens${on.length ? `: ${on.join(", ")}` : ""}`;

  const send = () => {
    track("Estimator Send");
    window.dispatchEvent(new CustomEvent("plan", { detail: summary }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="card mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div>
        <h3 className="font-display text-3xl font-extrabold">Build your app, see the plan.</h3>
        <p className="mt-2 text-ink-soft">Switch on what your app needs and you get a rough size and time. The exact fixed price comes in writing.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {FEATURES.map(([n]) => (
            <button key={n} type="button" aria-pressed={on.includes(n)} onClick={() => setOn(on.includes(n) ? on.filter((x) => x !== n) : [...on, n])} className={`chip cursor-pointer ${on.includes(n) ? "!bg-butter" : ""}`}>{n}</button>
          ))}
        </div>
        <label className="mt-6 block text-sm font-semibold">
          Screens in the app: {screens}
          <input type="range" min={3} max={30} value={screens} onChange={(e) => setScreens(Number(e.target.value))} className="mt-2 block w-full accent-blue" />
        </label>
      </div>
      <div className="rounded-2xl border-2 border-ink bg-butter p-5">
        <p className="text-sm font-bold">Your plan</p>
        <p className="mt-2 font-display text-4xl font-extrabold leading-none">{weeks} to {weeks + 1} weeks</p>
        <p className="mt-2 font-semibold">{size} project</p>
        <p className="mt-3 text-xs">A rough guide only. Your written quote gives the exact scope and price.</p>
        <button type="button" onClick={send} className="btn btn-ink mt-5 w-full">Send this in my brief</button>
      </div>
    </div>
  );
}
