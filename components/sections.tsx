import {
  site,
  stops,
  stack,
  services,
  steps,
  checklist,
  testimonials,
} from "@/lib/site";
import Link from "next/link";
import BriefForm from "./BriefForm";
import MobileMenu from "./MobileMenu";
import PackageGrid from "./PackageGrid";
import RushHour from "./RushHour";
import Estimator from "./Estimator";
import WorkSlider from "./WorkSlider";

// max-w-[1480px]
const wrap = "mx-auto w-full  max-w-[1380px] px-5 sm:px-8 lg:px-12";
const h2 =
  "font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl";
const head = "mb-12 max-w-3xl md:mb-14";

const ic = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};
const Briefcase = () => (
  <svg {...ic}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);
const ArrowUpRight = () => (
  <svg {...ic}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

function Spark({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`twinkle absolute ${className}`}
    >
      <path
        fill="currentColor"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
    </svg>
  );
}

function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="spin absolute -left-6 -top-4 z-10 h-24 w-24 text-ink/70"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="50" cy="50" r="44" />
          <ellipse cx="50" cy="50" rx="18" ry="44" />
          <ellipse cx="50" cy="50" rx="34" ry="44" />
          <path d="M6 50h88M12 30h76M12 70h76" />
        </g>
      </svg>
      {site.heroImage ? (
        <img
          src={site.heroImage}
          alt=""
          className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] object-contain"
        />
      ) : (
        <div
          className="absolute inset-6 grid place-items-center overflow-hidden border-2 border-ink bg-butter shadow-[8px_8px_0_var(--color-ink)]"
          style={{ borderRadius: "46% 54% 42% 58% / 52% 44% 56% 48%" }}
        >
          {site.portrait ? (
            <img
              src={site.portrait}
              alt={site.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-display text-8xl font-extrabold">
              {site.initials}
            </span>
          )}
        </div>
      )}
      <Spark className="-right-1 top-10 h-9 w-9" />
      <Spark className="bottom-6 -left-2 h-5 w-5" />
      <Spark className="right-12 -top-3 h-4 w-4" />
    </div>
  );
}

export function Header() {
  const links = [
    ...stops
      .filter((s) => !["top", "play", "contact"].includes(s.id))
      .map((s) => ({ href: `/#${s.id}`, label: s.label })),
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Let’s talk" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className={`${wrap} flex h-16 items-center justify-between`}>
        <a
          href="/"
          className="flex items-center gap-2 font-display text-lg font-extrabold"
        >
          {/* <Span>
            {site.initials}
          </span> */}
          <img
            src={site.portrait}
            alt="logo"
            className="grid h-8 w-8 place-items-center rounded-lg border-2 border-ink bg-blue text-xs text-white"
          />
          {site.name}
        </a>
        <nav className="hidden gap-7 text-sm font-semibold md:flex">
          {links.slice(0, -1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="underline-offset-4 hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="btn btn-pink !hidden !py-2 sm:!inline-flex plausible-event-name=Lets+Talk"
          >
            Let’s talk
          </Link>
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className={`${wrap}  grid items-center gap-12 overflow-hidden pb-10 pt-10 md:pt-14 lg:grid-cols-[1.1fr_0.9fr]`}
    >
      <div>
        <div className="relative pt-4 max-w-[1320px]">
          <span className="tag absolute -left-2 -top-1 z-10">Hi, I am</span>
          <h1
            className="rise lg:mt-0 mt-3 font-display text-[clamp(3.4rem,9vw,7.2rem)] font-extrabold leading-[1.02] tracking-tight"
            style={{ animationDelay: "100ms" }}
          >
            Tobi
            <br />
            Makinde
          </h1>
        </div>
        <p
          className="rise mt-6 max-w-lg text-2xl leading-snug md:text-3xl"
          style={{ animationDelay: "220ms" }}
        >
          I <span className="hl">build</span> software and help businesses to
          solve real problems.
        </p>
        <div
          className="rise mt-8 flex flex-wrap gap-4"
          style={{ animationDelay: "340ms" }}
        >
          <a
            href="#contact"
            className="btn btn-ink plausible-event-name=Hire+Me"
          >
            Hire Me <Briefcase />
          </a>
          <a href="#about" className="btn btn-white">
            My Story <ArrowUpRight />
          </a>
        </div>
        <p
          className="rise mt-8 flex items-center gap-2 text-sm text-ink-soft"
          style={{ animationDelay: "460ms" }}
        >
          <i className="dot" />
          {site.status}. Based in {site.location} ({site.tz}).
        </p>
      </div>
      <HeroArt />
    </section>
  );
}

export function Ticker() {
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y-2 border-ink bg-butter py-4"
    >
      <div className="marquee flex w-max gap-10 font-display text-2xl font-extrabold">
        {[...stack, ...stack].map((s, i) => (
          <span key={i} className="flex items-center gap-10">
            {s}
            <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-ink py-20 text-paper md:py-28">
      <div className={wrap}>
        <h2 className={`${h2} ${head}`}>Technology that moves work forward.</h2>
        <ul className="divide-y divide-paper/20 border-y border-paper/20">
          {services.map((s) => (
            <li
              key={s.title}
              className="group flex flex-col gap-3 py-7 md:flex-row md:items-center md:justify-between"
            >
              <span className="font-display text-4xl font-extrabold transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
                {s.title}
              </span>
              <p className="max-w-xs text-paper/70 md:text-right">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Packages() {
  return (
    <section id="packages" className="py-20 md:py-28">
      <div className={wrap}>
        <div className={head}>
          <h2 className={h2}>Pick your route.</h2>
          <p className="mt-4 text-lg text-ink-soft">
            Tell me where you are and the matching route lights up. Every
            package has a fixed scope and a clear result.
          </p>
        </div>
        <PackageGrid />
        <Estimator />
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="border-y-2 border-ink bg-blue py-20 text-white md:py-28"
    >
      <div className={wrap}>
        <div className={head}>
          <h2 className={h2}>Shipped products, built end to end.</h2>
          <p className="mt-4 text-lg text-white/80">
            Swipe or use the arrows to flip through.
          </p>
        </div>
        <WorkSlider />
      </div>
    </section>
  );
}

export function Testimonials() {
  const linkedin = site.links.find((l) => l.label === "LinkedIn");
  return (
    <section id="praise" className="py-20 md:py-28">
      <div className={wrap}>
        <h2 className={`${h2} ${head}`}>
          Kind words from people I’ve worked with.
        </h2>
        <div className="grid gap-7 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`card flex flex-col gap-6 !p-7 ${i === 1 ? "!bg-butter" : ""}`}
            >
              <blockquote className="text-lg leading-relaxed md:text-xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-lilac font-display font-extrabold">
                  {t.initials}
                </span>
                <span>
                  <span className="block font-bold">{t.name}</span>
                  <span className="block text-sm">{t.role}</span>
                  <span className="block text-sm">
                    {t.relation}, LinkedIn recommendation, {t.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        {linkedin && (
          <p className="mt-8">
            <a
              href={linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline underline-offset-4"
            >
              Read them on LinkedIn
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className={wrap}>
        <h2 className={`${h2} ${head}`}>Four stops, no surprises.</h2>
        <div className="relative grid gap-8 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-4 top-4 h-[calc(100%-2rem)] w-0.5 bg-ink md:right-4 md:h-0.5 md:w-auto"
          />
          {steps.map((s, i) => (
            <div key={s.title} className="relative pl-12 md:pl-0">
              <span className="absolute left-0 top-0 z-10 grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-butter font-bold md:static">
                {i + 1}
              </span>
              <h3 className="font-display text-2xl font-extrabold leading-tight md:mt-5">
                {s.title}
              </h3>
              <p className="mt-2 text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="card mt-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="font-display text-2xl font-extrabold">
              Handover checklist
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {checklist.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="font-bold text-blue">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="seal">
            Cleared
            <br />
            for handover
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const points = [
    "Web applications, backend systems and mobile apps",
    "Automation and integrations that improve how work gets done",
    "AI features guided by a clear business need",
    "A behind-the-scenes technical partner for agencies",
  ];
  return (
    <section
      id="about"
      className="border-y-2 border-ink bg-lilac py-20 md:py-28"
    >
      <div
        className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]`}
      >
        <div className="card -rotate-2 !p-3">
          <div className="grid aspect-[4/5] place-items-center overflow-hidden rounded-xl border-2 border-ink bg-blue text-white">
            {site.portrait ? (
              <img
                src={site.portrait}
                alt={site.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-display text-8xl font-extrabold">
                {site.initials}
              </span>
            )}
          </div>
          <p className="mt-3 text-center text-sm font-semibold">
            {site.location}
          </p>
        </div>
        <div>
          <h2 className={h2}>About me</h2>
          <p className="mt-6 max-w-2xl text-xl leading-snug">
            I’m {site.name}, a Software Engineer and Technical Partner. I help
            startup founders, growing businesses and digital agencies,
            especially teams in the US, UK, Canada and Australia, turn business
            problems into practical software.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {points.map((p) => (
              <li
                key={p}
                className="rounded-xl border-2 border-ink bg-surface px-4 py-3 text-sm font-semibold"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-ink-soft">
            I start by understanding the problem and the outcome you want, then
            find the simplest solution that creates real value.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-butter py-20 md:py-28">
      <div className={`${wrap} grid gap-12 lg:grid-cols-2`}>
        <div>
          <h2 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl">
            Need a technical partner? Let’s talk.
          </h2>
          <p className="mt-6 max-w-md text-lg">
            Tell me what’s broken or what you want to build. I’ll reply with a
            scoped plan and a fixed quote.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-ink">
              Email me
            </a>
            {site.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <BriefForm />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      className={`${wrap} flex flex-wrap items-center justify-between gap-3 py-8 text-sm`}
    >
      <p>
        © {new Date().getFullYear()} {site.name}. Built in {site.location}.
      </p>
      <a href="#top" className="font-semibold underline underline-offset-4">
        Back to top
      </a>
    </footer>
  );
}

export function Play() {
  return (
    <section id="play" className="border-y-2 border-ink bg-mint py-20 md:py-28">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
        <div>
          <h2 className={h2}>Take the detour.</h2>
          <p className="mt-6 max-w-md text-lg">
            Rush hour on the Lagos line. Switch lanes with the arrow keys, or
            tap the left and right sides. Dodge the go-slow and collect tickets.
          </p>
          <p className="mt-3 max-w-md text-ink-soft">
            Plain canvas and React, no game library.
          </p>
        </div>
        <RushHour />
      </div>
    </section>
  );
}
