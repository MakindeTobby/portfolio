"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <div className="md:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="btn btn-white !px-3 !py-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Menu" className="absolute inset-x-0 top-full border-b-2 border-ink bg-paper px-5 pb-6 pt-2 shadow-[0_8px_0_var(--color-ink)]">
          <ul className="divide-y divide-ink/15">
            {links.map((l) => (
              <li key={l.href}><Link href={l.href} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl font-extrabold">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
