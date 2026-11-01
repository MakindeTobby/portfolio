import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Spline_Sans_Mono } from "next/font/google";
import { site } from "@/lib/site";
import Analytics from "@/components/Analytics";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display-src", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body-src", display: "swap" });
const mono = Spline_Sans_Mono({ subsets: ["latin"], variable: "--font-mono-src", display: "swap" });

const title = `${site.name}: ${site.role}`;
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: title, template: `%s | ${site.name}` },
  description: "Software, automation and AI for startups, growing businesses and agencies. Fixed scope, clear milestones, full handover.",
  openGraph: { title, type: "website" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}<Analytics /></body>
    </html>
  );
}
